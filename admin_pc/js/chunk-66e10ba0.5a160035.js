(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-66e10ba0","chunk-2d2077b3"],{2934:function(e,t,l){"use strict";l.d(t,"a",(function(){return o}));var r=l("1d97");function o(e){return Object(r["a"])({url:e,baseURL:"/jsonApi"})}},3007:function(e,t,l){"use strict";l.d(t,"a",(function(){return o})),l.d(t,"b",(function(){return a})),l.d(t,"c",(function(){return i})),l.d(t,"e",(function(){return n})),l.d(t,"d",(function(){return u}));var r=l("1d97");function o(e){return Object(r["a"])({url:"/docker/addDockerQuestion",method:"post",data:e})}function a(e){return Object(r["a"])({url:"/docker/delDockerQuestion",method:"delete",params:e})}function i(e){return Object(r["a"])({url:"/docker/editDockerQuestion",method:"post",data:e})}function n(e){return Object(r["a"])({url:"/docker/getDockerQuestionById",method:"get",params:e})}function u(e){return Object(r["a"])({url:"/docker/getDockerQuestion",method:"post",data:e})}},4877:function(e,t,l){"use strict";var r=l("ddb07"),o=l.n(r);o.a},a15b:function(e,t,l){"use strict";var r=l("23e7"),o=l("44ad"),a=l("fc6a"),i=l("a640"),n=[].join,u=o!=Object,s=i("join",",");r({target:"Array",proto:!0,forced:u||!s},{join:function(e){return n.call(a(this),void 0===e?",":e)}})},d543:function(e,t,l){"use strict";l.r(t);var r=function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("el-dialog",{attrs:{visible:e.value,"show-close":!1,title:e.addSign?"新增":"修改"},on:{"update:visible":function(t){e.value=t}}},[l("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"200px"}},[l("el-form-item",{attrs:{label:"题目名称",prop:"name"}},[l("el-input",{staticClass:"itemwidth",model:{value:e.ruleForm.name,callback:function(t){e.$set(e.ruleForm,"name",t)},expression:"ruleForm.name"}})],1),l("el-form-item",{attrs:{label:"类别",prop:"category"}},[l("el-select",{staticClass:"itemwidth",attrs:{placeholder:"请选择类别"},model:{value:e.ruleForm.category,callback:function(t){e.$set(e.ruleForm,"category",t)},expression:"ruleForm.category"}},e._l(e.subject,(function(e,t){return l("el-option",{key:t,attrs:{label:e.name,value:e.name}})})),1)],1),l("el-form-item",{attrs:{label:"访问方式",prop:"frpType"}},[l("el-select",{staticClass:"itemwidth",attrs:{placeholder:"请选择访问方式"},model:{value:e.ruleForm.frpType,callback:function(t){e.$set(e.ruleForm,"frpType",t)},expression:"ruleForm.frpType"}},[l("el-option",{attrs:{value:1,label:"DIRECT为ip直接访问"}}),l("el-option",{attrs:{value:2,label:"HTTP为域名访问"}})],1)],1),l("el-form-item",{attrs:{label:"难易程度",prop:"difficultyLevel"}},[l("div",{staticClass:"itemwidth",staticStyle:{"padding-top":"10px"}},[l("el-rate",{model:{value:e.ruleForm.difficultyLevel,callback:function(t){e.$set(e.ruleForm,"difficultyLevel",t)},expression:"ruleForm.difficultyLevel"}})],1)]),l("el-form-item",{attrs:{label:"金币",prop:"goldCoin"}},[l("el-input",{staticClass:"itemwidth",attrs:{min:0},model:{value:e.ruleForm.goldCoin,callback:function(t){e.$set(e.ruleForm,"goldCoin",e._n(t))},expression:"ruleForm.goldCoin"}})],1),l("el-form-item",{attrs:{label:"分值",prop:"value"}},[l("el-input",{staticClass:"itemwidth",attrs:{min:0},model:{value:e.ruleForm.value,callback:function(t){e.$set(e.ruleForm,"value",e._n(t))},expression:"ruleForm.value"}})],1),l("el-form-item",{attrs:{label:"答题时间/秒",prop:"time"}},[l("el-input",{staticClass:"itemwidth",attrs:{min:0},model:{value:e.ruleForm.time,callback:function(t){e.$set(e.ruleForm,"time",e._n(t))},expression:"ruleForm.time"}})],1),l("el-form-item",{attrs:{label:"描述",prop:"questionDescribe"}},[l("el-input",{staticClass:"itemwidth",attrs:{type:"textarea"},model:{value:e.ruleForm.questionDescribe,callback:function(t){e.$set(e.ruleForm,"questionDescribe",t)},expression:"ruleForm.questionDescribe"}})],1),l("el-form-item",{attrs:{label:"所在文件夹",prop:"dirName"}},[l("el-input",{staticClass:"itemwidth",model:{value:e.ruleForm.dirName,callback:function(t){e.$set(e.ruleForm,"dirName",t)},expression:"ruleForm.dirName"}})],1),l("el-form-item",{attrs:{label:"标签",prop:"label"}},[l("el-select",{staticClass:"itemwidth",attrs:{multiple:"",filterable:"","allow-create":"","default-first-option":"",placeholder:"请选择标签"},model:{value:e.ruleForm.label,callback:function(t){e.$set(e.ruleForm,"label",t)},expression:"ruleForm.label"}},e._l(e.label,(function(e,t){return l("el-option",{key:t,attrs:{label:e,value:e}})})),1)],1)],1),l("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("保存")]),l("el-button",{on:{click:e.back}},[e._v("取消")])],1)],1)},o=[],a=(l("a15b"),l("b0c0"),l("ac1f"),l("1276"),l("3007")),i=l("2934"),n={components:{},props:{value:{type:Boolean,default:!1},addSign:{type:Boolean,default:!1},mainId:{type:String,default:""}},data:function(){return{ruleForm:{category:"",challengeType:"",deploymentType:"",difficultyLevel:0,dirName:"",enable:0,frpType:1,goldCoin:0,id:"",label:"",name:"",questionDescribe:"",questionType:0,time:0,value:0},label:[],rules:{name:[{required:!0,message:"请输入题目名称",trigger:"blur"}],flag:[{required:!0,message:"请输入答案",trigger:"blur"}],category:[{required:!0,message:"请选择类别",trigger:"change"}]},fileList:[],subject:[]}},watch:{value:function(e){e&&(this.addSign?this.ruleForm={category:"",challengeType:"",deploymentType:"",difficultyLevel:0,dirName:"",enable:0,frpType:1,goldCoin:0,id:"",label:"",name:"",questionDescribe:"",questionType:0,time:0,value:0}:this.getDockerQuestionById())}},mounted:function(){this.getjson()},methods:{getjson:function(){var e=this;Object(i["a"])("ctf.json").then((function(t){e.subject=t.subject}))},getDockerQuestionById:function(){var e=this;Object(a["e"])({id:this.mainId}).then((function(t){t.success&&(e.ruleForm=t.data,e.ruleForm.difficultyLevel=parseInt(t.data.difficultyLevel),e.ruleForm.label=e.getLabel(t.data.label),e.label=e.ruleForm.label)}))},getLabel:function(e){return e.split("|")},back:function(){this.$emit("input",!1)},onSubmit:function(){var e=this;this.$refs.ruleForm.validate((function(t){t&&(e.addSign?Object(a["a"])({category:e.ruleForm.category,challengeType:e.ruleForm.challengeType,deploymentType:e.ruleForm.deploymentType,difficultyLevel:e.ruleForm.difficultyLevel,dirName:e.ruleForm.dirName,enable:1,frpType:e.ruleForm.frpType,goldCoin:e.ruleForm.goldCoin,id:"",label:e.ruleForm.label.join("|"),name:e.ruleForm.name,questionDescribe:e.ruleForm.questionDescribe,questionType:1,time:e.ruleForm.time,value:e.ruleForm.value}).then((function(t){t.success?(e.$message({type:"success",message:"新增成功"}),e.back(),e.$emit("getList")):e.$message({type:"warning",message:t.message})})):Object(a["c"])({category:e.ruleForm.category,challengeType:e.ruleForm.challengeType,deploymentType:e.ruleForm.deploymentType,difficultyLevel:e.ruleForm.difficultyLevel,dirName:e.ruleForm.dirName,enable:e.ruleForm.enable,frpType:e.ruleForm.frpType,goldCoin:e.ruleForm.goldCoin,id:e.ruleForm.id,label:e.ruleForm.label.join("|"),name:e.ruleForm.name,questionDescribe:e.ruleForm.questionDescribe,questionType:1,time:e.ruleForm.time,value:e.ruleForm.value}).then((function(t){t.success?(e.$message({type:"success",message:"修改成功"}),e.back(),e.$emit("getList")):e.$message({type:"warning",message:t.message})})))}))}}},u=n,s=(l("4877"),l("2877")),c=Object(s["a"])(u,r,o,!1,null,null,null);t["default"]=c.exports},ddb07:function(e,t,l){}}]);