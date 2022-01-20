<template>
  <div class="order">
    <div class="order__price">
      实付金额：<span>￥{{ price }}</span>
    </div>
    <div class="order__to">提交订单</div>
  </div>
</template>
<script>
import { useRoute} from "vue-router";
import { useCommonCartEffect } from "../shop/commonCartEffect";
export default {
  name: 'Order',
  setup() {
    const route = useRoute();
    const shopId = route.params.id
    const { price } = useCommonCartEffect(shopId);
    return { price };
  },
}
</script>
<style lang="scss" scoped>
.order {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 0.49rem;
  background-color: #fff;
  display: flex;
  align-items: center;
  flex-direction: row;
  &__price {
    flex: 1;
    padding-left: 0.24rem;
    font-size: 0.14rem;
    color: #333;
    line-height: 0.2rem;
    span {
      font-weight: bold;
    }
  }
  &__to {
    line-height: 0.49rem;
    font-size: 0.14rem;
    color: #fff;
    background-color: #4fb0f9;
    height: 0.49rem;
    width: 0.98rem;
    text-align: center;
  }
}
</style>