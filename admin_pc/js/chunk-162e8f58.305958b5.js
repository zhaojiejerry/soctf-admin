(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-162e8f58"],{2934:function(e,t,l){"use strict";l.d(t,"a",(function(){return r}));var a=l("1d97");function r(e){return Object(a["a"])({url:e,baseURL:"/jsonApi"})}},"37ed":function(e,t,l){"use strict";var a=l("fa0d"),r=l.n(a);r.a},"3afd":function(e,t,l){"use strict";l.r(t);var a=function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{staticStyle:{"background-color":"#edeef2"}},[l("div",[l("el-card",{staticClass:"box-card"},[l("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[l("span",[e._v("容器题管理")]),l("div",{staticClass:"right-part"},[l("el-button",{attrs:{size:"small",type:"primary",icon:"el-icon-plus"},on:{click:e.addNew}},[e._v("新增")])],1)]),l("div",{staticClass:"user-child-list"},[l("el-table",{ref:"subAccountListTable",staticClass:"list-table",attrs:{"header-cell-style":{background:"#f7f7f7",color:"#333333",fontWeight:"bold"},"cell-style":{fontSize:"12px"},data:e.tableList,"tooltip-effect":"dark"}},[l("el-table-column",{attrs:{prop:"name",align:"center",label:"题目名称"}}),l("el-table-column",{attrs:{prop:"questionDescribe",align:"center",label:"文本描述"}}),l("el-table-column",{attrs:{label:"题型",align:"center","show-overflow-tooltip":""},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(e.questionType[t.row.questionType-1])+" ")]}}])}),l("el-table-column",{attrs:{label:"难易程度",align:"center"},scopedSlots:e._u([{key:"default",fn:function(e){return[l("el-rate",{attrs:{value:parseInt(e.row.difficultyLevel),disabled:""}})]}}])}),l("el-table-column",{attrs:{label:"类别",align:"center",prop:"category","show-overflow-tooltip":""}}),l("el-table-column",{attrs:{label:"分值",align:"center",prop:"value","show-overflow-tooltip":""}}),l("el-table-column",{attrs:{label:"金币",align:"center",prop:"goldCoin","show-overflow-tooltip":""}}),l("el-table-column",{attrs:{label:"答题时间/秒",align:"center",prop:"time","show-overflow-tooltip":""}}),l("el-table-column",{attrs:{fixed:"right",align:"center",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("el-button",{attrs:{size:"small",type:"text"},nativeOn:{click:function(l){return l.preventDefault(),e.handleEdit(t.row.id)}}},[e._v("编辑")]),l("el-button",{attrs:{size:"small",type:"text"},on:{click:function(l){return e.handleDelete(t.row.id)}}},[e._v("删除")])]}}])})],1),l("div",{staticClass:"pager-container mt30"},[l("el-pagination",{attrs:{"current-page":e.currentPage,"page-size":e.pageSize,total:e.tableTotal,background:"",size:"small",layout:"total,prev, pager, next, sizes, jumper, slot"},on:{"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t},"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}},[l("el-button",{staticClass:"pagination-button",attrs:{size:"small",plain:""}},[e._v("确定")])],1)],1)],1)])],1),l("modify",{attrs:{"add-sign":e.addSign,"main-id":e.mainId},on:{getList:e.getDockerQuestion},model:{value:e.show,callback:function(t){e.show=t},expression:"show"}})],1)},r=[],o=l("1d97");function i(e){return Object(o["a"])({url:"/docker/addDockerQuestion",method:"post",data:e})}function n(e){return Object(o["a"])({url:"/docker/delDockerQuestion",method:"delete",params:e})}function s(e){return Object(o["a"])({url:"/docker/editDockerQuestion",method:"post",data:e})}function u(e){return Object(o["a"])({url:"/docker/getDockerQuestionById",method:"get",params:e})}function c(e){return Object(o["a"])({url:"/docker/getDockerQuestion",method:"post",data:e})}var m=l("ed08"),d=function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("el-dialog",{attrs:{visible:e.value,"show-close":!1,title:e.addSign?"新增":"修改"},on:{"update:visible":function(t){e.value=t}}},[l("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"200px"}},[l("el-form-item",{attrs:{label:"题目名称",prop:"name"}},[l("el-input",{staticClass:"itemwidth",model:{value:e.ruleForm.name,callback:function(t){e.$set(e.ruleForm,"name",t)},expression:"ruleForm.name"}})],1),l("el-form-item",{attrs:{label:"类别",prop:"category"}},[l("el-select",{staticClass:"itemwidth",attrs:{placeholder:"请选择类别"},model:{value:e.ruleForm.category,callback:function(t){e.$set(e.ruleForm,"category",t)},expression:"ruleForm.category"}},e._l(e.subject,(function(e,t){return l("el-option",{key:t,attrs:{label:e.name,value:e.name}})})),1)],1),l("el-form-item",{attrs:{label:"访问方式",prop:"frpType"}},[l("el-select",{staticClass:"itemwidth",attrs:{placeholder:"请选择访问方式"},model:{value:e.ruleForm.frpType,callback:function(t){e.$set(e.ruleForm,"frpType",t)},expression:"ruleForm.frpType"}},[l("el-option",{attrs:{value:1,label:"DIRECT为ip直接访问"}}),l("el-option",{attrs:{value:2,label:"HTTP为域名访问"}})],1)],1),l("el-form-item",{attrs:{label:"难易程度",prop:"difficultyLevel"}},[l("div",{staticClass:"itemwidth",staticStyle:{"padding-top":"10px"}},[l("el-rate",{model:{value:e.ruleForm.difficultyLevel,callback:function(t){e.$set(e.ruleForm,"difficultyLevel",t)},expression:"ruleForm.difficultyLevel"}})],1)]),l("el-form-item",{attrs:{label:"金币",prop:"goldCoin"}},[l("el-input",{staticClass:"itemwidth",attrs:{min:0},model:{value:e.ruleForm.goldCoin,callback:function(t){e.$set(e.ruleForm,"goldCoin",e._n(t))},expression:"ruleForm.goldCoin"}})],1),l("el-form-item",{attrs:{label:"分值",prop:"value"}},[l("el-input",{staticClass:"itemwidth",attrs:{min:0},model:{value:e.ruleForm.value,callback:function(t){e.$set(e.ruleForm,"value",e._n(t))},expression:"ruleForm.value"}})],1),l("el-form-item",{attrs:{label:"答题时间/秒",prop:"time"}},[l("el-input",{staticClass:"itemwidth",attrs:{min:0},model:{value:e.ruleForm.time,callback:function(t){e.$set(e.ruleForm,"time",e._n(t))},expression:"ruleForm.time"}})],1),l("el-form-item",{attrs:{label:"描述",prop:"questionDescribe"}},[l("el-input",{staticClass:"itemwidth",attrs:{type:"textarea"},model:{value:e.ruleForm.questionDescribe,callback:function(t){e.$set(e.ruleForm,"questionDescribe",t)},expression:"ruleForm.questionDescribe"}})],1),l("el-form-item",{attrs:{label:"所在文件夹",prop:"dirName"}},[l("el-input",{staticClass:"itemwidth",model:{value:e.ruleForm.dirName,callback:function(t){e.$set(e.ruleForm,"dirName",t)},expression:"ruleForm.dirName"}})],1),l("el-form-item",{attrs:{label:"标签",prop:"label"}},[l("el-select",{staticClass:"itemwidth",attrs:{multiple:"",filterable:"","allow-create":"","default-first-option":"",placeholder:"请选择标签"},model:{value:e.ruleForm.label,callback:function(t){e.$set(e.ruleForm,"label",t)},expression:"ruleForm.label"}},e._l(e.label,(function(e,t){return l("el-option",{key:t,attrs:{label:e,value:e}})})),1)],1)],1),l("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("保存")]),l("el-button",{on:{click:e.back}},[e._v("取消")])],1)],1)},p=[],f=(l("a15b"),l("b0c0"),l("ac1f"),l("1276"),l("2934")),b={components:{},props:{value:{type:Boolean,default:!1},addSign:{type:Boolean,default:!1},mainId:{type:String,default:""}},data:function(){return{ruleForm:{category:"",challengeType:"",deploymentType:"",difficultyLevel:0,dirName:"",enable:0,frpType:1,goldCoin:0,id:"",label:"",name:"",questionDescribe:"",questionType:0,time:0,value:0},label:[],rules:{name:[{required:!0,message:"请输入题目名称",trigger:"blur"}],flag:[{required:!0,message:"请输入答案",trigger:"blur"}],category:[{required:!0,message:"请选择类别",trigger:"change"}]},fileList:[],subject:[]}},watch:{value:function(e){e&&(this.addSign?this.ruleForm={category:"",challengeType:"",deploymentType:"",difficultyLevel:0,dirName:"",enable:0,frpType:1,goldCoin:0,id:"",label:"",name:"",questionDescribe:"",questionType:0,time:0,value:0}:this.getDockerQuestionById())}},mounted:function(){this.getjson()},methods:{getjson:function(){var e=this;Object(f["a"])("ctf.json").then((function(t){e.subject=t.subject}))},getDockerQuestionById:function(){var e=this;u({id:this.mainId}).then((function(t){t.success&&(e.ruleForm=t.data,e.ruleForm.difficultyLevel=parseInt(t.data.difficultyLevel),e.ruleForm.label=e.getLabel(t.data.label),e.label=e.ruleForm.label)}))},getLabel:function(e){return e.split("|")},back:function(){this.$emit("input",!1)},onSubmit:function(){var e=this;this.$refs.ruleForm.validate((function(t){t&&(e.addSign?i({category:e.ruleForm.category,challengeType:e.ruleForm.challengeType,deploymentType:e.ruleForm.deploymentType,difficultyLevel:e.ruleForm.difficultyLevel,dirName:e.ruleForm.dirName,enable:1,frpType:e.ruleForm.frpType,goldCoin:e.ruleForm.goldCoin,id:"",label:e.ruleForm.label.join("|"),name:e.ruleForm.name,questionDescribe:e.ruleForm.questionDescribe,questionType:1,time:e.ruleForm.time,value:e.ruleForm.value}).then((function(t){t.success?(e.$message({type:"success",message:"新增成功"}),e.back(),e.$emit("getList")):e.$message({type:"warning",message:t.message})})):s({category:e.ruleForm.category,challengeType:e.ruleForm.challengeType,deploymentType:e.ruleForm.deploymentType,difficultyLevel:e.ruleForm.difficultyLevel,dirName:e.ruleForm.dirName,enable:e.ruleForm.enable,frpType:e.ruleForm.frpType,goldCoin:e.ruleForm.goldCoin,id:e.ruleForm.id,label:e.ruleForm.label.join("|"),name:e.ruleForm.name,questionDescribe:e.ruleForm.questionDescribe,questionType:1,time:e.ruleForm.time,value:e.ruleForm.value}).then((function(t){t.success?(e.$message({type:"success",message:"修改成功"}),e.back(),e.$emit("getList")):e.$message({type:"warning",message:t.message})})))}))}}},g=b,h=(l("4877"),l("2877")),y=Object(h["a"])(g,d,p,!1,null,null,null),v=y.exports,F={components:{modify:v},data:function(){return{show:!1,addSign:!1,mainId:"",tableList:[],tableTotal:0,pageSize:10,currentPage:1,questionType:["容器","附件","选择"]}},mounted:function(){this.getDockerQuestion()},methods:{addNew:function(){this.show=!0,this.addSign=!0,this.mainId=""},handleEdit:function(e){this.show=!0,this.mainId=e,this.addSign=!1},parseTime:function(e){return Object(m["b"])(e)},handleDelete:function(e){var t=this;this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){n({id:e}).then((function(e){e.success?(t.$message({type:"success",message:"删除成功"}),t.currentPage=1,t.getDockerQuestion()):t.$message({type:"warning",message:e.message})}))})).catch((function(){t.$message({type:"info",message:"已取消删除"})}))},getDockerQuestion:function(){var e=this;c({category:"",difficultyLevel:"",labs:"",name:"",pageNo:this.currentPage,pageSize:this.pageSize,userId:""}).then((function(t){t.success&&(e.tableList=t.data.records,e.tableTotal=t.data.total)}))},handleSizeChange:function(e){this.pageSize=e,this.getDockerQuestion()},handleCurrentChange:function(e){this.currentPage=e,this.getDockerQuestion()}}},k=F,w=(l("37ed"),Object(h["a"])(k,a,r,!1,null,"f2dd124e",null));t["default"]=w.exports},4877:function(e,t,l){"use strict";var a=l("ddb07"),r=l.n(a);r.a},ddb07:function(e,t,l){},fa0d:function(e,t,l){}}]);