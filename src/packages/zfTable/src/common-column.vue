<template>
    <!-- 包含el 所有的  列表属性 都作为 对象去接收 -->
    <!-- 表头 和 数据的展示 -->
    <!-- :render-header="column.isUseCommonRenderHeader ? renderHeader : column.renderHeader" warn -->
    <el-table-column
        v-if="column && !column.isHidden && !column.selfSettingHidden"
        v-bind="$attrs"
        v-on="$listeners"
        :prop="column.prop"
        :label="getLabel(column.label)"
        :type="column.type"
        :index="column.index"
        :column-key="column.columnKey"
        :render-header="column.isUseCommonRenderHeader ? renderHeader : column.renderHeader"
        :width="column.width"
        :min-width="column.minWidth"
        :fixed="column.fixed && data && data.length > 0"
        :sortable="column.sortable || false"
        :sort-method="column.sortMethod"
        :sort-by="column.sortBy"
        :sort-orders="column.sortOrders"
        :resizable="column.resizable || true"
        :formatter="column.formatter"
        :show-overflow-tooltip="column.showOverflowTooltip === false ? false : true"
        :align="column.align || align || 'center'"
        :header-align="column.headerAlign || headerAlign || column.align || align || 'center'"
        :class-name="column.className"
        :label-class-name="column.labelClassName"
        :selectable="column.selectable"
        :reserve-selection="column.reserveSelection || false"
        :filters="column.filters"
        :filter-placement="column.filterPlacement"
        :filter-multiple="column.filterMultiple"
        :filter-method="column.filterMethod"
        :filtered-value="column.filteredValue"
    >
        <template slot="header" slot-scope="scope">
            <!--  参考ele 使用自定义表头-->
            <common-render v-if="column.renderHeader" :scope="scope" :render="column.renderHeader"> </common-render>
            <!-- <span class="showtip" v-else-if="column.isUseCommonRenderHeader"
                >{{ scope.column.label }}
            </span> -->
            <span v-else>{{ scope.column.label }}</span>
        </template>

        <template slot-scope="scope">
            <div class="CommonRender">
                <!-- 展示列 做一些单位 字典 格式化-->
                <common-render :scope="scope" :render="column.render"></common-render>
                <!-- <span v-if='(column.displayAs || column.unit)>{{ dealHeader(scope.column.label, column) }}</span> -->
            </div>
        </template>
        <!-- 多级表头 -->
        <template v-if="column.children">
            <common-column v-for="(col, index) in column.children" :key="index" :column="col"> </common-column>
        </template>
    </el-table-column>
</template>

<script>
import CommonRender from './common-render'
import moment from 'moment'
// 自带 可以 改写
function money(value) {
    if (value == null) return '-'
    let money = ''
    let pointNum = ''
    let val = value.toString()
    if (val.indexOf('.') > 0) {
        money = val.split('.')[0]
        pointNum = val.split('.')[1]
        return money.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '.' + pointNum
    } else {
        money = val.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        return money
    }
}

export default {
    name: 'commonColumn',
    props: {
        column: Object,
        headerAlign: String,
        align: String,
        data: Array,
    },
    components: {
        CommonRender,
    },
    data() {
        return {
            functions: {
                money: money,
            },
            // 为了解决单向流
            localColumn: this.column,
        }
    },
    methods: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        renderHeader(h, { column, $index }) {
            // h即为cerateElement的简写，具体可看vue官方文档
            return h(
                'el-tooltip',
                {
                    attrs: {
                        class: 'cell showtip',
                    },
                    props: {
                        content: (function () {
                            return column.label
                        })(),
                        placement: 'top',
                    },
                    domProps: {
                        innerHTML: column.label,
                    },
                },
                [h('span')]
            )
        },
        // formatter (data) {
        //     return (data || data === 0) ? data : (this.isBlank ? '' : '-')
        // },
        setColumn() {
            if (this.localColumn && this.localColumn.formatter) {
                // 格式化的使用 如果用固定的格式化 可以写死在组件直接使用
                this.localColumn.render = (h, scope) => {
                    return <span>{scope.column.formatter(scope.row, scope.column)}</span>
                }
            }
            if (this.localColumn && !this.localColumn.render) {
                let unit = this.localColumn.unit ? this.localColumn.unit : '' // 添加单位unit
                this.localColumn.render = (h, scope) => {
                    if (this.localColumn.dicData) {
                        // 添加字典 转化
                        return <span>{this.getLabelFromDicData(scope.row[this.localColumn.prop], this.localColumn.dicData) ? this.getLabelFromDicData(scope.row[this.localColumn.prop], this.localColumn.dicData).label : '-'}</span>
                    }
                    if (this.localColumn.displayAs) {
                        // 固定的格式转化
                        return <span>{this.filterMethods(this.localColumn.displayAs, scope.row[scope.column.property]) + unit}</span>
                    }
                    return (
                        // 没有数据格式化默认
                        <span>{scope.row[scope.column.property] || scope.row[scope.column.property] === 0 ? `${scope.row[scope.column.property]}${unit}` : '-'}</span>
                    )
                }
            }
        },
        getLabelFromDicData(key, dicData) {
            if (key == null) return ''
            const map = dicData.reduce((res, item) => {
                res[item.value] = item
                return res
            }, {})
            return map[key]
        },
        filterMethods(fncName, row) {
            if (fncName in this.functions) {
                return this.functions[fncName](row)
            } else {
                // moment   displayAs: 'YYYY-MM-DD HH:mm:ss'
                if (!row) return '-'
                return moment(row).format(fncName)
            }
        },
        getLabel(label) {
            if (Object.prototype.toString.call(label) == '[object String]') {
                return label
            }
            // fix表头添加合计label为number是类型校验报错
            if (label || label == 0) {
                return `${label}`
            }
            return label // undefined|null
        },
        dealHeader(label, column) {
            // h即为cerateE lement的简写，具体可看vue官方文档
            return true
        },
    },
    watch: {
        localColumn: {
            handler(val) {
                val && this.setColumn()
            },
            immediate: true,
        },
    },
}
</script>
<style>
.CommonRender {
    display: inline-table;
}
.showtip {
    white-space: nowrap !important;
    text-overflow: ellipsis;
    word-break: break-all;
}
</style>
