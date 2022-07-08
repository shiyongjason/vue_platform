<template>
    <div class="home-page">
        <div class="home-page-bg" :style="setStyle"></div>
        <div class="home-page-cont">
            <h1>组件平台</h1>
            <el-button @click="onToDocuments">Documents</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HomeView',
    computed: {
        bgImageUrl () {
            return require('@/assets/home_bg_' + Math.ceil(Math.random() * 5) + '.jpg')
        }
    },
    methods: {
        onToDocuments () {
            this.$router.push('/standard/code-standard')
        },
        setStyle () {
            return {
                backgroundImage: 'url(' + this.bgImageUrl + ')'
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.home-page {
    min-width: 1280px;
    min-height: 720px;
    overflow-x: overlay;
    overflow-y: overlay;

    &-bg {
        position: fixed;
        top: 0;
        left: 0;
        z-index: -1;
        width: 100%;
        height: 100%;
        min-width: 1280px;
        min-height: 720px;
        overflow-y: overlay;
        overflow-x: overlay;
        background-image: url("@/assets/home_bg_1.jpg");
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center 0;
    }

    &-cont {
        margin: 200px auto;
        text-align: center;

        img {
            width: 140px;
            height: 140px;
        }

        h1 {
            margin: 32px 0;
            font-size: 48px;
        }
    }
}
</style>
