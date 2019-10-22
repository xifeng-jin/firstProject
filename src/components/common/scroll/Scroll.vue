<template>
  <div class="swapper" ref="wrapper">
    <!--ref拿子组件,但同样也可以在div上-->
    <!--ref在组件中，则this.$refs.refname获取到的是一个组件对象
        如果绑定在普通元素中，则this.$refs.refname获取到的就是该元素-->
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from '@better-scroll/core'
  export default {
    name: "Scroll",
    data() {
      return {
        scroll: null
      }
    },
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    mounted() {
      //不使用document.querySelector('.swapper')是怕别的位置也使用swapper，给需要绑定的东西添加一个ref
      //1.创建scroll
      this.scroll = new BScroll(this.$refs.wrapper,{
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      });
      //2.监听滚动位置
      if (this.probeType === 2 || this.probeType === 3) {
        this.scroll.on('scroll', (position) => {
          // console.log( position );
          //将位置发送出去，但是这个位置是一个关于横纵坐标的对象
          this.$emit('scroll',position)
        });
      }

      //3.监听滚动到底部
      if (this.pullUpLoad) {
        this.scroll.on('scrollEnd',() => {
          // console.log( '滚动到了底部' );
          this.$emit('scrollEnd')
          console.log( this.scroll );
        })
      }
    },
    methods: {
      //ES6语法，可以设置默认值
      scrollTo(x,y,time) {
        //**做一个&&的操作目的是希望在获得this.scroll的前提下再去获得scrollTo方法
        this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x,y,time);
        // console.log( this.scroll );
      },
      refresh() {
        console.log( '------' );
        this.scroll && this.scroll.refresh()
      },
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp()
      }
    }
  }
</script>

<style scoped>

</style>
