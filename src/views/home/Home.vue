<template>
  <!--有的时候本地服务更新并不会全部更新，因此这个热更新可以选择在页面中重新更新一次这个热更新不要太过于依赖于它-->
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物车</div>
    </nav-bar>
    <tab-control :titles="['流行','新款','精选']"
                 ref="tabControl1"
                 class="tab-control"
                 v-show="isTabFixed"
                 @tabClick="tabClick"></tab-control>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            @scrollEnd="loadMore"
            :pull-up-load="true">
      <!--轮播-->
      <home-swiper :banners="banners"
                   @swiperImageLoad="swiperImageLoad"></home-swiper>
      <!--推荐-->
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view/>
      <tab-control :titles="['流行','新款','精选']"
                   ref="tabControl2"
                   @tabClick="tabClick"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <!--原生元素都可以使用@click，如果要监听组件则需要添加.native-->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    </div>
</template>

<script>
  import HomeSwiper from "./childComps/HomeSwiper"
  import RecommendView from "./childComps/RecommendView"
  import FeatureView from "./childComps/FeatureView"

  /*将公共导入的放一块，方便管理*/
  import TabControl from "components/content/tabContrl/TabControl"
  import NavBar from "components/common/navbar/NavBar"
  import GoodsList from "components/content/goods/GoodsList"
  import Scroll from "components/common/scroll/Scroll"
  import BackTop from "components/content/backTop/BackTop"



  import {getHomeMultidata,getHomeGoods} from "network/home";
  import {debounce} from "common/utils";
  import {itemListernerMixin} from "common/mixin";


  export default {
    name: "Home",
    data() {
      return {
        banners: [],
        recommends: [],
        /*流行/新款/精选数据保存的模式，先将所有数据保存在一个变量里面，然后用三个属性分别保存三者数据，每一个中也是一个对象，并对页码和数据进行绑定。比如说页面显示到第二页，则数据为60条*/
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType: 'pop',
        tabOffsetTop: 0,
        isShowBackTop: false,
        isTabFixed: false,
        saveY: 0,
      }
    },
    mixin:[itemListernerMixin],
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    created() {
      //1请求多个数据并将数据保存在result中，避免成为垃圾对象
      this.getHomeMultidata();

      //请求商品消息
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell')

    },
    mounted() {
      //1.监听item中请求的图片加载完成，一旦图片加载完成之后就对scroll进行一次刷新，这个刷新是在Home.vue中进行刷新的
      // const newRefresh = debounce(this.$refs.scroll.refresh,100);
      //对监听的事件做保存
      // this.itemImgListener = () => {
      //   newRefresh();
      // };
      // this.$bus.$on('itemImageLoad',this.itemImgListener)
        // console.log( '-----' );
        //*按理来说在created是拿不到$refs.scroll值
    },
    methods: {
      /**
       * 事件监听
       */
      loadMore(position) {
        console.log( '加载更多' );
        this.getHomeGoods(this.currentType)
      },
      contentScroll(position) {
        // console.log( position );
        //1.判断BackTop是否显示
        if (-(position.y) > 800) {
          this.isShowBackTop = true
        } else {
          this.isShowBackTop = false
        }
        //2.决定tabControl是否吸顶，是否给一个position:fixed
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      backClick() {
        console.log( 'click' );
        this.$refs.scroll.scrollTo(0,0,500)
      },

      tabClick(index) {
        // console.log( index );
        switch (index) {
          case 0:
            this.currentType = 'pop';
            break;
          case 1:
            this.currentType = 'new';
            break;
          case 2:
            this.currentType = 'sell';
            /*如果没有default那么这个break不需要也行，如果有break那么其余的情况就会进入到default情况中去*/
            break;
        }

        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      swiperImageLoad() {
        //1.获取tabControl的offsetTop
        //所有组件都有一个$el：用于拿到组件中的元素
        console.log( this.$refs.tabControl2.$el.offsetTop );
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },
      /**
       * 网络请求的方法
       */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          console.log(  res );
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
          // console.log( this.banners );
          // console.log( this.recommends );
        })
      },
      getHomeGoods(type) {
        //可以动态修改page
        const page = this.goods[type].page + 1;
        getHomeGoods(type,page).then(res => {
          // console.log( res );
          //将数据保存到goods中的list  或者用遍历
          this.goods[type].list.push( ...res.data.list);
          this.goods[type].page += 1;
          console.log( this.goods[type].list );

          //相当于重新在刷新一次，完成上啦操作
          this.$refs.scroll.finishPullUp()
        })
      }
    },
    activated() {
      this.$refs.scroll.scrollTo(0,this.saveY,0);
      //让页面进行刷新一次
      this.$refs.scroll.refresh()
    },
    deactivated() {
      //两种方法：停止轮播图或者记录当前位置，进来时设置
      this.saveY = this.$refs.scroll.scroll.y;

      //2.取消全局事件的监听
      this.$bus.$off('itemImgLoad',this.itemImgListener)
    }
  }
</script>

<style scoped>
  /*scoped表示作用域，样式只在该组件中有效*/
  /*不是公共的CSS放在对应的界面*/
  #home {
    /*目的是为了空出顶部脱离文档流的空间*/
    padding-top: 44px;
    /*表示viewport height窗口视口*/
    height: 100vh;

    position: relative;
  }
  .home-nav {
    color: #ffffee;
    background-color: var(--color-tint);
    /*绝对定位固定主页的导航*/

    /*浏览器原生滚动时使用，但是好像我不需要动也可以*/
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }
  .tab-control {
    /*滚动*/
    /*position: sticky;*/
    /*top: 44px;*/
  }
  .content {
    /*height: calc(100% -  93px);*/
    /*height: 100%;*/
    /*定位滚动区域，此时需要在.home上设置相对定位*/
    /*height: 300px;*/
    overflow: hidden;
    position: absolute;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 49px;
  }
  .tab-control {
    position: relative;
    z-index: 9;
  }
</style>
