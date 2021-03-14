import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './https'
import * as echarts from 'echarts'
import VueAMap from 'vue-amap'
import '@/assets/css/reset.css'
import '@/assets/css/index.css'

Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  key: '76b4ae7a2c05f04a47c15714e27ab564',
  plugin: ['AMap.ToolBar', 'AMap.PlaceSearch', 'AMap.Geolocation', 'AMap.Geocoder'],
  v: '1.4.4',
})
Vue.prototype.$echarts = echarts
axios.defaults.baseURL = '/CompanyWebsiteApi/WebManage/OfficialWebsite/'
axios.defaults.timeout = 8000
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
