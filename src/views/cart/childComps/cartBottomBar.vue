<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button"
                    @click.native="checkClick"
                    :is-checked="isSelectedAll"></check-button>
      <span>全选</span>
    </div>

    <div class="total">
      合计：{{totalPrice}}
    </div>

    <div class="calculate" @click="calcClick">
          去计算（{{checkLength}}）
    </div>
  </div>
</template>

<script>
  import CheckButton from "./CheckButton"
  export default {
    name: "cartBottomBar",
    components: {
      CheckButton
    },
    methods: {
      //逻辑：如果原来全部选中，那就全部不选中；如果部分选中或者全部不选中，则全部选中
      checkClick() {
        if (this.isSelectedAll) {
          this.$store.state.cartList.forEach(item => item.checked = false)
        } else {
          this.$store.state.cartList.forEach(item => item.checked = true)
        }
      },
      calcClick() {
        if (! this.isSelectedAll) {
          this.$toast.show('请选择购买商品',2000)
        } else {
          alert('购买成功!!!')
        }
      }
    },
    computed: {
      totalPrice() {
        return '￥' + this.$store.state.cartList.filter(item => {
          return item.checked
        }).reduce((preValue,item) => {
          return preValue + item.price * item.count
        },0).toFixed(2)
      },
      checkLength() {
        return this.$store.getters.cartList.filter(item => item.checked).length
      },
      isSelectedAll() {
        // if (this.$store.state.cartList.length === 0) {
        //   return false
        // }
        // for ( let item of this.$store.state.cartList ) {
        //   if (! item.checked ) {
        //     return false
        //   }
        // }
        // return  true;

        //查找是否存在已经添加购物车的item却没有选中的个数，如果有，那就取非返回
        if (this.$store.state.cartList.length === 0) return false;
        // return !(this.$store.state.cartList.filter(item => !item.checked).length)
        //使用find一旦查找到就停止，性能更高点，注意使用两个“！”的妙用
        return !this.$store.state.cartList.find(item => !item.checked)
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    display: flex;
    position: relative;

    line-height: 40px;
    height: 40px;
    font-size: 14px;

    background-color: #eeeeee;
  }
  .check-button {
    width: 20px;
    height: 20px;
    /*防止继承到line-height为40px*/
    line-height: 20px;
    margin-right: 5px;
  }
  .check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 60px;
  }
  .total {
    margin-left: 20px;
    flex: 1;
  }
  .calculate {
    width: 90px;
    background-color: #ff0000;
    color: rgba(255,255,255,0.8);
    text-align: center;
  }
</style>
