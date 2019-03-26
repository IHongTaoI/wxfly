<template>
  <div class="paddingTopNav userinfo">
    <van-nav-bar title="用户信息" left-arrow @click-left="$router.go(-1)" class="topNavBar"/>
    <van-cell-group>
      <van-cell
        is-link
        :to="{name: 'userinfoModify',params: {
          type: 'userAvatar'
        }}"
      >
        <p slot="title" class="avatxt">头像</p>
        <div slot="right-icon" class="cell-ava">
          <img :src="$store.state.user.userInfo.userAvatar" class="userava vtmiddle">
          <van-icon name="arrow" class="vtmiddle"/>
        </div>
      </van-cell>
      <van-cell
        is-link
        title="昵称"
        :value="$store.state.user.userInfo.userName"
        :to="{name: 'userinfoModify',params: {
          type: 'nikename'
        }}"
      ></van-cell>
      <van-cell
        is-link
        title="性别"
        :value="$store.state.user.userInfo.gender === '1' ? '女' : '男'"
        :to="{name: 'userinfoModify',params: {
          type: 'gender'
        }}"
      ></van-cell>
      <van-cell
        is-link
        title="地址"
        :value="$store.state.user.userInfo.addRess"
        :to="{name: 'userinfoModify',params: {
          type: 'addRess'
        }}"
      ></van-cell>
    </van-cell-group>
    <transition
      :enter-active-class="'animated fadeInRight'"
      :leave-active-class="'animated fadeOutRight'"
    >
      <router-view class="app-content" style="z-index: 99"></router-view>
    </transition>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
.userinfo {
  .avatxt {
    line-height: 60px;
  }
  .cell-ava {
    .userava {
      width: 60px;
      height: 60px;
    }
  }
}
</style>
