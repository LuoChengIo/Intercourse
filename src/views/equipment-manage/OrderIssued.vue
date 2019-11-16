<template>
  <div>
    <div class="w-card search-card">
      <el-form :inline="true" :model="searchFrom" label-width="72px" class="form-inline my-inline-form">
        <el-form-item label="设备ID">
          <el-input v-model="searchFrom.equipmentId" placeholder="请输入设备ID" />
        </el-form-item>
        <el-form-item label="设备名称">
          <el-input v-model="searchFrom.equipmentName" disabled placeholder="" />
        </el-form-item>
        <el-form-item label="所属公司">
          <el-input v-model="searchFrom.companyName" disabled placeholder="" />
        </el-form-item>
        <el-form-item>
          <el-button type="success" :loading="searchLoading" @click="searchSubmit">搜索</el-button>
          <el-button type="primary" @click="readDevice">读取</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div v-heightAuto class="mt20 p20 w-card">
      <h5 class="title mb20">电流参数</h5>
      <el-form :inline="true" class="form-inline my-inline-form">
        <el-form-item v-for="(item,index) in currentParameter" :key="index">
          <el-checkbox v-model="item.checked" />
          <span class="w150">{{ item.text }}</span>
          <el-input v-model="item.value" :disabled="!item.checked" placeholder="请输入内容" />
        </el-form-item>
      </el-form>
      <h5 class="title mb20">单体电压参数</h5>
      <el-form :inline="true" class="form-inline my-inline-form">
        <el-form-item v-for="(item,index) in monomerVoltageParameter" :key="index">
          <el-checkbox v-model="item.checked" />
          <span class="w150">{{ item.text }}</span>
          <el-input v-model="item.value" :disabled="!item.checked" placeholder="请输入内容" />
        </el-form-item>
      </el-form>
      <h5 class="title mb20">总电压参数</h5>
      <el-form :inline="true" class="form-inline my-inline-form">
        <el-form-item v-for="(item,index) in totalVoltageParameter" :key="index">
          <el-checkbox v-model="item.checked" />
          <span class="w150">{{ item.text }}</span>
          <el-input v-model="item.value" :disabled="!item.checked" placeholder="请输入内容" />
        </el-form-item>
      </el-form>
      <h5 class="title mb20">充电参数</h5>
      <el-form :inline="true" class="form-inline my-inline-form">
        <el-form-item v-for="(item,index) in chargingParameter" :key="index">
          <el-checkbox v-model="item.checked" />
          <span class="w150">{{ item.text }}</span>
          <el-input v-model="item.value" :disabled="!item.checked" placeholder="请输入内容" />
        </el-form-item>
      </el-form>
      <h5 class="title mb20">放电参数</h5>
      <el-form :inline="true" class="form-inline my-inline-form">
        <el-form-item v-for="(item,index) in dischargeParameter" :key="index">
          <el-checkbox v-model="item.checked" />
          <span class="w150">{{ item.text }}</span>
          <el-input v-model="item.value" :disabled="!item.checked" placeholder="请输入内容" />
        </el-form-item>
      </el-form>
      <h5 class="title mb20">其他参数</h5>
      <el-form :inline="true" class="form-inline my-inline-form">
        <el-form-item v-for="(item,index) in elseParameter" :key="index">
          <el-checkbox v-model="item.checked" />
          <span class="w150">{{ item.text }}</span>
          <el-input v-if="!item.type" v-model="item.value" :disabled="!item.checked" placeholder="请输入内容" />
          <el-select v-else v-model="item.value" :disabled="!item.checked" placeholder="请选择">
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
        <el-button type="primary" :loading="searchLoading" @click="searchSubmit">重置</el-button>
        <el-tooltip content="只对勾选中的值进行命令下发！" placement="top">
          <el-button type="success" @click="submitFrom">下发</el-button>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
