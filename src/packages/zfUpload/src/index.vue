<template>
    <div class="default-upload-warp">
        <template v-if="showPreView&&!showAsFileName">
            <template v-for="(item,index) in fileList">
                <div class="default-pre-view" :key="index">
                    <div class="default-pre-view-warp">
                        <div class="default-pre-view-mask">
                            <i class="el-icon-zoom-in" style="color:#fff" @click="open(index,item)"></i>
                            <slot name="preViewExtends" :data="{index,data:item}"></slot>
                            <i v-if="showUpload" class="el-icon-delete-solid" style="color:#fff" @click="remove(index)"></i>
                        </div>
                    </div>
                    <!-- 后缀回显-->
                    <div class="pdfimg" v-if="_checkPicType(item,['.pdf'])">
                        <img :src="pdfbase">
                    </div>
                    <div class="pdfimg" v-else-if="_checkPicType(item,['.xls','.xlsx'])">
                        <img :src="xlsbase">
                    </div>
                    <div class="pdfimg" v-else-if="_checkPicType(item,['.zip','.rar'])">
                        <img :src="zipbase">
                    </div>
                    <div class="pdfimg" v-else-if="_checkPicType(item,['.doc','.docx','.word'])">
                        <img :src="worldbase">
                    </div>
                    <el-image v-else :ref="`preview_${index}`" class="default-pre-view-image" fit="contain" :src="item.fileUrl" :preview-src-list="previewSrcList"></el-image>
                </div>
            </template>
        </template>
        <template v-if="showAsFileName">
            <span v-for="(item,index) in fileList" :key="index" class="posrtv">
                <template v-if="item&&item.fileUrl">
                    <i class="el-icon-document"></i>
                    <a :href="item.fileUrl" target="_blank">
                        <font>{{item.fileName}}</font>
                    </a>
                    <div class="abs">
                        <i class="el-icon-circle-close" @click="remove(index)"></i>
                    </div>
                </template>
            </span>
        </template>
        <div v-if="showUpload" class="elupload" v-loading='loading' :class="haveslot?'haveslot':''">
            <el-upload v-if="fileList.length<fileNum" v-bind="$attrs" v-on="$listeners" drag ref="elUpload" :multiple='multiple' name='multiFile' :data='uploadParameters' :showFileList='showFileList' :disabled='disabled' :action='action' :limit='limit' :on-exceed="onExceed" :on-remove="handleRemove"
                :on-success="handleSuccess" :on-change="handleCheckedSize" :before-upload="beforeAvatarUpload" :on-progress="uploadProcess" :accept='accept' :on-error='handleError'>
                <!-- 默认插槽 -->
                <slot>
                    <div class="default-upload">
                        <div class="default-upload-icon">
                            <i class="el-icon-upload"></i>
                            <span>点击或拖拽到这上传</span>
                            <span v-if="multiple" style="margin-top:5px">（支持多图）</span>
                        </div>
                    </div>
                </slot>
                <!-- 提示说明文字 -->
                <slot name="tip"></slot>
                <!-- 上传进度 -->
            </el-upload>

        </div>
        <el-dialog title="提示" :visible.sync="deleteVisible" width="500px" class="deldialog" :modal=false>
            <span>您确定删除这一条数据吗？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="deleteVisible = false">取 消</el-button>
                <el-button type="primary" @click="doRemove">确 定</el-button>
            </span>
        </el-dialog>
    
    </div>
</template>

