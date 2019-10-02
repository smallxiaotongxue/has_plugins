<template>
  <div class="home-page">
    <el-container>
      <el-header class="header">
        <div class="header-wrap">
          <div class="header-title">插件查询</div>
        </div>
      </el-header>
      <el-container>
        <el-aside class="aside" width="200px">
          <el-menu
            default-active="1"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-menu-item index="1">
              <i class="el-icon-menu"></i>
              <span slot="title">浏览器信息</span>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-document"></i>
              <span slot="title">PC信息 (IE)</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  components: {

  },
  methods: {
    handleOpen () {

    },
    handleClose () {

    }
  }
}
</script>

<style lang="scss" scoped>
  .header {
    background: #545c64;

    .header-wrap {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 60px;
      line-height: 60px;

      .header-title {
        font-size: 18px;
        font-weight: bold;
        color: #ffffff;
      }
    }
  }

  .aside {
    height: calc( 100vh - 60px);
    background: #545c64;
  }
</style>
