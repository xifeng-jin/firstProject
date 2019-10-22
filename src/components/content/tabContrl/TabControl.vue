<template>
  <div class="tab-control">
    <!--如果只是文字不一样的时候可以不需要使用插槽-->
    <!--active是所绑定的样式，当其为true的时候显示-->
    <div v-for="(item,index) in titles"
         class="tab-control-item" :class="{active: index === currentIndex}"
         @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    data() {
      return {
        currentIndex: 0
      }
    },
    methods: {
      itemClick(index) {
        /*改变currentIndex的值*/
        this.currentIndex = index;
        //将子组件发生的事件通过emit发送出去
        this.$emit('tabClick',index)
      }
    },
    props: {
      titles: {
        type:Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .tab-control {
    display: flex;
    text-align: center;
    font-size: 15px;
    height: 40px;
    line-height: 40px;

    background-color: #fff;

    z-index: 9;
  }
  .tab-control-item {
    flex: 1;
  }
  .tab-control-item span {
    padding: 0 5px 2px ;
  }
  .active {
    color: var(--color-high-text);
  }
  .active span {
    border-bottom: 2px solid var(--color-high-text);
  }
</style>
