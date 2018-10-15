<template>
  <div class="key-box clearfix user-no-select">
    <div class="key-body">
      <div class="key-left">
        <span @click="keyIn(1)">1</span>
        <span @click="keyIn(2)">2</span>
        <span @click="keyIn(3)">3</span>
        <span @click="keyIn(4)">4</span>
        <span @click="keyIn(5)">5</span>
        <span @click="keyIn(6)">6</span>
        <span @click="keyIn(7)">7</span>
        <span @click="keyIn(8)">8</span>
        <span @click="keyIn(9)">9</span>
        <span class="key-min" @click="keyIn('m')"></span>
        <span @click="keyIn(0)">0</span>
        <span class="key-dot" @click="keyIn('.')">.</span>
      </div>
      <div class="key-right">
        <span class="key-delete" @click="keyIn('d')"></span>
        <div class="key-enter" @click="keyIn('e')"><span>确认</span></div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
  .key-box {
    .key-body {
      > div > span {
        height: 46px;
        line-height: 46px;
        text-align: center;
        float: left;
        margin-bottom: 7px;
        background-color: #fcfcfe;
        border-radius: 5px;
        margin-right: 6px;
        font-size: 25px;
        color: #5A4B41;
      }
      .key-min, .key-dot {
        background-color: inherit;
      }
      .key-min {
        background: url('../../assets/img/key-min.png') no-repeat center;
      }
      .key-delete {
        background: #fcfcfe url('../../assets/img/key-delete.png') no-repeat center;
      }
      .key-enter {
        > span {
          width: 20px;
          margin-top: 53px;
          color: #fff;
          display: inline-block;
        }
        height: 154px;
        float: left;
        text-align: center;
        font-size: 18px;
        background-color: #F6A54D;
      }
      .key-left {
        float: left;
      }
      .key-right {
        float: left;
      }
    }
    width: 100%;
    height: 219px;
    padding: 7px 0 0 6px;
    background: rgba(231, 235, 239, 1);
  }
</style>
<script>
  export default {
    data() {
      return {
        width: null
      }
    },
    mounted() {
      this.init()
      $(window).on('resize', this.init)
    },
    methods: {
      /**
       * 键盘输入
       * */
      keyIn(k) {
        this.$emit('keyIn', k)
      },
      /**
       * 初始化键盘样式
       * */
      init() {
        this.width = $(document.body).width();
        let w = (this.width - 30) / 4
        $('.key-left').width(w * 3 + 18 + 'px')
        $('.key-right').width(w + 6 + 'px')
        $('.key-body>div>span').width(w + 'px')
        $('.key-enter').width(w + 'px')
      }
    },
    components: {},
    beforeDestroy() {
      $(window).off('resize', this.init)
    }
  }
</script>
