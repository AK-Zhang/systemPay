<template>
    <div v-transfer-dom :id="id">
      <popup v-model="showKey" :show-mask="!hideMask" :style="{'z-index': zIndex}" style="overflow-y: visible;background:rgba(231,235,239,1);">
        <slot></slot>
        <key-body @keyIn="keyIn"></key-body>
      </popup>
    </div>
</template>
<style lang="less" scoped>
</style>
<script>
  import {Popup, TransferDomDirective as TransferDom} from 'vux'
  import keyBody from '../common/keybody.vue'
  export default {
    props: [
      'value',
      'decLength', // 小数点后有几位
      'initResult', // 初始值
      'hideMask', // 是否有遮罩层
      'hasDec', // 是否有小数点
      'canMin', // 是否可以最小化
      'maxLength', // 可以输入最大长度
    ],
    data () {
      return {
        id: 'keyboard' + new Date().getTime(),
        showKey: false,
        zIndex: 9999
      }
    },
    watch:{
      'value':function(){
        if(this.value) {
          this.showKey=true;
        }
        else this.showKey=false;
      },
      'showKey':function(){
        if(!this.showKey) this.$emit('input',false)
      }
    },
    mounted () {
      this.showKey=this.value;
      if (this.$route.matched.length > 1) {
        this.zIndex = 9999999
      }
    },
    directives: {
      TransferDom
    },
    methods: {
      /**
       * 键盘输入
       * */
      keyIn (k) {
        let result = this.initResult || ''
        if (k == 'e') {
          this.$emit('done')
        }
        else if (k == 'm') {
          if (this.canMin) this.$emit('input',false)
        } else if (k == '.') {
          if (this.hasDec && result.indexOf('.') === -1 && result.length < (this.maxLength || 14)) {
            result += k
            this.$emit('result', result)
          } else return
        } else if (k == 'd') {
          result=result+"";
          result = result.slice(0, -1)
          this.$emit('result', result)
        } else {
          if (result.length >= (this.maxLength || 14) || (result.indexOf('.') != -1 && (result.length - result.indexOf('.') - 1) > 1)) return
          result += k
          this.$emit('result', result)
        }
      }
    },
    beforeDestroy () {
      this.$el && this.$el.parentNode.removeChild(this.$el)
    },
    components: {
      Popup,
      keyBody
    }
  }
</script>
