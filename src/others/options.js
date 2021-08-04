import { arrayToObject } from "@/others/utils.js";

/**
 * 全局下拉值选项配置
 */

// 用户类型选项
export const userTypeOptions = [
  {
    id: 1,
    name: "普通人员",
  },
  {
    id: 2,
    name: "管理员",
  },
];

// 用户类型映射（可用于表格类型回显）
// [{ id: 1, name: "张三" }]  => { 1 : { id: 1, name: "张三" } }
export const userTypeOptionsMap = arrayToObject(userTypeOptions, {
  keyName: "id",
});


//性别类型选项
export const sexOptions = [
  {
    id: 1,
    name: "男",
  },
  {
    id: 2,
    name: "女",
  },
];
// 性别类型选项映射
export const sexOptionsMap = arrayToObject(sexOptions, {
  keyName: "id",
});
