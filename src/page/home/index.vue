<template>
  <div id="home">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" class="refresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <shreaBox
          :itemObj="item"
          v-for="(item, index) in list"
          :key="index"
          @action="actionHandler"
        ></shreaBox>
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
import shreaBox from "./child/shraeList";

export default {
  name: "home",
  components: {
    shreaBox
  },
  activated() {
    if (!this.list.length || this.$route.params.reload) {
      this.getList(true);
    }
  },
  data() {
    return {
      list: [],
      isLoading: false,
      selObj: null, // 正在操作的数据
      showActionsheetL: false,
      actions: [
        {
          name: "关注",
          type: 1
        },
        {
          name: "收藏",
          type: 2
        }
      ],
      loading: true,
      finished: false // 是否已加载完成
    };
  },
  methods: {
    onLoad() {
      this.getList();
    },
    onRefresh() {
      this.getList(true);
    },
    async getList(isreload) {
      let ret = await this.$utils.apiHelper.getShearList();
      let list = ret.d.shareList;

      if (isreload) {
        this.list = list;
        this.finished = false;
      } else {
        this.list.push(...list);
      }

      if (list.length < 10) {
        this.finished = true;
      }
      this.isLoading = false;
      this.loading = false;
    },
    actionHandler(selObj) {
      this.selObj = selObj;
      this.showActionsheetL = true;
    },
    async onSelect(msg, item) {
      console.log(msg, item);
      if (msg.type === 2) {
        // 收藏
        let ret = await this.$utils.apiHelper.userCollect(this.selObj.id);
        if (ret) this.$toast.success("收藏成功");
      }
      this.showActionsheetL = false;
    }
  }
};
</script>
<style lang="less" scoped>
#home {
  background: #fff;
  width: 100%;
  height: 100%;
  .refresh {
    height: 100%;
  }
}
</style>
