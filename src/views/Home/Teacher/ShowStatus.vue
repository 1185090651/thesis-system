<template>
  <div>
    <!-- 面包屑导航组件 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>论文管理</el-breadcrumb-item>
      <el-breadcrumb-item>查看状态</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <!-- 表格区域 -->
      <el-table :data="doubleList" border stripe>
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="题目名称" prop="subject_name" width="260"></el-table-column>
        <el-table-column label="类别" prop="subject_category"></el-table-column>
        <el-table-column label="来源" prop="subject_source"></el-table-column>
        <el-table-column label="状态" width="100">
          <template slot-scope="scope">
            <i
              class="el-icon-success"
              v-if="scope.row.c_name"
              style="color: rgb(32, 178, 170);"
            ></i>
            <i class="el-icon-error" v-else style="color: rgb(176, 7, 14)"></i>
          </template>
        </el-table-column>
        <el-table-column label="学生姓名" prop="c_name"></el-table-column>
        <el-table-column label="学生账号" prop="username"></el-table-column>
        <el-table-column label="学生电话" prop="tel"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { request } from "@/network/request.js";
import { mapState } from "vuex";

export default {
  data() {
    return {
      doubleList: []
    };
  },
  methods: {
    //  请求论文题目列表
    async getDoubleList() {
      const { data: res } = await request({
        url: "/subject/getdouble",
        method: "get",
        params: {
          id: this.profileInfo.id
        }
      });
      this.doubleList = res.data;
    }
  },
  computed: {
    ...mapState(["profileInfo"])
  },
  created() {
    this.getDoubleList();
  }
};
</script>

<style lang="scss">
table > tbody > tr > td.el-table_1_column_5{
    font-size: 20px;
}
</style>