import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('../views/home/Home');
const Category = () => import('../views/category/category');
const Cart = () => import('../views/cart/cart');
const Profile = () => import('../views/profile/profile');

const Detail = () => import('../views/detail/Detail')
Vue.use(Router)

const routes = [
  {
    path: '',
    redirect: '/Home'
  },
  {
    path: '/Home',
    component: Home
  },
  {
    path: '/Category',
    component: Category
  },
  {
    path: '/Cart',
    component: Cart
  },
  {
    path: '/Profile',
    component: Profile
  },
  {
    path: '/Detail/:iid',
    component: Detail
  }
];
const router = new Router({
  routes,
  mode: 'history'
});
export default router
