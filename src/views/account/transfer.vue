<template>
    <div>
      <div class="app-head white-bg">
        <span class="nav-left" @click="$router.go(-1)"></span>
        <div class="app-title">转到对方账户</div>
      </div>
      <div class="transfer-body">
        <!-- <d-input style="padding-top: 32px;height: 82px" type="num" v-model="name" title="名称" placeholder="请输入对方名称"></d-input>
        <d-input  style="padding-top: 32px;height: 82px" type="num" v-model="code" title="证件号" placeholder="请输入对方证件号"></d-input> -->
        <d-input style="padding-top: 32px;height: 82px" type="num" v-model="accountinfo.phone" title="手机号" placeholder="请输入对方手机号"></d-input>
      </div>
      <div class="confirm-btn" :class="{disabled: !this.name||!this.code}" @click="next">下一步</div>
    </div>
</template>
<style lang="less" scoped>
.transfer-body {
  padding-left: 15px;
}
</style>
<script>
export default {
  data() {
    return {
      accountinfo:{
      // name: null,
      // code: null,
      phone: null        
      }
    };
  },
  mounted() {},
  methods: {
    next(e) {
      if ($(e.target).hasClass("disabled")) return;
      $(e.target).addClass("disabled");
      this.$ajax.post(
        "/company/findTransferCompany",
        {
          // blicCompanyName: this.name,
          // blicCardNo: this.code
          customPhone: this.accountinfo.phone
        },
        data => {
          if (data.type == 1) {
            window.HMO_APP.$vux.toast.show({
              text: "个人禁止转账个人，只允许转账企业",
              time: "7000"
            });
            return;
          } else if (data.type == 2) {
            this.accountinfo.customerName = data.customerName;
            this.accountinfo.data.merCustomerId = data.data.merCustomerId;
            sessionStorage.setItem('Paccountinfo',JSON.stringify(this.accountinfo));
            this.$router.push({
              path: "/account/transfer1",
              query: { id: data.merCustomerId }
            });
          }
        },
        err => {
          $(e.target).removeClass("disabled");
        }
      );
    }
  },
  components: {}
};
</script>
