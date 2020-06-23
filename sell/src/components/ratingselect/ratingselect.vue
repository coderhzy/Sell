<template>
    <div class="ratingselect">
      <div class="rating-type border-1px">
        <span class="block positive" :class="{'active':selectType===2}">{{desc.all}}<span class="count">47
        </span></span>
        <span class="block positive" :class="{'active':selectType===0}">{{desc.positive}}<span class="count">40
        </span></span>
        <span class="block negative" :class="{'active':selectType===1}">{{desc.negative}}<span class="count">7
        </span></span>
      </div>
      <div class="switch">
        <span class="iconfont">&#xe703;</span>
        <span class="text">只看内容的评价</span>
      </div>
    </div>
</template>

<script>
// const POSITIVE = 0
// const NEAGTIVE = 1
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
</style>
