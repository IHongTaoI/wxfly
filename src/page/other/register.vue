<template>
  <div id="login">
    <header>
      <img src="./../../assets/images/logo108.png" class="login">
    </header>
    <div class="from">
      <van-cell-group>
        <van-field
          v-model="email"
          required
          clearable
          label="邮箱"
          right-icon="question-o"
          placeholder="请输入邮箱"
          @click-right-icon="$toast('question')"
        />

        <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" required/>
        <van-field v-model="sms" center clearable label="验证码" placeholder="请输入邮箱验证码">
          <van-button
            slot="button"
            size="small"
            type="primary"
            @click="sendSms"
          >{{ smsCount ? `${smsCount}秒` : "发送验证码" }}</van-button>
        </van-field>
      </van-cell-group>
    </div>
    <div class="btn">
      <van-button type="warning" class="btnvant" @click="register">注册</van-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      sms: "",
      smsCount: 0,
      timer: null
    };
  },
  methods: {
    async sendSms() {
      let ret = await this.$apihelper.getMailSms({
        userName: "测试用户",
        userMail: this.email
      });
      if (!ret) return;
      if (this.smsCount !== 0) return;
      this.smsCount = 60;
      this.timer = setInterval(() => {
        if (this.smsCount <= 0) {
          this.smsCount = 0;
          clearInterval(this.timer);
          return;
        }
        this.smsCount--;
      }, 1000);
    },
    async register() {
      let ret = await this.$apihelper.mailRegister({
        mail: this.email,
        nickName: "",
        password: this.password,
        code: this.sms,
        registType: "N"
      });
      if (!ret) return;
      console.log(ret);
    }
  }
};
</script>
<style lang="less" scoped>
#login {
  header {
    text-align: center;
    padding: 20px 0;
  }
  .from {
    padding: 0 20px;
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
