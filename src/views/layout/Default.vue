<template>
    <el-container class="main">
        <el-header class="main-header">
            <div class="main-header__logo" @click="onToHome">
                <span class="main-header__name">LOGO</span>
            </div>
            <el-menu class="main-header__menu" mode="horizontal" text-color="#FF7A45" active-text-color="#FF7A45" :default-active="activeTopMenu" router>
                <el-menu-item index="/standard/code-standard">规范</el-menu-item>
                <el-menu-item index="/documents/table">组件</el-menu-item>
                <el-menu-item index="/business">业务</el-menu-item>
            </el-menu>
        </el-header>
        <el-container class="main-container">
            <el-aside class="main-container__sidebar">
                <el-menu active-text-color="#FF7A45" :default-active="activeMenu" router>
                    <template v-if="menuType == 1">
                        <el-submenu v-for="item in standardPaths" :key="item.id" :index="item.id">
                            <template slot="title">
                                <span slot="title">{{ item.title }}</span>
                            </template>
                            <el-menu-item v-for="(child, index) in item.children" :key="`${item.id}_${index}`" :index="child.path">
                                {{ child.title }}
                            </el-menu-item>
                        </el-submenu>
                    </template>
                    <template v-if="menuType == 2">
                        <!-- <el-menu-item index="/documents/version">更新日志</el-menu-item> -->
                        <el-submenu v-for="item in componentPaths" :key="item.id" :index="item.id">
                            <template slot="title">
                                <span slot="title">{{ item.title }}</span>
                            </template>
                            <el-menu-item-group v-for="(group) in item.groups" :key="group.title">
                                <span slot="title">{{ group.title }}</span>
                                <el-menu-item v-for="(child, index) in group.children" :key="`${item.id}_${index}`" :index="child.path">
                                    {{ child.title }}
                                </el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                    </template>
                    <template v-if="menuType == 3">
                        <el-submenu v-for="item in businessPaths" :key="item.id" :index="item.id">
                            <template slot="title">
                                <span slot="title">{{ item.title }}</span>
                            </template>
                            <el-menu-item v-for="(child, index) in item.children" :key="`${item.id}_${index}`" :index="child.path">
                                {{ child.title }}
                            </el-menu-item>
                        </el-submenu>
                    </template>
                </el-menu>
            </el-aside>
            <el-main class="main-container__content">
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
// import { routerMapping } from '@/router.js'
import { STANDARD_PATHS, DOCUMENTS_PATHS, BUSINESS_PATHS } from './const'
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Layout',
    data () {
        return {
            standardPaths: STANDARD_PATHS,
            componentPaths: DOCUMENTS_PATHS,
            businessPaths: BUSINESS_PATHS
        }
    },
    computed: {
        activeMenu () {
            return this.$route.path
        },
        activeTopMenu () {
            const componentPathArr = this.componentPaths.map(item => item.groups).map(item => item.map(group => group.children)).flat(2).map(item => item.path)
            const businessPathArr = this.businessPaths.map(item => item.children).flat().map(item => item.path)
            if (componentPathArr.includes(this.$route.path)) {
                return '/documents/button'
            } else if (businessPathArr.includes(this.$route.path)) {
                return '/business/publish'
            }
            return '/standard/code-standard'
        },
        menuType () {
            switch (this.activeTopMenu) {
                case '/documents/button':
                    return 2
                case '/business/publish':
                    return 3
                default:
                    return 1
            }
        }
    },
    methods: {
        onToHome () {
            this.$router.push('/')
        }
    }
}
</script>

<style lang="scss" scoped>
.main {
    &-header {
        padding: 0;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 80px !important;
        border-bottom: 1px solid #eee;

        &__logo {
            display: inline-flex;
            align-items: center;

            img {
                width: 40px;
                height: 40px;
            }
        }

        &__name {
            margin-left: 10px;
            font-size: 24px;
        }
    }

    &-container {
        margin: 0 auto;
        height: calc(100vh - 80px);
        width: 100%;
        overflow: overlay;
        &__sidebar {
            margin-right: 20px;
            padding: 20px 0;
            width: 240px !important;
        }

        &__content {
            position: relative;
            width: calc(1120px - 240px - 20px);
        }
    }

    // &-page {
    //     &-body {
    //         width: 100%;
    //     }
    // }
}

:deep .el-menu {
    border: 0 !important;

    &--horizontal {
        border: 1px !important;

        .el-menu-item {
            margin: 0 22px;
            padding: 0 !important;
            height: 80px;
            line-height: 80px;
            font-size: 16px;
            font-weight: 400;
            border-color: #eee;
        }
    }


}
:deep .el-submenu__title {
    color: #333;
    font-size: 16px;
    font-weight: 700;
    padding-left: 5px !important;

    &:hover {
        background: #ffff;
    }
}
</style>
