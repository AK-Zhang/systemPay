<template>
    <div>
      <head-bar title="设置"></head-bar>
      <div class="setting-body">
        <div class="link-line" @click="resetPwdBind">
          <div>修改密码</div>
        </div>
        <div class="link-line"  @click="$router.push({path:$route.path.replace('/my/setting','/user/gesture')})">
          <div>手势设置</div>
        </div>
        <!--<div class="link-line" @click="$router.push({path:'/my/setting/about'})">-->
          <!--<div>关于</div>-->
        <!--</div>-->
        <!--<div class="link-line" @click="$router.push({path:'/my/setting/more'})">-->
          <!--<div>更多设置</div>-->
        <!--</div>-->
      </div>
    </div>
</template>
<style lang="less" scoped>
  .setting-body{
    color: #788A96;
    font-size: 14px;
    >div:nth-child(1){
      background-image: url('../../../assets/img/setting-safe.png');
    }
    >div:nth-child(2){
      background-image: url('../../../assets/img/setting-third.png');
    }
    >div:nth-child(3){
      background-image: url('../../../assets/img/setting-about.png');
    }
    >div:nth-child(4){
      background-image: url('../../../assets/img/setting-more.png');
    }
    >div{
      padding-left: 31px;
      background-repeat: no-repeat;
      background-position: 0 center;
    }
  }
</style>
<script>
  import {apiService} from "@/utils/apiservice.js";
  export default {
    data () {
      return {}
    },
    mounted () {
    },
    methods: {
      resetPwdBind(){
          apiService.resetPwdBind(this, function (data) {
            if(data.data.success){
              window.location.href=data.data.data
            }else{
              window.HMO_APP.$vux.toast.show({
                text: data.data.msg
              })
            }
          })
      },
    },
    components: {}
  }
</script>
