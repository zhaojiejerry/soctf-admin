(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-9d3de8c6"],{a4f0:function(e,t,r){"use strict";r.r(t);var o=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("el-dialog",{attrs:{visible:e.value,"show-close":!1,title:e.addSign?"新增":"修改"},on:{"update:visible":function(t){e.value=t}}},[r("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"100px"}},[r("el-form-item",{attrs:{label:"机构编码",prop:"orgCode"}},[r("el-input",{staticClass:"itemwidth",model:{value:e.ruleForm.orgCode,callback:function(t){e.$set(e.ruleForm,"orgCode",t)},expression:"ruleForm.orgCode"}})],1),r("el-form-item",{attrs:{label:"机构名称",prop:"orgName"}},[r("el-input",{staticClass:"itemwidth",model:{value:e.ruleForm.orgName,callback:function(t){e.$set(e.ruleForm,"orgName",t)},expression:"ruleForm.orgName"}})],1),r("el-form-item",{attrs:{label:"描述",prop:"description"}},[r("el-input",{staticClass:"itemwidth",attrs:{type:"textarea"},model:{value:e.ruleForm.description,callback:function(t){e.$set(e.ruleForm,"description",t)},expression:"ruleForm.description"}})],1),r("el-form-item",{attrs:{label:"备注",prop:"remark"}},[r("el-input",{staticClass:"itemwidth",attrs:{type:"textarea"},model:{value:e.ruleForm.remark,callback:function(t){e.$set(e.ruleForm,"remark",t)},expression:"ruleForm.remark"}})],1)],1),r("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("保存")]),r("el-button",{on:{click:e.back}},[e._v("取消")])],1)],1)},a=[],n=(r("a4d3"),r("e01a"),r("5f87")),i=r("d368"),s={props:{value:{type:Boolean,default:!1},addSign:{type:Boolean,default:!1},ruleForm:{type:Object,default:function(){}}},data:function(){return{rules:{orgCode:[{required:!0,message:"请输入机构编码",trigger:"blur"}],orgName:[{required:!0,message:"请选择机构名称",trigger:"blur"}]}}},methods:{back:function(){this.$emit("input",!1)},onSubmit:function(){var e=this;this.$refs.ruleForm.validate((function(t){t&&(e.addSign?Object(i["b"])({createAt:new Date,createBy:Object(n["a"])("usrId"),description:e.ruleForm.description,orgCode:e.ruleForm.orgCode,orgId:"",orgName:e.ruleForm.orgName,remark:e.ruleForm.remark}).then((function(t){t.success?(e.$message({type:"success",message:"新增成功"}),e.back(),e.$emit("getList")):e.$message({type:"warning",message:t.message})})):Object(i["i"])({createAt:e.ruleForm.createAt,createBy:e.ruleForm.createBy,description:e.ruleForm.description,orgCode:e.ruleForm.orgCode,orgId:e.ruleForm.orgId,orgName:e.ruleForm.orgName,remark:e.ruleForm.remark}).then((function(t){t.success?(e.$message({type:"success",message:"修改成功"}),e.back(),e.$emit("getList")):e.$message({type:"warning",message:t.message})})))}))}}},u=s,l=r("2877"),c=Object(l["a"])(u,o,a,!1,null,null,null);t["default"]=c.exports},d368:function(e,t,r){"use strict";r.d(t,"b",(function(){return a})),r.d(t,"d",(function(){return n})),r.d(t,"f",(function(){return i})),r.d(t,"g",(function(){return s})),r.d(t,"i",(function(){return u})),r.d(t,"a",(function(){return l})),r.d(t,"c",(function(){return c})),r.d(t,"e",(function(){return d})),r.d(t,"h",(function(){return m}));var o=r("1d97");function a(e){return Object(o["a"])({url:"/sys/addOrganization",method:"post",data:e})}function n(e){return Object(o["a"])({url:"/sys/deleteOrganization",method:"get",params:e})}function i(e){return Object(o["a"])({url:"/sys/getOrganizationList",method:"get",data:e})}function s(e){return Object(o["a"])({url:"/sys/getOrganizationListPage",method:"post",data:e})}function u(e){return Object(o["a"])({url:"/sys/modifyOrganization",method:"post",data:e})}function l(e){return Object(o["a"])({url:"/sys/addBranch",method:"post",data:e})}function c(e){return Object(o["a"])({url:"/sys/deleteBranch",method:"get",params:e})}function d(e){return Object(o["a"])({url:"/sys/getBranchListPage",method:"post",data:e})}function m(e){return Object(o["a"])({url:"/sys/modifyBranch",method:"post",data:e})}},e01a:function(e,t,r){"use strict";var o=r("23e7"),a=r("83ab"),n=r("da84"),i=r("5135"),s=r("861d"),u=r("9bf2").f,l=r("e893"),c=n.Symbol;if(a&&"function"==typeof c&&(!("description"in c.prototype)||void 0!==c().description)){var d={},m=function(){var e=arguments.length<1||void 0===arguments[0]?void 0:String(arguments[0]),t=this instanceof m?new c(e):void 0===e?c():c(e);return""===e&&(d[t]=!0),t};l(m,c);var g=m.prototype=c.prototype;g.constructor=m;var f=g.toString,p="Symbol(test)"==String(c("test")),b=/^Symbol\((.*)\)[^)]+$/;u(g,"description",{configurable:!0,get:function(){var e=s(this)?this.valueOf():this,t=f.call(e);if(i(d,e))return"";var r=p?t.slice(7,-1):t.replace(b,"$1");return""===r?void 0:r}}),o({global:!0,forced:!0},{Symbol:m})}}}]);