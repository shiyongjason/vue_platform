<template>
    <el-table :data="data">
        <el-table-column prop="param" label="参数" width="130">
        </el-table-column>
        <el-table-column prop="name" label="名称" width="130">
        </el-table-column>
        <el-table-column prop="desc" label="说明">
            <template slot-scope="scope">
                <slot name="desc" :data="scope">
                    <span v-html="scope.row.desc"></span>
                </slot>
            </template>
        </el-table-column>
        <el-table-column prop="type" label="类型" width="100">
        </el-table-column>
        <el-table-column prop="optional" label="可选值" width="150">
        </el-table-column>
        <el-table-column prop="default" label="默认值" width="150">
        </el-table-column>
    </el-table>
</template>

<script>
export default {
    name: 'p-attr-table',
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
p {
    margin: 0;
}
</style>
