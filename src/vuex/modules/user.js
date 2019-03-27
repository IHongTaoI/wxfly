import { cookie } from './../../utils/index';

export default {
  namespaced: true,
  state: {
    islogin: false, // 是否登录
    token: cookie.get('token'), // 请求用的token 155114907865244
    userId: '', // 请求头的userId  155082254078440
    hasLatLng: false, //是否获取了经纬度
    lat: '',
    lng: '',
    userInfo: {
      // 用户信息
      country: '中国',
      province: '广东',
      city: '深圳',
      userMail: '',
      userAvatar:
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551893841562&di=345411edc20bb9c87203881672904900&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F01%2F31%2F87%2F96573b585a7c9c4.jpg',
      userName: '洪涛',
      gender: '0',
      addRess: ''
    }
  },
  mutations: {
    LOGIN_SUCCESS(state, msg) {
      state.islogin = true;
      // 需要每一个对象进行遍历
      for (let i in msg) {
        i === 'id' && (state.userId = msg[i]);
        state.userInfo[i] = msg[i];
      }
    },
    // 更新用户信息
    UPDATE_USERDATA(state, msg) {
      for (let i in msg) {
        i === 'id' && (state.userId = msg[i]);
        state.userInfo[i] = msg[i];
      }
    },
    // 更新地理位置
    UPDATE_LOCATION(state, msg) {
      state.lat = msg.lat;
      state.lng = msg.lng;
      state.hasLatLng = true;
    }
  },
  actions: {
    async login_success({ commit }, token) {
      let loginRet = await this._vm.$apihelper.getUserInfo(token);
      commit('LOGIN_SUCCESS', loginRet.d);
    }
  }
};
