import Vue from 'vue';
import utils from './index';

function connection() {
  let userId = utils.cookie.get('userId');
  return new WebSocket(`ws://134.175.16.212:8764/webSocket?userId=${userId}`);
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

function initSocket() {
  var ws;
  ws = connection();
  ws.onopen = function() {
    console.log('socket已经连接');
  };

  ws.onclose = function() {
    setTimeout(() => {
      console.log('socket断开,尝试重连');
      initSocket();
    }, 3000);
  };
  ws.onerror = function() {
    setTimeout(() => {
      connection();
    }, 2000);
  };

  ws.onmessage = function(evt) {
    let data = evt.data;
    console.log(JSON.parse(evt.data));
    Vue.prototype.$notify({
      message: evt.data,
      duration: 2000,
      className: 'notify',
      background: '#1989fa'
    });
    let retFn = {
      like() {
        // 点赞消息
      }
    };
    retFn[data] && retFn[data]();
  };
  Vue.prototype.$wsHelper = sendMsg(ws);
}

export default async function() {
  initSocket();
}
