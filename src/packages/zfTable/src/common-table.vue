<template>
    <div class="zf-table" ref="zfTable">
        <!-- 筛选功能 -->
        <div v-if="collapseShow" ref="collapseShow">
             
            <div :class="['collapse', collapse ? '' : '']">
                <el-button class="save-btn" type="mini" @click="updateLabel" v-if="collapse === true">保存</el-button>
                <el-button size="mini"  @click="collapse = !collapse"> <i class="el-icon-s-tools"></i>列设置</el-button>
            </div>
            <el-collapse-transition>
                <div class="collapse-content" v-if="collapse">
                    <el-tree :data="switchLabel" show-checkbox default-expand-all node-key="id" ref="tree" highlight-current check-on-click-node :default-checked-keys="defaultLabel" @check-change="checkHandler" :props="defaultProps"> </el-tree>
                </div>
            </el-collapse-transition>
        </div>
        <!--  summary-method="getSummary" :show-summary="showSummary"-->
        <!-- :height=" height || `calc(100vh - ${selfHeight}px)`" -->
        <el-table @header-dragend="dragColumn" v-if="toggleTable" ref="hosjoyTable" v-bind="$attrs" v-on="$listeners" :data="data" :height="height" :max-height="computedHeight" class="hosjoy-in-table" :span-method="this.merge ? this.mergeMethod : this.spanMethod">
            <!-- 多选 -->
            <el-table-column v-if="isShowselection" type="selection" align="center" :selectable="selectable"> </el-table-column>
            <!-- 单选框 -->
            <el-table-column v-if="isShowRadio" width="50" align="center">
                <template slot-scope="scope">
                    <el-radio v-model="radioVal" :label="scope.$index" @change.native="radioChange(scope.row)">{{ '' }}</el-radio>
                </template>''
            </el-table-column>
            <!-- 展开  -->
            <el-table-column type="expand" v-if="expand" align="center">
                <template slot-scope="scope">
                    <slot name="expand" :data="scope"></slot>
                </template>
            </el-table-column>
            <!-- index -->
            <el-table-column v-if="isShowIndex" type="index" class-name="allowDrag" label="序号" :index="indexMethod" align="center" width="60"></el-table-column>
            <template v-for="(item, index) in realColumn">
                <!-- 插槽写法 -->
                <el-table-column
                    :label="item.label"
                    :align="item.align ? item.align : 'center'"
                    :prop="item.prop"
                    :key="item.label + item.prop"
                    :width="item.width"
                    :min-width="item.minWidth"
                    :class-name="item.className"
                    :fixed="item.fixed && data.length > 0"
                    :show-overflow-tooltip="item.showOverflowTooltip === false ? false : true"
                    v-if="item.slot && !item.isHidden && !item.selfSettingHidden"
                    :label-class-name="item.labelClassName"
                    :render-header="item.renderHeader"
                >
                    <template slot-scope="scope">
                        <slot :name="item.prop" :data="scope"></slot>
                    </template>
                </el-table-column>
                <!-- render -->
                <common-column ref="hosjoyColumn" v-bind="$attrs" :data="data" :column="item" :key="item.label + item.prop + index" v-if="!item.slot && !item.isHidden && !item.selfSettingHidden"></common-column>
            </template>
            <el-table-column label="操作" v-if="isAction" align="center" :min-width="actionWidth" class-name="allowDrag" :fixed="isActionFixed ? 'right' : false">
                <template slot-scope="scope">
                    <slot name="action" :data="scope"></slot>
                </template>
            </el-table-column>
            <!-- <font slot="empty" class="emptylayout" :style="{left:emptyTxtLeft+'px'}">暂无数据</font>-->
        </el-table>
        <!-- 分页 -->
        <div class="pages" v-if="showPagination">
            <el-pagination :current-page.sync="currentPage" :page-size.sync="pageNum" :page-sizes="pageSizes" :layout="layout" :total="total" v-bind="$attrs" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </div>
    </div>
</template>

<script>
import commonColumn from './common-column.vue'
import { getTableTop } from '@/utils/getTableTop'

