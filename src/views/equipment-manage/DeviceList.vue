<template>
  <div>
    <div class="w-card search-card">
      <el-form :inline="true" :model="searchFrom" label-width="72px" class="form-inline">
        <el-form-item label="设备ID">
          <el-input v-model="searchFrom.data3" placeholder="请输入设备ID" />
        </el-form-item>
        <el-form-item label="设备名称">
          <el-input v-model="searchFrom.data3" placeholder="请输入设备名称" />
        </el-form-item>
        <el-form-item label="所属公司">
          <el-autocomplete
            v-model="searchFrom.data3"
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
          <el-select v-model="searchFrom.data7">
            <el-option v-for="(item,index) in equipmentStatus" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="出入库状态">
          <el-select v-model="searchFrom.data7">
            <el-option label="全部" value="" />
            <el-option label="未入库" value="1" />
            <el-option label="已入库" value="2" />
            <el-option label="已出库" value="3" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="resetFrom">重置</el-button>
          <el-button type="success" @click="searchSubmit">搜索</el-button>
          <el-button type="success" icon="el-icon-plus" @click="addSubmit">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="mt20 pb20 w-card cont-minheight">
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
          label="所属公司"
        />
        <el-table-column
          align="center"
          prop="data1"
          label="软件版本"
        />
        <el-table-column
          align="center"
          prop="data1"
          label="硬件版本"
        />
        <el-table-column
          align="center"
          prop="data1"
          label="创建时间"
        />
        <el-table-column
          align="center"
          prop="data1"
          label="设备状态"
        />
        <el-table-column
          align="center"
          prop="data1"
          label="出入库状态"
        />
        <el-table-column
          align="center"
          label="操作"
          width="450"
        >
          <template slot-scope="scope">
            <el-button type="info" size="mini">查看</el-button>
            <el-button type="primary" size="mini">编辑</el-button>
            <el-button type="success" size="mini">出库</el-button>
            <el-button type="success" size="mini">入库</el-button>
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
      tableData: [{
        data1: 1
      }]
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
    addSubmit() {
      // 添加设备

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
