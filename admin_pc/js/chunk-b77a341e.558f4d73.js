(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-b77a341e"],{"4eff":function(t,e,n){},ad35:function(t,e,n){"use strict";var a=n("4eff"),o=n.n(a);o.a},c5c2:function(t,e,n){"use strict";n.d(e,"f",(function(){return o})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return i})),n.d(e,"d",(function(){return s})),n.d(e,"e",(function(){return c})),n.d(e,"m",(function(){return l})),n.d(e,"p",(function(){return u})),n.d(e,"b",(function(){return d})),n.d(e,"g",(function(){return f})),n.d(e,"i",(function(){return m})),n.d(e,"h",(function(){return g})),n.d(e,"n",(function(){return p})),n.d(e,"j",(function(){return h})),n.d(e,"l",(function(){return b})),n.d(e,"k",(function(){return w})),n.d(e,"o",(function(){return v}));var a=n("1d97");function o(t){return Object(a["a"])({url:"/game/getGameInfoListForPage",method:"post",data:t})}function r(t){return Object(a["a"])({url:"/game/deleteGame",method:"get",params:t})}function i(t){return Object(a["a"])({url:"/game/addGameInfo",method:"post",data:t})}function s(t){return Object(a["a"])({url:"/game/endGame",method:"get",params:t})}function c(t){return Object(a["a"])({url:"/game/getGameInfoDetail",method:"post",params:t})}function l(t){return Object(a["a"])({url:"/game/modifyGameInfo",method:"post",data:t})}function u(t){return Object(a["a"])({url:"/game/startGame",method:"get",params:t})}function d(t){return Object(a["a"])({url:"/createPaperInfoForGame",method:"post",data:t})}function f(t){return Object(a["a"])({url:"/game/getGameOssFile",method:"get",params:t})}function m(t){return Object(a["a"])({url:"/game/getRankingList",method:"get",params:t,hideloading:!0})}function g(t){return Object(a["a"])({url:"/getNoticeListForUser",method:"post",data:t,hideloading:!0})}function p(t){return Object(a["a"])({url:"/game/rankingInDB",method:"get",params:t})}function h(t){return Object(a["a"])({url:"/getScoreViewList",method:"get",params:t})}function b(t){return Object(a["a"])({url:"/modifyContestFinalScore",method:"post",data:t})}function w(t){return Object(a["a"])({url:"/hideContestUserScore",method:"get",params:t})}function v(t){return Object(a["a"])({url:"/sys/sendGameToken",method:"get",params:t})}},e588:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("el-dialog",{attrs:{visible:t.value,"show-close":!1,title:"比赛排名"},on:{"update:visible":function(e){t.value=e}}},[n("div",{attrs:{id:"details-content"}},[n("el-scrollbar",{staticStyle:{height:"100%"}},[n("el-table",{staticClass:"list-table",attrs:{"header-cell-style":{background:"#f7f7f7",color:"#333333",fontWeight:"bold"},"cell-style":{fontSize:"12px"},data:t.rankingList,"tooltip-effect":"dark"}},[n("el-table-column",{attrs:{prop:"rowNum",align:"center",label:"排名"}}),n("el-table-column",{attrs:{prop:"gameText",align:"center",label:"头像"},scopedSlots:t._u([{key:"default",fn:function(t){var e=t.row;return[n("img",{staticClass:"head",attrs:{src:null==e.portrait?"":e.portrait,alt:""}})]}}])}),"2"==t.type?n("el-table-column",{attrs:{prop:"team_name",align:"center",label:"战队"}}):n("el-table-column",{attrs:{prop:"userName",align:"center",label:"姓名"}}),n("el-table-column",{attrs:{prop:"score",align:"center",label:"成绩"}}),n("el-table-column",{attrs:{prop:"mold",align:"center",label:"解题数量"}}),n("el-table-column",{attrs:{fixed:"right",align:"center",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{size:"small",type:"text"},on:{click:function(n){return t.viewList(e.row.id)}}},[t._v("查看答题列表")]),n("el-button",{attrs:{size:"small",type:"text"},on:{click:function(n){return t.hideContestUserScore(e.row)}}},[t._v(t._s(1==e.row.enable?"隐藏成绩":"显示成绩"))])]}}])})],1)],1)],1),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:t.close}},[t._v("关闭")])],1)]),n("el-dialog",{attrs:{visible:t.showList,"show-close":!1,title:"答题列表"},on:{"update:visible":function(e){t.showList=e}}},[n("div",{attrs:{id:"details-content"}},[n("el-scrollbar",{staticStyle:{height:"100%"}},[n("el-table",{staticClass:"list-table",attrs:{"header-cell-style":{background:"#f7f7f7",color:"#333333",fontWeight:"bold"},"cell-style":{fontSize:"12px"},data:t.scoreViewList,"tooltip-effect":"dark"}},[n("el-table-column",{attrs:{prop:"gameName",align:"center",label:"竞赛名称"}}),n("el-table-column",{attrs:{prop:"challengeName",align:"center",label:"题目"}}),n("el-table-column",{attrs:{prop:"resultScore",align:"center",label:"成绩"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[a.edit?n("el-input",{staticStyle:{width:"calc(100% - 40px)"},attrs:{size:"small",placeholder:"请输入"},model:{value:a.resultScore,callback:function(e){t.$set(a,"resultScore",e)},expression:"row.resultScore"}}):t._e(),a.edit?t._e():n("span",{staticStyle:{"line-height":"32px"}},[t._v(t._s(a.resultScore))]),a.edit||-1==t.buttons.indexOf("39")?t._e():n("span",{staticClass:"el-icon-edit-outline icon",on:{click:function(t){a.edit=!0}}}),a.edit?n("span",{staticClass:"el-icon-close icon",on:{click:t.getScoreViewList}}):t._e(),a.edit?n("span",{staticClass:"el-icon-check icon",on:{click:function(e){return t.modifyContestFinalScore(a)}}}):t._e()]}}])})],1)],1)],1),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(e){t.showList=!1}}},[t._v("关闭")])],1)])],1)},o=[],r=(n("4160"),n("159b"),n("c5c2")),i={props:{value:{type:Boolean,default:!1},gameId:{type:String,default:""},type:{type:String,default:"1"}},data:function(){return{rankingList:[],scoreViewList:[],showList:!1,scoreId:""}},computed:{buttons:function(){return this.$store.state.buttons}},watch:{value:function(t){t&&this.getRankingList()}},methods:{close:function(){this.$emit("input",!1)},getRankingList:function(){var t=this;Object(r["i"])({gameId:this.gameId}).then((function(e){t.rankingList=e.data}))},viewList:function(t){this.scoreId=t,this.getScoreViewList()},getScoreViewList:function(){var t=this;Object(r["j"])({scoreId:this.scoreId}).then((function(e){e.data&&e.data.forEach((function(t){t.edit=!1})),t.scoreViewList=e.data,t.showList=!0}))},hideContestUserScore:function(t){var e=this;this.$confirm("是否要"+(1==t.enable?"隐藏":"显示")+"用户竞赛成绩?","提示",{type:"warning"}).then((function(){Object(r["k"])({scoreId:t.id}).then((function(t){t.success?(e.$message({type:"success",message:"操作成功"}),e.getRankingList()):e.$message({type:"warning",message:t.message})}))})).catch((function(){e.$message({type:"info",message:"已取消操作"})}))},modifyContestFinalScore:function(t){var e=this,n=this,a=[{id:t.id,resultScore:t.resultScore,scoreId:t.scoreId}];this.$confirm("是否要修改用户竞赛成绩?","提示",{type:"warning"}).then((function(){Object(r["l"])(a).then((function(t){t.success?(e.$message({type:"success",message:"修改成功"}),n.getScoreViewList()):e.$message({type:"warning",message:t.message})}))}))}}},s=i,c=(n("ad35"),n("2877")),l=Object(c["a"])(s,a,o,!1,null,"131f059d",null);e["default"]=l.exports}}]);