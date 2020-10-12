(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-68bae5fa"],{"0b9b":function(e,t,a){"use strict";var r=a("b23c"),o=a.n(r);o.a},"60c8":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticStyle:{"background-color":"#edeef2"}},[a("div",[a("el-card",{staticClass:"box-card"},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("span",[e._v("用户管理")]),a("div",{staticClass:"right-part"},[-1!=e.buttons.indexOf("22")?a("el-button",{attrs:{size:"small",type:"primary",icon:"el-icon-plus"},on:{click:e.addNew}},[e._v("新增")]):e._e()],1)]),a("div",{staticClass:"user-child-list"},[a("el-form",{ref:"ruleForm",attrs:{inline:""}},[a("el-form-item",{attrs:{label:"用户名",prop:"username"}},[a("el-input",{attrs:{placeholder:"请输入",clearable:""},model:{value:e.extraParam.username,callback:function(t){e.$set(e.extraParam,"username",t)},expression:"extraParam.username"}})],1),a("el-form-item",{attrs:{label:"公司",prop:"company"}},[a("el-input",{attrs:{placeholder:"请输入",clearable:""},model:{value:e.extraParam.company,callback:function(t){e.$set(e.extraParam,"company",t)},expression:"extraParam.company"}})],1),a("el-form-item",{attrs:{label:"用户类型",prop:"userType"}},[a("el-select",{attrs:{clearable:""},model:{value:e.extraParam.userType,callback:function(t){e.$set(e.extraParam,"userType",t)},expression:"extraParam.userType"}},[a("el-option",{attrs:{label:"用户端",value:"1"}}),a("el-option",{attrs:{label:"管理端",value:"2"}})],1)],1),a("el-form-item",{attrs:{label:"学校",prop:"school"}},[a("el-input",{attrs:{placeholder:"请输入",clearable:""},model:{value:e.extraParam.school,callback:function(t){e.$set(e.extraParam,"school",t)},expression:"extraParam.school"}})],1),a("el-form-item",{attrs:{label:"用户状态",prop:"usrStatus"}},[a("el-select",{attrs:{clearable:""},model:{value:e.extraParam.usrStatus,callback:function(t){e.$set(e.extraParam,"usrStatus",t)},expression:"extraParam.usrStatus"}},[a("el-option",{attrs:{label:"正常",value:"1"}}),a("el-option",{attrs:{label:"不可用",value:"2"}})],1)],1),a("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:function(t){return e.handleCurrentChange(1)}}},[e._v("查询")])],1),a("el-table",{ref:"subAccountListTable",staticClass:"list-table",attrs:{"header-cell-style":{background:"#f7f7f7",color:"#333333",fontWeight:"bold"},"cell-style":{fontSize:"12px"},data:e.tableList,"tooltip-effect":"dark"}},[a("el-table-column",{attrs:{prop:"username",align:"center",label:"用户名"}}),a("el-table-column",{attrs:{label:"昵称",align:"center",prop:"realName","show-overflow-tooltip":""}}),a("el-table-column",{attrs:{prop:"createAt",align:"center",label:"性别"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(1==t.row.gender?"男":"女")+" ")]}}])}),a("el-table-column",{attrs:{prop:"phone",align:"center",label:"手机号"}}),a("el-table-column",{attrs:{label:"地区",align:"center",prop:"area","show-overflow-tooltip":""}}),a("el-table-column",{attrs:{label:"个人简介",align:"center",prop:"remark","show-overflow-tooltip":""}}),a("el-table-column",{attrs:{fixed:"right",align:"center",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[-1!=e.buttons.indexOf("24")?a("el-button",{attrs:{size:"small",type:"text"},nativeOn:{click:function(a){return a.preventDefault(),e.handleEdit(t.row)}}},[e._v("编辑")]):e._e(),-1!=e.buttons.indexOf("23")?a("el-button",{attrs:{size:"small",type:"text"},on:{click:function(a){return e.handleDelete(t.row.usrId)}}},[e._v("删除")]):e._e(),-1!=e.buttons.indexOf("70")?a("el-button",{attrs:{size:"small",type:"text"},on:{click:function(a){return e.handleRole(t.row)}}},[e._v("关联角色")]):e._e(),-1!=e.buttons.indexOf("71")?a("el-button",{attrs:{size:"small",type:"text"},on:{click:function(a){return e.handleDetails(t.row)}}},[e._v("用户详情")]):e._e(),-1!=e.buttons.indexOf("26")?a("el-button",{attrs:{size:"small",type:"text"},on:{click:function(a){return e.handleReward(t.row)}}},[e._v("奖励")]):e._e()]}}])})],1),a("div",{staticClass:"pager-container mt30"},[a("el-pagination",{attrs:{"current-page":e.currentPage,"page-size":e.pageSize,total:e.tableTotal,background:"",size:"small",layout:"total,prev, pager, next, sizes, jumper, slot"},on:{"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t},"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}},[a("el-button",{staticClass:"pagination-button",attrs:{size:"small",plain:""}},[e._v("确定")])],1)],1)],1)])],1),a("modify",{attrs:{"add-sign":e.addSign,"rule-form":e.ruleForm},on:{getList:e.getUserInfoList},model:{value:e.show,callback:function(t){e.show=t},expression:"show"}}),a("el-dialog",{attrs:{visible:e.showRoleInfo,"show-close":!1,title:"关联角色"},on:{"update:visible":function(t){e.showRoleInfo=t}}},[a("el-table",{ref:"multipleTable",staticClass:"list-table",attrs:{"header-cell-style":{background:"#f7f7f7",color:"#333333",fontWeight:"bold"},"cell-style":{fontSize:"12px"},data:e.roleInfoList,"tooltip-effect":"dark"},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",align:"center",width:"55"}}),a("el-table-column",{attrs:{prop:"roleCode",align:"center",label:"角色编码"}}),a("el-table-column",{attrs:{prop:"roleName",align:"center",label:"角色名称"}}),a("el-table-column",{attrs:{label:"等级",align:"center",prop:"roleLevel","show-overflow-tooltip":""}}),a("el-table-column",{attrs:{label:"描述",align:"center",prop:"description","show-overflow-tooltip":""}})],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("确定")]),a("el-button",{on:{click:function(t){e.showRoleInfo=!1}}},[e._v("关闭")])],1)],1),a("detailsPage",{attrs:{"rule-form":e.ruleForm},on:{getUserInfoList:e.getUserInfoList},model:{value:e.showDetails,callback:function(t){e.showDetails=t},expression:"showDetails"}}),a("el-dialog",{attrs:{visible:e.showReward,width:"30%","show-close":!1,title:"奖励"},on:{"update:visible":function(t){e.showReward=t}}},[a("el-form",{attrs:{model:e.reward,"label-width":"100px"}},[a("el-form-item",{attrs:{label:"积分",prop:"score"}},[a("el-input-number",{attrs:{min:0},model:{value:e.reward.score,callback:function(t){e.$set(e.reward,"score",t)},expression:"reward.score"}})],1),a("el-form-item",{attrs:{label:"金币",prop:"goldCoin"}},[a("el-input-number",{attrs:{min:0},model:{value:e.reward.goldCoin,callback:function(t){e.$set(e.reward,"goldCoin",t)},expression:"reward.goldCoin"}})],1)],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:e.addScoreToUser}},[e._v("确定")]),a("el-button",{on:{click:function(t){e.showReward=!1}}},[e._v("取消")])],1)],1)],1)},o=[],n=(a("4160"),a("159b"),a("c24f")),l=a("cc5e"),s=a("ed08"),i=a("fab0"),c=a("0539"),u={components:{modify:i["default"],detailsPage:c["default"]},data:function(){return{ruleForm:{},show:!1,addSign:!1,mainId:"",tableList:[],tableTotal:0,pageSize:10,currentPage:1,roleInfoList:[],showRoleInfo:!1,usrId:"",multipleSelection:[],showDetails:!1,extraParam:{},showReward:!1,reward:{goldCoin:0,score:0}}},computed:{buttons:function(){return this.$store.state.buttons}},mounted:function(){this.getUserInfoList(),this.getRoleInfoList()},methods:{handleReward:function(e){this.showReward=!0,this.ruleForm=Object(s["a"])(e),this.reward={goldCoin:0,score:0}},addScoreToUser:function(){var e=this,t={goldCoin:this.reward.goldCoin,score:this.reward.score,userId:this.ruleForm.usrId};Object(n["b"])(t).then((function(t){t.success?e.$message({type:"success",message:"奖励成功"}):e.$message({type:"warning",message:t.message})}))},handleDetails:function(e){this.showDetails=!0,this.ruleForm=Object(s["a"])(e)},parseTime:function(e){return Object(s["b"])(e)},getRoleInfoList:function(){var e=this;Object(l["e"])().then((function(t){t.success&&(e.roleInfoList=t.data)}))},addNew:function(){this.show=!0,this.addSign=!0,this.ruleForm={address:"",area:"",company:"",email:"",gameId:"",gender:1,goldCoin:0,idcardNo:"",idcardTyp:"",joinGame:!0,password:"",phone:"",portrait:"",realName:"",remark:"",roleIds:[],school:"",score:0,signature:"",specialRoleId:0,teamId:"",teamOwner:!0,userTyp:"",username:"",usrBranch:"",usrId:"",usrOrganization:"",usrStatus:"",usrSuper:""}},handleEdit:function(e){this.show=!0,this.ruleForm=Object(s["a"])(e),this.addSign=!1},handleSelectionChange:function(e){this.multipleSelection=e},handleRole:function(e){var t=this;this.showRoleInfo=!0,this.usrId=e.usrId,this.$nextTick((function(){t.$refs.multipleTable.clearSelection(),e.roleIds&&e.roleIds.forEach((function(e){t.roleInfoList.forEach((function(a){e==a.roleId&&t.$refs.multipleTable.toggleRowSelection(a,!0)}))}))}))},onSubmit:function(){var e=this,t=[];this.multipleSelection.forEach((function(e){t.push(e.roleId)})),Object(n["q"])({usrId:this.usrId,roleIds:t}).then((function(t){t.success?(e.$message({type:"success",message:"角色关联成功"}),e.showRoleInfo=!1,e.getUserInfoList()):e.$message({type:"warning",message:t.message})}))},handleDelete:function(e){var t=this;this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){Object(n["d"])({usrId:e}).then((function(e){e.success?(t.$message({type:"success",message:"删除成功"}),t.currentPage=1,t.getUserInfoList()):t.$message({type:"warning",message:e.message})}))})).catch((function(){t.$message({type:"info",message:"已取消删除"})}))},getUserInfoList:function(){var e=this,t={};for(var a in this.extraParam)""!=this.extraParam[a]&&(t[a]=this.extraParam[a]);Object(n["n"])({currentPage:this.currentPage,extraParam:t,pageSize:this.pageSize}).then((function(t){t.success&&(e.tableList=t.data,e.tableTotal=t.count)}))},handleSizeChange:function(e){this.pageSize=e,this.getUserInfoList()},handleCurrentChange:function(e){this.currentPage=e,this.getUserInfoList()}}},d=u,f=(a("0b9b"),a("2877")),m=Object(f["a"])(d,r,o,!1,null,"a58a2b54",null);t["default"]=m.exports},b23c:function(e,t,a){},cc5e:function(e,t,a){"use strict";a.d(t,"a",(function(){return o})),a.d(t,"d",(function(){return n})),a.d(t,"b",(function(){return l})),a.d(t,"c",(function(){return s})),a.d(t,"e",(function(){return i})),a.d(t,"f",(function(){return c}));var r=a("1d97");function o(e){return Object(r["a"])({url:"/sys/addAuthorization",method:"post",data:e})}function n(e){return Object(r["a"])({url:"/sys/getAuthorizationList",method:"get",data:e})}function l(e){return Object(r["a"])({url:"/sys/addRole",method:"post",data:e})}function s(e){return Object(r["a"])({url:"/sys/deleteRole",method:"get",params:e})}function i(e){return Object(r["a"])({url:"/sys/getRoleInfoList",method:"get",params:e})}function c(e){return Object(r["a"])({url:"/sys/modifyRole",method:"post",data:e})}}}]);