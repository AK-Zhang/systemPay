<template>
  <div class="search-body" v-if="value">
    <div class="app-head clearM">
      <span @click="$emit('input',false)">取消</span>
      <div>
        <input id="search-input" type="text" :placeholder="placeholder">
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
  .search-body {
    .app-head {
      height: 44px;
      padding: 0;
      background-color: #fff;
      > div {
        margin: 6px 60px 6px 15px;
        height: 32px;
        input {
          background: rgba(245, 245, 245, 1) url('../../assets/img/search-icon.png') no-repeat 10px center;
          border-radius: 5px;
          width: 100%;
          height: 32px;
          padding: 6px 32px;
          font-size: 14px;
          line-height: 20px;
        }
      }
      > span {
        color: #FCAD57;
        font-size: 16px;
        float: right;
        margin-right: 14px;
        line-height: 44px;
        height: 44px;
      }
    }
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    background-color: #f5f5f5;
  }
</style>
<script>
  export default {
    props: ['value', 'placeholder'],
    data() {
      return {}
    },
    mounted() {
    },
    methods: {},
    components: {}
  }
</script>
