import utils from './../../utils/index';
import global from './../../utils/global-const';
import vue from 'vue'

export default {
  namespaced: true,
  state: {
    // 最新的列表
    pageSize: 20,
    activeType: 'newest', // 活动type
    newest: {
      list: [],
      page: global.PAGE,
      finished: false
    },
    // 附近的列表
    nearby: {
      list: [],
      page: global.PAGE,
      finished: false
    },
    // 动态列表
    dynamic: {
      list: [],
      page: global.PAGE,
      finished: false
    },
    // 回复消息列表
    replyMeList: {
      page: global.PAGE,
      pageSize: 20,
      finished: false,
      list: []
    }
  },
  mutations: {
    setList(state, msg) {
      let { type, isreload, list } = msg;
      for (let v of list) {
        v.shareImg = v.shareImg.split(',');
        v.createTime = utils.dateFromat(v.createTime);
        v.distance = utils.getGreatCircleDistance(v.shareLat, v.shareLng)
        v.distance = window.vueObj.$options.filters["distanceFromat"](v.distance)
      }
      switch (type) {
        case 'newest':
          if (isreload) {
            state.newest.list = list;
            state.newest.finished = false;
            state.newest.page = global.PAGE;
          } else {
            state.newest.list.push(...list);
          }
          state.newest.page++;
          if (list.length < 10) {
            state.newest.finished = true;
          }
          break;
        case 'nearby':
          if (isreload) {
            state.nearby.list = list;
            state.nearby.finished = false;
            state.nearby.page = global.PAGE;
          } else {
            state.nearby.list.push(...list);
          }
          state.nearby.page++;
          if (list.length < 10) {
            state.nearby.finished = true;
          }
          break;
        case 'dynamic':
          if (isreload) {
            state.dynamic.list = list;
            state.dynamic.finished = false;
            state.dynamic.page = global.PAGE;
          } else {
            state.dynamic.list.push(...list);
          }
          state.dynamic.page++;
          if (list.length < 10) {
            state.dynamic.finished = true;
          }
          break;
      }
    },
    // 点赞
    Like(state, msg) {
      let { index, type } = msg;
      state[type].list[index].parse = true;
      state[type].list[index].shareLikeCount += 1;
    },
    setReplyMeList(state, msg) {
      let { isreload, list } = msg;

      if (isreload) {
        state.replyMeList.page = 0;
        state.replyMeList.finished = false;
        state.replyMeList.list = list;
      } else {
        state.replyMeList.page++;
        state.replyMeList.list.push(...list);
      }
      if (list.length < state.replyMeList.pageSize) {
        state.replyMeList.finished = true;
      }
    },
    // 获取完位置之后要刷新列表的地理位置
    updateList(state) {
      let forArr = ['nearby', 'dynamic', 'newest']
      for(let key of forArr) {
        for(let v of state[key].list) {
          v.distance = utils.getGreatCircleDistance(v.shareLat, v.shareLng)
          v.distance = window.vueObj.$options.filters["distanceFromat"](v.distance)
        }
      }
    }
  },
  actions: {
    async getHomeList({ commit, state }, msg) {
      let { isreload, type, cb } = msg;
      let page, searchType;
      switch (type) {
        case 'newest':
          page = state.newest.page;
          searchType = '2';
          break;
        case 'nearby':
          page = state.nearby.page;
          searchType = '1';
          break;
        case 'dynamic':
          page = state.dynamic.page;
          searchType = '2';
          break;
      }
      isreload && (page = global.PAGE);
      let ret = await this._vm.$apihelper.getShearList({
        lng: this.state.user.lng + '',
        lat: this.state.user.lat + '',
        searchType,
        page: page + '',
        pageSize: state.pageSize + ''
      });
      if (!ret) return;
      commit('setList', {
        type,
        isreload,
        list: ret.d.shareList
      });
      cb && cb();
    },
    async replyMeList({ commit, state }, msg) {
      let { isreload, cb } = msg;
      let ret = await this._vm.$apihelper.getReplyMeList({
        page: state.replyMeList.page + '',
        pageSize: state.replyMeList.pageSize + ''
      });
      if (!ret) return;
      for (let v of ret.d.replyList) {
        v.share.shareImg = v.share.shareImg.split(',');
        v.comment.replyTime = this._vm.$utils.dateFromat(v.comment.replyTime);
      }
      commit('setReplyMeList', {
        isreload,
        list: ret.d.replyList
      });
      cb && cb();
    }
  }
};
