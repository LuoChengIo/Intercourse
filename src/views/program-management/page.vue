
<template>
  <div>
    <div class="text-red">上传成功，为Bata版，只推送标记为测试设备；如需推广全部设备，需要手工操作，设置为正式版。</div>
    <div v-heightAuto class="mt20 pb20 w-card">
      <el-table v-loading="listLoading" :data="tableData" border style="width: 100%">
        <el-table-column label="序号" align="center" type="index" width="40" prop="id" />
        <el-table-column align="center" prop="equipmentProgramName" label="程序名称" />
        <el-table-column align="center" prop="equipmentSoftVersion" label="软件版本" />
        <el-table-column align="center" prop="equipmentHardwareVersion" label="硬件版本" />
        <el-table-column align="center" prop="state" label="程序状态" width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.state == 1">内测版</span>
            <span v-if="scope.row.state == 2">正式版</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="addtime" sortable label="操作时间" :formatter="dateFormat" />
        <el-table-column align="center" prop="data1" label="操作">
          <template slot-scope="scope">
            <el-upload
              class="upload-demo"
              :multiple="false"
              :auto-upload="true"
              list-type="text"
              :show-file-list="false"
              :before-upload="beforeUpload"
              action=""
              :on-exceed="handleExceed"
              :http-request="uploadFile"
            >
              <el-button type="primary" size="small" @click="uploadFile(scope.row)">上传书单</el-button>
            </el-upload>
            <el-button type="success" size="small" @click="releaseVersion(scope.row)">发布正式版</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pt20 pr30 pl30 tr">
        <span
          class="l f13 text-primary"
        >当前显示 {{ searchFrom.currentSize }} 条，共 {{ searchFrom.total }} 条记录</span>
        <el-pagination
          background
          class="dib"
          prev-text="上一页"
          next-text="下一页"
          :current-page="searchFrom.pageNo"
          :page-sizes="page.pageSizes"
          :page-size="searchFrom.pageRows"
          :total="searchFrom.totalPages"
          layout="sizes, prev, pager, next"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {
  programList,
  programPublish,
  programUpload
} from '@/api/program-management.js'
import moment from 'moment'
export default {
  components: {},
  props: {},
  data() {
    return {
      defaultSearchFrom: {},
      searchFrom: {
        pageRows: 10, // 每页显示数
        currentSize: 0, // 当前条数
        totalPages: 0, // 总页数
        pageNo: 0 // 页码
      },
      version: ' beta ', // beta-内测版 online-生产版
      listLoading: false,
      tableData: [],
      fileSaveUrl: process.env.VUE_APP_BASE_API + ' /equipment/program/upload ',
      uploadData: {}
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
    searchSubmit() {
      // 搜索查询
      if (this.listLoading) {
        return
      }
      this.listLoading = true
      programList(this.searchFrom)
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
    handleSizeChange(val) {
      // 切换每页显示数
      this.searchFrom.pageNo = 1
      this.searchFrom.pageRows = val
      this.searchSubmit()
    },
    handleCurrentChange(val) {
      // 切换页码
      this.searchFrom.pageNo = val
      this.searchSubmit()
    },
    // 发布版本
    releaseVersion(item) {
      var version = item.state
      if (version === 1) {
        version = 'beta'
      } else {
        version = 'online'
      }
      var data = {
        id: item.id,
        version: version
      }
      programPublish(data)
        .then(res => {
          this.$message({
            message: '发布成功',
            type: 'success'
          })
        })
        .catch(err => {
          this.$message.error(err.message)
        })
        .finally(() => {})
    },
    // 上传文件之前的钩子
    beforeUpload(file) {
      console.log('beforeUpload')
      console.log(file.type)
      const isText = file.type === 'application/vnd.ms-excel'
      const isTextComputer = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      if (!isText && !isTextComputer) {
        this.$message.error('上传表格只能是.xls 和.xlsx格式!')
      }
      return (isText | isTextComputer)
    },
    // 上传文件个数超过定义的数量
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，请删除后继续上传`)
    },
    // 上传文件
    uploadFile(item) {
      debugger
      console.log(item)
      const fileObj = item.file
      // FormData 对象
      const form = new FormData()
      // 文件对象
      form.append('file', fileObj)
      form.append('comId', this.comId)
      console.log(JSON.stringify(form))
      // let formTwo = JSON.stringify(form)
      programUpload(form).then(response => {
        console.log('MediaAPI.upload')
        console.log(response)
        this.$message.info('文件：' + fileObj.name + '上传成功')
      }).catch(err => {
        this.$message(err.message)
      })
    },
    dateFormat(row, column) {
      var date = row[column.property]

      if (date === undefined) { return '' }

      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    }
    // 上传参数
    // uploadFile(rowData) {
    //   this.uploadData = {
    //     id: rowData.id
    //   }
    // },
    // // 上传文档格式限制
    // fileLimit(file) {
    //   var fileName = file.name.substring(file.name.lastIndexOf('.') + 1)
    //   const extension = fileName === 'xls'
    //   const extension2 = fileName === 'xlsx'
    //   if (!extension && !extension2) {
    //     this.$message({
    //       message: '上传文件只能是 xls、xlsx格式!',
    //       type: 'warning'
    //     })
    //   }
    // },
    // // 上传成功提示
    // uploadSuccess(res) {
    //   if (res.code === 200) {
    //     this.$message.error('上传成功')
    //     this.searchSubmit()
    //   } else {
    //     this.$message.error(res.message)
    //   }
    // }
  }
}
</script>
<style lang="scss" scoped>
.cont-minheight {
  min-height: 740px;
}
.upload-demo {
  float:left;
  width:50px;
  text-align: center;
  margin-right: 25px;
  display: inline-block;
}
// .el-table .cell{
//   /deep/ .upload-demo{
//     float: left;
//   }
//}
</style>
