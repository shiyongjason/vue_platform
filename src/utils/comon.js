function numValidate (str, float, regular, regular2, limit = '') {
    if (!str) return;
    str = str.toString();
    // 如果第一位是0，第二位不是点  01 02...
    if (str.length > 1 && str.charAt(0) === '0' && str.charAt(1) !== '.' && !limit) {
        return '';
    }
    if (float === 0 && str.indexOf('.') > -1) {
        return str.split('.')[0];
    }
    const i = str.indexOf('.');
    console.log('[ i ]-12', i);
    let arr;
    if (i !== -1) {
        str = str.replace(regular2, '');
        console.log('[ str ]-16', str);
        arr = str.split('.');
        str = arr[0];
    }
    const reg = regular;
    let newStr = str.replace(reg, '');
    newStr = float === 0 ? str.slice(0, str.length) : newStr;
    newStr = newStr.replace(/-(0+)/g, ''); // -0xx
    const newStrFlot = arr && arr[1].replace(reg, '');
    return float !== 0 && i !== -1 ? newStr + '.' + newStrFlot.slice(0, float) : newStr;
    //   return float !== 0 && i !== -1 ? newStr + '.' + newStrFlot.slice(0, float) : newStr;
}

function isNegative (str, float = 1000000000) {
    const regular = /[^\-?\d.]/g;
    const regular2 = /[^\d^\\.\\-]+/g;
    //   const regular2 =  /-(0+)/gg;
    return numValidate(str, float, regular, regular2);
}

export {

    isNegative

};
