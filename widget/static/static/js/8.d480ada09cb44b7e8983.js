webpackJsonp([8],{"6SpP":function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("HzJ8"),i=s.n(a),n=s("IHPB"),o=s.n(n),c=s("lC5x"),r=s.n(c),l=s("J0Oq"),u=s.n(l),h={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"list-item"},[s("div",{staticClass:"header"},[s("div",{staticClass:"info"},[s("img",{staticClass:"userava",attrs:{src:t.item.shareUserAvatar}}),t._v(" "),s("div",{staticClass:"titles"},[s("p",{staticClass:"username"},[t._v(t._s(t.item.shareUserName))]),t._v(" "),s("p",{staticClass:"time"},[t._v(t._s(t.item.createTime))])])]),t._v(" "),s("div",{staticClass:"opt",on:{click:function(e){return e.stopPropagation(),t.caozuo(t.item.id,t.index)}}},[s("span",{staticClass:"iconfont icon-caozuo"})])]),t._v(" "),s("div",{staticClass:"content"},[t.item.shareImg&&t.item.shareImg.length?s("div",{staticClass:"imgs"},[s("div",{class:["pic_item"]},[s("img",{staticClass:"pic",attrs:{mode:"aspectFill",src:t.item.shareImg[0]}})])]):t._e(),t._v(" "),s("p",{staticClass:"shareContent"},[t._v(t._s(t.item.shareContent))])])])},staticRenderFns:[]};var d={created:function(){this.getList(!1)},components:{clectItem:s("C7Lr")({props:["item"],methods:{caozuo:function(t,e){this.$emit("caozuo",t,e)}}},h,!1,function(t){s("KzEN")},"data-v-5e5b580c",null).exports},data:function(){return{list:[],showActionsheetL:!1,loading:!1,isLoading:!1,finished:!1,page:0,pageSize:30,cacheCollectId:-1,actions:[{name:"取消收藏"}],caozuoIndex:-1}},methods:{onLoad:function(){this.loading||this.finished||(console.log("底部"),this.getList(!1))},onRefresh:function(){this.getList()},caozuo:function(t,e){this.caozuoIndex=e,this.cacheCollectId=t,this.showActionsheetL=!0},onSelect:function(){var t=this;return u()(r.a.mark(function e(){return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$apihelper.delectCollection({collectId:t.cacheCollectId});case 2:if(e.sent){e.next=5;break}return e.abrupt("return");case 5:t.list.splice(t.caozuoIndex,1),t.$toast.success("取消收藏成功"),t.showActionsheetL=!1;case 8:case"end":return e.stop()}},e,t)}))()},getList:function(){var t=this,e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];return u()(r.a.mark(function s(){var a,n,c,l,u,h,d,p,v,f;return r.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return t.loading=!0,e&&(t.page=0),s.next=4,t.$apihelper.getCollectionList({page:t.page,pageSize:t.pageSize});case 4:if(n=s.sent,t.isLoading=!1,n){s.next=8;break}return s.abrupt("return");case 8:for(t.page++,t.loading=!1,(c=n.d.collectList).length<t.pageSize&&(t.finished=!0),l=!0,u=!1,h=void 0,s.prev=15,d=i()(c);!(l=(p=d.next()).done);l=!0)v=p.value,f=[],v.shareImg?(v.height="140px",f=v.shareImg.split(",")):v.height="95px",v.createTime=t.$utils.dateFromat(v.createTime),v.shareImg=f;s.next=23;break;case 19:s.prev=19,s.t0=s.catch(15),u=!0,h=s.t0;case 23:s.prev=23,s.prev=24,!l&&d.return&&d.return();case 26:if(s.prev=26,!u){s.next=29;break}throw h;case 29:return s.finish(26);case 30:return s.finish(23);case 31:e?t.list=c:(a=t.list).push.apply(a,o()(c));case 32:case"end":return s.stop()}},s,t,[[15,19,23,31],[24,,26,30]])}))()},gotoDetail:function(t){this.$router.push({path:"/home/shardDetail",query:{id:t}})}}},p={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"my-collection-wrap paddingTopNav"},[s("van-nav-bar",{staticClass:"topNavBar",attrs:{title:"我的收藏","left-text":"返回","left-arrow":""},on:{"click-left":function(e){return t.$router.go(-1)}}}),t._v(" "),s("auto-virtual-list",{ref:"scrollBox",staticStyle:{width:"100%",height:"100%"},on:{tobottom:t.onLoad}},[t._l(t.list,function(e,a){return s("clectItem",{key:a,style:{height:e.height},attrs:{item:e},on:{caozuo:t.caozuo},nativeOn:{click:function(s){return t.gotoDetail(e.shareId)}}})}),t._v(" "),s("p",{staticClass:"nomore"},[t._v(t._s(t.finished?"暂无更多":"加载中..."))])],2),t._v(" "),s("van-actionsheet",{attrs:{actions:t.actions,"cancel-text":"取消"},on:{select:t.onSelect},model:{value:t.showActionsheetL,callback:function(e){t.showActionsheetL=e},expression:"showActionsheetL"}})],1)},staticRenderFns:[]};var v=s("C7Lr")(d,p,!1,function(t){s("Tz8f")},"data-v-1782eb8e",null);e.default=v.exports},KzEN:function(t,e){},Tz8f:function(t,e){}});
//# sourceMappingURL=8.d480ada09cb44b7e8983.js.map