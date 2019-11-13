import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index.vue'
import about from '@/pages/about.vue'
import news from '@/pages/news.vue'
import news_page from '@/pages/news_page.vue'
import cases from '@/pages/cases.vue'
import cases_page from '@/pages/cases_page.vue'
import video from '@/pages/video.vue'
import offer from '@/pages/offer.vue'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name:'index',
			component:index
		},
		{
			path: '/offer',
			name:'offer',
			component:offer
		},
		{
			path: '/cases',
			name: 'cases',
			component:cases
		},
		{
			path:'/cases_page',
			name:'cases_page',
			component:cases_page
		},
		{
			path: '/news',
			name:'news',
			component:news
		},
		{
			path: '/news_page',
			name:'news_page',
			component:news_page
		},
		{
			path: '/video',
			name: 'video',
			component:video
		},
		{
			path: '/about',
			name:'about',
			component:about
		}
	],
	mode:'history'//history去掉# 需要后端配合    默认hash
})
