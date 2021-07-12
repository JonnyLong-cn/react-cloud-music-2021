// 工具函数
export const getCount = (count) => {
    if (count < 0) return;
    if (count < 10000) {
        return count;
    } else if (Math.floor(count / 10000) < 10000) {
        return Math.floor(count / 1000) / 10 + "万";
    } else {
        return Math.floor(count / 10000000) / 10 + "亿";
    }
}

/**
 * 防抖函数
 * 短时间内多次触发同一事件，只执行最后一次，或者只执行最开始的一次，中间的不执行。
 * @param {function} func 传入的函数
 * @param {number} delay 延时
 * @returns 
 */
const debounce = (func, delay) => {
    let timer;
    return function (...args) {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            func.apply(this, args);
            clearTimeout(timer);
        }, delay);
    };
};
export { debounce };