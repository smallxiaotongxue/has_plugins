<template>
  <div>
    <div class="btn-wrap">
      <el-button type="primary" size="small" round @click="html2canvas()">生成图片</el-button>
    </div>

    <el-dialog
      title="Image"
      :visible.sync="imgVisible"
      width="70%"
      :before-close="closeDialog">
      <div class="image-wrap">
        <img :src="imgSrc" alt="">
      </div>
    </el-dialog>
  </div>
</template>

<script>
import html2canvas from 'html2canvas'
import FileSaver from 'file-saver'

export default {
  name: 'create-image',
  props: {
    targetId: {
      type: String,
      default: ''
    },
    imageName: {
      type: String,
      default: 'data-img'
    },
  },
  data: function () {
    return {
      imgVisible: false,
      imgSrc: '',
    };
  },
  methods: {
    closeDialog () {
      this.imgVisible = false;
      this.imgSrc = '';
    },
    dataURLToBlob (dataURL) {
      var BASE64_MARKER = ';base64,'
      var parts
      var contentType
      var raw

      if (dataURL.indexOf(BASE64_MARKER) === -1) {
        parts = dataURL.split(',')
        contentType = parts[0].split(':')[1]
        raw = decodeURIComponent(parts[1])

        return new Blob([raw], { type: contentType })
      }

      parts = dataURL.split(BASE64_MARKER)
      contentType = parts[0].split(':')[1]
      raw = window.atob(parts[1])
      var rawLength = raw.length
      var uInt8Array = new Uint8Array(rawLength)

      for (var i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i)
      }

      return new Blob([uInt8Array], { type: contentType })
    },
    html2canvas () {
      let name = this.imageName || 'data';
      if (!this.targetId) {
        this.$message.error('请传入目标元素Id');
        return false;
      }
      // debugger;
      // console.log(document.getElementById(this.targetId));

      html2canvas(document.getElementById(this.targetId)).then((canvas) => {
        var a = document.createElement('a');
        document.body.appendChild(a);
        var url = canvas.toDataURL();
        var isSupportDownload = 'download' in document.createElement('a')

        if (!isSupportDownload) {
          if ('msSaveOrOpenBlob' in navigator) {
            // Microsoft Edge and Microsoft Internet Explorer 10-11
            const fileBlob = this.dataURLToBlob(canvas.toDataURL('image/jpeg').replace('image/jpeg', 'image/octet-stream'));
            const fileName = `${name}.jpg`;
            FileSaver.saveAs(fileBlob, fileName);
          } else {
            // IE9 生成图片展示本地
            this.imgVisible = true;
            this.imgSrc = url;

            // a.href = url; // url路径太长不支持
            // a.target = '_blank';
            // a.click()
          }
        } else {
          // standard code for Google Chrome, Mozilla Firefox etc
          a.href = url
          a.download = name || 'pc-message'
          a.click()
        }

        document.body.removeChild(a);
      })
    },
  }
}
</script>

<style scoped>
  .btn-wrap {
    display: flex;
    justify-content: flex-end;
    padding: 0 0 10px;
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
