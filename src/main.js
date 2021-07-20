import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
import locale from "element-plus/lib/locale/lang/zh-cn";
import App from "./App.vue";
import router from "@/router";
import "reset-css";
import store from "@/store";
import "./mock/index";
import "./styles/elementui-variables.scss";
import { traverseTree } from "@/utils/utils";

const menu = [
  {
    id: "0",
    name: "首页",
    icon: "el-icon-s-home",
    type: "page",
    url: "/home",
    children: null,
    fullPath: ["首页"],
  },
  {
    id: "1",
    name: "系统管理",
    icon: "el-icon-setting",
    url: "/system",
    fullPath: ["系统管理"],
    type: "group",
    children: [
      {
        id: "1-1",
        name: "用户管理",
        icon: "",
        type: "page",
        url: "/system/user-management",
        children: null,
        fullPath: ["系统管理", "用户管理"],
      },
      {
        id: "1-2",
        name: "角色管理",
        icon: "",
        type: "page",
        url: "/system/role-management",
        children: null,
        fullPath: ["系统管理", "角色管理"],
      },
    ],
  },
];

traverseTree(menu, node => {
  console.log("node", node);
});

//全局注册Nprogress加载指示器
import NProgress from "nprogress";
import "nprogress/nprogress.css";
NProgress.configure({ showSpinner: false, easing: "ease", speed: 500 });

const app = createApp(App);
console.warn("环境", import.meta.env);

// 开发环境开启devtool
if (import.meta.env.MODE === "development") {
  app.config.devtools = true;
}

app.config.errorHandler = (err, vm, info) => {
  console.error("Vue错误：", err, vm, info);
};

app.config.warnHandler = function (msg, vm, trace) {
  console.warn("Vue警告：", msg, vm, trace);
};
app.config.performance = true;

//全局注册组件
import AdminLayout from "@/layouts/AdminLayout.vue";
app.component("AdminLayout", AdminLayout);

import AppTagsViewSwitcher from "@/layouts/TagsViewSwitcher/index.vue";
app.component("AppTagsViewSwitcher", AppTagsViewSwitcher);

import AppSideBar from "@/layouts/AppSideBar/index.vue";
app.component("AppSideBar", AppSideBar);

import AppBreadcrumb from "@/layouts/Breadcrumb/index.vue";
app.component("AppBreadcrumb", AppBreadcrumb);

import AppHeader from "@/layouts/AppHeader/index.vue";
app.component("AppHeader", AppHeader);

import Space from "@/components/Space/index.vue";
app.component("Space", Space);

app.use(ElementPlus, { locale });
app.use(router);
app.use(store);
app.mount("#app");
