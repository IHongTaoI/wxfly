webpackJsonp([10],{"a+Qi":function(e,t){},kL0G:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=s("lC5x"),i=s.n(a),r=s("HzJ8"),n=s.n(r),l=s("IHPB"),c=s.n(l),o=s("J0Oq"),p=s.n(o),u=s("VAi0"),d=s("NmBu"),h={components:{replyList:u.a,replyEditBox:d.a},data:function(){return{loading:!1,showReplyBox:!1,finished:!1,tearPlaTxt:"发表评论",page:0,pageSize:20,reList:[],cacheObj:{},isReplayChild:!1,shareId:this.$route.query.shareId,cIndex:-1,pIndex:-1}},methods:{getList:function(){var e=this,t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];return p()(i.a.mark(function s(){var a,r,l,o,p,u,d,h,v,f;return i.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return a=e.$route.query.shareId,s.next=3,e.$apihelper.shareReplyAll({shareId:a,page:e.page,pageSize:e.pageSize});case 3:if(r=s.sent,e.loading=!1,r){s.next=7;break}return s.abrupt("return");case 7:for(e.page++,(l=r.d.replies).length<e.pageSize&&(e.finished=!0),o=!0,p=!1,u=void 0,s.prev=13,d=n()(l);!(o=(h=d.next()).done);o=!0)(v=h.value).replyTime=e.$utils.dateFromat(v.replyTime);s.next=21;break;case 17:s.prev=17,s.t0=s.catch(13),p=!0,u=s.t0;case 21:s.prev=21,s.prev=22,!o&&d.return&&d.return();case 24:if(s.prev=24,!p){s.next=27;break}throw u;case 27:return s.finish(24);case 28:return s.finish(21);case 29:t?(e.page=0,e.reList=l):(f=e.reList).push.apply(f,c()(l));case 30:case"end":return s.stop()}},s,e,[[13,17,21,29],[22,,24,28]])}))()},likeClick:function(e){var t=this;return p()(i.a.mark(function s(){var a,r;return i.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:if(!t.reList[e].parse){s.next=2;break}return s.abrupt("return");case 2:return t.reList[e].parse=!0,t.reList[e].praseCount+=1,a=t.reList[e].id,r=t.reList[e].userId,s.next=7,t.$apihelper.parseLikeReplay({shareId:t.shareId,praseUserId:r,commentId:a,type:"A"});case 7:s.sent;case 8:case"end":return s.stop()}},s,t)}))()},replyChildBtn:function(e){var t=e.item,s=e.pIndex,a=e.cIndex;this.cIndex=a,this.pIndex=s,this.isReplayChild=!0,this.tearPlaTxt="回复"+t.userName,this.showReplyBox=!0,this.cacheObj={commentId:this.reList[s].id,shareId:this.shareId,replyUserId:t.userId,replyId:t.id}},hidereplyBox:function(){this.showReplyBox=!1,this.textareaBlur()},removeReply:function(e){var t=e.cIndex,s=e.pIndex,a=!1;s<10&&(a=!0);var i=this.$utils.cache.shardDetailVue;~t?(a&&i&&i.replyList[s].replies.splice(t,1),this.reList[s].replies.splice(t,1)):(this.reList.splice(s,1),a&&i&&i.replyList.splice(s,1))},textareaBlur:function(){this.isReplayChild=!1,this.tearPlaTxt="发表评论"},sumbitReplay:function(e){var t=this;return p()(i.a.mark(function s(){var a,r,n,l;return i.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:if(t.cacheObj.content=e,!t.isReplayChild){s.next=12;break}return s.next=4,t.$apihelper.shareReplyArticleChild(t.cacheObj);case 4:a=s.sent,console.log("回复二级评论",a),r=t.reList[t.pIndex],(n=t.reList[t.pIndex].replies).length>=2?r.replyCount+=1:(a.d.replyTime=t.$utils.dateFromat(a.d.replyTime),a.d.userName=t.$store.state.user.userInfo.userName,n.push(a.d)),t.hidereplyBox(),s.next=21;break;case 12:return s.next=14,t.$apihelper.shareReplyArticle(t.cacheObj);case 14:l=s.sent,console.log("回复楼主",l),l.d.replyTime=t.$utils.dateFromat(l.d.replyTime),l.d.userAvatar=t.$store.state.user.userInfo.userAvatar,l.d.userName=t.$store.state.user.userInfo.userName,t.reList.push(l.d),t.hidereplyBox();case 21:case"end":return s.stop()}},s,t)}))()},handlerClick:function(e){var t=this;return{replyBtn:function(){t.showReplyBox=!0,t.cacheObj={shareId:t.shareId}}}[e]()},onLoad:function(){this.getList(!1)}}},v={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"more-replay"},[s("div",{staticClass:"more-pos"},[s("div",{staticClass:"more-wrap paddingTopNav"},[s("van-nav-bar",{staticClass:"topNavBar",attrs:{title:"评论列表","left-text":"返回","left-arrow":""},on:{"click-left":function(t){return e.$router.back()}}}),e._v(" "),s("van-list",{attrs:{finished:e.finished,"finished-text":"没有更多了"},on:{load:e.onLoad},model:{value:e.loading,callback:function(t){e.loading=t},expression:"loading"}},e._l(e.reList,function(t,a){return s("replyList",{key:a,attrs:{reItem:t,index:a,goType:"mc"},on:{btnClick:e.replyChildBtn,likeClick:e.likeClick,removeReply:e.removeReply}})}),1),e._v(" "),s("replyEditBox",{attrs:{tearPlaTxt:e.tearPlaTxt},on:{"on-submit":e.sumbitReplay},model:{value:e.showReplyBox,callback:function(t){e.showReplyBox=t},expression:"showReplyBox"}}),e._v(" "),s("div",{staticClass:"action-list"},[s("div",{staticClass:"edit",on:{click:function(t){return e.handlerClick("replyBtn")}}},[s("span",{staticClass:"iconfont icon-bianji",staticStyle:{"font-size":"20px"}}),e._v(" "),s("span",[e._v("写评论")])]),e._v(" "),e._m(0),e._v(" "),e._m(1),e._v(" "),e._m(2)]),e._v(" "),s("transition",{attrs:{"enter-active-class":"animated fadeInRight","leave-active-class":"animated fadeOutRight"}},[s("router-view",{staticClass:"app-content",staticStyle:{"z-index":"99"}})],1)],1)])])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"action-item"},[t("p",{staticClass:"iconfont icon-xihuancon"}),this._v(" "),t("p",{staticClass:"txt"},[this._v("1")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"action-item"},[t("p",{staticClass:"iconfont icon-pinglun"}),this._v(" "),t("p",{staticClass:"txt"},[this._v("1")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"action-item"},[t("p",{staticClass:"iconfont icon-zhuanfa"}),this._v(" "),t("p",{staticClass:"txt"},[this._v("1")])])}]};var f=s("C7Lr")(h,v,!1,function(e){s("a+Qi")},"data-v-9cda09a2",null);t.default=f.exports}});
//# sourceMappingURL=10.b29ba3d0b54162d6c20c.js.map