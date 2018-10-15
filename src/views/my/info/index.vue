<template>
  <div>
    <head-bar title="我的资料" rt="保存" rtFn="saveInfo"></head-bar>
    <div class="my-info-body">
      <div class="link-show-line icon-box">
        <span>头像</span>
        <input id="img-upload" type="file"  accept="image/*"  hidden>
        <label for="img-upload"><img src="../../../assets/img/my-icon.png"></label>
      </div>
      <div class="link-show-line">
        <span>昵称</span>
        <p @click="$router.push({path: $route.path + '/nick'})">{{nick||'请填写'}}</p>
      </div>
      <div class="link-show-line">
        <span>性别</span>
        <p @click="showGender = true">{{gender[0]||'请选择'}}</p>
      </div>
      <div class="link-show-line">
        <span>生日</span>
        <p @click="showBirth">{{birth || '请选择'}}</p>
      </div>
      <div class="link-show-line">
        <span>简介</span>
        <p @click="$router.push({path: $route.path + '/intro'})" class="single-line">{{intro||'请填写'}}</p>
      </div>
    </div>
    <popup-picker  v-model="gender" :data="genderData" confirmText="确定" style="display:none;" :show.sync="showGender"></popup-picker>
    <transition name="slide">
      <router-view :nick.sync="nick" :intro.sync="intro"  v-dom-portal class="router-container"></router-view>
    </transition>
  </div>
</template>
<style lang="less" scoped>
  .my-info-body{
    .icon-box{
      line-height: 76px;
      height: 76px;
      label{
        height: 76px;
        img{
          width: 50px;
          height: 50px;
          border-radius: 50%;
          margin-top: 13px;
        }
      }
    }
  }
</style>
<script>
  import { PopupPicker, DatetimePlugin } from 'vux'
  export default {
    data () {
      return {
        intro: null,
        birth: '1990-05-01',
        nick: '好象君',
        icon: null,
        gender: ['女'],
        showGender: false,
        genderData: [['男', '女']]
      }
    },
    mounted () {
    },
    methods: {
      /**
       * 显示日期选择
       * */
      showBirth () {
        this.$vux.datetime.show({
          value: this.birth || new Date().Format('yyyy-MM-dd').replace(/^\d{4}/, function (v) {
            return parseInt(v) - 20
          }), // 其他参数同 props
          confirmText: '确定',
          cancelText: '取消',
          startDate: new Date().Format('yyyy-MM-dd').replace(/^\d{4}/, function (v) {
            return parseInt(v) - 200
          }),
          endDate: new Date().Format('yyyy-MM-dd'),
          onConfirm: v => {
            this.birth = v
          }
        })
      },
      /**
       * 保存用户信息
       * */
      saveInfo () {
      }
    },
    components: {
      PopupPicker,
      DatetimePlugin
    }
  }
</script>
