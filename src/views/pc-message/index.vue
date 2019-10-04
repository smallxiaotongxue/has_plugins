<template>
  <div class="pc-message">
    <el-alert type="success" effect="dark" :closable="false">
      <slot name="title">
        <p class="table-title">CPU信息</p>
      </slot>
    </el-alert>

    <div style="margin-top: 10px;">
      <el-table
        border
        :data="cpuInfo"
        highlight-current-row
        @current-change="handleCurrentChange"
        style="width: 100%">
        <el-table-column fixed type="index" width="60"></el-table-column>
        <el-table-column property="ProcessorID" label="CPU序列号"></el-table-column>
        <el-table-column property="Caption" label="Caption"></el-table-column>
        <el-table-column property="remark" label="备注" width="200"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import * as utils from '../../utils/index'

export default {
  name: 'pc-index',
  data: function () {
    return {
      cpuInfo: []
    };
  },
  created () {

  },
  mounted () {
    this.initPage();
  },
  methods: {
    initPage () {
      this.getCpuInfo();
    },
    getCpuInfo () {
      // eslint-disable-next-line no-undef
      let locator = new ActiveXObject('WbemScripting.SWbemLocator')
      let service = locator.ConnectServer('.')
      var properties = service.ExecQuery('SELECT * FROM Win32_Processor')
      // eslint-disable-next-line no-undef
      var e = new Enumerator(properties);
      let data = [];

      for (; !e.atEnd(); e.moveNext()) {
        let p = e.item();
        data.push({
          ProcessorID: p.ProcessorID,
          Caption: p.Caption,
          DeviceID: p.DeviceID,
          CpuStatus: p.CpuStatus,
          Availability: p.Availability,
          Level: p.Level,
          SystemName: p.SystemName,
          ProcessorType: p.ProcessorType,
        })
      }

      this.cpuInfo = data;
      console.log(this.cpuInfo);
    },
    handleCurrentChange () {

    },
  },
  beforeRouteEnter (to, from, next) {
    let browser = utils.getBrowserInfo();
    if ((browser.name !== 'IE' && browser.name !== 'Edge') ||
      (browser.name === 'IE' && typeof Number(browser.version) === 'number' && Number(browser.version) < 9)) {
      alert('请使用IE9及其以上浏览器打开当前页面');
      next({
        path: from.path
      });
    } else {
      next();
    }
  }
}
</script>

<style lang="scss" scoped>

  .table-title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 5px;
  }
</style>

<style scoped>

</style>
