export default {
  data() {
    return {
      // 故障等级
      faultLevel: [
        { value: '', label: '全部' },
        { value: '1', label: '一级报警' },
        { value: '2', label: '二级报警' },
        { value: '3', label: '三级报警' },
        { value: '4', label: '正常' }
      ],
      // 设备状态
      equipmentStatus: [
        { value: '', label: '全部' },
        { value: '1', label: '放电状态' },
        { value: '2', label: '直流充电状态' },
        { value: '3', label: '交流充电状态' },
        { value: '4', label: '报警状态' },
        { value: '5', label: '保护状态' },
        { value: '6', label: '自检状态' }
      ],
      // 分页每页显示数
      page: {
        pageSizes: [10, 20, 50, 100, 200],
        pageSize: 10
      }
    }
  },
  created() {

  }
}
