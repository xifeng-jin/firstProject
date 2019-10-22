<template>
  <div class="DetailGoods">
    <detail-goods-list-item v-for="item in recommends"
                            @load="DetailMonitor"
                            :detail-goods-item="item"></detail-goods-list-item>
  </div>
</template>

<script>
  import DetailGoodsListItem from "./DetailGoodsListItem"
  export default {
    name: "DetailGoodsList",
    props: {
      recommends: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      DetailGoodsListItem
    },
    methods: {
      DetailMonitor() {
        this.$emit('DetailGoodsMonitor')
      }
    }
  }
</script>

<style scoped>
  .DetailGoods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    padding: 2px;
  }
</style>
