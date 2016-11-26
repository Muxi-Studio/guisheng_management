import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router-config'
import App from './App.vue'
import Home from './components/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

Vue.use(VueRouter)
Vue.use(ElementUI)

const router = new VueRouter({
	mode: 'history',
	base: __dirname,
	routes: routes.routes
})

new Vue({
  router,
  el: '#app',
  render: h => h(App)
})