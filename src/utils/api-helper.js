import axios from 'axios'

export default {
  async getShearList() {
    return await axios.post("/search/share/list", {
      "serviceHeader": {
        "token": "155114907865244",
        "userId": "155082254078440"
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
