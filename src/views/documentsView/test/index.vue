<template>
    <div>
        <zfDatePickers/>
        <el-button @click="onGetAllConnections">all</el-button>
              
 <el-input type="text" @input="clearNoNum($event,value1)" v-model="value1"/>

         
        <div id="diagramContainer">
            一百年来，我们党从成立时只有 <span class="highlight"><span id="text0" name="source">50多名党员</span></span>，发展成为拥有
            <span class="highlight"><span id="text1" name="source">9500多万名党员</span></span>、领导着14亿多人口大国、具有重大全球影响力的
            <span class="highlight"><span id="text2" name="source">世界第一大执政党</span></span>分别在连线或点击前后触发，如果要保存连线修改的信息，可以在mounted中对实例化对象绑定事件,
            文本内容就是上面圈着的一部分，内容中包含换行符（↵）. <span class="highlight"><span id="text3" name="source">对于</span></span>
            这类型的数据，在前端页面是需要进行稍微处理才能正常显示。如果没有经过处理，那么内容是不会在有换行符的位置进行换行显示的：
            思想：将文本字符串转化为数组，然后将数组中“\n”换成浏览器正常解析的换行标签即可。(后端传回来的“↵”就是\n)，上面同样可以使用正则表达式来将字符串的换行符转换为 这类型的数据，在前端页面是需要进行稍微处理才能正常显示。如果没有经过处理，那么内容是不会在有换行符的位置进行换行显示的：
            思想：将文本字符串转化为数组，然后将数组中“\n”换成浏览器正常解析的换行标签即可。(后端传回来的“↵”就是\n)，上面同样可以使用正则表达式来将字符串的换行符转换为 <span class="highlight"><span id="text4" name="source">世界第一大执政党11</span></span>这类型的数据，在前端页面是需要进行稍微处理才能正常显示。如果没有经过处理，那么内容是不会在有换行符的位置进行换行显示的：
            思想：将文本字符串转化为数组，然后将数组中“\n”换成浏览器正常解析的换行标签即可。(后端传回来的“↵”就是\n)，上面同样可以使用正则表达式来将字符串的换行符转换为 这类型的数据，在前端页面是需要进行稍微处理才能正常显示。如果没有经过处理，那么内容是不会在有换行符的位置进行换行显示的：
            思想：将文本字符串转化为数组，然后将数组中“\n”换成浏览器正常解析的换行标签即可。(后端传回来的“↵”就是\n)，上面同样可以使用正则表达式来将字符串的换行符转换为<br>，那么就不用转换为数组了。
        </div>
        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
            <el-input placeholder="输入" v-model="value"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="onClickValue">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { jsPlumb } from 'jsplumb'
