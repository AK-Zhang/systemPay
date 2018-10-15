<template>
    <div class="gray-body">
      <head-bar title="备注他的信息" rt="完成" :rtFn="saveInfo"></head-bar>
      <div class="contact-detail-remark">
        <div class="white-bg">
          <span>备注名</span>
          <div>
            <input type="text" v-model="remark1">
          </div>
        </div>
        <div class="white-bg">
          <span>描述</span>
          <div>
            <input type="text" v-model="des1">
          </div>
        </div>
      </div>
    </div>
</template>
<style lang="less" scoped>
  .contact-detail-remark{
    >div{
      margin-top: 10px;
      line-height: 49px;
      padding: 0 15px;
      font-size: 14px;
      >span{
        float: left;
        width: 65px;
        color: #9DAEB9;
      }
      >div{
        margin-left: 70px;
        input{
          width: 100%;
          height: 49px;
          padding: 10px 0;
          color: #788A96;
        }
      }
    }
  }
</style>
<script>
  export default {
    props: ['remark', 'des'],
    data () {
      return {
        remark1: null,
        des1: null
      }
    },
    mounted () {
      this.remark1 = this.remark
      this.des1 = this.des
    },
    methods: {
      saveInfo () {
        this.$emit('saveInfo', {
          remark: this.remark1,
          des: this.des1
        })
        this.$router.go(-1)

      }
    },
    components: {}
  }
</script>
