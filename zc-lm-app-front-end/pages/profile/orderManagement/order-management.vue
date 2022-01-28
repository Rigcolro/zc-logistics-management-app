<template>
  <view>
    <nav-bar left-text="我的订单" />
    <bg-set background-color="#f2f3f7"/>
  </view>
</template>

<script>
import { ref, toRefs, reactive} from 'vue';
export default {
  name: 'order-management-page',
  setup(props) {
    const {}=toRefs(props);
    return {};
  },
};
</script>
<style lang='scss' scoped>
</style>