import moment from 'moment'
import index from '@/components/PAttrTable/index.vue';
var common = {
    endpoint: "Blank",
    anchor: ["Top", "Bottom", [0.5, 0, 0, -1], [0.5, 1, 0, 1]], // 锚点位置
    connector: [
        "Flowchart",
        { stub: [15, 25], cornerRadius: 5, alwaysRespectStubs: true },
    ],
    maxConnections: -1,  // 允许一个节点有无限条连线
    EndpointStyle: { radius: 4, fill: "#acd" }, //端点样式
};
let plumbins = null
export default {
    name: 'test-sort',
    data () {
        return {
            value1:'',
            moment,
            timesOptions:{
                type:'date',
                valueFormat:'yyyy-MM-dd',
                format:'yyyy-MM-dd'   //展示格式
            },
           
            value: '',
            dialogVisible: false,
            conn: '',
            arr: [{ source: 'text01', target: 'text02' }],
            jsplumbSourceOptions: {
                maxConnections: -1,
                allowLoopback: false,
                anchor: ["Top", "Bottom", [0.5, 0, 0, -1], [0.5, 1, 0, 1]],
            },
            jsplumbTargetOptions: {
                maxConnections: -1,
                allowLoopback: false,
                anchor: ["Top", "Bottom", [0.5, 0, 0, -1], [0.5, 1, 0, 1]],

            },

            leftList: [
                // 起点
                { name: 'source', nodeId: 'text0' },
                { name: 'source', nodeId: 'text1' },
                { name: 'source', nodeId: 'text2' },
                { name: 'source', nodeId: 'text3' },
                { name: 'source', nodeId: 'text4' },
            ],
            rightList: [
                // 终点
                { name: 'xxx_right_1', nodeId: 'text0' },
                { name: 'xxx_right_2', nodeId: 'text1' },
                { name: 'xxx_right_3', nodeId: 'text2' },
            ]
        };
    },
    watch: {
        'searchCond.endTime': {
            handler(newValue, oldValue) {
                if (newValue) {
                    let timeST = ''
                    let st = ''
                    if (this.searchCond.startTime) {
                        const date = new Date(this.searchCond.startTime)
                        //此处用到moment插件，可自行安装此插件或者类似的插件即可
                        const nowDate = moment(date).format('HH:mm:ss')
                        if (
                            moment(date).format('yyyy-MM-DD') ===
              moment(newValue).format('yyyy-MM-DD')
                        ) {
                            const hh1 = moment(newValue).format('HH:mm:ss')
                            if (hh1 < nowDate) {
                                this.searchCond.endTime = new Date(this.searchCond.startTime)
                            }
                            st = nowDate
                            timeST = nowDate
                        } else {
                            st = '00:00:00'
                            timeST = '23:59:59'
                        }
                    } else {
                        st = '00:00:00'
                        timeST = '23:59:59'
                    }
                    this.pickerOptionsStart.selectableRange = '00:00:00 - ' + timeST
                    this.pickerOptionsStart = this.pickerOptionsStart
                    this.pickerOptionsEnd.selectableRange = st + ' - 23:59:59'
                    this.pickerOptionsEnd = this.pickerOptionsEnd
                }
            },
            deep: true,
            immediate: true
        },
        'searchCond.startTime': {
            handler(newValue, oldValue) {
                if (newValue) {
                    let timeST = ''
                    let st = ''
                    if (this.searchCond.endTime) {
                        const date = new Date(this.searchCond.endTime)
                        const nowDate = moment(date).format('HH:mm:ss')
                        if (
                            moment(date).format('yyyy-MM-DD') ===
              moment(newValue).format('yyyy-MM-DD')
                        ) {
                            const hh1 = moment(newValue).format('HH:mm:ss')
                            if (hh1 > nowDate) {
                                this.searchCond.startTime = new Date(this.searchCond.endTime)
                            }
                            st = nowDate
                            timeST = nowDate
                        } else {
                            st = '00:00:00'
                            timeST = '23:59:59'
                        }
                    } else {
                        st = '00:00:00'
                        timeST = '23:59:59'
                    }
                    this.pickerOptionsStart.selectableRange = '00:00:00 - ' + timeST
                    this.pickerOptionsStart = this.pickerOptionsStart
                    this.pickerOptionsEnd.selectableRange = st + ' - 23:59:59'
                    this.pickerOptionsEnd = this.pickerOptionsEnd
                }
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        clearNoNum(event, obj) {
            //响应鼠标事件，允许左右方向键移动
            event = window.event || event;
            if (event.keyCode == 37 | event.keyCode == 39) {
                return;
            }
            var t = obj.charAt(0);
            //先把非数字的都替换掉，除了数字和.
            obj = obj.replace(/[^\d.]/g, "");
            //必须保证第一个为数字而不是.
            obj = obj.replace(/^\./g, "");
            //保证只有出现一个.而没有多个.
            obj = obj.replace(/\.{2,}/g, ".");
            //保证.只出现一次，而不能出现两次以上
            obj = obj.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
            //如果第一位是负号，则允许添加   如果不允许添加负号 可以把这块注释掉
            if (t == '-') {
                obj = '-' + obj;
                
            }
            console.log('%c [ obj ]-179', 'font-size:13px; background:pink; color:#bf2c9f;', obj)
        },

        jsPlumbInit () {
            jsPlumb.ready(() => {
                // jsPlumb.setContainer("diagramContainer")
                plumbins = jsPlumb.getInstance({
                    Container: 'diagramContainer', // 选择器id
                    HoverPaintStyle: { stroke: '#994B0A', strokeWidth: 3 }, // 默认悬停样式  默认为null
                    ConnectionOverlays: [ // 此处可以设置所有箭头的样式
                        ['Arrow', { // 设置参数可以参考中文文档
                            location: 1,
                            length: 10,
                            paintStyle: {
                                stroke: '#999',
                                fill: '#999'
                            }
                        }],
                        ["Label", { label: "标签", cssClass: "aLabel", visible: true, id: "label", strokeWidth: 5 }]
                    ],
                    Connector: ['Flowchart', { stub: [1, 25], cornerRadius: 5, alwaysRespectStubs: true },],
                    // Endpoint: 'Blank',  //DOt
                    Anchor: ["Top", "TopLeft", "Bottom", [0.5, 0, 0, -1], [0.5, 1, 0, 1]],
                    MaxConnections: -1,
                    PaintStyle: { stroke: '#000', strokeWidth: 2, radius: 7 },
                    EndpointStyle: { radius: 4, fill: "#acd" },  //端点样式
                    ConnectionsDetachable: true,//连接是否可以使用鼠标默认分离
                    EndpointOverlays: [],
                    AllowLoopback: false
                });

                plumbins.reset()
                this.$nextTick(() => {
                    plumbins.batch(() => {
                        for (let i = 0; i < this.leftList.length; i++) {
                            this.initLeaf(this.leftList[i].nodeId);
                        }
                    })
                })
                this.setjsPlumb(true, true);
                // 当链接建立前
                plumbins.bind('beforeDrop', (info) => {
                    const lineObj = { source: info.sourceId, target: info.targetId }
                    const lineObj1 = { source: info.targetId, target: info.sourceId }
                    let flag = this.arr.filter(val => JSON.stringify(val) == JSON.stringify(lineObj) || JSON.stringify(val) == JSON.stringify(lineObj1))
                    if (flag.length > 0) {
                        return false
                    } else {
                        this.arr.push(lineObj)
                        return true
                    }
                })

                //点击连线
                plumbins.bind('click', (conn, originalEvent) => {
                    console.log(conn, originalEvent)
                    this.conn = conn
                    this.dialogVisible = true
                })

                //连线时触发
                plumbins.bind('connection', (conn, originalEvent) => {
                    console.log(conn)
                })

                //右键触发
                plumbins.bind('contextmenu', (conn, originalEvent) => {
                    console.log(conn, originalEvent)
                    // if (window.prompt('确定删除所点击的链接吗？ 输入1确定') === '1') {
                    //     this.jsPlumb.detach(conn)
                    // }
                    // if (window.prompt('确定删除所点击的链接吗？ 输入1确定') === '1') {
                    //     plumbins.deleteConnection(conn)
                    // }
                    // // 同步删除 arr 数据不然 不能再画
                    // const lineObj = { source: conn.sourceId, target: conn.targetId }
                    // const lineObj1 = { source: conn.targetId, target: conn.sourceId }
                    // this.arr.forEach((val, index) => {
                    //     if (JSON.stringify(val) == JSON.stringify(lineObj) || JSON.stringify(val) == JSON.stringify(lineObj1)) {
                    //         this.arr.splice(index, 1)
                    //     }
                    // })
                })
            })

        },
        setjsPlumb (sourceFlag, targetFlag) {
            const source = document.getElementsByName('source')
            console.log('%c [ source ]-139', 'font-size:13px; background:pink; color:#bf2c9f;', source)
            const target = document.getElementsByName('target')
            plumbins.setSourceEnabled(source, sourceFlag)
            plumbins.setDraggable(source, false) // 是否支持拖拽

        },
        //  初始化规则使其可以连线、拖拽
        initLeaf (id, type) {
            const ins = plumbins;
            const elem = document.getElementById(id);
            ins.makeSource(elem, this.jsplumbSourceOptions)

            ins.makeTarget(elem, this.jsplumbTargetOptions)

        },
        onClickValue () {
            this.conn.getOverlay("label").setLabel(this.value);
            this.dialogVisible = false
        },
        scrollToTop () {
            console.log('%c [  ]-175', 'font-size:13px; background:pink; color:#bf2c9f;',)
            // plumbins.reset()
            plumbins.repaintEverything()
        },
        onGetAllConnections () {
            plumbins.getAllConnections()
            console.log('%c [ plumbins.getAllConnections() ]-184', 'font-size:13px; background:pink; color:#bf2c9f;', plumbins.getAllConnections())
        }

    },
    mounted () {
        this.$nextTick(() => {
            this.jsPlumbInit()
        }),
        window.addEventListener('resize', () => {
            plumbins.repaintEverything()
        })
    },
};
</script>
<style lang='scss'>
#diagramContainer {
    position: relative;
    width: 700px;
    // height: 600px;
    // border: 1px solid black;
    overflow: scroll;
    line-height: 80px;
}
#divText {
    line-height: 80px;
}
.endpointTargetLabel {
    background-color: pink;
    color: white;
    padding: 0 2px;
    font-size: 10px;
}
.highlight {
    background-color: yellow;
}
.aLabel {
    color: red;
    padding-bottom: -20px;
}
</style>
