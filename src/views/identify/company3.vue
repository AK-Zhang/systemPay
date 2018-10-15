<template>
  <div>
    <div class="app-head">
      <span class="nav-left" @click="$router.go(-1)"></span>
      <div class="app-title">信息确认</div>
    </div>
    <div class="app-body-1">
      <scroller ref="scroller" style="height:100%;">
       <div class="confirm-line">
         <div>企业名称:</div>
         <input type="text" v-model="companyName">
       </div>
        <div class="confirm-line">
          <div>执照号码:</div>
          <input type="text" v-model="companyCode">
        </div>
        <div class="confirm-line">
          <div>开户行:</div>
          <input type="text" v-model="bank">
        </div>
        <div class="confirm-line">
          <div>银行账号:</div>
          <input type="text" v-model="bankAccount">
        </div>
        <div class="confirm-line">
          <div>企业法人:</div>
          <input type="text" v-model="corporate">
        </div>
        <div class="confirm-line">
          <div>身份证号:</div>
          <input type="text" v-model="corporateCode">
        </div>
        <div class="confirm-line">
          <div>有效期至:</div>
          <input type="text" v-model="corporateTime">
        </div>
        <div class="sep-line"></div>
        <div class="confirm-line" style="margin-top: 26px;">
          <div>管理员:</div>
          <input class="bottom-input" type="text" v-model="admin">
        </div>
        <div class="confirm-line">
          <div>联系方式:</div>
          <input  class="bottom-input" type="text" v-model="adminTel">
        </div>
        <div class="confirm-line">
          <div>身份证号:</div>
          <input  class="bottom-input" type="text" v-model="adminCode">
        </div>
        <div class="confirm-line">
          <div>有效期至:</div>
          <input  class="bottom-input" type="text" v-model="adminTime">
        </div>
        <div class="confirm-tips">
          如信息有误，请更正后确认
        </div>
      </scroller>
    </div>
    <div class="fun-main-btn" @click="judgeCode">确认</div>
  </div>
</template>
<style lang="less" scoped>
  .confirm-tips{
    font-size: 14px;
    color: #9DAEB9;
    margin: 14px 0 20px;
    text-align: center;
  }
  .confirm-line{
    font-size: 14px;
    padding-left: 10px;
    line-height: 20px;
    margin-bottom: 26px;
    >div:first-child{
      float: left;
      width: 73px;
      color: #9DAEB9;
      margin-top: 1px;
    }
    >input{
      width: 160px;
      color: #788A96;
    }
  }
</style>
<script>
  import { mapGetters } from 'vuex'
  import {identifyCompany} from '../../utils/api'
  export default {
    data () {
      return {
        companyName: '中旅国际传媒有限公司',
        companyCode: 1223432123677,
        bank: '中国建设银行北京分行',
        bankAccount: '1223347899765432211',
        corporate: '张栋梁',
        corporateCode: '1223347899765432211',
        corporateTime: '2020-03-10',
        admin: '张栋梁',
        adminTel: 13333333333,
        adminCode: '1223347899765432211',
        adminTime: '2020-03-10',

      }
    },
    computed: {
      ...mapGetters([
        'idInfo',
      ])
    },
    mounted () {
      this.companyName = this.idInfo.blicCompanyName
      this.companyCode = this.idInfo.blicUrlA
      this.bank = this.idInfo.bank
      this.bankAccount = this.idInfo.bankAccount
      this.corporate = this.idInfo.lepName
      this.corporateCode = this.idInfo.lepCardNo
      this.corporateTime = this.idInfo.lepValidityEnd
      this.admin = this.idInfo.aupName
      this.adminTel = this.idInfo.aupMobile
      this.adminCode = this.idInfo.aupCardNo
      this.adminTime = this.idInfo.aupValidityEnd
      let me = this
      $('.bottom-input').click(function (e) {
        setTimeout(function () {
          me.$refs.scroller.scrollToBottom()
        }, 400)
      })
    },
    methods: {
      /**
       * 判断用户身份
       * */
      judgeCode (e) {
        this.idInfo.blicCompanyName = this.companyName
        this.idInfo.blicUrlA = this.companyCode
        this.idInfo.bank = this.bank
        this.idInfo.bankAccount = this.bankAccount
        this.idInfo.lepName = this.corporate
        this.idInfo.lepCardNo = this.corporateCode
        this.idInfo.lepValidityEnd = this.corporateTime
        this.idInfo.aupName = this.admin
        this.idInfo.aupMobile = this.adminTel
        this.idInfo.aupCardNo = this.adminCode
        this.idInfo.aupValidityEnd = this.adminTime
        identifyCompany(() => {
          this.$router.push({path: this.$route.path.replace('company3', 'company4')})
        }, e)
      }
    },
    components: {}
  }
</script>
