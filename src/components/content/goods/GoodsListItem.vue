<template>
  <div class="goods-item" @click="itemClick">
    <img v-lazy="showImage" alt="" @load="imageLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price"> {{ goodsItem.price}}</span>
      <span class="collect">{{ goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props: {
      goodsItem: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
      showImage() {
        return this.goodsItem.image || this.goodsItem.show.img
      }
    },
    methods: {
      imageLoad() {
        //解决滚动不适的原因
        // if (this.$router.path.indexOf( '/home' )) {
        //   this.$bus.$emit('homeItemImagLoad')
        // } else if (this.$router.path.indexOf( '/detail' )) {
        //   this.$bus.$emit('detailItemImagLoad')
        // }
        this.$bus.$emit('itemImageLoad')
        // console.log( this.$bus );
      },
      itemClick() {
        console.log( 'jjj' );
        this.$router.push('/Detail/' + this.goodsItem.iid)
        // this.$router.push({
        //   path: '/Detail',
        //   query: {
        //     iid: this.goodsItem.iid
        //   }
        // })
      }
    }
  }
</script>

<style scoped>
  .goods-item {
    /*padding-bottom为40px是为了让info处于这个区域*/
    padding-bottom: 40px;
    position: relative;

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