// import { equipmentid } from '@/api/real-time-list.js'
import { getEquipment, readDevice, downCode } from '@/api/equipment-manage.js'
export default {
  components: {},
  props: {},
  data() {
    return {
      searchFrom: {
        equipmentId: this.$route.query.id || '',
        equipmentName: '',
        companyName: '',
        companyId: ''
      },
      activeItem: {},
      searchLoading: false,
      valueFrom: {},
      currentParameter: [ // 电流参数
        { checked: false, name: 'E0001', text: '单体充电截止电压值(mV)', value: '' },
        { checked: false, name: 'E0002', text: '单体电池充电恢复电压值(mV)', value: '' },
        { checked: false, name: 'E0003', text: '额定容量(0.1Ah)', value: '' },
        { checked: false, name: 'E0004', text: '压差过大三级报警值(mV)', value: '' },
        { checked: false, name: 'E0005', text: '压差过大二级报警值(mV)', value: '' },
        { checked: false, name: 'E0006', text: '压差过大一级报警值(mV)', value: '' },
        { checked: false, name: 'E0007', text: '温差过大三级报警值(0.1℃)', value: '' },
        { checked: false, name: 'E0008', text: '温差过大二级报警值(0.1℃)', value: '' },
        { checked: false, name: 'E0009', text: '温差过大一级报警值(0.1℃)', value: '' },
        { checked: false, name: 'E0010', text: '充电过流三级报警值(0.1A)', value: '' },
        { checked: false, name: 'E0011', text: '充电过流二级报警值(0.1A)', value: '' },
        { checked: false, name: 'E0012', text: '充电过流一级报警值(0.1A)', value: '' },
        { checked: false, name: 'E0013', text: '充电过流三级报警恢复值(0.1A)', value: '' },
        { checked: false, name: 'E0014', text: '充电过流二级报警恢复值(0.1A)', value: '' },
        { checked: false, name: 'E0015', text: '充电过流一级报警恢复值(0.1A)', value: '' },
        { checked: false, name: 'E0016', text: '放电过流三级报警值(0.1A)', value: '' },
        { checked: false, name: 'E0017', text: '放电过流二级报警值(0.1A)', value: '' },
        { checked: false, name: 'E0018', text: '放电过流一级报警值(0.1A)', value: '' },
        { checked: false, name: 'E0019', text: '放电过流三级报警恢复值(0.1A)', value: '' },
        { checked: false, name: 'E0020', text: '放电过流二级报警恢复值(0.1A)', value: '' },
        { checked: false, name: 'E0021', text: '放电过流一级报警恢复值(0.1A)', value: '' }
      ],
      monomerVoltageParameter: [ // 单体电压参数
        { checked: false, name: 'V0001', text: '单体过压三级报警值(mV)', value: '' },
        { checked: false, name: 'V0002', text: '单体过压二级报警值(mV)', value: '' },
        { checked: false, name: 'V0003', text: '单体过压一级报警值(mV)', value: '' },
        { checked: false, name: 'V0004', text: '单体过压三级报警恢复值(mV)', value: '' },
        { checked: false, name: 'V0005', text: '单体过压二级报警恢复值(mV)', value: '' },
        { checked: false, name: 'V0006', text: '单体过压一级报警恢复值(mV)', value: '' },
        { checked: false, name: 'V0007', text: '单体欠压三级报警值(mV)', value: '' },
        { checked: false, name: 'V0008', text: '单体欠压二级报警值(mV)', value: '' },
        { checked: false, name: 'V0009', text: '单体欠压一级报警值(mV)', value: '' },
        { checked: false, name: 'V0010', text: '单体欠压三级报警恢复值(mV)', value: '' },
        { checked: false, name: 'V0011', text: '单体欠压二级报警恢复值(mV)', value: '' },
        { checked: false, name: 'V0012', text: '单体欠压一级报警恢复值(mV)', value: '' }
      ],
      totalVoltageParameter: [ // 总电压参数
        { checked: false, name: 'A0001', text: '总电压过压三级报警值(mV)', value: '' },
        { checked: false, name: 'A0002', text: '总电压过压二级报警值(mV)', value: '' },
        { checked: false, name: 'A0003', text: '总电压过压一级报警值(mV)', value: '' },
        { checked: false, name: 'A0004', text: '总电压过压三级报警恢复值(mV)', value: '' },
        { checked: false, name: 'A0005', text: '总电压过压二级报警恢复值(mV)', value: '' },
        { checked: false, name: 'A0006', text: '总电压过压一级报警恢复值(mV)', value: '' },
        { checked: false, name: 'A0007', text: '总电压欠压三级报警值(mV)', value: '' },
        { checked: false, name: 'A0008', text: '总电压欠压二级报警值(mV)', value: '' },
        { checked: false, name: 'A0009', text: '总电压欠压一级报警值(mV)', value: '' },
        { checked: false, name: 'A0010', text: '总电压欠压三级报警恢复值(mV)', value: '' },
        { checked: false, name: 'A0011', text: '总电压欠压二级报警恢复值(mV)', value: '' },
        { checked: false, name: 'A0012', text: '总电压欠压一级报警恢复值(mV)', value: '' }

      ],
      chargingParameter: [ // 充电参数
        { checked: false, name: 'C0001', text: '充电温度过高三级报警值(0.1℃)', value: '' },
        { checked: false, name: 'C0002', text: '充电温度过高二级报警值(0.1℃)', value: '' },
        { checked: false, name: 'C0003', text: '充电温度过高一级报警值(0.1℃)', value: '' },
        { checked: false, name: 'C0004', text: '充电温度高三级报警恢复值(0.1℃)', value: '' },
        { checked: false, name: 'C0005', text: '充电温度高二级报警恢复值(0.1℃)', value: '' },
        { checked: false, name: 'C0006', text: '充电温度高一级报警恢复值(0.1℃)', value: '' },
        { checked: false, name: 'C0007', text: '充电温度过低三级报警值(0.1℃)', value: '' },
        { checked: false, name: 'C0008', text: '充电温度过低二级报警值(0.1℃)', value: '' },
        { checked: false, name: 'C0008', text: '充电温度过低一级报警值(0.1℃)', value: '' },
        { checked: false, name: 'C0010', text: '充电温度过低三级报警值恢复值(0.1℃)', value: '' },
        { checked: false, name: 'C0011', text: '充电温度过低二级报警值恢复值(0.1℃)', value: '' },
        { checked: false, name: 'C0012', text: '充电温度过低一级报警值恢复值(0.1℃)', value: '' }
      ],
      dischargeParameter: [ // 放电参数
        { checked: false, name: 'D0001', text: '放电温度过高三级报警值(0.1℃)', value: '' },
        { checked: false, name: 'D0002', text: '放电温度过高二级报警值(0.1℃)', value: '' },
        { checked: false, name: 'D0003', text: '放电温度过高一级报警值(0.1℃)', value: '' },
        { checked: false, name: 'D0004', text: '放电温度高三级报警恢复值(0.1℃)', value: '' },
        { checked: false, name: 'D0005', text: '放电温度高二级报警恢复值(0.1℃)', value: '' },
        { checked: false, name: 'D0006', text: '放电温度高一级报警恢复值(0.1℃)', value: '' },
        { checked: false, name: 'D0007', text: '放电温度过低三级报警值(0.1℃)', value: '' },
        { checked: false, name: 'D0008', text: '放电温度过低二级报警值(0.1℃)', value: '' },
        { checked: false, name: 'D0009', text: '放电温度过低一级报警值(0.1℃)', value: '' },
        { checked: false, name: 'D0010', text: '放电温度过低三级报警值恢复值(0.1℃)', value: '' },
        { checked: false, name: 'D0011', text: '放电温度过低二级报警值恢复值(0.1℃)', value: '' },
        { checked: false, name: 'D0012', text: '放电温度过低一级报警值恢复值(0.1℃)', value: '' }
      ],
      elseParameter: [ // 其他参数
        { checked: false, name: 'Q0001', text: '充电加热使能', value: '', type: 'select', options: [{ name: '使能', value: 1 }, { name: '禁止', value: 0 }] },
        { checked: false, name: 'Q0002', text: '充电加热开始温度(0.1℃)', value: '' },
        { checked: false, name: 'Q0003', text: '充电加热截止温度(0.1℃)', value: '' },
        { checked: false, name: 'Q0004', text: 'SOC过低三级报警值（‰）', value: '' },
        { checked: false, name: 'Q0005', text: 'SOC过低二级报警值（‰）', value: '' },
        { checked: false, name: 'Q0006', text: 'SOC过低一级报警值(0.001)', value: '' },
        { checked: false, name: 'Q0007', text: '正常充电电流设置值(0.1A)', value: '' },
        { checked: false, name: 'Q0008', text: '充电加热电流设置值(0.1A)', value: '' },
        { checked: false, name: 'Q0009', text: '总放电电量（0.1KWh）', value: '' },
        { checked: false, name: 'Q0010', text: '总充电电量（0.1KWh）', value: '' },
        { checked: false, name: 'Q0011', text: '被动均衡使能', value: '', type: 'select', options: [{ name: '使能', value: 1 }, { name: '禁止', value: 0 }] },
        { checked: false, name: 'Q0012', text: '被动均衡开启电压差值（mV）', value: '' },
        { checked: false, name: 'Q0013', text: '被动均衡开启压差值（mV）', value: '' },
        { checked: false, name: 'Q0014', text: '远程升级使能', value: '', type: 'select', options: [{ name: '使能', value: 1 }, { name: '禁止', value: 0 }] }
      ],
      defaultCurrentParameter: [],
      defaultMonomerVoltageParameter: [],
      defaultTotalVoltageParameter: [],
      defaultChargingParameter: [],
      defaultDischargeParameter: [],
      defaultElseParameter: []
    }
  },
  computed: {
    getParams() {
      const obj = { equipmentId: this.searchFrom.equipmentId }
      const setData = (element) => {
        if (element.checked) {
          obj[element.name] = element.value
        }
      }
      this.currentParameter.forEach(setData)
      this.monomerVoltageParameter.forEach(setData)
      this.totalVoltageParameter.forEach(setData)
      this.chargingParameter.forEach(setData)
      this.dischargeParameter.forEach(setData)
      this.elseParameter.forEach(setData)
      return obj
    }
  },
  watch: {},
  mounted() {},
  created() {
    if (this.$route.query.id) {
      this.searchSubmit()
    }
    this.$root.enterDown = this.searchSubmit
  },
  methods: {
    searchSubmit() {
      // 搜索设备
      this.searchLoading = true
      this.searchFrom.companyName = ''
      this.searchFrom.equipmentName = ''
      getEquipment({
        equipmentId: this.searchFrom.equipmentId
      }).then((res) => {
        if (!res.paramsData) {
          this.$message.warning('搜索不到该设备id~')
          return
        }
        this.searchFrom.equipmentName = res.equipmentName
        this.searchFrom.companyName = res.companyName
        const setData = (element) => {
          let value = res.paramsData[element.name.toLowerCase()]
          value = Number(value)
          if (value || value === 0) {
            element.checked = false
            element.value = value
          }
        }
        this.currentParameter.forEach(setData)
        this.monomerVoltageParameter.forEach(setData)
        this.totalVoltageParameter.forEach(setData)
        this.chargingParameter.forEach(setData)
        this.dischargeParameter.forEach(setData)
        this.elseParameter.forEach(setData)
        this.defaultCurrentParameter = [...this.currentParameter]
        this.defaultMonomerVoltageParameter = [...this.monomerVoltageParameter]
        this.defaultTotalVoltageParameter = [...this.totalVoltageParameter]
        this.defaultDischargeParameter = [...this.chargingParameter]
        this.defaultChargingParameter = [...this.dischargeParameter]
        this.defaultElseParameter = [...this.elseParameter]
        this.activeItem = Object.assign({}, this.searchFrom)
      }).catch(() => {
      }).finally(() => {
        this.searchLoading = false
      })
    },
    readDevice() {
      // 读取设备信息
      if (!this.searchFrom.companyName) {
        this.$message.warning('请先进行设备搜索~')
        return
      }
      readDevice({
        equipmentId: this.searchFrom.equipmentId
      }).then((res) => {
        this.$message.success('操作成功')
      }).catch(() => {
      }).finally(() => {
      })
    },
    resetFrom() {
      // 重置表单
      this.currentParameter = [...this.defaultCurrentParameter]
      this.monomerVoltageParameter = [...this.defaultMonomerVoltageParameter]
      this.totalVoltageParameter = [...this.defaultTotalVoltageParameter]
      this.dischargeParameter = [...this.defaultDischargeParameter]
      this.chargingParameter = [...this.defaultChargingParameter]
      this.elseParameter = [...this.defaultElseParameter]
    },
    submitFrom() {
      if (this.activeItem.companyId !== this.searchFrom.companyId) {
        this.$message.warning('请确保输入正确的设备id~')
        return
      }
      const filterFun = (element) => {
        if (element.checked) {
          if (!element.value.toString()) { // 值为空
            return true
          }
          if (isNaN(element.value)) { // 不是数字
            return true
          }
        }
        return false
      }
      const currentParameter = this.currentParameter.filter(filterFun)
      const monomerVoltageParameter = this.monomerVoltageParameter.filter(filterFun)
      const totalVoltageParameter = this.totalVoltageParameter.filter(filterFun)
      const chargingParameter = this.chargingParameter.filter(filterFun)
      const dischargeParameter = this.dischargeParameter.filter(filterFun)
      const elseParameter = this.elseParameter.filter(filterFun)
      const valueFun = (element) => {
        setTimeout(() => {
          this.$message.warning('请输入正确的' + element.text)
        }, 200)
      }
      if (currentParameter.length) {
        currentParameter.forEach(valueFun)
        return
      }
      if (monomerVoltageParameter.length) {
        monomerVoltageParameter.forEach(valueFun)
        return
      }
      if (totalVoltageParameter.length) {
        totalVoltageParameter.forEach(valueFun)
        return
      }
      if (chargingParameter.length) {
        chargingParameter.forEach(valueFun)
        return
      }
      if (dischargeParameter.length) {
        dischargeParameter.forEach(valueFun)
        return
      }
      if (elseParameter.length) {
        elseParameter.forEach(valueFun)
        return
      }
      this.$confirm('你确定要对选中的值进行命令下发吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        downCode(this.getParams).then((res) => {

        }).catch(() => {
        }).finally(() => {

        })
      }).catch(() => {

      })
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
