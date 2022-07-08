export const code = `
<template>
    <div>
        <commonTable ref="zfTable" align="center"  @sort-change="sortChange" :column="tableLabel" :data="tableData" :height="400"> </commonTable>
    </div>
</template>
<script>
export default {
    name: 'Base-view',
    data() {
        return {
            tableData: [
                {
                    id: '1',
                    date: '2019-09-25',
                    name: '张三',
                    status: '2',
                    address: '广东省广州市天河区',
                },
                {
                    id: '2',
                    date: '2019-09-26',
                    name: '张三1',
                    status: '1',
                    address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2',
                },
                {
                    id: '3',
                    date: '2019-09-27',
                    name: '张三2',
                    status: '3',
                    address: '广东省广州市天河区3',
                },
            ],
            tableLabel: [
                { prop: 'name', label: '姓名', width: '130', sortable: true },
                { prop: 'date', label: '日期', width: '130', sortable: true },
                { prop: 'status', label: '状态', sortable: true },
                { prop: 'address', label: '地址' },
            ],
        }
    },
    methods: {
        sortChange({ column, prop, order }){
            console.log('[  column, prop, order ]-44',  column, prop, order)

        }
    },
}
</script>

`

export const code1 = `
<template>
    <div>
        <h3>基本用法</h3>
        <commonTable ref="zfTable" align="center" showPagination @sort-change="sortChange" :column="tableLabel" :data="tableData" :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" :total="total" @pagination="getList" :height="400">
        </commonTable>
    </div>
</template>
<script>
import { code } from './code/base'
export default {
    name: 'Base-view',
    data() {
        return {
            total:11,
            queryParams:{
                pageNumber:1,
                pageSize:10,
            },
            code,
            tableData: [
                {
                    id: '1',
                    date: '2019-09-25',
                    name: '张三',
                    status: '2',
                    address: '广东省广州市天河区',
                },
                {
                    id: '2',
                    date: '2019-09-26',
                    name: '张三1',
                    status: '1',
                    address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2',
                },
                {
                    id: '3',
                    date: '2019-09-27',
                    name: '张三2',
                    status: '3',
                    address: '广东省广州市天河区3',
                },
            ],
            tableLabel: [
                { prop: 'name', label: '姓名', width: '130', sortable: true },
                { prop: 'date', label: '日期', width: '130', sortable: true },
                { prop: 'status', label: '状态', sortable: true },
                { prop: 'address', label: '地址' },
            ],
        }
    },
    methods: {
        sortChange({ column, prop, order }) {
            console.log('[  column, prop, order ]-44', column, prop, order)
        },
        getList(){
            //查询接口
        }
    },
}
</script>

`

export const attrs1 = [
    {
        param: 'showPagination',
        desc: '是否展示分页',
        type: 'Boolean',
        optional: '-',
        default: 'false'
    },
    {
        param: 'pageNumber',
        desc: '页码',
        type: 'number',
        optional: '-',
        default: '1'
    },
    {
        param: 'pageSize',
        desc: '页数',
        type: 'Number',
        optional: '-',
        default: '10'
    }
]

export const events1 = [
    {
        name: 'pagination',
        desc: '查询数据,适用目前项目迁移的',
        param: '-'
    },

]


export const code2 = `
<template>
    <div>
        <h3>基本用法</h3>
        <commonTable ref="zfTable" align="center" @sort-change="sortChange" :column="tableLabel" :data="tableData" :height="400"> </commonTable>
    </div>
</template>
<script>
import {code} from './code/base'
export default {
    name: 'Base-view',
    data() {
        return {
            code,
            tableData: [
                {
                    id: '1',
                    date: '2019-09-25',
                    name: '张三',
                    status: '2',
                    address: '广东省广州市天河区',
                },
                {
                    id: '2',
                    date: '2019-09-26',
                    name: '张三1',
                    status: '1',
                    address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2',
                },
                {
                    id: '3',
                    date: '2019-09-27',
                    name: '张三2',
                    status: '3',
                    address: '广东省广州市天河区3',
                },
            ],
            tableLabel: [
                { prop: 'name', label: '姓名', width: '170', sortable: true ,
                    render: (h, scope) => {
                        // render
                        return (
                            <span>
                                <i class="el-icon-eleme"></i>
                                {scope.row.name}
                               /8岁
                            </span>
                        )
                    } },
                { prop: 'date', label: '日期', width: '130', sortable: true },
                { prop: 'status', label: '状态', sortable: true },
                { prop: 'address', label: '地址' },
            ],
        }
    },
    methods: {
        sortChange({ column, prop, order }){
            console.log('[  column, prop, order ]-44',  column, prop, order)
        }
    },
}
</script>

`

