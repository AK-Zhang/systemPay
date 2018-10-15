<template>
    <div>
      <head-bar title="更多设置"></head-bar>
      <div class="about-more-body">
        <div class="link-show-line" @click="$router.push({path: '/my/setting/address'})">
          <span>我的地址</span>
          <p>{{address||'未填写'}}</p>
        </div>
        <div class="link-show-line" @click="$router.push({path: '/my/setting/education'})">
          <span>我的学历</span>
          <p>{{education||'未填写'}}</p>
        </div>
        <div class="link-show-line" @click="$router.push({path: '/my/setting/job'})">
          <span>我的工作</span>
          <p>{{job||'未填写'}}</p>
        </div>
      </div>
    </div>
</template>
<style lang="less" scoped>
</style>
<script>
  export default {
    data () {
      return {
        address: null,
        education: null,
        job: null,
      }
    },
    mounted () {
    },
    methods: {},
    components: {}
  }
</script>
