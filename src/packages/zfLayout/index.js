import zfLayout from './src'

/* istanbul ignore next */
zfLayout.install = function (Vue) {
    Vue.component(zfLayout.name, zfLayout)
}

export default zfLayout
