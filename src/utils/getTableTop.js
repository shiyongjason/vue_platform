export const getTableTop = {
    computed: {
        computedHeight () {
            if (this.height) return 'unset'
            if (this.amountResetTableChange > -1 && this.data && this.data.length >= 10) {
                // 获取页面可视区的高度-this.selfHeight， `calc(100vh - ${selfHeight}px)`
                // let resetH = this.amountResetTable === true ? this.selfHeight : 110
                let resetH = ((this.$refs.hosTable && this.$refs.hosTable.getBoundingClientRect().top) || 0) + 40
                let h = document.documentElement.clientHeight - resetH
                if (Math.floor(h) < 280) {
                    h = 280// 最小高度
                }
                return `${Math.floor(h)}px` // fix windows浏览器max-height 不能有小数
            } else {
                return 'unset'
            }
        }
    }
}
export const getOldTableTop = {
    data () {
        return {
            computedHeight: 0
        }
    },
    methods: {
        countHeight () {
            this.$nextTick(() => {
                let resetH = this.$refs.hosTable.getBoundingClientRect().top + 10
                let h = document.documentElement.clientHeight - resetH
                if (Math.floor(h) < 280) {
                    h = 280// 最小高度
                }
                this.computedHeight = Math.floor(h)
            })
        }
    },
    watch: {
        toggle () {
            this.countHeight()
        }
    }
}
