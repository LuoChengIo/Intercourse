<template>
  <div>
    <div class="w-card battery-ct">
      <h2 class="tc f18 text-primary mb40">总电压<span class="ml15">13.4V</span></h2>
      <el-row :gutter="38">
        <el-col :span="12">
          <div class="gray-card">
            <div class="tc battery-num">
              <div class="f22 text-primary">4</div>
              <p class="f14 text-secondary">电池数据</p>
            </div>
            <div com class="voltage flex text-primary flex-align-center">
              <div>
                <div v-for="item in 4" :key="item" class="voltage-item ">
                  <span class="dib vm battery-icon">{{ item }}</span>
                  <span class="dib vm f18">3.354 V</span>
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="gray-card">
            <div class="tc battery-num temperature">
              <div class="f22 text-primary">4</div>
              <p class="f14 text-secondary">温度点数</p>
            </div>
            <div com class="voltage flex text-primary flex-align-center">
              <div>
                <div v-for="item in 4" :key="item" class="voltage-item temperature">
                  <span class="dib vm battery-icon temperature">{{ item }}</span>
                  <span class="dib vm f18">3.354 V</span>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
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
.battery-ct{
  padding: 30px 50px;
}
.gray-card{
  position: relative;
  padding: 30px 40px;
  background:rgba(238,245,253,1);
  border-radius:8px;
  min-height: 320px;
}
.battery-num{
  position: absolute;
  top: 50%;
  left: 8%;
  width: 148px;
  height: 148px;
  border-radius: 999px;
  padding-top: 46px;
  margin-top: -74px;
  background: url('~@/assets/detailed-data/bg_sum_battery@2x.png')no-repeat center;
  background-size: cover;
  &.temperature{
    background-image: url('~@/assets/detailed-data/bg_sum_temperature@2x.png')
  }
}
.voltage{
  margin-left: 46%;
  min-height: 260px;
}
.voltage-item{
  width: 100%;
  line-height: 51px;
  &.temperature{

  }
  & + .voltage-item{
     margin-top: 20px;
  }
}
.battery-icon{
  width: 30px;
  height: 40px;
  background: url('~@/assets/detailed-data/bg_battery@2x.png')no-repeat center;
  background-size: cover;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  margin-right: 30px;
  text-align: center;
  &.temperature{
    height: 51px;
    line-height: 70px;
    background-image: url('~@/assets/detailed-data/bg_temperature@2x.png')
  }
}
</style>
