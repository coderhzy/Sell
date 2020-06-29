<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rank}}</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect @select="selectRating" @toggle="toggleContent" :selectType="selectType" :onlyContent="onlyContent"
                    :ratings="ratings"></ratingselect>
      <div class="rating-wrapper">
        <ul>
          <li v-for="(rating,index) in ratings" class="rating-item" v-show="needShow(rating.rateType,rating.next)" :key="index">
            <div class="avatar">
              <img width="28" height="28" :src="rating.avatar">
            </div>
              <div class="content">
                <h1 class="name">{{rating.username}}</h1>
                <div class="star-wrapper">
                  <star :size="24" :score="rating.score"></star>
                  <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
                </div>
                <p class="text">{{rating.text}}</p>
                <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                  <span class="iconfont icon-up">&#xe67a;</span>
                  <span class="item" v-for="(item,index) in rating.recommend" :key="index">{{item}}</span>
                </div>
                <div class="time">
                  {{rating.rateTime | formatDate}}
                </div>
              </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import star from '../../components/star/star'
import split from '../split/split'
import ratingselect from '../ratingselect/ratingselect'
import {formatDate} from '../../common/js/date'

const ALL = 2
const ERR_OK = 0
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      ratings: [],
      selectType: ALL,
      onlyContent: true
    }
  },
  created () {
    // 拿到后端ratings
    this.$http.get('/api/ratings').then((response) => {
      response = response.body
      if (response.errno === ERR_OK) {
        this.ratings = response.data
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.ratings, {
            click: true})
        })
      }
    })
  },
  methods: {
    selectRating (type) {
      this.selectType = type
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
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
  //  显示时间
  filters: {
    formatDate (time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  components: {
    star,
    split,
    ratingselect
  }
}
</script>

<style lang="stylus" scoped>
@import "../../common/stylus/mixin.styl"
  .ratings
    position: absolute
    top: 3.48rem
    left: 0
    bottom: 0
    width: 100%
    overflow: hidden
    .overview
      display: flex
      padding: .36rem 0
      .overview-left
        flex: 0 0 2.74rem
        padding: .12rem 0
        width: 2.74rem
        border-right: .02rem solid rgba(7,17,27,0.1)
        text-align: center
        @media only screen and (max-width: 320px)
          flex: 0 0 120px
          width: 120px
        .score
          margin-bottom: .12rem
          line-height: .56rem
          font-size: .48rem
          color: rgb(255, 153, 0)
        .title
          margin-bottom: .16rem
          line-height: .24rem
          font-size: .24rem
          color: rgb(7, 17, 27)
        .rank
          line-height: .20rem
          font-size: .20rem
          color: rgb(147, 153, 159)
      .overview-right
        flex: 1
        padding-left: .48rem
        @media only screen and (max-width: 320px)
          padding-left: 6px
        .score-wrapper
          margin-bottom: .16rem
          font-size: 0
          .title
            display: inline-block
            line-height: .36rem
            vertical-align: top
            font-size: .24rem
            color: rgb(7,17,27)
          .star
            display: inline-block
            vertical-align: top
            margin: 0 .24rem
          .score
            display: inline-block
            vertical-align: top
            line-height: .36rem
            font-size: .24rem
            color: rgb(255,153,0)
        .delivery-wrapper
          font-size: 0
          .title
            line-height: .36rem
            font-size: .24rem
            color: rgb(7,17,27)
          .delivery
            margin-left: .24rem
            font-size: .24rem
            color: rgb(147,153,159)
    .rating-wrapper
      padding: 0 .36rem
      .rating-item
        display: flex
        padding: .36rem 0
        border-1px(rgba(7, 17, 27, 0.1))
        .avatar
          flex: 0 0 .36rem
          width: .56rem
          margin-right: .24rem
          img
            border-radius: 50%
        .content
          position: relative
          flex: 1
          .name
            margin-bottom: .08rem;
            line-height: .24rem
            font-size: .20rem
            color:rgb(7,17,27)
          .star-wrapper
            margin-bottom: .12rem
            font-size: 0
            .star
              display: inline-block
              margin-right: .12rem
              vertical-align: top
            .delivery
              display: inline-block
              vertical-align: top
              line-height: .24rem
              font-size: .20rem
              color: rgb(147,153,159)
          .text
            line-height: .36rem
            color:rgb(7,17,27)
            font-size: .24rem
            margin-botto: .16rem
          .recommend
            line-height: .32rem
            font-size: 0
            .icon-up,.item
              display: inline-block
              margin:0 .04rem .02rem 0
              font-size: .18rem
            .icon-up
              color: rgb(0,160,220)
            .item
              padding: 0 .12rem
              border: 1px solid rgba(7,17,27,0.1)
              border-radius: .02rem
              color: rgb(147,153,159)
              background: #ffffff
          .time
            position: absolute
            top: 0
            right: 0
            line-height: .24rem
            font-size: .20rem
            color: rgb(147,163,159)
</style>
