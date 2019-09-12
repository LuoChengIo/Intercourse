<template>
  <div>
    <div class="w-card search-card">
      <el-form :inline="true" :model="searchFrom" label-width="72px" class="form-inline my-inline-form">
        <el-form-item label="设备ID">
          <el-input v-model="searchFrom.data3" placeholder="请输入设备ID" />
        </el-form-item>
        <el-form-item label="设备名称">
          <el-input v-model="searchFrom.data3" disabled placeholder="" />
        </el-form-item>
        <el-form-item label="所属公司">
          <el-input v-model="searchFrom.data3" disabled placeholder="" />
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="searchSubmit">搜索</el-button>
          <el-button type="primary">读取</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div v-heightAuto class="mt20 p20 w-card">
      <h5 class="title mb20">电流参数</h5>
      <el-form :inline="true" class="form-inline my-inline-form">
        <el-form-item v-for="(item,index) in currentParameter" :key="index">
          <el-checkbox v-model="item.checked" />
          <span class="w150">{{ item.text }}</span>
          <el-input v-model="item.value" placeholder="请输入内容" />
        </el-form-item>
      </el-form>
      <h5 class="title mb20">单体电压参数</h5>
      <el-form :inline="true" class="form-inline my-inline-form">
        <el-form-item v-for="(item,index) in monomerVoltageParameter" :key="index">
          <el-checkbox v-model="item.checked" />
          <span class="w150">{{ item.text }}</span>
          <el-input v-model="item.value" placeholder="请输入内容" />
        </el-form-item>
      </el-form>
      <h5 class="title mb20">总电压参数</h5>
      <el-form :inline="true" class="form-inline my-inline-form">
        <el-form-item v-for="(item,index) in totalVoltageParameter" :key="index">
          <el-checkbox v-model="item.checked" />
          <span class="w150">{{ item.text }}</span>
          <el-input v-model="item.value" placeholder="请输入内容" />
        </el-form-item>
      </el-form>
      <h5 class="title mb20">充电参数</h5>
      <el-form :inline="true" class="form-inline my-inline-form">
        <el-form-item v-for="(item,index) in chargingParameter" :key="index">
          <el-checkbox v-model="item.checked" />
          <span class="w150">{{ item.text }}</span>
          <el-input v-model="item.value" placeholder="请输入内容" />
        </el-form-item>
      </el-form>
      <h5 class="title mb20">放电参数</h5>
      <el-form :inline="true" class="form-inline my-inline-form">
        <el-form-item v-for="(item,index) in dischargeParameter" :key="index">
          <el-checkbox v-model="item.checked" />
          <span class="w150">{{ item.text }}</span>
          <el-input v-model="item.value" placeholder="请输入内容" />
        </el-form-item>
      </el-form>
      <h5 class="title mb20">其他参数</h5>
      <el-form :inline="true" class="form-inline my-inline-form">
        <el-form-item v-for="(item,index) in elseParameter" :key="index">
          <el-checkbox v-model="item.checked" />
          <span class="w150">{{ item.text }}</span>
          <el-input v-if="!item.type" v-model="item.value" placeholder="请输入内容" />
          <el-select v-else v-model="item.value" placeholder="请选择">
            <el-option
              v-for="citem in item.options"
              :key="citem.value"
              :label="citem.name"
              :value="citem.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div class="mt30 tc">
        <el-button type="primary">重置</el-button>
        <el-button type="success" @click="submitFrom">下发</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      searchFrom: {},
      valueFrom: {},
      currentParameter: [ // 电流参数
        { checked: false, name: '', text: '单体充电截止电压值(mV)', value: '' },
        { checked: false, name: '', text: '单体电池充电恢复电压值(mV)', value: '' },
        { checked: false, name: '', text: '额定容量(0.1Ah)', value: '' },
        { checked: false, name: '', text: '压差过大三级报警值(mV)', value: '' },
        { checked: false, name: '', text: '压差过大二级报警值(mV)', value: '' },
        { checked: false, name: '', text: '压差过大一级报警值(mV)', value: '' },
        { checked: false, name: '', text: '温差过大三级报警值(0.1℃)', value: '' },
        { checked: false, name: '', text: '温差过大二级报警值(0.1℃)', value: '' },
        { checked: false, name: '', text: '温差过大一级报警值(0.1℃)', value: '' },
        { checked: false, name: '', text: '充电过流三级报警值(0.1A)', value: '' },
        { checked: false, name: '', text: '充电过流二级报警值(0.1A)', value: '' },
        { checked: false, name: '', text: '充电过流一级报警值(0.1A)', value: '' },
        { checked: false, name: '', text: '充电过流三级报警恢复值(0.1A)', value: '' },
        { checked: false, name: '', text: '充电过流二级报警恢复值(0.1A)', value: '' },
        { checked: false, name: '', text: '充电过流一级报警恢复值(0.1A)', value: '' },
        { checked: false, name: '', text: '放电过流三级报警值(0.1A)', value: '' },
        { checked: false, name: '', text: '放电过流二级报警值(0.1A)', value: '' },
        { checked: false, name: '', text: '放电过流一级报警值(0.1A)', value: '' },
        { checked: false, name: '', text: '放电过流三级报警恢复值(0.1A)', value: '' },
        { checked: false, name: '', text: '放电过流二级报警恢复值(0.1A)', value: '' },
        { checked: false, name: '', text: '放电过流一级报警恢复值(0.1A)', value: '' }
      ],
      monomerVoltageParameter: [ // 单体电压参数
        { checked: false, name: '', text: '单体过压三级报警值(mV)', value: '' },
        { checked: false, name: '', text: '单体过压二级报警值(mV)', value: '' },
        { checked: false, name: '', text: '单体过压一级报警值(mV)', value: '' },
        { checked: false, name: '', text: '单体过压三级报警恢复值(mV)', value: '' },
        { checked: false, name: '', text: '单体过压二级报警恢复值(mV)', value: '' },
        { checked: false, name: '', text: '单体过压一级报警恢复值(mV)', value: '' },
        { checked: false, name: '', text: '单体欠压三级报警值(mV)', value: '' },
        { checked: false, name: '', text: '单体欠压二级报警值(mV)', value: '' },
        { checked: false, name: '', text: '单体欠压一级报警值(mV)', value: '' },
        { checked: false, name: '', text: '单体欠压三级报警恢复值(mV)', value: '' },
        { checked: false, name: '', text: '单体欠压二级报警恢复值(mV)', value: '' },
        { checked: false, name: '', text: '单体欠压一级报警恢复值(mV)', value: '' }
      ],
      totalVoltageParameter: [ // 总电压参数
        { checked: false, name: '', text: '总电压过压三级报警值(mV)', value: '' },
        { checked: false, name: '', text: '总电压过压二级报警值(mV)', value: '' },
        { checked: false, name: '', text: '总电压过压一级报警值(mV)', value: '' },
        { checked: false, name: '', text: '总电压过压三级报警恢复值(mV)', value: '' },
        { checked: false, name: '', text: '总电压过压二级报警恢复值(mV)', value: '' },
        { checked: false, name: '', text: '总电压过压一级报警恢复值(mV)', value: '' },
        { checked: false, name: '', text: '总电压欠压三级报警值(mV)', value: '' },
        { checked: false, name: '', text: '总电压欠压二级报警值(mV)', value: '' },
        { checked: false, name: '', text: '总电压欠压一级报警值(mV)', value: '' },
        { checked: false, name: '', text: '总电压欠压三级报警恢复值(mV)', value: '' },
        { checked: false, name: '', text: '总电压欠压二级报警恢复值(mV)', value: '' },
        { checked: false, name: '', text: '总电压欠压一级报警恢复值(mV)', value: '' }

      ],
      chargingParameter: [ // 充电参数
        { checked: false, name: '', text: '充电温度过高三级报警值(0.1℃)', value: '' },
        { checked: false, name: '', text: '充电温度过高二级报警值(0.1℃)', value: '' },
        { checked: false, name: '', text: '充电温度过高一级报警值(0.1℃)', value: '' },
        { checked: false, name: '', text: '充电温度高三级报警恢复值(0.1℃)', value: '' },
        { checked: false, name: '', text: '充电温度高二级报警恢复值(0.1℃)', value: '' },
        { checked: false, name: '', text: '充电温度高一级报警恢复值(0.1℃)', value: '' },
        { checked: false, name: '', text: '充电温度过低三级报警值(0.1℃)', value: '' },
        { checked: false, name: '', text: '充电温度过低二级报警值(0.1℃)', value: '' },
        { checked: false, name: '', text: '充电温度过低一级报警值(0.1℃)', value: '' },
        { checked: false, name: '', text: '充电温度过低三级报警值恢复值(0.1℃)', value: '' },
        { checked: false, name: '', text: '充电温度过低二级报警值恢复值(0.1℃)', value: '' },
        { checked: false, name: '', text: '充电温度过低一级报警值恢复值(0.1℃)', value: '' }
      ],
      dischargeParameter: [ // 放电参数
        { checked: false, name: '', text: '放电温度过高三级报警值(0.1℃)', value: '' },
        { checked: false, name: '', text: '放电温度过高二级报警值(0.1℃)', value: '' },
        { checked: false, name: '', text: '放电温度过高一级报警值(0.1℃)', value: '' },
        { checked: false, name: '', text: '放电温度高三级报警恢复值(0.1℃)', value: '' },
        { checked: false, name: '', text: '放电温度高二级报警恢复值(0.1℃)', value: '' },
        { checked: false, name: '', text: '放电温度高一级报警恢复值(0.1℃)', value: '' },
        { checked: false, name: '', text: '放电温度过低三级报警值(0.1℃)', value: '' },
        { checked: false, name: '', text: '放电温度过低二级报警值(0.1℃)', value: '' },
        { checked: false, name: '', text: '放电温度过低一级报警值(0.1℃)', value: '' },
        { checked: false, name: '', text: '放电温度过低三级报警值恢复值(0.1℃)', value: '' },
        { checked: false, name: '', text: '放电温度过低二级报警值恢复值(0.1℃)', value: '' },
        { checked: false, name: '', text: '放电温度过低一级报警值恢复值(0.1℃)', value: '' }
      ],
      elseParameter: [ // 其他参数
        { checked: false, name: '', text: '充电加热使能', value: '', type: 'select', options: [{ name: '使能', value: 1 }, { name: '禁止', value: 0 }] },
        { checked: false, name: '', text: '充电加热开始温度(0.1℃)', value: '' },
        { checked: false, name: '', text: '充电加热截止温度(0.1℃)', value: '' },
        { checked: false, name: '', text: 'SOC过低三级报警值（‰）', value: '' },
        { checked: false, name: '', text: 'SOC过低二级报警值（‰', value: '' },
        { checked: false, name: '', text: 'SOC过低一级报警值(0.001)', value: '' },
        { checked: false, name: '', text: '正常充电电流设置值(0.1A)', value: '' },
        { checked: false, name: '', text: '充电加热电流设置值(0.1A)', value: '' },
        { checked: false, name: '', text: '总放电电量（0.1KWh）', value: '' },
        { checked: false, name: '', text: '总充电电量（0.1KWh）', value: '' },
        { checked: false, name: '', text: '被动均衡使能', value: '', type: 'select', options: [{ name: '使能', value: 1 }, { name: '禁止', value: 0 }] },
        { checked: false, name: '', text: '被动均衡开启电压差值（mV）', value: '' },
        { checked: false, name: '', text: '被动均衡开启压差值（mV）', value: '' },
        { checked: false, name: '', text: '远程升级使能', value: '', type: 'select', options: [{ name: '使能', value: 1 }, { name: '禁止', value: 0 }] }
      ]
    }
  },
  computed: {},
  watch: {},
  mounted() {},
  created() {},
  methods: {
    searchSubmit() {

    },
    submitFrom() {
      console.log(this.currentParameter)
    }
  }
}
</script>
<style lang="scss" scoped>
.my-inline-form{
  .el-form-item__content,.el-form-item{
    vertical-align: middle;
  }
}
.title{
  font-size: 14px;
  line-height: 35px;
  border-bottom: 1px solid #D4DBEA;
}
.w150{
  width: 140px;
  padding: 0 8px;
  text-align: justify;
  display: inline-block;
  white-space: normal;
  vertical-align: middle;
  line-height: normal;
}
.cont-minheight{
  min-height: 740px;
}
</style>
