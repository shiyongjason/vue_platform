export const code = `
<template>
    <zf-layout showMoreBtn title="页面x">
        <template #zfSearch>
            <!-- 初始化根据每个formitem宽度 和 外层宽度对比 超过的 通过展开 隐藏显示 -->
            <el-form ref="searchForm" inline :model="form" label-width="100px">
                <el-form-item label="活动名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="活动时间">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="选择日期" style="width: 100%"></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="1">-</el-col>
                    <el-col :span="11">
                        <el-time-picker placeholder="选择时间" style="width: 100%"></el-time-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="活动名称">
                    <el-col :span="11">
                        <el-input v-model="form.name"></el-input>
                    </el-col>
                    <el-col class="line" :span="1">-</el-col>
                    <el-col :span="7">
                        <el-input v-model="form.name"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="活动区域">
                    <el-select v-model="form.type" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="活动名称1">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="活动名称1">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="活动名称1">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
            </el-form>
        </template>
        <template #zfBtn>
            <el-button type="primary" @click="onSearch">查询</el-button>
            <el-button @click="onReast">重置</el-button>
        </template>
        <div class="">我是card</div>
        <template #zfWrap>
        <div class="content-oper">
                <el-radio-group v-model="radio1" @change="onChangeTab">
                <el-radio-button label="tab1"></el-radio-button>
                <el-radio-button label="tab2"></el-radio-button>
            </el-radio-group>
            <el-button @click="onReast">导出</el-button>
        </div>
        </template>
        <template #zfTable>
            <commonTable isShowIndex ref="zfTable" border stripe showPagination align="center" :column="tableLabel" :data="tableData" :height="400" :pageNumber.sync="queryParams.pageNumber" :pageSize.sync="queryParams.pageSize" :total="total" @pagination="getList">
            </commonTable>
        </template>
    </zf-layout>
</template>
<script>
import { code } from './code'
export default {
    name: 'layout-view',
    data() {
        return {
            code: code,
            radio1:'tab1',
            form: {
                name: '',
                type: '',
            },
            tableData: [],
            tableLabel:[],
            tableLabel2: [
                {
                    label: '姓名',
                    prop: 'name',
                },
                {
                    label: '类型',
                    prop: 'paidTypes',
                    dicData: [
                        { value: 1, label: '现金' },
                        { value: 2, label: '扫码' },
                    ]
                },
            ],
            tableLabel1: [
                {
                    label: '姓名1',
                    prop: 'name',
                },
                {
                    label: '类型1',
                    prop: 'paidTypes',
                    dicData: [
                        { value: 1, label: '现金' },
                        { value: 2, label: '扫码' },
                    ]
                },
            ],
            queryParams: {
                pageSize: 10,
                pageNumber: 1,
            },
            total: 11,
        }
    },
    mounted() {
        this.tableLabel = this.tableLabel1
    },
    methods: {
        onSearch() {
            // 查询接口 带参数 自己配置
            this.getList()
        },
        onReast() {
            console.log('重置')
        },
        onChangeTab(val){
            console.log('[ val ]-127', val)
            if(val=='tab1'){
                this.tableLabel = this.tableLabel1
            }else{
                this.tableLabel = this.tableLabel2
            }
        },
        getList() {},
    },
}
</script>
`


export const attrs = [
    {
        name: 'zfSearch',
        desc: '放置页面搜索表单，目前搜索都是form， 初始化根据每个formitem宽度 和 外层宽度对比 超过的 通过展开 隐藏显示',
        type: '',
        optional: '-',
        default: '-'
    },
    {
        name: 'zfSearchBtn',
        desc: '放置查询按钮 重置按钮,可以塞到zfSearch里面',
        type: '',
        optional: '-',
        default: '-'
    },
    {
        name: 'zfOperate',
        desc: '列表中心位置可以存放一些切换，导出操作按钮',
        type: '',
        optional: '-',
        default: '-'
    },
    {
        name: 'zfTable',
        desc: '列表table',
        type: '',
        optional: '-',
        default: '-'
    }
]

export const events = [

]