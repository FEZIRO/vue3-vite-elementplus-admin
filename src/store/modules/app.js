/**
 * app全局配置
 */

import logo from "../../assets/images/logo.png";
import { getClientRect } from "@/utils/utils";
const getCachePageIndicator = () => {
  let val = localStorage.getItem("pageIndicator");
  return val;
};
const getCacheMenuCollapse = () => {
  let val = localStorage.getItem("menuCollapse");
  console.log("menuCollapse", val);
  return val;
};
const getCachePageKeepAlive = () => {
  let val = localStorage.getItem("getCachePageKeepAlive");
  console.log("getCachePageKeepAlive", val);
  return val;
};

export default {
  namespaced: true,
  state: () => ({
    //平台名称
    appName: "Vue3-Element+管理系统",
    //平台logo
    appLogo: logo,
    //端标识（移动端"mobile"/ 桌面端"desktop"）
    device: "desktop",
    //页面指示器（"面包屑"/"标签切换"）
    pageIndicator: getCachePageIndicator() || "面包屑",
    //菜单折叠
    menuCollapse: getCacheMenuCollapse() || 0,
    //页面缓存
    pageKeepAlive: getCachePageKeepAlive() || 0,
    //客户端窗口尺寸宽高（resize动态赋值）
    windowRect: {
      clientHeight: getClientRect().clientHeight,
      clientWidth: getClientRect().clientWidth,
    },
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

    SET_PAGE_KEEP_ALIVE(state, val = 0) {
      state.pageKeepAlive = val;
      localStorage.setItem("pageKeepAlive", state.pageKeepAlive);
    },

    SET_WINDOW_RECT(state, val) {
      state.windowRect = {
        clientHeight: val.clientHeight || 0,
        clientWidth: val.clientWidth || 0,
      };
    },
  },

  //用于异步操作state
  actions: {},
};
