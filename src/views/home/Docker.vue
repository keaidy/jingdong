<template>
  <div class="docker__layout">
    <ul class="docker__list">
      <li class="docker__item" v-for="(items,index) in dockerList" :key="items.text">
        <a href="jacascrip:;" :class="{'docker__content':true,'docker__content--active':index===0}" >
          <span class="iconfont" v-html="items.icon"></span>
          <div class="docker__content__title">{{ items.text }}</div>
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'Docker',
  setup() {
    const dockerList = [
      {icon: '&#xe6f3;', text: '首页'},
      {icon: '&#xe7e5;', text: '购物车'},
      {icon: '&#xe61e;', text: '订单'},
      {icon: '&#xe660;', text: '我的'},
    ];
    return { dockerList }
  }
}
</script>


<style lang="scss" scoped>
.docker__layout {
  position: fixed;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
  padding: 0 0.18rem;
  border-top: 1px solid #f1f1f1;
  box-shadow: 0 -1px 1px 0 #f1f1f1;
}
.docker__list {
  height: 0.49rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.docker__item {
  width: 25%;
  .docker__content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: #333333;
    .iconfont {
      font-size: 0.18rem;
      margin: 0.07rem 0 0.02rem 0;
    }
    &__title {
      font-size: 0.1rem;
    }
    &--active {
      color: #1fa4fc;
    }
  }
}
</style>