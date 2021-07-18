/**
 * 全局下拉值选项配置
 *
 */
import { arrayToObject } from "@/utils/utils.js";

export default {
  namespaced: true,
  state: () => ({
    userTypeOptions: [
      {
        id: 1,
        name: "普通人员",
      },
      {
        id: 2,
        name: "管理员",
      },
    ],
    sexOptions: [
      {
        id: 1,
        name: "男",
      },
      {
        id: 2,
        name: "女",
      },
    ],
  }),

  getters: {
    //人员类型映射
    // [{ id:1, name:"张三" }]  => { 1 : { id:1,name:"张三" } }
    userTypeOptionsMap(state) {
      return arrayToObject(state.userTypeOptions, {
        keyName: "id",
      });
    },
    //性别映射
    sexOptionsMap(state) {
      return arrayToObject(state.sexOptions, {
        keyName: "id",
      });
    },
  },

  mutations: {},

  actions: {},
};
