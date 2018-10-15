<template>
  <div>
    <div class="app-head">
      <span @click="back" class="nav-left"></span>
      <div class="app-title">等待成功</div>
    </div>
    <div class="app-body-1">
      <div>
        <p>贵公司尾号***5586账号将收到一笔认证汇款</p>
        <p>请填写汇款金额</p>
        <input type="tel" pattern="[0-9]*">
      </div>
    </div>
    <div class="fun-main-btn" id="clip-btn" @click="$router.push({path: $route.path.replace('success', 'password')})">
      确认
    </div>
  </div>
</template>
<style lang="less" scoped>
  .app-body-1 {
    p {
      line-height: 17px;
      margin-bottom: 17px;
    }
    input {
      margin-top: 17px;
      width: 255px;
      height: 64px;
      padding: 25px 0;
      text-align: center;
      background: rgba(250, 250, 251, 1);
      border-radius: 4px;
    }
    color: #788A96;
    text-align: center;
    font-size: 14px;
    padding-top: 131px;
  }
</style>
<script>
  export default {
    data() {
      return {}
    },
    mounted() {
    },
    methods: {
      back() {
        this.$router.go(-1)
      }
    },
    components: {}
  }
</script>
