<br>
<br>
<div align=center>
<img src="https://github.com/FEZIRO/vue3-vite-elementplus-admin/blob/master/preview/logo.png?raw=true" style="height:100px">
</div>


## <p align=center>vue3-vite-elementplus-admin<br>管理系统快速开发模板</p>
<br>
​ 基于Vue3.0前端开发框架和 ElementPlus UI框架，并使用由Vue 作者尤雨溪的前端工程化工具Vite进行构建。与Webpack相比，Vite极大的缩短了开发打包和热更新的效率。<br>此模板可用于现代化管理系统的初始开发模板，可节省一些重复性的工程初始化搭建工作。
<br>

## 特性

- 包含简易的登录注册页、首页、404 提示页、用户管理页、角色权限页。
- 封装好的经典管理端布局（包含头部组件、侧边栏菜单组件、面包屑组件、标签切换器组件）。
- 默认使用`axios`请求数据和`mockjs`来模拟数据。
- 封装的公共组件：倒计时按钮组件。
- 使用`nprogress`插件来作为单页面切换的加载指示器。
- 使用`VueRouter`动态生成不同角色菜单的路由权限。
- 基本的兼容性提醒，由于vite和vue3不兼容IE浏览器，因此如检测为IE浏览器则提醒用户切换使用其他浏览器。
- 界面设计简约，可根据自己的实际开发情况增加删除工具库或修改源码。
  <br>

## 预览
  + github地址
    > https://github.com/FEZIRO/vue3-vite-elementplus-admin

  + 在线预览（账号admin，密码admin） 
    > https://feziro.github.io/vue3-vite-elementplus-admin/
    
    
  
  <div align=center>
    <img style="margin-top:20px 0;width:100%;height:auto" src="https://github.com/FEZIRO/vue3-vite-elementplus-admin/blob/master/preview/%E7%99%BB%E5%BD%95.png?raw=true" alt="登录"/>
  <p style="text-align:center">登录</p>
  </div>
  <div align=center>
    <img style="margin-top:20px 0;width:100%;height:auto" src="https://github.com/FEZIRO/vue3-vite-elementplus-admin/blob/master/preview/%E6%B3%A8%E5%86%8C.png?raw=true" alt="注册"/>
   <p style="text-align:center">注册</p>
  </div>
  <div align=center>
    <img style="margin-top:20px 0;width:100%;height:auto" src="https://github.com/FEZIRO/vue3-vite-elementplus-admin/blob/master/preview/%E9%A6%96%E9%A1%B5.png?raw=true" alt="首页"/>
  <p style="text-align:center">首页</p>
  </div>
  <div align=center>
   <img style="margin-top:20px 0;width:100%;height:auto" src="https://github.com/FEZIRO/vue3-vite-elementplus-admin/blob/master/preview/%E7%94%A8%E6%88%B7%E7%AE%A1%E7%90%86.png?raw=true" alt="用户管理"/>
  <p style="text-align:center">用户管理</p>
  </div>
  
  <div align=center>
    <img style="margin:0 auto;margin-top:20px 0;width:auto;height:100%" src="https://github.com/FEZIRO/vue3-vite-elementplus-admin/blob/master/preview/%E7%A7%BB%E5%8A%A8%E7%AB%AF%E7%95%8C%E9%9D%A21.png?raw=true" alt="移动端界面"/>
    <p style="text-align:center">移动端界面</p>
  </div>
  
  <div align=center>
    <img style="margin:0 auto;margin-top:20px 0;width:auto;height:100%" src="https://github.com/FEZIRO/vue3-vite-elementplus-admin/blob/master/preview/%E7%A7%BB%E5%8A%A8%E7%AB%AF%E8%8F%9C%E5%8D%95.png?raw=true" alt="移动端菜单"/>
    <p style="text-align:center">移动端菜单</p>
  </div>
  <br>
  
## 使用库/工具

