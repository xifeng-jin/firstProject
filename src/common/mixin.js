import {debounce} from "./utils";
import BackTop from "components/content/backTop/BackTop"

export const itemListernerMixin = {
  //所有公共部分的东西都可以放在这里
  data() {
    return {
      itemImgListener: null
    }
  },
  mounted() {
    let newRefresh = debounce(this.$refs.scroll.refresh,100);
    this.itemImgListener = () => {
      newRefresh()
    };
    this.$bus.$on('itemImgLoad',this.itemImgListener)
  }
};

export const backTopMixin = {
  data() {
    return {
      /*默认backTop不显示*/
      isShowBackTop: false,
    }
  },
  methods: {
    backClick() {
      console.log( 'click' );
      this.$refs.scroll.scrollTo(0,0,500)
    },
  },
  components: {
  }
}
