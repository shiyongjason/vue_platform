<template>
    <div id="app">
        <div class="content">
            <!-- 左侧列表 -->
            <ul class="left_title" ref="left">
                <li class="title_item" v-for="(item, index) in cateData" :key="index" :class="currentIndex === index ? 'active' : ''" @click="change(index)">
                    {{ item.name }}
                </li>
            </ul>
            <!-- clientHeight、clientWidth→元素宽高（height+padding，不包含边框），可以理解为元素可视区域高度 -->
            <!-- 右侧内容区域 -->
            <div class="right_content">
                <div class="container" ref="container">
                    <div ref="foodsUI" class="foodsUI">
                        <div class="list" v-for="(item,index) in cateData" :key="index">
                            <div class="name">{{item.name}}</div>
                            <ul>
                                <li  v-for="(jtem,jindex) in item.children" :key="jindex">{{jtem}}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
    name: "bar-",
    data () {
        return {
            scroll: '',
            // 右侧滑动的y轴坐标（滑动过程中的实时变化）
            scrollY: 0,
            foodsScroll: '',
            // 所有右侧分类li的top组成的数组
            tops: [],
            cateData: [
                {
                    name: '汗蒸0',
                    children:[
                        '吃饭','吃饭','吃饭','吃饭'
                    ]
                },
                {
                    name: '自助餐1',  
                    children:[
                        '吃饭','吃饭','吃饭','吃饭','吃饭','吃饭','吃饭','吃饭'
                    ]
                },
                {
                    name: '海底捞2',
                    children:[
                        '吃饭','吃饭'
                    ]
                },
                {
                    name: '大餐3',
                    children:[
                        '吃饭','吃饭','吃饭','吃饭'
                    ]
                },
                {
                    name: '养身4',
                    children:[
                        '吃饭','吃饭','吃饭','吃饭'
                    ]
                },
                {
                    name: '跑步5',
                    children:[
                        '吃饭','吃饭','吃饭','吃饭'
                    ]
                },
                {
                    name: '睡觉6',
                    children:[
                        '吃饭','吃饭','吃饭','吃饭'
                    ]
                },
                {
                    name: '看电影7',
                    children:[
                        '吃饭','吃饭','吃饭','吃饭'
                    ]
                },
                {
                    name: '打游戏8',
                    children:[
                        '吃饭','吃饭','吃饭','吃饭'
                    ]
                },
                {
                    name: '未知9',
                    children:[
                        '吃饭','吃饭','吃饭','吃饭'
                    ]
                }
            ]
        }
    },
    methods: {
        // 初始化滚动
        initScroll () {
            const container = this.$refs.container
            this.scroll = new BScroll(container)
            /* eslint-disable no-new */
            new BScroll('.left_title', {
                click: true
            })
            // 监听右侧列表
            this.foodsScroll = new BScroll('.container', {
                // 惯性滑动不会被触发
                probeType: 2,
                click: true,
                mouseWheel: true
            })
            // 给右侧列表绑定scroll监听
            // this.foodsScroll.on('scroll', ({ x, y }) => {
            //     console.log('[ y ]-173', y)
            //     // math.abs绝对值
            //     this.scrollY = Math.abs(y)
            // }),
            // 给右侧列表绑定滚动结束监听,滚动结束后改变左侧列表背景颜色
            this.foodsScroll.on('scrollEnd', ({ x, y }) => {
                this.scrollY = Math.abs(y)
            })
        },
        // 初始化tops
        _initTops () {
            // 1.初始化tops
            const tops = []
            let top = 0
            tops.push(top)
            // 2.搜集
            // 找到所有分类的li
            const lis = this.$refs.foodsUI.getElementsByClassName('list')
            Array.prototype.slice.call(lis).forEach(li => {
                top += li.clientHeight
                tops.push(top)
            })
            // 3。更新数据
            this.tops = tops
            console.log(this.tops)
        },
        // 点击左侧列表右侧滚动到相应位置
        change (index) {
            // 得到目标scrollY
            const y = this.tops[index]
            //   立即更新scrollY
            this.scrollY = y
            //   平滑滑动右侧列表
            this.foodsScroll.scrollTo(0, -y, 10)


        }
    },
    computed: {
        // 计算当前分类的下表
        currentIndex () {
            // //  得到条件数据
            // const { scrollY, tops } = this
            // // 根据条件计算产出一个结果
            // const index = tops.findIndex((top, index) => {
            //     return scrollY >= top && scrollY < tops[index + 1]
            // })
            // // 返会结果
            // return index
            const { scrollY, tops } = this
            console.log('[ scrollY ]-225', scrollY)

            let index = tops.findIndex((height, index) => {
                // 只要 数值 贴边上面 小于下面 

                return scrollY >= tops[index] && scrollY < tops[index + 1]

            })
            console.log('[ index ]-226', index)


            if (index == this.cateData.length-1) {

                // // 点击解决
                // if (scrollY > tops[index] + 22) {

                //     index++;

                // }
            }

            return index

        }
    },
    mounted () {
        this.$nextTick(() => {
            this.initScroll()
            this._initTops()
        })
    }
}
</script>
<style scoped>
header {
    height: 50px;
    width: 100%;
    background-color: green;
    color: #fff;
    font-size: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.content {
    display: flex;
}
.left_title {
    flex: 1;
    margin-right: 5px;
}
.title_item {
    height: 35px;
    width: 100%;
    border: 1px solid #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    border-bottom: none;
}
.title_item :last-child {
    border-bottom: 1px solid #ccc;
}
.right_content {
    flex: 3;
    position: relative;
}
.name {
    text-align: center;
    padding: 20px;
    font-size: 28px;
}
.list li {
    font-size: 20px;
}
.container {
    overflow: hidden;
    height: calc(100vh - 50px);
}
.active {
    background-color: red;
    color: #fff;
}
.list {
    border: 1px solid #ccc;
}
.foodsUI {
    padding-bottom: 400px;
}
</style>