webpackJsonp([16],{"1XcT":function(e,t){},"wc/q":function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=s("4YfN"),r=s.n(a),n=s("lC5x"),o=s.n(n),i=s("J0Oq"),u=s.n(i),c=s("R4Sj"),d={created:function(){console.log(this.$route),this.setChatId()},beforeRouteLeave:function(e,t,s){this.$store.commit("message/setSeesionId",-1),s()},data:function(){return{username:this.$route.params.username,userId:this.$route.params.userId,userAvatar:this.$route.params.userava,meUid:this.$store.state.user.userId,conversationID:"",msg:""}},methods:{sendDialogMsg:function(){var e=this;return u()(o.a.mark(function t(){var s;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(s={conversationID:e.conversationID,info:{ava:e.userAvatar,name:e.username},meId:e.meUid,toId:e.userId,msg:{text:e.msg,userid:e.meUid}},!e.$store.state.isMock){t.next=6;break}return console.log(s,"sendData"),e.$store.commit("message/updateMsg",s),e.msg="",t.abrupt("return");case 6:return t.next=8,e.$apihelper.sendSocketMsg("CHAT",{userId:e.userId,text:e.msg},e.conversationID);case 8:t.sent,s={conversationID:e.conversationID,info:{ava:e.userAvatar,name:e.username},meId:e.meUid,toId:e.userId,msg:{text:e.msg,userid:e.meUid}},e.$store.commit("message/updateMsg",s),e.msg="";case 12:case"end":return t.stop()}},t,e)}))()},setChatId:function(){var e=this;return u()(o.a.mark(function t(){var s,a,r;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(s=e.$utils.global.msgChatIdMap,a=s.get(e.userId)){t.next=8;break}return t.next=5,e.$apihelper.setChatId(e.$store.state.user.userId,e.userId);case 5:r=t.sent,s.set(e.userId,r.d.conversationID),a=r.d.conversationID;case 8:e.conversationID=a,e.$store.commit("message/setSeesionId",a);case 10:case"end":return t.stop()}},t,e)}))()},userAva:function(e){return e.userid===this.meUid?this.$store.state.user.userInfo.userAvatar:this.userAvatar}},computed:r()({},Object(c.c)("message",["dialogList"]),{msgInfo:function(){var e=this,t=this.dialogList.find(function(t){return t.conversationID===e.conversationID});return t&&t.msgList||[]}})},m={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"paddingTopNav",attrs:{id:"dialog"}},[s("van-nav-bar",{staticClass:"topNavBar",attrs:{title:e.username,"left-text":"返回","left-arrow":""},on:{"click-left":function(t){return e.$router.go(-1)}}}),e._v(" "),s("ul",{staticClass:"conte"},e._l(e.msgInfo,function(t,a){return s("li",{key:a,staticClass:"itemBox",class:{isMe:t.userid===e.meUid}},[s("img",{staticClass:"userava",attrs:{src:e.userAva(t)}}),e._v(" "),s("p",{staticClass:"text"},[e._v(e._s(t.text))])])}),0),e._v(" "),s("div",{staticClass:"footer"},[s("van-field",{model:{value:e.msg,callback:function(t){e.msg=t},expression:"msg"}}),e._v(" "),s("van-button",{staticClass:"btn",attrs:{type:"info"},on:{click:e.sendDialogMsg}},[e._v("发送")])],1)],1)},staticRenderFns:[]};var v=s("C7Lr")(d,m,!1,function(e){s("1XcT")},"data-v-3144df79",null);t.default=v.exports}});
//# sourceMappingURL=16.4ef4becbd0c9ea29db68.js.map