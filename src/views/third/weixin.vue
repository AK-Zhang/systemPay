<template>
    <div>

    </div>
</template>
<style lang="less" scoped>
</style>
<script>
  export default {
    data () {
      return {
        code: null,
        state: null
      }
    },
    mounted () {
      // alert(location.search)
      this.code = this.$methods.getQueryString('code')
      this.state = this.$methods.getQueryString('state')
    },
    methods: {
      /**
       * 获取用户信息
       * */
      getUserInfo () {
        this.$ajax.get('/qh/mobile/wechat/oauth?code=' + this.code + 'state=' + this.state, data => {
          this.$store.dispatch('setUserInfo', data)
        })
      }
    },
    components: {}
  }
</script>
