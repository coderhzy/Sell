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
        <div class="favorite" @click="toggleFavorite">
          <span class="iconfont icon-favorite" :class="{'active':favorite}">&#xe603;</span>
          <span class="text">{{favoriteText}}</span>
        </div>
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
      <split></split>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pic-list" ref="picList">
            <li class="pic-item" v-for="(pic,index) in seller.pics" :key="index">
              <img :src="pic" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="info">
        <h1 class="title border-1px">商家信息</h1>
        <ul>
          <li class="info-item" v-for="(info,index) in seller.infos" :key="index">{{info}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import star from '../star/star'
import split from '../../components/split/split'
import BScroll from 'better-scroll'
import {saveToLocal, loadFromLocal} from '../../common/js/store'

export default {
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      favorite: (() => {
        // 返回本地缓存
        return loadFromLocal(this.seller.id, 'favorite', false)
      })()
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  computed: {
    favoriteText () {
      return this.favorite ? '已收藏' : '收藏'
    }
  },
  // 监控seller改变来渲染
  watch: {
    'seller' () {
      this.$nextTick(() => {
        this._initScroll()
        this._initPics()
      })
    }
  },
  // 考虑生命周期，切换界面滚动
  mounted () {
    this.$nextTick(() => {
      this._initScroll()
      this._initPics()
    })
  },
  methods: {
    toggleFavorite (event) {
      if (!event._constructed) {
        return
      }
      this.favorite = !this.favorite
      // 存储收藏按钮
      saveToLocal(this.seller.id, 'favorite', this.favorite)
    },
    // 商家页面滚动
    _initScroll () {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.seller, {
          click: true
        })
      } else {
        this.scroll.refresh()
      }
    },
    // 实景图片滚动
    _initPics () {
      if (this.seller.pics) {
        let picWidth = 120
        let margin = 6
        let width = (picWidth + margin) * this.seller.pics.length - margin
        this.$refs.picList.style.width = width + 'px'
        this.$nextTick(() => {
          if (!this.picScoll) {
            this.picScroll = new BScroll(this.$refs.picWrapper, {
              scrollX: true,
              // 防止垂直滚动
              eventPassthrough: 'vertical'
            })
          } else {
            this.picScroll.refresh()
          }
        })
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
      .favorite
        position: absolute
        width: 1.0rem
        right: .22rem
        top: .36rem
        text-align: center
        .icon-favorite
          display: block
          margin-bottom: .08rem
          line-height:.48rem
          font-size: .48rem
          color: #d4d6d9
          &.active
            color: rgb(240, 20, 20)
        .text
          line-height: .20rem
          font-size: .20rem
          color: rgb(77, 85, 93)
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
          &:last-child
            border-none()
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
    .pics
      padding: .36rem
      .title
        margin-bottom: .24rem
        line-height: .28rem
        color: rgb(7,17,27)
        font-size: .28rem
      .pic-wrapper
        width: 100%
        overflow: hidden
        white-space: nowrap
        .pic-list
          font-size: 0
          .pic-item
            display: inline-block
            margin-right: .12rem
            width: 2.4rem
            height: 1.8rem
          &:last-child
            margin: 0
    .info
      padding: .36rem .36rem 0 .36rem
      color: rgb(7,17,27)
      .title
        padding-bottom: .16rem
        line-height: .28rem
        border-1px(rgba(7,17,27,0.1))
        font-size: .28rem
      .info-item
        padding:.32rem .24rem
        line-height: .32rem
        border-1px(rgba(7,17,27,0.1))
        font-weight: 200
        font-size.24rem
        &:last-child
          border-none()
</style>
