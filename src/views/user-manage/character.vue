<template>
  <div>
    <div class="w-card search-card">
      <el-form :inline="true" :model="searchFrom" label-width="72px" class="form-inline">
        <el-form-item label="角色ID">
          <el-input v-model="searchFrom.data3" placeholder="请输入角色ID" />
        </el-form-item>
        <el-form-item label="角色名称">
          <el-input v-model="searchFrom.data3" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item label="所属公司">
          <el-autocomplete
            v-model="searchFrom.data3"
            popper-class="my-autocomplete"
            :fetch-suggestions="querySearch"
            placeholder="请输入所属公司"
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
        <el-form-item>
          <el-button type="primary" @click="resetFrom">重置</el-button>
          <el-button type="success" @click="searchSubmit">搜索</el-button>
          <el-button type="success" icon="el-icon-plus" @click="addSubmit">新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="mt20">
      <el-row :gutter="20">
        <el-col :span="18">
          <div v-heightAuto class="w-card pb20">
            <el-table
              v-loading="listLoading"
              :data="tableData"
              border
              style="width: 100%"
            >
              <el-table-column
                align="center"
                prop="data1"
                label="角色ID"
              />
              <el-table-column
                align="center"
                prop="data1"
                label="角色名称"
              />
              <el-table-column
                align="center"
                prop="data1"
                label="所属公司"
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
          </div></el-col>
        <el-col :span="6">
          <div v-heightAuto class="w-card p20">
            <h4 class="n pb10 f14">角色权限列表</h4>
            <el-tree :data="treeData" :props="defaultProps" />
          </div>
        </el-col>
      </el-row>
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
      }],
      treeData: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
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
