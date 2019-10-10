<template>
  <div>
    <div class="w-card search-card">
      <el-form :inline="true" :model="searchFrom" label-width="72px" class="form-inline">
        <el-form-item label="开始时间">
          <el-date-picker
            v-model="searchFrom.startDate"
            type="date"
            placeholder="选择日期"
          />
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker
            v-model="searchFrom.endDate"
            type="date"
            placeholder="选择日期"
          />
        </el-form-item>
        <el-form-item label="设备ID">
          <el-input v-model="searchFrom.equipmentId" placeholder="请输入设备ID" />
        </el-form-item>
        <el-form-item label="设备名称">
          <el-input v-model="searchFrom.equipmentName" placeholder="请输入设备名称" />
        </el-form-item>
        <el-form-item label="所属公司">
          <el-input v-model="searchFrom.companId" placeholder="请输入所属公司" />
        </el-form-item>
        <el-form-item label="所属用户">
          <el-input v-model="searchFrom.userId" placeholder="请输入所属用户" />
        </el-form-item>
        <el-form-item label="硬件版本">
          <el-input v-model="searchFrom.equipmentSoftVersion" placeholder="硬件版本" />
        </el-form-item>
        <el-form-item label="软件版本">
          <el-input v-model="searchFrom.equipmentHardwareVersion" placeholder="软件版本" />
        </el-form-item>
        <el-form-item label="功能状态码">
          <el-input v-model="searchFrom.statusCode" placeholder="功能状态码" />
        </el-form-item>
        <el-form-item label="故障等级">
          <el-select v-model="searchFrom.failure">
            <el-option v-for="(item,index) in faultLevel" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="设备状态">
          <el-select v-model="searchFrom.status">
            <el-option v-for="(item,index) in equipmentStatus" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="最高电压值">
          <el-input v-model="searchFrom.oneBatteryVoltageHigh" placeholder="最高电压值" />
        </el-form-item>
        <el-form-item label="最低电压值">
          <el-input v-model="searchFrom.oneBatteryVoltageLow" placeholder="最低电压值" />
        </el-form-item>
        <el-form-item label="压差值">
          <el-input v-model="searchFrom.voltageDifference" placeholder="压差值" />
        </el-form-item>
        <el-form-item label="最高温度值">
          <el-input v-model="searchFrom.highTemperature" placeholder="最高温度值" />
        </el-form-item>
        <el-form-item label="最低温度值">
          <el-input v-model="searchFrom.lowTemperature" placeholder="最低温度值" />
        </el-form-item>
        <el-form-item label="温差值">
          <el-input v-model="searchFrom.temperatureDifference" placeholder="温差值" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="resetFrom">重置</el-button>
          <el-button type="success" @click="searchSubmit">搜索</el-button>
          <el-button type="success" @click="exportFrom">导出</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div v-heightAuto class="mt20 pb20 w-card">
      <el-table
        v-loading="listLoading"
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column
          label="序号"
          align="center"
          type="index"
          width="90"
        />
        <el-table-column
          align="center"
          prop="equipmentId"
          label="设备ID"
        />
        <el-table-column
          align="center"
          prop="statusCodeFormat"
          label="状态功能码"
        />
        <el-table-column
          align="center"
          prop="statusName"
          label="设备状态"
        />
        <el-table-column
          align="center"
          prop="failureName"
          label="故障等级"
        />
        <el-table-column
          align="center"
          prop="oneBatteryVoltageHigh"
          label="最高电压(V)"
        />
        <el-table-column
          align="center"
          prop="oneBatteryVoltageLow"
          label="最低电压(V)"
        />
        <el-table-column
          align="center"
          prop="highTemperature"
          label="最高温度(℃)"
        />
        <el-table-column
          align="center"
          prop="lowTemperature"
          label="最低温度(℃)"
        />
        <el-table-column
          align="center"
          prop="voltageDifference"
          label="压差(V)"
        />
        <el-table-column
          align="center"
          prop="temperatureDifference"
          label="温差(℃)"
        />
        <el-table-column
          align="center"
          prop="collectionTime"
          label="信息采集时间"
        />
      </el-table>
      <div class="pt20 pr30 pl30 tr">
        <span class="l f13 text-primary">当前显示 {{ searchFrom.currentSize }} 条，共 {{ searchFrom.total }} 条记录</span>
        <el-pagination
          background
          class="dib"
          prev-text="上一页"
          next-text="下一页"
          :current-page="searchFrom.pageNo"
          :page-sizes="page.pageSizes"
          :page-size="searchFrom.pageRows"
          :total="searchFrom.total"
          layout="sizes, prev, pager, next"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { inquireList, exportData } from '@/api/data-manage.js'