export default {
    name: 'commonTable',
    props: {
        isShowselection: { type: Boolean, default: () => false },
        isShowRadio:{type: Boolean, default: () => false},
        isAction: { type: Boolean, default: () => false },
        isShowIndex: { type: Boolean, default: () => false },
        expand: { type: Boolean, default: () => false },
        column: Array,
        data: Array,
        spanMethod: Function,
        selectable: { type: Function, default: () => true },
        showPagination: { type: Boolean, default: false },
        isActionFixed: { type: Boolean, default: false }, // 操作列是否固定，如果该列使用自定义render可以不用写
        paginationTop: { type: String, default: '15px' },
        paginationAlign: { type: String, default: 'right' },
        merge: Array,
        total: { required: false, default: 0 },
        /** 页码 */
        pageNumber: { type: Number, default: 1 },
        /** 每页数量 */
        pageSize: { type: Number, default: 10 },
        pageSizes: {
            type: Array,
            default() {
                return [10, 20, 50, 100]
            },
        },
        layout: { type: String, default: 'total, sizes, prev, pager, next, jumper' },
        actionWidth: { type: String, default: '' },
        height: { required: false },
        collapseShow: {
            required: false,
            type: Boolean,
            default: false,
        },
        amountResetTable: {
            // 更改会重新渲染table高度
            required: false,
            type: Boolean,
            default: false,
        },
        isSimpleTable: {
            // 为了解决多级树 默认会选中子所有的，导致选择无限还是
            required: false,
            type: Boolean,
            default: false,
        },
    },
    components: {
        commonColumn,
    },
    mixins: [getTableTop],
    data() {
        return {
            i: 0,
            radioVal: '',
            toggleTable: true,
            mergeLine: {},
            mergeIndex: {},
            selfHeight: 0,
            collapse: false,
            defaultProps: {
                children: 'children',
                label: 'label',
            },
            defaultLabel: [],
            selectedColumn: [],
            columnRender: [],
            emptyTxtLeft: '',
            realColumn: [],
        }
    },
    created() {
        this.getMergeArr(this.data, this.merge)
    },
    computed: {
        amountResetTableChange() {
            return this.amountResetTable || Math.random()
        },
        dataLength() {
            if (this.data) {
                return this.data.length
            }
            return ''
        },
        currentPage: {
            get() {
                return this.pageNumber
            },
            set(val) {
                this.$emit('update:pageNumber', val)
            },
        },
        pageNum: {
            get() {
                return this.pageSize
            },
            set(val) {
                this.$emit('update:pageSize', val)
            },
        },
        switchLabel() {
            return this.column
                .filter(value => !value.selfSettingHidden)
                .map(value => {
                    let id = null
                    if (value.prop && value.label) {
                        id = value.prop
                    } else if (value.label) {
                        id = value.label
                    }
                    if (id) {
                        if (this.isSimpleTable) {
                            return {
                                id: id,
                                label: value.label,
                            }
                        }
                        return {
                            // 只遍历了2级，如果展示的是三级，需要将第一个label设置空
                            id: id,
                            label: value.label,
                            children:
                                value.children &&
                                value.children
                                    .filter(value => value.label !== '-' && !value.selfSettingHidden)
                                    .map(value1 => {
                                        let subId = id + (value1.uniqueLabel || value1.prop || value1.label)
                                        return {
                                            id: subId,
                                            label: value1.uniqueLabel || value1.label,
                                        }
                                    }),
                        }
                    } else {
                        // 第一行为空的情况,目前没有其他情况
                        // 如果第一节为空 prop或者selfProp 必须存在 && label定义为空
                        return {
                            id: value.prop || value.selfProp, // selfProp 针对有render的prop companyTable里面TotalColumn使用
                            label: value.children[0].label,
                        }
                    }
                })
        },
    },
    methods: {
        dragColumn(newWidth, oldWidth, column) {
            column.showOverflowTooltip = newWidth < column.minWidth
        },
        onHanderCollapseClick() {
            this.collapse = !this.collapse
            document.addEventListener('click', this.onClickCollapse, false)
        },
        onClickCollapse(e) {
            // .contains() 判断一个元素内是否包含另一个元素
            if (this.$refs.collapseShow && !this.$refs.collapseShow.contains(e.target)) {
                this.collapse = false
                document.removeEventListener('click', this.onClickCollapse, false)
            }
        },
        async updateLabel() {
            if (this.defaultLabel.length < 2) {
                this.$message.warning('选中不能小于2个')
            } else {
                this.toggleTable = false
                this.$nextTick(() => {
                    this.toggleTable = true
                })
                this.dealUpdateLabel(this.defaultLabel)
                this.collapse = false
            }
        },
        dealUpdateLabel(val) {
            this.columnRender.forEach(value => {
                const showColumnLabel = val
                if (!value.coderHidden) {
                    value.isHidden = showColumnLabel.indexOf(value.prop || value.label) === -1
                }
                if (value.children && !this.isSimpleTable) {
                    let number = 0
                    let id = ''
                    if (value.prop && value.label) {
                        id += value.prop
                    } else if (value.label) {
                        id += value.label
                    }
                    value.children.forEach(value1 => {
                        let subId = id + (value1.uniqueLabel || value1.prop || value1.label)
                        value1.isHidden = showColumnLabel.indexOf(subId) === -1
                        if (!value1.isHidden) number++
                    })
                    if (value.isHidden) {
                        // 二级列表判断是否需要显示 如果数组底下有勾选的 修改显示父树结构
                        value.isHidden = !(number > 0)
                    }
                }
            })
            this.toggleTable = false
            this.$nextTick(() => {
                this.toggleTable = true
            })
            console.log(this.columnRender)
        },
        toggleTableHandler() {
            this.toggleTable = !this.toggleTable
        },
        hiddenOverflowTooltip(row) {
            if (row.column.showOverflowTooltip) {
                return 'hiddenOverflowTooltip'
            }
        },
        async handleSizeChange(val) {
            await this.$emit('pagination', {
                pageNumber: this.currentPage,
                pageSize: val,
            })
        },
        async handleCurrentChange(val) {
            await this.$emit('pagination', {
                pageNumber: val,
                pageSize: this.pageNum,
            })
        },
        indexMethod(index) {
            return this.pageNum * (this.currentPage - 1) + index + 1
        },
        clearSelection() {
            this.$refs.hosjoyTable.clearSelection()
        },
        toggleRowSelection(row, selected) {
            this.$refs.hosjoyTable.toggleRowSelection(row, selected)
        },
        toggleAllSelection() {
            this.$refs.hosjoyTable.toggleAllSelection()
        },
        toggleRowExpansion(row, expanded) {
            this.$refs.hosjoyTable.toggleRowExpansion(row, expanded)
        },
        setCurrentRow(row) {
            this.$refs.hosjoyTable.setCurrentRow(row)
        },
        clearSort() {
            this.$refs.hosjoyTable.clearSort()
        },
        clearFilter(columnKey) {
            this.$refs.hosjoyTable.clearFilter(columnKey)
        },
        doLayout() {
            this.$refs.hosjoyTable && this.$refs.hosjoyTable.doLayout()
        },
        sort(prop, order) {
            this.$refs.hosjoyTable.sort(prop, order)
        },
        paginationCurrentChange(val) {
            this.$emit('p-current-change', val)
        },
        getMergeArr(tableData, merge) {
            if (!merge) return
            this.mergeLine = {}
            this.mergeIndex = {}
            merge.forEach((item, k) => {
                tableData.forEach((data, i) => {
                    if (i === 0) {
                        this.mergeIndex[item] = this.mergeIndex[item] || []
                        this.mergeIndex[item].push(1)
                        this.mergeLine[item] = 0
                    } else {
                        if (data[item] === tableData[i - 1][item]) {
                            this.mergeIndex[item][this.mergeLine[item]] += 1
                            this.mergeIndex[item].push(0)
                        } else {
                            this.mergeIndex[item].push(1)
                            this.mergeLine[item] = i
                        }
                    }
                })
            })
        },
        mergeMethod({ row, column, rowIndex, columnIndex }) {
            const index = this.merge.indexOf(column.property)
            if (index > -1) {
                const _row = this.mergeIndex[this.merge[index]][rowIndex]
                const _col = _row > 0 ? 1 : 0
                return {
                    rowspan: _row,
                    colspan: _col,
                }
            }
        },
        collectDefaultId(arr, isRestDefaultLabel) {
            if (!isRestDefaultLabel) {
                this.defaultLabel = []
            }
            arr.forEach(value => {
                if (value.children) {
                    if (this.isSimpleTable) {
                        // 无子级树入口
                        this.defaultLabel.push(value.id)
                    } else {
                        this.collectDefaultId(value.children, true)
                    }
                } else {
                    this.defaultLabel.push(value.id)
                }
            })
        },
        checkHandler(item, currentItemChecked) {
            if (!currentItemChecked) {
                const idExist = this.defaultLabel.indexOf(item.id)
                if (idExist > -1) {
                    this.defaultLabel.splice(idExist, 1)
                }
            } else {
                this.defaultLabel.push(item.id)
                this.defaultLabel = [...new Set(this.defaultLabel)]
            }
        },
        // 点击某个单元格触发事件
        radioChange(row) {
            // console.log('radioChange', row)
            this.radioVal = this.data.indexOf(row)
            this.$emit('radioChange', row, this.radioVal)
        },
        isArray(object) {
            return Array.isArray(object)
        },
        isObject(object) {
            return typeof object === 'object'
        },
        deepCopy(object) {
            let resultObject = {}
            // 如果是数组
            if (this.isArray(object)) {
                return object.map(item => {
                    if (this.isArray(item) || this.isObject(item)) {
                        return this.deepCopy(item)
                    }
                    return item
                })
            } else if (this.isObject(object)) {
                Object.entries(object).map(([key, value]) => {
                    if (value && (this.isArray(value) || this.isObject(value))) {
                        resultObject[key] = this.deepCopy(value)
                    } else {
                        resultObject[key] = value
                    }
                })
            }
            return resultObject
        },
    },
    watch: {
        merge() {
            this.getMergeArr(this.data, this.merge)
        },
        dataLength() {
            this.getMergeArr(this.data, this.merge)
        },
        column: {
            handler(val) {
                if (this.collapseShow) {
                    this.columnRender = this.deepCopy(val)
                    this.$set(this, 'realColumn', this.columnRender)
                } else {
                    this.toggleTable = false
                    this.$set(this, 'realColumn', val)
                    this.$nextTick(() => {
                        this.toggleTable = true
                    })
                }
            },
            deep: true,
            immediate: true,
        },
    },
    mounted() {
        console.log(this.$refs.hosjoyTable)
        this.$nextTick(() => {
            if (this.$refs.zfTable) {
                this.selfHeight = this.$refs.zfTable.getBoundingClientRect().top + 40
                this.collectDefaultId(this.switchLabel)
                if (this.data.length == 0) {
                    let left = this.$refs.zfTable.getBoundingClientRect().left
                    let windowsWidth = document.documentElement.clientWidth
                    let tableWidth = windowsWidth - left // fix position: fixed是相对于窗口的，有可能表格左边有别的东西
                    this.emptyTxtLeft = left + Math.ceil(tableWidth / 2)
                }
            }
        })
    },
}
</script>
<style scoped>
.zf-table >>> .hosjoyRender > :first-child {
    text-overflow: ellipsis;
    overflow: hidden;
}
.zf-table >>> .el-table .cell {
    font-size: 12px;
}
.zf-table >>> .el-table th {
    color: #000000;
    font-size: 12px;
    font-weight: 400;
}
.zf-table >>> .el-table--border th.gutter:last-of-type {
    /* fix element ui 表头错位（出现滚动条后错位） */
    display: block !important;
    width: 17px !important;
}
.zf-table >>> .el-table .branch-total-row {
    background: rgb(235, 241, 222);
    font-weight: bold;
}

