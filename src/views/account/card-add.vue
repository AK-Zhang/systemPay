<template>
    <div>
      <div class="app-head white-bg">
        <span class="nav-left" @click="$router.go(-1)"></span>
        <div class="app-title">添加银行卡</div>
      </div>
      <div class="card-add-body">
        <div class="border-bottom-1 clearfix" @click="showBank=true">
          <span class="right-arrow"></span>
          <span>{{bankName[0]||'请选择'}}</span>
          <span>
            银行名称
          </span>
        </div>
        <div class="border-bottom-1 clearfix" @click="showAddress=true">
          <span class="right-arrow"></span>
          <span>{{addressName|| '请选择'}}</span>
          <span>
            所在城市
          </span>
        </div>
        <div class="border-bottom-1 clearfix">
          <span class="right-arrow"></span>
          <span>请选择</span>
          <span>
            支行名称
          </span>
        </div>
        <div class="border-bottom-1 clearfix">
          <div>
            <input type="text" placeholder="请输入银行卡号">
          </div>
          <span>
            银行卡号
          </span>
        </div>
      </div>
      <div style="margin-top: 60px" class="confirm-btn">下一步</div>
      <popup-picker title="选择银行"  v-model="bankName" :data="bankData" style="display:none;" :show.sync="showBank"></popup-picker>
      <x-address title="所在城市" @on-hide="hide" @on-shadow-change="onShadowChange" v-model="address" :list="addressData" style="display:none;" :show.sync="showAddress"></x-address>
    </div>
</template>
<style lang="less" scoped>
  .card-add-body{
    >div{
      line-height: 60px;
      padding-right: 15px;
      margin-left: 15px;
      input{
        text-align: right;
      }
      span:first-child{
        margin-left: 7px;
      }
      span,div{
        float: right;
        font-size: 14px;
        color: #9DAEB9;
      }
      >span:last-child{
        float: left;
        font-size: 16px;
        color: #788A96;
      }
    }
  }
</style>
<script>
  import { XAddress, ChinaAddressV4Data, PopupPicker } from 'vux'
  export default {
    data () {
      return {
        showBank: false,
        showAddress: false,
        address: [],
        addressData: ChinaAddressV4Data,
        bankData: [['中国银行', '工商银行', '农业银行', '建设银行']],
        bankName: [],
        addressName: '',
        addressName1: '',
      }
    },
    mounted () {
      this.$nextTick(() => {
        $('.vux-popup-mask').addClass('child-router')
      })
    },
    methods: {
      hide (v) {
        if (v) this.addressName = this.addressName1
      },
      onShadowChange (ids, names) {
        this.addressName1 = (names[0] || '') + ' ' + (names[1] || '') + ' ' + (names[2] || '')
      }
    },
    beforeRouteLeave (to, from, next) {
      $('.vux-popup-mask.child-router').removeClass('child-router')
      next(true)
    },
    components: {
      XAddress,
      PopupPicker
    }
  }
</script>
