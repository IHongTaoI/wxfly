<template>
  <div id="login">
    <header>
      <img src="./../../assets/images/logo108.png" class="login">
    </header>
    <div class="from">
      <van-cell-group>
        <van-field
          v-model="username"
          required
          clearable
          label="邮箱"
          placeholder="请输入邮箱"
        />

        <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" required/>
      </van-cell-group>
    </div>
    <div class="btn">
      <van-button type="warning" class="btnvant" @click="login">登录</van-button>
    </div>
    <p class="bottom-tips">
      <span>忘记密码?</span>
      <router-link tag="span" to="/register">注册账号</router-link>
    </p>
  </div>
</template>
<script>
import socketInit from "./../../utils/socket-init.js";
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    async login() {
      let ret = await this.$apihelper.mailLogin({
        mail: this.username,
        password: this.password,
        code: ""
      });
      if (!ret) return this.$toast.fail("登录失败");
      this.$utils.cookie.delete("seesionuser");
      this.$utils.cookie.set("seesionuser", JSON.stringify(ret), 1);
      this.$store.commit("user/LOGIN_SUCCESS", ret);
      localStorage.setItem("seesionuser", JSON.stringify(ret));
      this.$router.replace({
        path: "/home"
      });
    }
  }
};
</script>
<style lang="less" scoped>
#login {
  background: #fff;
  header {
    text-align: center;
    padding: 20px 0;
  }
  .from {
    padding: 0 20px;
  }
  .bottom-tips {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 7px 27px;
    color: steelblue;
  }
  .btn {
    text-align: center;
    margin-top: 20px;
    .btnvant {
      width: 80%;
    }
  }
}
</style>
