<template>
  <div class="my-collection-wrap paddingTopNav">
    <van-nav-bar title="我的收藏" left-text="返回" left-arrow @click-left="$router.go(-1)" class="topNavBar"/>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" class="refreshBox">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div
          class="list-item"
          @click="gotoDetail(item.id)"
          v-for="(item, index) in list"
          :key="index"
        >
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
        </div>
      </van-list>
    </van-pull-refresh>
    <van-actionsheet
      v-model="showActionsheetL"
      :actions="actions"
      @select="onSelect"
      cancel-text="取消"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [],
      showActionsheetL: false,
      loading: false,
      isLoading: false,
      finished: false,
      page: 0,
      pageSize: 10,
      cacheCollectId: -1,
      actions: [
        {
          name: "取消收藏"
        }
      ],
      caozuoIndex: -1 // 操作的数组索引
    };
  },
  methods: {
    // 预览图片
    previewImage(imgs, index) {
      this.$utils.imagePreview(imgs, index);
    },
    onLoad() {
      this.getList(false);
    },
    onRefresh() {
      this.getList();
    },
    caozuo(id, index) {
      this.caozuoIndex = index;
      this.cacheCollectId = id;
      this.showActionsheetL = true;
    },
    // 取消收藏
    async onSelect() {
      let ret = await this.$utils.apiHelper.delectCollection({
        collectId: this.cacheCollectId
      });
      if (!ret) return;
      this.list.splice(this.caozuoIndex, 1);
      this.$toast.success("取消收藏成功");
      this.showActionsheetL = false;
    },
    async getList(isreload = true) {
      let ret = await this.$utils.apiHelper.getCollectionList({
        page: this.page,
        pageSize: this.pageSize
      });
      this.isLoading = false;
      this.loading = false;
      if (!ret) return;
      let data = ret.d.collectList;
      if (data.length < this.pageSize) this.finished = true;
      for (let v of data) {
        let shareImg = [];
        if (v.shareImg) {
          shareImg = v.shareImg.split(",");
        }
        v.createTime = this.$utils.dateFromat(v.createTime);
        v.shareImg = shareImg;
      }
      if (isreload) this.list = data;
      else this.list.push(...data);
    },
    gotoDetail(id) {
      this.$router.push({
        path: "/home/shardDetail",
        query: {
          id
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.my-collection-wrap {
  .list-item {
    padding: 20px 20px 5px;
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
}
</style>
