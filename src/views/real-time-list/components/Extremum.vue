<template>
  <div class="w-card">
    <div class="clearfix text-secondary f13">
      <div class="text-primary item bb pct100 tc">电压极值</div>
      <div class="text-primary item bb br pct50 tc">最高电压</div>
      <div class="text-primary item bb pct50 tc">最低电压</div>
      <!-- 行 -->
      <div class="item bb br pct25 tr">
        最高单体电压电池箱编号
      </div>
      <div class="text-primary item bb br pct25 tc">
        10
      </div>
      <div class="item bb br pct25 tr">
        最低单体电压电池单体编号
      </div>
      <div class="text-primary item bb pct25 tc">
        2
      </div>
      <!-- 行 -->
      <div class="item bb br pct25 tr">
        最高单体电压电池单体编号
      </div>
      <div class="text-primary item bb br pct25 tc">
        2
      </div>
      <div class="item bb br pct25 tr">
        最低单体电压值
      </div>
      <div class="text-primary item bb pct25 tc">
        3.346 V
      </div>
      <!-- 行 -->
      <div class="item bb br pct25 tr">
        最高单体电压值
      </div>
      <div class="text-primary item bb br pct25 tc">
        3.411 V
      </div>
      <div class="item bb br pct25 tr">
        最高单体温度电池箱编号
      </div>
      <div class="text-primary item bb pct25 tc">
        10
      </div>
      <!-- 行 -->
      <div class="item bb br pct25 tr">
        最低单体电压电池箱编号
      </div>
      <div class="text-primary item bb br pct25 tc">
        2
      </div>
      <div class="item bb br pct25 tr">
        最高单体温度电池单体编号
      </div>
      <div class="text-primary item bb pct25 tc">
        1
      </div>
      <!-- 行 -->
      <div class=" item bb br pct25 tc">压差值</div>
      <div class="text-primary item bb pct75 tc">0.065 V</div>
      <!-- 行 -->
      <div class="text-primary item bb pct100 tc">温度极值</div>
      <div class="text-primary item bb br pct50 tc">最高温度</div>
      <div class="text-primary item bb pct50 tc">最低温度</div>
      <!-- 行 -->
      <div class="item bb br pct25 tr">
        最高单体温度电池单体编号
      </div>
      <div class="text-primary item bb br pct25 tc">
        10
      </div>
      <div class="item bb br pct25 tr">
        最低单体温度电池箱编号
      </div>
      <div class="text-primary item bb pct25 tc">
        2
      </div>
      <!-- 行 -->
      <div class="item bb br pct25 tr">
        最高单体温度值
      </div>
      <div class="text-primary item bb br pct25 tc">
        29.4 ℃
      </div>
      <div class="item bb br pct25 tr">
        最低单体温度值
      </div>
      <div class="text-primary item bb pct25 tc">
        28.3 ℃
      </div>
      <!-- 行 -->
      <div class=" item br pct25 tc">温度差</div>
      <div class="text-primary item pct75 tc">1.1 ℃</div>
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
.item{
  float: left;
  line-height: 50px;
  padding:0 20px;
}
.bt{
  border-top: 1px solid #D4DBEA;
}
.br{
  border-right: 1px solid #D4DBEA;
}
.bb{
  border-bottom: 1px solid #D4DBEA;
}
.bl{
  border-left: 1px solid #D4DBEA;
}
.pct75 {
  width: 75%;
}
</style>
