(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a105c624"],{2388:function(t,e,n){},c5c2:function(t,e,n){"use strict";n.d(e,"f",(function(){return r})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return u})),n.d(e,"d",(function(){return i})),n.d(e,"e",(function(){return c})),n.d(e,"m",(function(){return l})),n.d(e,"p",(function(){return s})),n.d(e,"b",(function(){return d})),n.d(e,"g",(function(){return f})),n.d(e,"i",(function(){return m})),n.d(e,"h",(function(){return g})),n.d(e,"n",(function(){return p})),n.d(e,"j",(function(){return b})),n.d(e,"l",(function(){return h})),n.d(e,"k",(function(){return j})),n.d(e,"o",(function(){return O}));var a=n("1d97");function r(t){return Object(a["a"])({url:"/game/getGameInfoListForPage",method:"post",data:t})}function o(t){return Object(a["a"])({url:"/game/deleteGame",method:"get",params:t})}function u(t){return Object(a["a"])({url:"/game/addGameInfo",method:"post",data:t})}function i(t){return Object(a["a"])({url:"/game/endGame",method:"get",params:t})}function c(t){return Object(a["a"])({url:"/game/getGameInfoDetail",method:"post",params:t})}function l(t){return Object(a["a"])({url:"/game/modifyGameInfo",method:"post",data:t})}function s(t){return Object(a["a"])({url:"/game/startGame",method:"get",params:t})}function d(t){return Object(a["a"])({url:"/createPaperInfoForGame",method:"post",data:t})}function f(t){return Object(a["a"])({url:"/game/getGameOssFile",method:"get",params:t})}function m(t){return Object(a["a"])({url:"/game/getRankingList",method:"get",params:t,hideloading:!0})}function g(t){return Object(a["a"])({url:"/getNoticeListForUser",method:"post",data:t,hideloading:!0})}function p(t){return Object(a["a"])({url:"/game/rankingInDB",method:"get",params:t})}function b(t){return Object(a["a"])({url:"/getScoreViewList",method:"get",params:t})}function h(t){return Object(a["a"])({url:"/modifyContestFinalScore",method:"post",data:t})}function j(t){return Object(a["a"])({url:"/hideContestUserScore",method:"get",params:t})}function O(t){return Object(a["a"])({url:"/sys/sendGameToken",method:"get",params:t})}},c685:function(t,e,n){"use strict";var a=n("2388"),r=n.n(a);r.a},e9e9:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("el-dialog",{attrs:{visible:t.value,"show-close":!1,title:"比赛成绩"},on:{"update:visible":function(e){t.value=e}}},[n("div",{attrs:{id:"details-content"}},[n("el-scrollbar",{staticStyle:{height:"100%"}},[n("el-table",{staticClass:"list-table",attrs:{"header-cell-style":{background:"#f7f7f7",color:"#333333",fontWeight:"bold"},"cell-style":{fontSize:"12px"},data:t.rankingList,"tooltip-effect":"dark"}},[n("el-table-column",{attrs:{prop:"rowNum",align:"center",label:"排名"}}),n("el-table-column",{attrs:{prop:"gameText",align:"center",label:"头像"},scopedSlots:t._u([{key:"default",fn:function(t){var e=t.row;return[n("img",{staticClass:"head",attrs:{src:null==e.portrait?"":e.portrait,alt:""}})]}}])}),"2"==t.type?n("el-table-column",{attrs:{prop:"team_name",align:"center",label:"战队"}}):n("el-table-column",{attrs:{prop:"userName",align:"center",label:"姓名"}}),n("el-table-column",{attrs:{prop:"score",align:"center",label:"成绩"}}),n("el-table-column",{attrs:{prop:"mold",align:"center",label:"解题数量"}})],1)],1)],1),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:t.close}},[t._v("关闭")])],1)])],1)},r=[],o=n("c5c2"),u={props:{value:{type:Boolean,default:!1},gameId:{type:String,default:""},type:{type:String,default:"1"}},data:function(){return{rankingList:[]}},watch:{value:function(t){t&&this.getRankingList()}},methods:{close:function(){this.$emit("input",!1)},getRankingList:function(){var t=this;Object(o["i"])({gameId:this.gameId,enable:1}).then((function(e){t.rankingList=e.data}))}}},i=u,c=(n("c685"),n("2877")),l=Object(c["a"])(i,a,r,!1,null,"20365dc4",null);e["default"]=l.exports}}]);