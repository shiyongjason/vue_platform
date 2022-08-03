<template>
    <div>
        <zfCutterImg ref="imgCutterModal"  fileType="png" :crossOrigin="true" crossOriginHeader="*" rate="" toolBgc="none" :isModal="false"  :lockScroll="true"  :sizeChange="true"
            :moveAble="true" :imgMove="true" :originalGraph="false" WatermarkText="vue-img-cutter" WatermarkTextFont="12px Sans-serif" WatermarkTextColor="#00ff00" :WatermarkTextX="0.95" :WatermarkTextY="0.95" :smallToUpload="true" :saveCutPosition="true" :scaleAble="true" :previewMode="true"
            :toolBoxOverflow="true" :index="2" @cutDown="cutDown">
        </zfCutterImg>

        <img :src="imgurl" style="width:200px"/>
    </div>
</template>
<script>
export default {
    name: "caijie-view",
    data () {
        return {
            isShow: true,
            imgurl: ''
        }
    },
    methods: {
        cutDown (res) {
            console.log('%c [ res ]-20', 'font-size:13px; background:pink; color:#bf2c9f;', res)
            this.imgurl = res.dataURL
        },
        


    }
}
</script>
<style lang="scss" scoped>
</style>