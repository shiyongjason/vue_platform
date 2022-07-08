<template>
    <div class="zf-layout">
        <div ref="section" class="section">
            <header class="layout-tit">{{ title }}</header>
            <div class="layout-search" ref="zfSearch">
                <el-row :gutter="24">
                    <el-col :span="20">
                        <div class="layout-search-left">
                            <slot name="zfSearch"> slot 搜索内容 这里会覆盖呀 </slot>
                        </div>
                    </el-col>
                    <el-col :span="4">
                        <div class="layout-search-right">
                            <div>
                                <slot name="zfSerchBtn"></slot>
                                <el-button v-if="showMoreBtn" type="text" @click="onClickBar">{{ barShow ? '收起' : '展开' }}<i :class="barShow ? 'el-icon-arrow-down' : 'el-icon-arrow-up'"></i></el-button>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <!-- <el-button type="primary" @click="onSearch">查询</el-button>
                <el-button>重置</el-button> -->
            </div>
            
            <div class="layout-center">
                <slot></slot>
            </div>

            <div class="layout-content" ref="layoutContent">
                <div class="layout-wrap">
                    <slot name="zfOperate">替换其他内容</slot>
                </div>
                <div class="layout-table">
                    <slot name="zfTable">slot 主题内容 例如 table</slot>
                </div>
            </div>
            <div class="layout-bot">
                    <slot name="zfFooter">底部</slot>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'zf-layout',
    props: {
        showMoreBtn: {
            type: Boolean,
            default: false,
        },
        title: {
            type: String,
            default: '标题1',
        },
    },
    data() {
        return {
            barShow: false,
        }
    },
    computed: {},
    mounted() {
        console.log('[ this.$refs.searchForm ]-42', this.$slots.zfSearch[0])
        if (this.showMoreBtn) {
            this.onInitItems('none')
        }
    },
    methods: {
        onSearch() {},
        isHasSlot(name) {
            return Object.keys(this.$slots).includes(name)
        },
        onClickBar() {
            this.barShow = !this.barShow
            this.onInitItems(this.barShow ? 'inline-block' : 'none')
        },
        onInitItems(val) {
            // const formItems = this.$refs.zfSearch.getElementsByClassName('el-form-item')
            // const formInputs = this.$refs.zfSearch.getElementsByClassName('el-form-item__content')
            // this.formItems = Array.from(formItems)
            // if (Array.from(formInputs).length > 5) {
            //     Array.from(formInputs).forEach((item, index) => {
            //         console.log('[ item ]-81', item.parentElement)
            //         if (index > 2 && !item.parentElement.className.includes('el-form-item--large')) {
            //             item.parentElement.setAttribute('style', `display:${val}`)
            //         }
            //     })
            // }
            let _serchWidth = document.getElementsByClassName('layout-search-left')[0].clientWidth
            const formItems = this.$refs.zfSearch.getElementsByClassName('el-form-item')
            this.formItems = Array.from(formItems)
            let allwidth = 0
            this.formItems.forEach(item => {
                console.log('[ item ]-93', item.clientWidth)
                allwidth += item.clientWidth
                if (allwidth < _serchWidth) {
                    item.setAttribute('style', `display:inline-block`)
                } else {
                    item.setAttribute('style', `display:none`)
                }
            })
            console.log('[ _serchWidth ]-90', _serchWidth)
        },
    },
}
</script>
<style lang="scss" scoped>
.zf-layout {
    display: flex;
    .section {
        width: 100%;
        overflow-y: auto;
        overflow-x: hidden;
    }
    .layout-tit {
        height: 50px;
        border-bottom: 1px solid #eee;
        color: #666;
        line-height: 50px;
        padding: 0 20px;
        font-size: 18px;
        display: flex;
        justify-content: space-between;
        background: #fff;
    }
    .layout-search {
        background: #fff;
        padding: 10px;
        // display: flex;
        // justify-content: space-between;
        // &-left{
        //     display: flex;
        //     flex: 3;
        // }
        &-right {
            display: flex;
            justify-content: flex-end;
        }
    }
    .layout-center {
        background: #fff;
        padding: 10px;
        border-top: 1px solid #eee;
    }
    .layout-content {
        margin-top: 10px;
        background: #fff;
        max-height: 600px;
        min-height: 300px;
        padding: 10px;
    }
    .layout-table {
        margin: 10px auto;
    }
    .layout-bot {
        .fix-btn {
            width: 100%;
            padding: 10px 0;
            text-align: center;
            background: #fff;
        }
        .footer {
            font-size: 12px;
            color: #999;
            width: 100%;
            height: 50px;
            display: flex;
            background: #fff;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            user-select: none;
        }
    }
}
</style>
