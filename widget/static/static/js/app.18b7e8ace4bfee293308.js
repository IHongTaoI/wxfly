webpackJsonp([9],{"4ml/":function(e,t){},NHnr:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n("7+uW"),r=n("NYxO");a.a.use(r.a);var o=new r.a.Store({state:{ajaxUrl:"http://www.wuxfly.com:2019",routerPathC:[],curRoutePath:"/",platform:{isApicloud:navigator.userAgent.toLowerCase().includes("apicloud"),isWx:navigator.userAgent.toLowerCase().includes("micromessenger"),isIos:navigator.userAgent.match(/(iPhone|iPod|iPad);?/i),isAndroid:navigator.userAgent.match(/android/i),isWeb:!navigator.userAgent.toLowerCase().includes("micromessenger")&&!navigator.userAgent.toLowerCase().includes("apicloud")}},mutations:{setRouterCache:function(e,t){var n=t.isback,a=t.val;n?e.routerPathC.pop():e.routerPathC.push(a)},setRoutePath:function(e,t){e.curRoutePath=t}},getters:{},actions:{},modules:{user:{namespaced:!0,state:{islogin:!1,token:"155114907865244",userId:"155082254078440",userInfo:{country:"中国",province:"广东",city:"深圳",avatarUrl:"https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKuBsgNelD8zG3oIyEm9icHp8xyDW3WYaAtABUHT02mmnlq9CeWDicNl4686PeDicTjG5sImHE0iakAvw/132",openId:"oMWA347ZHjlRQ1KOKtTSKYQMo_gU",nickName:"洪涛"}},mutations:{LOGIN_SUCCESS:function(e,t){e.islogin=!0,e.token=t.h.token,e.userId=t.h.userId;var n=t.d.userInfo;for(var a in n)e.userInfo[a]=n[a]}},actions:{}}}}),i=n("Xxa5"),s=n.n(i),u=n("exGp"),c=n.n(u),l={created:function(){var e=this;return c()(s.a.mark(function t(){var n;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$utils.apiHelper.getShearList();case 2:n=t.sent,console.log(n);case 4:case"end":return t.stop()}},t,e)}))()},name:"App",data:function(){return{enterAnimate:"",leaveAnimate:""}},computed:{routerPathC:function(){return this.$store.state.routerPathC}},watch:{$route:function(e,t){this.$store.commit("setRoutePath",e.path);var n=["/","/read","/message","self"].includes(e.path),a=~this.routerPathC.indexOf(e.path)&&e.path===this.routerPathC[this.routerPathC.length-2];n||a?(this.enterAnimate="animated fadeInLeft",this.leaveAnimate="animated fadeOutRight",this.$store.commit("setRouterCache",{isback:!0})):(this.$store.commit("setRouterCache",{isback:!1,val:e.path}),this.enterAnimate="animated fadeInRight",this.leaveAnimate="animated fadeOutLeft")}}},p={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("transition",{attrs:{"enter-active-class":this.enterAnimate,"leave-active-class":this.leaveAnimate}},[t("router-view",{staticClass:"app-content"})],1)],1)},staticRenderFns:[]};var h=n("VU/8")(l,p,!1,function(e){n("aMwc")},null,null).exports,d=n("/ocq"),f=[{path:"/",component:function(){return n.e(0).then(n.bind(null,"47LJ"))},children:[{path:"/",name:"home",component:function(){return n.e(4).then(n.bind(null,"OC6q"))}},{path:"/read",name:"read",component:function(){return n.e(7).then(n.bind(null,"wfRt"))}},{path:"/message",name:"message",component:function(){return n.e(3).then(n.bind(null,"Fl22"))}},{path:"/self",name:"self",component:function(){return n.e(5).then(n.bind(null,"LWnr"))}}]},{path:"/other/publish",name:"publish",component:function(){return n.e(6).then(n.bind(null,"99Dp"))}},{path:"/login",name:"login",component:function(){return n.e(2).then(n.bind(null,"ktRq"))}},{path:"/register",name:"register",component:function(){return n.e(1).then(n.bind(null,"DVwZ"))}}];a.a.use(d.a);var m=new d.a({scrollBehavior:function(e,t,n){if(e.hash)return{selector:e.hash}},routes:f}),g=n("mtWM"),v=n.n(g);v.a.defaults.baseURL=o.state.ajaxUrl,v.a.defaults.showLoading=!0,v.a.defaults.showErr=!0,v.a.defaults.timeout=1e4;var w,A=function(e){if(a.a.prototype.$toast.clear(),"ECONNABORTED"===e.code&&-1!==e.message.indexOf("timeout"))return e.config.showErr&&a.a.prototype.$notify("请求超时");e.config.showErr&&a.a.prototype.$notify("请求失败")};v.a.interceptors.request.use(function(e){return e.showLoading&&a.a.prototype.$toast.loading({mask:!1,message:"加载中...",duration:0}),e},A),v.a.interceptors.response.use(function(e){return a.a.prototype.$toast.clear(),e},A),a.a.prototype.$post=(w=c()(s.a.mark(function e(t){var n;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v.a.post(t.url,t.data,{showLoading:t.showLoading||!1});case 2:1e4===(n=e.sent).data.code?t.success(n.data):t.error(n.msg);case 4:case"end":return e.stop()}},e,this)})),function(e){return w.apply(this,arguments)});var C=v.a,b=n("Rf8U"),y=n.n(b),P=n("//Fk"),x=n.n(P);var L,k={dateFromat:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n=new Date(e),a=new Date;if(isNaN(n)&&(n=new Date(e.replace(/\\-/g,"/"))),a.getFullYear()===n.getFullYear()){if(a.getMonth()+a.getDate()===n.getMonth()+n.getDate()){var r=Math.floor((a-n)/1e3/60/60),o=Math.floor((a-n)/1e3/60),i=Math.floor((a-n)/1e3);return r<24&&r>0?r+"小时前"+t:r<=0&&o>0?o+"分钟前"+t:o<=0?i>10?i+"秒前"+t:"刚刚":n.getMonth()+1+"-"+n.getDate()}return n.getMonth()+1+"-"+n.getDate()}return n.getFullYear()+"-"+(n.getMonth()+1)+"-"+n.getDate()},getPosition:function(){return new x.a(function(e){navigator.geolocation?navigator.geolocation.getCurrentPosition(function(t){var n=t.coords.latitude,a=t.coords.longitude;e(n,a)}):alert("您的设备不支持定位")})},apiHelper:{getShearList:function(){var e=this;return c()(s.a.mark(function t(){return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v.a.post("/search/share/list",{serviceHeader:{token:"155114907865244",userId:"155082254078440"},serviceBody:{lng:"23.21463",lat:"23.12463",searchType:"2",page:"",pageSize:"1"}});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},t,e)}))()}}},I=n("Fd2+"),R=(n("4ml/"),function(){a.a.use(y.a,C),a.a.use(I.a),a.a.prototype.$utils=k,a.a.config.productionTip=!1,new a.a({el:"#app",router:m,components:{App:h},store:o,template:"<App/>"})});n("Lw6n");o.state.platform.isApicloud?window.apiready=(L=R,api.require("push").bind({userName:"testName",userId:"testId"},function(e,t){e.status?api.alert({msg:"绑定成功"}):api.alert({msg:t.msg})}),void L()):R()},aMwc:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.18b7e8ace4bfee293308.js.map