import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)



// 其他
let otherRoutes = [{
	   path: '/home',
	   name: 'home', // 充值
	  component:resolve => {require.ensure([], function(require){resolve(require('../pages/home'));}, 'home')},
	 },
	  {
		path: '*',
		redirect: '/home'
	}
]
let routes = [...otherRoutes]

export default new Router({
	routes
})