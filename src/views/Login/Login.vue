<template>
  <div class="login-container">
    <div class="login-box animated bounceInDown">
      <div class="left">
        <div class="welcome">Welcome</div>
        <div class="title">毕业论文题目管理系统</div>
        <p>©2020 v1.0.0</p>
      </div>
      <div class="right">
        <el-form class="login_form" ref="loginFormRef" :model="loginForm" :rules="loginFormRules">
          <!-- 用户名 -->
          <el-form-item prop="username">
            <el-input
              v-model="loginForm.username"
              prefix-icon="iconfont icon-icon_user"
              placeholder="请输入用户名"
              clearable
            ></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              prefix-icon="iconfont icon-mima"
              type="password"
              placeholder="请输入密码"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item class="radio">
            <template>
              <el-radio v-model="loginForm.role" label="student">学生</el-radio>
              <el-radio v-model="loginForm.role" label="teacher">教师</el-radio>
              <el-radio v-model="loginForm.role" label="admin">教务</el-radio>
            </template>
          </el-form-item>
          <!-- 按钮区域 -->
          <el-form-item class="btns">
            <el-button type="plain" class="login-submit" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import  animate from "animate.css";
import { request } from '@/network/request.js'
export default {
  data() {
    return {
      // 登录表单的数据绑定对象
      loginForm: {
        username: "",
        password: "",
      // 用户身份
        role: "student"
      },
      // 表单验证规则对象
      loginFormRules: {
        //验证用户名是否合法
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 15,
            message: "用户名长度应为3-15个字符",
            trigger: "blur"
          }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "密码长度应为6-15个字符",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    // 点击登录按钮
    login() {
      // 拿到表单验证的结果
      this.$refs.loginFormRef.validate(async valid => {
        // 验证不成功 跳出程序
        if (!valid) return;
        // 同步得到后台数据
        const { data: res } = await request({
          method: "post",
          url: '/login',
          data: this.loginForm
        });
        if (res.meta.code !== 200) return this.$message.error(res.meta.msg);
        this.$message.success(res.meta.msg);
        // 将登录成功之后的 token, 保存到客户端的 sessionStorage 中
        // 项目中除了登录之外的其他API接口，必须在登录之后才能访问
        // token 只应在当前网站打开期间生效，所以将 token 保存在 sessionStorage 中
        window.sessionStorage.setItem("token", res.data.token);
        // 将用户数据存到vuex中
        this.$store.commit('saveProfile',res.data)
        // 通过编程式导航调转到后台主页，路由地址是home
        this.$router.push("/home");
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.login-container {
  background-color: #f8f8f9;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  .login-box {
    margin: 0 auto;
    width: 1000px;
    height: 500px;
    border-radius: 5px;
    box-shadow: -4px 5px 10px rgba(0, 0, 0, 0.4);
    display: flex;
    .left {
      width: 50%;
      height: 100%;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
      background-color: #409eff;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #fff;
      .welcome,
      .title {
        text-align: center;
        font-weight: 300;
        letter-spacing: 2px;
        font-size: 30px;
      }
      .title {
        margin-top: 20px;
        margin-bottom: 50px;
      }
      p {
        margin-top: 50px;
      }
    }
    .right {
      width: 50%;
      height: 100%;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      .login_form {
        width: 70%;
        display: flex;
        flex-direction: column;
        .btns {
          margin: 0 auto;
        }
        .radio {
          margin: 0 auto;
        }
        .login-submit {
          width: 200px;
          color: #409eff;
          font-size: 18px;
          letter-spacing: 2px;
          font-weight: 300;
          margin-top: 30px;
          height: 42px;
        }
      }
    }
  }
}
.el-button {
  border: 1px solid #409eff;
}

</style>