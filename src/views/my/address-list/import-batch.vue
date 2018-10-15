<template>
    <div>
      <head-bar title="批量导入"></head-bar>
      <div class="batch-body">
        <scroller height="-44px">
          <template v-if="memberList[0]">
            <div class="number-box" v-for="item in memberList" @click="checkDetail(item)">
              <img src="../../../assets/img/female-icon.png">
              <div class="link-line clearM">
                <p>{{item.groupName?(item.groupName+'-'):''}}{{item.name}}</p>
                <p>{{item.phone}}</p>
              </div>
            </div>
            <button class="confirm-btn">确认</button>
          </template>
          <template v-else>
            <div class="no-upload">
              <img src="../../../assets/img/member-template.png">
              <a href="javascript:;">下载模板</a>
            </div>
            <input type="file" accept=".xlsx,.xlsb,.xlsm,.xls" id="member-up-input" hidden @change="uploadFile">
            <label for="member-up-input" class="confirm-btn">上传</label>
          </template>
        </scroller>
      </div>
      <transition name="slide">
        <router-view :detail="detail" v-dom-portal class="router-container"></router-view>
      </transition>
    </div>
</template>
<style lang="less" scoped>
  .number-box{
    >img{
      float: left;
      width: 40px;
      height: 40px;
      margin-top: 10px;
    }
    >div{
      margin-left: 53px;
      >p:first-child{
        line-height: 21px;
        margin:10px 0 2px;
        font-size: 15px;
        color: #788A96;
      }
      >p:nth-child(2){
        line-height: 20px;
        font-size: 14px;
        color: #9DAEB9;
      }
    }
    height: 60px;
    padding-left: 15px;
    margin-top: 5px;
  }
  .no-upload{
    >img{
      width: 90px;
      height: 90px;
      display: block;
      margin: 60px auto 15px;
    }
    >a{
      display: block;
      text-align: center;
      font-size: 16px;
      color: #4E8FF6;
      cursor: pointer;
      line-height: 23px;
      margin-bottom: 23px;
    }
  }
</style>
<script>
  import XLSX from 'XLSX'
  export default {
    data () {
      return {
        memberList: [],
        detail: null,
        dataP: {
          '姓名': 'name',
          '电话': 'phone',
          '身份证号': 'code',
          '备注': 'remark',
          '分组': 'groupName'
        }
      }
    },
    mounted () {
    },
    methods: {
      checkDetail (v) {
        this.detail = v
        this.$router.push({path: this.$route.path + '/detail'})
      },
      gernerate (data) {
        let kIdx = {}
        for (let i = 0; i < data[0].length; i++) {
          let v = this.dataP[data[0][i]]
          if (v) kIdx[v] = i
        }
        if (!kIdx.hasOwnProperty('name')) {
          this.$vux.toast.show({
            text: '请按照正确的模板格式上传'
          })
          return
        }
        for (let i = 1; i < data.length; i++) {
          if (data[i][kIdx.name]) {
            this.memberList.push({
              name: data[i][kIdx.name],
              phone: data[i][kIdx.phone],
              code: data[i][kIdx.code],
              remark: data[i][kIdx.remark],
              groupName: data[i][kIdx.groupName],
            })
          }
        }
      },
      uploadFile (e) {
        const files = e.target.files;
        if(files && files[0]) {
          const file = files[0]
          /* Boilerplate to set up FileReader */
          const reader = new FileReader();
          reader.onload = (e) => {
            /* Parse data */
            const bstr = e.target.result;
            const wb = XLSX.read(bstr, {type:'binary'});
            /* Get first worksheet */
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            /* Convert array of arrays */
            const data = XLSX.utils.sheet_to_json(ws, {header:1});
            /* Update state */
            this.gernerate(data);
          };
          reader.readAsBinaryString(file);
        }
      }
    },
    components: {}
  }
</script>
