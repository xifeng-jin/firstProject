<template>
  <nav-bar>
    <div slot="left" class="backImage" @click="backClick">
      <img src="../../../assets/image/common/back.svg" alt="">
    </div>
    <div slot="center" class="title">
      <div v-for="(item,index) in titles"
                  @click="titleClick(index)"
                  :class="{active: index === currentIndex}"
                  class="title-item">
        {{item}}
      </div>
    </div>
  </nav-bar>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar"
  export default {
    name: "DetailNavBar",
    data(){
      return {
        titles: ['商品','参数','评论','推荐'],
        currentIndex: 0
      }
    },
    components: {
      NavBar
    },
    methods: {
      titleClick(index) {
        this.currentIndex = index;
        this.$emit('titleClick',index)
      },
      backClick() {
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>
  .title{
    display: flex;
    font-size: 14px;
  }
  .title-item {
    flex: 1;
  }
  .active {
    color: var(--color-high-text);
  }
  .backImage img {
    margin-top: 12px;
  }
</style>
