import routes from './router-config'
import App from './App.vue'
import { 
	Button, 
	Select,
	Pagination,
	Menu,
	Submenu,
	MenuItem,
	MenuItemGroup,
	Input,
	Radio,
	RadioGroup,
	RadioButton,
	Form,
    FormItem,
	Table,
	TableColumn,
	Row,
	Col,
	Card,
	Tag,
	Popover,
	DatePicker,
	Notification,
        } from 'element-ui'
import './scss/reset.scss'

Vue.use(VueRouter)
Vue.use(Button)
Vue.use(Select)
Vue.use(Pagination)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Input)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Tag)
Vue.use(Popover)
Vue.use(DatePicker)

Vue.prototype.$notify = Notification;



const router = new VueRouter({
	mode: 'history',
	base: '/admin',
	routes: routes.routes
})

new Vue({
  router,
  el: '#app',
  render: h => h(App)
})