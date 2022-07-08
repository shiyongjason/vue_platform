import zfUpload from './src'

/* istanbul ignore next */
zfUpload.install = function (Vue) {
    Vue.component(zfUpload.name, zfUpload)
}

export default zfUpload
