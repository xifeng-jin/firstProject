<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"
                    @titleClick="titleClick"
                    ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <!--属性使用驼峰，传入值最好中间加’-‘-->
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info
        :param-info="paramInfo"
        ref="param"
        @paramInfoLoad="paramInfoLoad"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo"
        @comment="comment" ref="comment"></detail-comment-info>
      <goods-list :goods="recommends" ref="recommends"></goods-list>
      <ul>
        <li>I am blank</li>
        <li>I am blank</li>
        <li>I am blank</li>
        <li>I am blank</li>
        <li>I am blank</li>
        <li>I am blank</li>
        <li>I am blank</li>
        <li>I am blank</li>
      </ul>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <!--<toast :message="message" :isShow="show"></toast>-->

  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar"
  import DetailSwiper from "./childComps/DetailSwiper"
  import DetailBaseInfo from "./childComps/DetailBaseInfo"
  import DetailShopInfo from "./childComps/DetailShopInfo"
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo"
  import DetailParamInfo from "./childComps/DetailParamInfo"
  import DetailCommentInfo from "./childComps/DetailCommentInfo"
  import DetailBottomBar from "./childComps/DetailBottomBar"

  import Scroll from "components/common/scroll/Scroll"
  import GoodsList from "components/content/goods/GoodsList"
  import Toast from "components/common/toast/Toast"

  //这里的BackTop竟然不能使用混入的方式进行开发
  import BackTop from "components/content/backTop/BackTop"
  // import DetailGoodsList from "./childComps/DetailGoodsList"

  import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "network/detail";
  import {debounce} from "../../common/utils";
  import {itemListernerMixin,backTopMixin} from "common/mixin";

  export default {
    name: "detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar,
      BackTop,
    },
    mixin: [itemListernerMixin,backTopMixin],
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themTopYs: [],
        currentIndex: 0,
        isShowBackTop: false,
        // message: '',
        // show: false
      }
    },
    created() {
      //1.保存传入过来的iid
      this.iid = this.$route.params.iid;

      //2.通过iid拿数据
      getDetail(this.iid).then(res => {
        console.log( res );
        const data = res.result;
        //2.1获取顶图轮播图片数据
        this.topImages = data.itemInfo.topImages;

        //2.2获取商品信息
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services);

        //2.3创建店铺信息
        this.shop = new Shop(data.shopInfo);

        //2.4保存商品详情数据
        this.detailInfo = data.detailInfo;

        //2.5获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
        
        //2.6取出评论信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0];
        }

        this.$nextTick( () => {
          //根据最新的数据，对应的DOM是已经被渲染出来了。但是图片依然没有加载完
          //offsetTop不对一般是图盘产生的原因
          // this.themTopYs = [];
          // this.themTopYs.push(0);
          // //一点点微调
          // this.themTopYs.push(this.$refs.param.$el.offsetTop - 20);
          // this.themTopYs.push(this.$refs.comment.$el.offsetTop);
          // this.themTopYs.push(this.$refs.recommends.$el.offsetTop);
          // console.log( this.themTopYs );
        })
      });
      //3请求推荐数据
      getRecommend().then( res => {
        console.log( res );
        this.recommends = res.data.list;
        console.log( res.data.list );
      })
    },
    mounted() {
    },
    destroyed() {
      this.$bus.$off('itemImgLoad',this.itemImgListener)
    },
    methods: {
      imageLoad() {
        this.$refs.scroll.refresh();

        //为什么我这里只会打印一次
        //++this.counter === this.imagesLength因为我在DetailGoodsInfo中使用了一个技巧
        this.themTopYs = [];
        this.themTopYs.push(0);
        //一点点微调
        this.themTopYs.push(this.$refs.param.$el.offsetTop - 20);
        this.themTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themTopYs.push(this.$refs.recommends.$el.offsetTop);
        //加入一个最大值
        this.themTopYs.push(Number.MAX_VALUE);
        console.log( this.themTopYs );
      },
      paramInfoLoad() {
        this.$refs.scroll.refresh();
      },
      comment() {
        this.$refs.scroll.refresh();
      },
      DetailGoodsMonitor() {
        // this.$refs.scroll.refresh();
      },
      titleClick(index) {
        console.log( index );
        this.$refs.scroll.scroll.scrollTo(0,-this.themTopYs[index],300)
      },
      contentScroll(position) {
        // console.log( position );
        const positionY = -position.y;
        let length = this.themTopYs.length;
        for ( let i = 0 ; i < length - 1 ; i ++ ) {
          if ((this.currentIndex !== i) && (positionY >= this.themTopYs[i] && positionY < this.themTopYs[i+1])) {
              this.currentIndex = i;
              this.$refs.nav.currentIndex = this.currentIndex
            //this.currentIndex !== i解决多次打印的问题，同时解决了性能问题
          // if ((this.currentIndex !== i) && ((i < length - 1 && positionY >= this.themTopYs[i] && positionY < this.themTopYs[i + 1]) || (i === length - 1 && positionY >= this.themTopYs[i]))) {
          //   // console.log( i );
          //   this.currentIndex = i;
          //   console.log( this.currentIndex );
          //   this.$refs.nav.currentIndex = this.currentIndex
          }
        }

        //3是否显示回到顶部
        if (-(position.y) > 800) {
          this.isShowBackTop = true
        } else {
          this.isShowBackTop = false
        }
      },
      backClick() {
        console.log( 'click' );
        this.$refs.scroll.scrollTo(0,0,500)
      },
      addToCart() {
        //1.获取需要展示的信息
        const  product = {};
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;

        console.log( product );
        //2.将商品添加到购物车,这里就可以使用vuex进行管理，将它放到一个全局的状态做保存
        //发送事件和一个数据
        // this.$store.commit('addCart',product)
        //**如果我们想知道vuex中发生了什么事情，可以通过dispatch通过promise返回&&
        //如果要将actions中的方法进行映射，可以先在detail.vue中导入mapActions from vuex，然后在
        //methods中使用...mapActions(['addCart']),也可以是对象

        console.log( this.$toast );
        // this.$toast.show()

        this.$store.dispatch('addCart',product).then( res => {
          this.$toast.show(res,1500)
        })

        // this.$store.dispatch('addCart',product).then( res => {
        //   console.log( res );
        //   this.show = true;
        //   this.message = res;
        //
        //   setTimeout(() => {
        //     this.show = false;
        //   },1500)
        // })
      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .content {
    height: calc(100% - 44px);
    /*position: ;*/
  }
  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
</style>
