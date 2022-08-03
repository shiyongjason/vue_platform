import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Layout from '@/views/layout/Default.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
    },
    {
        path: '/documents',
        component: Layout,
        children: [

            {
                path: 'table',
                name: 'table',
                component: () => import('@/views/documentsView/table/index.vue'),
            },
            {
                path: 'base',
                name: 'base',
                component: () => import('@/views/documentsView/table/base.vue'),
            },
            {
                path: 'pagination',
                name: 'pagination',
                component: () => import('@/views/documentsView/table/pagination.vue'),
            },
            {
                path: 'render',
                name: 'render',
                component: () => import('@/views/documentsView/table/render.vue'),
            },
            {
                path: 'renderHeader',
                name: 'renderHeader',
                component: () => import('@/views/documentsView/table/renderHeader.vue'),
            },
            {
                path: 'checkbox',
                name: 'checkbox',
                component: () => import('@/views/documentsView/table/checkbox.vue'),
            },
            {
                path: 'radio',
                name: 'radio',
                component: () => import('@/views/documentsView/table/radio.vue'),
            },
            {
                path: 'action',
                name: 'action',
                component: () => import('@/views/documentsView/table/action.vue'),
            },
            {
                path: 'children',
                name: 'children',
                component: () => import('@/views/documentsView/table/children.vue'),
            },
            {
                path: 'dicdata',
                name: 'dicdata',
                component: () => import('@/views/documentsView/table/dicdata.vue'),
            },
            {
                path: 'expend',
                name: 'expend',
                component: () => import('@/views/documentsView/table/expend.vue'),
            },
            {
                path: 'scroll',
                name: 'scroll',
                component: () => import('@/views/documentsView/scroll/index.vue'),
            },
            {
                path: 'scroll2',
                name: 'scroll2',
                component: () => import('@/views/documentsView/scroll/index2.vue'),
            },
            {
                path: 'scroll3',
                name: 'scroll3',
                component: () => import('@/views/documentsView/scroll/index3.vue'),
            },
            {
                path: 'layout',
                name: 'layout',
                component: () => import('@/views/documentsView/layout/index.vue'),
            },
            {
                path: 'upload',
                name: 'upload',
                component: () => import('@/views/documentsView/upload/index.vue'),
            },
            {
                path: 'test',
                name: 'test',
                component: () => import('@/views/documentsView/test/index.vue'),
            },
            {
                path: 'caijie',
                name: 'caijie',
                component: () => import('@/views/documentsView/caijie/index.vue'),
            },
        ],
    },
    {
        path: '/standard',
        component: Layout,
        children: [
            {
                path: 'code-standard',
                name: 'code-standard',
                component: () => import('@/views/standard/code-standard/index.vue'),
            },
            {
                path: 'general-styles',
                name: 'general-styles',
                component: () => import('@/views/standard/general-styles/index.vue'),
            },
        ],
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

export default router
