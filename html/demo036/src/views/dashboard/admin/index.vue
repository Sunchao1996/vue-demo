<template>
  <div class="dashboard-editor-container">
    <el-row  >
      <el-col :offset="8"  :span="6" style="margin-bottom:30px;">
        <box-card/>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import BoxCard from './components/BoxCard'


export default {
  name: 'DashboardAdmin',
  components: {
    BoxCard
  },
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
</style>
