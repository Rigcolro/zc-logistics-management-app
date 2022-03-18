<template>
  <view class="w100p f fd-col ai-c">
    <nav-bar left-text="地址簿" />
    <bg-set background-color="#f2f3f7" />
    <template v-if="userInfos.length">
      <address-card v-for="item in userInfos" :key="item" :userInfo="item" />
    </template>
    <template v-else> 你还没创建收货地址呢 </template>
  </view>
</template>
<script>
import StorageOperation from "/utils/storage";
import profileApI from "/api/modules/profile";
import AddressCard from "./components/address-card.vue";
export default {
  name: "address-management-page",
  components: {
    AddressCard,
  },
  data() {
    return {
      userInfos: [],
      formData: {},
    };
  },
  onShow() {
    const userName = StorageOperation.getStorageSync("userName").value;
    const getUserInfo = () => {
      profileApI
        .getUserInfo({ userName })
        .then((res) => {
          this.userInfos = res;
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUserInfo();
  },
};
</script>
<style lang="scss" scoped>
</style>
