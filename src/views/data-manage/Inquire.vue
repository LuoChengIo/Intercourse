<template>
  <div>
    <div class="w-card search-card">
      <el-form :inline="true" :model="searchFrom" label-width="72px" class="form-inline">
        <el-form-item label="开始时间">
          <el-date-picker
            v-model="searchFrom.data1"
            type="date"
            placeholder="选择日期"
          />
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker
            v-model="searchFrom.data2"
            type="date"
            placeholder="选择日期"
          />
        </el-form-item>
        <el-form-item label="设备ID">
          <el-input v-model="searchFrom.data3" placeholder="请输入设备ID" />
        </el-form-item>
        <el-form-item label="设备名称">
          <el-input v-model="searchFrom.data4" placeholder="请输入设备名称" />
        </el-form-item>
        <el-form-item label="所属公司">
          <el-input v-model="searchFrom.data5" placeholder="请输入所属公司" />
        </el-form-item>
        <el-form-item label="所属用户">
          <el-input v-model="searchFrom.data5" placeholder="请输入所属用户" />
        </el-form-item>
        <el-form-item label="硬件版本">
          <el-input v-model="searchFrom.data5" placeholder="硬件版本" />
        </el-form-item>
        <el-form-item label="软件版本">
          <el-input v-model="searchFrom.data5" placeholder="软件版本" />
        </el-form-item>
        <el-form-item label="功能状态码">
          <el-input v-model="searchFrom.data5" placeholder="功能状态码" />
        </el-form-item>
        <el-form-item label="故障等级">
          <el-select v-model="searchFrom.data6">
            <el-option v-for="(item,index) in faultLevel" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="设备状态">
          <el-select v-model="searchFrom.data7">
            <el-option v-for="(item,index) in equipmentStatus" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="最高电压值">
          <el-input v-model="searchFrom.data8" placeholder="最高电压值" />
        </el-form-item>
        <el-form-item label="最低电压值">
          <el-input v-model="searchFrom.data9" placeholder="最低电压值" />
        </el-form-item>
        <el-form-item label="压差值">
          <el-input v-model="searchFrom.data10" placeholder="压差值" />
        </el-form-item>
        <el-form-item label="最高温度值">
          <el-input v-model="searchFrom.data11" placeholder="最高温度值" />
        </el-form-item>
        <el-form-item label="最低温度值">
          <el-input v-model="searchFrom.data12" placeholder="最低温度值" />
        </el-form-item>
        <el-form-item label="温差值">
          <el-input v-model="searchFrom.data13" placeholder="温差值" />
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
          prop="data1"
          label="设备ID"
        />
        <el-table-column
          align="center"
          prop="data1"
          label="状态功能码"
        />
        <el-table-column
          align="center"
          prop="data1"
          label="设备状态"
        />
        <el-table-column
          align="center"
          prop="data1"
          label="故障等级"
        />
        <el-table-column
          align="center"
          prop="data1"
          label="最高电压(V)"
        />
        <el-table-column
          align="center"
          prop="data1"
          label="最低电压(V)"
        />
        <el-table-column
          align="center"
          prop="data1"
          label="最高温度(℃)"
        />
        <el-table-column
          align="center"
          prop="data1"
          label="最低温度(℃)"
        />
        <el-table-column
          align="center"
          prop="data1"
          label="压差(V)"
        />
        <el-table-column
          align="center"
          prop="data1"
          label="温差(℃)"
        />
        <el-table-column
          align="center"
          prop="data1"
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
          :current-page="searchFrom.pageNum"
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
import { inquireList } from '@/api/data-manage.js'
export default {
  components: {},
  props: {},
  data() {
    return {
      defaultSearchFrom: {},
      searchFrom: {
        data6: '',
        data7: '',
        pageNum: 1, // 当前页
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
  },
  methods: {
    searchSubmit() { // 搜索查询
      if (this.listLoading) {
        return
      }
      this.listLoading = true
      inquireList(this.searchFrom)
        .then(res => {
          this.tableData = res.data
        })
        .catch(err => {
          this.$message.error(err.message)
        })
        .finally(() => {
          this.listLoading = false
        })
    },
    handleSizeChange(val) { // 切换每页显示数
      this.searchFrom.pageNum = 1
      this.searchFrom.pageRows = val
      this.searchSubmit()
    },
    handleCurrentChange(val) { // 切换页码
      this.searchFrom.pageNum = val
      this.searchSubmit()
    },
    resetFrom() { // 重置搜索条件
      this.searchFrom = Object.assign({}, this.defaultSearchFrom)
      this.searchSubmit()
    },
    exportFrom() { // 导出表格数据
      location.href = '#'
    }
  }
}
</script>
<style lang="scss" scoped>
  .cont-minheight{
    min-height: 570px;
  }
</style>
