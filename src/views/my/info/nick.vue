<template>
    <div class="gray-body">
      <head-bar title="昵称" rt="确定" :rtFn="saveNick"></head-bar>
      <div class="nick-box">
        <span class="input-close" v-show="nickName" @click="clearNick"></span>
        <div>
          <input id="nick-input" v-model="nickName" type="text" placeholder="请输入昵称~">
        </div>
      </div>
    </div>
</template>
<style lang="less" scoped>
  .nick-box{
    span{
      margin-top: 23px;
    }
    div{
      margin-right: 20px;
      input{
        height: 100%;
        width: 100%;
        font-size: 14px;
      }
    }
    height: 60px;
    line-height: 60px;
    background: #fff;
    padding: 0 15px;
    margin-top: 10px;
  }
</style>
<script>
  export default {
    props: ['nick'],
    data () {
      return {
        nickName: null
      }
    },
    mounted () {
      this.nickName = this.nick
    },
    methods: {
      saveNick () {
        this.$emit('update:nick', this.nickName)
        this.$router.go(-1)
      },
      clearNick () {
        this.nickName = null
        this.$nextTick(() => {
          $('#nick-input').focus()
        })
      }
    },
    components: {}
  }
</script>