export const attrs2 = [
    {
        param: 'render',
        desc: 'JSX',
        type: '',
        optional: '-',
        default: ''
    },
]


export const code3 = `
<template>
    <div>
        <h3>基本用法</h3>
        <commonTable ref="zfTable" align="center" @sort-change="sortChange" :column="tableLabel" :data="tableData" :height="400"> </commonTable>
    </div>
</template>
<script>
import {code3} from './code/base'
export default {
    name: 'Base-view',
    data() {
        return {
            code3,
            tableData: [
                {
                    id: '1',
                    date: '2019-09-25',
                    name: '张三',
                    status: '2',
                    address: '广东省广州市天河区',
                },
                {
                    id: '2',
                    date: '2019-09-26',
                    name: '张三1',
                    status: '1',
                    address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2',
                },
                {
                    id: '3',
                    date: '2019-09-27',
                    name: '张三2',
                    status: '3',
                    address: '广东省广州市天河区3',
                },
            ],
            tableLabel: [
                { prop: 'name', label: '姓名', width: '170', sortable: true ,
                    renderHeader: (h, { column }) => {
                        return (
                            <span>
                                <span>{column.label}</span>
                                <el-tooltip class="tooltip" effect="dark" placement="right">
                                    <ul slot="content">
                                        <li>这是第一个提示</li>
                                        <li>这是第二个提示</li>
                                    </ul>
                                    <i class="el-icon-question" />
                                </el-tooltip>
                            </span>
                        )
                    }
   
                },
                { prop: 'date', label: '日期', width: '130', sortable: true },
                { prop: 'status', label: '状态', sortable: true },
                { prop: 'address', label: '地址' },
            ],
        }
    },
    methods: {
        sortChange({ column, prop, order }){
            console.log('[  column, prop, order ]-44',  column, prop, order)
        }
    },
}
</script>

`

// checkbox
export const code4 = `
<template>
    <div>
        <h3>基本用法</h3>
        <commonTable ref="zfTable" align="center" showPagination isShowselection @sort-change="sortChange" @selection-change="handleSelectionChange" :column="tableLabel" :data="tableData" :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" :total="total" @pagination="getList" :height="400"> </commonTable>
    </div>
</template>
<script>
import { code4,attrs4,attrs4 } from './code/base'
export default {
    name: 'Base-view',
    data() {
        return {
            total: 11,
            queryParams: {
                pageNumber: 1,
                pageSize: 10,
            },
            code4,
            events4,
            attrs4,
            tableData: [
                {
                    id: '1',
                    date: '2019-09-25',
                    name: '张三',
                    status: '2',
                    address: '广东省广州市天河区',
                },
                {
                    id: '2',
                    date: '2019-09-26',
                    name: '张三1',
                    status: '1',
                    address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2',
                },
                {
                    id: '3',
                    date: '2019-09-27',
                    name: '张三2',
                    status: '3',
                    address: '广东省广州市天河区3',
                },
            ],
            tableLabel: [
                { prop: 'name', label: '姓名', width: '130', sortable: true },
                { prop: 'date', label: '日期', width: '130', sortable: true },
                { prop: 'status', label: '状态', sortable: true },
                { prop: 'address', label: '地址' },
            ],
        }
    },
    methods: {
        sortChange({ column, prop, order }) {
            console.log('[  column, prop, order ]-44', column, prop, order)
        },
        getList() {
            //查询接口
        },
        handleSelectionChange(val){
            console.log('[ val ]-65', val)

        }
    },
}
</script>

`