- [Vue 3](https://v3.cn.vuejs.org/)
- [VueRouter 4.x](https://next.router.vuejs.org/zh/)（有兼容`vue3`语法的`hook`写法）
- [Vuex 4.x](https://next.vuex.vuejs.org/zh/index.html) （有兼容`vue3`语法的`hook`写法）
- [Vite 2.x](https://cn.vitejs.dev/)
- [ElementUI Plus](https://element-plus.org/#/zh-CN/component/space)（整个库采用`vue3`语法编写）
- [dayjs](https://github.com/iamkun/dayjs)（一个轻便的时间处理库）
- [axios](http://www.axios-js.com/) （好用的 http 请求库）
- [mockjs](http://mockjs.com/) （模拟请求）
- [reset-css](https://www.npmjs.com/package/reset-css) （重置浏览器默认样式）
- [nprogress](https://ricostacruz.com/nprogress/) （顶部加载指示器）
- vite-plugin-compression（打包压缩 gzip 插件）
- @rollup/plugin-strip （打包去除调试语句插件）
- visualizer （打包文件大小占比分析可视化插件）
  <br><br>

## 模板主要结构

#### vite-vue3-elementplus-admin

├─ `public`（public 文件夹）  
│ └─ `favicon.ico` 浏览器标签前缀图标  
│  
├─ `src`（根目录 src-文件夹）  
│ ├─ `assets`（资源-文件夹）  
│ │ └─ `images`（图片-文件夹）  
│ │ ├─ `arrow-down.svg`  
│ │ ├─ `arrow-up.svg`  
│ │ ├─ `empty-tips.svg `  
│ │ ├─ `home.svg`  
│ │ ├─ `login.svg`  
│ │ ├─ `logo.png`  
│ │ └─ `office-desk.svg`  
│ │  
│ ├─ `components`（全局公共-文件夹）  
│ │ ├─ `CountDownBtn` （倒计时按钮组件）  
│ │ │ └─ `index.vue`  
│ │  
│ ├─ `hooks`（自定义 hooks-文件夹）  
│ │ ├─ `useTableData.js`  
│ │ └─ `useWindowRect.js`  
│ │  
│ ├─ `http`（http 请求-文件夹）  
│ │ ├─ `apis`（api 管理-文件夹）  
│ │ │ ├─ `role-management.js`  
│ │ │ ├─ `user-management.js`  
│ │ │ └─ `user.js`  
│ │ ├─ `axios.js` （axios 配置文件）  
│ │ └─ `index.js` （http 请求主入口文件）  
│ │  
│ ├─ `layouts` （布局文件夹）  
│ │ ├─ `AppHeader`（头部组件-文件夹）  
│ │ │ └─ `index.vue`  
│ │ ├─ `MobileAppHeader`（移动端头部组件-文件夹）  
│ │ │ └─ `index.vue`  
│ │ ├─ `AppSideBar`（侧边栏菜单组件-文件夹）  
│ │ │ ├─ `index.vue`  
│ │ ├─ `MobileAppSideBar`（移动端侧边栏菜单组件-文件夹）  
│ │ │ ├─ `index.vue`  
│ │ │ └─ `MenuItem.vue`  
│ │ ├─ `Breadcrumb`（面包屑组件-文件夹）  
│ │ │ └─ `index.vue`  
│ │ ├─`TagsViewSwitcher`（标签切换组件-文件夹）  
│ │ │ └─ `index.vue`  
│ │ └─ `AdminLayout.vue` (管理端页面布局组件)  
│ │  
│ ├─ `mock`（mock 模拟数据-文件夹）  
│ │ ├─ `apiController`（controller-文件夹）  
│ │ │ ├─ `role-management.js`  
│ │ │ ├─ `user-management.js`  
│ │ │ └─ `user.js`  
│ │ ├─ `index.js` (mock 主入口文件)  
│ │ └─ `mock.js` (mock 配置文件)  
│ │  
│ ├─ `pages`  
│ │ ├─ `404`（404 页面-文件夹）  
│ │ │ └─ `index.vue`  
│ │ ├─ `home`（首页-文件夹）  
│ │ │ └─ `index.vue `  
│ │ ├─ `login` （登录注册页面-文件夹）  
│ │ │ └─ `index.vue`  
│ │ ├─ `role-management`（角色管理页-文件夹）  
│ │ │ ├─ `components`（页面子组件-文件夹）  
│ │ │ │ └─ `RoleEdit.vue`  
│ │ │ └─ `index.vue`  
│ │ └─` user-management`（用户管理页-文件夹）  
│ │ ├─ `components` （页面子组件-文件夹）  
│ │ │ └─ `UserEdit.vue`  
│ │ └─ `index.vue`  
│ │
│ ├─ `router`（路由文件夹）  
│ │ └─ `index.js` vueRouter 主入口  
│ │  
│ ├─ `store`（文件夹）  
│ │ ├─ `modules`（store 模块文件夹）  
│ │ │ ├─ `app.js` (app 配置模块)  
│ │ │ ├─ `options.js` (全局下拉值选项模块)  
│ │ │ └─ `tags-view.js` (页面标签切换模块)  
│ │ └─ `index.js` (store 主入口)  
│ │  
│ ├─ `styles`（全局样式-文件夹）  
│ │ ├─ `animation.scss`（css 动画样式表)<br>
│ │ ├─ `color.scss`（颜色变量样式表)<br>
│ │ ├─ `custom-default-browser-style.scss` (自定义浏览器默认样式表)<br>
│ │ ├─ `elementui-variables.scss`（自定义 elementui 默认主题和样式表)<br>
│ │ ├─ `global.scss`（全局样式表)  
│ │ └─ `mixin.scss`（scss 的 mixin 样式表)  
│ │
│ ├─ `others`（其他-文件夹）  
│ │ ├─ `utils.js` （工具函数文件）  
│ │ ├─ `options.js` （下拉值文件）  
│ │ └─ `validator.js` （值校验函数文件）  
│ │
│ ├─ `App.vue` （项目主组件）  
│ └─ `main.js` （项目主入口）  
│  
├─ `index.html ` （页面挂载文件）  
├─ `package.json` （npm 配置文件)  
├─ `README.md` （项目文档）  
└─ `vite.config.js` （vite 配置文件）  
<br>

## 关键点介绍

- ##### 自定义 ElementUI 组件样式
  （修改主题方法可能会随着element版本而变化，此方法适用于当前Element版本）
  ​ 本模板已修改 elementUI 的默认主题色和部分表单组件样式，详细请参考`style`文件夹下的`elementui-variables.scss`样式文件。。
  <br>
  ```
  //修改 $--color-primary 变量可更换element主题色
  $--color-primary: #80cbc4;
  ```
  <div align=center>
    <img style="margin-top:20px 0;width:100%;height:auto" src="https://github.com/FEZIRO/vue3-vite-elementplus-admin/blob/master/preview/%E6%9B%B4%E6%8D%A2%E4%B8%BB%E9%A2%98%E8%89%B21.png?raw=true" alt="主题色1"/>
    <p style="text-align:center">主题色1</p>
  </div>
  <div align=center>
    <img style="margin-top:20px 0;width:100%;height:auto" src="https://github.com/FEZIRO/vue3-vite-elementplus-admin/blob/master/preview/%E7%99%BB%E5%BD%95.png?raw=true" alt="主题色2"/>
    <p style="text-align:center">主题色2</p>
  </div><br>

- ##### 自定义 ElementUI 语言
  （修改语言方法可能会随着element版本而变化，此方法适用于当前Element版本）
  ```
  // main.js
  import locale from "element-plus/lib/locale/lang/zh-cn";
  app.use(ElementPlus, { locale });
  ```
  <br>
- ##### 重置浏览器默认样式

  ​ 请参考`style`文件夹下的`custom-default-browser-style.scss`文件，本文件修改浏览器默认滚动条样式。
  ​ 更多的浏览器样式重置则使用了 npm 插件`reset-css`，在项目主入口文件`main.js`中引入。
  <br><br>

- ##### useTableData

  ​ 自定义 hook，用于封装表格查询的可复用逻辑和操作，在需要表格查询操作的页面或组件中引入即可。详细请查看`hooks`文件夹下的`useTableData.js`文件。

  ```
  //使用举例
  import useTableData from "@/hooks/useTableData.js";

  //传入以Promise封装的http请求api
  const table = useTableData(fetchTableDataApi);

  //设置参数，发起请求
  table.setParams({
    keyword: keyword,
    ...
  });

  //重置请求
  table.reset();

  //刷新请求
  table.refresh()

  //表格请求参数（默认字段 currentPage，pageSize ）
  console.log(table.tableParams);

  //表格分页器分页组配置（默认值 [20, 50, 100] ）
  console.log(table.PAGE_SIZES);

  //表格数据（默认字段 list，totalCount，isLoading ）
  console.log(table.tableData);
  ```

- ##### useWindowSize 与动态表格高度

  ​ 当固定表头时需要限制 elementUI 表格高度，数据则会表现为溢出滚动，如页面缩放的时候需要占满屏幕，则可监测浏览器高度`clientHeight`动态赋值表格高度，以达到缩放浏览器窗口表格大小不变的效果。
  ​ `useWindowRect`封装了监听浏览器宽高的可复用逻辑，此 hook 将动态的`clientHeight`和`clientWidth`值设置存储到 vuex 的`store/modules/app.js`文件内的`windowRect`字段，因此每个页面可引入动态的宽高值来设置表格高度。
  <br><br>
- ##### 菜单权限和动态路由
  ​如管理系统的权限是根据菜单管理页面和权限配置页面来设置的并且通过后端返回菜单区分账号权限，则前端可在登录时根据返回的菜单渲染侧边栏菜单和使用`VueRouter`的`router.addRoute`API 来动态添加路由。
  动态添加路由会在浏览器刷新时丢失，可把菜单用`localStorage`缓存，每次刷新浏览器都动态添加一次路由即可解决。
  退出登录时需要清除动态添加的路由，可使用 resetRouter 进行重置路由。
  ```
  function resetRouter() {
    const newRouter = createRouter({
      routes: constantRoute,
      history: createWebHashHistory(),
    });
    router.matcher = newRouter.matcher;
  }
  ```
  <br>
- ##### 菜单检索

  根据后端返回的菜单结构的页面名称进行递归检索。

   <div align=center>
    <img style="margin-top:20px 0;width:100%;height:auto" src="https://github.com/FEZIRO/vue3-vite-elementplus-admin/blob/master/preview/%E6%90%9C%E7%B4%A2.png?raw=true" alt="检索菜单"/>
    <p style="text-align:center">检索菜单</p>
  </div>
  <br>
- ##### 面包屑

  最简单的处理方式就是根据后端返回的菜单设置个`breadcrumb`数组字段处理即可，如有其它需求可根据实际数据情况而定。

  ```
  {
    id: "1",
    name: "系统管理",
    icon: "el-icon-setting",
    url: "/system",
    breadcrumb: ["系统管理"],
    type: "group",
    children: [{
      id: "1-1",
      name: "用户管理",
      icon: "",
      type: "page",
      url: "/system/user-management",
      children: null,
      breadcrumb: ["系统管理", "用户管理"],
    }]
  }
  ```

  <div align=center>
    <img style="margin-top:20px 0;width:100%;height:auto" src="https://github.com/FEZIRO/vue3-vite-elementplus-admin/blob/master/preview/%E9%9D%A2%E5%8C%85%E5%B1%91.png?raw=true" alt="面包屑"/>
    <p style="text-align:center">面包屑</p>
  </div>
  <br>
- ##### 移动端适配

  使用 CSS 媒体查询、Javascript的`clientWidth`客户端宽度检测来区分移动端或桌面端。管理端类型界面不建议在小屏设备进行操作。
  <br>全局设备类型字段（`/store/modules/app`中的`device`字段）：

  - desktop：大于 750px（大屏设备）
  - mobile：小于 750px（小屏设备）

  如有更多断点检测需求可自行在`app.vue`中设置。
  <br><br>
- ##### 系统设置
  可配置化或用户自行选择。
    <br>
  - 页面指示：
    可选`标签切换`/`面包屑`
    <br>
  - 页面状态缓存： 
    当页面指示为`标签切换`时可选页面切换时是否缓存页面状态，使用`<keep-alive>`组件缓存。
    <br>
  - 菜单栏折叠。

  <br>
  <div align=center>
    <img style="margin-top:20px 0;width:100%;height:auto" src="https://github.com/FEZIRO/vue3-vite-elementplus-admin/blob/master/preview/%E8%AE%BE%E7%BD%AE.png?raw=true" alt="系统设置"/>
    <p style="text-align:center">系统设置</p>
  </div>
  <br>
- ##### 右键自定义菜单与Teleport
  当指示器为`标签切换`时，标签切换栏区域点击右键出现自定义菜单，可删除全部已打开的标签；
  自定义右键菜单采用Vue3新特性`teleport`的方式加载到`body`元素里面，防止父元素定位干扰。

  ```
  右键自定义菜单
  <teleport to="body">
    <div class="context-menu" >
      xxx
    </div>
  </teleport>
  ```
  
  <div align=center>
    <img style="margin-top:20px 0;width:100%;height:auto" src="https://github.com/FEZIRO/vue3-vite-elementplus-admin/blob/master/preview/%E5%8F%B3%E9%94%AE%E8%8F%9C%E5%8D%95.png?raw=true" alt="系统设置"/>
    <p style="text-align:center">系统设置</p>
  </div>
  <br>

- ##### http请求与axios全局请求配置
  全局请求配置文件在`/src/http/axios.js`下配置；请求接口按页面模块进行分类，页面名称对应api接口文件名称，存放在`/src/http/apis/`文件夹下，再通过`/src/http/index.js`文件进行统一导出。
  ```
  // http接口请求使用
  import http from "@/http";
  http.[页面模块名称].xxx()

  如 http.roleManagement.tableList()
  ```
  <br>

- ##### Mockjs模拟数据
  所有数据均来自本地mock模拟数据，位于`/src/mock`文件夹下。
  `/src/mock/mock.js`为mock全局配置<br>
  `/src/mock/apiController`文件夹为所有模拟接口请求处理<br>
  <br>
  在`/src/main.js`下引入mock文件即可使用接口，如`import "./mock/index";`
  <br><br>
- ##### 环境切换
  根据项目的根目录下的`.env.xxx.`文件区分环境，以`VITE_`开头的字段可在`import.meta.env`中获取。如有更多需求可自行添加。
  + `.env.development`开发环境
  + `.env.production`正式环境
  <br><br>
- ##### Vite基本命令
  ```
  // package.json
  "scripts": {
    "dev": "vite",  //开启热更新服务器
    "build": "vite build", //打包项目
    "preview/dist": "vite preview" //本地预览打包的项目
  }
  ```
  <br>
- ##### Vite基本配置
  ```
  // vite.config.js配置文件

  import vue from "@vitejs/plugin-vue";
  import { visualizer } from "rollup-plugin-visualizer";
  import strip from "@rollup/plugin-strip";
  import viteCompression from "vite-plugin-compression";
  const path = require("path");

  export default {
    base: './',
    plugins: [
      vue(),
      //正式环境打包查看各文件大小占比
      visualizer({
        open: true,
        gzipSize: true,
        brotliSize: true,
      }),
      //正式环境打包去除调试语句
      {
        ...strip({
          include: ["**/*.js", "**/*.vue", "**/*.ts", "**/*.jsx"],
        }),
        apply: "build",
      },
      //打包开启gzip压缩
      viteCompression(),
    ],
    resolve: {
      alias: {
        // 键必须以斜线开始和结束
        "@": path.resolve(__dirname, "./src"),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          //添加scss全局变量样式
          additionalData: "@import './src/styles/global.scss';",
        },
      },
    },
    server: {
      // 配置调试服务器主机名，如果允许外部访问，可设置为"0.0.0.0"
      host: "0.0.0.0",
      port: 3000, // 服务器端口号
      open: true, // 是否自动打开浏览器
    },
  };
  ```
  <br>
## 注意

- Vite 工具打包不兼容任何版本的 IE 浏览器（和 Webpack 打包机制不同）。
- Vue 3 不兼容IE浏览器。
- ElementPlus当前处于beta测试版，当更新到最新版本时某些设置可能会不正确，一切以Element官方文档为准！
<br>
<br>
<p align=center>By FEZIRO </p>
