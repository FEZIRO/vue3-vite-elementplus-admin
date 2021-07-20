<br>
<br>
<center><img src="../vite-vue3-elementplus-admin/src/assets/images/logo.png" style="height:100px;"></center>

## <center>vue3-vite-elementplus-admin<br>管理系统快速开发模板</center>
<br>
<br>

基于`Vue3.0`前端开发框架和`ElementPlus`UI框架，并使用了最前沿，最具潜力的同时也是Vue作者尤雨溪所创造的前端工程化工具 `Vite`，与`Webpack`相比，极大的缩短了开发打包和热更新的效率。

> <br>可用于现代化管理系统的初始开发模板，可节省一些重复性的工程初始化搭建工作。
<br>



## 特性
+ 包含简易的登录注册页、首页、404提示页、用户管理页、角色权限页。
+ 封装好的经典管理端布局（包含头部组件、侧边栏菜单组件、面包屑组件/标签切换器组件）。
+ 默认使用`axios`请求数据和`mockjs`来模拟数据。
+ 封装的公共组件：倒计时按钮组件、`Space`间隔组件。
+ 使用`nprogress`插件来作为单页面切换的加载指示器。
+ 使用`VueRouter`动态生成不同角色菜单的路由权限。
+ 基本的兼容性提醒，如果检测到是IE浏览器则提醒用户切换使用其他浏览器。
+ 简约轻便，不会注入太多其他东西，可根据自己的实际开发情况增加删除工具/库。
<br>


## 使用库/工具
+ Vue 3
+ VueRouter 4（有兼容`vue3`语法的`hook`写法）
+ Vuex 4 （有兼容`vue3`语法的`hook`写法）
+ Vite 2.4 
+ ElementUI Plus（整个库采用`vue3`语法编写）
+ axios （好用的http请求库）
+ mockjs （模拟请求）
+ reset-css （重置浏览器默认样式）
+ nprogress （加载指示器）
+ vite-plugin-compression（打包压缩gzip插件）
+ @rollup/plugin-strip （打包去除调试语句插件）
+ visualizer （打包文件大小占比分析可视化插件）
<br>


## 模板结构

vite-vue3-elementplus-admin    
├─ public                           
│  └─ favicon.ico                   
├─ src                              
│  ├─ assets                        
│  │  └─ images                     
│  │     ├─ arrow-down.svg          
│  │     ├─ arrow-up.svg            
│  │     ├─ empty-tips.svg          
│  │     ├─ home.svg                
│  │     ├─ login.svg               
│  │     ├─ logo.png                
│  │     └─ office-desk.svg         
│  ├─ components                    
│  │  ├─ CountDownBtn               
│  │  │  └─ index.vue               
│  │  └─ Space                      
│  │     └─ index.vue               
│  ├─ hooks                         
│  │  ├─ useTableData.js            
│  │  └─ useWindowRect.js           
│  ├─ http                          
│  │  ├─ apis                       
│  │  │  ├─ role-management.js      
│  │  │  ├─ user-management.js      
│  │  │  └─ user.js                 
│  │  ├─ axios.js                   
│  │  └─ index.js                   
│  ├─ layouts                       
│  │  ├─ AppHeader                  
│  │  │  └─ index.vue               
│  │  ├─ AppSideBar                 
│  │  │  ├─ index.vue               
│  │  │  └─ MenuItem.vue            
│  │  ├─ Breadcrumb                 
│  │  │  └─ index.vue               
│  │  ├─ TagsViewSwitcher           
│  │  │  └─ index.vue               
│  │  └─ AdminLayout.vue            
│  ├─ mock                          
│  │  ├─ apiController              
│  │  │  ├─ role-management.js      
│  │  │  ├─ user-management.js      
│  │  │  └─ user.js                 
│  │  ├─ index.js                   
│  │  └─ mock.js                    
│  ├─ pages                         
│  │  ├─ 404                        
│  │  │  └─ index.vue               
│  │  ├─ home                       
│  │  │  └─ index.vue               
│  │  ├─ login                      
│  │  │  └─ index.vue               
│  │  ├─ role-management            
│  │  │  ├─ components              
│  │  │  │  └─ RoleEdit.vue         
│  │  │  └─ index.vue               
│  │  └─ user-management            
│  │     ├─ components              
│  │     │  └─ UserEdit.vue         
│  │     └─ index.vue               
│  ├─ router                        
│  │  └─ index.js                   
│  ├─ store                         
│  │  ├─ modules                    
│  │  │  ├─ app.js                  
│  │  │  ├─ options.js              
│  │  │  └─ tags-view.js            
│  │  └─ index.js                   
│  ├─ styles                        
│  │  ├─ animation.scss             
│  │  ├─ color.scss                 
│  │  ├─ custom-default-style.scss  
│  │  ├─ elementui-variables.scss   
│  │  ├─ global.scss                
│  │  └─ mixin.scss                 
│  ├─ utils                         
│  │  ├─ utils.js                   
│  │  └─ validator.js               
│  ├─ App.vue                       
│  └─ main.js                       
├─ index.html                       
├─ package-lock.json                
├─ package.json                     
├─ README.md                        
├─ stats.html                       
└─ vite.config.js                   
<br>

## 关键点介绍
+ 自定义ElementUI组件样式
+ 重置浏览器默认样式
+ useTable
+ useWindowsRect
<br>

## 劣势
+ Vite打包不兼容任何版本的IE浏览器
+ 目前不支持小屏幕移动端（表格操作不适合小屏幕操作）
<br>


<center> Code By FEZIRO </center>

