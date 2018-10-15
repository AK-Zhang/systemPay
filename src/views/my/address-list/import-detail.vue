<template>
    <div>
      <head-bar :title="title"></head-bar>
      <div>
        <scroller height="-44px">
          <box-input title="姓名" placeholder="请输入对方姓名" v-model="name"></box-input>
          <box-input title="电话" placeholder="请输入对方手机号" v-model="phone"></box-input>
          <box-input title="身份证" placeholder="请输入对方身份证号" v-model="code"></box-input>
          <template v-if="type!==2">
            <box-input title="备注" placeholder="请输入备注" v-model="remark"></box-input>
            <!--<div class="setting-common-box clearM">-->
              <!--<p>分组</p>-->
              <!--&lt;!&ndash;<div @click="$router.push({path:$route.path+'/group'})">&ndash;&gt;-->
                <!--&lt;!&ndash;{{group.name || '默认分组'}}&ndash;&gt;-->
              <!--&lt;!&ndash;</div>&ndash;&gt;-->
            <!--</div>-->
          </template>
          <button class="confirm-btn">确认</button>
        </scroller>
      </div>
      <transition name="slide">
        <router-view :group="group" :choose="true" v-dom-portal class="router-container"></router-view>
      </transition>
    </div>
</template>
<style lang="less" scoped>
</style>
<script>
  export default {
    props: ['type', 'detail'],
    data () {
      return {
        title: '',
        name: null,
        phone: null,
        code: null,
        remark: null,
        group: {}
      }
    },
    mounted () {
      if (this.detail) this.title = '明细'
      else {
        if (this.type === 1) this.title = '单条录入'
        else if (this.type === 2) this.title = '邀请加入'
      }
    },
    methods: {},
    components: {}
  }
</script>
