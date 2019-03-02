<template>
  <div id="login">
    <header>
      <img src="./../../assets/images/logo108.png" class="login" />
    </header>
    <van-cell-group>
      <van-field
        v-model="username"
        required
        clearable
        label="邮箱"
        right-icon="question-o"
        placeholder="请输入邮箱"
        @click-right-icon="$toast('question')"
      />

      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
      />
    </van-cell-group>
    <p class="bottom-tips">
      <span>忘记密码?</span>
      <router-link tag="span" to="/register">注册账号</router-link>
    </p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
}
</script>
<style lang="less" scoped>
#login {
  header {
    text-align: center;
    padding: 20px 0;
  }
  .bottom-tips {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
