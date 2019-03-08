import store from './../../vuex/store';

let pauseFn, resumeFn;

// 监听app返回键
const listenerKeyback = function(cb) {
  api.addEventListener(
    {
      name: 'keyback'
    },
    function(ret, err) {
      cb && cb(ret, err);
    }
  );
};

const onPause = function() {
  console.log('进入后台');
  pauseFn && pauseFn();
  pauseFn = null;
};

const onResume = function() {
  console.log('进入前台');
  resumeFn && resumeFn();
  resumeFn = null;
};

const setPause = function(fn) {
  pauseFn = fn;
};

const setResume = function(fn) {
  resumeFn = fn;
};

if (store.state.platform.isWeb) {
  window.onfocus = onResume;
  window.onblur = onPause;
}

// 关闭app
const exitApp = function() {
  api.confirm(
    {
      title: '确定要退出app吗？',
      buttons: ['确定', '取消']
    },
    function(ret, err) {
      var index = ret.buttonIndex;
      if (index == 1) {
        api.closeWidget({
          silent: true
        });
      }
    }
  );
};

// 移除对返回键的监听
const removeListenKeyback = function() {
  api.removeEventListener({ name: 'keyback' });
};

export { exitApp, listenerKeyback, removeListenKeyback, setPause, setResume };

export default function() {
  return {
    listenerKeyback,
    removeListenKeyback,
    exitApp,
    setPause,
    setResume
  };
}
