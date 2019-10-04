<template>
  <div id="messagePage">

    <el-tabs type="border-card">
      <el-tab-pane label="浏览器信息">

        <div class="top-menu">
          <el-button type="primary" size="small" round @click="html2canvas('navigatorData')">生成图片</el-button>
        </div>

        <el-table
          border
          :data="navigatorData"
          highlight-current-row
          @current-change="handleCurrentChange"
          style="width: 100%">
          <el-table-column type="index" width="60"></el-table-column>
          <el-table-column property="name"  label="属性名称" width="200"></el-table-column>
          <el-table-column property="detail" label="属性详情" min-width="300"></el-table-column>
          <el-table-column property="remark" label="备注" width="200"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="浏览器插件信息">
        <div class="top-menu">
          <el-button type="primary" size="small" round @click="html2canvas('pluginsData')">生成图片</el-button>
        </div>

        <el-alert type="success" title="插件信息" effect="dark" :description="tips" :closable="false"></el-alert>
        <div class="plugin-table" style="margin-top: 10px;">
          <el-table
            border
            :data="pluginsData"
            highlight-current-row
            @current-change="handleCurrentChange"
            style="width: 100%">
            <el-table-column type="index" width="60" align="center"></el-table-column>
            <el-table-column property="name" label="插件名称" width="200"></el-table-column>
            <el-table-column property="filename" label="文件名称" min-width="250"></el-table-column>
            <el-table-column property="description" label="插件描述" width="150"></el-table-column>
            <el-table-column property="version" label="版本" width="100"></el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import html2canvas from 'html2canvas';

