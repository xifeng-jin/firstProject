<template>
  <swiper>
    <swiper-item v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper,SwiperItem} from "components/common/swiper/index"

  export default {
    name: "HomeSwiper",
    data() {
      return {
        isLoad:false
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    props: {
      banners: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
      imageLoad() {
        console.log( '++++' );
        //用来记录状态是不是发送了，发送了就让他为true
        if (!this.isLoad) {
          this.$emit('swiperImageLoad');
          this.isLoad = true
        }
      }
    }
  }
</script>

<style scoped>

</style>
