<template class="">
    <div class="main-page-body">
        <h2>页面主体</h2>
        <P>基于开源组件库来封装业务组件的时候用的比较多</P>
        <P>优先级：我们遵循和vue一样的规则，render函数的方式是高于template模板的 </P>
        <p>vue的单项数据流，子组件不应该去变动父组件的值</p>
        <p>实现双向绑定</p>
        <p>v-model不能在同个组件上使用多次！但是.sync这种语法可以啊，我只要在子组件中抛出不同的'update:xxx'就行了（最基础的场景：子组件属性改变后父组件传值过来的父属性也要同时改变，就可以利用修饰符.sync）</p>
        <p>很多学习的   form  search  时间 上传预览</p>
        <PExample :code="code_one">
            <div class="content">example</div>
        </PExample>
    </div>
</template>

<script>
import { CODE_ONE } from './code/index'
export default {
    name: 'page-body',
    data() {
        return {
            queryParams: {
                selectValue: '',
            },
            options: [
                { label: '选项一', value: '1' },
                { label: '选项二', value: '2' },
                { label: '选项三', value: '3' },
                { label: '选项四', value: '4' },
            ],
            code_one: CODE_ONE,
        }
    },
}
</script>

<style lang="scss" scoped>
.demo-block {
    /deep/ .source {
        padding: 0;
    }
}

.content {
    position: relative;
    overflow: overlay;
    background: #f2f2f4;
}
</style>