export const attrs4 = [
    {
        param: 'isShowselection',
        desc: '是否展示多选',
        type: '',
        optional: '-',
        default: 'false'
    },
]

export const events4 = [
    {
        name: 'selection-change',
        desc: '多选的数据',
        param: '-'
    },
]

// radio

export const code5 = `
<template>
    <div>
        <h3>单选用法</h3>
        <commonTable ref="zfTable" align="center" showPagination isShowRadio @sort-change="sortChange" @radioChange="handleRadioChange" :column="tableLabel" :data="tableData" :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" :total="total" @pagination="getList" :height="400"> </commonTable>
    </div>
</template>
<script>
import { code5,attrs5,events5 } from './code/base'
export default {
    name: 'Base-view',
    data() {
        return {
            total: 11,
            queryParams: {
                pageNumber: 1,
                pageSize: 10,
            },
            code1,
            events1,
            attrs1,
            tableData: [
                {
                    id: '1',
                    date: '2019-09-25',
                    name: '张三',
                    status: '2',
                    address: '广东省广州市天河区',
                },
                {
                    id: '2',
                    date: '2019-09-26',
                    name: '张三1',
                    status: '1',
                    address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2',
                },
                {
                    id: '3',
                    date: '2019-09-27',
                    name: '张三2',
                    status: '3',
                    address: '广东省广州市天河区3',
                },
            ],
            tableLabel: [
                { prop: 'name', label: '姓名', width: '130', sortable: true },
                { prop: 'date', label: '日期', width: '130', sortable: true },
                { prop: 'status', label: '状态', sortable: true },
                { prop: 'address', label: '地址' },
            ],
        }
    },
    methods: {
        sortChange({ column, prop, order }) {
            console.log('[  column, prop, order ]-44', column, prop, order)
        },
        getList() {
            //查询接口
        },
        handleRadioChange(val,index){
            console.log('[ val ]-65', val,index)

        }
    },
}
</script>

`

export const attrs5 = [
    {
        param: 'isShowRadio',
        desc: '是否展示单选',
        type: '',
        optional: '-',
        default: 'false'
    },
]

export const events5 = [
    {
        name: 'handleRadioChange',
        desc: '多选的数据',
        param: 'row,index'
    },
]

// aciton
export const code6 = `
<template>
    <div>
        <h3>分页用法</h3>
        <commonTable
            ref="zfTable"
            align="center"
            border
            stripe
            showPagination
            isAction
            collapseShow
            @sort-change="sortChange"
            :column="tableLabel"
            :data="tableData"
            :pageNumber.sync="queryParams.pageNumber"
            :pageSize.sync="queryParams.pageSize"
            :total="total"
            @pagination="getList"
            :height="400"
        >
            <template slot="action" slot-scope="scope">
                <el-button size="mini" type="primary" @click="onClickRow(scope)">点击</el-button>
            </template>
        </commonTable>
    </div>
</template>
<script>
import { code5, attrs1, events5 } from './code/base'
export default {
    name: 'Base-view',
    data() {
        return {
            total: 11,
            queryParams: {
                pageNumber: 1,
                pageSize: 10,
            },
            code5,
            events5,
            attrs1,
            tableData: [
                {
                    id: '1',
                    date: '2019-09-25',
                    name: '张三',
                    status: '2',
                    address: '广东省广州市天河区',
                },
                {
                    id: '2',
                    date: '2019-09-26',
                    name: '张三1',
                    status: '1',
                    address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2',
                },
                {
                    id: '3',
                    date: '2019-09-27',
                    name: '张三2',
                    status: '3',
                    address: '广东省广州市天河区3',
                },
            ],
            tableLabel: [
                { prop: 'name', label: '姓名', width: '130', sortable: true },
                { prop: 'date', label: '日期', width: '130', sortable: true },
                { prop: 'status', label: '状态', sortable: true },
                { prop: 'address', label: '地址' },
            ],
        }
    },
    methods: {
        sortChange({ column, prop, order }) {
            console.log('[  column, prop, order ]-44', column, prop, order)
        },
        getList() {
            //查询接口
        },
        onClickRow(val) {
            console.log('[ val ]-84', val)
        },
    },
}
</script>


`

