export default {
  showHeader(state, msg) {
    state.showHeader = true;
    state.headerTxt = msg;
  },
  hideHeader(state) {
    state.showHeader = false;
  }
};
