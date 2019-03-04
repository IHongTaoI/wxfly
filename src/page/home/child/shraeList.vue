<template>
  <div class="list-item" @click="gotoDetail">
    <div class="header">
      <div class="info">
        <img class="userava" :src="item.shareUserAvatar">
        <div class="titles">
          <p class="username">{{item.shareUserName}}</p>
          <!--发布时间-->
          <p class="time">{{item.createTime}}</p>
        </div>
      </div>
      <div class="opt" @click.stop="caozuo">
        <span class="iconfont icon-caozuo"></span>
      </div>
    </div>
    <div class="content" v-if="item.shareImg && item.shareImg.length">
      <div class="imgs">
        <div
          :class="['pic_item',{pic1: item.shareImg.length == 1, pic3: item.shareImg.length >= 3}]"
          v-for="(picItem, indx) in item.shareImg"
          :key="indx"
        >
          <img
            class="pic"
            mode="aspectFill"
            :src="picItem"
            @click.stop="previewImage(item.shareImg)"
          >
        </div>
      </div>
      <p class="shareContent">{{item.shareContent}}</p>
    </div>
    <div class="footer">
      <p>
        <span class="iconfont icon-liulan"></span>
        <span class="count">1</span>
      </p>
      <p>
        <span class="iconfont icon-xihuancon"></span>
        <span class="count">1</span>
      </p>
      <p>
        <span class="iconfont icon-pinglun"></span>
        <span class="count">1</span>
      </p>
      <p>
        <span class="iconfont icon-zhuanfa"></span>
        <span class="count">1</span>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  props: ['itemObj'],
  methods: {
    // 预览图片
    previewImage(imgs) {
      this.$utils.imagePreview(imgs)
    },
    gotoDetail() {
      this.$router.push({
        path: '/home/shardDetail',
        query: {
          id: this.itemObj.id
        }
      })
    },
    caozuo() {
      this.$emit('action')
    }
  },
  computed: {
    item() {
      let shareImg = []
      console.log(this.itemObj)
      if (this.itemObj.shareImg) {
        shareImg = this.itemObj.shareImg.split(',')
      }
      return Object.assign(this.itemObj, {
        createTime: this.$utils.dateFromat(this.itemObj.createTime),
        shareImg
      })
    }
  }
}
</script>

<style lang="less" scoped>
.list-item {
  padding: 20px 20px 5px;
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
  .content {
    .shareContent {
      font-size: 14px;
    }
    .imgs {
      display: -webkit-box;
      justify-content: flex-start;
      white-space: nowrap;
      width: 100%;
      padding: 5px;
      box-sizing: border-box;
      overflow-y: hidden;
      overflow-x: auto;
      .pic_item {
        display: inline-block;
        width: 320px;
        height: 200px;
        overflow: hidden;
        &.pic1 {
          width: 100%;
          height: 300px;
          border-radius: 20px;
        }
        &.pic3 {
          width: 170px;
          height: 100px;
          margin-right: 10px;
          border-radius: 8px;
        }
        .pic {
          width: 100%;
          height: 100%;
          border-radius: 10px;
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
