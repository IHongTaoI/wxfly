webpackJsonp([11],{"f+6M":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n("lC5x"),a=n.n(r),s=n("J0Oq"),i=n.n(s),l={methods:{signOut:function(){var t=this;return i()(a.a.mark(function e(){return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.$utils.cookie.delete("seesionuser"),localStorage.setItem("seesionuser",""),e.next=4,t.$apihelper.outLogin();case 4:t.$router.replace({path:"/login"});case 5:case"end":return e.stop()}},e,t)}))()}}},o={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"paddingTopNav",attrs:{id:"self-setting"}},[n("van-nav-bar",{staticClass:"topNavBar",attrs:{title:"设置","left-text":"返回","left-arrow":""},on:{"click-left":function(e){return t.$router.go(-1)}}}),t._v(" "),n("van-cell-group",{staticClass:"mt20"},[n("van-cell",{attrs:{title:"退出","is-link":""},nativeOn:{click:function(e){return t.signOut(e)}}})],1)],1)},staticRenderFns:[]};var c=n("C7Lr")(l,o,!1,function(t){n("lifg")},"data-v-77837396",null);e.default=c.exports},lifg:function(t,e){}});
//# sourceMappingURL=11.8f025e9c25a4106b7ffe.js.map