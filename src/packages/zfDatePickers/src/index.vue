<template>
    <div class="default-upload-warp">
        {{timesData}}
        <el-date-picker v-model="timesData.startTime" :type="timesOptions.type" placeholder="开始时间" :clearable="true" :value-format="timesOptions.valueFormat" :picker-options="pickerOptionsStart" v-bind="$attrs"
        v-on="$listeners" @change="onChangeStart"/>
        <span style="padding: 0 3px; color: #000"> 至 </span>
        <el-date-picker v-model="timesData.endTime" :type="timesOptions.type" :clearable="true" placeholder="结束时间" :value-format="timesOptions.valueFormat" :picker-options="pickerOptionsEnd" v-bind="$attrs"
        v-on="$listeners" @change="onChangeEnd"/>
    </div>
</template>

<script>
import moment from 'moment'
export default {
    name: 'zfDatePickers',
    props: {
        timesOptions:{
            type:Object,
            default:()=>{
                return{
                    type:'datetime',
                    valueFormat:'yyyy-MM-dd HH:mm:ss',
                    format:'yyyy-MM-dd HH:mm:ss'
                }
            }
        }

    },
    data () {
        return {
            moment,
            timesData: {
                endTime: "",
                startTime: ''
            },
            // maxTimes:new Date(new Date().getTime() + 24*60*60*1000*5),
            // minTimes:'' ,
            //一个月
            // 开始结束日期限制
            pickerOptionsStart: {
                selectableRange: '00:00:00 - 23:59:59',
                disabledDate: this.disabledDateStart
            },
            // 结束日期限制
            pickerOptionsEnd: {
                selectableRange: '00:00:00 - 23:59:59',
                disabledDate: this.disabledDateEnd
            },
        }
    },
    watch: {
        'timesData.endTime': {
            handler (newValue, oldValue) {
                if (newValue) {
                    if(this.timesOptions.type==='datetime'){
                        let timeST = ''
                        let st = ''
                        if (this.timesData.startTime) {
                            const date = new Date(this.timesData.startTime)
                            //此处用到moment插件，可自行安装此插件或者类似的插件即可
                            const nowDate = moment(date).format('HH:mm:ss')
                            if ( moment(date).format('yyyy-MM-DD') === moment(newValue).format('yyyy-MM-DD')) {
                                const hh1 = moment(newValue).format('HH:mm:ss')
                                if (hh1 < nowDate) {
                                    this.timesData.endTime = new Date(this.timesData.startTime)
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
                        this.pickerOptionsStart.disabledDate = this.disabledDateStart
                        this.pickerOptionsStart = this.pickerOptionsStart

                        this.pickerOptionsEnd.selectableRange = st + ' - 23:59:59'
                        this.pickerOptionsEnd.disabledDate = this.disabledDateEnd
                        this.pickerOptionsEnd = this.pickerOptionsEnd

                        this.$forceUpdate()
                    }
                }
            },
            deep: true,
            immediate: true
        },
        'timesData.startTime': {
            handler (newValue, oldValue) {
                if (newValue) {
                    if(this.timesOptions.type==='datetime'){
                        let timeST = ''
                        let st = ''
                        if (this.timesData.endTime) {
                            const date = new Date(this.timesData.endTime)
                            const nowDate = moment(date).format('HH:mm:ss')
                            if (
                                moment(date).format('yyyy-MM-DD') ===
                            moment(newValue).format('yyyy-MM-DD')
                            ) {
                                const hh1 = moment(newValue).format('HH:mm:ss')
                                if (hh1 > nowDate) {
                                    this.timesData.startTime = new Date(this.timesData.endTime)
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
                        this.pickerOptionsStart.disabledDate = this.disabledDateStart
                        this.pickerOptionsStart = this.pickerOptionsStart
                        this.pickerOptionsEnd.selectableRange = st + ' - 23:59:59'
                        this.pickerOptionsEnd.disabledDate = this.disabledDateEnd
                        this.pickerOptionsEnd = this.pickerOptionsEnd
                        this.$forceUpdate()
                    }
                }
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        disabledDateStart(times){
            
            if (this.timesData.endTime) {
                return (
                    times.getTime() > new Date(this.timesData.endTime).getTime() ||times.getTime() > new Date(this.maxTimes).getTime()
                )
            }
          
            if(this.minTimes||this.maxTimes){
                return times.getTime() > new Date(this.maxTimes).getTime()
            }
            
        },
        disabledDateEnd(times){
            if (this.timesData.startTime) {
                return (
                // 可以选中大于等于开始时间
                    times.getTime() <= new Date(this.timesData.startTime).getTime() - 24*60*60*1000|| times.getTime()> new Date(this.maxTimes).getTime()
                )
            }
            if(this.minTimes||this.maxTimes){
                return times.getTime()> new Date(this.maxTimes).getTime()
            }
        },
        onChangeStart(val){
            console.log('%c [ val ]-141', 'font-size:13px; background:pink; color:#bf2c9f;', val)
        },
        onChangeEnd(val){
            console.log('%c [ val ]-141', 'font-size:13px; background:pink; color:#bf2c9f;', val)
        }
    }
}
</script>


