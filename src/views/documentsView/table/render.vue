<template>
    <div>
        <h3>render用法</h3>
        <commonTable ref="zfTable" align="center" @sort-change="sortChange" :column="tableLabel" :data="tableData" :height="400"> </commonTable>
        <PExample :code="code2" />
        <h3>column属性</h3>
        <PAttrTable :data="attrs2" />
    </div>
</template>
<script>
import { code2, attrs2 } from './code/base'
export default {
    name: 'Base-view',
    data() {
        return {
            code2,
            attrs2,
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
                {
                    prop: 'name',
                    label: '姓名',
                    width: '170',
                    sortable: true,
                    render: (h, scope) => {
                        // render
                        return (
                            <span>
                                <i class="el-icon-eleme"></i>
                                {scope.row.name}
                                /8岁
                            </span>
                        )
                    },
                },
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
