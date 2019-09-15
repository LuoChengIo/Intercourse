<template>
  <div>
    <div class="w-card search-card">
      <el-form :inline="true" :model="searchFrom" label-width="72px" class="form-inline">
        <el-form-item label="公司ID">
          <el-input v-model="searchFrom.companyId" placeholder="请输入公司ID" />
        </el-form-item>
        <el-form-item label="公司名称">
          <el-input v-model="searchFrom.companyName" placeholder="请输入公司名称" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="resetFrom">重置</el-button>
          <el-button type="success" @click="searchSubmit">搜索</el-button>
          <el-button type="success" icon="el-icon-plus" @click="addCompany">新增</el-button>
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
          prop="companyId"
          label="公司ID"
        />
        <el-table-column
          align="center"
          prop="companyName"
          label="公司名称"
        />
        <el-table-column align="center" label="logo">
          <template slot-scope="scope">
            <div>
              <el-image
                style="max-width: 100%; max-height: 100%"
                :src="scope.row.companyLogoUrl"
                :preview-src-list="previewSrcList"
              />
            </div>
            <span style="margin-left: 10px">{{ scope.row.companyLogoUrl }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="equipmentNum"
          label="设备数量"
        />
        <el-table-column
          align="center"
          prop="createTime"
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
          :page-size="searchFrom.pageRows"
          :total="searchFrom.total"
          layout="sizes, prev, pager, next"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <!-- 弹框 -->
    <el-dialog
      title="新增公司"
      :visible.sync="dialogVisible"
      width="645px"
    >
      <el-form :inline="true" :model="formInline" label-width="102px" class="demo-form-inline">
        <el-form-item label="公司名称">
          <el-input v-model="formInline.companyName" placeholder="" />
        </el-form-item>
        <el-form-item label="公司logo">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="formInline.companyLogoUrl" :src="formInline.companyLogoUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
        <el-form-item label="超管名称">
          <el-input v-model="formInline.loginId" placeholder="" />
        </el-form-item>
        <el-form-item label="超管登录密码">
          <el-input v-model="formInline.password" type="password" placeholder="" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// addCompany, deleteCompany, modifyCompanyInformation, getCompanyInformation,
import { getCompanyList } from '@/api/user.js'
export default {
  components: {},
  props: {},
  data() {
    return {
      defaultSearchFrom: {},
      searchFrom: {
        companyId: '',
        companyName: '',
        pageNum: 1, // 当前页
        pageRows: 10, // 每页显示数
        currentSize: 0, // 当前条数
        total: 0 // 总页数
      },
      previewSrcList: [],
      listLoading: false,
      tableData: [],
      dialogVisible: false,
      formInline: {

      }
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
    handleAvatarSuccess(res, file) {
      this.formInline.companyLogoUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    querySearch() {

    },
    searchSubmit() { // 搜索查询
      if (this.listLoading) {
        return
      }
      this.listLoading = true
      getCompanyList(this.searchFrom)
        .then(res => {
          const arr = []
          res.data.list.forEach((ele) => {
            arr.push(ele.companyLogoUrl)
          })
          this.previewSrcList = arr
          this.tableData = res.data.list
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          this.listLoading = false
        })
    },
    addCompany() {
      // 添加公司
      this.dialogVisible = true
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
    }
  }
}
</script>
<style lang="scss" scoped>
  .cont-minheight{
    min-height: 740px;
  }
</style>
