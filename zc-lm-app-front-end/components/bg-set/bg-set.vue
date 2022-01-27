<template>
  <view class="bg-set"></view>
</template>

<script>
export default {
  name: "bg-set",
  props: {
    color: String,
  },
};
</script>
<style lang='scss' scoped>
.bg-set {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: v-bind(color);
  z-index: -1;
}
</style>