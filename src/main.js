import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
import toast from 'components/common/toast'


Vue.config.productionTip = false;

//给Vue原型添加一个$bus的Vue实例，然后就可以通过他当作事件总线进行发送信息，这个事件总线
//是可以在任意连个组件中进行传递信息，但是现在用的比较少，只能在特定时刻使用
Vue.prototype.$bus = new Vue();

Vue.use(toast);
Vue.use(VueLazyLoad,{
  loading: require('./assets/image/common/placeholder.png')
});

//解决300ms延迟
FastClick.attach(document.body);

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app');
