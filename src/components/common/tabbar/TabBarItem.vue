<template>
  <div class="tab-bar-item" @click="itemClick">
    <div :style="activeStyle">
      <div v-if="!isActive">
        <slot name="item-text"></slot>
      </div>
      <div v-else>
        <slot name="item-text-active" ></slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props: {
      path: String,
      activeColor: {
        type: String,
        default: 'blue'
      }
    },
    data() {
      return {
        //isActive: true
      }
    },
    computed: {
      isActive() {
        // /home -> item1(/home)  = true
        // /home -> item1(/category)  = false
        // /home -> item1(/cart)  = false
        // /home -> item1(/profile)  = false
        //判断当前路由的路径是否包含当前的路径
        return this.$route.path.indexOf(this.path) !== -1
      },
      activeStyle() {
        return this.isActive ? {color: this.activeColor} : { }
      }
    },
    methods: {
      itemClick() {
        //console.log( 'itemClick' )
        //console.log(this.$route.path) 这是上一个组件的路径
        //this.$router.replace(this.path);
        //当点击的时候进行路由的跳转
        this.$router.push(this.path);
        //也可以用Push
      }
    }
  }
</script>

<style scoped>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
  }

</style>
