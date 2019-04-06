<template>
  <div class="paddingTopNav iframeBox">
    <van-nav-bar
      :title="title"
      left-text="返回"
      left-arrow
      @click-left="$router.replace({path: '/read'})"
      class="topNavBar"
    />
    <iframe :src="src" frameborder="0" class="iframe"></iframe>
  </div>
</template>
<script>
export default {
  data() {
    return {
      src: this.$route.query.src,
      title: this.$route.query.title
    };
  }
};
</script>
<style lang="less" scoped>
.iframeBox {
  .iframe {
    width: 100%;
    height: 100%;
  }
}
</style>
