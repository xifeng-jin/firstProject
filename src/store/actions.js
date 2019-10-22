import {
  ADD_COUNTER,
  ADD_TO_CART
} from "./mutations-type";
//修改state中的状态，它每一个方法尽可能单一一点，任何一个该百年都会发生状态的改变
//1.对新添加的商品进行判断
// let oldProduct = null;
// for ( let item of state.cartList ) {
//   if (item.iid === payload.iid) {
//     oldProduct = item
//   }
// }
// if (oldProduct) {
//   oldProduct.counter += 1;
// } else {
//   payload.counter = 1;
//   state.cartList.push(payload)
// }
//返回查找到的item
export default {
  addCart(context,payload) {
    return new Promise((resolve,reject) => {
      //查找数组中是否有商品
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid);
      //将该商品添加或者对其数量加一
      if (oldProduct) {
        context.commit('ADD_COUNTER',oldProduct)
        resolve('当前商品数量加1')
      } else {
        payload.count = 1;
        context.commit('ADD_TO_CART',payload)
        resolve('添加新的商品')
      }
    })
  }
}
