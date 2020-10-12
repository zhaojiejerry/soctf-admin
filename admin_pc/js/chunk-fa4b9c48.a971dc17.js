(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-fa4b9c48"],{"6a5c":function(e,t,a){"use strict";var r=a("cbdd"),n=a.n(r);n.a},"9f04":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticStyle:{"background-color":"#edeef2"}},[a("div",[a("el-card",{staticClass:"box-card"},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("span",[e._v("部门管理")]),a("div",{staticClass:"right-part"},[a("el-button",{attrs:{size:"small",type:"primary",icon:"el-icon-plus"},on:{click:e.addNew}},[e._v("新增")])],1)]),a("div",{staticClass:"user-child-list"},[a("el-table",{ref:"subAccountListTable",staticClass:"list-table",attrs:{"header-cell-style":{background:"#f7f7f7",color:"#333333",fontWeight:"bold"},"cell-style":{fontSize:"12px"},data:e.tableList,"tooltip-effect":"dark"}},[a("el-table-column",{attrs:{prop:"branCode",align:"center",label:"部门编码"}}),a("el-table-column",{attrs:{prop:"branName",align:"center",label:"部门名称"}}),a("el-table-column",{attrs:{prop:"branName",align:"center",label:"关联机构名称"}}),a("el-table-column",{attrs:{label:"描述",align:"center",prop:"description","show-overflow-tooltip":""}}),a("el-table-column",{attrs:{label:"备注",align:"center",prop:"remark","show-overflow-tooltip":""}}),a("el-table-column",{attrs:{prop:"createAt",align:"center",label:"创建时间"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(e.parseTime(t.row.createAt))+" ")]}}])}),a("el-table-column",{attrs:{fixed:"right",align:"center",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"small",type:"text"},nativeOn:{click:function(a){return a.preventDefault(),e.handleEdit(t.row)}}},[e._v("编辑")]),a("el-button",{attrs:{size:"small",type:"text"},on:{click:function(a){return e.handleDelete(t.row.branId)}}},[e._v("删除")])]}}])})],1),a("div",{staticClass:"pager-container mt30"},[a("el-pagination",{attrs:{"current-page":e.currentPage,"page-size":e.pageSize,total:e.tableTotal,background:"",size:"small",layout:"total,prev, pager, next, sizes, jumper, slot"},on:{"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t},"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}},[a("el-button",{staticClass:"pagination-button",attrs:{size:"small",plain:""}},[e._v("确定")])],1)],1)],1)])],1),a("modify",{attrs:{"add-sign":e.addOrganiza,"rule-form":e.ruleForm},on:{getList:e.getBranchListPage},model:{value:e.showOrganiza,callback:function(t){e.showOrganiza=t},expression:"showOrganiza"}})],1)},n=[],o=a("d368"),s=a("ed08"),i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{attrs:{visible:e.value,"show-close":!1,title:e.addSign?"新增":"修改"},on:{"update:visible":function(t){e.value=t}}},[a("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"100px"}},[a("el-form-item",{attrs:{label:"部门编码",prop:"branCode"}},[a("el-input",{staticClass:"itemwidth",model:{value:e.ruleForm.branCode,callback:function(t){e.$set(e.ruleForm,"branCode",t)},expression:"ruleForm.branCode"}})],1),a("el-form-item",{attrs:{label:"部门名称",prop:"branName"}},[a("el-input",{staticClass:"itemwidth",model:{value:e.ruleForm.branName,callback:function(t){e.$set(e.ruleForm,"branName",t)},expression:"ruleForm.branName"}})],1),a("el-form-item",{attrs:{label:"关联结构",prop:"orgId"}},[a("el-select",{staticClass:"itemwidth",attrs:{placeholder:"请选择关联结构"},model:{value:e.ruleForm.orgId,callback:function(t){e.$set(e.ruleForm,"orgId",t)},expression:"ruleForm.orgId"}},e._l(e.organizationList,(function(e,t){return a("el-option",{key:t,attrs:{value:e.orgId,label:e.orgName}})})),1)],1),a("el-form-item",{attrs:{label:"描述",prop:"description"}},[a("el-input",{staticClass:"itemwidth",attrs:{type:"textarea"},model:{value:e.ruleForm.description,callback:function(t){e.$set(e.ruleForm,"description",t)},expression:"ruleForm.description"}})],1),a("el-form-item",{attrs:{label:"备注",prop:"remark"}},[a("el-input",{staticClass:"itemwidth",attrs:{type:"textarea"},model:{value:e.ruleForm.remark,callback:function(t){e.$set(e.ruleForm,"remark",t)},expression:"ruleForm.remark"}})],1)],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("保存")]),a("el-button",{on:{click:e.back}},[e._v("取消")])],1)],1)},l=[],c=(a("a4d3"),a("e01a"),a("5f87")),u={props:{value:{type:Boolean,default:!1},addSign:{type:Boolean,default:!1},ruleForm:{type:Object,default:function(){}}},data:function(){return{organizationList:[],rules:{branCode:[{required:!0,message:"请输入部门编码",trigger:"blur"}],branName:[{required:!0,message:"请选择部门名称",trigger:"blur"}],orgId:[{required:!0,message:"请选择关联结构",trigger:"change"}]}}},mounted:function(){this.getOrganizationList()},methods:{getOrganizationList:function(){var e=this;Object(o["f"])().then((function(t){t.success&&(e.organizationList=t.data)}))},back:function(){this.$emit("input",!1)},onSubmit:function(){var e=this;this.$refs.ruleForm.validate((function(t){t&&(e.addSign?Object(o["a"])({createAt:new Date,createBy:Object(c["a"])("usrId"),description:e.ruleForm.description,orgId:e.ruleForm.orgId,branCode:e.ruleForm.branCode,branId:"",branName:e.ruleForm.branName,remark:e.ruleForm.remark}).then((function(t){t.success?(e.$message({type:"success",message:"新增成功"}),e.back(),e.$emit("getList")):e.$message({type:"warning",message:t.message})})):Object(o["h"])({createAt:e.ruleForm.createAt,createBy:e.ruleForm.createBy,description:e.ruleForm.description,orgId:e.ruleForm.orgId,branCode:e.ruleForm.branCode,branId:e.ruleForm.branId,branName:e.ruleForm.branName,remark:e.ruleForm.remark}).then((function(t){t.success?(e.$message({type:"success",message:"修改成功"}),e.back(),e.$emit("getList")):e.$message({type:"warning",message:t.message})})))}))}}},d=u,m=a("2877"),g=Object(m["a"])(d,i,l,!1,null,null,null),b=g.exports,p={components:{modify:b},data:function(){return{showOrganiza:!1,addOrganiza:!1,tableList:[],tableTotal:0,pageSize:10,currentPage:1,ruleForm:{}}},mounted:function(){this.getBranchListPage()},methods:{addNew:function(){this.showOrganiza=!0,this.addOrganiza=!0,this.ruleForm={branCode:"",branId:"",branName:"",createAt:"",createBy:"",description:"",orgId:"",remark:""}},parseTime:function(e){return Object(s["b"])(e)},handleEdit:function(e){this.showOrganiza=!0,this.addOrganiza=!1,this.ruleForm=Object(s["a"])(e)},handleDelete:function(e){var t=this;this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){Object(o["c"])({branchId:e}).then((function(e){e.success?(t.$message({type:"success",message:"删除成功"}),t.currentPage=1,t.getBranchListPage()):t.$message({type:"warning",message:e.message})}))})).catch((function(){t.$message({type:"info",message:"已取消删除"})}))},getBranchListPage:function(){var e=this;Object(o["e"])({currentPage:this.currentPage,extraParam:{},pageSize:this.pageSize}).then((function(t){t.success&&(e.tableList=t.data,e.tableTotal=t.count)}))},handleSizeChange:function(e){this.pageSize=e,this.getBranchListPage()},handleCurrentChange:function(e){this.currentPage=e,this.getBranchListPage()}}},f=p,h=(a("6a5c"),Object(m["a"])(f,r,n,!1,null,"301cc9c4",null));t["default"]=h.exports},cbdd:function(e,t,a){},d368:function(e,t,a){"use strict";a.d(t,"b",(function(){return n})),a.d(t,"d",(function(){return o})),a.d(t,"f",(function(){return s})),a.d(t,"g",(function(){return i})),a.d(t,"i",(function(){return l})),a.d(t,"a",(function(){return c})),a.d(t,"c",(function(){return u})),a.d(t,"e",(function(){return d})),a.d(t,"h",(function(){return m}));var r=a("1d97");function n(e){return Object(r["a"])({url:"/sys/addOrganization",method:"post",data:e})}function o(e){return Object(r["a"])({url:"/sys/deleteOrganization",method:"get",params:e})}function s(e){return Object(r["a"])({url:"/sys/getOrganizationList",method:"get",data:e})}function i(e){return Object(r["a"])({url:"/sys/getOrganizationListPage",method:"post",data:e})}function l(e){return Object(r["a"])({url:"/sys/modifyOrganization",method:"post",data:e})}function c(e){return Object(r["a"])({url:"/sys/addBranch",method:"post",data:e})}function u(e){return Object(r["a"])({url:"/sys/deleteBranch",method:"get",params:e})}function d(e){return Object(r["a"])({url:"/sys/getBranchListPage",method:"post",data:e})}function m(e){return Object(r["a"])({url:"/sys/modifyBranch",method:"post",data:e})}}}]);