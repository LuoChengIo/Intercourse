<template>
  <div>
    <div class="w-card search-card">
      <el-form :inline="true" :model="searchFrom" label-width="72px" class="form-inline">
        <el-form-item label="公司ID">
          <el-input v-model="searchFrom.data3" placeholder="请输入公司ID" />
        </el-form-item>
        <el-form-item label="公司名称">
          <el-input v-model="searchFrom.data3" placeholder="请输入公司名称" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="resetFrom">重置</el-button>
          <el-button type="success" @click="searchSubmit">搜索</el-button>
          <el-button type="success" icon="el-icon-plus" @click="addSubmit">新增</el-button>
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
          align="center"
          prop="data1"
          label="公司ID"
        />
        <el-table-column
          align="center"
          prop="data1"
          label="公司名称"
        />
        <el-table-column
          align="center"
          prop="data1"
          label="logo"
        />
        <el-table-column
          align="center"
          prop="data1"
          label="设备数量"
        />
        <el-table-column
          align="center"
          prop="data1"
          label="创建时间"
        />
        <el-table-column
          align="center"
          label="操作"
          width="450"
        >
          <template>
            <el-button type="info" size="mini">查看</el-button>
            <el-button type="primary" size="mini">编辑</el-button>
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
    this.searchFrom.pageSize = this.page.pageSize
    this.defaultSearchFrom = Object.assign({}, this.searchFrom)
  },
  methods: {
    querySearch() {

    },
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
