<template>
  <div class="cart">
    <!--商品导航栏-->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <!--商品列表-->
    <!--数据可以从vuex中拿，也可以从cart.vue中传过去-->
    <cart-list></cart-list>
    <!--商品底部显示-->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar"
  import CartList from "./childComps/cartList"
  import CartBottomBar from "./childComps/cartBottomBar"
  //**mapGetters辅助函数，仅仅是将store中的getter映射到局部计算属性**
  //是从vuex中直接导入的
  import { mapGetters } from "vuex"

  export default {
    name: "cart",
    data() {
      return {
      }
    },
    components: {
      NavBar,
      CartList,
      CartBottomBar
    },
    computed:{
      //方法一，一一对应
      ...mapGetters(['cartLength'])
      //方法二，对象显示
      // ...mapGetters({
      //   length: 'cartLength'
      // })
    },
    filters: {

    }
  }
</script>

<style scoped>
  .cart {
    height: 100vh;
  }
  .nav-bar {
    /*background-color: red;*/
    background-color: var(--color-tint);
    color: #FFFFFF;
    font-weight:500;

    position: relative;
    z-index: 9;
  }
</style>
