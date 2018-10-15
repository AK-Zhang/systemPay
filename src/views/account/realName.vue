<template>
  <div class="">
    <div class="app-head">
      <span class="nav-left" @click="$router.go(-1)"></span>
      <div class="app-title">添加银行卡</div>
    </div>
    <div class="status-3-box">
      <div class="app-body-2">
        <span v-if="!showTitleName"></span>
        <validate-code :mobile="mobile" @passCheck="passCheck" :type="bindCard"></validate-code>
      </div>
    </div>
  </div>
</template>
<script>
  // import {apiService} from "@/utils/apiservice.js";
  import validateCode from '@/components/common/validateCode.vue'
  import {mapGetters} from 'vuex'
  export default {
    name: 'realName',
    components: {
      validateCode
    },
    data() {
      return {
        bindCard:'bindCard',
        password: 'password',
        mobile: '',
        verifyNum: 60,
        secrutyKey: '',
        vue: null,
        pubKey: '',//公钥
        apiService: null,
        verifyCode: '',
        showTitleName:false,
        idInfoObj:''
      }
    },
    beforeCreate(){
      this.mobile=this.$route.query.mobile
    },
    created() {
      this.mobile=this.$route.query.mobile
    },
    computed: {
      ...mapGetters([
        'idInfo',
      ])
    },
    methods: {
      passCheck() {
        this.$router.push({'path': this.$route.path.replace('/account/real_name', '/account/card')});
      },
    },
    mounted() {
      $(".key-box ").css({display:'none'})
    }
  }
</script>

<style lang="less" scoped>
  .wraper {
    width: 100%;
  }

  .app-body-2 {
    position: absolute;
    left: 15px;
    right: 15px;
    padding: 25px 0 0 15px;
    box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.05);
    top: 134px;
    bottom: 90px;
  }
</style>
