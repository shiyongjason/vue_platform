<template>
    <div class="home">
        <h3>基本用法+拖拽</h3>
        <PExample :code="code">
            <div style="margin: 20px">
                <el-button @click="toggleSelection([newList[1], newList[2]])">切换第二、第三行的选中状态</el-button>
                <el-button @click="toggleSelection()">取消选择</el-button>
            </div>
            <commonTable
                isShowIndex
                ref="zfTable"
                isShowselection
                border
                stripe
                showPagination
                collapseShow
                align="center"
                :column="tableLabel"
                :data="newList"
                :pageNumber.sync="queryParams.pageNumber"
                :pageSize.sync="queryParams.pageSize"
                :total="page.total"
                @pagination="getList"
                actionWidth="120"
                :height="600"
                highlight-current-row
                @expand-change="expandSelect"
                row-key="id"
                :expand-row-keys="expands"
                expand
                :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
                show-summary
                isAction
                :isActionFixed="newList && newList.length > 0"
                @sort-change="sortChange"
                @cell-click="cellClick"
                @selection-change="handleSelectionChange"
            >
                <template slot="expand">
                    <!-- 展开expand 使用 -->
                    <commonTable isShowIndex ref="zfTable1" align="center" :column="tableLabel" :data="newList" :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" :total="page.total" @pagination="getList"> </commonTable>
                </template>
                <template #payAddress="slotProps"> {{ slotProps.data.row.payAddress }}111 {{ slotProps.data.row.payAddress }} {{ slotProps.data.row.payAddress }} {{ slotProps.data.row.payAddress }} </template>
                <template slot="action" slot-scope="scope">
                    <el-button size="mini" type="primary" @click="onClickRow(scope)">点击</el-button>
                </template>
            </commonTable>
        </PExample>
         <h3>属性</h3>
        <PAttrTable :data="attrs" />

        <h3>事件</h3>
        <PEventTable :data="events" />
    </div>
</template>

<script lang="tsx">
import Vue, { CreateElement } from 'vue'
import Component from 'vue-class-component'
import { code, attrs, events, attrsSlot } from './code/index'
import Sortable from 'sortablejs'

// @Component 修饰符注明了此类为一个 Vue 组件
@Component({
    components: {
        // commonTable,
    },
})
export default class HomeView extends Vue {
    $refs: any
    code = code
    attrs = attrs
    events = events
    attrsSlot = attrsSlot
    // 定义
    searchValue  = ''
    expands = []
    queryParams:Record<string,any> = {
        pageSize: 10,
        pageNumber: 1,
    }
    page = {
        total: 0,
    }
    tableLabel: tableLabelProps = [
        {
            label: 'id',
            prop: 'id',
            width: '50',
            // fixed: true,
        },
        {
            label: '金额格式化写法',
            prop: 'paid',
            width: '200',
            formatter: this.formatterMoney,
            // fixed: true,
        },
        {
            label: '金额金额金额金额金额金额金额金额金额金额金额金额',
            prop: 'paidAmount',
            width: '200',
            displayAs: 'money',
            unit: '元',
            className: 'form-table-header',
            isUseCommonRenderHeader: true,//常用头 一般用不到
            showOverflowTooltip: true,
        },
        {
            label: '自定义表头',
            prop: 'paidType',
            width: '230',
            renderHeader: (h: CreateElement, scope: TableRenderParam): JSX.Element => {
                return (
                    <span>
                        {scope.column.label}
                        <i
                            class={'el-icon-plus pointer'}
                            onClick={() => {
                                this.handleExpand(scope)
                            }}
                        ></i>
                        <el-input
                            class="mini"
                            size="mini"
                            placeholder="请输入"
                            value={scope.column.property}   // 表头没有 .row  双向绑定
                            onInput={(val: any) => {
                                console.log('[ val ]-130', val,scope.column.property)
                                scope.column.property =val
                            }}
                        ></el-input>
                    </span>
                )
            },
        },
        {
            label: '时间',
            prop: 'paidTime',
            width: '130',
            sortable: 'custom',
            displayAs: 'YYYY-MM-DD', // YYYY-MM-DD HH:mm
            filters: [
                { text: '2016-05-01', value: '2016-05-01' },
                { text: '2016-05-02', value: '2016-05-02' },
                { text: '2016-05-03', value: '2016-05-03' },
                { text: '2016-05-04', value: '2016-05-04' },
            ],
            filterMethod: this.filterHandler,
            filterPlacement: 'bottom-end',
        },
        {
            label: '类型',
            prop: 'paidTypes',
            dicData: [
                { value: 1, label: '现金' },
                { value: 2, label: '扫码' },
            ],
        },
        {
            label: 'render',
            prop: 'payAccount',
            render: (h: CreateElement, scope: TableRenderParam) => {
                // jsx
                return (
                    <span>
                        <i class="el-icon-eleme"></i>
                        {scope.row.payAccount}
                        {scope.row.payeeBankName}
                    </span>
                )
            },
        },
        {
            label: 'render',
            prop: 'claimAmount',
            className: 'form-table-header',
            width: '220',
            render: (h: CreateElement, scope: TableRenderParam) => {
                return (
                    <div>
                        <el-input
                            class="mini"
                            size="mini"
                            placeholder="请输入"
                            value={scope.row[scope.column.property]}
                            onInput={(val: any) => {
                                scope.row[scope.column.property] = val
                            }}
                        ></el-input>
                    </div>
                )
            },
        },
        {
            label: '插槽',
            prop: 'payAddress',
            slot: 'payAddress',
            width: '200',
            showOverflowTooltip: true,
        },
        {
            label: '一级',
            children: [
                {
                    label: '二级',
                    minWidth: '120',
                    prop: 'LoansAmount',
                },
                {
                    label: '二级',
                    minWidth: '120',
                    prop: 'PrincipalPaid',
                    children: [
                        {
                            label: '三级',
                            prop: 'PrincipalPaid',
                            minWidth: '120',
                            showOverflowTooltip: true,
                        },
                    ],
                },
            ],
        },
    ]

