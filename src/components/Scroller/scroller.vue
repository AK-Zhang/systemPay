<template>
    <div class="scroller-body" :id="scrollerId" :style="{height:sHeight}">
      <div class="clearM clearfix">
        <slot></slot>
        <template v-if="canLoad">
          <div class="ui-loader-box">
            <div class="ui loader active">
            </div>
          </div>
        </template>
        <slot name="empty">
        </slot>
      </div>
    </div>
</template>
<style lang="less" scoped type="text/less">
  .scroller-body{
    overflow: hidden;
    >div::after{
      display: table;
      content: '';
    }
  }
</style>
<script>
  export default {
    name: 'Scroller',
    props: [
      'pullupEvent', // 传入滚动到底部调用的事件，若不传，则不监听滚动事件
      'height', // 传入滚动框高度，若需计算整体高度减去多少，则传递负数，单位为px
      'notImeLoad', // 若为真，则不默认调用滚动事件
    ],
    data () {
      return {
        scrollerId: 'scroller-' + new Date().getTime(),
        scrollerObj: null,
        isLoading: false, // 是否正在加载
        canLoad: true
      }
    },
    computed: {
      'sHeight': function () {
        if (!this.height) return 'auto'
        let h = parseFloat(this.height)
        if (h >= 0) {
          return this.height
        } else {
          return window.innerHeight + h + 'px'
        }
      }
    },
    mounted () {
      $('#' + this.scrollerId + '>div').resize(this.refresh)
      let params = {
        scrollbars: false,
        mouseWheel: true,
        interactiveScrollbars: true,
        preventDefault: false,
        shrinkScrollbars: 'scale',
        disablePointer: false, // 兼容触摸设备
        fadeScrollbars: true,
        bounce: false
      }, me = this
      if (this.pullupEvent) params.probeType = 3 // 只有有滚动事件才监听滚动
      this.scrollerObj = new window.IScroll('#' + this.scrollerId, params)
      if (this.pullupEvent) {
        if (!this.notImeLoad) this.pullup()
        this.scrollerObj.on('scroll', function () {
          if (this.directionY == 1) me.$emit('pullup')
          if (this.directionY == -1) me.$emit('pulldown')
          let h = $('#' + me.scrollerId + '>div').height() - $('#' + me.scrollerId).height()
          if (this.y + h <= 90 && !me.isLoading && me.canLoad) {
            me.pullup()
          }
        })
      } else {
        this.canLoad = false
        this.refresh()
      }
    },
    methods: {
      /**
       * 滚动至底部
       * */
      scrollToBottom () {
        this.scrollerObj.refresh()
        this.scrollerObj.scrollTo(0, this.scrollerObj.maxScrollY)
      },
      /**
       * 滚动至
       * */
      scrollTo (x, y) {
        this.scrollerObj.scrollTo(x, y)
      },
      /**
       * 调用加载事件
       * */
      pullup () {
        if (this.isLoading || !this.canLoad) return
        this.isLoading = true
        this.pullupEvent()
      },
      /**
       * 完成滚动加载,父组件完成后需调用此函数，才能继续滚动记载，并调整滚动条高度
       * */
      donePullup () {
        this.$nextTick(() => {
          this.isLoading = false
        })
      },
      /**
       * 刷新滚动条
       * */
      refresh () {
        this.$nextTick(() => {
          this.scrollerObj.refresh()
        })
      },
      /**
       * 禁止滚动加载
       * */
      disablePullup () {
        this.canLoad = false
      },
      /**
       * 启用滚动加载
       * */
      enablePullup () {
        this.canLoad = true
      }
    },
    components: {}
  }
</script>
