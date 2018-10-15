<template>
  <div>
    <div class="app-head">
      <span @click="back" class="nav-left"></span>
      <div class="app-title">开通认证公函</div>
    </div>
    <div class="app-body-1">
      <scroller style="height:100%;">
        <p class="main-content">
          <span>申请人主体全称:</span>***信息技术有限公司
        </p>
        <p class="main-content">
          <span>帐号管理员姓名:</span>***
        </p>
        <p class="main-content">
          <span>联系电话:</span>***********
        </p>
        <div class="template-content">
          申请人同意授权委托指定人员______________（身份证号码：____________________）作为帐号联系人，以申请人名义不可撤销地申请平台帐号开通及认证服务，并授权其负责该帐号的内容维护及运营管理。
        </div>
        <div class="template-content">
          1. 申请人同意：申请人帐号的使用权属于通过资质审核的申请主体，该帐号自注册时其产生的一切权利义务均由该主体承担，该帐号所获得的所有收益、权限均归认证后的主体享有，且所有运营活动都必须以该主体对外开展；
        </div>
        <div class="template-content">
          2. 申请人承诺：提交给平台的认证资料真实无误，平台帐号内容维护及运营管理遵守国家法律法规、政策及《平台服务协议》的相关规定。如违反上述承诺，责任自行承担。
        </div>
        <div class="template-content">
          申请人对以上认证申请信息表填写信息及申请公函内容确认无异议。
        </div>
        <div class="template-content">
          帐号管理员签字：
        </div>
        <div class="template-content">
          申请主体加盖公章：
        </div>
        <div class="template-content">
          需加盖与主体一致的单位公章。无公章的个体工商户可加盖法人私章或法人签字。
        </div>
        <div class="template-content">
          ____年____月____日
        </div>
      </scroller>
    </div>
    <div class="fun-main-btn" id="clip-btn" :data-clipboard-text="text">复制本文链接</div>
  </div>
</template>
<style lang="less" scoped>
  .app-body-1{
    .template-content{
      margin: 10px 0 20px 0;
    }
    .main-content{
      color:#788A96;
      line-height: 20px;
      >span{
        width:110px;
        display: inline-block;
      }
    }
    color:#9DAEB9;
    font-size: 14px;
  }
</style>
<script>
  export default {
    data () {
      return {
        text: location.href
      }
    },
    mounted () {
      var clipboard = new Clipboard('#clip-btn'), me = this;

      clipboard.on('success', function(e) {
        clipboard.destroy();
        me.$router.go(-1)
      });

      clipboard.on('error', function(e) {
        me.$vux.toast.show({
          text: '复制失败，请再次尝试'
        })
      });
    },
    methods: {
      back () {
        this.$router.go(-1)
      }
    },
    components: {}
  }
</script>