export const attrs6 = [
    {
        param: 'isAction',
        desc: '是否展示操作列',
        type: '',
        optional: 'slot写法',
        default: 'false'
    },
    {
        param: 'isActionFixed',
        desc: '是否固定操作列',
        type: '',
        optional: '',
        default: 'false'
    }, {
        param: 'collapseShow',
        desc: '列表筛选',
        type: '',
        optional: '',
        default: 'false'
    },
]

// children
export const code7 = `
<template>
    <div>
        <h3>children</h3>
        <commonTable ref="zfTable" align="center" row-key="id" :tree-props="{ children: 'children', hasChildren: 'hasChildren' }" @sort-change="sortChange" :column="tableLabel" :data="tableData" :height="400"> </commonTable>
    </div>
</template>
<script>
export default {
    name: 'Base-view',
    data() {
        return {
            code7,
            tableData: [
                {
                    id: '1',
                    date: '2019-09-25',
                    name: '张三',
                    status: '2',
                    address: '南京市中孚',
                },
                {
                    id: '2',
                    date: '2019-09-26',
                    name: '张三1',
                    status: '1',
                    address: '南京市中孚南京市中孚南京市中孚南京市中孚南京市中孚',
                    children: [
                        {
                            id: '22',
                            date: '2019-09-26',
                            name: '张三1',
                            status: '1',
                            address: '南京市中孚南京市中孚南京市中孚南京市中孚南京市中孚',
                        },
                    ],
                },
                {
                    id: '3',
                    date: '2019-09-27',
                    name: '张三2',
                    status: '3',
                    address: '南京市中孚南京市中孚南京市中孚南京市中孚',
                },
            ],
            tableLabel: [
                { prop: 'name', label: '姓名', width: '130', sortable: true },
                { prop: 'date', label: '日期', width: '130', sortable: true },
                { prop: 'status', label: '状态', sortable: true },
                { prop: 'address', label: '地址' },
            ],
        }
    },
    methods: {
        sortChange({ column, prop, order }) {
            console.log('[  column, prop, order ]-44', column, prop, order)
        },
    },
}
</script>

`

// dicdata
export const code8 = `
<template>
    <div>
        <h3>字典 转义</h3>
        <commonTable ref="zfTable" align="center"  @sort-change="sortChange" :column="tableLabel" :data="tableData" :height="400"> </commonTable>
    </div>
</template>
<script>
import {code} from './code/base'
export default {
    name: 'Base-view',
    data() {
        return {
            code,
            tableData: [
                {
                    id: '1',
                    date: '2019-09-25',
                    name: '张三',
                    status: '2',
                    address: '广东省广州市天河区',
                  
                },
                {
                    id: '2',
                    date: '2019-09-26',
                    name: '张三1',
                    status: '1',
                    address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2',
                },
                {
                    id: '3',
                    date: '2019-09-27',
                    name: '张三2',
                    status: '2',
                    address: '广东省广州市天河区3',
                },
            ],
            tableLabel: [
                { prop: 'name', label: '姓名', width: '130', sortable: true },
                { prop: 'date', label: '日期', width: '130', sortable: true, displayAs: 'YYYY-MM-DD' },
                { prop: 'status', label: '状态', sortable: true , dicData: [
                    { value: 1, label: '海底捞1' },
                    { value: 2, label: '海底捞2' },
                ],},
                { prop: 'address', label: '地址' },
            ],
        }
    },
    methods: {
        sortChange({ column, prop, order }){
            console.log('[  column, prop, order ]-44',  column, prop, order)
        }
    },
}
</script>


`

export const attrs8 = [
    {
        param: 'dicData',
        desc: '字典表',
        type: '',
        optional: '',
        default: 'false'
    },
    {
        param: 'displayAs',
        desc: '集成 项目中常用的',
        type: '',
        optional: '',
        default: ''
    },
    {
        param: 'formatter',
        desc: 'element 自带函数',
        type: '',
        optional: '',
        default: ''
    },
]