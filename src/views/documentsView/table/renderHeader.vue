<template>
    <div>
        <h3>Label用法</h3>
        <commonTable ref="zfTable" align="center" @sort-change="sortChange" :column="tableLabel" :data="tableData" :height="400"> </commonTable>
       <PExample :code="code3"/>
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