.zf-table >>> .el-table__row--striped.branch-total-row td {
    background: rgb(235, 241, 222);
    font-weight: bold;
}

.zf-table >>> .el-table .total-row {
    background: rgb(253, 233, 217);
    font-weight: bold;
}
.zf-table >>> .el-table__fixed-right {
    background: #f5f7fa;
}
.zf-table >>> .el-table thead.has-gutter th {
    background: #f5f7fa;
}
.zf-table >>> .el-table th {
    background: #f5f7fa;
}
</style>
<style scoped lang="scss">
.zf-table {
    position: relative;
}
//fix element ui 表头错位（出现滚动条后错位）
.zf-table >>> .el-table--border th.gutter:last-of-type {
    display: block !important;
    width: 17px !important;
}
.hosjoy-in-table {
    // min-height: 300px;
    position: relative;
    z-index: 1;
}

.zf-table >>> .el-table .cell {
    font-size: 12px;
}

/* .zf-table >>> .el-table .caret-wrapper {
        height: 20px;
    } */
.zf-table >>> .el-table th {
    color: #000000;
    font-size: 12px;
    font-weight: 400;
}

.pages {
    text-align: right;
    margin-top: 20px;
}

.pages .el-pagination {
    text-align: right;
}

.zf-table >>> .el-table .branch-total-row {
    background: rgb(235, 241, 222);
    font-weight: bold;
}

