<template>
    <div>
         <div id="diagramContainer">
        <div id="divText">
            一百年来，我们党从成立时只有 <span class="highlight"><span id="text0"  name="source">50多名党员</span></span>，发展成为拥有
            <span class="highlight"><span id="text1"  name="source">9500多万名党员</span></span>、领导着14亿多人口大国、具有重大全球影响力的
            <span class="highlight"><span id="text2"  name="target">世界第一大执政党</span></span>分别在连线或点击前后触发，如果要保存连线修改的信息，可以在mounted中对实例化对象绑定事件,
            文本内容就是上面圈着的一部分，内容中包含换行符（↵）.对于这类型的数据，在前端页面是需要进行稍微处理才能正常显示。如果没有经过处理，那么内容是不会在有换行符的位置进行换行显示的：
            思想：将文本字符串转化为数组，然后将数组中“\n”换成浏览器正常解析的换行标签即可。(后端传回来的“↵”就是\n)，上面同样可以使用正则表达式来将字符串的换行符转换为<br >，那么就不用转换为数组了。
        </div>
      </div>
      <el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%"
 >
  <el-input placeholder="输入" v-model="value"></el-input>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="onClickValue">确 定</el-button>
  </span>
</el-dialog>
    </div>
</template>
<script>
import {jsPlumb} from 'jsplumb'
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

export default {
    name:'test-sort',
    data () {
        return {
            value:'',
            dialogVisible:false,
            jsPlumb:'',
            conn:'',
            arr:[{source:'text01',target:'text02'}],
            leftList:[
                // 起点
                {name: 'source', nodeId: 'text0'},
                {name: 'source', nodeId: 'text1'},
                {name: 'source', nodeId: 'text2'},
            ],
            rightList:[
                // 终点
                {name: 'xxx_right_1', nodeId: 'text0'},
                {name: 'xxx_right_2', nodeId: 'text1'},
                {name: 'xxx_right_3', nodeId: 'text2'},
            ]
        };
    },
    methods: {
        jsPlumbInit() {
            jsPlumb.ready( () => {
                this.jsPlumb = jsPlumb.getInstance({
                    Container: 'diagramContainer', // 选择器id
                    HoverPaintStyle: {stroke: '#994B0A', strokeWidth: 3 }, // 默认悬停样式  默认为null
                    ConnectionOverlays: [ // 此处可以设置所有箭头的样式
                        ['Arrow', { // 设置参数可以参考中文文档
                            location: 1,
                            length: 10,
                            paintStyle: {
                                stroke: '#999',
                                fill: '#999'
                            }
                        }],
                        ["Label", { label: "标签",  cssClass: "aLabel",visible: true, id: "label",strokeWidth: 5  }]
                    ],
                    Connector: ['Flowchart',{ stub: [15, 25], cornerRadius: 5, alwaysRespectStubs: true },],
                    Endpoint: 'Blank',
                    Anchor:["Top", "Bottom", [0.5, 0, 0, -1], [0.5, 1, 0, 1]],
                    MaxConnections: -1,
                    PaintStyle: { stroke: 'pink', strokeWidth: 1 ,radius:7},
                    EndpointStyle: { radius: 4, fill: "#acd"},  //端点样式
                    ConnectionsDetachable   : true,//连接是否可以使用鼠标默认分离
                    EndpointOverlays:[],
                    AllowLoopback:false
                });

      


                this.jsPlumb.reset()
                this.jsPlumb.batch(() => {
                    for(let i = 0; i < this.leftList.length; i++){
                        this.initLeaf(this.leftList[i].nodeId, 'source');
                    }
                    for(let j = 0; j < this.rightList.length; j++){
                        this.initLeaf(this.rightList[j].nodeId , 'target')
                    }
                })
 
                this.setjsPlumb(true,true);
                // 当链接建立前
                this.jsPlumb.bind('beforeDrop',  (info) =>{
                    const lineObj = {source:info.sourceId,target:info.targetId}
                    const lineObj1 = {source:info.targetId,target:info.sourceId}
                    let flag =  this.arr.filter(val=> JSON.stringify(val)==JSON.stringify(lineObj)||JSON.stringify(val)==JSON.stringify(lineObj1))
                    console.log('%c [ flag ]-107', 'font-size:13px; background:pink; color:#bf2c9f;', flag)
                    if(flag.length>0){
                        return false
                    }else{
                        this.arr.push(lineObj)
                        return true
                    }
                })
 
                //点击连线
                this.jsPlumb.bind('click',  (conn, originalEvent) => {
                    console.log(conn, originalEvent)
                    this.conn = conn
                    this.dialogVisible = true
                })
 
                //连线时触发
                this.jsPlumb.bind('connection',  (conn, originalEvent) => {
                    console.log(conn.connection)
                    console.log(conn.targetId)
                })
 
                //右键触发
                this.jsPlumb.bind('contextmenu',  (conn, originalEvent) => {
                    console.log(conn, originalEvent)
                // if (window.prompt('确定删除所点击的链接吗？ 输入1确定') === '1') {
                //     this.jsPlumb.detach(conn)
                // }
                })
            })

        },
        setjsPlumb(sourceFlag, targetFlag){
            const source = document.getElementsByName('source')
            console.log('%c [ source ]-110', 'font-size:13px; background:pink; color:#bf2c9f;', source)
            const target = document.getElementsByName('target')
            this.jsPlumb.setSourceEnabled(source, sourceFlag)
            this.jsPlumb.setTargetEnabled(target, targetFlag)
            this.jsPlumb.setDraggable(source, false) // 是否支持拖拽
            this.jsPlumb.setDraggable(target, false) // 是否支持拖拽
        },
        //  初始化规则使其可以连线、拖拽
        initLeaf(id, type) {
            const ins = this.jsPlumb;
            const elem = document.getElementById(id);
            if (type === 'source') {
                ins.makeSource(elem, {
                    // anchor:["Top", "Bottom", [0.5, 0, 0, -1], [0.5, 1, 0, 1]],
                    allowLoopback: false, //允许回连
                    maxConnections: -1
                })
            } else {
                ins.makeTarget(elem, {
                    allowLoopback: false,
                    maxConnections: -1
                })
            }

        },
        onClickValue(){
            this.conn.getOverlay("label").setLabel(this.value);
            this.dialogVisible = false
        }
     
    },
    mounted () {
        this.$nextTick(()=>{
            this.jsPlumbInit()

        }),
        window.addEventListener('resize', () => {
            this.jsPlumb.repaintEverything()
        })
    },
};
</script>
<style lang='scss'>
     #diagramContainer{
            position: relative;
            width: 700px;
            height: 600px;
            border: 1px solid black;
            padding: 20px;
            overflow: auto;
        }
        #divText{
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

</style>
