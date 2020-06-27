<template>
  <transition name="move" >
    <div v-show="showFlag" class="food" ref="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image">
          <div class="back" @click="hide">
            <i class="iconfont back-iconfont">&#xe600;</i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">¥{{food.price}}</span>
            <span class="old" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
          </div>
          <div class="cartcontrol-wrapper">
            <cartcontrol @add="addFood" :food="food"></cartcontrol>
          </div>
          <transition name="fade">
            <div @click.stop.prevent="addFirst" class="buy" v-show="!food.count || food.count===0">
              加入购物车
            </div>
          </transition>
        </div>
      <split v-show="food.info"></split>
      <div class="info" v-show="food.info">
        <h1 class="title">商品信息</h1>
        <p class="text">{{food.info}}</p>
      </div>
      <split></split>
      <div class="rating">
        <h1 class="title">商品评价</h1>
        <ratingselect @select="selectRating" @toggle="toggleContent" :selectType="selectType"
                      :onlyContent="onlyContent" :desc="desc"
                      :ratings="food.ratings"></ratingselect>
        <div class="rating-wrapper">
          <ul v-show="food.ratings && food.ratings.length">
            <li v-show="needShow(rating.rateType,rating.text)" v-for="(rating,index) in food.ratings" class="rating-item" :key="index">
              <div class="user">
                <span class="name">{{rating.username}}</span>
                <img class="avatar" width="12" height="12" :src="rating.avatar">
              </div>
              <div class="time">{{rating.rateTime | formatDate}}</div>
              <p class="text">
<!--                <span :class="{'icon-damuzhi2':rating.rateType===0,'icon-down':rating.rateType===1}">&#xe67a;</span>-->
                <span class="iconfont icon-up">&#xe67a;</span>{{rating.text}}
              </p>
            </li>
          </ul>
          <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
        </div>
      </div>
      </div>
    </div>
  </transition>
</template>

<script>
import BScroll from 'better-scroll'
import Vue from 'vue'
import {formatDate} from '../../common/js/date'
import cartcontrol from '../cartcontrol/cartcontrol'
import split from '../split/split'
import ratingselect from '../ratingselect/ratingselect'
const ALL = 2
export default {
  props: {
    food: {
      type: Object
    }
  },
  data () {
    return {
      showFlag: false,
      selectType: ALL,
      onlyContent: false,
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }
    }
  },
  methods: {
    // 展示goods
    show () {
      this.showFlag = true
      // 初始化数据
      this.selectType = ALL
      this.onlyContent = true
      // BScroll
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.food, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
      })
    },
    hide () {
      this.showFlag = false
    },
    // 添加第一个商品，标签绑定点击事件
    addFirst (event) {
      // 多次点击
      if (!event._constructed) {
        return
      }
      // 派发事件
      this.$emit('add', event.target)
      Vue.set(this.food, 'count', 1)
    },
    // 添加商品按钮事件 并绑定在标签上
    addFood (target) {
      this.$emit('add', target)
    },
    // 添加选择按钮事件 并绑定在标签上
    selectRating (type) {
      this.selectType = type
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    // 添加切换选中事件 并绑定在标签上
    toggleContent () {
      this.onlyContent = !this.onlyContent
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    // 过滤评论内容
    needShow (type, text) {
      // 判断内容
      if (this.onlyContent && !text) {
        return false
      }
      // 判断类型
      if (this.selectType === ALL) {
        return true
      } else {
        return type === this.selectType
      }
    }
  },
  // 绑定子组件定义事件
  events: {
    'ratingtype.select' (type) {
      this.selectType = type
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    'content.toggle' (onlyContent) {
      this.onlyContent = onlyContent
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    }
  },
  filters: {
    formatDate (time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  components: {
    cartcontrol,
    split,
    ratingselect
  }
}
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/mixin.styl"
  .food
    position: fixed
    left: 0
    top: 0
    bottom: .96rem
    z-index: 30
    width: 100%
    background: #ffffff
    transform: translate3d(0,0,0)
    &.move-enter-active,&.move-leave-active
      transition: all 0.2s linear
    &.move-enter,&.move-leave
      transform: translate3d(0,100%,0)
    .image-header
      position: relative
      width: 100%
      height: 0
      /* padding-top，上下padding值与宽高相等 */
      padding-top: 100%
      /* 图片撑开盒子 */
      img
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
      .back
        position: absolute
        top: 0.20rem
        left: 0
        .back-iconfont
          display: block
          padding: .20rem
          font-size: .40rem
          color: #ffffff
    .content
      position: relative
      padding: .36rem
      .title
        line-height: .28rem
        margin-bottom: .16rem
        font-size: .28rem
        font-weight: 700
        color: rgb(7,17,27)
      .detail
        margin-bottom: .36rem
        height: .20rem
        line-height: .20rem
        font-size: 0
        .sell-count,.rating
          font-size: .20rem
          color: rbg(147,153,159)
        .sell-count
          margin-right: .24rem
      .price
          font-weight: 700
          line-height: .48rem
        .now
          margin-right: .16rem
          font-size: .28rem
          color: rgb(240,20,20)
        .old
          text-decoration: line-through
          font-size: .20rem
          color: rgb(147,153,159)
      .cartcontrol-wrapper
        position: absolute
        right: .24rem
        bottom: .24rem
      .buy
        position: absolute
        right: .36rem
        bottom: .36rem
        z-index: 10
        height: .48rem
        line-height: .48rem
        padding: 0 .24rem
        box-sizing: border-box
        border-radius: .24rem
        font-size: .20rem
        color: #fff
        background: rgb(0,160,220)
        opacity: 1
        &.fade-enter-active,&.fade-leave-active
          transition: all 0.2s
        &.fade-enter,&.fade-leave
          opacity: 0
          z-index: -1
    .info
      padding: .36rem
      .title
        line-height: .28rem
        margin-bottom: .12rem
        font-size: .28rem
        color: rbg(7,17,27)
      .text
        line-height: .48rem
        padding: 0 .16rem
        font-size: .24rem
        color: rgb(77,85,93)
    .rating
      padding-top:.36rem
      .title
        line-height: .28rem
        margin-left: .36rem
        font-size: .28rem
        color: rbg(7,17,27)
      .rating-wrapper
        padding: 0 .36rem
        .rating-item
          position: relative
          padding: .32rem 0
          border-1px(rgba(7,17,27,0.1))
          .user
            position: absolute
            right: 0
            top: .32rem
            line-height: .24rem
            font-size: 0
            .name
              display: inline-block
              margin-right: .12rem
              vertical-align: top
              font-size: .20rem
              color: rgb(147,153,159)
            .avatar
              border-radius: 50%
          .time
            margin-bottom: .12rem
            line-height: .32rem
            font-size: .20rem
            color: rgb(147,153,159)
          .text
            line-height: .32rem
            font-size: .24rem
            color: rgb(7,17,27)
            .icon-up
              margin-rightL .08rem
              line-height: .48rem
              font-size: .24rem
              color: rgb(0,160,220)
            .no-rating
              padding: 32rem 0
              font-size: .24rem
              color: rgb(147,153,159)
</style>
