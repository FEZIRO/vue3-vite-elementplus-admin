import { createRouter, createWebHashHistory } from "vue-router";
import NProgress from "nprogress";

//路径映射页面组件
const pageUrlMap = {
  "/home": () => import("@/pages/home/index.vue"),
  "/system/user-management": () => import("@/pages/user-management/index.vue"),
  "/system/role-management": () => import("@/pages/role-management/index.vue"),
};

//静态路由
const constantRoute = [
  {
    name: "登录",
    path: "/login",
    component: () => import("@/pages/login/index.vue"),
    meta: {
      title: "登录",
      auth: false,
      tagsView: false,
      tagsViewAffix: false,
    },
  },
  {
    name: "404",
    path: "/404",
    component: () => import("@/pages/404/index.vue"),
    meta: {
      title: "404页面未找到",
      auth: false,
      tagsView: false,
      tagsViewAffix: false,
    },
  },
  {
    path: "/:patchAll(\\S+)",
    redirect: "/404",
  },
];

const router = createRouter({
  routes: constantRoute,
  history: createWebHashHistory(),
});

//路由拦截
router.beforeEach((to, from, next) => {
  NProgress.start();
  if (to.meta && to.meta.title) {
    document.title = to.meta.title;
  }
  let userInfo = localStorage.getItem("userInfo") || null;
  if (to.fullPath == "/") {
    if (!userInfo) {
      router.replace("/login");
      return;
    }
  }
  if (to.meta.auth) {
    if (!userInfo) {
      router.push({ path: "/login" });
    } else {
      next();
    }
  } else {
    next();
  }
});

router.afterEach(() => {
  NProgress.done();
});

//动态路由
export function createRoute(menu) {
  if (!menu || menu.length == 0) return;
  for (let i = 0; i < menu.length; i++) {
    let menuItem = menu[i];
    if (menuItem.type === "group") {
      createRoute(menuItem.children);
    } else {
      router.addRoute({
        name: menuItem.name,
        path: menuItem.url || "",
        component: menuItem.url ? pageUrlMap[menuItem.url] : "",
        meta: {
          title: menuItem.name || "",
          auth: true,
          layout: menuItem.layout || "admin",
          tagsView: menuItem.tagsView || true,
          tagsViewAffix: menuItem.tagsViewAffix || false,
          breadcrumb: menuItem.fullPath || [],
        },
      });
    }
  }
  router.addRoute({
    path: "/",
    redirect: "/home",
  });
}
//刷新时浏览器路由不丢失
let menu = localStorage.getItem("menu");
menu && createRoute(JSON.parse(menu));

//重置路由(用于退出登录时重置路由)
export function resetRouter() {
  const newRouter = createRouter({
    routes: constantRoute,
    history: createWebHashHistory(),
  });
  router.matcher = newRouter.matcher;
}

export default router;
