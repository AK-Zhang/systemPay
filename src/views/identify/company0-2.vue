<template>
  <div>
    <div class="app-head">
      <span @click="back" class="nav-left"></span>
      <div class="app-title">认证</div>
    </div>
    <process :process="process"></process>
    <div class="app-body-2">
      <div class="group-upload-box">
        <div v-if="licenceUrl" @click="showImg('licence')">已上传营业执照</div>
        <label v-else for="img-input" @click="present = 'licence'">营业执照</label>
      </div>
      <div class="group-upload-box">
        <div v-if="organizeUrl" @click="showImg('organize')">已上传组织机构代码证</div>
        <label v-else for="img-input" @click="present = 'organize'">组织机构代码证</label>
      </div>
      <div class="group-upload-box">
        <div v-if="taxUrl" @click="showImg('tax')">已上传税务登记证</div>
        <label v-else for="img-input" @click="present = 'tax'">税务登记证</label>
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
    <div class="fun-main-btn" @click="nextProcess(0)" :class="{disabled: !(licenceUrl&&organizeUrl&&taxUrl)}">下一步</div>
  </div>
</template>
<style lang="less" scoped>
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
        process: 1,
        showImgs: false,
        present: 'licence',
        imgUrl: null,
        licenceUrl: null,
        organizeUrl: null,
        taxUrl: null,
      }
    },
    mounted () {
       this.licenceUrl = this.idInfo.blicUrlA
       this.organizeUrl = this.idInfo.ossBlicTrcUrlA
       this.taxUrl = this.idInfo.ossBlicObaUrlA
    },
    computed: {
      ...mapGetters([
        'idInfo',
      ])
    },
    methods: {
      showImg (k) {
        this.present = k
        this.imgUrl = this[this.present + 'Url']
        this.showImgs = true
      },
      handleImg (e) {
        this.$methods.uploadImg(e, 'identify', url => {
          this.imgUrl = url
          this[this.present + 'Url'] = url
          this.imgUrl = url
          document.getElementById('img-form').reset()
        })
      },
      back () {
        this.$router.go(-1)
      },
      nextProcess (e) {
        this.idInfo.blicUrlA = this.licenceUrl
        this.idInfo.ossBlicTrcUrlA = this.organizeUrl
        this.idInfo.ossBlicObaUrlA = this.taxUrl
        saveCompanyInfo(() => {
          this.$router.push({path: this.$route.path.replace('company0-2', 'company1')})
        }, e)
      }
    },
    components: {}
  }
</script>
