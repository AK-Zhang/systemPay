<template>
  <div>
    <div class="app-head">
      <span class="nav-left" @click="$router.go(-1)"></span>
      <div class="app-title">个人</div>
    </div>
    <div class="app-body-1">
      <d-input v-model="name" title="名称" placeholder="姓名全称"></d-input>
      <d-input v-model="code" title="证件号" placeholder="请输入证件号"></d-input>
      <!-- <div class="type-box clearfix">
        <div class="protocol-radio-box" @click="type=key" v-for="(item, key) in typeList" :key="item.key">
          <span :class="type==key?'active':''"></span>
          <div>{{item}}</div>
        </div>
      </div>
      <div class="type-box clearfix" v-show="type=='ENTER'">
        <div class="protocol-radio-box" @click="blicCardType=key" v-for="(item, key) in companyTypeMap" :key="item.key">
          <span :class="blicCardType==key?'active':''"></span>
          <div>{{item}}</div>
        </div>
      </div> -->
    </div>
    <div class="fun-main-btn" @click="saveInfo" :class="{disabled:!(name&&code)}">下一步</div>
  </div>
</template>
<style lang="less" scoped>
  .type-box {
    > div {
      float: left;
      margin-right: 20px;
    }
  }
</style>
<script>
/*

  Created by lvhan1 on 2018/07/13

  template中 注释掉的 是原版 在认证中 需要点击个人还是企业的信息   若后期有需要  则解开就好

*/
  import {mapGetters} from 'vuex'
  import {saveCompanyInfo} from '../../utils/api'

  export default {
    data() {
      return {
        name: null,
        code: null
      }
    },
    computed: {
      ...mapGetters([
        'idInfo',
      ])
    },
    mounted() {
      // this.$ajax.get('/company/', data => {
      //   this.$store.dispatch('setIdInfo', data)
      //   if (this.idInfo.blicCardType) {
      //     this.blicCardType = this.idInfo.blicCardType
      //     this.type = 'ENTER'
      //     this.name = this.idInfo.blicCompanyName
      //     this.code = this.idInfo[this.blicType[this.blicCardType]]
      //   }
      // })
    },
    destroyed() {

    },
    methods: {
      /**
       * 保存用户信息
       * */
      saveInfo(e) {
        if(!this.name||!this.code){
          return
        }
        /*

        以前是 选择个人或者 企业 所以会有 ENTER PERSON之分
        现在只是c端  按钮去掉  点击下一步按钮  带过去信息就好 不用区分

        */
        // if (this.type == 'ENTER') {
          // this.idInfo.companyType = 'ENTER'
          this.idInfo.name = this.name
          this.idInfo.expYear='29'
          this.idInfo.expMonth='08'
          // this.idInfo.blicCardType = this.blicCardType
          this.idInfo.idNo = this.code
        this.$router.push({path: this.$route.path.replace('/identify/index', '/identify/person')})

      }
    },
    components: {}
  }
</script>
