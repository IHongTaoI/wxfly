import utils from './../../utils/index'
import global from './../../utils/global-const'

export default {
  namespaced: true,
  state: {
		// 最新的列表
    pageSize: 20,
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
    }
  },
  mutations: {
    setList (state, msg) {
      let { type, isreload, list } = msg
      for (let v of list) {
        v.shareImg = v.shareImg.split(',')
        v.createTime = utils.dateFromat(v.createTime)
      }
      switch (type) {
        case 'newest':
          if (isreload) {
            state.newest.list = list
            state.newest.finished = false
            state.newest.page = global.PAGE
          } else {
            state.newest.list.push(...list)
          }
          state.newest.page++
          if (list.length < 10) {
            state.newest.finished = true
          }
          break
        case 'nearby':
          if (isreload) {
            state.nearby.list = list
            state.nearby.finished = false
            state.nearby.page = global.PAGE
          } else {
            state.nearby.list.push(...list)
          }
          state.nearby.page++
          if (list.length < 10) {
            state.nearby.finished = true
          }
          break
        case 'dynamic':
          if (isreload) {
            state.dynamic.list = list
            state.dynamic.finished = false
            state.dynamic.page = global.PAGE
          } else {
            state.dynamic.list.push(...list)
          }
          state.dynamic.page++
          if (list.length < 10) {
            state.dynamic.finished = true
          }
          break
      }
    },
		// 点赞
    Like (state, msg) {
      let { index, type } = msg
      state[type].list[index].like = true
    }
  },
  actions: {
    async getHomeList ({ commit, state }, msg) {
      let { isreload, type, cb } = msg
      let page, searchType
      switch (type) {
        case 'newest':
          page = state.newest.page
          searchType = '2'
          break
        case 'nearby':
          page = state.nearby.page
          searchType = '1'
          break
        case 'dynamic':
          page = state.dynamic.page
          searchType = '2'
          break
      }
      isreload && (page = global.PAGE)
      let ret = await this._vm.$apihelper.getShearList({
        lng: '0',
        lat: '0',
        searchType,
        page: page + '',
        pageSize: state.pageSize + ''
      })
      if (!ret) return
      commit('setList', {
        type,
        isreload,
        list: ret.d.shareList
      })
      cb && cb()
    }
  }
}
