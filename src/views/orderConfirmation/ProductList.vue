<template>
  <div class="product">
      <h3 class="product__title">{{ shopName }}</h3>
      <div class="product__wrapper">
        <div class="product__list">
          <template  v-for="item in productList"
            :key="item._id">
            <div
            class="product__item"
            v-if="item.count>0"
          >
            <img class="product__item__img" :src="item.imgUrl" />
            <div class="product__item__detail">
              <h4 class="product__item__title">{{ item.name }}</h4>
              <p class="product__item__price">
                <span class="product__item__yen">&yen;</span>{{ item.price }} x
                {{ item.count }}
              </p>
            </div>
            <div class="product__number">
              {{ (item.price * item.count).toFixed(2) }}
            </div>
          </div>
          </template>         
        </div>
      </div>
    </div>
</template>
<script>
import { useRoute} from "vue-router";
import { useCommonCartEffect } from "../shop/commonCartEffect";
export default {
  name: 'ProductList',
  setup(){
    const route = useRoute();
    const shopId = route.params.id;
    const { productList, shopName } = useCommonCartEffect(shopId);
    return { productList, shopName };
  }
}
</script>
<style lang="scss" scoped>
.product {
  overflow-y: scroll;
  margin: 0 0.18rem;
  background-color: #fff;
  border-radius: 0.04rem;
  &__title {
    padding: 0.16rem;
    font-size: 0.16rem;
    color: #333;
  }
  &__wrapper {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0.55rem;
    top: 2.45rem;
    overflow-y: scroll;
    margin: 0 0.18rem;
  }
  &__list {
    background-color: #fff;
  }
  &__item {
    padding: 0.16rem;
    display: flex;
    &__img {
      width: 0.46rem;
      height: 0.46rem;
      margin-right: 0.16rem;
    }
    &__detail {
      flex: 1;
    }
    &__title {
      font-size: 0.14rem;
      line-height: 0.2rem;
      color: #333;
      padding-bottom: 0.06rem;
    }
    &__price {
      line-height: 0.2rem;
      font-size: 14px;
      color: #e93b3b;
    }
    &__yuan {
      font-size: 0.12rem;
    }
  }
  &__number {
    line-height: 0.2rem;
    font-size: 14px;
    color: #000000;
    display: flex;
    align-items: flex-end;
  }
}
</style>