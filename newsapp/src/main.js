import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import routes from './router.config.js';
import store from './store/';
import axios from 'axios';
import Loading from './components/loading';
import filters from './filters';

Vue.use(VueRouter);
Vue.use(Loading);

axios.interceptors.request.use(function (config) {  // 发送请求
	store.dispatch('showLoading');
	return config;
}, function (error) {
	return Promise.reject(error);
});
axios.interceptors.response.use(function (response) {  // 收到响应
	store.dispatch('hideLoading');
	return response;
}, function (error) {
	return Promise.reject(error);
});
// axios.defaults.baseURL = 'http://localhost:8080/';  // 配置请求根路径
// 设置post默认头部信息
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// 其他页面在使用axios的时候直接  this.$http就可以了
Vue.prototype.$http = axios;

// 自定义过滤器
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]));

const router = new VueRouter({
	mode: 'history',  // 切换路径模式，变为history模式
	scrollBehavior: () => ({  // 滚动条滚动的行为
		y: 0
	}),
	routes: routes
});

require('./assets/css/base.css');

new Vue({
	router: router,
	store: store,
	el: '#app',
	render: h => h(App)
});
