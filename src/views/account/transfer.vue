<template>
    <div>
      <div class="app-head white-bg">
        <span class="nav-left" @click="$router.go(-1)"></span>
        <div class="app-title">转到对方账户</div>
      </div>
      <div class="transfer-body">
        <d-input style="padding-top: 32px;height: 82px" type="num" v-model="name" title="名称" placeholder="请输入对方名称"></d-input>
        <d-input  style="padding-top: 32px;height: 82px" type="num" v-model="code" title="证件号" placeholder="请输入对方证件号"></d-input>
      </div>
      <div class="confirm-btn" :class="{disabled: !this.name||!this.code}" @click="next">下一步</div>
    </div>
</template>
<style lang="less" scoped>
  .transfer-body{
    padding-left: 15px;
  }
</style>
<script>
  export default {
    data () {
      return {
        name: null,
        code: null
      }
    },
    mounted () {
    },
    methods: {
      next (e) {
        if ($(e.target).hasClass('disabled')) return
        $(e.target).addClass('disabled')
        this.$ajax.post('/company/findTransferCompany', {
          blicCompanyName: this.name,
          blicCardNo: this.code
        }, data => {
          this.$router.push({path: '/account/transfer1', query: {id: data.merCustomerId}})
        }, err => {
          $(e.target).removeClass('disabled')
        })
      }
    },
    components: {}
  }
</script>