export default {
  name: 'navigator-message',
  data: function () {
    return {
      navigatorData: [],
      pluginsData: [],
    }
  },
  computed: {
    tips () {
      return `当前浏览器插件数量为 ${window.navigator.plugins.length || '0'} 个`;
    }
  },
  mounted () {
    this.initPage()
  },
  methods: {
    initPage () {
      this.getAllInfo();
      this.getPluginInfo();
    },
    html2canvas (name) {
      html2canvas(document.getElementById('messagePage')).then(function(canvas) {
        var a = document.createElement("a");
        a.href = canvas.toDataURL();
        a.download = name || 'browser-message';
        a.click();
      });
    },
    handleCurrentChange () {

    },
    getPluginInfo () {
      let L = navigator.plugins.length;
      for (let i = 0; i < L; i++) {
        this.pluginsData.push({
          name: navigator.plugins[i].name || '',
          filename: navigator.plugins[i].filename || '',
          description: navigator.plugins[i].description || '',
          version: navigator.plugins[i].version || '',
        })
      }
    },
    getAllInfo () {
      let appName = navigator.appName // 浏览器的正式名称
      let appVersion = navigator.appVersion // 浏览器的版本号
      let cookieEnabled = navigator.cookieEnabled // 返回用户浏览器是否启用了cookie
      let cpuClass = navigator.cpuClass //返回用户计算机的cpu的型号，通常intel芯片返回"x86"（火狐没有）

      let mimeType = navigator.mimeTypes // 浏览器支持的所有MIME类型的数组
      let platform = navigator.platform // 浏览器正在运行的操作系统平台，包括Win16(windows3.x) Win32(windows98,Me,NT,2000,xp),Mac68K(Macintosh 680x0)和ＭacPPC(Macintosh PowerPC)
      // let plugins = navigator.plugins // 安装在浏览器上的所有插件的数组
      let userLanguage = navigator.userLanguage // 用户在自己的操作系统上设置的语言（火狐没有）
      let userAgent = navigator.userAgent //包含以下属性中所有或一部分的字符串：appCodeName,appName,appVersion,language,platform
      let systemLanguage = navigator.systemLanguage // 用户操作系统支持的默认语言（火狐没有）
      let appCodeName = navigator.appCodeName //与浏览器相关的内部代码名
      let appMinorVersion = navigator.appMinorVersion //辅版本号（通常应用于浏览器的补丁或服务包)
      let language = navigator.language //浏览器支持的语言 （IE没有）
      let onLine = navigator.onLine //返回浏览器是否处于在线模式（IE4以上版本）
      // let opsProfile = navigator.opsProfile // 未定义 （IE、火狐没有）
      // let oscpu = navigator.oscpu //浏览器正在运行的操作系统，其中可能有CPU的信息（IE没有）
      let product = navigator.product // 浏览器的产品名（IE没有）
      let productSub = navigator.productSub //关于浏览器更多信息（IE没有）
      // let securityPolicy = navigator.securityPolicy // 浏览器支持的加密类型（IE没有）
      // let userProfile = navigator.userProfile // 返回一个UserProfile对象，它存储用户的个人信息（火狐没有）
      let vender = navigator.vender // 浏览器厂商名称（IE、火狐没有）
      let vendorSub = navigator.vendorSub // 关于浏览器厂商更多的信息
      let webkitPersistentStorage = navigator.webkitPersistentStorage;
      let browserMessage = this.$utils.getBrowserInfo();
      let type = browserMessage.name ? browserMessage.name + '浏览器' : '暂无信息';

      function getPluginName() {
        var info = '';
        var plugins = navigator.plugins;
        if (plugins.length > 0) {
          for (let i = 0; i < navigator.plugins.length; i++) {
            info += navigator.plugins[i].name + '; ';
          }
        }
        return info;
      }

      // 整理navigator信息
      let data = [
        {
          name: 'IE特有属性',
          detail: navigator.msManipulationViewsEnabled || '无',
          remark: 'msManipulationViewsEnabled'
        },
        {
          name: '浏览器类型',
          detail: type || '无',
          remark: ''
        },
        {
          name: '浏览器属性信息',
          detail: userAgent || '无',
          remark: 'userAgent'
        },
        {
          name: '持久存储信息',
          detail: webkitPersistentStorage || '无',
          remark: 'webkitPersistentStorage'
        },
        {
          name: '浏览器的正式名称',
          detail: appName || '无',
          remark: 'appName'
        },
        {
          name: '浏览器的版本号',
          detail: appVersion || '无',
          remark: 'appVersion'
        },
        {
          name: '浏览器相关的内部代码名',
          detail: appCodeName || '无',
          remark: 'appCodeName'
        },
        {
          name: '浏览器相关的辅代码号',
          detail: appMinorVersion || '无',
          remark: 'appMinorVersion'
        },
        {
          name: '浏览器支持的语言',
          detail: language || '无',
          remark: 'language --- IE没有'
        },
        {
          name: '浏览器是否处于在线模式',
          detail: onLine || '无',
          remark: 'onLine'
        },
        {
          name: '浏览器的产品名',
          detail: product || '无',
          remark: 'product（IE没有）'
        },
        {
          name: '浏览器更多信息',
          detail: productSub || '无',
          remark: ''
        },
        {
          name: '浏览器厂商名称',
          detail: vender || '无',
          remark: ''
        },
        {
          name: '浏览器厂商更多信息',
          detail: vendorSub || '无',
          remark: ''
        },
        {
          name: '浏览器的是否启用了cookie',
          detail: cookieEnabled || '无',
          remark: ''
        },
        {
          name: 'cpu等级',
          detail: cpuClass || '无',
          remark: ''
        },
        {
          name: '浏览器的产品名',
          detail: product || '无',
          remark: 'product（IE没有）'
        },
        {
          name: '浏览器的MIME类型',
          detail: mimeType || '无',
          remark: ''
        },
        {
          name: '系统平台',
          detail: platform || '无',
          remark: ''
        },
        {
          name: '安装的插件',
          detail: getPluginName() || '无',
          remark: ''
        },
        {
          name: '安装插件的数量',
          detail: userLanguage || '无',
          remark: ''
        },
        {
          name: '操作系统支持的默认语言',
          detail: systemLanguage || '无',
          remark: ''
        },
        {
          name: '支持Director',
          detail: this._checkPlugins('Director') || '无',
          remark: ''
        },
        {
          name: 'javaEnabled',
          detail: navigator.javaEnabled() || '无',
          remark: ''
        },
        {
          name: '是否有quickTime',
          detail: this._checkPlugins('QuickTime') || '无',
          remark: ''
        },
        {
          name: 'flash插件情况',
          detail: this._checkPlugins('Shockwave Flash') || '无',
          remark: ''
        },
        {
          name: '是否有MediaPlayer',
          detail: this._checkPlugins('MediaPlayer') || '无',
          remark: ''
        },
        {
          name: '是否有realPlayer',
          detail: this._checkPlugins('RealPlayer') || '无',
          remark: ''
        },
        {
          name: '屏幕分辨率高度',
          detail: window.screen.height || '无',
          remark: ''
        },
        {
          name: '屏幕分辨率宽度',
          detail: window.screen.width || '无',
          remark: ''
        },
        {
          name: '颜色质量',
          detail: window.screen.colorDepth || '无',
          remark: ''
        },
        {
          name: '像素',
          detail: window.screen.deviceXDPI + '像素/英寸' || '无',
          remark: ''
        },
        {
          name: '字体是否平滑',
          detail: window.screen.fontSmoothingEnabled || '无',
          remark: ''
        }
      ]

      this.navigatorData = [...data];
    },
    /*
     * 检测是否已安装指定插件
     * pluginName 插件名称
     */
    _checkPlugins (pluginName) {
      let np = navigator.plugins;
      if (window.ActiveXObject) {
        // IE
        // ActiveXObject的对象名
        // eslint-disable-next-line no-unused-vars
        let activexObjectName = pluginName + "." + pluginName;
        try {
          // eslint-disable-next-line no-eval
          let axobj = eval("new ActiveXObject(activexObjectName);");
          // 将对象转化为布尔类型
          return !!axobj;
        } catch (e) {
          return false;
        }
      } else if (np && np.length) {
        // 非IE
        for (var i = 0; i < np.length; i++) {
          if (np[i].name.toLowerCase().indexOf(pluginName.toLowerCase()) !== -1) {
            return true;
          }
        }
        return false;
      } else {
        // 其他则返回false
        return false;
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .top-menu {
    display: flex;
    justify-content: flex-end;
    padding: 0 0 10px;
  }
</style>
