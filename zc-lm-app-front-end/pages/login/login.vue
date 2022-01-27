<template>
  <status-bar />
  <view class="login-page f fd-col ai-c jc-c w100">
    <bg-set color="#373447" />
    <view class="login-page__img_part f fd-col ai-c">
      <image
        class="login-page__img_part_img"
        src="/static/image/lm.png"
      ></image>
      <text class="login-page__img_part_title">物流管理系统</text>
    </view>
    <view class="login-page__form_part">
      <uni-card
        title="请登录"
        mode="basic"
        :is-shadow="true"
        note="Tips"
        class="login-page__form_part_card"
      >
        <uni-forms ref="form" :rules="rules" :modelValue="formData">
          <uni-forms-item label="用户名" name="name" :required="true"
            ><uni-easyinput
              v-model="userName"
              placeholder="请输入用户名"
              trim="both"
          /></uni-forms-item>
          <uni-forms-item label="手机号" name="phoneNumber" :required="true"
            ><uni-easyinput
              v-model="userPhone"
              placeholder="请输入正确的手机号码"
              trim="both"
          /></uni-forms-item>
          <uni-forms-item label="密码" name="password" :required="true"
            ><uni-easyinput
              v-model="userPwd"
              placeholder="请输入密码"
              type="password"
              trim="both"
          /></uni-forms-item>
          <uni-forms-item class="f jc-sa">
            <button type="primary" @click="submit" size="mini">登录</button>
            <button type="primary" class="ml100" @click="register" size="mini">
              注册
            </button>
          </uni-forms-item>
        </uni-forms>
      </uni-card>
    </view>
    <uni-popup ref="popup" type="message">
      <uni-popup-message
        type="error"
        message="用户名或手机号或密码错误,请核对后重新输入!"
        :duration="2000"
      ></uni-popup-message>
    </uni-popup>
  </view>
</template>

<script>
import { ref, toRefs, reactive } from "vue";
import { useStore } from "vuex";
import loginPageAPI from "/api/modules/login";
export default {
  name: "login-page",
  setup() {
    const form = ref(null);
    const popup = ref(null);
    const formData = reactive({
      userName: "",
      userPhone: "",
      userPwd: "",
    });
    const store = useStore();
    const rules = {
      // 对name字段进行必填验证
      name: {
        rules: [
          {
            required: true,
            errorMessage: "用户名不能为空!",
          },
        ],
      },
      phoneNumber: {
        rules: [
          {
            required: true,
            errorMessage: "手机号码不能为空!",
          },
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
                    reject(new Error("手机号码必须是11位数字"));
                  }
                }, 0);
              });
            },
          },
        ],
      },
      password: {
        rules: [
          {
            required: true,
            errorMessage: "密码不能为空!",
          },
        ],
      },
    };
    const submit = () => {
      form.value
        .validate()
        .then((res) => {
          console.log("表单数据信息：", res);
          loginPageAPI
            .loginQuery(formData)
            .then((res) => {
              const data = res.data.data;
              const { userName, userPhone } = data[0];
              if (data.length) {
                store.commit("setLoginStatus", true);
                store.commit("setUserName", userName);
                store.commit("setUserPhone", userPhone);
                uni.setStorage({
                  key: "loginStatus",
                  data: true,
                  success: function () {
                    console.log("success");
                  },
                });
                uni.setStorage({
                  key: "userName",
                  data: userName,
                  success: function () {
                    console.log("success");
                  },
                });
                uni.setStorage({
                  key: "userPhone",
                  data: userPhone,
                  success: function () {
                    console.log("success");
                  },
                });
                uni.switchTab({
                  url: "/pages/home/home",
                });
              } else {
                popup.value.open();
              }
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log("表单错误信息：", err);
        });
    };
    const register = () => {
      form.value
        .validate()
        .then((res) => {
          console.log("表单数据信息：", res);
          loginPageAPI
            .loginInsert(formData)
            .then((res) => {
              const data = res.data.data;
              if (data.length) {
                store.commit("setLoginStatus", true);
                uni.setStorage({
                  key: "loginStatus",
                  data: true,
                  success: function () {
                    console.log("success");
                  },
                });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log("表单错误信息：", err);
        });
    };
    return {
      form,
      popup,
      formData,
      ...toRefs(formData),
      rules,
      submit,
      register,
    };
  },
};
</script>
<style lang="scss" scoped>
page {
  background: #373447;
}
.login-page {
  &__img_part {
    margin-top: 200rpx;
    &_img {
      width: 192rpx;
      height: 144rpx;
    }
    &_title {
      font-size: 40rpx;
      letter-spacing: 10rpx;
    }
  }
  &__form_part {
    margin-top: 100rpx;
  }
}
</style>
