<template>
  <div class="">
    <div class="app-head">
      <span class="nav-left" @click="$router.go(-1)"></span>
      <div class="app-title">实名认证</div>
    </div>
    <div class="status-3-box">
      <div class="app-body-2">
        <span v-if="!showTitleName"></span>
        <validate-code :child-data="ReqCodeId" :mobile="mobile" @passCheck="passCheck" :type="indentifyType"></validate-code>
      </div>
    </div>
  </div>
</template>
<script>
  import {apiService} from "@/utils/apiservice.js";
  import validateCode from '../../components/common/validateCode.vue'
  import {mapGetters} from 'vuex'
  import {config} from '@/utils/config'
  export default {
    name: 'realName',
    components: {
      validateCode
    },
    data() {
      return {
        indentifyType:'indentifyType',
        password: 'password',
        mobile: '',
        verifyNum: 60,
        secrutyKey: '',
        vue: null,
        pubKey: '',//公钥
        apiService: null,
        verifyCode: '',
        showTitleName:false,
        idInfoObj:'',
        ReqCodeId:''
      }
    },
    created() {

    },
    computed: {
      ...mapGetters([
        'idInfo',
      ])
    },
    methods: {
      passCheck(sendms) {
        window.location.reload()
        window.location.replace(config.domainPersonal+'/#/account/success')
      },
    },
    mounted() {
      // console.log(this.$route.query.verifyReqId)
      // this.ReqCodeId = this.$route.query.verifyReqId
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
