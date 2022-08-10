import { isNegative } from '../utils/numberFormat';
/**
 * 使用方法: v-onlyNumber="{max:1000000,min:0,precision:2}"
  max:最大值
  min:最小值
  precision:保留几位小数点(默认是0位)
 */
const onlyNumber = {
    bind (el, vDir, vNode) {
        let content;
        const element = el.getElementsByTagName('input')[0];
        // 按键按下=>只允许输入 数字/小数点
        el.addEventListener('keypress', event => {
            let e = event || window.event;
            let inputKey = String.fromCharCode((typeof e.charCode === 'number' || e.charCode === 45) ? e.charCode : e.keyCode);
            let re = /[\d|\\.\\-]/;
            content = e.target.value;
            // 定义方法,阻止输入
            function preventInput () {
                if (e.preventDefault) {
                    e.preventDefault();
                } else {
                    e.returnValue = false;
                }
            }
            // 如果不是小数位的 禁止输入
            if (!re.test(inputKey) && !e.ctrlKey) {
                preventInput();
            } else if (content.indexOf('.') > 0 && inputKey === '.') {
                // 已有小数点,再次输入小数点
                preventInput();
            }
        });
        // 按键弹起=>并限制最大最小
        el.addEventListener('keyup', event => {
            let e = event || window.event;
            content = e.target.value;
            if (!content) {
                content = '';
            }
            // 计算正则校验
            if (vDir.value && vDir.value.precision) {
                content = isNegative(element.value, vDir.value.precision);
                console.log('[ content ]-47', content);
            } else {
                content = isNegative(element.value, 0);

            }
            //   如果有小数 负数
            if (element.value.indexOf('-') > -1 && element.value.indexOf('-') !== 0) element.value = element.value.substring(0, element.value.indexOf('-'));
            if (element.value === 'undefined') element.value = '';
            if (element.value === '-.' || element.value === '--' || element.value === '.-') element.value = '-';
            if (element.value.indexOf('-') > -1) { // --
                let arr = element.value.split('-');
                if (arr.length > 2) element.value = '';
            }
            console.log('[ content ]-47', content);
            // 显示 大小上限
            let argMax = '';
            let argMin = '';
            if (vDir.value) {
                argMax = parseFloat(vDir.value.max);
                argMin = parseFloat(vDir.value.min);
            }
            if (argMax && content && content > argMax) {
                e.target.value = argMax;
                content = argMax;
            }
            if (argMin && content && content < argMin) {
                e.target.value = argMin;
                content = argMin;
            }
            vNode.data.model.callback(content);
        });
        // 失去焦点=>保留指定位小数
        element.addEventListener('blur', event => { // 此处会在 el-input 的 @change 后执行
            let argPrecision = 0;// 默认保留至整数
            if (vDir.value && vDir.value.precision) {
                argPrecision = vDir.value.precision;
            }
            // 中文状态下处理
            content = isNegative(element.value, argPrecision);
            if (isNaN(content)) content = '';
            //   content = parseFloat(content).toFixed(argPrecision);
            vNode.data.model.callback(content && content.replace(/\.$/g, '').replace(/^\./, '0.'));
        });
    }
};
export default onlyNumber;

