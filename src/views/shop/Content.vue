<template>
  <div class="content">
    <div class="category">
      <ul class="category__item">
        <li
          v-for="item in categories"
          :key="item.name"
          :class="{
            category__item__list: true,
            'category__item--active': currentTab === item.tab,
          }"
          @click="() => handleCategoryClick(item.tab)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
    <div class="product">
      <div class="product__item" v-for="item in list" :key="item._id">
        <img
          :src="item.imgUrl"
          alt=""
          class="product__item__img"
        />
        <div class="product__item__list">
          <h4 class="product__item__title">{{ item.name }}</h4>
          <p class="product__item__sales">月售{{ item.sales }}</p>
          <p class="product__item__price">
            <span class="product__item__yen">&yen;</span>{{ item.price }}
            <span class="product__item__origin">&yen;{{ item.oldPrice }}</span>
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
          {{ cartList?.[shopId]?.[item._id]?.count || 0 }}
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
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { get } from "../../utils/request";
import {useCommonCartEffect} from './commonCartEffect'

const categories = [
  { name: "全部商品", tab: "all" },
  { name: "秒杀", tab: "seckill" },
  { name: "新鲜水果", tab: "fruit" },
];
const useTabEffect = () => {
  const currentTab = ref(categories[0].tab);
  const handleCategoryClick = (tab) => {
    currentTab.value = tab;
  };
  return { handleCategoryClick, currentTab };
};
//获取数据
const useCurrentListEffect = (currentTab, shopId) => {
  const content = reactive({
    list: [],
  });
  const getContentData = async () => {
    const result = await get(`/api/shop/${shopId}/products`, {
      tab: currentTab.value,
    });
    if (result?.errno === 0 && result?.data?.length) {
      content.list = result.data;
    }
  };
  watchEffect(() => {
    getContentData();
  });
  const { list } = toRefs(content);
  return { list };
};
//购物车逻辑


export default {
  name: "Content",
  setup() {
    const route = useRoute();
    const shopId = route.params.id;
    const { handleCategoryClick, currentTab } = useTabEffect();
    const { list } = useCurrentListEffect(currentTab, shopId);
    const { changeCartItemInfo, cartList} = useCommonCartEffect();
    return {
      list,
      shopId,
      currentTab,
      categories,
      handleCategoryClick,
      changeCartItemInfo,
      cartList
    };
  },
};
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  top: 1.5rem;
  bottom: 0.49rem;
}
.category {
  width: 0.76rem;
  height: 100%;
  overflow-y: scroll;
  &__item {
    background-color: #f5f5f5;
    height: 100%;
    &__list {
      line-height: 0.4rem;
      text-align: center;
      font-size: 0.14rem;
      color: #333;
    }
    &--active {
      background-color: #fff;
    }
  }
}
.product {
  overflow-y: scroll;
  width: 100%;
  height: 100%;
  padding-left: 0.16rem;
  &__item {
    padding-bottom: 0.15rem;
    border-bottom: 1px solid #f1f1f1;
    margin-bottom: 0.15rem;
    display: flex;
    &__img {
      width: 0.68rem;
      height: 0.68rem;
    }
    &__list {
      flex: 1;
      padding-left: 0.16rem;
    }
    &__title {
      font-size: 0.14rem;
      color: #333;
    }
    &__sales {
      font-size: 0.14rem;
      margin: 0.08rem 0;
      color: #333;
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
    align-items: flex-end;
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