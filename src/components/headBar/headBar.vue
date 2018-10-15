<template>
  <div>
    <div class="app-head">
      <span class="nav-left" @click="$router.go(-1)"></span>
      <div class="app-title">{{title}}</div>
      <div v-if="rt" class="nav-right" @click="rtFn">{{rt}}</div>
      <div v-if="icon" class="nav-right" @click="rtFn">
        <img :src="imgSrc">
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
  .app-head{
    background: #fff;
    box-shadow: none;
    border-bottom: 1px solid #f0f0f0;
  }
</style>
<script>
  export default {
    props: ['title', 'rtFn', 'rt', 'icon'],
    data () {
      return {
        imgSrc: ''
      }
    },
    watch: {
      'icon': function (v) {
        if (v) this.imgSrc = require('../../assets/img/' + v);
      }
    },
    mounted () {
      if (this.icon) this.imgSrc = require('../../assets/img/' + this.icon);
    },
    methods: {},
    components: {}
  }
</script>
