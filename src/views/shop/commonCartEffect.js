import { useStore } from "vuex";
import { computed } from 'vue'
export const useCommonCartEffect = (shopId) => {
  const store = useStore();
  const cartList = store.state.cartList
  const changeCartItemInfo = (shopId, productId, productInfo, num) => {
    store.commit("changeCartItemInfo", {
      shopId,
      productId,
      productInfo,
      num,
    });
  };
  const productList = computed(()=>{
    const productList = cartList[shopId]?.productList || []
    return productList
  });
  const shopName = computed(()=>{
    const shopName = cartList[shopId]?.shopName || ''
    return shopName
   });
  const price = computed(() => {
    const productList = cartList[shopId]?.productList;
    let count = 0;
    if (productList) {
      for (let i in productList) {
        const product = productList[i];
        if (product.check) {
          count += (product.price * product.count);
        }
      }
    }
    return count.toFixed(2);
  });
  return { cartList, changeCartItemInfo ,productList,shopName,price};
};