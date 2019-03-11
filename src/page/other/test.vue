<template>
  <div id="test">
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
    for (var i = 0; i < 200; i++) {
      this.filteredItems.push({
        id: Math.random()
      });
    }
  },
  data() {
    return {
      filteredItems: []
    };
  }
};
</script>
<style lang="less" scoped>
#test {
  height: 100%;
  .scroller {
    height: 100%;
  }
}
</style>
