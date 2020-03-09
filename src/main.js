import Vue from 'vue' // 引入vue组件实例
import App from './App.vue' // 引入主组件
import router from './router' // 引入路由
import store from './store' // 引入状态管理
import ElementUI from 'element-ui'; // 引入饿了么框架
import 'element-ui/lib/theme-chalk/index.css'; // 引入饿了么样式
import './globalCss/reset.css' // 引入全局样式
import './globalCss/normalize.css' //引入重置样式
import './assets/icons/iconfont.css' // 引入图标库

Vue.use(ElementUI)

Vue.prototype.$message = ElementUI.Message; // 将弹框组件挂载到Vue的原型对象上
Vue.prototype.$confirm = ElementUI.MessageBox.confirm; // 将弹框组件挂载到Vue的原型对象上


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
