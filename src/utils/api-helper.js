import store from './../vuex/store'
import {
  post
} from './../lib/http'

export default {
  async getShearList() {
    return await post({
      url: "/search/share/list",
      data: {
        "lng": "23.21463",
        "lat": "23.12463",
        "searchType": "2",
        "page": "",
        "pageSize": "1"
      }
    })
  },
  async getShardDetail(id) {
    return await post({
      url: "/user/share/init",
      data: {
        "shareId": id
      }
    })
  },
  async shareReplyAll(data) {
    return await post({
      url: "/user/share/reply/all",
      data
    })
  }
}
