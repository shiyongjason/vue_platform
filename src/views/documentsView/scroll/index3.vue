<template>
    <div class="sys_emp_detail">
        <div class="container_wrap">
            <div class="left_box">
                <div class="step_box" v-for="(item,idx) in stepsList" :key="idx">
                    <div class="text" @click="handleClick(idx)" :class="idx ==index?'current-text':''">{{item.title}}</div>
                    <template v-if="idx<stepsList.length-1">
                        <div class="circle" :class="index==idx?'current-back':''"></div>
                    </template>
                    <template v-else-if="idx==stepsList.length-1">
                        <div class="circle end"></div>
                    </template>
                </div>
            </div>
            <div class="right_box" ref="itemList">
                <div class="head_title">
                    <h2>个人信息</h2>

                </div>
                <div class="content_big_right" @scroll="handleScroll" ref="rigth">
                    <!-- 基本信息 -->
                    <div class="content_box">
                        <div class="label_box">
                            <h3>基本信息</h3>

                        </div>
                        <p>1</p>
                        <p>1</p>
                        <p>1</p>
                        <p>1</p>
                        <p>1</p>
                        <p>1</p>
                        <p>1</p>
                    </div>
                    <!-- 个人信息 -->
                    <div class="content_box">
                        <div class="label_box">
                            <h3>个人信息</h3>

                        </div>
                        <p>1</p>
                        <p>1</p>
                        <p>1</p>
                        <p>1</p>
                        <p>1</p>
                        <p>1</p>
                        <p>1</p>
                    </div>
                    <!-- 学历信息 -->
                    <div class="content_box">
                        <div class="label_box">
                            <h3>学历信息</h3>

                        </div>
                        <p>1</p>
                        <p>1</p>
                        <p>1</p>
                        <p>1</p>
                        <p>1</p>
                        <p>1</p>
                        <p>1</p>
                    </div>
                    <!-- 银行卡信息 -->
                    <div class="content_box">
                        <div class="label_box">
                            <h3>银行卡信息</h3>
                        </div>
                        <p>1</p>
                        <p>1</p>
                        <p>1</p>
                        <p>1</p>
                        <p>1</p>
                        <p>1</p>
                        <p>1</p>
                    </div>
                    <!-- 紧急联系人 -->
                    <div class="content_box">
                        <div class="label_box">
                            <h3>紧急联系人</h3>

                        </div>
                        <p>1</p>
                        <p>1</p>
                        <p>1</p>

                    </div>
                    <!-- 家挺信息 -->
                    <div class="content_box">
                        <div class="label_box">
                            <h3>家庭信息</h3>

                        </div>
                        <p>1</p>
                        <p>1</p>
                        <p>1</p>
                        <p>1</p>
                        <p>1</p>
                        <p>1</p>
                        <p>1</p>
                        <p>1</p>
                        <p>1</p>
                        <p>1</p>
                        <p>1</p>
                        <p>1</p>
                    </div>
                    <!-- 个人材料 -->
                    <div class="content_box">
                        <div class="label_box">
                            <h3>个人材料</h3>

                        </div>
                        <p>1</p>
                        <p>1</p>
                        <p>1</p>
                        <p>1</p>
                        <p>1</p>
                        <p>1</p>
                        <p>1</p>
                        <p>1</p>
                    </div>
                    <!-- 校招材料 -->
                    <div class="content_box">
                        <div class="label_box">
                            <h3>校招材料</h3>
                        </div>
                        <p>1</p>
                        <p>1</p>
                        <p>1</p>

                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "scrollDetail",
    data () {
        return {
            stepsList: [
                { title: '基本信息' },
                { title: '个人信息' },
                { title: '学历信息' },
                { title: '银行卡信息' },
                { title: '紧急联系人' },
                { title: '个人材料' },
                { title: '校招材料' }
            ],
            scrollY: 0,//右侧列表滑动的y轴坐标
            rightBscroll: -1,
            index: 0
        }
    },
    watch: {
        scrollY () {
            this.initRightBoxHeight();
            //console.log(11);
        }
    },
    methods: {
        handleScroll (event) {
            this.scrollY = event.target.scrollTop;
        },
        handleClick (idx) {
            console.log('[ idx ]-118', idx)
            this.index = idx;
            this.initRightBoxHeight();
            this.$refs.rigth.scrollTop = this.rightLiTops[idx];
        },
        /*计算每个小盒子高度*/
        initRightBoxHeight () {
            let itemArray = [];
            let top = 0;
            itemArray.push(top)
            //获取右边所有子盒子高度集合
            let allList = this.$refs.itemList.getElementsByClassName('content_box');
            //allList伪数组转化成真数组
            Array.prototype.slice.call(allList).forEach(li => {
                top += li.clientHeight; //获取所有li的每一个高度
                itemArray.push(top)
            });
            this.rightLiTops = itemArray;
            this.rightLiTops.forEach((item, index) => {
                if (item <= this.scrollY) {
                    this.index = index;
                }
            })
            //console.log(this.index,this.scrollY);    
        },
    }
}
</script>
<style scoped lang="scss">
.sys_emp_detail {
    .container_wrap {
        display: flex;
        .left_box {
            min-width: 48px;
            padding: 180px 0 0 80px;
            .step_box {
                display: flex;
                justify-content: center;
                align-items: center;
                min-width: 122px;
                height: 53px;
                .current-text {
                    color: #5497d6 !important;
                }
                .current-back {
                    background-color: #5497d6 !important;
                }
                .text {
                    padding-right: 5px;
                    font-size: 9px;
                    width: 65px;
                    color: #333333;
                    text-align: right;
                    cursor: pointer;
                }
                .circle {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background-color: rgba(204, 204, 204, 1);
                    position: relative;
                }
                .circle::after {
                    content: "";
                    height: 45px;
                    width: 1px;
                    display: inline-block;
                    border-right: 1px solid #cccccc;
                    position: relative;
                    left: 4px;
                    top: 8px;
                }
                .end::after {
                    content: "";
                    display: none;
                }
            }
        }
        .right_box {
            flex: 1;
            //width: 800px;
            .head_title {
                position: relative;
                h2 {
                    font-size: 18px;
                    color: #333333;
                    text-align: center;
                    padding: 10px 0 30px;
                }
                button {
                    font-size: 14px;
                    color: #fff;
                    background-color: #5497d6;
                    position: absolute;
                    top: 5px;
                    right: 0;
                    border-radius: 4px;
                    cursor: pointer;
                }
            }
            .content_big_right {
                max-height: 689px;
                overflow-x: hidden;
                padding: 0 25px;
            }
            .content_box {
                .label_box {
                    display: flex;
                    justify-content: space-between;
                    background-color: #f2f2f2;
                    line-height: 46px;
                    h3 {
                        color: #333333;
                        font-size: 14px;
                        padding: 0 15px;
                    }
                    p {
                        font-size: 14px;
                        color: #5497d6;
                        padding: 0 15px;
                        cursor: pointer;
                    }
                }
            }
        }
    }
}
</style>
