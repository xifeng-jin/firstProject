<template>
  <swiper class="detail-swiper">
    <swiper-item v-for="item in topImages">
      <img :src="item" alt="显示失败">
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper , SwiperItem} from "components/common/swiper"

  export default {
    name: "DetailSwiper",
    components:{
      SwiperItem,
      Swiper
    },
    props: {
      topImages: {
        type:Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .detail-swiper {
    height: 260px;
    overflow: hidden;
  }
</style>
