import dayjs from "dayjs";

/**
 * 对象数组映射成对象Map结构
 * @param {Array}
 * @return {Object}
 */
export function arrayToObject(
  data = [],
  format = { keyName: "id", valueName: "name" }
) {
  let map = {};
  if (data.length == 0) return;
  if (format && format.keyName && format.valueName) {
    // 例如以id为key名称,以name为value名称
    // [{ id: "xx", name: "yy" }] => { xx: yy }
    data.forEach(item => {
      map[item[format.keyName]] = item[format.valueName];
    });
    return map;
  } else if (format && format.keyName) {
    // 例如以id为key名称
    // [{ id: "xx", name: "yy" }] => { xx: { id: "xx", name: "yy" } }
    data.forEach(item => {
      map[item[format.keyName]] = item;
    });
    return map;
  } else {
    console.error("请输入keyName或valueName");
    return;
  }
}

/**
 * 时间格式化
 * @param {Number} num
 * @return {Date}
 */
export function timeFormat(time, formatStr = "YYYY-MM-DD HH:mm") {
  if (!time) return "--";
  return time ? dayjs(time).format(formatStr) : "";
}

/**
 * 类型检测
 * @param {Any} value
 * @return {String}
 * 返回类型字符如： Array String Number
 */
export function getType(value) {
  let type = Object.prototype.toString.call(value);
  type = type.replace(/^\[object\s/, "");
  type = type.replace(/\]$/, "");
  return type;
}

/**
 * 遍历树节点
 * @param {Array} data
 * @param {Function} callBack
 * @return {null}
 * [{
 *  id：1,
 *  name:"1",
 *  children:[{
 *     id：1,
 *     name:"1",
 *   }]
 * }]
 * **/
export function traverseArrayTree(
  data = [],
  childNodeKey = "children",
  callBack
) {
  if (Array.isArray(data)) {
    data.forEach(item => {
      typeof callBack == "function" && callBack(item);
      if (item[childNodeKey] && Array.isArray(item[childNodeKey])) {
        traverseArrayTree(item[childNodeKey], childNodeKey, callBack);
      }
    });
  } else {
    throw new error("请传入数组");
  }
}

/**
 * 函数节流
 * @param {Function} fun
 * @param {Number} wait
 * @return {Function}
 */
export function throttle(fn, wait) {
  var pre = Date.now();
  return function () {
    var context = this;
    var args = arguments;
    var now = Date.now();
    if (now - pre >= wait) {
      fn.apply(context, args);
      pre = Date.now();
    }
  };
}

/**
 * 函数防抖
 * @param {Function} fun
 * @param {Number} delay
 * @return {Function}
 */
export function debounce(fn, delay) {
  // 记录上一次的延时器
  var timer = null;
  return function () {
    // 清除上一次延时器
    var context = this;
    var args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
}

/**
 * 获取客户端浏览器内容窗口宽高
 * @param null
 * @return {Object}
 */
export const getClientRect = () => {
  let currentClientHeight =
    document.documentElement.clientHeight || document.body.clientHeight;
  let currentClientWidth =
    document.documentElement.clientWidth || document.body.clientWidth;

  return {
    clientWidth: currentClientWidth,
    clientHeight: currentClientHeight,
  };
};
