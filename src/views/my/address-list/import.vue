<template>
    <div>
      <head-bar title="添加人员"></head-bar>
      <div>
        <div class="link-line" @click="(type=1)&&($router.push({path:$route.path+'/detail'}))">
          单条录入
        </div>
        <div class="link-line" @click="$router.push({path:$route.path+'/batch'})">
          批量导入
        </div>
        <div class="link-line" @click="(type=2)&&($router.push({path:$route.path+'/detail'}))">
          邀请加入
        </div>
      </div>
      <transition name="slide">
        <router-view :type="type" v-dom-portal class="router-container"></router-view>
      </transition>
    </div>
</template>
<style lang="less" scoped>
</style>
<script>
  export default {
    data () {
      return {
        type: 1
      }
    },
    mounted () {
    },
    methods: {},
    components: {}
  }
</script>
