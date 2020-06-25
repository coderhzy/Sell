<template>
    <div class="ratingselect">
      <div class="rating-type border-1px">
        <span @click="select(2,$event)" class="block positive" :class="{'active':selectType===2}">{{desc.all}}<span class="count">{{ratings.length}}
        </span></span>
        <span @click="select(0,$event)" class="block positive" :class="{'active':selectType===0}">{{desc.positive}}<span class="count">{{positives.length}}
        </span></span>
        <span @click="select(1,$event)" class="block negative" :class="{'active':selectType===1}">{{desc.negative}}<span class="count">{{negatives.length}}
        </span></span>
      </div>
      <div @click="toggleContent" class="switch" :class="{'on':onlyContent}">
        <span class="iconfont icon-check_circle">&#xe703;</span>
        <span class="text">只看内容的评价</span>
      </div>
    </div>
</template>

<script>
const POSITIVE = 0
const NEAGTIVE = 1
const ALL = 2
export default {
  props: {
    ratings: {
      type: Array,
      default () {
        return []
      }
    },
    selectType: {
      type: Number,
      default: ALL
    },
    onlyContent: {
      type: Boolean,
      default: false
    },
    desc: {
      type: Object,
      default () {
        return {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        }
      }
    }
  },
  methods: {
    // 使用父组件的方法
    // 切换按钮的选择
    select (type, event) {
      if (!event._constructed) {
        return
      }
      this.$emit('select', type)
    },
    // 切换只看内容评价按钮
    toggleContent (event) {
      if (!event._constructed) {
        return
      }
      this.$emit('toggle')
    }
  },
  computed: {
    // 计算属性,推荐
    positives () {
      return this.ratings.filter((rating) => {
        return rating.rateType === POSITIVE
      })
    },
    // 吐槽
    negatives () {
      return this.ratings.filter((rating) => {
        return rating.rateType === NEAGTIVE
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/mixin.styl"
  .ratingselect
    .rating-type
      padding: .36rem 0
      margin: 0 .36rem
      border-1px(rgba(7,17,27,0.1))
      font-size: 0
      .block
        display: inline-block
        padding: .16rem .24rem
        margin-right: .16rem
        line-height: .32rem
        border-radius: .02rem
        font-size:.24rem
        color:rgb(77,85,93)
        &.active
          color:#ffffff
        .count
          margin-left: .04rem
          font-size: .16rem
        &.positive
          background:rgba(0,160,220,0.2)
          &.active
            background: rgb(0,160,220)
        &.negative
          background:rgba(77, 85, 93, 0.2)
          &.active
            background:rgb(77,85,93)
    .switch
      padding: .24rem .36rem
      line-height: .48rem
      border-bottom: 1px solid rgba(7,17,27,0.1)
      color: rgb(147,153,159)
      font-size: 0
      &.on
        .icon-check_circle
          color: #00c850
      .icon-check_circle
        display: inline-block
        vertical-align: top
        margin-right: .08rem
        font-size: .48rem
      .text
        display: inline-block
        vertical-align: top
        font-size: .24rem
</style>
