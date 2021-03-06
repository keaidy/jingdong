<template>
  <div><div class="mask" v-if="showCart" @click="handleCartShowChange"></div>
  <div class="check">
    <div v-if="showCart">
      <div class="check__header" v-if="total">
        <div class="check__header__all">
          <div
            class="check__item__icon iconfont"
            v-html="allChecked ? '&#xe652;' : '&#xe6f7;'"
            @click="() => setCartItemsChecked(shopId)"
          ></div>
          <div class="check__header__text">全选</div>
        </div>
        <div
          class="check__header__clear"
          @click="() => allCartItemCleared(shopId)"
        >
          清空购物车
        </div>
      </div>
      <div class="product">
        <template v-for="item in productlist" :key="item._id">
          <div class="product__item" v-if="item.count > 0">
            <div
              class="product__item__icon iconfont"
              v-html="item.check ? '&#xe652;' : '&#xe6f7;'"
              @click="() => changeCartItemChecked(shopId, item._id)"
            />
            <img :src="item.imgUrl" alt="" class="product__item__img" />
            <div class="product__item__list">
              <h4 class="product__item__title">{{ item.name }}</h4>
              <p class="product__item__price">
                <span class="product__item__yen">&yen;</span>{{ item.price }}
                <span class="product__item__origin"
                  >&yen;{{ item.oldPrice }}</span
                >
              </p>
            </div>
            <div class="product__number">
              <span
                class="product__number__minus"
                @click="
                  () => {
                    changeCartItemInfo(shopId, item._id, item, -1);
                  }
                "
                >-</span
              >
              {{ item.count || 0 }}
              <span
                class="product__number__plus"
                @click="
                  () => {
                    changeCartItemInfo(shopId, item._id, item, 1);
                  }
                "
                >+</span
              >
            </div>
          </div>
        </template>
      </div>
    </div>
    <div class="cart">
      <div class="cart__icon">
        <img src="./img/cart.png" alt="" class="cart__icon__img" 
          @click="handleCartShowChange"
        />
        <div class="cart__icon__tag">{{ total }}</div>
      </div>
      <div class="cart__price">
        总计：<span class="cart__price__check">&yen;{{ price }}</span>
      </div>
      <router-link :to="{path: `/orderconfirmation/${shopId}`}">
        <div class="cart__go">去结算</div>
      </router-link>
    </div>
  </div></div>
</template>

<script>
import { computed ,ref} from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { useCommonCartEffect } from "./commonCartEffect";

// 获取购物车信息逻辑
const useCartEffect = (shopId) => {
  const store = useStore();
  const { cartList } = store.state;
  const total = computed(() => {
    const productList = cartList[shopId]?.productList;
    let count = 0;
    if (productList) {
      for (let i in productList) {
        const product = productList[i];
        count += product.count;
      }
    }
    return count;
  });
  const allChecked = computed(() => {
    const products = cartList[shopId]?.productList;
    let allChecked = true;
    if (products) {
      for (let i in products) {
        const product = products[i];
        if (product.count > 0 && !product.check) {
          allChecked = false;
        }
      }
    }
    return allChecked;
  });
  const productlist = computed(() => {
    const productList = cartList[shopId]?.productList || [];
    return productList;
  });
  const changeCartItemChecked = (shopId, productId) => {
    store.commit("changeCartItemChecked", { shopId, productId });
  };
  const allCartItemCleared = (shopId) => {
    store.commit("allCartItemCleared", { shopId });
  };
  const setCartItemsChecked = (shopId) => {
    store.commit("setCartItemsChecked", { shopId });
  };
  return {
    total,
    productlist,
    changeCartItemChecked,
    allChecked,
    allCartItemCleared,
    setCartItemsChecked,
  };
};
// 展示隐藏购物车逻辑
const toggleCartEffect = () => {
  const showCart = ref(false)
  const handleCartShowChange = () => {
    showCart.value = !showCart.value;
  }
  return { showCart, handleCartShowChange}
}
export default {
  name: "Cart",
  setup() {
    const route = useRoute();
    const shopId = route.params.id;
    const {
      total,
      productlist,
      changeCartItemChecked,
      allCartItemCleared,
      setCartItemsChecked,
      allChecked,
    } = useCartEffect(shopId);
    const { changeCartItemInfo ,price} = useCommonCartEffect(shopId);
    const {showCart,handleCartShowChange} = toggleCartEffect()
    return {
      shopId,
      total,
      price,
      changeCartItemInfo,
      productlist,
      changeCartItemChecked,
      allCartItemCleared,
      setCartItemsChecked,
      allChecked,
      showCart,
      handleCartShowChange
    };
  },
};
</script>

<style lang="scss" scoped>
.mask{
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: rgba(0, 0, 0, .5);
  z-index: 1;
}
.check {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  background-color: #fff;
  box-shadow: 0 -1px 1px 0 #f1f1f1;
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 0.52rem;
    padding-left: 0.16rem;
    padding-right: 0.18rem;
    border-bottom: 1px solid #f1f1f1;
    &__all {
      display: flex;
      flex-direction: row;
    }
    &__text,
    &__clear {
      font-size: 14px;
      color: #333333;
    }
  }
  &__item__icon {
    color: #0091ff;
    font-size: 0.2rem;
    margin-right: 0.119rem;
  }
}
.cart {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 0.49rem;
  border-top: 1px solid #f1f1f1;
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
.product {
  overflow-y: scroll;
  flex: 1;
  padding-left: 0.16rem;
  &__item {
    padding: 0.16rem 0;
    display: flex;
    align-items: center;
    &__icon {
      margin-right: 0.2rem;
      color: #0091ff;
      font-size: 0.2rem;
    }
    &__img {
      width: 0.46rem;
      height: 0.46rem;
    }
    &__list {
      flex: 1;
      padding-left: 0.16rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    &__title {
      font-size: 0.14rem;
      color: #333;
      padding-bottom: 0.06rem;
    }
    &__price {
      font-size: 14px;
      color: #e93b3b;
    }
    &__yuan {
      font-size: 0.12rem;
    }
    &__origin {
      margin-left: 0.06rem;
      line-height: 0.2rem;
      font-size: 0.12rem;
      color: #999;
      text-decoration: line-through;
    }
  }
  &__number {
    width: 0.76rem;
    margin-right: 0.18rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.16rem;
    &__minus,
    &__plus {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 0.2rem;
      height: 0.2rem;
      border-radius: 50%;
      font-size: 0.2rem;
    }
    &__minus {
      border: 1px solid #666;
      margin-right: 0.114rem;
    }
    &__plus {
      background-color: #0091ff;
      margin-left: 0.114rem;
      color: #fff;
    }
  }
}
</style>