import App from './App'
import request from './utils/request.js'
import timeFormat from './utils/time.js'
import action from './utils/action.js'
// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
Vue.prototype.request = request
Vue.prototype.timeFormat = timeFormat
Vue.prototype.action = action
App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	app.config.globalProperties.$request = request
	console.log(app);
	return {
		app
	}
}
// #endif