<template>

    <div class="cascad-menu" ref="cascadMenu">

        <scroll class="left-menu" ref="leftMenu">

            <div class="left-menu-container">

                <ul>

                    <li class="left-item" ref="leftItem" :class="{'current': currentIndex=== index}" @click="selectLeft(index, $event)" v-for="(menu, index) in menus" :key="index">

                        <p class="text">{{menu.name}}</p>

                    </li>

                </ul>

            </div>

        </scroll>

        <scroll class="right-menu" ref="rightMenu" @scroll="scrollHeight" :listenScroll="true" :probeType="3">

            <div class="right-menu-container">

                <ul>

                    <li class="right-item" ref="rightItem" v-for="(menu, i) in menus" :key="i">

                        <div class="title">{{menu.name}}</div>

                        <ul>

                            <li v-for="(item, j) in menu.data" :key="j">

                                <div class="data-wrapper">

                                    <div class="data">{{item.name}}</div>

                                </div>

                            </li>

                        </ul>

                    </li>

                </ul>

            </div>

        </scroll>

    </div>

</template>

<script>



import Scroll from './scrollbar.vue'

export default {
    name:'scrollView',
    components:{Scroll},
    data () {

        return {

            rightTops: [],

            leftTops: [],

            scrollY: 0,

            leftScrollY: 0,

            menus: [

                {

                    name: '菜单1',

                    data: [

                        {

                            name: '1.1'

                        },

                        {

                            name: '1.2'

                        },

                        {

                            name: '1.3'

                        },

                        {

                            name: '1.4'

                        },

                        {

                            name: '1.5'

                        },

                        {

                            name: '1.6'

                        }

                    ]

                },

                {

                    name: '菜单2',

                    data: [

                        {

                            name: '1.1'

                        },

                        {

                            name: '1.2'

                        },

                        {

                            name: '1.3'

                        },

                        {

                            name: '1.4'

                        },

                        {

                            name: '1.5'

                        },

                        {

                            name: '1.6'

                        }

                    ]

                },

                {

                    name: '菜单3',

                    data: [

                        {

                            name: '1.1'

                        },

                        {

                            name: '1.2'

                        },

                        {

                            name: '1.3'

                        },

                        {

                            name: '1.4'

                        },

                        {

                            name: '1.5'

                        },

                        {

                            name: '1.6'

                        }

                    ]

                },

                {

                    name: '菜单1',

                    data: [

                        {

                            name: '1.1'

                        },

                        {

                            name: '1.2'

                        },

                        {

                            name: '1.3'

                        },

                        {

                            name: '1.4'

                        },

                        {

                            name: '1.5'

                        },

                        {

                            name: '1.6'

                        }

                    ]

                },

                {

                    name: '菜单2',

                    data: [

                        {

                            name: '1.1'

                        },

                        {

                            name: '1.2'

                        },

                        {

                            name: '1.3'

                        },

                        {

                            name: '1.4'

                        },

                        {

                            name: '1.5'

                        },

                        {

                            name: '1.6'

                        }

                    ]

                },

                {

                    name: '菜单3',

                    data: [

                        {

                            name: '1.1'

                        },

                        {

                            name: '1.2'

                        },

                        {

                            name: '1.3'

                        },

                        {

                            name: '1.4'

                        },

                        {

                            name: '1.5'

                        },

                        {

                            name: '1.6'

                        }

                    ]

                },

                {

                    name: '菜单1',

                    data: [

                        {

                            name: '1.1'

                        },

                        {

                            name: '1.2'

                        },

                        {

                            name: '1.3'

                        },

                        {

                            name: '1.4'

                        },

                        {

                            name: '1.5'

                        },

                        {

                            name: '1.6'

                        }

                    ]

                },

                {

                    name: '菜单2',

                    data: [

                        {

                            name: '1.1'

                        },

                        {

                            name: '1.2'

                        },

                        {

                            name: '1.3'

                        },

                        {

                            name: '1.4'

                        },

                        {

                            name: '1.5'

                        },

                        {

                            name: '1.6'

                        }

                    ]

                },

                {

                    name: '菜单3',

                    data: [

                        {

                            name: '1.1'

                        },

                        {

                            name: '1.2'

                        },

                        {

                            name: '1.3'

                        },

                        {

                            name: '1.4'

                        },

                        {

                            name: '1.5'

                        },

                        {

                            name: '1.6'

                        }

                    ]

                },

                {

                    name: '菜单1',

                    data: [

                        {

                            name: '1.1'

                        },

                        {

                            name: '1.2'

                        },

                        {

                            name: '1.3'

                        },

                        {

                            name: '1.4'

                        },

                        {

                            name: '1.5'

                        },

                        {

                            name: '1.6'

                        }

                    ]

                },

                {

                    name: '菜单2',

                    data: [

                        {

                            name: '1.1'

                        },

                        {

                            name: '1.2'

                        },

                        {

                            name: '1.3'

                        },

                        {

                            name: '1.4'

                        },

                        {

                            name: '1.5'

                        },

                        {

                            name: '1.6'

                        }

                    ]

                },

                {

                    name: '菜单3',

                    data: [

                        {

                            name: '1.1'

                        },

                        {

                            name: '1.2'

                        },

                        {

                            name: '1.3'

                        },

                        {

                            name: '1.4'

                        },

                        {

                            name: '1.5'

                        },

                        {

                            name: '1.6'

                        }

                    ]

                },

                {

                    name: '菜单1',

                    data: [

                        {

                            name: '1.1'

                        },

                        {

                            name: '1.2'

                        },

                        {

                            name: '1.3'

                        },

                        {

                            name: '1.4'

                        },

                        {

                            name: '1.5'

                        },

                        {

                            name: '1.6'

                        }

                    ]

                },

                {

                    name: '菜单2',

                    data: [

                        {

                            name: '1.1'

                        },

                        {

                            name: '1.2'

                        },

                        {

                            name: '1.3'

                        },

                        {

                            name: '1.4'

                        },

                        {

                            name: '1.5'

                        },

                        {

                            name: '1.6'

                        }

                    ]

                },

                {

                    name: '菜单3',

                    data: [

                        {

                            name: '1.1'

                        },

                        {

                            name: '1.2'

                        },

                        {

                            name: '1.3'

                        },

                        {

                            name: '1.4'

                        },

                        {

                            name: '1.5'

                        },

                        {

                            name: '1.6'

                        }

                    ]

                },

            ]

        }

    },

    props: {

    },

    computed: {

        currentIndex () {

            const { scrollY, rightTops } = this

            let index = rightTops.findIndex((height, index) => {

                return scrollY >= rightTops[index] && scrollY < rightTops[index + 1]

            })

            if (scrollY > rightTops[index] + 50) {

                index++;

            }

            console.log("index", index);

            if (index >= 1) {

                let leftItem = this.$refs.leftItem

                let el = leftItem[index - 1]

                this.$refs.leftMenu.scrollToElement(el, 300)

            }

            return index

        }

    },

    created () {

        this.$nextTick(() => {

            this._calculateLeftHeight()

            this._calculateHeight()

        })

    },

    methods: {

        selectLeft (index, event) {

            console.log(index);

            if (!event._constructed) {

                return

            }

            let rightItem = this.$refs.rightItem

            let el = rightItem[index]

            this.$refs.rightMenu.scrollToElement(el, 300)

        },

        scrollHeight (pos) {

            //   console.log(pos);

            this.scrollY = Math.abs(Math.round(pos.y))

        },

        _calculateHeight () {

            let lis = this.$refs.rightItem;

            console.log(lis)

            let height = 0

            this.rightTops.push(height)

            Array.prototype.slice.call(lis).forEach(li => {

                height += li.clientHeight

                this.rightTops.push(height)

            })

            console.log(this.rightTops)

        },

        _calculateLeftHeight () {

            let lis = this.$refs.leftItem;

            console.log(lis)

            let height = 0

            this.leftTops.push(height)

            Array.prototype.slice.call(lis).forEach(li => {

                height += li.clientHeight

                this.leftTops.push(height)

            })

            console.log("this.leftTops", this.leftTops)

        },

    },

    components: {

        Scroll

    }

}

</script>

<style lang="scss" scoped>
ul li {
    list-style-type: none;
}

.cascad-menu {
    display: flex;

    position: absolute;

    top: 100px;

    bottom: 100px;

    width: 100%;

    border: 1px solid red;

    overflow: hidden;
}

.left-menu {
    flex: 0 0 30%;

    width: 30%;

    background: #f3f5f7;
}

.left-item {
    height: 54px;

    width: 100%;

    margin-left: -20px;
}

.current {
    width: 155%;

    margin-left: -40px;

    text-align: center;

    background: #fff;
}

.text {
    width: 100%;

    line-height: 54px;
}

.right-menu {
    flex: 1;
}

.right-item {
    height: 100%;

    margin-left: -40px;

    border: 1px solid #ccc;
}

.title {
    border-bottom: 1px solid #ccc;

    height: 20px;
}

.data {
    line-height: 40px;

    height: 40px;

    margin-left: -40px;
}
</style>
