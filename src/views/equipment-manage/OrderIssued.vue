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
        <el-form-item>
          <el-button type="success" @click="searchSubmit">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div v-heightAuto class="mt20 p20 w-card">
      <h5 class="title mb20">设备设置</h5>
      <el-form :inline="true" :model="valueFrom" class="form-inline">
        <el-form-item>
          <el-radio v-model="valueFrom.radio" label="1">定时回传时间间隔</el-radio>
          <el-time-select v-model="valueFrom.value" placeholder="选择时间间隔" />
        </el-form-item>
      </el-form>
      <h5 class="title mb20">参数设置</h5>
      <el-form :inline="true" :model="valueFrom" class="form-inline">
        <el-form-item>
          <el-radio v-model="valueFrom.radio" class="w150" label="1">SCO</el-radio>
          <el-input v-model="valueFrom.input" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item>
          <el-radio v-model="valueFrom.radio" class="w150" label="1">单体充电截止电压值</el-radio>
          <el-input v-model="valueFrom.input" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item>
          <el-radio v-model="valueFrom.radio" class="w150" label="1">单体电池过压值</el-radio>
          <el-input v-model="valueFrom.input" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item>
          <el-radio v-model="valueFrom.radio" class="w150" label="1">单体电池欠压值</el-radio>
          <el-input v-model="valueFrom.input" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item>
          <el-radio v-model="valueFrom.radio" class="w150" label="1">压差值</el-radio>
          <el-input v-model="valueFrom.input" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item>
          <el-radio v-model="valueFrom.radio" class="w150" label="1">温差值</el-radio>
          <el-input v-model="valueFrom.input" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item>
          <el-radio v-model="valueFrom.radio" class="w150" label="1">放电过流值</el-radio>
          <el-input v-model="valueFrom.input" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item>
          <el-radio v-model="valueFrom.radio" class="w150" label="1">充电过流值</el-radio>
          <el-input v-model="valueFrom.input" placeholder="请输入内容" />
        </el-form-item>
      </el-form>
      <h5 class="title mb20">下发命令设置</h5>
      <el-form :inline="true" :model="valueFrom" class="form-inline">
        <el-form-item>
          <el-radio v-model="valueFrom.radio" label="1">信息立即回传命令</el-radio>
        </el-form-item>
        <el-form-item>
          <el-radio v-model="valueFrom.radio" label="1">系统重启</el-radio>
        </el-form-item>
        <el-form-item>
          <el-radio v-model="valueFrom.radio" label="1">系统重启次数回传</el-radio>
        </el-form-item>
      </el-form>
      <div class="mt30 tc">
        <el-button type="primary">重置</el-button>
        <el-button type="success">下发</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      searchFrom: {},
      valueFrom: {}
    }
  },
  computed: {},
  watch: {},
  mounted() {},
  created() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.title{
  font-size: 14px;
  line-height: 35px;
  border-bottom: 1px solid #D4DBEA;
}
.w150{
  width: 150px;
}
.cont-minheight{
  min-height: 740px;
}
</style>
