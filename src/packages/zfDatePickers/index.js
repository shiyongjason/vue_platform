import zfDatePickers from './src'

/* istanbul ignore next */
zfDatePickers.install = function (Vue) {
    Vue.component(zfDatePickers.name, zfDatePickers)
}

export default zfDatePickers
