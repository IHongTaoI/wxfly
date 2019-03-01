<template>
  <div id="wx-nav">
    <nav class="wx-nav-box">
      <router-link to="/" tag="dl" exact replace>
        <!-- <dt class="iconfont icon-weixin-hongbaohome">
          <i class="new-msg-count" v-show="$store.state.newMsgCount">{{$store.state.newMsgCount}}</i>
        </dt>-->
        <dd>广场</dd>
      </router-link>
    </nav>
  </div>
</template>
<script>
export default {}
</script>
<style lang="less" scoped>
#wx-nav {
  nav {
    display: flex;
    width: 100%;
    overflow: hidden;
    height: 50px;
    padding-top: 5px;
    background: #f9f9f9;
    font-size: 12px;
    dl {
      cursor: pointer;
      user-select: none;
      flex-grow: 1;
      text-align: center;
      line-height: 1;
      &.router-link-active {
        dd,
        dt {
          color: #0bb908;
        }
      }
    }
    dt {
      position: relative;
      width: 28px;
      height: 28px;
      margin: 0 auto;
      font-size: 28px;
      color: #797979;
      margin-bottom: 2px;
    }
  }
  dd {
    color: #929292;
    transform-origin: 50% 0;
    transform: scale(0.9);
  }
}
</style>
