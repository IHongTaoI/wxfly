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
      <van-field
        v-model="sms"
        center
        clearable
        label="验证码"
        placeholder="请输入邮箱验证码"
      >
        <van-button
          slot="button"
          size="small"
          type="primary"
          @click="sendSms"
          >{{ smsCount ? `${smsCount}秒` : "发送验证码" }}</van-button
        >
      </van-field>
    </van-cell-group>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      sms: '',
      smsCount: 0,
      timer: null
    }
  },
  methods: {
    async sendSms() {
      await this.$post('/user/share/mail/activate', {
        "serviceHeader": {
          "token": "155108797078187",
          "userId": "155080081322129"
        },
        "serviceBody": {
          "userName": "",
          "userMail": "836717428@qq.com"
        }
      })
      this.smsCount = 60
      this.timer = setInterval(() => {
        if (this.smsCount <= 0) clearInterval(this.timer)
        this.smsCount--
      }, 1000)
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
}
</style>
