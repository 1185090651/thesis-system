<template>
  <div class="home-container">
    <el-container>
      <!-- 头部区域 -->
      <el-header height="80px">
        <div class="header">
          <div class="title">大学生毕业论文题目管理系统</div>
          <div class="info">
            <div class="name">{{profileInfo.c_name}}（{{profileInfo.username}}）欢迎进入系统</div>
            <div class="other">
              <span>角色：{{profileInfo.c_role}}</span>
              <span style="padding-left:20px;cursor:pointer" @click="logOut">退出</span>
            </div>
          </div>
        </div>
      </el-header>
      <el-container>
        <el-aside :width="isCollapse ? '60px' : '170px'">
          <div class="toggle-button" @click="toggleCollapse">
            <i :class="isCollapse ? 'iconfont icon-jiantou' : 'iconfont icon-xiazai6'"></i>
          </div>
          <el-menu
            :collapse="isCollapse"
            :collapse-transition="false"
            router
            :default-active="$route.path"
            unique-opened
          >
            <!-- 一级菜单 -->
            <el-submenu :index="String(item.id)" v-for="item in menuList" :key="item.id">
              <!-- 一级菜单的模板区域 -->
              <template slot="title">
                <!-- 图标 -->
                <i :class="'iconfont '+item.icon"></i>
                <!-- 文本 -->
                <span>{{ item.rights }}</span>
              </template>
              <!-- 二级菜单 -->
              <el-menu-item
                :index="`/${String(subItem.path_item)}`"
                v-for="subItem in item.children"
                :key="subItem.id"
              >
                <template slot="title">
                  <!-- 图标 -->
                  <i class="el-icon-menu"></i>
                  <!-- 文本 -->
                  <span>{{ subItem.rights_item }}</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!-- 主体区域 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { request } from "@/network/request.js";
export default {
  data() {
    return {
      // 左侧菜单数据
      menuList: [],
      // 折叠与展开
      isCollapse: false
    };
  },
  computed: {
    ...mapState(['userToken','profileInfo']),
  },
  created() {
    this.getRightsList();
  },
  methods: {
    // 点击按钮，切换菜单的折叠与展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    async getRightsList() {
      const { data: res } = await request({
        url: `/rights/${this.profileInfo.role}`,
        method: "get"
      });
      this.menuList = res.data;
    },
    // 退出
    logOut() {
        this.$store.commit('clearInfo')
        window.sessionStorage.clear()
        this.$router.push('/login')
    }
  }
};
</script>

<style lang="scss" scoped>
.el-container {
  height: 100%;
}
.home-container {
  height: 100%;
  .el-header {
    background-color: #409eff;
    display: flex;
    align-items: center;
    padding-right: 40px;
    .header {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .title {
        color: #fff;
        font-size: 30px;
      }
      .info {
        font-size: 18px;
        color: #fff;
        height: 80%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: flex-end;
      }
    }
  }
  .el-aside {
    height: 100%;
    border-right: solid 1px #e6e6e6;
    .toggle-button {
      height: 56px;
      text-align: center;
      line-height: 56px;
      cursor: pointer;
    }
    .el-menu {
      border-right: none;
    }
  }
}
.iconfont {
  margin-right: 10px;
}
</style>