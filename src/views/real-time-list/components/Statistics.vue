<template>
  <div>
    <div class="w-card p10 pb20">
      <h5 class="f14 n title">充/放电趋势</h5>
      <line-chart :chart-data="lineChartData" />
    </div>
    <el-row class="mt10" :gutter="10">
      <el-col :span="12">
        <div class="w-card p10">
          <h5 class="f14 n title">开机-关机时间分布</h5>
          <pie-chart />
        </div>
      </el-col>
      <el-col :span="12">
        <div class="w-card p10">
          <h5 class="f14 n title">充电-放电时间分布</h5>
          <pie-chart />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import LineChart from './chart/LineChart'
import PieChart from './chart/PieChart'
const lineChartData = {
  expectedData: [100, 120, 161, 134, 105, 160, 165],
  actualData: [120, 82, 91, 154, 162, 140, 145]
}
export default {
  components: {
    LineChart,
    PieChart
  },
  props: {},
  data() {
    return {
      lineChartData
    }
  },
  computed: {},
  watch: {},
  mounted() {},
  created() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
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
</style>
