<template>
  <div class="header">
    <div class="header__top">
      <div class="header__top__back iconfont" @click="handleBackClick">
        &#xe6f2;
      </div>
      <div class="header__top__title">确认订单</div>
    </div>
    <div class="header__receiver">
      <div class="header__receiver__address">
        <h3 class="address__title">收货地址</h3>
        <div class="address__content">北京理工大学国防科技园2号楼10层</div>
        <div class="address__name">
          <span>瑶妹（先生）</span>
          <span>18911024266</span>
        </div>
      </div>
      <div class="header__receiver__back iconfont">&#xe6f2;</div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  name:'TopArea',
  setup() {
    const router = useRouter();
    const handleBackClick = ()=>{
      router.back();
    }
    return {handleBackClick};
  },
};
</script>

<style lang="scss" scoped>
.header {
  padding: 0 0.18rem;
  height: 1.96rem;
  background-size: 100% 1.59rem;
  background-image: linear-gradient(0deg, rgba(0, 145, 255, 0) 4%, #0091ff 50%);
  background-repeat: no-repeat;
  &__top {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding-top: 0.245rem;
    padding-bottom: 0.22rem;
    &__title {
      flex: 1;
      text-align: center;
      margin-right: 0.22rem;
      color: #fff;
      font-size: 0.16rem;
    }
    &__back {
      font-size: 0.22rem;
      color: #fff;
    }
  }
  &__receiver {
    width: 3.39rem;
    height: 1.11rem;
    padding: 0.16rem;
    background-color: #fff;
    border-radius: 0.04rem;
    display: flex;
    align-items: center;
    &__address {
      flex: 1;
      height: 0.79rem;
      .address__title {
        font-size: 0.16rem;
        color: #333;
        padding-bottom: 0.13rem;
      }
      .address__content {
        font-size: 0.14rem;
        color: #333;
        padding-bottom: 0.12rem;
      }
      .address__name {
        font-size: 0.12rem;
        color: #666;
        span {
          margin-right: 0.06rem;
        }
      }
    }
    &__back {
      transform: rotate(180deg);
      color: #666;
      font-size: 0.2rem;
    }
  }
}
</style>