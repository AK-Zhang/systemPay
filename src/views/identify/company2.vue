<template>
  <div>
    <div class="app-head">
      <span @click="back" class="nav-left"></span>
      <div class="app-title">认证</div>
    </div>
    <process :process="process"></process>
    <div class="app-body-2">
      <div>
        <div class="group-upload-box">
          <div v-if="corporateUrl1" @click="showImg('corporateUrl1')">已上传法人身份证-正面</div>
          <label v-else for="img-input" @click="present = 'corporateUrl1'">法人身份证-正面</label>
        </div>
        <div class="group-upload-box">
          <div v-if="corporateUrl2" @click="showImg('corporateUrl2')">已上传法人身份证-反面</div>
          <label v-else for="img-input" @click="present = 'corporateUrl2'">法人身份证-反面</label>
        </div>
        <div class="toggle-box">
          管理员同法人
          <div class="switch-toggle label" :class="{active: !aupIsLEP}" @click="aupIsLEP = !aupIsLEP">
            <div class="toggle-handle"></div>
          </div>
        </div>
        <div v-show="!aupIsLEP">
          <div class="group-upload-box">
            <div v-if="adminUrl1" @click="showImg('adminUrl1')">已上传账号管理员-身份证正面</div>
            <label v-else for="img-input" @click="present = 'adminUrl1'">账号管理员-身份证正面</label>
          </div>
          <div class="group-upload-box">
            <div v-if="adminUrl2" @click="showImg('adminUrl2')">已上传账号管理员-身份证反面</div>
            <label v-else for="img-input" @click="present = 'adminUrl2'">账号管理员-身份证反面</label>
          </div>
        </div>
      </div>
      <form id="img-form">
        <input @change="handleImg($event)" accept="image/*" id="img-input" type="file" hidden>
      </form>
    </div>
    <div class="img-container" v-show="showImgs">
      <label class="img-re-upload" for="img-input">
        重新上传
      </label>
      <div class="img-box" :style="'background-image:url('+imgUrl+')'"></div>
      <div class="img-close" @click="showImgs=false">
      </div>
    </div>
    <div class="fun-main-btn" @click="nextProcess" :class="{disabled: !(corporateUrl1&&corporateUrl2&&(aupIsLEP || adminUrl1&&adminUrl2))}">下一步</div>
  </div>
</template>
<style lang="less" scoped>
  .toggle-box{
    height: 26px;
    margin: 14px 0 -6px 0;
    text-align: right;
    line-height: 26px;
    color:#9DAEB9;
    font-size: 14px;
    .label{
      float: right;
      margin: 0 15px 0 5px;
    }
  }
  .card-box{
    position: absolute;
    right:27px;
    top:59px;
    color:#9DAEB9;
    font-size: 14px;
    line-height: 22px;
  }
</style>
<script>
  import { mapGetters } from 'vuex'
  import {saveCompanyInfo} from '../../utils/api'
  export default {
    data () {
      return {
        process: 3,
        aupIsLEP: false, // 管理员是否等同于法人
        showImgs: false,
        present: 'licence',
        imgUrl: null,
        corporateUrl1: null,
        corporateUrl2: null,
        adminUrl1: null,
        adminUrl2: null,
      }
    },
    mounted () {
      this.aupIsLEP = this.idInfo.aupIsLEP
      this.corporateUrl1 = this.idInfo.ossLepUrlA
      this.corporateUrl2 = this.idInfo.ossLepUrlB
      this.adminUrl1 = this.idInfo.ossaupUrlA
      this.adminUrl2 = this.idInfo.ossaupUrlB
    },
    computed: {
      ...mapGetters([
        'idInfo',
      ])
    },
    methods: {
      showImg (k) {
        this.present = k
        this.imgUrl = this[this.present]
        this.showImgs = true
      },
      handleImg (e) {
        this.$methods.uploadImg(e, 'identify', url => {
          this.imgUrl = url
          this[this.present] = url
          this.imgUrl = url
          document.getElementById('img-form').reset()
        })
      },
      back () {
        this.$router.go(-1)
      },
      nextProcess (e) {
        this.idInfo.aupIsLEP = this.aupIsLEP
        this.idInfo.ossLepUrlA = this.corporateUrl1
        this.idInfo.ossLepUrlB = this.corporateUrl2
        this.idInfo.ossaupUrlA = this.aupIsLEP ? null : this.adminUrl1
        this.idInfo.ossaupUrlB = this.aupIsLEP ? null : this.adminUrl2
        saveCompanyInfo(() => {
          this.$router.push({path: this.$route.path.replace('company2', 'company3')})
        }, e)
      }
    },
    components: {}
  }
</script>
