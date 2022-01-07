<template>
  <div class="login">
    <img
      src="http://www.dell-lee.com/imgs/vue3/user.png"
      alt=""
      class="login__img"
    />
    <div class="login__input">
      <input
        type="text"
        class="login__input__text"
        placeholder="用户名"
        v-model="username"
      />
      <input
        type="text"
        class="login__input__text"
        placeholder="请输入密码"
        v-model="password"
      />
    </div>
    <div class="login__button" @click="handleLogin">登录</div>
    <div class="login__link">
      <router-link :to="{ name: 'Register' }">
        <p class="login__link__pass">立即注册</p>
      </router-link>
      <span></span>
      <p class="login__link__pass">忘记密码</p>
    </div>
    <Toast v-if="showToast" :message="toastMessage" />
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { post } from "../../utils/request";
import Toast, { useToastEffect } from "../../components/Toast";

const useLoginEffect = (hiddenToast) => {
  const router = useRouter();
  const data = reactive({
    username: "",
    password: "",
  });
  const handleLogin = async () => {
    try {
      const result = await post("/api/user/login", {
        username: data.username,
        password: data.password,
      });
      if (result?.errno === 0) {
        localStorage.isLogin = true;
        router.push({ name: "Home" });
      } else {
        hiddenToast("登录失败");
      }
    } catch (e) {
      hiddenToast("请求失败");
    }
  };
  const { username, password } = toRefs(data);
  return { username, password, handleLogin };
};

export default {
  name: "Login",
  components: { Toast },
  setup() {
    const { showToast,toastMessage, hiddenToast } = useToastEffect();
    const { username, password, handleLogin } = useLoginEffect(hiddenToast);

    return { handleLogin, username, password, showToast,toastMessage,};
  },
};
</script>

<style lang='scss' scoped>
.login {
  margin: 1.4rem 0.4rem 0 0.4rem;
  text-align: center;
  &__img {
    width: 0.66rem;
    height: 0.66rem;
  }
  &__input {
    margin: 0.4rem 0 0.32rem 0;
    box-sizing: border-box;
    &__text {
      display: block;
      width: 100%;
      line-height: 0.48rem;
      font-size: 0.16rem;
      color: #777;
      border: 0.01rem solid rgba(0, 0, 0, 0.1);
      padding-left: 0.16rem;
      background-color: #f9f9f9;
      border-radius: 0.06rem;
      margin-bottom: 0.16rem;
      &::placeholder {
        color: #777;
      }
    }
  }
  &__button {
    widows: 100%;
    line-height: 0.48rem;
    background: #0091ff;
    box-shadow: 0 0.04rem 0.08rem 0 rgba(0, 145, 255, 0.32);
    border-radius: 0.04rem;
    font-size: 0.16rem;
    color: #fff;
  }
  &__link {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 1.39rem;
    margin: auto;
    margin-top: 0.16rem;
    &__pass {
      font-size: 0.14rem;
      color: #777;
    }
    span {
      height: 0.17rem;
      width: 0.01rem;
      background-color: #888;
    }
  }
}
</style>