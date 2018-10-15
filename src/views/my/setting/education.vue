<template>
    <div>
      <head-bar title="我的学历" rt="确定" :rtFn="saveE"></head-bar>
      <div class="education-body">
        <scroller :height="-44">
          <div class="setting-common-box clearM">
            <p>学校类型</p>
            <div @click="showType=true">
              {{type[0] || '请选择'}}
            </div>
          </div>
          <div class="setting-common-box clearM">
            <p>学校名称</p>
            <div>
              <input type="text" placeholder="请输入完整的学校名称">
            </div>
          </div>
          <div class="setting-common-box clearM">
            <p>入学时间</p>
            <div @click="showTime=true">
              {{time[0] || '请选择'}}
            </div>
          </div>
          <div class="setting-common-box clearM">
            <p>院系</p>
            <div>
              <input type="text" placeholder="请输入你所在的院系">
            </div>
          </div>
        </scroller>
      </div>
      <popup-picker  v-model="type" :data="typeData" confirmText="确定" style="display:none;" :show.sync="showType"></popup-picker>
      <popup-picker  v-model="time" :data="timeData" confirmText="确定" style="display:none;" :show.sync="showTime"></popup-picker>
    </div>
</template>
<style lang="less" scoped>
  .education-body{
  }
</style>
<script>
  import { PopupPicker } from 'vux'
  export default {
    data () {
      return {
        showType: false,
        showTime: false,
        typeData: [['大学', '高中', '中专', '大专', '初中', '小学']],
        type: [],
        time: [],
        timeData: [[]]
      }
    },
    mounted () {
      let year = new Date().getFullYear(), i = 100
      while (i--) {
        this.timeData[0].push(year--)
      }
//      this.$nextTick(() => {
//        $('.vux-popup-mask').addClass('child-router')
//      })
    },
    methods: {
      /**
       * 保存我的学历
       * */
      saveE () {
        this.$router.go(-1)
      }
    },
    beforeRouteLeave (to, from, next) {
//      $('.vux-popup-mask.child-router').removeClass('child-router')
      next(true)
    },
    components: {
      PopupPicker
    }
  }
</script>
