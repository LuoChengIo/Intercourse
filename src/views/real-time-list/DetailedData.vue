<template>
  <div>
    <div class="w-card search-card">
      <el-form :inline="true" :model="searchFrom" label-width="72px" class="form-inline">
        <el-form-item label="设备ID">
          <el-input v-model="searchFrom.equipmentId" placeholder="请输入设备ID" />
        </el-form-item>
        <el-form-item label="设备名称">
          <el-input v-model="searchFrom.equipmentName" disabled placeholder="" />
        </el-form-item>
        <el-form-item label="所属公司">
          <el-input v-model="searchFrom.companyname" disabled placeholder="" />
        </el-form-item>
        <el-form-item label="所属用户">
          <el-input v-model="searchFrom.companyname" disabled placeholder="" />
        </el-form-item>
        <el-form-item label="软件版本">
          <el-input v-model="searchFrom.equipmentSoftVersion" disabled placeholder="" />
        </el-form-item>
        <el-form-item label="硬件版本">
          <el-input v-model="searchFrom.equipmentHardwareVersion" disabled placeholder="" />
        </el-form-item>
        <el-form-item>
          <el-button type="success" :loading="queryLoading" @click="searchSubmit">搜索</el-button>
          <el-button type="success" @click="searchSubmit">命令下发</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- tab栏 -->
    <ul class="tab-ul">
      <li v-for="(item,index) in tabList" :key="index" class="tab-item" :class="{'active':activeTab==item}" @click="activeTab=item">{{ item.name }}</li>
    </ul>
    <div>
      <component :is="currentTabComponent" />
    </div>
  </div>
</template>

<script>
import { dataList } from '@/api/real-time-list.js'
import Battery from './components/Battery'
import Extremum from './components/Extremum'
import Police from './components/Police'
import Statistics from './components/Statistics'
import Status from './components/Status'
export default {
  components: {
    Battery,
    Extremum,
    Police,
    Statistics,
    Status
  },
  props: {},
  data() {
    return {
      tabList: [{
        id: 1,
        name: '状态数据',
        components: 'Status'
      }, {
        id: 2,
        name: '电池数据',
        components: 'Battery'
      }, {
        id: 3,
        name: '极值数据',
        components: 'Extremum'
      }, {
        id: 4,
        name: '报警数据',
        components: 'Police'
      }
      // {
      //   id: 5,
      //   name: '统计数据',
      //   components: 'Statistics'
      // }
      ],
      queryLoading: false,
      activeTab: {},
      searchFrom: {
        equipmentId: '',
        equipmentName: '',
        companyname: '',
        statename: '',
        equipmentSoftVersion: '',
        equipmentHardwareVersion: ''
      }
    }
  },
  computed: {
    currentTabComponent() {
      return this.activeTab.components
    }
  },
  watch: {},
  mounted() {},
  created() {
    this.activeTab = this.tabList[0]
  },
  methods: {
    querySearch() {
      this.queryLoading = true
      if (!this.searchFrom.equipmentId) {
        this.$message.warning('请输入设备id~')
        return
      }
      dataList({
        equipmentId: this.searchFrom.equipmentId,
        pageNo: 1,
        pageRows: 1000
      })
        .then(res => {
          this.searchFrom = Object.assign(this.searchFrom, res.data[0])
        })
        .catch(err => {
          this.$message.error(err.message)
        })
        .finally(() => {
          this.queryLoading = false
        })
    },
    searchSubmit() {

    }
  }
}
</script>
<style lang="scss" scoped>
  .tab-ul{
    font-size: 0;
    margin: 20px 0 18px 0;
    .tab-item{
      position: relative;
      display: inline-block;
      font-size:14px;
      width: 160px;
      height: 42px;
      line-height: 42px;
      background-color: #fff;
      box-shadow:0px 0px 10px 0px rgba(0,0,0,0.06);
      border-radius:27px;
      text-align: center;
      color: #001C37;
      cursor: pointer;
      transition: all .3s;
      & + .tab-item{
        margin-left: 20px;
      }
      &.active{
        background-color: #FF414E;
        color: #fff;
        &::after{
          content: '';
          position: absolute;
          left: 50%;
          bottom: -16px;
          transform: translateX(-50%);
          border:8px solid transparent;
          border-top-color: #FF414E;
        }
      }
    }
  }
</style>
