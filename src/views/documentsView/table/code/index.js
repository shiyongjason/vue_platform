export const code = `
<template>
    <div class="commonTable">
        <commonTable ref="commonTable" expand border stripe showPagination isShowIndex isShowselection :column="column" :data="tableData" align="center" :row-class-name="tableRowClassName" :default-sort="{prop: 'date', order: 'ascending'}" @selection-change="handleSelectionChange" show-summary
            :summary-method="getSummary" :span-method="arraySpanMethod" :total="page.total" :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" @pagination="getList">

            <template slot="expand" slot-scope="scope">
                expand{{scope.data.row.name}}
            </template>
            <template slot="ceshi" slot-scope="scope">
                测试slot-{{scope.data.row.ceshi}}
            </template>

        </commonTable>
        <div style="margin-top: 20px">
            <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
            <el-button @click="toggleSelection()">取消选择</el-button>
        </div>
    </div>
</template>
<script>
import commonTable from '../../zfTable/common-table'
export default {
    name: 'table',
    components: {
        commonTable
    },
    data () {
        return {
            queryParams: {
                pageNumber: 1,
                pageSize: 10
            },
            page: {
                sizes: [10, 20, 50, 100],
                total: 0
            },
            multipleSelection: [],
            column: [
                {
                    prop: 'date',
                    label: '日期',
                    width: '100',
                    sortable: true,
                    renderHeader: (h, scope) => {
                        return <span><i class="el-icon-time"></i>{scope.column.label}</span>
                    },
                    filters: [
                        { text: '2016-05-01', value: '2016-05-01' },
                        { text: '2016-05-02', value: '2016-05-02' },
                        { text: '2016-05-03', value: '2016-05-03' },
                        { text: '2016-05-04', value: '2016-05-04' }
                    ],
                    filterMethod: this.filterHandler
                },
                {
                    prop: 'name',
                    label: '姓名',
                    render: (h, scope) => {
                        return (
                            <div>
                                {
                                    scope.row._edit
                                        ? <el-input size='mini' value={scope.row[scope.column.property]} onInput={(val) => { scope.row[scope.column.property] = val }}></el-input>
                                        : <span>{scope.row[scope.column.property]}</span>
                                }
                            </div>
                        )
                    }
                },
                {
                    prop: 'num',
                    label: '数值',
                    displayAs: 'money'
                },
                {
                    label: '测试二级表头',
                    children: [
                        {
                            prop: 'date',
                            label: '日期',
                            displayAs: 'YYYY-MM-DD HH:mm'
                        },
                        {
                            prop: 'name',
                            label: '姓名',
                            width: '88',
                            render: (h, scope) => {
                                return <el-tag>{scope.row.name}</el-tag>
                                // return <el-tag>{ scope.row[scope.column.property] }</el-tag>
                            }
                        },
                        {
                            prop: 'address',
                            label: '地址',
                            formatter: this.formatter
                        }
                    ]
                },
                {
                    prop: 'ceshi',
                    label: '测试slot',
                    slot: 'ceshi'
                },
                {
                    prop: 'dicData',
                    label: '字典',
                    dicData: [{ label: '否', value: '0' }, { label: '是', value: '1' }]
                },
                {
                    label: '操作',
                    fixed: 'right',
                    width: '150px',
                    // slot: 'action',
                    render: (h, scope) => {
                        return (
                            <div>
                                {
                                    scope.row._edit
                                        ? <div>
                                            <el-button type="primary" size='mini' onClick={() => { this.handleSave(scope) }}>保存</el-button>
                                            <el-button size='mini' onClick={() => { this.handleCancle(scope) }}>取消</el-button>
                                        </div>
                                        : <el-button type="primary" size='mini'
                                            onClick={() => { this.handleEdit(scope) }}>行内编辑</el-button>
                                }
                            </div>
                        )
                    }
                }
            ],
            tableData: []
        }
    },
    methods: {
        getList () {
            console.log(this.queryParams)
            this.tableData = [
                {
                    date: '2019-09-29T05:54:15.000+0000',
                    name: '王小虎1',
                    address: '上海市普陀区金沙江路 1518 弄',
                    ceshi: 0,
                    num: 1230,
                    dicData: 0
                },
                {
                    date: '2016-05-02',
                    name: '王小虎2',
                    address: '上海市普陀区金沙江路 1518 弄',
                    ceshi: 1,
                    num: 4560,
                    dicData: '1'
                },
                {
                    date: '2016-05-03',
                    name: '王小虎3',
                    address: '上海市普陀区金沙江路 1518 弄',
                    ceshi: 0,
                    num: null,
                    dicData: 1
                }
            ]
            this.page.total = 3
        },
        tableRowClassName ({ row, rowIndex }) {
            if (rowIndex === 0) {
                return 'warning-row'
            } else if (rowIndex === 1) {
                return 'success-row'
            }
            return ''
        },
        formatter (row, column) {
            return row.name + '自定义formatter'
        },
        filterHandler (value, row, column) {
            const property = column['property']
            return row[property] === value
        },
        handleEdit (scope) {
            this.$set(scope.row, '_edit', true)
            console.log(this.tableData)
        },
        handleSave (scope) {
            this.$set(scope.row, '_edit', false)
        },
        handleCancle (scope) {
            this.$set(scope.row, '_edit', false)
        },
        toggleSelection (rows) {
            if (rows) {
                rows.forEach(row => {
                    this.$refs.commonTable.toggleRowSelection(row)
                })
            } else {
                this.$refs.commonTable.clearSelection()
            }
        },
        handleSelectionChange (val) {
            this.multipleSelection = val
        },
        getSummary (param) {
            const { columns, data } = param
            const sums = []
            columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = '合计'
                    return
                }
                const values = data.map(item => Number(item[column.property]))
                if (!values.every(value => isNaN(value))) {
                    sums[index] = values.reduce((prev, curr) => {
                        const value = Number(curr)
                        if (!isNaN(value)) {
                            return prev + curr
                        } else {
                            return prev
                        }
                    }, 0)
                    sums[index] += ' 元'
                } else {
                    sums[index] = 'N/A'
                }
            })

            return sums
        },
        arraySpanMethod ({ row, column, rowIndex, columnIndex }) {
            if (rowIndex % 2 === 0) {
                if (columnIndex === 0) {
                    return [1, 2]
                } else if (columnIndex === 1) {
                    return [0, 0]
                }
            }
        }
    },
    mounted () {
        this.getList()
    }
}
</script>
`

export const attrsSlot = [
    {
        param: 'connect',
        desc: '抽屉内容'
    },
    {
        param: 'btn',
        desc: '抽屉底部按钮'
    }
]


export const attrs = [
    {
        param: 'options',
        desc: 'Element 剩余参数',
        type: 'Object',
        optional: '-',
        default: '-'
    }
]

export const events = [
    {
        name: 'Sortable',
        desc: '支持 SortableJs 和 ElementTbale',
        param: '-'
    },
    {
        name: '其他',
        desc: '支持 Element-UI 方法使用，参考 element 官网',
        param: '-'
    }
]