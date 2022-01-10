<template>
  <div class="wrapper">
    <div class="serch">
      <span class="serch__back iconfont" @click="handleBackClick"
        >&#xe6f2;</span
      >
      <div class="serch__item">
        <span class="serch__item__icon iconfont">&#xe62d;</span>
        <input
          type="text"
          class="serch__item__input"
          placeholder="请输入商品名称搜索"
        />
      </div>
    </div>
    <ShopInfo :item="item" :hideBorder="true" />
    <Content :shopName='item.name'/>
    <Cart/>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import ShopInfo from "../../components/ShopInfo";
import Content from './Content'
import { useRouter, useRoute } from "vue-router";
import { get } from "../../utils/request";
import Cart from './Cart.vue';

//获取当前商铺信息
const useShopInfoEffect = () => {
  const data = reactive({ item: {} });
  const route = useRoute();
  const getItemData = async () => {
    const { id } = route.params;
    const result = await get(`/api/shop/${id}`);
    data.item = result.data;
  };
  const { item } = toRefs(data);
  return { getItemData, item };
};
//返回上一页
const useBackRouterEffect = () => {
  const router = useRouter();
  const handleBackClick = () => {
    router.back();
  };
  return { handleBackClick };
};

export default {
  name: "Shop",
  components: { ShopInfo,Content,Cart },
  setup() {
    const { getItemData, item } = useShopInfoEffect();
    const { handleBackClick } = useBackRouterEffect();
    getItemData();
    return { item, handleBackClick };
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  padding-left: 0.18rem;
}
.serch {
  margin: 0.16rem 0.18rem 0.16rem 0;
  display: flex;
  align-items: center;
  flex-direction: row;
  &__back {
    margin-right: 0.16rem;
    font-size: 0.24rem;
    color: #b6b6b6;
  }
  &__item {
    display: flex;
    align-items: center;
    line-height: 0.32rem;
    flex: 1;
    flex-direction: row;
    background: #f5f5f5;
    border-radius: 0.16rem;
    &__icon {
      font-size: 0.2rem;
      color: #b7b7b7;
      padding: 0 0.12rem 0 0.16rem;
    }
    &__input {
      background: #f5f5f5;
      width: 100%;
      font-size: 0.14rem;
      padding-right: 0.25rem;
      &::placeholder {
        font-size: 0.14rem;
        color: #333;
      }
    }
  }
}
</style>