<template>
    <div>
        <h3>children</h3>
        <commonTable ref="zfTable" align="center" row-key="id" :tree-props="{ children: 'children', hasChildren: 'hasChildren' }" @sort-change="sortChange" :column="tableLabel" :data="tableData" :height="400"> </commonTable>
        <PExample :code="code7" />
    </div>
</template>
<script>
import { code7 } from './code/base'
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
