import Vue from 'vue';
import store from './../vuex/store';
import utils from './index';

function connection() {
  let token = utils.getCookiesUserinfo().h.token;
  return new WebSocket(`ws://134.175.16.212:2019/webSocket?token=${token}`);
}

const sendMsg = function(ws) {
  return {
    // 点赞scoket
    like(token) {
      let msg = {
        token,
        message: 'like'
      };
      ws.send(JSON.stringify(msg));
    }
  };
};

export default async function() {
  var ws;
  ws = connection();
  ws.onopen = function() {
    console.log('socket已经连接');
  };

  ws.onclose = function() {
    console.log('socket断开');
  };
  ws.onerror = function() {
    setTimeout(() => {
      connection();
    }, 2000);
  };

  ws.onmessage = function(evt) {
    let data = evt.data;
    switch (data) {
      case 'like':
        // 点赞消息
        Vue.prototype.$notify({
          message: '有人给你点赞了',
          duration: 2000,
          className: 'notify',
          background: '#1989fa'
        });
        break;

      default:
        break;
    }
  };
  Vue.prototype.$wsHelper = sendMsg(ws);
  return ws;
}
