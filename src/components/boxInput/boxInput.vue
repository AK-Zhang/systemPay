<template>
    <div class="box-input-body setting-common-box">
      <div>
        {{title}}
      </div>
      <div>
        <input :pattern="type=='num'?'[0-9]*':''" class="field__input" v-model="inputV" @input="inputE" :placeholder="placeholder" @focus="focusE" @blur="blurE">
        <span @click="clearV"></span>
      </div>
    </div>
</template>
<style lang="less" scoped>
 .box-input-body{
   >div:nth-child(2){
     position: relative;
     span{
       display: none;
       width: 20px;
       height: 20px;
       position: absolute;
       top:0;
       bottom:0;
       margin: auto;
       right: 0;
       background: url('../../assets/img/input-clear.png') no-repeat right center;
     }
     &.active span{
       display: block;
     }
   }
 }
</style>
<script>
  export default {
    props: ['title', 'placeholder', 'value', 'type'],
    data () {
      return {
        inputV: null
      }
    },
    watch: {
      'value': function (v) {
        this.inputV = v
      },
      'inputV': function (v) {
        this.$emit('input', v)
      }
    },
    mounted () {
    },
    methods: {
      clearV (e) {
        this.inputV = null
        $(e.target).prev().focus().parent().removeClass('active')
      },
      inputE (e) {
        if (e.target.value) $(e.target).parent().addClass('active')
        else $(e.target).parent().removeClass('active')
      },
      focusE (e) {
        if (e.target.value) $(e.target).parent().addClass('active')
      },
      blurE (e) {
        $(e.target).parent().removeClass('active')
      }
    },
    components: {}
  }
</script>
