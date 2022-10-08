import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/utils/element' // 按需引入
import '@/styles/index.scss' // 主题色
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
