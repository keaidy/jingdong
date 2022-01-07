<template>
  <div class="position">
        <span class="iconfont position__icon">&#xe619;</span>
        <div class="position__title">北京理工大学国防科技园2号楼10层</div>
        <span class="iconfont position__notice">&#xe60b;</span>
      </div>
      <div class="search">
        <span class="iconfont">&#xe62d;</span>
        <span class="search__text">山姆会员商店优惠商品</span>
      </div>
      <div class="banner">
        <img src="http://www.dell-lee.com/imgs/vue3/banner.jpg" alt=""
        class="banner__img"
        >
      </div>
      <div class="nav">
        <div class="nav__item" v-for="item in iconsList" :key="item.desc">
          <img :src="`http://www.dell-lee.com/imgs/vue3/${item.imgName}.png`" alt="" class="nav__item__img">
          <p class="nav__item__title">{{item.desc}}</p>
        </div>
      </div>
      <div class="gap"></div>
</template>

<script>
export default {
  name: 'StaticPart',
  setup() {
    const iconsList = [
      { imgName: "超市", desc: "超市便利"},
      { imgName: "菜市场", desc: "菜市场"},
      { imgName: "水果店", desc: "水果店"},
      { imgName: "鲜花", desc: "鲜花绿植"},
      { imgName: "医药健康", desc: "医药健康"},
      { imgName: "家居", desc: "家居时尚"},
      { imgName: "蛋糕", desc: "烘培蛋糕"},
      { imgName: "签到", desc: "签到"},
      { imgName: "大牌免运", desc: "大牌免运"},
      { imgName: "红包", desc: "红包套餐"},
    ]
    return { iconsList }
  }
}
</script>

<style lang="scss" scoped>
.position {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 0.22rem;
  margin: 0.16rem 0;
  color: #333333;
  &__icon {
    font-size: 0.22rem !important;
  }
  &__title {
    flex: 1;
    padding: 0 0.1rem;
    font-size: 0.16rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    white-space: normal !important;
    word-wrap: break-word;
  }
  &__notice {
    font-size: 0.22rem !important;
  }
}
.search {
  background: #f5f5f5;
  border-radius: 16px;
  line-height: 0.32rem;
   margin-bottom: .12rem;
  color: #B7B7B7;
  .iconfont{
    font-size: .16rem;
    padding-left: 0.16rem;
  }
  &__text{
    padding-left: 0.121rem;
    font-size: .16rem;
  }
}
.banner{
  height: 0;
  overflow: hidden;
  padding-bottom: 25.4%;
  &__img{
    width: 100%;
  }
}
.nav{
  display: flex;
  flex-wrap: wrap;
  margin-bottom: .16rem;
  &__item{
    width: 20%;
    text-align: center;
    padding-top: .16rem;
    &__img{
      width: 0.4rem;
      height: 0.4rem;
      padding-bottom: 0.06rem;
    }
    &__title{
      font-size: 0.13rem;
      color: #333333;
    }
  }
}
.gap{
  height: 0.1rem;
  background-color: #f1f1f1;
  margin: 0 -.18rem;
}
</style>