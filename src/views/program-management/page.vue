<!-- 程序管理 -->
<template>
  <div>
    <div class="cont-table">
      <el-table
        ref="multipleTable"
        v-loading="listLoading"
        :data="tableData"
        tooltip-effect="dark"
        border
        style="width: 100%"
        class="custom-table mt15"
      >
        <el-table-column
          label="序号"
          align="center"
        >
          <template slot-scope="scope">{{ scope.row.loanCount }}</template>
        </el-table-column>
        <el-table-column
          label="程序名称"
          align="center"
        >
          <template slot-scope="scope">{{ scope.row.loanAmount }}</template>
        </el-table-column>
        <el-table-column
          label="软件版本"
          align="center"
        >
          <template slot-scope="scope">{{ scope.row.interest }}</template>
        </el-table-column>
        <el-table-column
          align="center"
          label="硬件版本"
        >
          <template slot-scope="scope">{{ scope.row.repaymentedCount }}</template>
        </el-table-column>
        <el-table-column
          prop="repaymentedAmount"
          label="程序状态"
          align="center"
        />
        <el-table-column
          prop="repaymentedInterest"
          align="center"
          label="操作时间"
        />
        <el-table-column
          prop="repaymentAmount"
          align="center"
          label="操作"
        />
      </el-table>
      <div class="pt30 pb30 pl10">
        <!-- <el-pagination
          class="dib"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="searchFrom.pageNum"
          :page-sizes="[5,10, 15, 20, 30]"
          :page-size="searchFrom.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination> -->
      </div>
    </div>
  </div>
</template>

<script>
// import { getToken } from '@/utils/auth'
// import { getDailyInfo, inputInfo, delAllData } from '@/api/statistics'
export default {
  name: '',
  data() {
    return {
      searchFrom: {
        time: [],
        startTime: '',
        endTime: '',
        pageNum: 1,
        pageSize: 5
      },
      total: 0,
      inputLoading: false,
      listLoading: false,
      tableData: []
    }
  },
  created() {
    // this.getPageList()
  },
  methods: {
    onSubmit() { // 查询事件
      this.searchFrom.pageNum = 1
      // this.getPageList()
    },
    handleSizeChange(val) { // 切换每页显示数
      this.searchFrom.pageNum = 1
      this.searchFrom.pageSize = val
      // this.getPageList()
    },
    handleCurrentChange(val) { // 切换页码
      this.searchFrom.pageNum = val
      // this.getPageList()
    },
    getRegTime(val) { // 获取申请时间段
      this.searchFrom.startTime = ''
      this.searchFrom.endTime = ''
      if (val) {
        this.searchFrom.startTime = parseInt(new Date(val[0]).getTime() / 1000)
        this.searchFrom.endTime = parseInt(new Date(val[1]).getTime() / 1000)
      }
    }
    // getPageList() { // 获取当前列表信息
    //   this.listLoading = true
    //   getDailyInfo(this.searchFrom).then(data => {
    //     this.tableData = data.data.list
    //     this.total = data.data.total
    //     this.listLoading = false
    //   }).catch(err => {
    //     this.listLoading = false
    //     console.log(err)
    //   })
    // },
    // deleteFile() { // 清空数据
    //   this.$msgbox({
    //     title: '提醒',
    //     message: '您确定要删除该统计数据吗？',
    //     showCancelButton: true,
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消'
    //   }).then(action => {
    //     delAllData().then(data => {
    //       this.$message({
    //         message: '删除成功',
    //         type: 'success'
    //       })
    //       this.onSubmit()
    //     }).catch(err => {
    //       console.log(err)
    //     })
    //   }).catch(err => {
    //     console.log(err)
    //   })
    // },
    // inputfile(event) { // 导入文件
    //   if (!event.target.files[0]) {
    //     return
    //   }
    //   if (event.target.files[0].name.indexOf('.xls') < 0) {
    //     this.$message({
    //       message: '只支持excel表格',
    //       type: 'warning'
    //     })
    //     return
    //   }
    //   this.inputLoading = true
    //   const formData = new FormData()
    //   formData.append('dailyInfoFile', event.target.files[0])
    //   formData.append('accessToken', getToken())
    //   inputInfo(formData).then(data => {
    //     this.inputLoading = false
    //     this.$message({
    //       message: '导入成功',
    //       type: 'success'
    //     })
    //     this.onSubmit()
    //   }).catch(err => {
    //     this.inputLoading = false
    //     console.log(err)
    //   })
    // }
  }

}

</script>
<style lang='scss' scoped>

</style>
