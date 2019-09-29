<template>
  <div>
    <div class="w-card search-card">
      <el-form :inline="true" :model="searchFrom" label-width="72px" class="form-inline">
        <el-form-item label="用户ID">
          <el-input v-model="searchFrom.loginId" placeholder="请输入用户ID" />
        </el-form-item>
        <el-form-item label="用户名称">
          <el-input v-model="searchFrom.operatorName" placeholder="请输入用户名称" />
        </el-form-item>
        <el-form-item label="所属公司">
          <el-autocomplete
            v-model="searchFrom.ascriptionCompanyName"
            popper-class="my-autocomplete"
            value-key="companyName"
            :fetch-suggestions="querySearch"
            placeholder="请输入所属公司"
          >
            <i
              slot="suffix"
              class="el-icon-search el-input__icon"
            />
            <template slot-scope="{ item }">
              <div class="name">{{ item.companyName }}</div>
            </template>
          </el-autocomplete>
        </el-form-item>
        <el-form-item label="用户状态">
          <el-select v-model="searchFrom.status">
            <el-option label="全部" value="" />
            <el-option label="启用" value="0" />
            <el-option label="停用" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="resetFrom">重置</el-button>
          <el-button type="success" @click="searchSubmit">搜索</el-button>
          <el-button type="success" icon="el-icon-plus" @click="operationHandle('',6)">新增</el-button>
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
          prop="loginId"
          label="用户ID"
        />
        <el-table-column
          align="center"
          prop="operatorName"
          label="用户名称"
        />
        <el-table-column
          align="center"
          prop="ascriptionCompanyName"
          label="所属公司"
        />
        <el-table-column
          align="center"
          prop="parentId"
          label="父账户"
        />
        <el-table-column
          align="center"
          prop="equipmentNum"
          label="设备数量"
        />
        <el-table-column
          align="center"
          prop="status"
          label="状态"
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
          <template slot-scope="scope">
            <el-button type="info" size="mini" @click="operationHandle(scope.row,1)">查看</el-button>
            <el-button type="primary" size="mini" @click="operationHandle(scope.row,2)">编辑</el-button>
            <el-button v-if="scope.row.status=='0'" type="warning" size="mini" status @click="operationHandle(scope.row,3)">停用</el-button>
            <el-button v-if="scope.row.status=='1'" type="success" size="mini" @click="operationHandle(scope.row,4)">启用</el-button>
            <el-button type="warning" size="mini" @click="operationHandle(scope.row,5)">密码重置</el-button>
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
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="830px"
    >
      <div>
        <div class="dg-right-ct dialog-boder-card">
          <div class="mb5 bd1 p5">
            角色权限（超级管理员）
          </div>
          <el-tree
            ref="vuetree"
            :data="treeDialogData"
            show-checkbox
            default-expand-all
            node-key="id"
            highlight-current
            :props="defaultProps"
          />`
        </div>
        <div class="dg-left-ct">
          <el-form class="dialog-boder-card mb15 demo-form-inline pt15" :inline="true" :model="formInline" :disabled="formInline.disabled" label-width="90px">
            <el-form-item v-if="dialogType==1||dialogType==2" label="账户ID">
              <el-input v-model="formInline.operatorId" disabled placeholder="" />
            </el-form-item>
            <el-form-item label="用户名称">
              <el-input v-model="formInline.loginId" placeholder="" />
            </el-form-item>
            <el-form-item label="所属公司">
              <el-autocomplete
                v-model="formInline.ascriptionCompanyId"
                style="width:155px;"
                popper-class="my-autocomplete"
                value-key="companyName"
                :fetch-suggestions="querySearch"
                placeholder="请输入所属公司"
                @change="companyChange"
              >
                <i
                  slot="suffix"
                  class="el-icon-search el-input__icon"
                />
                <template slot-scope="{ item }">
                  <div class="name">{{ item.companyName }}</div>
                </template>
              </el-autocomplete>
            </el-form-item>
            <el-form-item v-if="dialogType==1||dialogType==2" label="上级用户">
              <el-input v-model="formInline.roleId" disabled placeholder="" />
            </el-form-item>
            <el-form-item v-if="dialogType==1||dialogType==2" label="用户等级">
              <el-input v-model="formInline.roleName" disabled maxlength="30" placeholder="" />
            </el-form-item>
            <el-form-item label="子账户数">
              <el-input v-model="formInline.subOperatorNum" maxlength="30" placeholder="" />
            </el-form-item>
          </el-form>
          <div class="dialog-boder-card p10">
            <el-transfer v-model="formInline.roleIdString" :data="transferData" />
          </div>
        </div>

      </div>
      <span slot="footer" class="dialog-footer">
        <el-button v-if="dialogType!==2" type="primary" @click="addEditSubmit">确 定</el-button>
        <el-button @click="dialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getUserList, getCompanyList, midifyUserStatus, passwordReset, getUserInformation, addUser, modifyUserInformation } from '@/api/user.js'
import { encryptedData } from '@/utils/index'
export default {
  components: {},
  props: {},
  data() {
    return {
      defaultSearchFrom: {},
      searchFrom: {
        loginId: '',
        operatorName: '',
        ascriptionCompanyName: '',
        status: '',
        pageNum: 1, // 当前页
        pageRows: 10, // 每页显示数
        currentSize: 0, // 当前条数
        total: 0 // 总页数
      },
      listLoading: false,
      tableData: [],
      dialogType: 1,
      dialogVisible: false,
      dialogTitle: '',
      formInline: {
        roleId: '',
        roleName: '',
        ascriptionCompanyName: '',
        ascriptionCompanyId: '',
        oneLevelFunctionString: '',
        twoLevelFunctionString: '',
        roleIdString: '',
        transfer: [],
        disabled: false,
        checkAll: false
      },
      treeDialogData: [],
      transferData: [],
      defaultProps: {
        children: 'twoLevelFunctionList',
        label: 'functionName'
      }
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
    querySearch(queryString, cb) {
      // 公司输入建议
      const results = []
      getCompanyList({
        companyName: queryString,
        pageNo: 1, // 当前页
        pageRows: 1000 // 每页显示数
      })
        .then(res => {
          // const arr = res.companyList.list.filter((element)=>{
          // })
          cb(res.companyList.list)
        })
        .catch(() => {
          cb(results)
        })
    },
    companyChange(val) {
      // 选择公司后 展示对应的角色
      getUserList({
        ascriptionCompanyName: val,
        pageNo: 1, // 当前页
        pageRows: 100000 // 每页显示数
      })
        .then(res => {
          var transferData = res.userList.list || []
          transferData.forEach(element => {
            element.key = element.roleId
            element.label = element.roleName
          })
          this.transferData = transferData
        })
        .catch(() => {
        })
    },
    searchSubmit() { // 搜索查询
      if (this.listLoading) {
        return
      }
      this.listLoading = true
      getUserList(this.searchFrom)
        .then(res => {
          this.tableData = res.userList.list
          this.searchFrom.currentSize = res.userList.size
          this.searchFrom.total = res.userList.total
        })
        .catch(err => {
          this.$message.error(err.message)
        })
        .finally(() => {
          this.listLoading = false
        })
    },
    addEditSubmit() { // 编辑角色
      let actionFuc = addUser
      if (this.dialogType === 2) {
        actionFuc = modifyUserInformation
      }
      if (!this.formInline.roleName) {
        this.$message('请填写角色名称')
        return
      }
      if (!this.formInline.ascriptionCompanyName) {
        this.$message('请填写公司名称')
        return
      }
      const checkNode = this.$refs.vuetree.getCheckedNodes().concat(this.$refs.vuetree.getHalfCheckedNodes())
      if (!checkNode.length) {
        this.$message('请选择权限功能')
        return
      }
      const arr1 = []
      const arr2 = []
      checkNode.forEach(ele => {
        if (ele.twoLevelFunctionList) {
          arr1.push(ele.functionId)
        } else {
          arr2.push(ele.functionId)
        }
      })
      this.formInline.oneLevelFunctionString = arr1.join('|')
      this.formInline.twoLevelFunctionString = arr2.join('|')
      actionFuc(this.formInline).then(() => {
        this.$message.success('保存成功！')
      }).catch(() => {
      })
    },
    operationHandle(item, type) {
      // 系列操作
      this.dialogType = type
      this.formInline.disabled = false
      if (type === 6) {
        // 添加用户
        this.formInline = Object.assign(this.formInline, {
          roleId: '',
          roleName: '',
          ascriptionCompanyName: '',
          ascriptionCompanyId: '',
          oneLevelFunctionString: '',
          twoLevelFunctionString: '',
          roleIdString: '',
          transfer: []
        })
        this.dialogTitle = '添加用户'
        this.treeDialogData = []
      } else if (type === 1 || type === 2) {
        getUserInformation({
          loginId: item.loginId
        }).then((res) => {
          const data = res.companyInformation
          data.loginId = data.adminId
          this.formInline = Object.assign(this.formInline, data)
        }).catch(() => {
        })
        this.dialogTitle = '编辑公司'
        if (type === 1) {
          this.formInline.disabled = true
          this.dialogTitle = '查看公司'
        }
      } else if (type === 3) {
        // 启用
        midifyUserStatus({
          operatorId: item.operatorId,
          status: 0
        })
      } else if (type === 4) {
        // 停用
        this.$confirm('用户停用后将不能使用，是否确认停用？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          midifyUserStatus({
            operatorId: item.operatorId,
            status: 1
          })
        }).catch(() => {
        })
      } else if (type === 5) {
        // 重置密码
        this.$prompt('请输入密码', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          if (value.length !== 6) {
            this.$message('请输入6位以上密码')
          }
          passwordReset({
            loginId: item.loginId,
            companyId: item.companyId,
            password: encryptedData(value)
          }).then(() => {
            this.$message.success('重置成功')
          })
        })
      }
    },
    midifyUserStatus(item) {
      midifyUserStatus({
        operatorId: item.operatorId,
        status: item.status
      }).then(() => {
        this.$message.success('保存成功！')
      }).catch(() => {
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
    }
  }
}
</script>
<style lang="scss" scoped>
  .cont-minheight{
    min-height: 740px;
  }
  .bd1{
    border-bottom: 1px solid #ddd;
  }
  .dg-left-ct{
    margin-right: 265px;
  }
  .dg-right-ct{
    float: right;
    width: 250px;
    height: 516px;
  }
  .demo-form-inline{
    .el-input{
      width: 155px;
    }
  }
</style>
