<template>
  <div id="wx-nav">
    <router-link to="/home" tag="div" replace class="item">
      <div class="flexBox">
        <div class="imgbox">
          <img class="svg" src="./../../assets/images/icon/index.png" v-show="index !== '/home'">
          <img class="svg" src="./../../assets/images/icon/indexSelect.png" v-show="index === '/home'">
        </div>
        <p class="txt">广场</p>
      </div>
    </router-link>
    <router-link to="/read" tag="div" class="item">
      <div class="flexBox">
        <div class="imgbox">
          <img
            class="svg"
            src="./../../assets/images/icon/shehui_new.png"
            v-show="index !== '/read'"
          >
          <img
            class="svg"
            src="./../../assets/images/icon/shehuihover.png"
            v-show="index === '/read'"
          >
        </div>
        <p class="txt">阅读</p>
      </div>
    </router-link>
    <router-link to="/other/publish" tag="div" class="item">
      <div class="flexBox addS">
        <div class="imgbox addS">
          <img class="svg" src="./../../assets/images/icon/newadd.png">
        </div>
      </div>
    </router-link>
    <router-link to="/message" tag="div" class="item">
      <div class="flexBox">
        <div class="imgbox">
          <img
            class="svg"
            src="./../../assets/images/icon/message.png"
            v-show="index !== '/message'"
          >
          <img
            class="svg"
            src="./../../assets/images/icon/messageSelect.png"
            v-show="index === '/message'"
          >
        </div>
        <p class="txt">消息</p>
      </div>
    </router-link>
    <router-link to="/self" tag="div" class="item">
      <div class="flexBox">
        <div class="imgbox">
          <img class="svg" src="./../../assets/images/icon/mine.png" v-show="index !== '/self'">
          <img
            class="svg"
            src="./../../assets/images/icon/mineSelect.png"
            v-show="index === '/self'"
          >
        </div>
        <p class="txt">我的</p>
      </div>
    </router-link>
  </div>
</template>
<script>
export default {
  props: ["acIndex"],
  data() {
    return {};
  },
  computed: {
    index() {
      return this.$store.state.curRoutePath;
    }
  }
};
</script>

<style lang="less" scoped>
#wx-nav {
  position: fixed;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 66px;
  background: #fff;
  bottom: 0;
  left: 0;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);

  .item {
    position: relative;
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    .flexBox {
      &.addS {
        position: absolute;
        left: 50%;
        top: -15px;
        transform: translateX(-50%);
      }
    }
    .imgbox {
      width: 30px;
      height: 30px;
      margin: 0 auto 4px;

      &.addS {
        width: 70px;
        height: 70px;
      }
      .svg {
        width: 100%;
        height: 100%;
      }
    }
    .txt {
      font-size: 14px;
    }
    &.active {
      color: #333;
    }
  }

  .tabbar_icon {
    width: 50px;
    height: 50px;
    margin: 0 auto;
  }
}
</style>
