<template>
    <div>
        <h3>多选用法</h3>
        <commonTable ref="zfTable" align="center" showPagination isShowselection @sort-change="sortChange" @selection-change="handleSelectionChange" :column="tableLabel" :data="tableData" :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" :total="total" @pagination="getList" :height="400"> </commonTable>
        <PExample :code="code4" />
        <h3>属性</h3>
        <PAttrTable :data="attrs4" />
        <h3>事件</h3>
        <PEventTable :data="events4" />
    </div>
</template>
<script>
import { code4,attrs4,events4 } from './code/base'
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
