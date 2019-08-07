<template>
  <div class="dashboard-editor-container">
    <panel-group @handleSetLineChartData="handleSetLineChartData" />
    <div class="mt10">
      <div class="w-card left-ct p10">
        <h5 class="f14 n title">警告数量</h5>
        <el-row :gutter="20" class="tc blue-title mt20">
          <el-col :span="8">
            故障等级
          </el-col>
          <el-col :span="8">
            数量
          </el-col>
          <el-col :span="8">
            同比
          </el-col>
        </el-row>
        <el-row v-for="(item,index) in warningData" :key="index" class="mt20 mb20 f13">
          <el-col :span="8" class="text-primary">
            <img class="warn-icon" :src="item.imgsrc" alt="" srcset="">
            {{ item.title }}
          </el-col>
          <el-col :span="8" :class="item.myclass" class="tc">
            {{ item.quantity }}
          </el-col>
          <el-col :span="8" :class="item.myclass" class="tc">
            {{ item.yearonyear }}
          </el-col>
        </el-row>
        <div>
          <line-chart :chart-data="lineChartData" />
        </div>
      </div>
      <div class="right-ct">
        <div class="w-card p10">
          <h5 class="f14 n title">设备数量</h5>
          <bar-chart />
        </div>
        <el-row class="mt10" :gutter="10">
          <el-col :span="12">
            <div class="w-card p10">
              <h5 class="f14 n title">设备在线状态</h5>
              <pie-chart :chart-data="pieChartData1" />
            </div>
          </el-col>
          <el-col :span="12">
            <div class="w-card p10">
              <h5 class="f14 n title">设备充电状态</h5>
              <pie-chart :chart-data="pieChartData2" />
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import BarChart from './components/BarChart'
import PieChart from './components/PieChart'
const warningData = [{
  imgsrc: require('@/assets/icon_warning01@2x.png'),
  title: '一级警告',
  quantity: '200',
  yearonyear: '10.85↑',
  myclass: 'text-danger'
}, {
  imgsrc: require('@/assets/icon_warning02@2x.png'),
  title: '二级警告',
  quantity: '200',
  yearonyear: '10.85↑',
  myclass: 'text-danger'
}, {
  imgsrc: require('@/assets/icon_warning03@2x.png'),
  title: '三级警告',
  quantity: '200',
  yearonyear: '10.85↓',
  myclass: 'text-success'
}, {
  imgsrc: require('@/assets/icon_warning04@2x.png'),
  title: '正常',
  quantity: '220',
  yearonyear: '10.85↑',
  myclass: 'text-danger'
}]
const lineChartData = {
  data1: [20, 30, 40, 50, 60, 70, 80],
  data2: [30, 30, 45, 50, 60, 70, 100],
  data3: [10, 30, 50, 50, 62, 75, 85],
  data4: [10, 30, 40, 60, 60, 70, 90]
}
const pieChartData1 = [
  { value: 320, legendname: '在线', name: '开机时间 71%', itemStyle: { color: '#3FAFFF' }},
  { value: 240, legendname: '离线', name: '关机时间 72%', itemStyle: { color: '#4C4C4C' }}
]
const pieChartData2 = [
  { value: 27, legendname: '放电', name: '放电 27%', itemStyle: { color: '#3FAFFF' }},
  { value: 45, legendname: '保护', name: '保护 45%', itemStyle: { color: '#F37272' }},
  { value: 11, legendname: '直流充电', name: '直流充电 11%', itemStyle: { color: '#3366F3' }},
  { value: 10, legendname: '交流充电', name: '交流充电 10%', itemStyle: { color: '#FFC12F' }},
  { value: 7, legendname: '自检', name: '开机时间 7%', itemStyle: { color: '#8D64FF' }}
]
export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    LineChart,
    BarChart,
    PieChart
  },
  data() {
    return {
      warningData,
      lineChartData,
      pieChartData1,
      pieChartData2
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  .title{
    position: relative;
    color:#001C37;
    padding-left: 8px;
    &::after{
      content: '';
      position:absolute;
      left: 0;
      top: 4px;
      width:2px;
      height: 12px;
      background:rgba(39,141,236,1);
      border-radius:2px;
    }
  }
  .warn-icon{
    display: inline-block;
    width: 14px;
    height: 14px;
    margin-right: 10px;
  }
  .left-ct{
    float: left;
    width: 350px;
    min-height: 723px;
    .blue-title{
      font-size:13px;
      line-height: 36px;
      color: #278DEC;
      background-color: #DEEFFF;
    }
  }
  .right-ct{
    margin-left: 360px;
  }
}
</style>
