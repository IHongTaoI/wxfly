webpackJsonp([13],{YOos:function(e,t){},"wc/q":function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=s("4YfN"),a=s.n(r),n=s("lC5x"),o=s.n(n),i=s("J0Oq"),u=s.n(i),c=s("R4Sj"),d={created:function(){console.log(this.$route),this.setChatId()},data:function(){return{username:this.$route.params.username,userId:this.$route.params.userId,userAvatar:this.$route.params.userava,conversationID:"",msg:""}},methods:{sendDialogMsg:function(){var e=this;return u()(o.a.mark(function t(){return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$apihelper.sendSocketMsg("CHAT",{userId:e.userId,text:e.msg},e.conversationID);case 2:t.sent,e.$store.commit("message/updateMsg",{conversationID:e.conversationID,fromUser:{id:e.userId,userName:e.username,userAvatar:e.userAvatar},msg:e.msg}),e.msg="";case 5:case"end":return t.stop()}},t,e)}))()},setChatId:function(){var e=this;return u()(o.a.mark(function t(){var s,r,a;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(s=e.$utils.global.msgChatIdMap,r=s.get(e.userId)){t.next=8;break}return t.next=5,e.$apihelper.setChatId(e.$store.state.user.userId,e.userId);case 5:a=t.sent,s.set(e.userId,a.d.conversationID),r=a.d.conversationID;case 8:e.conversationID=r;case 9:case"end":return t.stop()}},t,e)}))()}},computed:a()({},Object(c.c)("message",["dialogList"]),{msgInfo:function(){var e=this,t=this.dialogList.find(function(t){return t.userId===e.userId});return t&&t.msgList||[]}})},l={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"paddingTopNav",attrs:{id:"dialog"}},[s("van-nav-bar",{staticClass:"topNavBar",attrs:{title:e.username,"left-text":"返回","left-arrow":""},on:{"click-left":function(t){return e.$router.go(-1)}}}),e._v(" "),s("div",{staticClass:"conte"},e._l(e.msgInfo,function(t,r){return s("p",{key:r},[e._v(e._s(t))])}),0),e._v(" "),s("div",{staticClass:"footer"},[s("van-field",{model:{value:e.msg,callback:function(t){e.msg=t},expression:"msg"}}),e._v(" "),s("van-button",{staticClass:"btn",attrs:{type:"info"},on:{click:e.sendDialogMsg}},[e._v("发送")])],1)],1)},staticRenderFns:[]};var v=s("C7Lr")(d,l,!1,function(e){s("YOos")},"data-v-728778d0",null);t.default=v.exports}});
//# sourceMappingURL=13.ba15378337c174e0de95.js.map