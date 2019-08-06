<template>
  <div>
    <div class="w-card search-card">
      <el-form :inline="true" :model="searchFrom" label-width="72px" class="form-inline">
        <el-form-item label="是否掉线">
          <el-select v-model="searchFrom.data1">
            <el-option label="全部" value="" />
            <el-option label="正常" value="1" />
            <el-option label="掉线" value="0" />
          </el-select>
        </el-form-item>
        <el-form-item label="时间范围">
          <el-date-picker
            v-model="searchFrom.data2"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item label="设备ID">
          <el-input v-model="searchFrom.data3" placeholder="请输入设备ID" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="resetFrom">重置</el-button>
          <el-button type="success" @click="searchSubmit">搜索</el-button>
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
          label="设备名称"
        />
        <el-table-column
          align="center"
          prop="data1"
          label="soc(%)"
        />
        <el-table-column
          align="center"
          prop="data1"
          sortable
          label="设备状态"
        />
        <el-table-column
          align="center"
          prop="data1"
          sortable
          label="故障等级"
        />
        <el-table-column
          align="center"
          prop="data1"
          label="状态功能码"
        />
        <el-table-column
          align="center"
          prop="data1"
          width="140px"
          label="电压（最高|最低）"
        />
        <el-table-column
          align="center"
          prop="data1"
          width="140px"
          label="温度（最高|最低）"
        />
        <el-table-column
          align="center"
          prop="data1"
          width="140px"
          label="总电流（单位A）"
        />
        <el-table-column
          align="center"
          prop="data1"
          width="140px"
          label="总电压（单位V）"
        />
        <el-table-column
          align="center"
          prop="data1"
          width="140px"
          label="压差（单位V）"
        />
        <el-table-column
          align="center"
          prop="data1"
          label="温差（°C）"
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
          :page-size="searchFrom.pageSize"
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
        pageSize: 0, // 每页显示数
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
    this.defaultSearchFrom = Object.assign({}, this.searchFrom)
    this.searchFrom.pageSize = this.page.pageSize
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
      this.searchFrom.pageSize = val
      this.searchSubmit()
    },
    handleCurrentChange(val) { // 切换页码
      this.searchFrom.pageNum = val
      this.searchSubmit()
    },
    resetFrom() { // 重置搜索条件
      this.searchFrom = Object.assign({}, this.defaultSearchFrom)
      this.searchSubmit()
    }
  }
}
</script>
<style lang="scss" scoped>
  .cont-minheight{
    min-height: 740px;
  }
</style>