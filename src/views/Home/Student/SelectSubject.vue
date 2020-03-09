<template>
  <div>
    <!-- 面包屑导航组件 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>论文选题</el-breadcrumb-item>
      <el-breadcrumb-item>学生选题</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="tips" v-if="!isShow">选题还未开始</div>
    <el-card v-if="isShow">
      <el-table :data="allList" border stripe>
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="开课学院" prop="collage" width="160"></el-table-column>
        <el-table-column label="题目名称" prop="subject_name" width="240"></el-table-column>
        <el-table-column label="类别" prop="subject_category" width="50"></el-table-column>
        <el-table-column label="来源" prop="subject_source" width="80"></el-table-column>
        <el-table-column label="题目简介" prop="subject_synopsis"></el-table-column>
        <el-table-column label="教师姓名" prop="c_name" width="70"></el-table-column>
        <el-table-column label="联系方式" prop="tel" width="100"></el-table-column>
        <el-table-column label="选题" width="120">
          <template slot-scope="scoped">
              <div v-if="scoped.row.select_stu_id === profileInfo.id">
            <el-link
              type="primary"
              :underline="false"
              :href="scoped.row.taskbook_path"
            >
              <i class="el-icon-document"></i>任务书
            </el-link>
             <el-tooltip class="item" effect="dark" content="取消选择" placement="top" style="margin-left:5px">
              <span
              class="icon"
              @click="cancleSubject(scoped.row.id)"
            ><i class="el-icon-error"></i></span>
              </el-tooltip>
              </div>
            <el-button
              size="mini"
              type="primary"
              v-else-if="scoped.row.select_stu_id === null"
              @click="selectSubject(scoped.row.id)"
            >选题</el-button>
            <el-button size="mini" type="danger" v-else @click="selectedClick">已选</el-button>
          </template>
        </el-table-column>
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
      isShow: false,
      allList: []
    };
  },
  computed: {
    ...mapState(["profileInfo"])
  },
  created() {
    this.getAllList();
  },
  methods: {
    async getAllList() {
      const { data: res } = await request({
        url: "/subject/getalllist",
        method: "get"
      });
      if (res.meta.code !== 200) return;
      this.isShow = true;
      this.allList = res.data;
    },
    async selectSubject(id) {
      for (let i = 0; i < this.allList.length; i++) {
        if (this.allList[i].select_stu_id === this.profileInfo.id) {
          return this.$message({
            message: "一人只能选择一个题目",
            type: "error"
          });
        }
      }
      // 弹框询问是否删除
      const confirmResult = await this.$confirm('确定选择该题目吗', '提示', {
          cancelButtonClass: 'btn-cancel'
      }).catch(err => err)
      // 如果用户确认删除，返回值为字符串 confirm
      // 如果用户取消删除，返回值为字符串 cancel
      if (confirmResult !== 'confirm') return 
      const { data: res } = await request({
        url: "/subject/select",
        method: "post",
        data: {
          stuId: this.profileInfo.id,
          subjectId: id
        }
      });
      if (res.meta.code !== 200) return;
      this.$message({
        message: res.meta.msg,
        type: "success"
      });
      this.getAllList();
    },
    async cancleSubject() {
        // 弹框询问是否删除
      const confirmResult = await this.$confirm('确定取消选择该题目吗', '提示', {
          cancelButtonClass: 'btn-cancel'
      }).catch(err => err)
      // 如果用户确认删除，返回值为字符串 confirm
      // 如果用户取消删除，返回值为字符串 cancel
      if (confirmResult !== 'confirm') return 
      const { data: res } = await request({
          url: '/subject/cancel',
          method: 'get',
          params: {
              id: this.profileInfo.id
          }
      })
      if (res.meta.code !== 200) return
      this.getAllList()
    },
    selectedClick() {
        this.$message({
            message: '此题目已被选',
            type: 'error'
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.tips {
  font-size: 50px;
  font-family: "Arial", "Microsoft YaHei", "黑体", "宋体", sans-serif;
  line-height: 500px;
  text-align: center;
}
.icon {
    font-size: 20px;
    vertical-align: middle;
    cursor: pointer;
}
.icon:hover {
    color: #09f;
}
</style>