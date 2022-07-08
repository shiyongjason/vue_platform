<template>
    <div>
        <h3>布局</h3>
        <PExample :code="code">
            <zf-layout showMoreBtn title="页面title">
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
                            <el-col :span="11">
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
                <template #zfSerchBtn>
                    <el-button type="primary" @click="onSearch">查询</el-button>
                    <el-button @click="onReast">重置</el-button>
                </template>
                <div class="">我是card</div>
                <template #zfOperate>
                   <div class="content-oper">
                        <el-radio-group v-model="radio1" @change="onChangeTab">
                        <el-radio-button label="tab1"></el-radio-button>
                        <el-radio-button label="tab2"></el-radio-button>
                    </el-radio-group>
                    <el-button @click="onReast">导出</el-button>
                   </div>
                </template>
                <template #zfTable>
                  <div>
                      我是表格站位
                  </div>
                </template>
            </zf-layout>
        </PExample>
          <h3>slot</h3>
        <PAttrTable :data="attrs" />
    </div>
</template>
<script>
import { code ,attrs} from './code'
export default {
    name: 'layout-view',
    data() {
        return {
            code: code,
            attrs,
            radio1:'tab1',
            form: {
                name: '',
                type: '',
            },
            tableData: [],
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
<style lang="scss" scoped>
.item {
    margin-left: 10px;
}
.content-oper{
    display: flex;
    justify-content: space-between;
}
</style>
