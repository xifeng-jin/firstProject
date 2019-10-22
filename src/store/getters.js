

export default {
  //获得数组长度
  cartLength(state) {
    return state.cartList.length
  },
  //获取数据
  cartList(state) {
    //这是拿到所保存的数据
    return state.cartList
  }
}
