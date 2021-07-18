import dayjs from "dayjs";

/**
 * 对象数组映射成对象结构
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
 * 对象数组去重
 * @param {Number} num
 * @return {Date}
 */
export function objArrUnique(arr, uniqueKey = "id") {
  const res = new Map();
  return arr.filter(
    item => !res.has(item[uniqueKey]) && res.set(item[uniqueKey], 1)
  );
}

/**
 * 类型检测
 * @param {Any} value
 * @return {String}
 * 返回类型字符如： Array String
 */
export function getType(value) {
  let type = Object.prototype.toString.call(value);
  type = type.replace(/^\[object\s/, "");
  type = type.replace(/\]$/, "");
  return type;
}

/**
 * 深度复制（基本版，只检测数组和对象）
 * @param {Object/Array} obj
 * @return {Object/Array}
 */
export function deepClone(obj) {
  const objClone = Array.isArray(obj) ? [] : {};
  if (obj && typeof obj === "object") {
    for (const key in obj) {
      if (Reflect.get(obj, key)) {
        // 判断ojb子元素是否为对象，如果是，递归复制
        if (obj[key] && typeof obj[key] === "object") {
          objClone[key] = deepClone(obj[key]);
        } else {
          // 如果不是，简单复制
          objClone[key] = obj[key];
        }
      }
    }
  }
  return objClone;
}

/**
 * 遍历树节点
 * @param {Object} node
 * @param {Function} callBack
 * @return {null}
 * {
 *  id：1,
 *  name:"1",
 *  children:[{
 *     id：1,
 *     name:"1",
 *   }]
 * }
 * **/
export function traverseTree(node = {}, callBack) {
  // console.log("node", node);
  typeof callBack == "function" && callBack(node);
  if (node.children && Array.isArray(node.children)) {
    node.children.forEach(item => {
      typeof callBack == "function" && callBack(item);
      if (item.children && Array.isArray(item.children)) {
        traverseTree(item, callBack);
      }
    });
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
 * 以json格式的本地存储数据（localStorge）
 * @param {String} key
 * @param {Any} value
 * @return {null}
 */
export const setJsonItem = (key, value) => {
  try {
    if (key && value) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  } catch (error) {
    console.error("setJsonItemError", error);
  }
};

/**
 * 获取以json格式存储的数据（localStorge）
 * @param {String} key
 * @return {Any}
 */
export const getJsonItem = (key = "") => {
  try {
    let value = localStorage.getItem(key);
    if (value) value = JSON.parse(value);
    return value;
  } catch (error) {
    console.error("getJsonItemError", error);
  }
};
