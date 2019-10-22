<template>
  <!--这个是路由的部分-->
  <tab-bar>
    <tab-bar-item path="/Home" activeClor="blue">
      <div slot="item-text">首页</div>
      <div slot="item-text-active">首页激活</div>
    </tab-bar-item>
    <tab-bar-item path="/Category" activeClor="blue">
      <div slot="item-text">分类</div>
      <div slot="item-text-active">分类激活</div>
    </tab-bar-item>
    <tab-bar-item path="/Cart" activeClor="blue">
      <div slot="item-text">购物车</div>
      <div slot="item-text-active">购物车激活</div>
    </tab-bar-item>
    <tab-bar-item path="/Profile" activeClor="blue">
      <div slot="item-text">我的</div>
      <div slot="item-text-active">我的激活</div>
    </tab-bar-item>
  </tab-bar>
</template>

  <script>
    import TabBar from 'components/common/tabbar/TabBar'
    import TabBarItem from 'components/common/tabbar/TabBarItem'

    export default {
      name: "MainTabBar",
      components: {
        TabBar,
        TabBarItem
      }
    }
  </script>

<style scoped>

</style>
