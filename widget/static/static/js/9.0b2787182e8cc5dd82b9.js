webpackJsonp([9],{"4L8a":function(t,e){},"f+6M":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n("lC5x"),a=n.n(r),i=n("J0Oq"),s=n.n(i),c={methods:{signOut:function(){var t=this;return s()(a.a.mark(function e(){return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.$utils.cookie.delete("token"),e.next=3,t.$apihelper.outLogin();case 3:t.$router.replace({path:"/login"});case 4:case"end":return e.stop()}},e,t)}))()}}},o={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"paddingTopNav",attrs:{id:"self-setting"}},[n("van-nav-bar",{staticClass:"topNavBar",attrs:{title:"设置","left-text":"返回","left-arrow":""},on:{"click-left":function(e){return t.$router.go(-1)}}}),t._v(" "),n("van-cell-group",{staticClass:"mt20"},[n("van-cell",{attrs:{title:"退出","is-link":""},nativeOn:{click:function(e){return t.signOut(e)}}})],1)],1)},staticRenderFns:[]};var l=n("C7Lr")(c,o,!1,function(t){n("4L8a")},"data-v-f11f4702",null);e.default=l.exports}});
//# sourceMappingURL=9.0b2787182e8cc5dd82b9.js.map