<template>
  <div class="replay-edit-box">
    <div class="editBox" :style="{display: value ? 'block' : 'none'}">
      <div class="textareBox">
        <textarea
          cols="30"
          rows="10"
          v-model="replyCont"
          class="textCont"
          :placeholder="tearPlaTxt"
          :focus="value"
        ></textarea>
        <span class="wc">{{ wordCount }}</span>
      </div>
      <p class="replaySub">
        <span class="btn" @click="submit">发表</span>
      </p>
    </div>
    <div class="mask" :style="{display: value ? 'block' : 'none'}" @click.stop="hideBox"></div>
  </div>
</template>
<script>
export default {
  props: ["value", "tearPlaTxt"],
  data() {
    return {
      replyCont: "",
      wordLimit: 100 // 字数限制
    };
  },
  methods: {
    hideBox() {
      this.$emit("input", false);
    },
    submit() {
      this.$emit("on-submit", this.replyCont);
      this.replyCont = "";
    }
  },
  watch: {
    replyCont(cur, old) {
      if (cur.length > this.wordLimit) {
        this.replyCont = old;
      }
    }
  },
  computed: {
    wordCount() {
      let reLen = this.replyCont.length;
      return this.wordLimit - reLen;
    }
  }
};
</script>
<style lang="less" scoped>
.replay-edit-box {
  .editBox {
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
    z-index: 99;
    background: #fff;
    padding: 10px 0;
    .textareBox {
      position: relative;
      text-align: center;
      .textCont {
        width: 90%;
        margin: 0 auto;
        padding: 5px 10px;
        height: 80px;
        border-radius: 16px;
        background: #f5f5f5;
      }
      .wc {
        position: absolute;
        bottom: 13px;
        right: 28px;
        background: #e8e8e8;
        color: #bab9ba;
        padding: 1px 7px;
        border-radius: 20px;
        font-size: 13px;
      }
    }
    .replaySub {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .btn {
        display: inline-block;
        height: 30px;
        line-height: 31px;
        background: #fe5a60;
        color: #fff;
        margin: 7px 20px 0;
        padding: 0 15px;
        font-size: 16px;
        border-radius: 10px;
      }
    }
  }
  .mask {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
  }
}
</style>