.zf-table >>> .el-table__row--striped.branch-total-row td {
    background: rgb(235, 241, 222);
    font-weight: bold;
}

.zf-table >>> .el-table .total-row {
    background: rgb(253, 233, 217);
    font-weight: bold;
}

/*.zf-table >>> .el-table .branch-total-row .wisdom-total-background,.zf-table >>> .el-table .branch-total-row .wisdom-total-background:hover {*/
/*    background: rgb(235, 241, 222);*/
/*    font-weight: bold;*/
/*}*/

/*.zf-table >>> .el-table .wisdom-total-background {*/
/*    background: rgb(220, 230, 241);*/
/*}*/
/*.zf-table >>> .el-table .total-row .wisdom-total-background, .zf-table >>> .el-table .total-row .wisdom-total-background:hover  {*/
/*    background: rgb(253, 233, 217);*/
/*    font-weight: bold;*/
/*}*/
.collapseW {
    width: 280px;
}
.collapse {
    position: absolute;
    box-sizing: border-box;
    padding: 10px 15px;
    height: 50px;
    right: -20px;
    top: -50px;
    z-index: 2;
    cursor: pointer;

    img {
        float: right;
        width: 20px;
        margin-top: 10px;
        margin-right: 10px;
    }
    :deep.el-button--mini {
        float: left;
        margin-top: 4px;
    }
}
.on {
    background: #ffffff;
}

