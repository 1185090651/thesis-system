import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate' // vuex数据持久化插件

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 用户token
    userToken: '',
    // 用户信息
    profileInfo: {}
  },
  mutations: {
    saveProfile: (state, userInfo) => {
      state.userToken = userInfo.token
      state.profileInfo = userInfo.user
    },
    clearInfo: state => {
      // 将所有用户的信息清零
      state.userToken = '',
      state.profileInfo = {}
    }
  },
  getters: {
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()]  //加上这个就可以了
})
