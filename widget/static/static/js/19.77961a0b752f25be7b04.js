webpackJsonp([19],{"I++D":function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s("4YfN"),a=s.n(i),n=s("lC5x"),r=s.n(n),o=s("J0Oq"),l=s.n(o),c=s("R4Sj"),u={created:function(){!this.replyMeList.list.length&&this.getList()},mounted:function(){var t=this;this.$nextTick(function(){t.$refs.reMeBox.scrollTop=t.$utils.cache.reMeListScroll;var e=t;t.$refs.reMeBox.onscroll=function(){e.$utils.cache.reMeListScroll=parseInt(this.scrollTop)}})},filters:{commentFliter1:function(t){return t.child?"@我 : "+t.comment.content:""+t.comment.content}},data:function(){return{loading:!1,isLoading:!1}},methods:{onLoad:function(){this.getList(!1)},onRefresh:function(){this.getList(!0)},gotoDetail:function(t){this.$router.push({path:"/home/shardDetail",query:{id:t}})},getList:function(){var t=this,e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];return l()(r.a.mark(function s(){return r.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:t.$store.dispatch("listHelper/replyMeList",{isreload:e,cb:function(){t.loading=!1,t.isLoading=!1,console.log("xialashuaxin")}});case 1:case"end":return s.stop()}},s,t)}))()}},computed:a()({},Object(c.c)("listHelper",["replyMeList"]))},d={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{ref:"reMeBox",staticClass:"reply-me-list paddingTopNav"},[s("van-nav-bar",{staticClass:"topNavBar",attrs:{title:"所有回复","left-text":"返回","left-arrow":""},on:{"click-left":function(e){return t.$router.go(-1)}}}),t._v(" "),s("div",{staticClass:"list-box"},[s("van-pull-refresh",{staticClass:"refreshBox",on:{refresh:t.onRefresh},model:{value:t.isLoading,callback:function(e){t.isLoading=e},expression:"isLoading"}},[s("van-list",{attrs:{finished:t.replyMeList.finished,"finished-text":"没有更多了","immediate-check":!1},on:{load:t.onLoad},model:{value:t.loading,callback:function(e){t.loading=e},expression:"loading"}},t._l(t.replyMeList.list,function(e,i){return s("div",{key:i,staticClass:"item"},[s("div",{staticClass:"header"},[s("img",{staticClass:"ava",attrs:{src:e.user.userAvatar}}),t._v(" "),s("h3",{staticClass:"userinfo"},[s("p",{staticClass:"name"},[t._v(t._s(e.user.userName))]),t._v(" "),s("p",{staticClass:"item"},[t._v(t._s(e.comment.replyTime))])])]),t._v(" "),s("div",{staticClass:"contBox"},[s("div",{staticClass:"cont"},[e.child?s("p",{staticClass:"des botline"},[t._v(t._s(e.comment.replies.content))]):t._e(),t._v(" "),s("p",{staticClass:"des"},[t._v(t._s(t._f("commentFliter1")(e)))])]),t._v(" "),s("div",{staticClass:"share",on:{click:function(s){return t.gotoDetail(e.share.id)}}},[e.share.shareImg[0]?s("div",{staticClass:"img-box"},[s("img",{attrs:{src:e.share.shareImg[0]}})]):t._e(),t._v(" "),s("p",{staticClass:"txt"},[t._v(t._s(e.user.userName)+" : "+t._s(e.share.shareContent))])])])])}),0)],1)],1)],1)},staticRenderFns:[]};var f=s("C7Lr")(u,d,!1,function(t){s("sAbL")},"data-v-2198a263",null);e.default=f.exports},sAbL:function(t,e){}});
//# sourceMappingURL=19.77961a0b752f25be7b04.js.map