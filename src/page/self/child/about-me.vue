<template>
  <div class="about-me paddingTopNav">
    <van-nav-bar
      title="关于我们"
      left-text="我的"
      left-arrow
      @click-left="$router.go(-1)"
      class="topNavBar"
    />
    <div class="logoBox">
      <img src="./../../../assets/images/logo108.png" class="logo">
      <p class="des">v 1.0</p>
    </div>
    <h3 class="tips">加入我们</h3>
    <img src="./../../../assets/images/aboutme-qqrcode.jpg" class="qrcode">
  </div>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
.about-me {
  .logoBox {
    width: 100px;
    height: 140px;
    margin: 74px auto 110px;
    .logo {
      width: 100px;
      height: 100px;
    }
    .des {
      text-align: center;
      font-size: 15px;
      line-height: 40px;
      color: #333;
    }
  }
  .tips {
    font-size: 18px;
    color: #666;
    text-align: center;
  }
  .qrcode {
    width: 60%;
    display: block;
    margin: 20px auto;
    border-radius: 15px;
  }
}
</style>
