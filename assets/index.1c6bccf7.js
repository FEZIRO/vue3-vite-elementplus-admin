var e=Object.defineProperty,a=Object.getOwnPropertySymbols,l=Object.prototype.hasOwnProperty,t=Object.prototype.propertyIsEnumerable,o=(a,l,t)=>l in a?e(a,l,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[l]=t;import{r as n,b as i,e as r,f as d,h as s,g as m,m as c,A as p,u,w as f,o as b,v as g,c as h,C,D as y,E as k,G as w,J as v,z}from"./vendor.9437a1ef.js";import{h as _}from"./index.ffebf55c.js";import{u as T}from"./useTableData.0549bc09.js";import"./index.ed4dbe6b.js";const M={name:"RoleTableEdit",emits:["confirm"],setup(e,i){const r=n({type:"",title:"",visible:!1,confirmBtnLoading:!1}),d=n({form:{name:"",remark:"",permission:""}}),s=()=>{r.visible=!1,d.form={name:"",remark:"",permission:""}};return{modalConfig:r,data:d,menuTree:[{id:2,label:"系统管理",children:[{id:5,label:"用户管理"},{id:6,label:"角色管理"}]},{id:3,label:"数据统计"}],menuTreeDefaultProps:{children:"children",label:"label"},hideModal:s,showModal:(e={type:"add",title:"",data:{}})=>{r.type=e.type,r.visible=!0,"add"===e.type&&(r.title="添加"),"edit"===e.type&&(r.title="编辑"),r.title=e.title||"",e.data&&(d.form=((e,n)=>{for(var i in n||(n={}))l.call(n,i)&&o(e,i,n[i]);if(a)for(var i of a(n))t.call(n,i)&&o(e,i,n[i]);return e})({},e.data))},onModalConfirmClick:()=>{s(),i.emit("confirm")},onModalCloseClick:()=>{s()}}}},S={key:0,class:"edit-page"},P={class:"confirm-btn-group"},x=p("关闭"),E=p("保存");M.render=function(e,a,l,t,o,n){const p=i("el-page-header"),u=i("el-input"),f=i("el-form-item"),b=i("el-col"),g=i("el-tree"),h=i("el-button"),C=i("el-row"),y=i("el-form");return t.modalConfig.visible?(r(),d("div",S,[s(p,{onBack:t.onModalCloseClick,content:"添加角色"},null,8,["onBack"]),s(y,{size:"medium",model:t.data.form,"label-position":"top",style:{width:"50%",margin:"0 auto","margin-top":"20px"}},{default:m((()=>[s(C,{gutter:20},{default:m((()=>[s(b,{span:24},{default:m((()=>[s(f,{label:"角色名称："},{default:m((()=>[s(u,{size:"medium",modelValue:t.data.form.name,"onUpdate:modelValue":a[1]||(a[1]=e=>t.data.form.name=e),placeholder:"请输入",clearable:"",style:{width:"100%"}},null,8,["modelValue"])])),_:1})])),_:1}),s(b,{span:24},{default:m((()=>[s(f,{label:"备注："},{default:m((()=>[s(u,{type:"textarea",size:"medium",modelValue:t.data.form.reamrk,"onUpdate:modelValue":a[2]||(a[2]=e=>t.data.form.reamrk=e),placeholder:"请输入",clearable:"",style:{width:"100%"}},null,8,["modelValue"])])),_:1})])),_:1}),s(b,{span:24},{default:m((()=>[s(f,{label:"页面权限："},{default:m((()=>[s(g,{data:t.menuTree,"show-checkbox":"","node-key":"id",props:t.menuTreeDefaultProps},null,8,["data","props"])])),_:1})])),_:1}),s(b,{span:24},{default:m((()=>[s("div",P,[s(h,{size:"medium",type:"danger",onClick:t.onModalCloseClick},{default:m((()=>[x])),_:1},8,["onClick"]),s(h,{size:"medium",type:"primary",onClick:t.onModalConfirmClick},{default:m((()=>[E])),_:1},8,["onClick"])])])),_:1})])),_:1})])),_:1},8,["model"])])):c("",!0)};const D={name:"role-management",components:{RoleEdit:M},setup(){const e=T(_.roleManagement.list),a=u();let l=n({keyword:""});f((()=>l.keyword),(()=>{e.setParams({keyword:l.keyword})}));b((()=>{e.setParams({keyword:l.keyword})}));const t=g([]),o=g(null);return{roleManagementTable:e,filterForm:l,tableSelection:t,roleEdit:o,onTableAddClick:()=>{o.value.showModal({type:"add",title:"添加"})},onTableEditClick:e=>{o.value.showModal({type:"edit",title:"添加",data:{id:e.id,name:e.roleName,remark:e.remark}})},onTableDeleteClick:()=>{},onTableSelectionChange:e=>{t.value=e},onSizeChange:a=>{e.setParams({pageSize:a})},onCurrentChange:a=>{e.setParams({currentPage:a})},windowRect:h((()=>a.state.app.windowRect)),device:h((()=>a.state.app.device))}}},V=z();C("data-v-6275459d");const j={class:"role-management-page","element-loading-text":"拼命加载中"},O=p("添加"),R=p("删除"),A=p("编辑"),B={class:"table-pager"};y();const F=V(((e,a,l,t,o,n)=>{const m=i("el-input"),c=i("el-button"),p=i("el-space"),u=i("el-table-column"),f=i("el-empty"),b=i("el-table"),g=i("el-pagination"),h=i("RoleEdit"),C=k("loading");return w((r(),d("div",j,[s(p,{wrap:"",style:{width:"100%"}},{default:V((()=>[s(m,{modelValue:t.filterForm.keyword,"onUpdate:modelValue":a[1]||(a[1]=e=>t.filterForm.keyword=e),class:"search-input","prefix-icon":"el-icon-search",size:"small",placeholder:"角色名称"},null,8,["modelValue"]),s(c,{type:"primary",size:"small",icon:"el-icon-circle-plus-outline",onClick:t.onTableAddClick},{default:V((()=>[O])),_:1},8,["onClick"]),s(c,{type:"danger",size:"small",icon:"el-icon-delete",disabled:0==t.tableSelection.length,onClick:t.onTableDeleteClick},{default:V((()=>[R])),_:1},8,["disabled","onClick"])])),_:1}),s(b,{data:t.roleManagementTable.tableData.list,"tooltip-effect":"dark",height:t.windowRect.clientHeight-250,"row-style":{height:"65px"},onSelectionChange:t.onTableSelectionChange},{empty:V((()=>[s(f,{description:"暂无数据"})])),default:V((()=>[s(u,{type:"selection",width:"50","show-overflow-tooltip":"","header-align":"center",align:"center"}),s(u,{prop:"roleName",label:"角色名称","min-width":"120","show-overflow-tooltip":""}),s(u,{prop:"remark",label:"备注","show-overflow-tooltip":""}),s(u,{label:"操作","show-overflow-tooltip":"","min-width":"95",fixed:"right"},{default:V((e=>[s(c,{type:"warning",plain:"",size:"small",onClick:a=>t.onTableEditClick(e.row)},{default:V((()=>[A])),_:2},1032,["onClick"])])),_:1})])),_:1},8,["data","height","onSelectionChange"]),s("div",B,[s(g,{onSizeChange:t.onSizeChange,onCurrentChange:t.onCurrentChange,"page-size":t.roleManagementTable.tableParams.pageSize,"page-sizes":t.roleManagementTable.PAGE_SIZES,layout:"total,prev,pager,next,"+("mobile"===t.device?"":"sizes"),total:t.roleManagementTable.tableData.totalCount,small:"mobile"===t.device},null,8,["onSizeChange","onCurrentChange","page-size","page-sizes","layout","total","small"])]),s(v,{name:"fade"},{default:V((()=>[s(h,{ref:"roleEdit"},null,512)])),_:1})],512)),[[C,t.roleManagementTable.tableData.isPageLoading]])}));D.render=F,D.__scopeId="data-v-6275459d";export default D;
