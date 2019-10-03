<template>
  <div class="home-page">
    <el-container>
      <el-header class="header">
        <div class="header-wrap">
          <el-button type="primary" icon="el-icon-s-fold" circle @click="handleCollapse"></el-button>
          <div class="header-title">浏览器插件</div>
        </div>
      </el-header>
      <el-container>
        <el-scrollbar class="container-left" wrap-class="container-left-wrap" :class="{'slide-hide': isCollapse}">
          <el-menu
            class="menu-class"
            :default-active="onRoutes"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            :collapse="isCollapse"
          >
            <template v-for="(item, index) in routerList">
              <router-link :key="index" :to="item.path">
                <el-menu-item :index="item.path">
                  <i :class="item.icon"></i>
                  <span slot="title">{{item.title}}</span>
                </el-menu-item>
              </router-link>
            </template>
          </el-menu>
        </el-scrollbar>

        <el-main class="home-main">
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
import routerList from '../dictionary/routerList';

export default {
  name: 'home',
  data: function () {
    return {
      isCollapse: false,
      routerList: routerList
    };
  },
  computed: {
    onRoutes () {
      return this.$route.path
    },
  },
  components: {

  },
  methods: {
    handleCollapse () {
      this.isCollapse = !this.isCollapse;
    },
    handleOpen () {

    },
    handleClose () {

    }
  }
}
</script>

<style lang="css" scoped>
  .container-left .menu-class {
    border-right: none;
  }
</style>

<style lang="scss" scoped>
  .home-page {

  }

  .header {
    background: #545c64;

    .header-wrap {
      display: flex;
      align-items: center;
      height: 60px;
      line-height: 60px;

      .header-title {
        padding: 20px;
        font-size: 18px;
        font-weight: bold;
        color: #ffffff;
      }
    }
  }

  .container-left {
    height: calc( 100vh - 61px);
    background: #545c64;
    transition: left 3s ease-in-out;
    flex: 0 0 auto;
  }

  .container-left-wrap {
    overflow-x: hidden !important;
  }

  .container-left:not(.slide-hide) {
    width: 200px;
  }

  .home-main {
    height: calc( 100vh - 61px);
    overflow: auto;
  }
</style>
