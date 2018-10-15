<template>
  <div>
    <div class="app-head white-bg">
      <span class="nav-left" @click="$router.go(-1)"></span>
      <div class="app-title">选择时间</div>
    </div>
    <div class="time-body">
      <p>选择时间</p>
      <div class="clearfix clearM">
        <div :class="start?'active':''" @click="start=true">{{startDate}}</div>
        <div :class="!start?'active':''" @click="start=false">{{endDate}}</div>
        <span>至</span>
      </div>
    </div>
    <datetime-view ref="time" @on-change="dateChange" v-model="start?startDate:endDate"
                   :end-date="maxDate"></datetime-view>
    <div class="confirm-btn" @click="timeConfirm">确认</div>
  </div>
</template>
<style lang="less" scoped>
  .time-body {
    > div:nth-child(2) {
      height: 35px;
      color: #788A96;
      font-size: 15px;
      text-align: center;
      line-height: 35px;
      > div {
        border: 1px solid #f0f0f0;
        border-radius: 2px;
        height: 35px;
        width: 140px;
        &.active {
          color: #FCAD57;
          border-color: #FCAD57;
        }
      }
      > div:first-child {
        float: left;
      }
      > div:nth-child(2) {
        float: right;
      }
      > span {
        display: block;
        margin: 0 auto;
        height: 1px;
        width: 15px;
      }
      margin-bottom: 40px;
    }
    > p {
      line-height: 23px;
      color: #788A96;
      margin: 20px 0;
    }
    padding: 10px 16px;
  }
</style>
<script>
  import {DatetimeView} from 'vux'

  export default {
    data() {
      return {
        startDate: new Date().getFullYear() + '-' + (new Date().getMonth() + 1 + '').padStart(2, 0) + '-01',
        endDate: this.$filters.fdate(new Date(), 'yyyy-MM-dd'),
        maxDate: this.$filters.fdate(new Date(), 'yyyy-MM-dd'),
        start: true
      }
    },
    watch: {
      'start': function (v) {
        this.$refs.time.render()
      }
    },
    mounted() {
    },
    methods: {
      dateChange(v) {
        if (this.start) {
          this.startDate = v
        } else this.endDate = v
      },
      timeConfirm() {
        this.$emit('timeConfirm', {
          start: new Date(this.startDate).getTime(),
          end: new Date(this.endDate).getTime()
        })
        this.$router.go(-1)
        //this.$router.push({path:'/account/detail',query:{"start":new Date(this.startDate).getTime(),"end":new Date(this.endDate).getTime()}});
      }
    },
    components: {
      DatetimeView
    }
  }
</script>
