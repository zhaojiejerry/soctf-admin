(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-01d88c38"],{2631:function(e,t,o){"use strict";var r=o("fb65"),a=o.n(r);a.a},"61f8":function(e,t,o){"use strict";var r=o("a2ea"),a=o.n(r);a.a},6861:function(e,t,o){"use strict";var r=o("9375"),a=o.n(r);a.a},"7b5f":function(e,t,o){"use strict";o.r(t);var r=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticStyle:{height:"100%"}},[o("el-card",{staticClass:"box-card"},[o("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[o("span",[e._v("角色管理")]),o("div",{staticClass:"right-part"},[o("el-button",{attrs:{size:"small",type:"primary",icon:"el-icon-plus"},on:{click:e.addNew}},[e._v("新增")])],1)]),o("div",{staticClass:"user-child-list"},[o("el-table",{staticClass:"list-table",attrs:{"header-cell-style":{background:"#f7f7f7",color:"#333333",fontWeight:"bold"},"cell-style":{fontSize:"12px"},data:e.roleInfoList,"tooltip-effect":"dark"}},[o("el-table-column",{attrs:{prop:"roleCode",align:"center",label:"角色编码"}}),o("el-table-column",{attrs:{prop:"roleName",align:"center",label:"角色名称"}}),o("el-table-column",{attrs:{prop:"icon",align:"center",label:"图标"},scopedSlots:e._u([{key:"default",fn:function(e){var t=e.row;return[o("span",{class:t.icon})]}}])}),o("el-table-column",{attrs:{label:"等级",align:"center",prop:"roleLevel","show-overflow-tooltip":""}}),o("el-table-column",{attrs:{label:"描述",align:"center",prop:"description","show-overflow-tooltip":""}}),o("el-table-column",{attrs:{fixed:"right",align:"center",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[o("el-button",{attrs:{size:"small",type:"text"},nativeOn:{click:function(o){return o.preventDefault(),e.handleEdit(t.row)}}},[e._v("编辑")]),o("el-button",{attrs:{size:"small",type:"text"},nativeOn:{click:function(o){return o.preventDefault(),e.deleteRole(t.row)}}},[e._v("删除")])]}}])})],1)],1)]),o("modify",{attrs:{"add-sign":e.addSign,"rule-form":e.ruleForm},on:{getList:e.getRoleInfoList},model:{value:e.show,callback:function(t){e.show=t},expression:"show"}}),o("el-dialog",{attrs:{visible:e.showAuthorization,"show-close":!1,title:"权限管理"},on:{"update:visible":function(t){e.showAuthorization=t}}},[o("el-button",{staticStyle:{float:"right","margin-bottom":"10px"},attrs:{size:"small",type:"primary",icon:"el-icon-plus"},on:{click:e.addauth}},[e._v("新增")]),o("el-table",{staticClass:"list-table",attrs:{"header-cell-style":{background:"#f7f7f7",color:"#333333",fontWeight:"bold"},"cell-style":{fontSize:"12px"},data:e.authorizationList,"tooltip-effect":"dark"}},[o("el-table-column",{attrs:{prop:"authCode",align:"center",label:"权限编码"}}),o("el-table-column",{attrs:{prop:"authName",align:"center",label:"权限名称"}}),o("el-table-column",{attrs:{label:"描述",align:"center",prop:"description","show-overflow-tooltip":""}}),o("el-table-column",{attrs:{label:"备注",align:"center",prop:"remark","show-overflow-tooltip":""}})],1),o("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:function(t){e.showAuthorization=!1}}},[e._v("关闭")])],1)],1),o("addAuthorization",{attrs:{"rule-form":e.addForm},model:{value:e.showAdd,callback:function(t){e.showAdd=t},expression:"showAdd"}})],1)},a=[],n=o("cc5e"),i=o("ed08"),l=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",[o("el-dialog",{attrs:{visible:e.value,"show-close":!1,title:e.addSign?"新增":"修改"},on:{"update:visible":function(t){e.value=t}}},[o("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"200px"}},[o("el-form-item",{attrs:{label:"编码",prop:"roleCode"}},[o("el-input",{staticClass:"itemwidth",model:{value:e.ruleForm.roleCode,callback:function(t){e.$set(e.ruleForm,"roleCode",t)},expression:"ruleForm.roleCode"}})],1),o("el-form-item",{attrs:{label:"名称",prop:"roleName"}},[o("el-input",{staticClass:"itemwidth",model:{value:e.ruleForm.roleName,callback:function(t){e.$set(e.ruleForm,"roleName",t)},expression:"ruleForm.roleName"}})],1),o("el-form-item",{attrs:{label:"关联机构",prop:"orgId"}},[o("el-select",{staticClass:"itemwidth",attrs:{placeholder:"请选择关联机构"},model:{value:e.ruleForm.orgId,callback:function(t){e.$set(e.ruleForm,"orgId",t)},expression:"ruleForm.orgId"}},e._l(e.organizationList,(function(e,t){return o("el-option",{key:t,attrs:{label:e.orgName,value:e.orgId}})})),1)],1),o("el-form-item",{attrs:{label:"图标",prop:"icon"}},[o("e-icon-picker",{staticClass:"itemwidth",attrs:{options:e.options},model:{value:e.ruleForm.icon,callback:function(t){e.$set(e.ruleForm,"icon",t)},expression:"ruleForm.icon"}})],1),o("el-form-item",{attrs:{label:"描述",prop:"description"}},[o("el-input",{staticClass:"itemwidth",attrs:{type:"textarea"},model:{value:e.ruleForm.description,callback:function(t){e.$set(e.ruleForm,"description",t)},expression:"ruleForm.description"}})],1)],1),o("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("保存")]),o("el-button",{on:{click:e.back}},[e._v("取消")])],1)],1)],1)},s=[],u=(o("a4d3"),o("e01a"),o("5f87")),c=o("d368"),d=o("e149"),m={components:{EIconPicker:d["EIconPicker"]},props:{value:{type:Boolean,default:!1},addSign:{type:Boolean,default:!1},ruleForm:{type:Object,default:function(){}}},data:function(){return{organizationList:[],rules:{roleName:[{required:!0,message:"请输入角色名称",trigger:"blur"}],orgId:[{required:!0,message:"请选择关联机构",trigger:"change"}]},options:{FontAwesome:!0,ElementUI:!0,addIconList:[],removeIconList:[]}}},mounted:function(){this.getOrganizationList()},methods:{getOrganizationList:function(){var e=this;Object(c["f"])().then((function(t){t.success&&(e.organizationList=t.data)}))},parseTime:function(e){return Object(i["b"])(e)},back:function(){this.$emit("input",!1)},onSubmit:function(){var e=this;this.$refs.ruleForm.validate((function(t){t&&(e.addSign?Object(n["b"])({createBy:Object(u["a"])("usrId"),createTime:new Date,description:e.ruleForm.description,icon:e.ruleForm.icon,orgId:e.ruleForm.orgId,roleCode:e.ruleForm.roleCode,roleId:"",roleLevel:e.ruleForm.roleLevel,roleName:e.ruleForm.roleName,updateBy:Object(u["a"])("usrId"),updateTime:new Date}).then((function(t){t.success?(e.$message({type:"success",message:"新增成功"}),e.back(),e.$emit("getList")):e.$message({type:"warning",message:t.message})})):Object(n["f"])({createBy:e.ruleForm.createBy,createTime:e.ruleForm.createTime,description:e.ruleForm.description,icon:e.ruleForm.icon,orgId:e.ruleForm.orgId,roleCode:e.ruleForm.roleCode,roleId:e.ruleForm.roleId,roleLevel:e.ruleForm.roleLevel,roleName:e.ruleForm.roleName,updateBy:Object(u["a"])("usrId"),updateTime:new Date}).then((function(t){t.success?(e.$message({type:"success",message:"修改成功"}),e.back(),e.$emit("getList")):e.$message({type:"warning",message:t.message})})))}))}}},f=m,p=(o("2631"),o("2877")),h=Object(p["a"])(f,l,s,!1,null,null,null),b=h.exports,g=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",[o("el-dialog",{attrs:{visible:e.value,"show-close":!1,title:"新增权限"},on:{"update:visible":function(t){e.value=t}}},[o("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"200px"}},[o("el-form-item",{attrs:{label:"编码",prop:"authCode"}},[o("el-input",{staticClass:"itemwidth",model:{value:e.ruleForm.authCode,callback:function(t){e.$set(e.ruleForm,"authCode",t)},expression:"ruleForm.authCode"}})],1),o("el-form-item",{attrs:{label:"名称",prop:"authName"}},[o("el-input",{staticClass:"itemwidth",model:{value:e.ruleForm.authName,callback:function(t){e.$set(e.ruleForm,"authName",t)},expression:"ruleForm.authName"}})],1),o("el-form-item",{attrs:{label:"描述",prop:"description"}},[o("el-input",{staticClass:"itemwidth",attrs:{type:"textarea"},model:{value:e.ruleForm.description,callback:function(t){e.$set(e.ruleForm,"description",t)},expression:"ruleForm.description"}})],1),o("el-form-item",{attrs:{label:"备注",prop:"remark"}},[o("el-input",{staticClass:"itemwidth",attrs:{type:"textarea"},model:{value:e.ruleForm.remark,callback:function(t){e.$set(e.ruleForm,"remark",t)},expression:"ruleForm.remark"}})],1)],1),o("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("保存")]),o("el-button",{on:{click:e.back}},[e._v("取消")])],1)],1)],1)},v=[],y={props:{value:{type:Boolean,default:!1},ruleForm:{type:Object,default:function(){}}},data:function(){return{rules:{authName:[{required:!0,message:"请输入权限名称",trigger:"blur"}]}}},mounted:function(){},methods:{back:function(){this.$emit("input",!1)},onSubmit:function(){var e=this;this.$refs.ruleForm.validate((function(t){t&&Object(n["a"])({authCode:e.ruleForm.authCode,authId:"",authName:e.ruleForm.authName,remark:e.ruleForm.remark,createBy:Object(u["a"])("usrId"),createTime:new Date,description:e.ruleForm.description}).then((function(t){t.success?(e.$message({type:"success",message:"新增成功"}),e.back(),e.$emit("getList")):e.$message({type:"warning",message:t.message})}))}))}}},F=y,w=(o("61f8"),Object(p["a"])(F,g,v,!1,null,null,null)),k=w.exports,O={components:{modify:b,addAuthorization:k},data:function(){return{show:!1,addSign:!1,ruleForm:{},addForm:{},showAuthorization:!1,showAdd:!1,authorizationList:[],roleInfoList:[]}},mounted:function(){this.getRoleInfoList(),this.getAuthorizationList()},methods:{authorization:function(){this.showAuthorization=!0},parseTime:function(e){return Object(i["b"])(e)},addauth:function(){this.showAdd=!0,this.addForm={authCode:"",authId:"",authName:"",createAt:"",createBy:"",description:"",remark:""}},addNew:function(){this.show=!0,this.addSign=!0,this.ruleForm={createBy:"",createTime:"",description:"",icon:"",orgId:"",roleCode:"",roleId:"",roleLevel:"",roleName:"",updateBy:"",updateTime:""}},handleEdit:function(e){this.show=!0,this.ruleForm=Object(i["a"])(e),this.addSign=!1},deleteRole:function(e){var t=this;this.$confirm("此操作将永久删除该条数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){Object(n["c"])({roleId:e}).then((function(e){e.success?(t.$message({type:"success",message:"删除成功"}),t.getRoleInfoList()):t.$message({type:"warning",message:e.message})}))})).catch((function(){t.$message({type:"info",message:"已取消删除"})}))},getRoleInfoList:function(){var e=this;Object(n["e"])().then((function(t){t.success&&(e.roleInfoList=t.data)}))},getAuthorizationList:function(){var e=this;Object(n["d"])().then((function(t){t.success&&(e.authorizationList=t.data)}))}}},C=O,I=(o("6861"),Object(p["a"])(C,r,a,!1,null,"2a839da4",null));t["default"]=I.exports},9375:function(e,t,o){},a2ea:function(e,t,o){},cc5e:function(e,t,o){"use strict";o.d(t,"a",(function(){return a})),o.d(t,"d",(function(){return n})),o.d(t,"b",(function(){return i})),o.d(t,"c",(function(){return l})),o.d(t,"e",(function(){return s})),o.d(t,"f",(function(){return u}));var r=o("1d97");function a(e){return Object(r["a"])({url:"/sys/addAuthorization",method:"post",data:e})}function n(e){return Object(r["a"])({url:"/sys/getAuthorizationList",method:"get",data:e})}function i(e){return Object(r["a"])({url:"/sys/addRole",method:"post",data:e})}function l(e){return Object(r["a"])({url:"/sys/deleteRole",method:"get",params:e})}function s(e){return Object(r["a"])({url:"/sys/getRoleInfoList",method:"get",params:e})}function u(e){return Object(r["a"])({url:"/sys/modifyRole",method:"post",data:e})}},d368:function(e,t,o){"use strict";o.d(t,"b",(function(){return a})),o.d(t,"d",(function(){return n})),o.d(t,"f",(function(){return i})),o.d(t,"g",(function(){return l})),o.d(t,"i",(function(){return s})),o.d(t,"a",(function(){return u})),o.d(t,"c",(function(){return c})),o.d(t,"e",(function(){return d})),o.d(t,"h",(function(){return m}));var r=o("1d97");function a(e){return Object(r["a"])({url:"/sys/addOrganization",method:"post",data:e})}function n(e){return Object(r["a"])({url:"/sys/deleteOrganization",method:"get",params:e})}function i(e){return Object(r["a"])({url:"/sys/getOrganizationList",method:"get",data:e})}function l(e){return Object(r["a"])({url:"/sys/getOrganizationListPage",method:"post",data:e})}function s(e){return Object(r["a"])({url:"/sys/modifyOrganization",method:"post",data:e})}function u(e){return Object(r["a"])({url:"/sys/addBranch",method:"post",data:e})}function c(e){return Object(r["a"])({url:"/sys/deleteBranch",method:"get",params:e})}function d(e){return Object(r["a"])({url:"/sys/getBranchListPage",method:"post",data:e})}function m(e){return Object(r["a"])({url:"/sys/modifyBranch",method:"post",data:e})}},fb65:function(e,t,o){}}]);