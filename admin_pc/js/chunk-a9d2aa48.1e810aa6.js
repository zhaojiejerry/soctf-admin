(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a9d2aa48"],{2934:function(e,t,l){"use strict";l.d(t,"a",(function(){return i}));var a=l("1d97");function i(e){return Object(a["a"])({url:e,baseURL:"/jsonApi"})}},"2ac8":function(e,t,l){"use strict";l.d(t,"e",(function(){return i})),l.d(t,"b",(function(){return n})),l.d(t,"f",(function(){return r})),l.d(t,"a",(function(){return o})),l.d(t,"d",(function(){return s})),l.d(t,"c",(function(){return u}));var a=l("1d97");function i(e){return Object(a["a"])({url:"/writeup/getWriteUpForPage",method:"post",data:e})}function n(e){return Object(a["a"])({url:"/writeup/deleteWriteUp",method:"get",params:e})}function r(e){return Object(a["a"])({url:"/writeup/modifyWriteUp",method:"post",data:e})}function o(e){return Object(a["a"])({url:"/writeup/addWriteUp",method:"post",data:e})}function s(e){return Object(a["a"])({url:"/writeup/getQuestionWriteUp",method:"get",params:e})}function u(e){return Object(a["a"])({url:"/question/getAllQuestion",method:"post",data:e})}},"2c37":function(e,t,l){"use strict";var a=l("7a6d"),i=l.n(a);i.a},"624b":function(e,t,l){"use strict";var a=l("86dc"),i=l.n(a);i.a},"7a6d":function(e,t,l){},"86dc":function(e,t,l){},"961d":function(e,t,l){"use strict";l.r(t);var a=function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{staticStyle:{"background-color":"#edeef2"}},[l("div",[l("el-card",{staticClass:"box-card"},[l("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[l("span",[e._v("题目管理")]),l("div",{staticClass:"right-part"},[l("el-button",{attrs:{size:"small",type:"primary",icon:"el-icon-plus"},on:{click:e.addNew}},[e._v("新增")])],1)]),l("div",{staticClass:"user-child-list"},[l("el-table",{ref:"subAccountListTable",staticClass:"list-table",attrs:{"header-cell-style":{background:"#f7f7f7",color:"#333333",fontWeight:"bold"},"cell-style":{fontSize:"12px"},data:e.tableList,"tooltip-effect":"dark"}},[l("el-table-column",{attrs:{prop:"title",align:"center",label:"标题"}}),l("el-table-column",{attrs:{prop:"mainBody",align:"center",label:"文本描述"}}),l("el-table-column",{attrs:{prop:"createAt",align:"center",label:"创建时间"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(e.parseTime(t.row.createAt))+" ")]}}])}),l("el-table-column",{attrs:{label:"文档类型",align:"center","show-overflow-tooltip":""},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(e.fileType[t.row.fileType-1])+" ")]}}])}),l("el-table-column",{attrs:{label:"答案描述",align:"center",prop:"answerDescription","show-overflow-tooltip":""}}),l("el-table-column",{attrs:{label:"分类",align:"center",prop:"type","show-overflow-tooltip":""}}),l("el-table-column",{attrs:{fixed:"right",align:"center",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("el-button",{attrs:{size:"small",type:"text"},nativeOn:{click:function(l){return l.preventDefault(),e.handleEdit(t.row.questionId)}}},[e._v("编辑")]),l("el-button",{attrs:{size:"small",type:"text"},on:{click:function(l){return e.handleDelete(t.row.id)}}},[e._v("删除")])]}}])})],1),l("div",{staticClass:"pager-container mt30"},[l("el-pagination",{attrs:{"current-page":e.currentPage,"page-size":e.pageSize,total:e.tableTotal,background:"",size:"small",layout:"total,prev, pager, next, sizes, jumper, slot"},on:{"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t},"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}},[l("el-button",{staticClass:"pagination-button",attrs:{size:"small",plain:""}},[e._v("确定")])],1)],1)],1)])],1),l("modify",{attrs:{"add-sign":e.addSign,"main-id":e.mainId},on:{getList:e.getWriteUpForPage},model:{value:e.show,callback:function(t){e.show=t},expression:"show"}})],1)},i=[],n=l("2ac8"),r=l("ed08"),o=function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",[l("el-dialog",{attrs:{visible:e.value,"show-close":!1,title:e.addSign?"新增":"修改"},on:{"update:visible":function(t){e.value=t}}},[l("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"200px"}},[l("el-form-item",{attrs:{label:"答案/文档标题",prop:"title"}},[l("el-input",{staticClass:"itemwidth",model:{value:e.ruleForm.title,callback:function(t){e.$set(e.ruleForm,"title",t)},expression:"ruleForm.title"}})],1),l("el-form-item",{attrs:{label:"文档类型",prop:"fileType"}},[l("el-select",{staticClass:"itemwidth",attrs:{placeholder:"请选择文档类型"},model:{value:e.ruleForm.fileType,callback:function(t){e.$set(e.ruleForm,"fileType",t)},expression:"ruleForm.fileType"}},[l("el-option",{attrs:{label:"WP",value:"1"}}),l("el-option",{attrs:{label:"比赛资料",value:"2"}}),l("el-option",{attrs:{label:"其他",value:"3"}})],1)],1),l("el-form-item",{attrs:{label:"关联题目"}},[l("div",{staticClass:"itemwidth el-input",on:{click:function(t){e.dialogTableVisible=!0}}},[l("div",{staticClass:"el-input__inner"},[e._v(" "+e._s(e.question)+" ")])])]),l("el-form-item",{attrs:{label:"文档描述",prop:"mainBody"}},[l("el-input",{staticClass:"itemwidth",attrs:{type:"textarea"},model:{value:e.ruleForm.mainBody,callback:function(t){e.$set(e.ruleForm,"mainBody",t)},expression:"ruleForm.mainBody"}})],1),l("el-form-item",{attrs:{label:"答案/文档描述",prop:"answerDescription"}},[l("el-input",{staticClass:"itemwidth",model:{value:e.ruleForm.answerDescription,callback:function(t){e.$set(e.ruleForm,"answerDescription",t)},expression:"ruleForm.answerDescription"}})],1),l("el-form-item",{attrs:{label:"标签",prop:"label"}},[l("el-select",{staticClass:"itemwidth",attrs:{multiple:"",filterable:"","allow-create":"","default-first-option":"",placeholder:"请选择标签"},model:{value:e.ruleForm.label,callback:function(t){e.$set(e.ruleForm,"label",t)},expression:"ruleForm.label"}},e._l(e.label,(function(e,t){return l("el-option",{key:t,attrs:{label:e,value:e}})})),1)],1),l("el-form-item",{attrs:{label:"分类",prop:"type"}},[l("el-input",{staticClass:"itemwidth",model:{value:e.ruleForm.type,callback:function(t){e.$set(e.ruleForm,"type",t)},expression:"ruleForm.type"}})],1),l("el-form-item",{attrs:{label:"答案/文档OSS路径"}},[l("el-upload",{ref:"upload",staticClass:"upload-demo",attrs:{"on-success":e.handleSuccess,"file-list":e.fileList,action:"/baseApi/oss"},on:{"on-remove":e.handleRemove}},[l("el-button",{attrs:{size:"small",type:"primary"}},[e._v("点击上传")]),l("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[e._v("只能上传md/pdf文件")])],1)],1)],1),l("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("保存")]),l("el-button",{on:{click:e.back}},[e._v("取消")])],1)],1),l("el-dialog",{attrs:{visible:e.dialogTableVisible,"show-close":!1,width:"70%",title:"关联题目"},on:{"update:visible":function(t){e.dialogTableVisible=t}}},[l("el-form",{ref:"ruleForm",attrs:{inline:""}},[l("el-form-item",{attrs:{label:"名称"}},[l("el-input",{attrs:{clearable:""},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}})],1),l("el-form-item",{attrs:{label:"类别"}},[l("el-select",{attrs:{placeholder:"请选择类别",clearable:""},model:{value:e.category,callback:function(t){e.category=t},expression:"category"}},e._l(e.subject,(function(e,t){return l("el-option",{key:t,attrs:{label:e.name,value:e.name}})})),1)],1),l("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:function(t){return e.handleCurrentChange(1)}}},[e._v("查询")])],1),l("el-table",{ref:"multipleTable",staticClass:"list-table",attrs:{"header-cell-style":{background:"#f7f7f7",color:"#333333",fontWeight:"bold"},"cell-style":{fontSize:"12px"},data:e.subList,"highlight-current-row":"","tooltip-effect":"dark"},on:{"row-click":e.rowClick}},[l("el-table-column",{attrs:{prop:"name",align:"center",label:"题目名称"}}),l("el-table-column",{attrs:{prop:"questionDescribe",align:"center",label:"文本描述"}}),l("el-table-column",{attrs:{label:"题型",align:"center","show-overflow-tooltip":""},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(e.questionType[t.row.questionType-1])+" ")]}}])}),l("el-table-column",{attrs:{label:"难易程度",align:"center"},scopedSlots:e._u([{key:"default",fn:function(e){return[l("el-rate",{attrs:{value:parseInt(e.row.difficultyLevel),disabled:""}})]}}])}),l("el-table-column",{attrs:{label:"类别",align:"center",prop:"category","show-overflow-tooltip":""}}),l("el-table-column",{attrs:{label:"分值",align:"center",prop:"value","show-overflow-tooltip":""}}),l("el-table-column",{attrs:{label:"金币",align:"center",prop:"goldCoin","show-overflow-tooltip":""}}),l("el-table-column",{attrs:{label:"答题时间/秒",align:"center",prop:"time","show-overflow-tooltip":""}})],1),l("div",{staticClass:"pager-container mt30"},[l("el-pagination",{attrs:{"current-page":e.currentPage,"page-size":e.pageSize,total:e.subTotal,background:"",size:"small",layout:"total,prev, pager, next, sizes, jumper, slot"},on:{"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t},"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}},[l("el-button",{staticClass:"pagination-button",attrs:{size:"small",plain:""}},[e._v("确定")])],1)],1),l("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{attrs:{type:"primary"},on:{click:e.isOK}},[e._v("确 定")]),l("el-button",{on:{click:function(t){e.dialogTableVisible=!1}}},[e._v("取 消")])],1)],1)],1)},s=[],u=(l("a15b"),l("b0c0"),l("ac1f"),l("1276"),l("5f87")),c=l("2934"),d={components:{},props:{value:{type:Boolean,default:!1},addSign:{type:Boolean,default:!1},mainId:{type:String,default:""}},data:function(){return{dialogTableVisible:!1,question:"",ruleForm:{answerDescription:"",createAt:"",createById:"",fileType:"",fileUrl:"",id:0,label:[],mainBody:"",questionId:"",title:"",type:""},label:[],rules:{title:[{required:!0,message:"请输入答案/文档标题",trigger:"blur"}],fileType:[{required:!0,message:"请选择文档类型",trigger:"change"}]},fileList:[],subList:[],subTotal:0,pageSize:10,currentPage:1,questionRow:[],questionType:["容器","附件","选择"],name:"",category:""}},watch:{value:function(e){e&&(this.addSign?this.ruleForm={answerDescription:"",createAt:"",createById:"",fileType:"",fileUrl:"",id:0,label:[],mainBody:"",questionId:"",title:"",type:""}:this.getQuestionWriteUp())}},mounted:function(){this.getAllQuestion(),this.getjson()},methods:{getjson:function(){var e=this;Object(c["a"])("ctf.json").then((function(t){e.subject=t.subject}))},parseTime:function(e){return Object(r["b"])(e)},rowClick:function(e){console.log(e),this.questionRow=[e]},getAllQuestion:function(){var e=this;Object(n["c"])({pageSize:this.pageSize,category:this.category,difficultyLevel:"",labs:"",name:this.name,pageNo:this.currentPage,userId:""}).then((function(t){t.success&&(e.subList=t.data.records,e.subTotal=t.data.total)}))},handleSizeChange:function(e){this.pageSize=e,this.getAllQuestion()},handleCurrentChange:function(e){this.currentPage=e,this.getAllQuestion()},handleSuccess:function(e,t,l){console.log(e,t,l),e.success?(this.fileList=[{name:t.name,url:e.message}],this.ruleForm.fileUrl=e.message):(this.fileList=[],this.ruleForm.fileUrl="",this.$message.error(e.message))},handleRemove:function(e,t){console.log(e,t),this.fileList=[],this.ruleForm.fileUrl=""},getQuestionWriteUp:function(){var e=this;Object(n["d"])({questionId:this.mainId}).then((function(t){if(t.data){if(e.ruleForm=t.data,""!=t.data.fileUrl){var l=t.data.fileUrl.split("/");console.log(l),e.fileList=""==t.data.fileUrl?[]:[{name:l[l.length-1],url:t.data.fileUrl}]}e.ruleForm.label=e.getLabel(t.data.label),e.label=e.ruleForm.label}}))},getLabel:function(e){return e.split("|")},back:function(){this.$emit("input",!1)},isOK:function(){0!=this.questionRow.length?(this.question=this.questionRow[0].name,this.ruleForm.questionId=this.questionRow[0].id,this.dialogTableVisible=!1):this.$message({type:"warning",message:"请选择关联题目"})},onSubmit:function(){var e=this;""!=this.ruleForm.questionId?this.$refs.ruleForm.validate((function(t){t&&(e.addSign?Object(n["a"])({answerDescription:e.ruleForm.answerDescription,createAt:new Date,createById:Object(u["a"])("usrId"),fileType:e.ruleForm.fileType,fileUrl:e.ruleForm.fileUrl,id:0,label:e.ruleForm.label.join("|"),mainBody:e.ruleForm.mainBody,questionId:e.ruleForm.questionId,title:e.ruleForm.title,type:e.ruleForm.type}).then((function(t){t.success?(e.$message({type:"success",message:"新增成功"}),e.back(),e.$emit("getList")):e.$message({type:"warning",message:t.message})})):Object(n["f"])({answerDescription:e.ruleForm.answerDescription,fileType:e.ruleForm.fileType,fileUrl:e.ruleForm.fileUrl,id:e.ruleForm.id,label:e.ruleForm.label.join("|"),mainBody:e.ruleForm.mainBody,questionId:e.ruleForm.questionId,title:e.ruleForm.title,type:e.ruleForm.type}).then((function(t){t.success?(e.$message({type:"success",message:"修改成功"}),e.back(),e.$emit("getList")):e.$message({type:"warning",message:t.message})})))})):this.$message({type:"warning",message:"您还没有选择关联题目"})}}},p=d,m=(l("624b"),l("2877")),f=Object(m["a"])(p,o,s,!1,null,null,null),g=f.exports,b={components:{modify:g},data:function(){return{show:!1,addSign:!1,mainId:"",tableList:[],tableTotal:0,pageSize:10,currentPage:1,fileType:["WP","比赛资料","其他"]}},mounted:function(){this.getWriteUpForPage()},methods:{parseTime:function(e){return Object(r["b"])(e)},addNew:function(){this.show=!0,this.addSign=!0,this.mainId=""},handleEdit:function(e){this.show=!0,this.mainId=e,this.addSign=!1},handleDelete:function(e){var t=this;this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){Object(n["b"])({answerId:e}).then((function(e){e.success?(t.$message({type:"success",message:"删除成功"}),t.currentPage=1,t.getWriteUpForPage()):t.$message({type:"warning",message:e.message})}))})).catch((function(){t.$message({type:"info",message:"已取消删除"})}))},getWriteUpForPage:function(){var e=this;Object(n["e"])({currentPage:this.currentPage,extraParam:{},pageSize:this.pageSize}).then((function(t){t.success&&(e.tableList=t.data,e.tableTotal=t.count)}))},handleSizeChange:function(e){this.pageSize=e,this.getWriteUpForPage()},handleCurrentChange:function(e){this.currentPage=e,this.getWriteUpForPage()}}},h=b,y=(l("2c37"),Object(m["a"])(h,a,i,!1,null,"2073fc3d",null));t["default"]=y.exports}}]);