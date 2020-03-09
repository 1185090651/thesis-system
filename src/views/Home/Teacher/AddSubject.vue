<template>
  <div>
    <!-- 面包屑导航组件 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>论文管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加题目</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary" @click="addDialogVisible = true">添加题目</el-button>
        </el-col>
      </el-row>
      <!-- 表格区域 -->
      <el-table :data="subjectList" border stripe>
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="开课学院" prop="collage" width="160"></el-table-column>
        <el-table-column label="教师姓名" prop="c_name" width="50"></el-table-column>
        <el-table-column label="题目名称" prop="subject_name" width="250"></el-table-column>
        <el-table-column label="类别" prop="subject_category" width="50"></el-table-column>
        <el-table-column label="来源" prop="subject_source" width="120"></el-table-column>
        <el-table-column label="题目简介" prop="subject_synopsis"></el-table-column>
        <el-table-column label="任务书" width="70">
            <template slot-scope="scoped">
              <el-link type="primary" :underline="false" :href="scoped.row.taskbook_path" target="_blank"><i class="el-icon-document"></i>查看</el-link>
            </template>
        </el-table-column>

        <!-- 操作 -->
        <el-table-column label="操作" width="120">
          <template slot-scope="scoped">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="editDialog(scoped.row)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="delDialog(scoped.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog title="添加题目" :visible.sync="addDialogVisible" width="632" @close="addDialogClosed">
      <!-- 内容主体区域 -->
      <el-form
        :model="addForm"
        :rules="subjectFormRules"
        ref="addFormRef"
        label-width="90px"
        hide-required-asterisk
      >
        <el-form-item label="开课学院：">
          <el-input :value="profileInfo.collage" disabled />
        </el-form-item>
        <el-form-item label="教师姓名：">
          <el-input :value="profileInfo.c_name" disabled />
        </el-form-item>
        <el-form-item label="题目名称：" prop="subject_name">
          <el-input v-model="addForm.subject_name"></el-input>
        </el-form-item>
        <el-form-item label="论文类别：" prop="subject_category">
          <el-input v-model="addForm.subject_category"></el-input>
        </el-form-item>
        <el-form-item label="论文来源：" prop="subject_source">
          <el-input v-model="addForm.subject_source"></el-input>
        </el-form-item>
        <el-form-item label="题目简介：" prop="subject_synopsis">
          <el-input type="textarea" v-model="addForm.subject_synopsis"></el-input>
        </el-form-item>
        <el-form-item label="任务书：">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :limit="1"
            :file-list="fileList"
            :http-request="getFile"
            ref="upload"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer">
        <el-button type="primary" @click="addFormSubmit">确 定</el-button>
        <el-button @click="addDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>

     <el-dialog title="修改题目" :visible.sync="editDialogVisible" width="632" @close="editDialogClosed">
      <!-- 内容主体区域 -->
      <el-form
        :model="addForm"
        :rules="subjectFormRules"
        ref="editFormRef"
        label-width="90px"
        hide-required-asterisk
      >
        <el-form-item label="开课学院：">
          <el-input :value="profileInfo.c_name" disabled />
        </el-form-item>
        <el-form-item label="教师姓名：">
          <el-input :value="profileInfo.collage" disabled />
        </el-form-item>
        <el-form-item label="题目名称：" prop="subject_name">
          <el-input v-model="addForm.subject_name"></el-input>
        </el-form-item>
        <el-form-item label="论文类别：" prop="subject_category">
          <el-input v-model="addForm.subject_category"></el-input>
        </el-form-item>
        <el-form-item label="论文来源：" prop="subject_source">
          <el-input v-model="addForm.subject_source"></el-input>
        </el-form-item>
        <el-form-item label="题目简介：" prop="subject_synopsis">
          <el-input type="textarea" v-model="addForm.subject_synopsis"></el-input>
        </el-form-item>
        <el-form-item label="任务书：">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :limit="1"
            :file-list="fileList"
            :http-request="getFile"
            ref="upload"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer">
        <el-button type="primary" @click="editFormSubmit">确 定</el-button>
        <el-button @click="editDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { request } from "@/network/request.js";
import { mapState } from "vuex";
export default {
  data() {
    return {
      // 题目列表
      subjectList: [],
      // 添加对话框的显示与隐藏
      addDialogVisible: false,
      // 修改对话框的显示与隐藏
      editDialogVisible: false,
      // 添加对话框数据
      addForm: {
        rid: "",
        subject_name: "",
        subject_category: "",
        subject_source: "",
        subject_synopsis: "",
        taskbook_path: ""
      },
      subjectFormRules: {
        subject_name: [
          { required: true, message: "题目不能为空", trigger: "blur" }
        ],
        subject_category: [
          { required: true, message: "类别不能为空", trigger: "blur" }
        ],
        subject_source: [
          { required: true, message: "来源不能为空", trigger: "blur" }
        ],
        subject_synopsis: [
          { required: true, message: "简介不能为空", trigger: "blur" }
        ]
      },
      fileList: [],
      file: {},
      old_path: ''
    };
  },
  methods: {
    //  请求论文题目列表
    async getSubjectList() {
      const { data: res } = await request({
        url: "/subject/getlist",
        method: "get",
        params: {
          id: this.profileInfo.id
        }
      });
      this.subjectList = res.data;
    },
    // 重置表单校验
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
      this.$refs.upload.clearFiles()
    },
    editDialogClosed() {
      this.$refs.editFormRef.resetFields();
      this.$refs.upload.clearFiles()
    },
    // 添加表单提交
    addFormSubmit() {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return;
        const fd = new FormData();
        fd.append("filename", this.file);
        const config = { headers: { "Content-Type": "multipart/form-data" } };
        const { data: upload } = await request({
          url: "/subject/upload",
          method: "post",
          config,
          data: fd
        });
        this.addForm.taskbook_path = upload.data
        const { data: res } = await request({
          url: "/subject/add",
          method: "post",
          data: this.addForm
        });
        if (res.meta.code !== 200) return 
        this.$message.success(res.meta.msg)
        this.addDialogVisible = false;
        this.getSubjectList();
      });
    },
    getFile(item) {
      this.file = item.file;
    },
    async delDialog(row) {
        // 弹框询问是否删除
      const confirmResult = await this.$confirm('此操作将永久删除该论文题目, 是否继续?', '提示', {
          cancelButtonClass: 'btn-cancel'
      }).catch(err => err)
      // 如果用户确认删除，返回值为字符串 confirm
      // 如果用户取消删除，返回值为字符串 cancel
      if (confirmResult !== 'confirm') return 
      const { data: res } = await request({
        url: `/subject/del`,
        method: "get",
        params: {
            id: row.subject_id,
            taskbook_path: row.taskbook_path
        }
      });
      if (res.meta.code !== 200) return this.$message.error(res.meta.msg)
      this.$message.success(res.meta.msg)
      this.getSubjectList()
    },
    editDialog(row) {
        this.editDialogVisible = true;
        this.addForm = row
    },
    // 修改题目
    editFormSubmit() {
        this.$refs.editFormRef.validate(async valid => {
        if (!valid) return;
        const fd = new FormData();
        fd.append("filename", this.file);
        const config = { headers: { "Content-Type": "multipart/form-data" } };
        const { data: upload } = await request({
          url: "/subject/upload",
          method: "post",
          config,
          data: fd
        });
        if (upload.meta.code !== 200) return this.$message({
            message: upload.meta.msg,
            type: 'error'
        });
        this.addForm.new_taskbook_path = upload.data
        const { data: res } = await request({
          url: "/subject/edit",
          method: "post",
          data: this.addForm
        });
        if (res.meta.code !== 200) return 
        this.$message.success(res.meta.msg)
        this.editDialogVisible = false;
        this.getSubjectList();
      });
    }
  },
  created() {
    this.addForm.rid = this.profileInfo.id;
    this.getSubjectList();
  },
  computed: {
    ...mapState(["profileInfo"])
  }
};
</script>

<style lang="scss" scoped>
</style>