<template>
  <div>
    <div class="app-head">
      <span @click="back" class="nav-left"></span>
      <div class="app-title">认证</div>
    </div>
    <process :process="process"></process>
    <div class="app-body-2">
      <div>
        <div class="single-upload-box">
          <div v-if="imgUrl" @click="showImg"></div>
          <label v-else for="img-input"></label>
          <input @change="handleImg($event)" accept="image/*" id="img-input" type="file" hidden>
          <p>{{imgUrl?'已':'请'}}上传开户行许可证</p>
        </div>
      </div>
    </div>
    <div class="img-container" v-show="showImgs">
      <label class="img-re-upload" for="img-input">
        重新上传
      </label>
      <div class="img-box" :style="'background-image:url('+imgUrl+')'"></div>
      <div class="img-close" @click="showImgs=false">
      </div>
    </div>
    <div class="fun-main-btn" @click="nextProcess" :class="{disabled: !imgUrl}">下一步</div>
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
        process: 2,
        showImgs: false,
        imgUrl: null
      }
    },
    computed: {
      ...mapGetters([
        'idInfo',
      ])
    },
    mounted () {
      this.imgUrl = this.idInfo.ossOccUrl
    },
    methods: {
      showImg () {
        this.showImgs = true
      },
      handleImg (e) {
        this.$methods.uploadImg(e, 'identify', url => {
            this.imgUrl = url
        })
      },
      back () {
        this.$router.go(-1)
      },
      nextProcess (e) {
        this.idInfo.ossOccUrl = this.imgUrl
        saveCompanyInfo(() => {
          this.$router.push({path: this.$route.path.replace('company1', 'company2')})
        }, e)
      }
    },
    components: {}
  }
</script>
