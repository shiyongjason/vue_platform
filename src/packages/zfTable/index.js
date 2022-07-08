import commonTable from './src/common-table.vue'

/* istanbul ignore next */
commonTable.install = function (Vue) {
    Vue.component(commonTable.name, commonTable)
}

export default commonTable
