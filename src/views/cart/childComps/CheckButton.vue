<template>
  <!--这里不能单纯的监听一个item而是要监听创建的item，这样可以避免一个点击相当于是全选了，就是修改模型-->
    <div>
      <div class="icon-selector" :class="{check: isChecked}">
        <img src="../../../assets/image/cart/tick.svg" alt="">
      </div>
    </div>
</template>

<script>
	export default {
		name: "CheckButton",
    props: {
		  //使用isChecked去控制它的样式是否显示，而button组件中又可以通过传值来改变isChecked的值
		  isChecked: {
		    type: Boolean,
        default: false
      }
    },
    methods: {
    }
	}
</script>

<style scoped>
  .icon-selector {
    position: relative;
    margin: 0;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid #ccc;
    cursor: pointer;
  }

  .check {
    background-color: #ff0000;
    border-color: #ff0000;
  }
</style>
