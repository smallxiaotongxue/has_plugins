<template>
  <div class="pc-message" id="pcMessage">
    <div class="message-part">
      <create-image target-id="pcMessage" image-name="pcData"></create-image>

      <el-alert type="success" effect="dark" :closable="false">
        <slot name="title">
          <p class="table-title">CPU信息</p>
        </slot>
      </el-alert>

      <div style="margin-top: 10px;">
        <el-table
          border
          :data="CPU_Info"
          highlight-current-row
          @current-change="handleCurrentChange"
          style="width: 100%">
          <el-table-column fixed type="index" width="60"></el-table-column>
          <el-table-column property="ProcessorID" label="CPU序列号"></el-table-column>
          <el-table-column property="Caption" label="Caption"></el-table-column>
          <el-table-column property="DeviceID" label="CPU编号"></el-table-column>
          <el-table-column property="CpuStatus" label="CUP Level"></el-table-column>
          <el-table-column property="Level" label="CPU可用性"></el-table-column>
          <el-table-column property="SystemName" label="主机名称"></el-table-column>
          <el-table-column property="ProcessorType" label="Processor Type"></el-table-column>
        </el-table>
      </div>
    </div>

    <div class="message-part">
      <el-alert type="info" effect="dark" :closable="false">
        <slot name="title">
          <p class="table-title">主板信息</p>
        </slot>
      </el-alert>

      <div style="margin-top: 10px;">
        <el-table
          border
          :data="MAINBOARD_Info"
          highlight-current-row
          @current-change="handleCurrentChange"
          style="width: 100%">
          <el-table-column fixed type="index" width="60"></el-table-column>
          <el-table-column property="SerialNumber" label="主板ID"></el-table-column>
          <el-table-column property="HostingBoard" label="HostingBoard"></el-table-column>
          <el-table-column property="Manufacturer" label="制造商"></el-table-column>
          <el-table-column property="PoweredOn" label="是否开启"></el-table-column>
          <el-table-column property="Product" label="型号"></el-table-column>
          <el-table-column property="Version" label="版本"></el-table-column>
        </el-table>
      </div>
    </div>

    <div class="message-part">
      <el-alert type="error" effect="dark" :closable="false">
        <slot name="title">
          <p class="table-title">内存信息</p>
        </slot>
      </el-alert>

      <div style="margin-top: 10px;">
        <el-table
          border
          :data="RAM_Info"
          highlight-current-row
          @current-change="handleCurrentChange"
          style="width: 100%">
          <el-table-column fixed type="index" width="60"></el-table-column>
          <el-table-column property="cap" label="内存总量"></el-table-column>
          <el-table-column property="physicMenCap" label="可用物理内存"></el-table-column>
        </el-table>
      </div>
    </div>

    <div class="message-part">
      <el-alert type="error" effect="dark" :closable="false">
        <slot name="title">
          <p class="table-title">网络连接信息</p>
        </slot>
      </el-alert>

      <div style="margin-top: 10px;">
        <el-table
          border
          :data="IP_Info"
          highlight-current-row
          @current-change="handleCurrentChange"
          style="width: 100%">
          <el-table-column fixed type="index" width="60"></el-table-column>
          <el-table-column property="MACAddress" label="MAC地址"></el-table-column>
          <el-table-column property="IPAddress" label="IP地址"></el-table-column>
        </el-table>
      </div>
    </div>

    <div class="message-part">
      <el-alert type="info" effect="dark" :closable="false">
        <slot name="title">
          <p class="table-title">软盘信息</p>
        </slot>
      </el-alert>

      <div style="margin-top: 10px;">
        <el-table
          border
          :data="SOFT_DISK_Info"
          highlight-current-row
          @current-change="handleCurrentChange"
          style="width: 100%">
          <el-table-column fixed type="index" width="60"></el-table-column>
          <el-table-column property="Description" label="Description"></el-table-column>
          <el-table-column property="DeviceID" label="DeviceID"></el-table-column>
          <el-table-column property="Status" label="Status"></el-table-column>
          <el-table-column property="Manufacuturer" label="Manufacuturer"></el-table-column>
        </el-table>
      </div>
    </div>

    <div class="message-part">
      <el-alert type="error" effect="dark" :closable="false">
        <slot name="title">
          <p class="table-title">CD-ROM信息</p>
        </slot>
      </el-alert>

      <div style="margin-top: 10px;">
        <el-table
          border
          :data="CDROM_Info"
          highlight-current-row
          @current-change="handleCurrentChange"
          style="width: 100%">
          <el-table-column fixed type="index" width="60"></el-table-column>
          <el-table-column property="Caption" label="驱动器名称"></el-table-column>
          <el-table-column property="Description" label="描述"></el-table-column>
          <el-table-column property="Drive" label="盘符"></el-table-column>
          <el-table-column property="Status" label="驱动器状态"></el-table-column>
          <el-table-column property="MediaLoaded" label="是否在使用"></el-table-column>
        </el-table>
      </div>
    </div>

    <div class="message-part">
      <el-alert type="warning" effect="dark" :closable="false">
        <slot name="title">
          <p class="table-title">键盘信息</p>
        </slot>
      </el-alert>

      <div style="margin-top: 10px;">
        <el-table
          border
          :data="KEYBOARD_Info"
          highlight-current-row
          @current-change="handleCurrentChange"
          style="width: 100%">
          <el-table-column fixed type="index" width="60"></el-table-column>
          <el-table-column property="Description" label="键盘描述"></el-table-column>
          <el-table-column property="Name" label="键盘名称"></el-table-column>
          <el-table-column property="Status" label="键盘状态"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import * as utils from '../../utils/index'
