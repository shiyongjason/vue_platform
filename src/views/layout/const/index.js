export const STANDARD_PATHS = [
    {
        id: '1',
        title: '规范',
        children: [
            { title: '书写规范', path: '/standard/code-standard' }
        ]
    },
    {
        id: '2',
        title: '通用样式',
        children: [
            { title: 'css', path: '/standard/general-styles' }
        ]
    }
]

export const DOCUMENTS_PATHS = [
    {
        id: '12',
        title: '组件',
        groups: [
            {
                title: 'custom',
                children: [
                    { title: 'Table 表格', path: '/documents/table' },
                    { title: 'scroll 联动', path: '/documents/scroll' },
                    { title: 'layout 布局', path: '/documents/layout' },
                    { title: 'form 表单', path: '/documents/scroll3' },
                    { title: '附件上传', path: '/documents/upload' },
                    { title: 'test', path: '/documents/test' },
                    { title: 'caijie', path: '/documents/caijie' }

                ]
            },
            {
                title: 'Table',
                children: [
                    { title: '基础用法', path: '/documents/base' },
                    { title: '分页功能', path: '/documents/pagination' },
                    { title: '某列render渲染', path: '/documents/render' },
                    { title: '自定义列表Label', path: '/documents/renderHeader' },
                    { title: '复选框功能', path: '/documents/checkbox' },
                    { title: '单选框功能', path: '/documents/radio' },
                    { title: '转义字典功能', path: '/documents/dicdata' },
                    { title: 'expend功能', path: '/documents/expend' },
                    { title: 'children结构', path: '/documents/children' },
                    { title: 'table操作列', path: '/documents/action' }
                ]
            },
        ]
    }
]

export const BUSINESS_PATHS = [
    {
        id: '111',
        title: '战力值',
        children: [
            { title: '个人战力', path: '/business/capacity' }
        ]
    }
]
