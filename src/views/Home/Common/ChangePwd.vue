<template>
<div>

 <!-- 面包屑导航组件 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户设置</el-breadcrumb-item>
      <el-breadcrumb-item>修改密码</el-breadcrumb-item>
    </el-breadcrumb>
  <div class="change_pwd-container">
    <el-form
      :model="editForm"
      :rules="subjectFormRules"
      ref="editFormRef"
      label-width="90px"
      hide-required-asterisk
    >
      <el-form-item label="原密码：" prop="old_password">
        <el-input v-model="editForm.old_password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="新密码：" prop="new_password">
        <el-input v-model="editForm.new_password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码：" prop="confirm_password">
        <el-input v-model="editForm.confirm_password" type="password"></el-input>
      </el-form-item>
    </el-form>
    <el-button class="confirm_change" @click="confirmChange">确认修改</el-button>
  </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { request } from '@/network/request.js'
export default {
    computed: {
        ...mapState(['profileInfo'])
    },
  data() {
    // 自定义密码验证方式
    const checkPassword = (rule, value, callback) => {
      if (this.editForm.new_password === this.editForm.confirm_password) {
        callback();
      } else {
        return callback(new Error("密码不一致"));
      }
    };
    return {
      editForm: {
        old_password: "",
        new_password: "",
        confirm_password: ""
      },
      subjectFormRules: {
        old_password: [
          { required: true, message: "密码不能为空", trigger: "blur" }
        ],
        new_password: [
          { required: true, message: "密码不能为空", trigger: "blur" }

        ],
        confirm_password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { validator: checkPassword, message: "密码不一致", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
      // 修改密码
      confirmChange() {
         this.$refs.editFormRef.validate(async valid => {
        if (!valid) return;
        const { data: res } = await request({
          url: "/changepwd",
          method: "post",
          data: {
              data: this.editForm,
              userInfo: this.profileInfo
          }
        });
        if (res.meta.code !== 200) return this.$message({
            message: res.meta.msg,
            type: 'error'
        });
        this.$message({
            message: res.meta.msg,
            type: 'success'
        });
        this.$refs.editFormRef.resetFields()
         })
      }
  },
};
</script>

<style lang="scss" scoped>
.change_pwd-container {
  padding-top: 50px;
  width: 25%;
  margin: 0 30%;
  .confirm_change {
    margin-top: 20px;
    margin-left: 50%;
  }
}
</style>