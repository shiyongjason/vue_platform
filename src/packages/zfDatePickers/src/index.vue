<template>
  <div class="fc-dateTimesPickers">
        <zf-date-picker v-model="timesData.startTime" :type="timesOptions.type" placeholder="开始时间" :clearable="true" :value-format="timesOptions.valueFormat" :format="timesOptions.format"  :picker-options="pickerOptionsStart" v-bind="$attrs"
        v-on="$listeners" @change="onChangeStart" popper-class="no-pickernow" @focus="onFocus"/>
        <span style="padding: 0 3px; color: #000"> 至 </span>
        <zf-date-picker v-model="timesData.endTime" :type="timesOptions.type" :clearable="true" placeholder="结束时间" :value-format="timesOptions.valueFormat" :format="timesOptions.format" :picker-options="pickerOptionsEnd" v-bind="$attrs"
        v-on="$listeners" @change="onChangeEnd" popper-class="no-pickernow"  @focus="onFocus"/>
  </div>
</template>

<script>
import moment from 'moment';
export default {
    name: 'FcDateTimesPickers',
    props: {
        timesOptions: {
            type: Object,
            default: ()=>{
                return {
                    type: 'datetime',
                    valueFormat: 'yyyy-MM-dd HH:mm:ss',
                    format: 'yyyy-MM-dd HH:mm:ss'
                };
            }
        },
        maxTimes: {
            type: Number,
            default: 0
        }

    },
    data() {
        return {
            moment,
            timesData: {
                endTime: '',
                startTime: ''
            },
            // maxTimes:new Date(new Date().getTime() + 24*60*60*1000*5),
            // minTimes:'' ,
            // 一个月
            // 开始结束日期限制
            pickerOptionsStart: {
                selectableRange: '00:00:00 - 23:59:59',
                disabledDate: this.disabledDateStart
            },
            // 结束日期限制
            pickerOptionsEnd: {
                selectableRange: '00:00:00 - 23:59:59',
                disabledDate: this.disabledDateEnd
            }
        };
    },
    watch: {
        'timesData.endTime': {
            handler(newValue, oldValue) {
                if (newValue) {
                    if (this.timesOptions.type === 'datetime') {
                        let timeST = '';
                        let st = '';
                        if (this.timesData.startTime) {
                            const date = new Date(this.timesData.startTime);
                            // 此处用到moment插件，可自行安装此插件或者类似的插件即可
                            const nowDate = moment(date).format('HH:mm:ss');
                            if (moment(date).format('yyyy-MM-DD') === moment(newValue).format('yyyy-MM-DD')) {
                                const hh1 = moment(newValue).format('HH:mm:ss');
                                if (hh1 < nowDate) {
                                    this.timesData.endTime = new Date(this.timesData.startTime);
                                }
                                st = nowDate;
                                timeST = nowDate;
                            } else {
                                st = '00:00:00';
                                timeST = '23:59:59';
                            }
                        } else {
                            st = '00:00:00';
                            timeST = '23:59:59';
                        }
                        this.pickerOptionsStart.selectableRange = '00:00:00 - ' + timeST;
                        this.pickerOptionsStart.disabledDate = this.disabledDateStart;
                        this.pickerOptionsStart = this.pickerOptionsStart;

                        this.pickerOptionsEnd.selectableRange = st + ' - 23:59:59';
                        this.pickerOptionsEnd.disabledDate = this.disabledDateEnd;
                        this.pickerOptionsEnd = this.pickerOptionsEnd;

                        this.$forceUpdate();
                    }
                }
            },
            deep: true,
            immediate: true
        },
        'timesData.startTime': {
            handler(newValue, oldValue) {
                if (newValue) {
                    if (this.timesOptions.type === 'datetime') {
                        let timeST = '';
                        let st = '';
                        if (this.timesData.endTime) {
                            const date = new Date(this.timesData.endTime);
                            const nowDate = moment(date).format('HH:mm:ss');
                            if (moment(date).format('yyyy-MM-DD') === moment(newValue).format('yyyy-MM-DD')) {
                                const hh1 = moment(newValue).format('HH:mm:ss');
                                if (hh1 > nowDate) {
                                    this.timesData.startTime = new Date(this.timesData.endTime);
                                }
                                st = nowDate;
                                timeST = nowDate;
                            } else {
                                st = '00:00:00';
                                timeST = '23:59:59';
                            }
                        } else {
                            st = '00:00:00';
                            timeST = '23:59:59';
                        }
                        this.pickerOptionsStart.selectableRange = '00:00:00 - ' + timeST;
                        // this.$set(this.pickerOptionsStart, 'selectableRange', '00:00:00 - ' + timeST);
                        this.pickerOptionsStart.disabledDate = this.disabledDateStart;
                        this.pickerOptionsStart = this.pickerOptionsStart;
                        this.pickerOptionsEnd.selectableRange = st + ' - 23:59:59';
                        this.pickerOptionsEnd.disabledDate = this.disabledDateEnd;
                        this.pickerOptionsEnd = this.pickerOptionsEnd;
                        this.$forceUpdate();
                    }
                }
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        onFocus() {

            console.log('[  ]-137', 1);
            this.pickerOptionsStart.disabledDate = this.disabledDateStart;
            this.pickerOptionsStart = this.pickerOptionsStart;
            this.pickerOptionsEnd.disabledDate = this.disabledDateEnd;
            this.pickerOptionsEnd = this.pickerOptionsEnd;
            this.$forceUpdate();
        },
        disabledDateStart(times) {

            if (this.timesData.endTime) {
                return (
                    times.getTime() > new Date(this.timesData.endTime).getTime()
                );
            }

            if (this.minTimes || this.maxTimes) {
                return times.getTime() > new Date(this.maxTimes).getTime();
            }

        },
        disabledDateEnd(times) {
            if (this.timesData.startTime) {
                return (
                // 可以选中大于等于开始时间
                    times.getTime() <= new Date(this.timesData.startTime).getTime() - 24 * 60 * 60 * 1000 || (this.maxTimes && times.getTime() > new Date(this.maxTimes).getTime())
                );
            }
            if (this.minTimes || this.maxTimes) {
                return times.getTime() > new Date(this.maxTimes).getTime();
            }
        },
        onChangeStart(val) {
            const start = new Date(this.timesData.startTime).getTime();
            const end = new Date(this.timesData.endTime).getTime();

            if (start && end && start > end) {
                this.$message.error('开始时间不能大于结束时间');
                this.timesData.startTime = '';
            }
            this.$emit('onPickerChange', this.timesData.startTime, 'start');
        },
        onChangeEnd(val) {
            const start = new Date(this.timesData.startTime).getTime();
            const end = new Date(this.timesData.endTime).getTime();

            if (start && end && start > end) {
                this.$message.error('结束时间不能小于开始时间');
                this.timesData.endTime = '';
            }
            this.$emit('onPickerChange', this.timesData.endTime, 'end');
        }
    }
};
</script>