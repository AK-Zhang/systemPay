<template>
    <div class="d-input-box">
      <label class="field field_type2">
        <input :pattern="type=='num'?'[0-9]*':''" class="field__input" v-model="inputV" :placeholder="placeholder">
        <span class="field__label">{{title}}</span>
        <span class="field__line"></span>
      </label>
    </div>
</template>
<style lang="less" scoped>
  .d-input-box{
    padding: 19px 0 0 0;
    height:69px;
  }
  /* reset */
  .field{
    position: relative;
    height:50px;
    display: block;
    color: #788A96;
  }

  .field__input{
    width: 100%;
    box-sizing: border-box;
    background-color: transparent;
    color: #788A96;
    /* for iOS */
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 0;
    height:50px;
    border:none;
    border-bottom: 1px solid #F0F0F0;
    padding:15px;

    font-family: inherit;
    font-size: 14px;
    color: #788A96;
  }

  .field__input::-webkit-input-placeholder{
    color: #9DAEB9;
    opacity: 0;
  }

  .field__input::-moz-placeholder{
    color: #9DAEB9;
    opacity: 0;
  }
  .field__input:-ms-input-placeholder{
    color:transparent;
  }

  .field__input:focus{
    outline: none;
    color: #788A96;
  }
  .field__input:focus::-webkit-input-placeholder{
    -webkit-transition: opacity .3s ease-out .3s;
    -moz-transition: opacity .3s ease-out .3s;
    -o-transition: opacity .3s ease-out .3s;
    -ms-transition: opacity .3s ease-out .3s;
    transition: opacity .3s ease-out .3s;
    opacity: 1;
  }

  .field__input:focus:-moz-placeholder{
    -webkit-transition: opacity .3s ease-out .3s;
    -moz-transition: opacity .3s ease-out .3s;
    -o-transition: opacity .3s ease-out .3s;
    -ms-transition: opacity .3s ease-out .3s;
    transition: opacity .3s ease-out .3s;
    opacity: 1;
  }

  .field__input:focus:-ms-input-placeholder{
    -webkit-transition: opacity .3s ease-out .3s;
    -moz-transition: opacity .3s ease-out .3s;
    -o-transition: opacity .3s ease-out .3s;
    -ms-transition: opacity .3s ease-out .3s;
    transition: opacity .3s ease-out .3s;
    opacity: 1;
  }

  .field__label{
    position: absolute;
    top: 14px;
    left: 15px;

    pointer-events: none;
    font-size: 16px;

    -webkit-transition: top .3s cubic-bezier(0.9,-0.15, 0.1, 1.15), opacity .3s ease-out;
    -moz-transition: top .3s cubic-bezier(0.9,-0.15, 0.1, 1.15), opacity .3s ease-out;
    -o-transition: top .3s cubic-bezier(0.9,-0.15, 0.1, 1.15), opacity .3s ease-out;
    -ms-transition: top .3s cubic-bezier(0.9,-0.15, 0.1, 1.15), opacity .3s ease-out;

    transition: top .3s cubic-bezier(0.9,-0.15, 0.1, 1.15), opacity .3s ease-out;
    will-change: top, opacity;
  }

  .field__input:not(:placeholder-shown) ~ .field__label{
    opacity: 0;
    top: 14px;
  }

  .field__input:focus ~ .field__label{
    opacity: 1;
    top: -12px;
  }


  /* type 2 */

  .field_type2 .field__line{
    width: 0;
    height: 2px;
    background-color: #FE9D32;

    position: absolute;
    bottom: 0;
    left: 0;

    will-change: width;
    -webkit-transition: width .3s ease-out;
    -moz-transition: width .3s ease-out;
    -o-transition: width .3s ease-out;
    -ms-transition: width .3s ease-out;
    transition: width .3s ease-out;
  }

  .field_type2 .field__input:focus ~ .field__line{
    width: 100%;
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
    },
    components: {}
  }
</script>
