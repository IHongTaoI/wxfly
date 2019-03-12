<template>
  <div id="test">
    <Button @click="add">添加</Button>
    <!-- <DynamicScroller :items="filteredItems" :min-item-size="54" class="scroller">
      <template v-slot="{ item, index, active }">
        <DynamicScrollerItem :item="item" :active="active" class="message">
          <div class="text">{{ item }}</div>
        </DynamicScrollerItem>
      </template>
    </DynamicScroller>-->
    <virtual-list :size="20" :remain="20" class="list">
      <div class="text" v-for="item of filteredItems" :key="item.id">{{ item }}</div>
    </virtual-list>
  </div>
</template>
<script>

export default {
  created() {
    for (var i = 0; i < 1000; i++) {
      this.filteredItems.push({
        id: i
      });
    }
  },
  data() {
    return {
      filteredItems: []
    };
  },
  methods: {
    add() {
      this.filteredItems.push({
        id: Math.random()
      });
    }
  }
};
</script>
<style lang="less" scoped>
#test {
  height: 500px;
  .text {
    box-sizing: border-box;
  }
  .list {
    height: 100% !important;
  }
}
</style>
