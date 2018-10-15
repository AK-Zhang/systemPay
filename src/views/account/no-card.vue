<template>
    <div class="no-card">
      <div class="app-head">
        <span class="nav-left" @click="back"></span>
        <div class="app-title">暂无银行卡</div>
      </div>
      <div class="no-card-body">
        <img src="../../assets/img/account-card.png">
        <p>您还没有绑定银行卡哦～</p>
        <button class="next-btn" @click="addBank">绑定银行卡</button>
      </div>
      <transition name="slide">
        <router-view  v-dom-portal class="router-container"></router-view>
      </transition>
    </div>
</template>
<style lang="less" scoped>
  .no-card{
    background-color: #F5F5F5;
    height: 100%;
    .app-head{
      background-color: #fff;
    }
  }
  .no-card-body{
    text-align: center;
    padding-bottom: 40px;
    background-color: #fff;
    >img{
      width: 54px;
      height: 37px;
      margin: 55px 0 23px;
    }
    >p{
      line-height: 20px;
      color: #373F47;
      margin-bottom: 15px;
    }
  }
</style>
<script>
  export default {
    data () {
      return {}
    },
    mounted () {
    },
    methods: {
      back(){
        window.location.reload()
        window.location.replace(config.domainPersonal+'/#/account/index')
      },
      addBank(){
        this.$router.push({path:this.$route.path.replace('/account/no-card', '/account/no-card/add')})
      }
    },
    components: {}
  }
</script>
