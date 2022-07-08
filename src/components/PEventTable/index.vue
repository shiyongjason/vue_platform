<template>
    <el-table :data="data">
        <el-table-column prop="name" label="事件名" width="140">
        </el-table-column>
        <el-table-column prop="desc" label="说明">
        </el-table-column>
        <el-table-column prop="param" label="参数" width="150">
        </el-table-column>
    </el-table>
</template>

<script>
export default {
    name: 'p-event-table',
    props: {
        data: {
            type: Array,
            default: () => []
        }
    }
}
</script>

<style>
.el-table td {
    padding: 10px 0;
}
</style>
