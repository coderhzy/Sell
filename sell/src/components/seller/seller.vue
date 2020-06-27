<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc border-1px">
          <star :size="36" :score="seller.score"></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper border-1px">
          <p class="content">{{seller.bulletin}}</p>
        </div>
        <ul v-if="seller.supports" class="supports">
          <li class="supports-item border-1px" v-for="(item,index) in seller.supports" :key="index">
            <span class="icon" :class="classMap[seller.supports[index].type]"></span>
            <span class="text">{{seller.supports[index].description}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import star from '../star/star'
import split from '../../components/split/split'
import BScroll from 'better-scroll'

export default {
  props: {
    seller: {
      type: Object
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  watch: {
    'seller' () {
      this.$nextTick(() => {
        this._initScroll()
      })
    }
  },
  methods: {
    _initScroll () {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.seller, {
          click: true
        })
      } else {
        this.scroll.refresh()
      }
    }
  },
  components: {
    star,
    split
  }
}
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/mixin.styl"
  .seller
    position: absolute
    top: 3.48rem
    left: 0
    bottom: 0
    width: 100%
    overflow: hidden
    .overview
      position: relative
      padding: .36rem
      .title
        margin-bottom: .16rem
        line-height: .28rem
        color: rgb(7,17,27)
        font-size: .28rem
      .desc
        padding-bottom: .36rem
        border-1px(rgba(7,17,27,0.1))
        font-size: 0
        .star
          display: inline-block
          margin-right: .16rem
          vertical-align: top
        .text
          display: inline-block
          margin-right: .24rem
          line-height: .36rem
          vertical-align: top
          font-size: .20rem
          color: rgb(77,85,93)
      .remark
        display: flex
        padding-top: .36rem
        .block
          flex:1
          text-align: center
          border-right: .02rem solid rgba(7,17,27,0.1)
          &:last-child
            border:none
          h2
            margin-bottom: .08rem
            line-height: .20rem
            font-size: 0.20rem
            color: rgb(147,153,159)
          .content
            line-height: .48rem
            font-size: .20rem
            color: rgb(7,17,27)
            .stress
              font-size: .48rem
    .bulletin
      padding: .36rem .36rem 0 .36rem
    .title
      margin-bottom: .16rem
      line-height: .28rem
      color: rgb(7,17,27)
      font-size: .28rem
    .content-wrapper
      padding:0 .24rem .32rem .24rem
      border-1px(rgba(7,17,27,0.1))
      .content
        line-height: .48rem
        font-size: .24rem
        color: rgb(240,20,20)
    .supports
      .supports-item
        padding: .32rem .24rem
        border-1px(rgba(7,17,27,0.1))
        font-size: 0
      .icon
        display: inline-block
        vertical-align: top
        width: .32rem
        height: .32rem
        margin-right: .12rem
        background-size: .32rem .32rem
        background-repeat: no-repeat
        &.decrease
          bg-image('decrease_4')
        &.discount
          bg-image('discount_4')
        &.guarantee
          bg-image('guarantee_4')
        &.invoice
          bg-image('invoice_4')
        &.special
          bg-image('special_4')
      .text
        line-height: .32rem
        font-size: .24rem
        color: rgb(7,17,27)
</style>