import CreateImage from '../../components/page/create-image'

export default {
  name: 'pc-index',
  data: function () {
    return {
      CPU_Info: [],
      SOFT_DISK_Info: [],
      CDROM_Info: [],
      KEYBOARD_Info: [],
      MAINBOARD_Info: [],
      RAM_Info: [],
      IP_Info: [],
    }
  },
  components: {
    CreateImage
  },
  created () {

  },
  mounted () {
    this.initPage()
  },
  methods: {
    initPage () {
      this.getCpuInfo()
      this.getSoftDiskInfo()
      this.getRomInfo()
      this.getKeyBoardInfo()
      this.getMainBoardInfo()
      this.getRAMInfo()
      this.getIPInfo()
    },
    getCpuInfo () {
      // eslint-disable-next-line no-undef
      let locator = new ActiveXObject('WbemScripting.SWbemLocator')
      let service = locator.ConnectServer('.')
      let properties = service.ExecQuery('SELECT * FROM Win32_Processor')
      // eslint-disable-next-line no-undef
      let e = new Enumerator(properties)
      let data = []

      for (; !e.atEnd(); e.moveNext()) {
        let p = e.item()
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

      this.CPU_Info = data
    },
    getSoftDiskInfo () {
      // eslint-disable-next-line no-undef
      var locator = new ActiveXObject('WbemScripting.SWbemLocator')
      var service = locator.ConnectServer('.')

      //软盘信息
      var properties = service.ExecQuery('SELECT * FROM Win32_FloppyDrive')
      // eslint-disable-next-line no-undef
      var e = new Enumerator(properties)

      let data = []

      for (; !e.atEnd(); e.moveNext()) {
        let p = e.item()
        data.push({
          Description: p.Description,
          DeviceID: p.DeviceID,
          Status: p.Status,
          Manufacuturer: p.Manufacuturer,
        })
      }

      this.SOFT_DISK_Info = data
    },
    getRomInfo () {
      // eslint-disable-next-line no-undef
      var locator = new ActiveXObject('WbemScripting.SWbemLocator')
      var service = locator.ConnectServer('.')
      //CD-ROM 信息
      var properties = service.ExecQuery('SELECT * FROM Win32_CDROMDrive')
      // eslint-disable-next-line no-undef
      var e = new Enumerator(properties)

      let data = []

      for (; !e.atEnd(); e.moveNext()) {
        let p = e.item()
        data.push({
          Caption: p.Caption,
          Description: p.Description,
          Drive: p.Drive,
          Status: p.Status,
          MediaLoaded: p.MediaLoaded,
        })
      }

      this.CDROM_Info = data
    },
    getKeyBoardInfo () {
      // eslint-disable-next-line no-undef
      var locator = new ActiveXObject('WbemScripting.SWbemLocator')
      var service = locator.ConnectServer('.')
      //键盘信息
      var properties = service.ExecQuery('SELECT * FROM Win32_Keyboard')
      // eslint-disable-next-line no-undef
      var e = new Enumerator(properties)

      let data = []

      for (; !e.atEnd(); e.moveNext()) {
        let p = e.item()
        data.push({
          Description: p.Description,
          Name: p.Name,
          Status: p.Status,
        })
      }

      this.KEYBOARD_Info = data
    },
    getMainBoardInfo () {
      // eslint-disable-next-line no-undef
      var locator = new ActiveXObject('WbemScripting.SWbemLocator')
      var service = locator.ConnectServer('.')
      //主板信息
      var properties = service.ExecQuery('SELECT * FROM Win32_BaseBoard')
      // eslint-disable-next-line no-undef
      var e = new Enumerator(properties)

      let data = []

      for (; !e.atEnd(); e.moveNext()) {
        let p = e.item()
        data.push({
          SerialNumber: p.SerialNumber,
          HostingBoard: p.HostingBoard,
          Manufacturer: p.Manufacturer,
          PoweredOn: String(p.PoweredOn),
          Product: p.Product,
          Version: p.Version,
        })
      }

      this.MAINBOARD_Info = data
    },
    getRAMInfo () {
      // eslint-disable-next-line no-undef
      var locator = new ActiveXObject('WbemScripting.SWbemLocator')
      var service = locator.ConnectServer('.')
      //获取Ram信息
      // eslint-disable-next-line no-undef
      var system = new Enumerator(service.ExecQuery('SELECT * FROM Win32_ComputerSystem')).item()
      var physicMenCap = Math.ceil(system.TotalPhysicalMemory / 1024 / 1024)

      // eslint-disable-next-line no-undef
      var memory = new Enumerator(service.ExecQuery('SELECT * FROM Win32_PhysicalMemory'))

      let mem = []
      for (let i = 0; !memory.atEnd(); memory.moveNext()) {
        mem[i++] = {
          cap: memory.item().Capacity / 1024 / 1024,
          speed: memory.item().Speed
        }
      }
      // let sumMem = 0;
      // for (let i = 0; i < mem.length; i++) {
      //   sumMem += mem[i].cap;
      // }
      console.log(mem[0].cap)
      console.log(mem[1].cap)
      let data = [
        {
          cap: (mem[0].cap + mem[1].cap) + 'M',
          physicMenCap: physicMenCap + 'M'
        }
      ]

      this.RAM_Info = data
    },
    getIPInfo () {
      // eslint-disable-next-line no-undef
      var locator = new ActiveXObject('WbemScripting.SWbemLocator')
      var service = locator.ConnectServer('.')
      //获取网络连接信息
      var properties = service.ExecQuery('SELECT * FROM Win32_NetworkAdapterConfiguration Where IPEnabled=TRUE')
      // eslint-disable-next-line no-undef
      var e = new Enumerator(properties)

      let data = []

      for (; !e.atEnd(); e.moveNext()) {
        let p = e.item()
        data.push({
          MACAddress: p.MACAddress,
          IPAddress: p.IPAddress(0),
        })
      }

      this.IP_Info = data
    },

    handleCurrentChange () {

    },
  },
  beforeRouteEnter (to, from, next) {
    let browser = utils.getBrowserInfo()
    if ((browser.name !== 'IE' && browser.name !== 'Edge') ||
      (browser.name === 'IE' && typeof Number(browser.version) === 'number' && Number(browser.version) < 9)) {
      alert('请使用IE浏览器9及其以上打开当前页面')
      next({
        path: from.path
      })
    } else {
      next()
    }
  }
}
</script>

<style lang="scss" scoped>

  .message-part {
    margin-bottom: 20px;
  }

  .top-menu {
    display: flex;
    justify-content: flex-end;
    padding: 0 0 10px;
  }

  .table-title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 5px;
  }

  .image-wrap {
    height: 80vh;
    padding: 20px;
    overflow: auto;

    img {
      width: 100%;
    }
  }
</style>
