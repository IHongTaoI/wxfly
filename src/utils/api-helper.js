import axios from 'axios'
import store from './../vuex/store'

export default {
  async getShearList() {
    return await axios.post("/search/share/list", {
      "serviceHeader": {
        "token": store.state.user.token,
        "userId": store.state.user.userId
      },
      "serviceBody": {
        "lng": "23.21463",
        "lat": "23.12463",
        "searchType": "2",
        "page": "",
        "pageSize": "1"
      }
    })
  }
}
