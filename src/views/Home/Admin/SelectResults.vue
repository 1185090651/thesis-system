<template>
  <div>
    <!-- 面包屑导航组件 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>论文选题</el-breadcrumb-item>
      <el-breadcrumb-item>选题结果</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <el-row :gutter="20" class="elrow">
        <el-col :span="6">
          <el-input placeholder="请输入学生或老师姓名" class="input-with-select" clearable v-model="query">
            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="2" style="font-size:20px">选题功能</el-col>
        <el-col :span="6">
          <el-switch v-model="value1" active-text="开启" inactive-text="关闭" @change="changeFlag"></el-switch>
        </el-col>
      </el-row>

      <!-- 表格区域 -->
      <el-table :data="doubleList" border stripe>
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="开课学院" prop="collage" width="160"></el-table-column>
        <el-table-column label="教师姓名" prop="teacher_name" width="60"></el-table-column>
        <el-table-column label="题目名称" prop="subject_name" width="240"></el-table-column>
        <el-table-column label="类别" prop="subject_category" width="50"></el-table-column>
        <el-table-column label="来源" prop="subject_source" width="80"></el-table-column>
        <el-table-column label="题目简介" prop="subject_synopsis"></el-table-column>
        <el-table-column label="学生姓名" prop="stu_name" width="60"></el-table-column>
        <el-table-column label="学号" prop="id" width="110"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { request } from "@/network/request.js";
export default {
  data() {
    return {
      value1: true,
      doubleList: [],
      query: ''
    };
  },
  methods: {
    //  请求论文题目列表
    async getDoubleList() {
      const { data: res } = await request({
        url: "/subject/admingetdouble",
        method: "get"
      });
      this.doubleList = res.data;
    },
    // 请求是否开课标识
    async getFlag() {
      const { data: res } = await request({
        url: "/subject/getflag",
        method: "get"
      });
      this.value1 = res.data;
    },
    // 发送改变开课标识
    async changeFlag(flag) {
        const { data: res } = await request({
        url: "/subject/changeflag",
        method: "get",
        params: {
            flag: this.value1
        }
      });
      this.$message({
          message: '状态改变成功',
          type: 'success'
      });
    },
    // 搜索
    async search() {
        const { data: res } = await request({
            url: "/subject/search",
            method: "get",
            params: {
                query: this.query
            }
        })
        this.doubleList = res.data
    }
  },
  created() {
    this.getFlag()
    this.getDoubleList();
  }
};
</script>

<style lang="scss" scoped>
.elrow {
  display: flex;
  align-items: center;
}
</style>