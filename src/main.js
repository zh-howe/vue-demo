// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MetaInfo from 'vue-meta-info'
import Vuex from 'vuex'
import 'swiper/dist/css/swiper.min.css'


Vue.use(Vuex)
Vue.use(MetaInfo)

Vue.config.productionTip = false

router.afterEach( ( to, from, next ) => {
    setTimeout(()=>{
			var _hmt = _hmt || [];
			(function() {
				var hm = document.createElement("script");
				hm.src = "https://hm.baidu.com/hm.js?f169828b4b9b84ee8f69ea581498bf86";
				var s = document.getElementsByTagName("script")[0]; 
				s.parentNode.insertBefore(hm, s);
			})();
    },0);
});
router.afterEach( ( to, from, next ) => {
	window.scrollTo(0, 0)
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
	mounted() {
	  document.dispatchEvent(new Event('render-event'))
	}
})
