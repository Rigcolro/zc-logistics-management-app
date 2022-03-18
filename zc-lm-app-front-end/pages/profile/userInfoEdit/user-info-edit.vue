<template>
  <view class="user-info-edit f fd-col ai-c">
    <nav-bar left-text="编辑用户信息" />
    <bg-set background-color="#f2f3f7" />
    <view class="user-info-edit__edit-part f fd-col">
      <view class="user-about f"
        ><view class="head-portrait-upload f fd-col ai-c">
          <view><text>用户头像</text></view>
          <van-uploader :after-read="afterRead" />
        </view>
        <view class="user-info f1">
          <view class="name" :style="[formData.userName ? {} : emptyName]">{{
            formData.userName || "请输入用户名"
          }}</view>
          <view class="phone">{{ formData.userPhone }}</view>
        </view></view
      >
      <view class="edit">
        <uni-forms ref="form" :rules="rules" :modelValue="formData">
          <uni-forms-item label="用户名" name="userName" required
            ><uni-easyinput
              v-model="formData.userName"
              placeholder="请输入用户名"
          /></uni-forms-item>
          <uni-forms-item label="手机号" name="userPhone" required
            ><uni-easyinput
              v-model="formData.userPhone"
              placeholder="请输入手机号"
          /></uni-forms-item>
          <uni-forms-item label="密码" name="userPwd" required
            ><uni-easyinput
              v-model="formData.userPwd"
              placeholder="请输入密码"
              type="password"
          /></uni-forms-item>
          <uni-forms-item label="请再次输入密码" name="userPwdR" required
            ><uni-easyinput
              v-model="formData.userPwdR"
              placeholder="请再次输入密码"
              type="password"
          /></uni-forms-item>
        </uni-forms>
      </view>
      <view class="button f jc-c">
        <van-button type="primary" @click="userInfoEdit">确认修改</van-button>
      </view>
    </view>
    <uni-popup ref="popup" type="top">
      <uni-popup-message
        :type="
          editStatus === 2 ? 'success' : editStatus === 3 ? 'warn' : 'error'
        "
        :message="
          editStatus === 2
            ? '修改成功，请重新登录'
            : editStatus === 3
            ? '前后数据一致，无效修改'
            : '修改失败'
        "
      ></uni-popup-message>
    </uni-popup>
  </view>
</template>

<script>
import { ref, reactive, watchEffect } from "vue";
import loginAPI from "/api/modules/login";
import profileAPI from "/api/modules/profile";
import storageOperation from "/utils/storage";
export default {
  name: "user-info-edit",
  setup() {
    const form = ref(null);
    const popup = ref(null);
    const editStatus = ref(1);
    const emptyName = reactive({
      color: "red",
    });
    const formData = reactive({
      userName: "",
      userPhone: "",
      userPwd: "",
      userPwdR: "",
    });
    const oldFormData = reactive({});
    const rules = {
      userName: { rules: [{ required: true, errorMessage: "姓名不能为空" }] },
      userPhone: {
        rules: [
          { required: true, errorMessage: "手机号不能为空" },
          {
            validateFunction: (rule, value, data, callback) => {
              // 异步需要返回 Promise 对象
              return new Promise((resolve, reject) => {
                setTimeout(() => {
                  if (value.length === 11) {
                    // 通过返回 resolve
                    resolve();
                  } else {
                    // 不通过返回 reject(new Error('错误信息'))
                    reject(new Error("手机号码必须是11位数字!"));
                  }
                }, 0);
              });
            },
          },
        ],
      },
      userPwd: { rules: [{ required: true, errorMessage: "密码不能为空" }] },
      userPwdR: {
        rules: [
          {
            required: true,
            errorMessage: "前后设置密码不一致",
          },
          {
            validateFunction: (rule, value, data, callback) => {
              // 异步需要返回 Promise 对象
              return new Promise((resolve, reject) => {
                setTimeout(() => {
                  if (value === formData.userPwd) {
                    // 通过返回 resolve
                    resolve();
                  } else {
                    // 不通过返回 reject(new Error('错误信息'))
                    reject(new Error("前后设置密码不一致!"));
                  }
                }, 0);
              });
            },
          },
        ],
        validateTrigger: "bind",
      },
    };
    const afterRead = (file) => {
      console.log(file);
      profileAPI
        .uploadImage(file)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const getUseInfo = () => {
      const userName = ref(storageOperation.getStorageSync("userName").value);
      const userPhone = ref(storageOperation.getStorageSync("userPhone").value);
      const userPwd = ref(storageOperation.getStorageSync("userPwd").value);
      oldFormData.userName = userName.value;
      oldFormData.userPhone = userPhone.value;
      oldFormData.userPwd = userPwd.value;
      oldFormData.userPwdR = userPwd.value;
      loginAPI
        .loginQuery({
          userName: userName.value,
          userPhone: userPhone.value,
          userPwd: userPwd.value,
        })
        .then((res) => {
          console.log(res);
          formData.userName = res[0].userName;
          formData.userPhone = res[0].userPhone;
          formData.userPwd = res[0].userPwd;
          formData.userPwdR = res[0].userPwd;
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const userInfoEdit = () => {
      form.value
        .validate()
        .then((res) => {
          const params = {
            newUserName: formData.userName,
            newUserPhone: formData.userPhone,
            newUserPwd: formData.userPwd,
            oldUserName: oldFormData.userName,
            oldUserPhone: oldFormData.userPhone,
            oldUserPwd: oldFormData.userPwd,
          };
          profileAPI
            .updateUserInfo(params)
            .then((response) => {
              popup.value.open();
              editStatus.value = 2;
              const result = Object.keys(formData).some(
                (item) => formData[item] !== oldFormData[item]
              );
              if (!result) editStatus.value = 3;
              setTimeout(() => {
                popup.value.close();
                if (result) {
                  // 缓存userName和userPhone供登录页自动填充
                  storageOperation.removeStorage("loginStatus");
                  storageOperation.setStorageSync(
                    "userName",
                    formData.userName
                  );
                  storageOperation.setStorageSync(
                    "userPhone",
                    formData.userPhone
                  );
                  uni.navigateTo({
                    url: "/pages/login/login",
                  });
                }
              }, 2000);
            })
            .catch((err) => {
              console.log(err);
              editStatus.value = 1;
            });
        })
        .catch((err) => {
          console.log("表单错误信息：", err);
        });
    };
    watchEffect(() => {
      getUseInfo();
    });
    return {
      form,
      popup,
      editStatus,
      rules,
      emptyName,
      formData,
      afterRead,
      userInfoEdit,
    };
  },
};
</script>
<style lang='scss' scoped>
.user-info-edit {
  width: 100%;
  height: 100vh;
  &__edit-part {
    margin-top: 10rpx;
    padding: 20rpx;
    width: 96%;
    height: 840rpx;
    border-radius: 30rpx;
    box-sizing: border-box;
    box-shadow: 4px 2px 10px #bbb;
    background-color: #fff;
    .user-about {
      margin-bottom: 50rpx;
      .head-portrait-upload {
        margin-right: 20rpx;
        ::v-deep .van-uploader__upload {
          margin: 0;
        }
      }
      .user-info {
        padding: 30rpx;
        font-size: 40rpx;
        .phone {
          margin-top: 50rpx;
          font-size: 30rpx;
        }
      }
    }
  }
}
</style>