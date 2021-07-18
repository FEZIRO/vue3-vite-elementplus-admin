/**
 * app全局配置
 */

import logo from "../../assets/images/logo3.png";

const getCachePageIndicator = () => {
  let val = localStorage.getItem("pageIndicator");
  return val;
};
const getCacheMenuCollapse = () => {
  let val = localStorage.getItem("menuCollapse");
  console.log("menuCollapse", val);
  return val;
};

export default {
  namespaced: true,
  state: () => ({
    //平台名称
    appName: "Vue3-Element+管理系统",
    //平台logo
    appLogo: logo,
    //端标识
    device: "desktop", //移动端"mobile" or 桌面端"desktop"
    //页面指示器（“面包屑”，“标签切换”）
    pageIndicator: getCachePageIndicator() || "面包屑",
    //菜单折叠
    menuCollapse: getCacheMenuCollapse() || 0,
  }),

  getters: {
    userInfo() {
      let userInfo = localStorage.getItem("userInfo");
      return userInfo ? JSON.parse(userInfo) : {};
    },
    menu() {
      let menu = localStorage.getItem("menu");
      return menu ? JSON.parse(menu) : [];
    },
  },

  //用于同步操作state
  mutations: {
    SET_DEVICE(state, device) {
      state.device = device;
      if (device === "mobile") this.commit("app/TOGGLE_MENU_COLLAPSE", 1);
      if (device === "desktop") this.commit("app/TOGGLE_MENU_COLLAPSE", 0);
    },

    TOGGLE_MENU_COLLAPSE(state, collapse) {
      if (state.menuCollapse === collapse) return;
      state.menuCollapse = collapse;
      localStorage.setItem("menuCollapse", state.menuCollapse);
    },

    SET_MENU_TAG_SWITCHER(state, val = "面包屑") {
      state.pageIndicator = val;
      localStorage.setItem("pageIndicator", state.pageIndicator);
    },
  },

  //用于异步操作state
  actions: {},
};
