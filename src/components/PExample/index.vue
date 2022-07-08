<template>
    <div class="demo-block" @mouseover="onShowTip" @mouseout="onHideTip">
        <div class="source">
            <slot></slot>
        </div>
        <div class="meta" v-show="isShowCode">
            <pre>
                <code v-text="realCode"
                    class="language-html">
                </code>
            </pre>
        </div>
        <div class="demo-block-control" @click="onSwitchCodeDisplay">
            <i :class="['el-icon-caret-bottom', isHovering ? 'hovering' : '']"></i>
            <span v-show="isHovering">显示代码</span>
        </div>
    </div>
</template>

<script>
import hljs from 'highlight.js'
import 'highlight.js/styles/googlecode.css'

export default {
    name: 'p-example',
    props: {
        code: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
            isHovering: false,
            isShowCode: false
        }
    },
    computed: {
        realCode () {
            return this.code
        }
    },
    methods: {
        onShowTip () {
            this.isHovering = true
        },
        onHideTip () {
            this.isHovering = false
        },
        onSwitchCodeDisplay () {
            this.isShowCode = !this.isShowCode
        },
        highlightCode () {
            const preEl = document.querySelectorAll('pre code')

            preEl.forEach((el) => {
                hljs.highlightBlock(el)
            })
        }
    },
    mounted () {
        this.$nextTick(function () {
            this.highlightCode()
        })
    }
}
</script>

<style lang="scss" scoped>
pre {
    margin: 0;
}
.demo-block {
    border: solid 1px #ebebeb;
    border-radius: 3px;
    transition: 0.2s;
    .demo-block-control {
        border-top: solid 1px #eaeefb;
        height: 44px;
        line-height: 44px;
        box-sizing: border-box;
        background-color: #fff;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
        text-align: center;
        margin-top: -1px;
        color: #d3dce6;
        cursor: pointer;
        position: relative;
        & > span {
            position: absolute;
            display: inline-block;
            font-size: 14px;
            line-height: 44px;
            transform: translateX(-30px);
            transition: 0.3s;
        }
        i {
            font-size: 16px;
            transition: 0.3s;
            &.hovering {
                transform: translateX(-40px);
            }
        }
    }
    .source {
        padding: 5px;
        background: #eaeefb;
    }
    .meta {
        background-color: #fafafa;
        border-top: solid 1px #eaeefb;
        padding: 10px;
        overflow: hidden;
        transition: height 0.2s;
    }
}

.hljs {
    background-color: #fafafa;
}
</style>
