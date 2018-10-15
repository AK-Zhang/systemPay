<template>
  <div>
    <div class="app-head">
      <span @click="back" class="nav-left"></span>
      <div class="app-title">上传公函</div>
    </div>
    <div class="app-body-1">
      <div>
        <div class="single-upload-box">
          <div v-if="imgUrl" @click="showImg"></div>
          <label v-else for="img-input"></label>
          <input @change="handleImg($event)" accept="image/*" id="img-input" type="file" hidden>
          <p>{{imgUrl?'已':'请'}}上传认证公函</p>
        </div>
        <div class="show-template" @click="$router.push({path:$route.path.replace('company4', 'company5')})">点击查看公函模板</div>
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
    <div class="fun-main-btn" @click="nextProcess(0)" :class="{disabled: !imgUrl}">下一步</div>
  </div>
</template>
<style lang="less" scoped>
  .show-template{
    color:#FCAD57;
    text-align: center;
    margin-top: 20px;
    font-size: 14px;
    cursor: pointer;
  }
</style>
<script>
  export default {
    data () {
      return {
        showImgs: false,
        imgUrl: null
      }
    },
    mounted () {
    },
    methods: {
      showImg () {
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
          me.imgUrl = this.result
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
        this.$router.push({path: this.$route.path.replace('company4', 'wait')})
      }
    },
    components: {}
  }
</script>
