<template>
  <div id="test">
    <Button @click="add">添加</Button>
    <DynamicScroller :items="filteredItems" :min-item-size="54" class="scroller">
      <template v-slot="{ item, index, active }">
        <DynamicScrollerItem :item="item" :active="active" class="message">
          <div class="text">{{ item }}</div>
        </DynamicScrollerItem>
      </template>
    </DynamicScroller>
  </div>
</template>
<script>
export default {
  created() {
    for (var i = 0; i < 10; i++) {
      this.filteredItems.push({
        id: Math.random()
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
  height: 100%;
}
</style>