.collapse-content {
    position: absolute;
    width: 280px;
    top: 0px;
    right: 10px;
    background: #ffffff;
    z-index: 2;
    padding: 5px 10px;
    box-sizing: border-box;
    max-height: 400px;
    overflow: hidden;
    overflow-y: scroll;
}

.zf-table >>> .el-table .branch-total-row {
    background: rgb(235, 241, 222);
    font-weight: bold;
}

.zf-table >>> .el-table__row--striped.branch-total-row td {
    background: rgb(235, 241, 222);
    font-weight: bold;
}

.zf-table >>> .el-table .total-row {
    background: rgb(253, 233, 217);
    font-weight: bold;
}

.zf-table >>> .hiddenOverflowTooltip .cell {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.zf-table >>> .el-tree-node__label {
    margin-left: 6px;
}
.zf-table >>> .el-table__fixed-right {
    background: #f5f7fa;
}
.zf-table >>> .el-table thead.has-gutter th {
    background: #f5f7fa;
}
.zf-table >>> .el-table th {
    background: #f5f7fa;
}
.zf-table >>> .el-table--fluid-height .el-table__fixed {
    bottom: 11px !important;
}
:deep.el-table .hidden-columns,
:deep.el-table td.is-hidden > *,
:deep.el-table th.is-hidden > *,
:deep.el-table--hidden {
    visibility: visible;
}
:deep.el-table__fixed-right::before,
:deep.el-table__fixed::before {
    display: none;
}
:deep.el-table .cell {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
}
:deep .el-table__fixed-body-wrapper {
    padding-bottom: 4px;
    box-sizing: border-box;
}
:deep.el-table .cell.el-tooltip {
    min-width: 10px;
}
</style>
