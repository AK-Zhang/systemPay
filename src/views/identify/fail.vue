<template>
  <div>
    <div class="app-head">
      <span @click="back" class="nav-left"></span>
      <div class="app-title">认证失败</div>
    </div>
    <div class="wait-identify">
      <img src="../../assets/img/identify-fail.png">
      <div>认证失败</div>
      <div>请重新上传以下资料</div>
    </div>
    <div class="app-body-4">
      <scroller style="height:100%;">
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
      </scroller>
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
    <div class="fun-main-btn" @click="nextProcess(0)" :class="{disabled: !imgUrl}">完成</div>
  </div>
</template>
<style lang="less" scoped>
  .wait-identify{
    text-align: center;
    margin: 38px 0 0 0;
    >div:last-child{
      color:#788A96;
      font-size: 14px;
      line-height: 17px;
    }
    >div:nth-child(2){
      color:#FE9D32;
      font-size: 20px;
      width:80px;
      line-height: 28px;
      height: 28px;
      margin: 22px auto 14px;
      text-shadow: 0 2px 4px 0 RGBA(254, 157, 50, 0.19);
    }
    >img{
      width:30px;
      height:30px;
    }
  }
</style>
<script>
  export default {
    data () {
      return {
        showImgs: false,
        present: 'licence',
        imgUrl: null,
        licenceUrl: null,
        organizeUrl: null,
        taxUrl: null,
      }
    },
    mounted () {
    },
    methods: {
      showImg (k) {
        this.present = k
        this.imgUrl = this[this.present + 'Url']
        this.showImgs = true
      },
      handleImg (e) {
        var file = e.target.files[0]
        if (!file) return
        if (!/\/(?:jpeg|png|gif)/i.test(file.type)) {
          this.$vux.toast.text('请上传正确的图片类型')
          return
        }
        var reader = new FileReader(), me = this
        reader.readAsDataURL(file)
        reader.onload = function (e) {
          me[me.present + 'Url'] = this.result
          me.imgUrl = this.result
          document.getElementById('img-form').reset()
        }
//        this.uploadImg(file, file.name)
      },
      uploadImg (file, name) {
        let me = this
        this.$ajax.get('/img/path', {type: 2, file: name}).then(res => {
          let obj = res.data, fd = new FormData(), key = obj.path
          fd.append('key', key)
          fd.append('Content-Type', 'multipart/form-data')
          fd.append('OSSAccessKeyId', obj.accessid)
          fd.append('policy', obj.policy)
          fd.append('signature', obj.signature)
          fd.append('file', file)
          function createXmlHttpRequest () {
            if (window.ActiveXObject) { // 如果是IE浏览器
              return new window.ActiveXObject('Microsoft.XMLHTTP')
            } else if (window.XMLHttpRequest) { // 非IE浏览器
              return new window.XMLHttpRequest()
            }
          }
          var xhr = createXmlHttpRequest()
          xhr.open('POST', obj.host.replace('http://', 'https://'), true)
          xhr.send(fd)
          xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) { // 因为是跨域，阿里云上设置不正确导致提示错误，实际是上传成功了，故只判断完成时为成功
              if (xhr.status === 204) {
                $('#img-box')[0].reset()
                me.pic = obj.cdnHost + obj.path
                me.$message({
                  message: '上传成功！',
                  type: 'warning'
                })
              } else {
                me.$message({
                  message: '上传失败！',
                  type: 'warning'
                })
              }
            }
          }
        })
      },
      back () {
        this.$router.go(-1)
      },
      nextProcess (e) {
        if ($(e.target).hasClass('disabled')) return
        this.$router.push({path: this.$route.path.replace('fail', 'password')})
      }
    },
    components: {}
  }
</script>
