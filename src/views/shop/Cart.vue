<template>
  <div class="cart">
    <div class="cart__icon">
      <img src="./img/cart.png" alt="" class="cart__icon__img" />
      <div class="cart__icon__tag">{{ total }}</div>
    </div>
    <div class="cart__price">
      总计：<span class="cart__price__check">&yen;{{ price }}</span>
    </div>
    <div class="cart__go">去结算</div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

const useCartEffect = () => {
  const store = useStore();
  const route = useRoute();
  const shopId = route.params.id;
  const {cartList} = store.state
  const total = computed(() => {
    const productList = cartList[shopId]
    let count = 0
    if (productList) {
      for (let i in productList) {
        const product = productList[i]
        count += product.count
      }
    }
   return count
  })
  const price = computed(() => {
    const productList = cartList[shopId];
    let count = 0;
    if (productList) {
      for (let i in productList) {
        const product = productList[i]
        count += (product.price * product.count);
      }
    }
    return count.toFixed(2);
  });
  return { total, price };
};
export default {
  name: "Cart",
  setup() {
    const { total, price } = useCartEffect();
    return { total, price };
  },
};
</script>

<style lang="scss" scoped>
.cart {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 0.49rem;
  background-color: #fff;
  box-shadow: 0 -1px 1px 0 #f1f1f1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &__icon {
    position: relative;
    display: flex;
    align-items: center;
    &__img {
      width: 0.28rem;
      height: 0.26rem;
      margin-left: 0.24rem;
    }
    &__tag {
      position: absolute;
      left: 0.5rem;
      top: -0.06rem;
      width: 0.15rem;
      height: 0.15rem;
      line-height: 0.15rem;
      background-color: #e93b3b;
      border-radius: 50%;
      font-size: 0.12rem;
      text-align: center;
      color: #fff;
      // transform: scale(.5);
    }
  }
  &__price {
    flex: 1;
    display: flex;
    align-items: center;
    padding-left: 0.32rem;
    font-size: 0.12rem;
    line-height: 0.49rem;
    color: #333;
    &__check {
      font-size: 0.18rem;
      color: #e93b3b;
    }
  }
  &__go {
    width: 0.98rem;
    background-color: #4fb0f9;
    color: #fff;
    font-size: 0.14rem;
    line-height: 0.49rem;
    text-align: center;
  }
}
</style>