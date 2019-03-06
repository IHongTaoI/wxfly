<template>
  <div id="self">
    <header></header>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  components: {
    Cell,
    Group
  },
  computed: {
    ...mapState("user", ["userInfo"])
  }
};
</script>
<style lang="less" scoped>
#self {
  .userava {
    margin-right: 10px;
    width: 60px;
    height: 60px;
    img {
      margin-right: 0 !important;
    }
  }
}
</style>
