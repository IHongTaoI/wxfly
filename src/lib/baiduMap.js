import store from '../vuex/store'

export default function () {
  var baiduDIV = document.createElement('div')
  var map = new BMap.Map(baiduDIV)
  var point = new BMap.Point(116.331398, 39.897445)
  map.centerAndZoom(point, 12)
  var geolocation = new BMap.Geolocation()

  function getPosition () {
    return new Promise((resolve, reject) => {
      geolocation.getCurrentPosition(function (r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          let pos = {
            lng: r.point.lng,
            lat: r.point.lat
          }
          store.commit('user/UPDATE_LOCATION', pos)
          resolve(pos)
        } else {
          resolve(false)
        }
      })
    })
  }

  getPosition().then(ret => {
    if (!ret) console.log('获取地理位置失败')
    console.log('获取地理位置成功', ret)
    store.commit('user/UPDATE_LOCATION', ret)
    store.commit('listHelper/updateList')
  })
  return {
    getPosition
  }
}
