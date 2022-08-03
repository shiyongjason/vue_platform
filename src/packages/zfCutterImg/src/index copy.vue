<template>
    <div class='upload' v-show='isShow'>
        <input type="file" @change="handleChange" multiple='true' accept='image/*' v-show='false'>
        <canvas class='canvas'></canvas>
        <canvas class='canvas1' v-show='false'></canvas>
    </div>
</template>
<script>
/* eslint-disable */
export default {
    name: "zfCutterImg",
    props: {
        canvasWidth: {
            type: Number,
            default: 375
        },
        canvasHeight: {
            type: Number,
            default: 375
        },
        boxSide: {
            type: Number,
            default: 100
        },
        smallSide: {
            type: Number,
            default: 100
        },
        bigSide: {
            type: Number,
            default: 300
        },
        isShow: {
            type: Boolean,
            default: true
        }
    },
    data () {
        return {
            ctx: '',
            img: '',
            // 矩形的位置
            chooseImg: {
                x: 0,
                y: 0,
            },
            //  选择框的大小
            chooseSide: '',
            //  矩形的色彩
            chooseRgb: '',
            //   鼠标的位置，勇于判断放大缩小
            relizeX: 0,
            relizeY: 0,
            // 节流
            isRun: false,
        }
    },
    mounted () {
        this.chooseSide = this.boxSide
        const that = this
        const canvas = document.querySelector('.canvas')
        const ctx = canvas.getContext('2d')
        this.ctx = ctx
        canvas.width = this.canvasWidth
        canvas.height = this.canvasHeight
        console.log(canvas.offsetTop)
        // 绑定canvas鼠标点击
        canvas.onmousedown = function (e) {
            let x = e.offsetX
            let y = e.offsetY
            //   初始化坐标,判断放大缩小
            that.relizeX = x
            that.relizeY = y
            if ((x > that.chooseImg.x && x < that.chooseImg.x + that.chooseSide) && (y > that.chooseImg.y && y < that.chooseImg.y + that.chooseSide)) {
                canvas.onmousemove = function (e) {
                    let x = e.offsetX
                    let y = e.offsetY
                    x <= that.chooseSide / 2 ? that.chooseImg.x = 0 : that.chooseImg.x = x - that.chooseSide / 2
                    y <= that.chooseSide / 2 ? that.chooseImg.y = 0 : that.chooseImg.y = y - that.chooseSide / 2
                    x >= that.canvasWidth - that.chooseSide / 2 ? that.chooseImg.x = (that.canvasWidth - that.chooseSide) : that.chooseImg.x = x - that.chooseSide / 2
                    y >= that.canvasHeight - that.chooseSide / 2 ? that.chooseImg.y = (that.canvasHeight - that.chooseSide) : that.chooseImg.y = y - that.chooseSide / 2
                    if (x <= that.chooseSide / 2) {
                        that.chooseImg.x = 0
                    }
                    if (y <= that.chooseSide / 2) {
                        that.chooseImg.y = 0
                    }
                }
            } else {
                canvas.onmousemove = function (e) {
                    let x = e.offsetX
                    let y = e.offsetY
                    // jieliu
                    that.jieliu(x, y)
                    // that.resize(x,y)
                }
            }
            canvas.onmouseup = function () {
                canvas.onmousemove = null
            }
            //   离开canvas
            canvas.onmouseout = function () {
                canvas.onmousemove = null
            }

        }
    },
    methods: {
        // jieliu
        jieliu (x, y) {
            const that = this
            if (!this.isRun) {
                that.isRun = true
                window.setTimeout(() => {
                    that.resize(x, y)
                    that.isRun = false
                }, 100)
            }
        },
        // 点击上传
        iptClick () {
            document.querySelector('input').click()
        },
        // 读取图片
        handleChange (e) {
            const that = this
            const reader = new FileReader()
            reader.readAsDataURL(e.target.files[0])
            reader.onload = function () {
                // this.reslut 为图片信息
                that.drawImg(this.result)
            }
        },
        // 创建一个图片对象 画到画布上
        drawImg (imgData) {
            const that = this
            // this.isShow = true
            const img = new Image()
            img.src = imgData
            this.img = img
            img.onload = function () {
                // 循环动画
                window.requestAnimationFrame(that.animate)
            }
        },
        // 循环canvas
        animate () {
            this.ctx.drawImage(this.img, 0, 0, this.img.width, this.img.height, 0, 0, this.canvasWidth, this.canvasHeight)
            // 获取选中的图片色彩
            this.drawChoose()
            // 绘制灰色背景以及选中的彩色图片
            this.drawHui()
            // 绘制选中边框
            this.drawRect()
            window.requestAnimationFrame(this.animate)
        },
        // 全部图片变灰色并且画上彩色的
        drawHui () {
            const data = this.ctx.getImageData(0, 0, this.canvasWidth, this.canvasHeight)
            for (let i = 0; i < data.data.length; i += 4) {
                const grey = (data.data[i] + data.data[i + 1] + data.data[i + 2]) / 3
                data.data[i] = data.data[i + 1] = data.data[i + 2] = grey
            }
            this.ctx.putImageData(data, 0, 0)
            this.ctx.putImageData(this.chooseRgb, this.chooseImg.x, this.chooseImg.y)
        },
        // 选中图片色彩
        drawChoose () {
            const data = this.ctx.getImageData(this.chooseImg.x, this.chooseImg.y, this.chooseSide, this.chooseSide)
            this.chooseRgb = data
        },
        // 
        drawRect () {
            this.ctx.beginPath()
            this.ctx.lineWidth = 1
            this.ctx.strokeStyle = 'rgba(0,0,0,0.1)'
            this.ctx.strokeRect(this.chooseImg.x, this.chooseImg.y, this.chooseSide, this.chooseSide)
            //   画纹理
            this.ctx.beginPath()
            this.ctx.strokeStyle = 'rgba(255,255,255)'
            this.ctx.moveTo(this.chooseImg.x + 1, this.chooseImg.y + this.chooseSide / 3)
            this.ctx.lineTo(this.chooseImg.x + this.chooseSide - 1, this.chooseImg.y + this.chooseSide / 3)
            this.ctx.moveTo(this.chooseImg.x + 1, this.chooseImg.y + this.chooseSide * 2 / 3)
            this.ctx.lineTo(this.chooseImg.x + this.chooseSide - 1, this.chooseImg.y + this.chooseSide * 2 / 3)
            this.ctx.moveTo(this.chooseImg.x + this.chooseSide / 3, this.chooseImg.y)
            this.ctx.lineTo(this.chooseImg.x + this.chooseSide / 3, this.chooseImg.y + this.chooseSide - 1)
            this.ctx.moveTo(this.chooseImg.x + this.chooseSide * 2 / 3, this.chooseImg.y)
            this.ctx.lineTo(this.chooseImg.x + this.chooseSide * 2 / 3, this.chooseImg.y + this.chooseSide - 1)
            this.ctx.stroke()
            //  画边角
            this.ctx.beginPath()
            this.ctx.lineWidth = 3
            this.ctx.strokeStyle = 'rgba(0,0,0)'
            this.ctx.moveTo(this.chooseImg.x + 15, this.chooseImg.y)
            this.ctx.lineTo(this.chooseImg.x, this.chooseImg.y)
            this.ctx.lineTo(this.chooseImg.x, this.chooseImg.y + 15)

            this.ctx.moveTo(this.chooseImg.x + this.chooseSide - 15, this.chooseImg.y)
            this.ctx.lineTo(this.chooseImg.x + this.chooseSide, this.chooseImg.y)
            this.ctx.lineTo(this.chooseImg.x + this.chooseSide, this.chooseImg.y + 15)

            this.ctx.moveTo(this.chooseImg.x + this.chooseSide - 15, this.chooseImg.y + this.chooseSide)
            this.ctx.lineTo(this.chooseImg.x + this.chooseSide, this.chooseImg.y + this.chooseSide)
            this.ctx.lineTo(this.chooseImg.x + this.chooseSide, this.chooseImg.y - 15 + this.chooseSide)

            this.ctx.moveTo(this.chooseImg.x + 15, this.chooseImg.y + this.chooseSide)
            this.ctx.lineTo(this.chooseImg.x, this.chooseImg.y + this.chooseSide)
            this.ctx.lineTo(this.chooseImg.x, this.chooseImg.y - 15 + this.chooseSide)
            this.ctx.stroke()

        },
        // 放大缩小
        resize (x, y) {
            // 左上角
            if ((this.relizeX < this.chooseImg.x) && (this.relizeY < this.chooseImg.y)) {
                if ((x >= this.relizeX) && (y >= this.relizeY)) {
                    this.chooseSide -= 10
                } else {
                    this.chooseSide += 10
                    console.log(11111111111111)
                }
                console.log(x, this.relizeX, y, this.relizeY)
            }
            // 左下角
            else if ((this.relizeX < this.chooseImg.x) && (this.relizeY > this.chooseImg.y)) {
                if (x > this.relizeX && y < this.relizeY) {
                    this.chooseSide -= 10
                } else {
                    this.chooseSide += 10
                }
            }
            // 右上角
            else if ((this.relizeX > this.chooseImg.x) && (this.relizeY < this.chooseImg.y)) {
                if (x > this.relizeX && y < this.relizeY) {
                    this.chooseSide += 10
                } else {
                    this.chooseSide -= 10
                }

            } else if ((this.relizeX > this.chooseImg.x) && (this.relizeY > this.chooseImg.y)) {
                if (x > this.relizeX && y > this.relizeY) {
                    this.chooseSide += 10
                } else {
                    this.chooseSide -= 10
                }
            }

            // 边界判断
            if (this.chooseSide < this.smallSide) {
                this.chooseSide = this.smallSide
            } else if (this.chooseSide > this.bigSide) {
                this.chooseSide = this.bigSide
            }
            this.relizeX = x
            this.relizeY = y


        },
        goBack () {
            this.isShow = false
        },
        // 照片选择完毕,上传
        chooseImgToUpload (callback) {
            const canvas = document.querySelector('.canvas1')
            const ctx = canvas.getContext("2d")
            canvas.width = this.chooseSide
            canvas.height = this.chooseSide
            ctx.putImageData(this.chooseRgb, 0, 0)
            this.uploadImg(canvas, callback)
        },
        // 上传图片
        uploadImg (canvas, callback) {
            canvas.toBlob(async (blob) => {
                let fd = new FormData()
                fd.append('file', blob)
                fd.name = new Date().getTime()
                callback(fd)
            }, 'image/png')
        },
        // 本地展示
        localhostShow () {
            const canvas = document.querySelector('.canvas1')
            const ctx = canvas.getContext("2d")
            canvas.width = this.chooseSide
            canvas.height = this.chooseSide
            ctx.putImageData(this.chooseRgb, 0, 0)
            return canvas.toDataURL()
        },
        // 本地下载
        localhostDown () {
            const canvas = document.querySelector('.canvas1')
            const ctx = canvas.getContext("2d")
            canvas.width = this.chooseSide
            canvas.height = this.chooseSide
            ctx.putImageData(this.chooseRgb, 0, 0)
            var url = canvas.toDataURL()
            var a = document.createElement('a')
            a.setAttribute('href', url)
            a.download = 'caijian.png'
            let event = document.createEvent('MouseEvents')
            event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
            a.dispatchEvent(event)
        }
    }
}
</script>
<style scoped>
/* .upload {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  z-index: 999;
} */
</style>