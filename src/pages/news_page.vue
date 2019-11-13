<template>
	<div>
		<to-header></to-header>
		<div class="news-banner">
			<img src="../assets/img/news_banner.jpg" alt="">
		</div>
		<div class="news-page-main">
			<div class="news-page-left">
				<h1 class="news-page-title">{{res.title}}</h1>
				<div class="news-page-details">
					<span>作者：{{res.author}}</span>
					<span>发布时间：{{res.datetime}}</span>
					<span>来源：{{res.source}}</span>
				</div>
				<div class="news-page-cont" v-html="res.content">
					{{res.content}}
				</div>
				<div class="news-page-bottom">
					<div class="news-page-and-down">
						<span class="news-page-up" @click="onloado">上一篇：<router-link :to="`/news_page?id=${down.id}&type=${this.$route.query.type}`">{{down.title}}</router-link></span>
						<span class="news-page-down" @click="onloadt">下一篇：<router-link :to="`/news_page?id=${up.id}&type=${this.$route.query.type}`">{{up.title}}</router-link></span>
					</div>
					<div class="news-page-share">
						
					</div>
				</div>
			</div>
			<div class="news-right">
				<div class="news-right-top">
					<span class="news-right-title">行业咨询</span>
					<ul class="news-right-ul">
						<li v-for="(item,index) in data_news" :key="index" @click="onloado">
							<router-link :to="`/news_page?id=${item.id}&type=1`">
								<div class="news-right-img">
									<img :src="item.img" :alt="item.alt">
								</div>
								<div class="news-right-cont">
									<span>{{item.title}}</span>
									<p>{{item.miaoshu}}</p>
								</div>
							</router-link>
						</li>
					</ul>
				</div>
				<img src="../assets/img/gg.jpg" alt="">
				<div class="news-right-bottom">
					<span class="news-right-title">装修指南</span>
					<ul class="news-right-ul">
						<li v-for="(item,index) in data_guide" :key="index" @click="onloadt">
							<router-link :to="`/news_page?id=${item.id}&type=1`">
								<div class="news-right-img">
									<img :src="item.img" :alt="item.alt">
								</div>
								<div class="news-right-cont">
									<span>{{item.title}}</span>
									<p>{{item.miaoshu}}</p>
								</div>
							</router-link>
						</li>
					</ul>
				</div>
				<img src="../assets/img/gg.jpg" alt="">
			</div>
		</div>
		<to-footer></to-footer>
		<fixed-right></fixed-right>
	</div>
</template>

<script>
	import ToHeader from '../components/ToHeader'
	import ToFooter from '../components/ToFooter'
	import FixedRight from '../components/FixedRight'
	import { get,post } from '../httputil/httpUtil.js'
	export default {
		name:'news_page',
		metaInfo(){
			return{
				title: this.res.title,
				meta: [
					{
						name: 'keywords', 
						content: this.res.keyword
					},
					{
						name: 'description',
						content: this.res.miaoshu
					}
				]
			}
		},
		data(){
			return{
				res:[],
				down:[],
				up:[],
				data_news:[],
				data_guide:[]
			}
		},
		created(){
			post('/mgr/building/detail', { 
				id:this.$route.query.id,
				type:this.$route.query.type
			}).then(res => {
				this.res = res.res
				this.down = res.down
				this.up = res.up
			}).catch(res => {
				console.log("链接服务器失败")
			});
			
			post('/mgr/building/recommended', { 
				
			}).then(res => {
				this.data_news = res.res
				this.data_guide = res.data
			}).catch(res => {
				console.log("链接服务器失败")
			});
		},
		methods:{
			onloado(){
				if(this.down.title == "没有了"){
					this.$router.push("/news")
				}else{
					location.reload()
				}
			},
			onloadt(){
				if(this.up.title == "没有了"){
					this.$router.push("/news")
				}else{
					location.reload()
				}
			}
		},
		components:{
			'to-header':ToHeader,
			'to-footer':ToFooter,
			'fixed-right':FixedRight
		}
	}
</script>

<style lang="less">
	.news-banner{
		height:214px;
		img{
			width:100%;
			height:100%;
			max-width: 1920px;
			display: block;
			margin:0 auto;
		}
	}
	.news-page-main{
		.w1200;
		.dis-o;
		margin:20px auto;
		.news-page-left{
			width:900px;
			.news-page-title{
				font-size: 26px;
				font-weight: 400;
				color:#000;
				margin-top:10px;
			}
			.news-page-details{
				span{
					font-size: 14px;
					color:#666;
					display: inline-block;
					margin:10px 20px 0 0;
				}
				padding-bottom:15px;
				border-bottom:solid 1px #ddd;
			}
			.news-page-cont{
				padding:20px 0;
				color:#333;
				font-size: 15px;
				line-height: 24px;
				img{
					max-width: 100%;
				}
			}
			.news-page-bottom{
				.dis-o;
				.news-page-and-down{
					span{
						display: block;
						color:#666;
						font-size: 14px;
					}
					a{
						color:#666;
						font-size: 14px;
					}
				}
			}
		}
		.news-right{
			width:270px;
			.news-right-title{
				font-size: 15px;
				font-weight: 600;
				display: inline-block;
				padding:3px 8px;
				border-left:solid 3px #df2f30;
			}
			.news-right-top{
				
			}
			.news-right-bottom{
				margin-top:10px;
			}
			img{
				width:100%;
			}
			.news-right-ul{
				margin-top:10px;
				li{
					width:100%;
					height:65px;
					margin:10px 0;
					a{
						.dis-o;
						.news-right-img{
							width:90px;
							height:58px;
							border:solid 1px #eee;
						}
						.news-right-cont{
							width:165px;
							span{
								font-size: 14px;
								display: inline-block;
								width:100%;
								.nowarp-o;
								color:#444;
							}
							p{
								font-size: 12px;
								.nowarp-t(2);
								color:#888;
								text-indent: 1em;
							}
						}
					}
				}
			}
		}
	}
</style>