<script>
export default {
    name: 'zfUpload',
    props: {
        showUpload: { type: Boolean, default: true }, // 是否显示上传按钮
        showCrop: { type: Boolean, default: false }, // 是否使用图片裁剪功能，注意，裁剪功能只能是 1.单图上传 2.只能是图片上传 3.暂时使用 action = ccpBaseUrl + 'common/files/upload-base64'的上传接口
        value: Array, // 双向绑定的list
        limit: { type: Number, default: 1000 }, // 最大允许上传个数，勿用
        disabled: { type: Boolean, default: false }, // 是否禁用
        multiple: { type: Boolean, default: true }, // 是否支持多图上传
        uploadParameters: { type: Object, default () { return {} } }, // 上传时附带的额外参数同el-upload 的 data
        showPreView: { type: Boolean, default: true }, // 是否展示上传的图片
        showFileList: { type: Boolean, default: false }, // 是否显示已上传文件列表
        action: { type: String, default: 'https://jsonplaceholder.typicode.com/posts/' }, // 上传的地址
        fileSize: { type: Number, default: 100 }, // 限制文件大小
        showAsFileName: { type: Boolean, default: false }, // 文件名形式显示
        showProgress: { type: Boolean, default: false },
        fileNum: { type: Number, default: 100 }, // 限制文件总数
        accept: { type: String, default: '.jpg,.jpeg,.png,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.zip,.rar,.txt' }, // 上传的类型
    

    },
    data () {
        return {
            cropperOutputType: '',
            cropper: '',
            cropperOptions: {
            },
            croppervisible: false,
            isBeyond: true,
            haveslot: false,
            deleteVisible: false,
            index: '',
            progressFlag: false,
            uploadPercent: null,
            loading: false,
            activeIndex: -1,
            previewSrcList: [],
            pdfbase: 'data:image/png;base64,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',
            xlsbase: 'data:image/png;base64,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',
            zipbase: 'data:image/png;base64,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',
            worldbase: 'data:image/png;base64,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',
            cropperImg: ''
        }
    },
    computed: {
        fileList: {
            get () {
                return this.value
            },
            set (val) {
                this.$emit('input', val)
            }
        }
    },
    methods: {
        handleCropClose () {
            this.$refs.cropper.$refs.cropper.stopCrop()// 停止裁剪
            this.croppervisible = false
        },
        handleError (err) {
            let errMessage = (JSON.parse(err.message)).message || ''
            this.$message.error(`上传失败：` + errMessage)
            this.progressFlag = false
            this.loading = false
        },
        uploadProcess (event, file, fileList) {
            this.loading = true
            this.progressFlag = true
            this.uploadPercent = Math.floor(event.percent)
        },
        handleSuccess (response, file, fileList) {
            console.log('[ response ]-145', response)
            let obj = {
                fileName:response.id|| response.data.fileName,
                fileUrl: response.data.accessUrl
            }
            if (typeof obj === 'object') {
                setTimeout(() => {
                    let temp = []
                    temp.push(obj)
                    // fix add 'empty'
                    temp.filter(item => {
                        return (typeof item === 'object')
                    })
                    temp.map(item => {
                        if (this.fileList.length < this.fileNum) {
                            this.fileList.push(item)
                        } else {
                            this.$message.error(`上传数量超出限制！最大个数：${this.fileNum}`)
                        }
                    })
                    this.uploadPercent = 100
                    this.progressFlag = false
                    this.loading = false
                    this.$emit('BackUpload',obj)

                }, 500)
            }
        },
        doRemove () {
            this.fileList.splice(this.index, 1)
            this.$set(this, 'fileList', this.fileList)
            this.deleteVisible = false
        },
        // 校验大小
        _checkPicType (item, typePic) {
            if (item && item.fileUrl && typePic.indexOf(item.fileUrl.slice(item.fileUrl.lastIndexOf('.')).toLowerCase()) > -1) {
                return true
            }
            return false
        },
        remove (index) {
            this.deleteVisible = true
            this.index = index
        },
        handleRemove (file, fileList) {
            if (file.response && file.response.data) {
                let index = this.fileList.indexOf(file.response.data.accessUrl)
                this.doRemove(index)
            }
        },
        onExceed (files, fileList) {
            this.$message.error(`最大允许上传个数：${this.limit}`)
        },
        handleCheckedSize (files, fileList) {
            this.isBeyond = true
            // 判断是否符合要求
            if (files.size / (1024 * 1024) < this.fileSize) {
                this.isBeyond = false
            } else {
                this.isBeyond = true
            }
        },
        getFileType (file) {
            let startIndex = file.lastIndexOf('.')
            if (startIndex != -1) {
                return file.substring(startIndex + 1, file.length).toLowerCase()
            } else {
                return ''
            }
        },
        beforeAvatarUpload (file) {
            let arr = this.accept.split(',')
            let flag = false
            arr.map(item => {
                if (item === `.${this.getFileType(file.name)}`) flag = true
            })
            if (!flag) {
                this.$message.error(`上传错误，暂不支持该文件格式上传`)
                return false
            }
            if (this.isBeyond) {
                this.$message.error(`上传错误，文件不要超过${this.fileSize}M`)
                return false
            }
          
        },
        startCrop () {
            this.$refs.cropper.$refs.cropper.startCrop()
            this.outputCropResult()
        },
        // 输出裁剪结果
        outputCropResult () {
            this.$refs.cropper.$refs.cropper.stopCrop()// 停止裁剪
            this.$refs.cropper.$refs.cropper.getCropData(async (data) => {
                const { data: file } = await uploadFiles({ base64: data, latitude: '123', longitude: '23' })
                this.fileList.push({
                    fileName: file.fileName,
                    fileUrl: file.accessUrl
                })
                this.croppervisible = false
                this.$emit('BackUpload',obj)
            })
        },
        open (index, item = null) {
            if ((item.fileName).toLowerCase().indexOf('.png') > -1 || (item.fileName).toLowerCase().indexOf('.jpg') > -1 || (item.fileName).toLowerCase().indexOf('.jpeg') > -1) {
                let temp = this.fileList[index]
                let tempArr = JSON.parse(JSON.stringify(this.fileList))
                tempArr.splice(index, 1)
                tempArr.unshift(temp)
                this.previewSrcList = tempArr.map(item => {
                    return item.fileUrl
                })
                this.$nextTick(() => {
                    const pre = this.$refs[`preview_${index}`]
                    if (pre && pre[0]) {
                        pre[0].clickHandler()
                    }
                })
            } else {
                window.open(item.fileUrl)
            }
        }
    },
    mounted () {
        if (this.$slots.default) {
            this.haveslot = true// 此块为了去掉自定义的默认全局样式
        }
    }

}
</script>

