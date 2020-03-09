import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login' // 主页重定向
  },
  {
    path: '/login', component: () => import ('@/views/Login/Login.vue')  // 登录组件
  },
  {
    path: '/home', component: () => import ('@/views/Home/Home.vue'), // 主页组件
    redirect: '/index',
    children: [
      {
        path: '/index',
        component: () => import ('@/views/Home/Common/Index.vue')
      },
      // common公共
      {
        path: '/changepwd', // 修改密码
        component: () => import ('@/views/Home/Common/ChangePwd.vue')
      },
      // 教师
      {
        path: '/addsubject', // 添加题目
        component: () => import ('@/views/Home/Teacher/AddSubject.vue')
      },
      {
        path: '/showstatus', // 查询双选状态
        component: () => import ('@/views/Home/Teacher/ShowStatus.vue')
      },
      // 学生
      {
        path: '/selectsubject', // 选题
        component: () => import ('@/views/Home/Student/SelectSubject.vue')
      },
      // 教务
      {
        path: '/selectresults', //  查询双选状态
        component: () => import ('@/views/Home/Admin/SelectResults.vue')
      }
    ]
  }
]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // 如果用户访问的登录页，直接放行
  if (to.path === '/login') return next()
  // 从 sessionStorage 中获取保存的 token 值
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
