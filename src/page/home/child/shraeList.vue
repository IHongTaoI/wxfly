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
            @click.stop="previewImage(item.shareImg, indx)"
          >
        </div>
      </div>
      <p class="shareContent">{{item.shareContent}}</p>
    </div>
    <div class="footer">
      <p>
        <span class="iconfont icon-liulan"></span>
        <span class="count">{{item.shareBrowseCount | countFromat}}</span>
      </p>
      <p>
        <span class="iconfont icon-xihuancon" @click.stop="clickLike" :class="{c_red: like}"></span>
        <span class="count">{{item.shareLikeCount | countFromat}}</span>
      </p>
      <p>
        <span class="iconfont icon-pinglun"></span>
        <span class="count">{{item.shareReplyCount | countFromat}}</span>
      </p>
      <p>
        <span class="iconfont icon-zhuanfa"></span>
        <span class="count">{{item.shareTransmitCount | countFromat}}</span>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  props: ["itemObj", "index", "type"],
  data() {
    return {
      like: false
    };
  },
  methods: {
    // 预览图片
    previewImage(imgs, index) {
      this.$utils.imagePreview(imgs, index);
    },
    gotoDetail() {
      this.$router.push({
        path: "/home/shardDetail",
        query: {
          id: this.itemObj.id
        }
      });
    },
    //点赞
    async clickLike() {
      if (this.itemObj.like) {
        return;
      }
      let ret = await this.$apihelper.parseLikeShare(this.itemObj.id);
      if (!ret) return;
      this.like = true;
      // this.$store.commit("homeList/Like", {
      //   index: this.index,
      //   type: this.type
      // });
    },
    caozuo() {
      this.$emit("action", this.itemObj);
    }
  },
  computed: {
    item() {
      return this.itemObj;
      // let shareImg = [];
      // if (this.itemObj.shareImg && typeof this.itemObj.shareImg === "string") {
      //   shareImg = this.itemObj.shareImg.split(",");
      // }
      // return Object.assign(this.itemObj, {
      //   createTime: this.$utils.dateFromat(this.itemObj.createTime),
      //   shareImg
      // });
    }
  }
};
</script>

<style lang="less" scoped>
.c_red {
  color: red !important;
}
.list-item {
  padding: 20px 20px 5px;
  background: #fff;
  margin-bottom: 12px;
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
        width: 50%;
        margin: 0 4px;
        height: 100px;
        overflow: hidden;
        &.pic1 {
          width: 100%;
          height: 100px;
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