<style lang='scss' scoped>
/deep/.el-loading-spinner .circular {
    width: 33px;
    height: 33px;
}
/deep/.uploadprogress {
    position: absolute;
    top: 5px;
    left: 10px;
}
/deep/.deldialog .el-dialog__body {
    min-height: 100px;
    font-size: 16px;
    padding-top: 20px;
}
.haveslot {
    line-height: normal !important;
    height: auto !important;
    margin-top: 0 !important;
}
/deep/.haveslot .el-upload-dragger {
    background: none !important;
    border-radius: 0 !important;
    border: none !important;
    text-align: left !important;
    width: auto !important;
    height: auto !important;
}
/deep/.el-upload-dragger {
    width: 130px;
    height: 120px;
    border-radius: 6px;
    background: #fbfdff;
    border: 1px dashed #c0ccda;
    box-sizing: border-box;
    text-align: center;
    position: relative;
    overflow: hidden;
}
/deep/.el-upload-dragger .el-icon-upload {
    margin: -10px 0 0 0;
}
/deep/.default-upload-warp .el-upload-dragger {
    width: 130px;
    height: 120px;
    border-radius: 6px;
    background: rgba(250, 250, 250, 1);
    border: 1px dashed #c0ccda;
    box-sizing: border-box;
    text-align: center;
    position: relative;
    overflow: hidden;
}
/deep/.default-upload-warp .el-upload-dragger .el-icon-upload {
    margin: -10px 0 0 0;
}
.default-upload-warp {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}
.default-upload {
    display: flex;
    justify-content: center;
    height: 100%;
    align-items: center;
    &-icon {
        i {
            font-size: 30px;
        }
        span {
            font-size: 12px;
            display: block;
            line-height: 1;
            color: #b1b2b5;
            margin-top: -6px;
        }
    }
    &-word {
        margin: 15px;
        h3 {
            font-family: HiraginoSansGB;
            font-weight: normal;
            color: rgba(48, 49, 51, 1);
            line-height: 24px;
        }
        span {
            font-family: PingFangSC;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
            line-height: 24px;
        }
    }
}

.posrtv {
    position: relative;
    margin-right: 15px;
    color: #ff7a45;
}
.posrtv a {
    color: #ff7a45;
    margin-left: 10px;
}
.abs {
    position: absolute;
    right: -11px;
    top: -7px;
    display: none;
    i {
        font-size: 18px;
        color: #5d5d5d;
        cursor: pointer;
    }
}
.posrtv:hover .abs {
    display: block;
}
.default-pre-view {
    display: flex;
    flex-wrap: wrap;
    margin-right: 8px;
    margin-top: 13px;
    position: relative;
    &-mask {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 200;
        width: 120px;
        height: 120px;
        border-radius: 6px;
        background-color: rgba(0, 0, 0, 0.5);
        transition: opacity 0.3s;
        i {
            font-size: 21px;
            padding: 9px;
        }
        opacity: 0;
    }
    &-mask:hover {
        // cursor: pointer;
        opacity: 1;
    }
    &-mask:hover {
        i{
         cursor: pointer;
        }

    }
    &-image {
        width: 120px;
        height: 120px;
        background-color: #fafafa;
        border: 1px solid #c0ccda;
        border-radius: 6px;
        box-sizing: border-box;
    }
}
.elupload {
    overflow: hidden;
    height: 120px;
    margin-top: 13px;
}
.pdfimg {
    width: 120px;
    height: 120px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
}
.pdfimg img {
    width: 76%;
}
.el-dialog__wrapper {
    z-index: 12000 !important;
}
</style>
