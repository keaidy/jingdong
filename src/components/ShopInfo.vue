<template>
  <div class="shop">
    <img :src="item.imgUrl" alt="" class="shop__img" />
    <div :class="{'shop__content':true,'shop__content--border':hideBorder?false:true}">
      <div class="shop__content__title">{{ item.name }}</div>
      <div class="shop__content__tags">
        <span class="shop__content__tag">月售{{ item.sales }}+</span>
        <span class="shop__content__tag">起送￥{{ item.expressPrice }}</span>
        <span class="shop__content__tag"
          >基础运费{{ item.expressLimit }}</span
        >
      </div>
      <div class="shop__content__highlight">{{ item.slogan }}</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ShopInfo',
  props:['item','hideBorder'],
}
</script>

<style lang="scss" scoped>
  .shop{
    display: flex;
    margin-bottom:0.12rem ;
    &__img{
      width: 0.56rem;
      height: 0.56rem;
    }
    &__content{
    flex: 1;
    margin-left: 0.16rem;
    &--border{
      border-bottom: 0.01rem solid #f1f1f1;
    }
    padding-bottom: 0.12rem;
    &__title{
      font-size: .16rem;
      color: #333;
    }
    &__tags{
      padding:0.08rem 0;
    }
    &__tag{
      padding-right: 0.16rem;
      font-size: 0.13rem;
      color: #333;;
    }
    &__highlight{
      color: #E93B3B ;
      font-size: 0.13rem;
    }
  }
  }
  
</style>