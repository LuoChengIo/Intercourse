<template>
  <div>
    <div class="w-card search-card">
      <el-form :inline="true" :model="searchFrom" label-width="72px" class="form-inline">
        <el-form-item label="设备ID">
          <el-input v-model="searchFrom.equipmentId" placeholder="请输入设备ID" />
        </el-form-item>
        <el-form-item label="设备名称">
          <el-input v-model="searchFrom.equipmentName" placeholder="请输入设备名称" />
        </el-form-item>
        <el-form-item label="所属公司">
          <el-autocomplete
            v-model="searchFrom.companyId"
            popper-class="my-autocomplete"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
          >
            <i
              slot="suffix"
              class="el-icon-search el-input__icon"
            />
            <template slot-scope="{ item }">
              <div class="name">{{ item.value }}</div>
              <span class="addr">{{ item.address }}</span>
            </template>
          </el-autocomplete>
        </el-form-item>
        <el-form-item label="设备状态">
          <el-select v-model="searchFrom.state">
            <el-option v-for="(item,index) in equipmentStatus" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="出入库状态">
          <el-select v-model="searchFrom.status">
            <el-option label="全部" value="" />
            <el-option label="未入库" value="1" />
            <el-option label="已入库" value="2" />
            <el-option label="已出库" value="3" />
          </el-select>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="resetFrom">重置</el-button>
          <el-button type="success" @click="searchSubmit">搜索</el-button>
          <el-button type="success" icon="el-icon-plus" @click="addSubmit">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 新增弹框 -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="645px"
    >
      <el-form :inline="true" label-width="102px" class="demo-form-inline">
        <el-form-item label="设备编号">
          <el-input placeholder="" />
        </el-form-item>
        <el-form-item label="设备名称">
          <el-input maxlength="30" placeholder="" />
        </el-form-item>

        <el-form-item label="所属公司">
          <el-input maxlength="12" placeholder="" />
        </el-form-item>
        <el-form-item label="所属用户">
          <el-input maxlength="18" placeholder="" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary">确 定</el-button>
        <el-button @click="dialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
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
          prop="equipmentName"
          label="设备名称"
        />
        <el-table-column
          align="center"
          prop="companyname"
          label="所属公司"
        />
        <el-table-column
          align="center"
          prop="equipmentSoftVersion"
          label="软件版本"
        />
        <el-table-column
          align="center"
          prop="equipmentHardwareVersion"
          label="硬件版本"
        />
        <el-table-column
          align="center"
          prop="updatetime"
          label="创建时间"
          :formatter="dateFormat"
        />
        <el-table-column
          align="center"
          prop="statename"
          label="设备状态"
        />
        <!-- <el-table-column
          align="center"
          prop="status"
          label="出入库状态"
        /> -->
        <el-table-column
          align="center"
          label="操作"
          width="450"
        >
          <template>
            <el-button type="info" size="mini">查看</el-button>
            <el-button type="primary" size="mini">编辑</el-button>
            <el-button type="success" size="mini">查看详情</el-button>
            <el-button type="warning" size="mini">命令下发</el-button>
            <el-button type="danger" size="mini">删除</el-button>
          </template>
        </el-table-column>
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
import { equipmentList } from '@/api/equipment-manage.js'
import moment from 'moment'
export default {
  components: {},
  props: {},
  data() {
    return {
      defaultSearchFrom: {},
      searchFrom: {
        equipmentId: '',
        equipmentName: '',
        companyId: '',
        state: '',
        status: '',
        pageNo: 1, // 当前页
        pageRows: 10, // 每页显示数
        currentSize: 0, // 当前条数
        total: 0 // 总页数
      },
      listLoading: false,
      tableData: [{
        data1: 1
      }],
      dialogFormVisible: false,
      dialogVisible: false,
      dialogTitle: '',
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formData: '',
      formLabelWidth: '120px'
    }
  },
  computed: {},
  watch: {},
  mounted() {},
  created() {
    this.searchFrom.pageNo = this.page.pageSize
    this.defaultSearchFrom = Object.assign({}, this.searchFrom)
    this.searchSubmit()
  },
  methods: {
    dateFormat(row, column) {
      var date = row[column.property]
      if (!date) { return '' }
      return moment(date, 'YYYYMMDDHHmmss').format('YYYY-MM-DD HH:mm:ss')
    },
    searchSubmit() { // 搜索查询
      if (this.listLoading) {
        return
      }
      this.listLoading = true
      equipmentList(this.searchFrom)
        .then(res => {
          this.tableData = res.data.list
          this.searchFrom.currentSize = res.data.size
          this.searchFrom.total = res.data.total
        })
        .catch(err => {
          this.$message.error(err.message)
        })
        .finally(() => {
          this.listLoading = false
        })
    },
    addSubmit() {
      // 添加设备
      this.dialogFormVisible = true
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
    querySearch(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    }
  }
}
</script>
<style lang="scss" scoped>
  .cont-minheight{
    min-height: 740px;
  }
  .dialog-footer{
    text-align: center;
  }
</style>
