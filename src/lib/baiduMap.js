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
            lng: parseInt(r.point.lng),
            lat: parseInt(r.point.lat)
          }
          console.log(r)
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
    store.state.user.hasLatLng = true
    store.state.user.lat = ret.lat
    store.state.user.lng = ret.lng
    store.commit('homeList/updateList')
  })
  return {
    getPosition
  }
}
