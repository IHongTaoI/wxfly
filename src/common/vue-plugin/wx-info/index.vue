<template>
  <div class="wx-info">
    <div class="mask" v-show="show"></div>
    <div class="wrap" v-show="show">用户信息</div>
  </div>
</template>
<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
