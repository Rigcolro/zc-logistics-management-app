<template>
  <view class="login-page f fd-col ai-c jc-c w100">
    <view class="bg-set"></view>
    <status-bar />
    <view class="login-page__img_part f fd-col ai-c">
      <image class="login-page__img_part_img" src="/static/lm.png"></image>
      <text class="login-page__img_part_title">物流管理系统</text>
    </view>
    <view class="login-page__form_part">
      <uni-card
        title="请登录"
        mode="style"
        :is-shadow="true"
        note="Tips"
        class="login-page__form_part_card"
      >
        <uni-forms ref="form" :rules="rules" :modelValue="formData">
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
  </view>
</template>

<script>
  import { ref, toRefs, reactive } from "vue";
  import loginPageAPI from '/api/modules/login'
  export default {
    name: "login-page",
    setup() {
      const form = ref(null);
      const formData = reactive({
        userPhone: "",
        userPwd: "",
      });
      const submit = () => {
        form.value
          .validate()
          .then((res) => {
            console.log("表单数据信息：", res);
            loginPageAPI.loginQuery(formData).then(res=>{
              console.log(res);
            }).catch(err=>{
              console.log(err);
            })
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
          })
          .catch((err) => {
            console.log("表单错误信息：", err);
          });
      };
      return {
        form,
        formData,
        ...toRefs(formData),
        rules: {
          // 对name字段进行必填验证
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
        },
        submit,
        register,
      };
    },
  };
</script>
<style lang="scss">
  page {
    background: #373447;
  }
  .login-page {
    .bg-set {
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background-color: #373447;
      z-index: -1;
    }
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
