<template>
    <div class="gray-body">
      <head-bar title="简介" rt="确定" :rtFn="saveIntro"></head-bar>
      <div class="intro-box">
        <textarea v-model="introContent"  rows="5" placeholder="请输入简介~"></textarea>
      </div>
    </div>
</template>
<style lang="less" scoped>
  .intro-box{
    textarea{
      width: 100%;
      font-size: 14px;
      resize: none;
      height: 100px;
    }
    line-height: 20px;
    background: #fff;
    padding: 15px;
    margin-top: 10px;
  }
</style>
<script>
  export default {
    props: ['intro'],
    data () {
      return {
        introContent: null
      }
    },
    mounted () {
      this.introContent = this.intro
    },
    methods: {
      saveIntro () {
        this.$emit('update:intro', this.introContent)
        this.$router.go(-1)
      }
    },
    components: {}
  }
</script>
