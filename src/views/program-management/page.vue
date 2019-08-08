<template>
  <div>
    <div class="text-red">
      上传成功，为Bata版，只推送标记为测试设备；如需推广全部设备，需要手工操作，设置为正式版。
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
          label="程序名称"
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
          sortable
          label="程序状态"
        />
        <el-table-column
          align="center"
          prop="data1"
          sortable
          label="操作时间"
        />
        <el-table-column
          align="center"
          prop="data1"
          label="操作"
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
import { programList } from '@/api/program-management.js'
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
    this.searchFrom.pageSize = this.page.pageSize
    this.defaultSearchFrom = Object.assign({}, this.searchFrom)
  },
  methods: {
    searchSubmit() { // 搜索查询
      if (this.listLoading) {
        return
      }
      this.listLoading = true
      programList(this.searchFrom)
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
    }
  }
}
</script>
<style lang="scss" scoped>
  .cont-minheight{
    min-height: 740px;
  }
</style>
