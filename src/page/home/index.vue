<template>
  <div id="home">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <shreaBox :itemObj="item" v-for="(item, index) in list" :key="index" @action="actionHandler"></shreaBox>
    </van-list>
    <van-actionsheet
      v-model="showActionsheetL"
      :actions="actions"
      @select="onSelect"
      cancel-text="取消"
    />
  </div>
</template>
<script>
import shreaBox from './child/shraeList'

export default {
  components: {
    shreaBox
  },
  async created() {
    let ret = await this.$utils.apiHelper.getShearList()
    let list = ret.d.shareList
    if (list.length < 10) {
      this.finished = true
    }
    this.list = list
    this.loading = false
  },
  data() {
    return {
      list: [],
      showActionsheetL: false,
      actions: [
        {
          name: '关注'
        },
        {
          name: '收藏'
        }
      ],
      loading: true,
      finished: false // 是否已加载完成
    }
  },
  methods: {
    onLoad() {},
    actionHandler() {
      this.showActionsheetL = true
    },
    onSelect(msg) {
      this.showActionsheetL = false
    }
  }
}
</script>
<style lang="less" scoped>
</style>
