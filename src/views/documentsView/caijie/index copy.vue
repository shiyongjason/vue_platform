<template>
    <div>
        <zfCutterImg ref='caijian' :isShow='isShow' />

        <!-- 演示 -->
        <button @click='chose'>选择图片</button>
        <button @click='show'>展示图片</button>
        <button @click='down'>下载图片</button>
        <button>上传图片</button>
        <div>
            <img :src="img" alt="">
        </div>
    </div>
</template>
<script>
export default {
    name: "caijie-view",
    data () {
        return {
            isShow:true,
            img:''
        }
    },
    methods:{
        chose(){
            this.$refs.caijian.iptClick()
            this.isShow=true
        },
        show(){
            this.img=this.$refs.caijian. localhostShow()
        },
        down(){
            this.$refs.caijian.localhostDown()
        }


    }
}
</script>
<style lang="scss" scoped>
</style>