    data = {
        id: 1,
        paidTime: '2022-11-09',
        paid: 1000,
        payAccount: '1000',
        payeeBankName: '中国',
        payAddress: '南京江北',
        claimAmount: 10,
        paidType: 2,
        paidTypes: 2,
        paidAmount: 299999,
        // children: [
        //     {
        //         id: 11,
        //         paidTime: 299999,
        //     },
        // ],
    }
    tableData: Array<any> = []
    newList: Array<any> = []

    // 金额展示格式化
    formatterMoney(row: any[], column: any) {
        if (row[column.property] == null) return '-'
        let res = row[column.property].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        return res == 0 ? 0 : `¥${res}`
    }
    // 获取数据
    getList() {
        let start = (this.queryParams.pageNumber - 1) * this.queryParams.pageSize
        let end = this.queryParams.pageNumber * this.queryParams.pageSize
        let newList = this.tableData.slice(start, end)
        this.newList = newList
    }

    // 筛选功能
    sortChange(row: any) {
        console.log('[ val ]-40', row)
    }
    // 点击行
    onClickRow(row: Array<any>) {
        this.$message.info(`${row}`)
    }
    // 全选
    selectAll(val: any) {
        console.log('[ val ]-124', val)
    }
    // 行点击
    cellClick(val: any) {
        console.log('[ val ]-141', val)
    }
    // 编辑
    handleEdit(val: any) {
        console.log('[ val ]-149', val)
    }
    // 选中
    toggleSelection(rows: any) {
        if (rows) {
            rows.forEach((row: any) => {
                this.$refs.zfTable.toggleRowSelection(row)
            })
        } else {
            this.$refs.zfTable.clearSelection()
        }
    }
    handleSelectionChange(val: any) {
        console.log('[ val ]-157', val)
    }
    // 头过滤
    filterHandler(value: any, row: any, column: any) {
        const property = column['property']
        return row[property] === value
    }
    // 展开功能
    handleExpand(scope: any) {
        console.log('[ scope ]-193', scope)
    }

    expandSelect(row: any, expandedRows: any) {
        let expands: any[] = []
        if (expandedRows.length) {
            if (row) {
                expands.push(row.id)
            }
        } else {
            expands = []
        }
    }
    // 拖拽
    setSort() {
        const el = this.$refs.zfTable.$el.querySelector('.el-table__body-wrapper tbody')
        // const el = document.querySelector(".el-table__body-wrapper tbody");
        Sortable.create(el, {
            ghostClass: 'movedom',
            // handle: '.allowDrag',
            setData: (dataTransfer: any) => {
                dataTransfer.setData('Text', '')
            },
            onEnd: (evt: any) => {
                // 处理数据
                this.newList.splice(evt.newIndex, 0, this.newList.splice(evt.oldIndex, 1)[0])
                let newArray = JSON.parse(JSON.stringify(this.newList))
                this.newList = []
                this.$nextTick(function () {
                    this.newList = newArray
                })
            },
        })
    }
    mounted() {
        // 模拟数据
        for (var i = 0; i < 23; i++) {
            // _data.children[0].id =  _data.children[0].id+i
            this.data = {
                ...this.data,
                id: this.data.id + 1,
            }
            this.tableData.push(this.data)
        }
        this.page = {
            total: 23,
        }
        this.getList()

        //阻止火狐拖拽新建新页面
        document.body.addEventListener(
            'drop',
            event => {
                event.preventDefault()
                event.stopPropagation()
            },
            false
        )
        this.$nextTick(() => {
            this.setSort();
        });
    }
}
</script>
<style scoped>
.home {
    padding: 2px;
}
</style>
