<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
// require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null,
      sidebarElm: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })

    if (this.autoResize) {
      this.__resizeHandler = debounce(() => {
        if (this.chart) {
          this.chart.resize()
        }
      }, 100)
      window.addEventListener('resize', this.__resizeHandler)
    }

    // 监听侧边栏的变化
    this.sidebarElm = document.getElementsByClassName('sidebar-container')[0]
    this.sidebarElm && this.sidebarElm.addEventListener('transitionend', this.sidebarResizeHandler)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    if (this.autoResize) {
      window.removeEventListener('resize', this.__resizeHandler)
    }

    this.sidebarElm && this.sidebarElm.removeEventListener('transitionend', this.sidebarResizeHandler)

    this.chart.dispose()
    this.chart = null
  },
  methods: {
    sidebarResizeHandler(e) {
      if (e.propertyName === 'width') {
        this.__resizeHandler()
      }
    },
    setOptions(data) {
      this.chart.setOption({
        xAxis: {
          data: ['SUN', 'MON', 'TUE', 'WED', 'TUH', 'FRI', 'SAT'],
          axisLabel: { // 刻度样式
            show: true,
            textStyle: {
              color: '#848E98',
              fontSize: 8
            }
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        tooltip: { // 提示框
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#57617B'
            }
          },
          backgroundColor: 'rgba(0,28,55,0.75)',
          padding: 10
        },
        legend: {
          left: 'center',
          bottom: 10,
          itemGap: 10,
          itemWidth: 8,
          itemHeight: 8,
          textStyle: {
            fontSize: 10,
            color: '#848E98'
          }
        },
        grid: { // 布局
          left: 10,
          right: 10,
          bottom: 50,
          top: 30,
          containLabel: true
        },
        yAxis: {
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          splitLine: { // 虚线
            lineStyle: {
              type: 'dashed',
              color: '#DCDCDC'
            }
          }
        },
        series: [{
          name: 'warehousing ', itemStyle: {
            normal: {
              color: '#3FAFFF',
              lineStyle: {
                color: '#3FAFFF',
                width: 1
              }
            }
          },
          symbol: 'none',
          smooth: false,
          type: 'bar',
          data: [123, 213, 323, 323, 133, 334, 534],
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        },
        {
          name: 'ex_warehouse', itemStyle: {
            normal: {
              color: '#F37272',
              lineStyle: {
                color: '#F37272',
                width: 1
              }
            }
          },
          symbol: 'none',
          smooth: false,
          type: 'bar',
          data: [123, 213, 323, 323, 133, 334, 534],
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        }, {
          name: 'equipped', itemStyle: {
            normal: {
              color: '#FFC12F',
              lineStyle: {
                color: '#FFC12F',
                width: 1
              }
            }
          },
          symbol: 'none',
          smooth: false,
          type: 'bar',
          data: [123, 213, 323, 323, 133, 334, 534],
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        }]
      })
    },
    initChart() {
      this.chart = echarts.init(this.$el)
      this.setOptions(this.chartData)
    }
  }
}
</script>
