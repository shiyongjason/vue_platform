export const CODE_ONE = `
<template>
    <div class="page-body">
    <el-input
    v-bind="$attrs"
    v-on="$listeners"
    >
    </el-input>
    双向绑定原理：通过v-bind="$attrs"将父组件的值透传到el-input上实现值的绑定；v-on="$listeners"将v-model内部实现的@input事件透传到el-input上实现值响应。
    </div>
    
    slot
    <template #custom="{value}">
    <el-button>{{value}}</el-button>
    </template>
    

    render
    {
        label: '自定义',
        type: 'slot',
        prop: 'custom',
        render: ({ value, $createElement: h }) => {
          return h('el-button', value)
        }
      }
 
</template>

<javascript>

问题
        newValue: {
           get({ value }) {
             return value
           },
           set(newVal) {
             this.$emit('update:value', newVal)
           }
         }
</javascript>
`
