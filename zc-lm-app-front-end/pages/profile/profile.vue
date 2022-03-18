<template>
  <status-bar />
  <view class="profile-page">
    <view class="profile-page__headPortrait-part f ai-c" @click="userInfoEdit">
      <image
        src="/static/image/profile/sdz.png"
        mode="widthFix"
        class="profile-page__headPortrait-part_image"
      ></image>
      <text class="profile-page__headPortrait-part_text fs40">{{
        userName
      }}</text>
    </view>
    <view class="profile-page__main-part">
      <view class="profile-page__main-part_management f ai-c jc-sb">
        <view class="f fd-col ai-c" @click="managementViewClick('phone')">
          <image
            src="/static/image/profile/phone.png"
            mode="widthFix"
            class="img"
          ></image>
          <text>手机号管理</text>
        </view>
        <view class="f fd-col ai-c" @click="managementViewClick('address')">
          <image
            src="/static/image/profile/address.png"
            mode="widthFix"
            class="img"
          ></image>
          <text>地址管理</text>
        </view>
        <view class="f fd-col ai-c" @click="managementViewClick('order')">
          <image
            src="/static/image/profile/order.png"
            mode="widthFix"
            class="img"
          ></image>
          <text>订单管理</text>
        </view>
      </view>
      <view>
        <uni-list>
          <uni-list-item
            v-for="item of listData"
            :key="item.title"
            :title="item.title"
            :extra-icon="item.extraIcon"
            :to="item.url"
            :show-extra-icon="true"
            :showArrow="true"
            link="navigateTo"
          ></uni-list-item>
        </uni-list>
      </view>
      <view class="profile-page__main-part_footer f jc-c">
        <!-- <button type="warn" style="width: 60%" @click="logOut">退出登录</button> -->
        <van-button type="danger" @click="logOut" size="large"
          >退出登录</van-button
        >
      </view>
    </view>
  </view>
  <uni-popup ref="popup" type="dialog">
    <uni-popup-dialog
      type="warn"
      mode="base"
      content="确定要退出登录吗"
      :before-close="true"
      @close="close"
      @confirm="confirm"
    ></uni-popup-dialog>
  </uni-popup>
</template>

<script>
import { ref } from "vue";
import storageOperation from "/utils/index";
export default {
  name: "profile-page",
  data() {
    return {
      userName: "",
    };
  },
  setup() {
    const popup = ref(null);
    const listData = [
      {
        extraIcon: {
          color: "#4cd964",
          size: "22",
          type: "gear",
        },
        title: "物流偏好设置",
        url: "/pages/profile/setting/setting",
      },
      {
        extraIcon: {
          color: "#4cd964",
          size: "22",
          type: "person",
        },
        title: "物流客服",
        url: "/pages/profile/customerService/customer-service",
      },
      {
        extraIcon: {
          color: "#4cd964",
          size: "22",
          type: "chat",
        },
        title: "意见反馈",
        url: "/pages/profile/feedback/feedback",
      },
      {
        extraIcon: {
          color: "#4cd964",
          size: "22",
          type: "list",
        },
        title: "使用条款",
        url: "/pages/profile/clause/clause",
      },
    ];
    const userInfoEdit = () => {
      uni.navigateTo({
        url: "/pages/profile/userInfoEdit/user-info-edit",
        animationType: "slide-in-right",
        animationDuration: 100,
      });
    };
    const managementViewClick = (type) => {
      const baseUrl = "/pages/profile";
      uni.navigateTo({
        url: `${baseUrl}/${type}Management/${type}-management`,
        animationType: "slide-in-right",
        animationDuration: 100,
      });
    };
    const logOut = () => {
      console.log("logOut");
      popup.value.open();
    };
    const close = () => {
      popup.value.close();
    };
    const confirm = () => {
      popup.value.close();
      storageOperation.removeStorage("loginStatus");
      uni.navigateTo({
        url: "/pages/login/login",
      });
    };
    return {
      popup,
      listData,
      userInfoEdit,
      managementViewClick,
      logOut,
      close,
      confirm,
    };
  },
  onShow() {
    this.userName = storageOperation.getStorageSync("userName").value;
  },
};
</script>
<style lang="scss" scoped>
.profile-page {
  position: fixed;
  width: 100%;
  &__headPortrait-part {
    padding: 40rpx 40rpx;
    width: 100%;
    height: 200rpx;
    background: #24adf3;
    &_image {
      margin-right: 30rpx;
      width: 100rpx;
      border-radius: 50rpx;
    }
    &_text {
      color: $uni-text-color-inverse;
    }
  }
  &__main-part {
    position: absolute;
    top: 232rpx;
    width: 100%;
    height: calc(100vh - 232rpx);
    background: #fff;
    border-radius: 40rpx 40rpx 0 0;
    &_management {
      padding: 40rpx 40rpx;
      .img {
        width: 80rpx;
        margin-bottom: 10rpx;
      }
    }
    &_footer {
      margin-top: 200rpx;
      width: 100%;
      ::v-deep .van-button {
        width: 50%;
        font-size: 40rpx;
      }
    }
  }
}
</style>
