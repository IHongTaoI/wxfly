import mutations from './mutations'
import actions from './actions'

export default {
  namespaced: true,
  state: {
    showHeader: false,
    headerTxt: "",
  },
  mutations,
  actions
}
