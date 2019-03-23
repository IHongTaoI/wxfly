<template>
  <div class="list-item">
    <div class="header">
      <div class="info">
        <img class="userava" :src="item.shareUserAvatar">
        <div class="titles">
          <p class="username">{{item.shareUserName}}</p>
          <!--发布时间-->
          <p class="time">{{item.createTime}}</p>
        </div>
      </div>
      <div class="opt" @click.stop="caozuo(item.id, index)">
        <span class="iconfont icon-caozuo"></span>
      </div>
    </div>
    <div class="content">
      <div class="imgs" v-if="item.shareImg && item.shareImg.length">
        <div :class="['pic_item']">
          <img class="pic" mode="aspectFill" :src="item.shareImg[0]">
        </div>
      </div>
      <p class="shareContent">{{item.shareContent}}</p>
    </div>
  </div>
</template>
<script>
export default {
  props: ["item"],
  methods: {
    caozuo(id, index) {
      this.$emit("caozuo", id, index);
    }
  }
};
</script>
<style lang="less" scoped>
.list-item {
  box-sizing: border-box;
  padding: 20px 20px 5px;
  height: 210px;
  margin-bottom: 12px;
  background: #ffffff;
  .header {
    display: flex;
    justify-content: space-between;
    .info {
      display: flex;
      justify-content: flex-start;
      .userava {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
      .titles {
        padding-left: 15px;
        .username {
          font-size: 14px;
        }
        .time {
          font-size: 14px;
          color: #bababa;
        }
      }
    }
  }
  .shareContent {
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .content {
    display: flex;
    align-items: center;
    .imgs {
      display: -webkit-box;
      justify-content: flex-start;
      white-space: nowrap;
      max-width: 20%;
      padding: 5px;
      box-sizing: border-box;
      overflow-y: hidden;
      overflow-x: auto;
      .pic_item {
        display: inline-block;
        width: 100%;
        height: 40px;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .footer {
    display: flex;
    justify-content: space-around;
    .iconfont {
      color: #878787;
      vertical-align: middle;
      font-size: 24px;
      margin-right: 8px;
    }
    .count {
      color: #878787;
      font-size: 12px;
      vertical-align: middle;
    }
  }
}
</style>
