(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-05c4f5fc"],{"16bf":function(e,t,n){"use strict";var o=n("1795"),i=n.n(o);i.a},1795:function(e,t,n){},"35f9":function(e,t,n){"use strict";n.r(t);var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("el-table",{ref:"multipleTable",staticClass:"list-table",attrs:{"header-cell-style":{background:"#f7f7f7",color:"#333333",fontWeight:"bold"},"cell-style":{fontSize:"12px"},data:e.tableList,"tooltip-effect":"dark"},on:{select:e.select,"select-all":e.selectAll}},[n("el-table-column",{attrs:{type:"selection",align:"center",width:"55"}}),n("el-table-column",{attrs:{prop:"name",align:"center",label:"题目名称"}}),n("el-table-column",{attrs:{prop:"choiceDescription",align:"center",label:"文本描述"}}),n("el-table-column",{attrs:{label:"题型",align:"center","show-overflow-tooltip":""},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(e.choiceType[t.row.choiceType-1])+" ")]}}])}),n("el-table-column",{attrs:{label:"难易程度",align:"center"},scopedSlots:e._u([{key:"default",fn:function(e){return[n("el-rate",{attrs:{value:parseInt(e.row.difficultyLevel),disabled:""}})]}}])}),n("el-table-column",{attrs:{label:"类别",align:"center",prop:"category","show-overflow-tooltip":""}}),n("el-table-column",{attrs:{label:"分值",align:"center",prop:"choiceScore","show-overflow-tooltip":""}}),n("el-table-column",{attrs:{label:"金币",align:"center",prop:"goldCoin","show-overflow-tooltip":""}}),n("el-table-column",{attrs:{label:"答题时间/秒",align:"center",prop:"choiceTime","show-overflow-tooltip":""}})],1),n("div",{staticClass:"pager-container mt30"},[n("el-pagination",{attrs:{"current-page":e.currentPage,"page-size":e.pageSize,total:e.tableTotal,background:"",size:"small",layout:"total,prev, pager, next, sizes, jumper, slot"},on:{"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t},"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}},[n("el-button",{staticClass:"pagination-button",attrs:{size:"small",plain:""}},[e._v("确定")])],1)],1)],1)},i=[],a=(n("4de4"),n("c740"),n("4160"),n("caad"),n("a434"),n("2532"),n("159b"),n("6774")),c={components:{},props:{value:{type:Boolean,default:!1},gameId:{type:String,default:""}},data:function(){return{activeName:"first",tableList:[],tableTotal:0,pageSize:10,currentPage:1,choiceType:["单选","多选"],questions:[]}},mounted:function(){this.getChoiceListForAdmin()},methods:{clearAll:function(){this.$refs.multipleTable.clearSelection(),this.questions=[]},select:function(e,t){if(console.log(e,t),e.includes(t))this.questions.push(t);else{var n=this.questions.findIndex((function(e){return e.choiceId===t.choiceId}));this.questions.splice(n,1)}},selectAll:function(e){var t=this;e.length>0?this.tableList.forEach((function(e){var n=t.questions.findIndex((function(t){return t.choiceId===e.choiceId}));-1===n&&t.questions.push(e)})):this.questions.forEach((function(e,n){t.tableList.forEach((function(n){e.choiceId==n.choiceId&&(t.questions=t.questions.filter((function(e){return e.choiceId!=n.choiceId})))}))}))},getChoiceListForAdmin:function(){var e=this;Object(a["c"])({currentPage:this.currentPage,extraParam:{},pageSize:this.pageSize}).then((function(t){t.success&&(e.tableList=t.data,e.questions.forEach((function(t){e.tableList.forEach((function(n){t.choiceId===n.choiceId&&e.$refs.multipleTable.toggleRowSelection(n,!0)}))})),e.tableTotal=t.count)}))},handleSizeChange:function(e){this.pageSize=e,this.getChoiceListForAdmin()},handleCurrentChange:function(e){this.currentPage=e,this.getChoiceListForAdmin()}}},l=c,r=(n("16bf"),n("2877")),s=Object(r["a"])(l,o,i,!1,null,null,null);t["default"]=s.exports},6774:function(e,t,n){"use strict";n.d(t,"a",(function(){return i})),n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return c})),n.d(t,"d",(function(){return l})),n.d(t,"e",(function(){return r}));var o=n("1d97");function i(e){return Object(o["a"])({url:"/addChoiceQuestion",method:"post",data:e})}function a(e){return Object(o["a"])({url:"/deleteChoiceQuestion",method:"post",data:e})}function c(e){return Object(o["a"])({url:"/getChoiceListForAdmin",method:"post",data:e})}function l(e){return Object(o["a"])({url:"/getOneChoiceQuestion",method:"post",params:e})}function r(e){return Object(o["a"])({url:"/modifyChoiceQuestion",method:"post",data:e})}},a434:function(e,t,n){"use strict";var o=n("23e7"),i=n("23cb"),a=n("a691"),c=n("50c4"),l=n("7b0b"),r=n("65f0"),s=n("8418"),u=n("1dde"),f=n("ae40"),d=u("splice"),h=f("splice",{ACCESSORS:!0,0:0,1:2}),p=Math.max,g=Math.min,b=9007199254740991,m="Maximum allowed length exceeded";o({target:"Array",proto:!0,forced:!d||!h},{splice:function(e,t){var n,o,u,f,d,h,v=l(this),w=c(v.length),C=i(e,w),y=arguments.length;if(0===y?n=o=0:1===y?(n=0,o=w-C):(n=y-2,o=g(p(a(t),0),w-C)),w+n-o>b)throw TypeError(m);for(u=r(v,o),f=0;f<o;f++)d=C+f,d in v&&s(u,f,v[d]);if(u.length=o,n<o){for(f=C;f<w-o;f++)d=f+o,h=f+n,d in v?v[h]=v[d]:delete v[h];for(f=w;f>w-o+n;f--)delete v[f-1]}else if(n>o)for(f=w-o;f>C;f--)d=f+o-1,h=f+n-1,d in v?v[h]=v[d]:delete v[h];for(f=0;f<n;f++)v[f+C]=arguments[f+2];return v.length=w-o+n,u}})},c740:function(e,t,n){"use strict";var o=n("23e7"),i=n("b727").findIndex,a=n("44d2"),c=n("ae40"),l="findIndex",r=!0,s=c(l);l in[]&&Array(1)[l]((function(){r=!1})),o({target:"Array",proto:!0,forced:r||!s},{findIndex:function(e){return i(this,e,arguments.length>1?arguments[1]:void 0)}}),a(l)}}]);