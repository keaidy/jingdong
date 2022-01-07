<template>
  <div class="register">
    <img
      src="http://www.dell-lee.com/imgs/vue3/user.png"
      alt=""
      class="register__img"
    />
    <div class="register__input">
      <input
        type="text"
        class="register__input__text"
        placeholder="请输入手机号"
        v-model="username"
      />
      <input type="password" class="register__input__text" placeholder="请输入密码"  v-model="password"/>
      <input type="password" class="register__input__text" placeholder="确认密码"  v-model="ensurement"/>

    </div>
    <div class="register__button" @click="handleregister">注册</div>
    <div class="register__link">
      <p class="register__link__pass" @click="handleLoginClick">已有账号去登录</p>
    </div>
    <Toast v-if="showToast" :message="toastMessage"/>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { post } from "../../utils/request";
import Toast, { useToastEffect } from "../../components/Toast";
const useregisterEffect = (hiddenToast) => {
  const router = useRouter();
  const data = reactive({
    username: '',
    password: '',
    ensurement: ''
  });
  const handleregister = async () => {
    try {
      const result = await post("/api/1user/register", {
        username: data.username,
        password: data.password,
        
      });
      if (result?.errno === 0) {
        router.push({ name: "Login" });
      } else {
        hiddenToast("注册失败");
      }
    } catch (e) {
      hiddenToast("请求失败");
    }
  };
  const { username, password,ensurement } = toRefs(data);
  return { username, password,ensurement, handleregister };
};


export default{
  name: 'Register',
  components:{Toast},
  setup() {
    const router = useRouter();
    const handleLoginClick =()=>{
      router.push({name:'Login'})
    }
    const {showToast,toastMessage,hiddenToast}=useToastEffect();
    const { username, password, ensurement,handleregister } = useregisterEffect(hiddenToast);
    return{showToast,toastMessage,handleLoginClick,username, password,ensurement, handleregister }
  }
}
</script>

<style lang='scss' scoped>
.register {
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
  &__link{
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    margin-top: 0.16rem;
    &__pass{
      font-size: 0.14rem;
      color: #777;
    }
  }
}
</style>