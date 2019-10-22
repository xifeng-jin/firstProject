<template>
  <div class="goods-item" @click="itemClick" >
    <img :src="DetailGoodsItem.image" alt="">
    <div class="goods-info">
      <p>{{DetailGoodsItem.title}}</p>
      <span class="price"> {{ DetailGoodsItem.price}}</span>
      <span class="collect">{{ DetailGoodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailGoodsListItem",
    props: {
      DetailGoodsItem: {
        type:Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      itemClick() {
        // this.$router.push('/Detail/' + this.goodsItem.iid)
      },

    }
  }
</script>

<style scoped>
  .goods-item {
    /*padding-bottom为40px是为了让info处于这个区域*/
    padding-bottom: 40px;
    position: relative;

    /*这里的百分比相当于是给每个DetailGoodsListItem设置了一个图片宽度*/
    width: 48%;
  }
  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }
  .goods-info {
    font-size: 12px;
    position: absolute;
    left: 0;
    right: 0;
    /*之所以要bottom为0，是因为每张图片可能不一样大*/
    bottom: 0;
    overflow: hidden;
    text-align: center;
    padding-bottom: 5px;
  }
  .goods-info p {
    overflow: hidden;
    /*多余文字以...隐藏*/
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }
  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }
  .goods-info .collect {
    position: relative;
  }
  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/image/common/collect.svg") 0 0/14px 14px;
  }
</style>