export default {
  components: {},
  props: {},
  data() {
    return {
      defaultSearchFrom: {},
      searchFrom: {
        startDate: new Date(),
        endDate: new Date(),
        equipmentId: '',
        equipmentName: '',
        equipmentSoftVersion: '',
        equipmentHardwareVersion: '',
        companId: '',
        userId: '',
        oneBatteryVoltageHigh: '',
        oneBatteryVoltageLow: '',
        highTemperature: '',
        lowTemperature: '',
        voltageDifference: '',
        temperatureDifference: '',
        status: '',
        statusCode: '',
        failure: '',
        pageNo: 1, // 当前页
        pageRows: 10, // 每页显示数
        currentSize: 0, // 当前条数
        total: 0 // 总页数
      },
      listLoading: false,
      tableData: []
    }
  },
  computed: {},
  watch: {},
  mounted() {},
  created() {
    this.searchFrom.pageRows = this.page.pageSize
    this.defaultSearchFrom = Object.assign({}, this.searchFrom)
    this.searchSubmit()
  },
  methods: {
    searchSubmit() { // 搜索查询
      if (this.listLoading) {
        return
      }
      this.listLoading = true
      inquireList(this.searchFrom)
        .then(res => {
          this.tableData = res.data.list
          this.searchFrom.currentSize = res.data.totalPages
          this.searchFrom.total = res.data.total
        })
        .catch(err => {
          this.$message.error(err.message)
        })
        .finally(() => {
          this.listLoading = false
        })
    },
    handleSizeChange(val) { // 切换每页显示数
      this.searchFrom.pageNo = 1
      this.searchFrom.pageRows = val
      this.searchSubmit()
    },
    handleCurrentChange(val) { // 切换页码
      this.searchFrom.pageNo = val
      this.searchSubmit()
    },
    resetFrom() { // 重置搜索条件
      this.searchFrom = Object.assign({}, this.defaultSearchFrom)
      this.searchSubmit()
    },
    exportFrom() { // 导出表格数据
      debugger
      // location.href = exportData(this.searchFrom)
      // + this.searchFrom
      location.href = process.env.VUE_APP_BASE_API + '/data/month/export' + '?startDate=' + this.searchFrom.startDate + '&endDate=' + this.searchFrom.endDate +
       +'&equipmentId=' + this.searchFrom.equipmentId + '&equipmentName=' + this.searchFrom.equipmentName + '&companId=' + this.searchFrom.companId + '&oneBatteryVoltageHigh=' + this.searchFrom.oneBatteryVoltageHigh + '&oneBatteryVoltageLow=' + this.searchFrom.oneBatteryVoltageLow + '&highTemperature=' + this.searchFrom.highTemperature + '&lowTemperature=' +
       this.searchFrom.lowTemperature + '&voltageDifference=' + this.searchFrom.voltageDifference + '&endDvoltageDifferenceate=' + this.searchFrom.voltageDifference + '&status=' + this.searchFrom.status + '&statusCode=' + this.searchFrom.statusCode + '&failure=' + this.searchFrom.failure + '&pageNo=' + this.searchFrom.pageNo + '&pageRows=' + this.searchFrom.pageRows
    }
  }
}
</script>
<style lang="scss" scoped>
  .cont-minheight{
    min-height: 570px;
  }
</style>
