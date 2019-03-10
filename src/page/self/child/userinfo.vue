<template>
  <div class="paddingTopNav">
    <van-nav-bar title="用户信息" left-arrow @click-left="$router.go(-1)" class="topNavBar"/>
    <van-cell-group class="mt20">
      <van-cell title="头像" is-link></van-cell>
    </van-cell-group>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
</style>
