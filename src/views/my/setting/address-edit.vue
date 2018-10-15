<template>
    <div>
      <head-bar :title="title"></head-bar>
      <div class="address-edit-body">
        <scroller style="height: 100%;">
          <div class="setting-common-box clearM">
            <p>联系人</p>
            <div>
              <input type="text" placeholder="姓名">
            </div>
          </div>
          <div class="setting-common-box clearM">
            <p>手机号码</p>
            <div>
              <input type="text" placeholder="11位手机号码">
            </div>
          </div>
          <div class="setting-common-box clearM">
            <p>选择地区</p>
            <div @click="showAddress=true">
              {{addressName || '地区信息'}}
            </div>
          </div>
          <div class="setting-common-box clearM">
            <p>详细地址</p>
            <div>
              <input type="text" placeholder="街道门牌信息">
            </div>
          </div>
          <div class="setting-common-box clearM">
            <p>邮政编码</p>
            <div>
              <input type="text" placeholder="邮政编码">
            </div>
          </div>
        </scroller>
      </div>
      <x-address title="所在城市" @on-hide="hide" @on-shadow-change="onShadowChange" v-model="addressContent" :list="addressData" style="display:none;" :show.sync="showAddress"></x-address>
      <button class="confirm-bottom-btn" @click="saveAddress">确认</button>
    </div>
</template>
<style lang="less" scoped>
  .address-edit-body{
    position: absolute;
    top: 44px;
    bottom:193px;
    left:0;
    right: 0;
  }
</style>
<script>
  import { XAddress, ChinaAddressV4Data } from 'vux'
  export default {
    props: ['address'],
    data () {
      return {
        title: '',
        showAddress: false,
        addressData: ChinaAddressV4Data,
        addressB: {},
        addressContent: [],
        addressName: '',
        addressName1: '',
      }
    },
    mounted () {
      this.title = this.address ? '修改地址' : '新增地址'
      if (this.address) {
        this.addressB = this.address
      }
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
      },
      saveAddress () {

      }
    },
    beforeRouteLeave (to, from, next) {
      $('.vux-popup-mask.child-router').removeClass('child-router')
      next(true)
    },
    components: {
      XAddress,
    }
  }
</script>
