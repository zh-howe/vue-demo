<template>
	<div>
		<to-header @oheader="headerValue"></to-header>
		<to-search @results="results" v-bind:urls2="urls"></to-search>
		<div class="cases-lists">
			<ul class="cases-ul">
				<li v-for="(item,index) in datas" :key="index">
					<router-link :to="`/cases_page?id=${item.id}`">
						<div class="cases-img">
							<img :src="item.img" :alt="item.alt">
						</div>
						<div class="cases-content">
							<h4 class="cases-content-top">{{item.title}}</h4>
							<p class="cases-content-center">
								<span>{{item.building_type_id}}</span>|<span>{{item.decorate_style_id}}</span>|<span>{{item.building_area_id}}m²</span>
							</p>
							<p class="cases-content-bottom">
								<span class="cases-content-address">
									{{item.address}}
								</span>
								<span class="cases-content-price">{{item.price_id}}万元</span>
							</p>
						</div>
					</router-link>
				</li>
			</ul>
			<div class="paging-page" v-if="hide_show == false">
				<span @click="page_jump_0">首页</span>
				<span @click="page_jump_1">上一页</span>
				<span v-for="(item,index) in nums" :key="index" @click="page_jump(index)" class="span_num" v-if="urls[5]-2<=item&&item<=(urls[5]+2<5?5:urls[5]+2)" :class="{'color_red':active == index}" v-text="item"></span>
				<span @click="page_jump_2">下一页</span>
				<span @click="page_jump_3">尾页</span>
			</div>
		</div>
		<div class="list-none" v-show="hide_show">
			<img src="../assets/img/zanwu.png" alt="">
			<span>暂无数据</span>
		</div>
		
		<div class="cases-footer">
			
		</div>
		<to-footer></to-footer>
		<fixed-right></fixed-right>
	</div>
</template>

<script>
	import ToHeader from '../components/ToHeader'
	import ToFooter from '../components/ToFooter'
	import FixedRight from '../components/FixedRight'
	import ToSearch from '../components/ToSearch'
	import { get,post } from '../httputil/httpUtil.js'
	export default {
		name:'cases',
		data(){
			return{
				hide_show:false,//暂无数据的显示与隐藏
				datas: [],//页面数据
				nums:[],
				num:5,
				pages:1,
				urls:['','','','','1','1','15',''],//前四个是条件筛选的所选条件 后四个分别是案例综合筛选条件、分页的当前页数、分页的每个页里面有多少数据、头部搜索的关键词
				active:0
			}
		},
		created(){
			this.urls[7] = this.$route.params.value
			post('/mgr/building/search', {
				data:this.urls
			}).then(res => {
				this.datas = res.list
				this.pages = res.page
				this.opages()
			}).catch(res => {
			  
			});
		},
		methods:{
			opages(){
				if(this.pages<=5){
					for(var i = 0; i < this.pages; i ++){
						this.nums[i] = i + 1
					}
				}else{
					for(var i = 0; i < 5; i ++){
						this.nums[i] = i + 1
					}
				}
			},
			post_get(){
				post('/mgr/building/search', {
					data:this.urls,
				}).then(res => {
					this.datas = res.list
				}).catch(res => {
					
				});
			},
			onums(){
				for(var i = 0; i < this.pages; i ++){
					this.nums[i] = i + 1
				}
			},
			page_jump(index){
				this.onums()
				this.active = index
				this.urls[5] = index + 1
				this.post_get()
				//点击分页数 传给后台分页信息
			},
			page_jump_0(){
				this.onums()
				this.urls[5] = 1
				this.post_get()
				//点击首页 传给后台分页信息
				this.active = 0
				
			},
			page_jump_1(){
				this.onums()
				this.urls[5]--
				this.active--
				if(this.urls[5] <= 1){
					this.urls[5] = 1
					this.active = 0
				}
				this.post_get()
				//点击上一页 传给后台分页信息
			},
			page_jump_2(){
				this.onums()
				if(this.urls[5] >= this.pages){
					this.urls[5] = this.pages
					this.active = this.pages - 1
				}else{
					this.urls[5]++
					this.active++
				}
				this.post_get()
				//点击下一页 传给后台分页信息
			},
			page_jump_3(){
				this.onums()
				this.urls[5] = this.pages
				this.post_get()
				//点击尾页 传给后台分页信息
				this.active = this.pages - 1
			},
			results(data,url){
				this.active = 0
				this.datas = data.list//获取从子组件传来的页面数据
				this.pages = data.page//获取从子组件传来的分页信息
				this.urls = url
				this.nums = []
				this.opages()
				if(data.code == 2){//暂无数据的显示与隐藏
					this.hide_show = true
				}else{
					this.hide_show = false
				}
			},
			headerValue(value){
				this.urls[7] = value
				post('/mgr/building/search', {
					data:this.urls
				}).then(res => {
					this.datas = res.list
					this.pages = res.page
					this.opages()
				}).catch(res => {
				  
				});
			}
		},
		components:{
			'to-header':ToHeader,
			'to-footer':ToFooter,
			'fixed-right':FixedRight,
			'to-search':ToSearch
		},
		metaInfo(){
			return{
				title: '精彩案例-卯合卯装饰',
				meta: [
					{
						name: 'keywords', 
						content: '卯合卯装饰，建筑装饰，装修设计，北京装修，北京工装'
					},
					{
						name: 'description',
						content: '北京卯合卯建筑装饰工程设计有限责任公司由老、中、青三代设计人组成；我们是以建筑装饰设计为事业并愿为之奋斗终生的设计师群体之一；我们致力于探索、发现及推广更环保，更健康的生活方式；'
					}
				]
			}
		}
	}
</script>

<style lang="less">
	.cases-lists{
		.w1200;
		padding-top:20px;
		.cases-ul{
			.dis;
			flex-wrap: wrap;
			li{
				width:380px;
				margin:0 30px 20px 0;
				.guodu(.3s);
				&:nth-child(3n){
					margin-right:0;
				}
				&:hover{
					box-shadow: 1px 2px 10px #ccc;
					.guodu(.3s)
				}
				a{
					.cases-img{
						img{
							width:100%;
							height:250px;
							display: block;
						}
					}
					.cases-content{
						border:solid 1px #e4e4e4;
						border-top:0;
						padding:0 10px 10px;
						.cases-content-top{
							height:50px;
							line-height: 50px;
							font-size: 18px;
						}
						.cases-content-center{
							color:#999;
							font-size: 13px;
							span{
								font-size: 14px;
								color:#666;
								display: inline-block;
								padding:0 10px;
								&:nth-child(1){
									padding-left:0;
								}
							}
						}
						.cases-content-bottom{
							.dis-o;
							margin-top:5px;
							.cases-content-address{
								font-size: 15px;
								color:#333;
							}
							.cases-content-price{
								font-weight: 600;
								color:#df2f30;
								
							}
						}
					}
				}
			}
		}
		.paging-page{
			.dis;
			justify-content: center;
			margin:20px 0 50px;
			span{
				cursor: pointer;
				padding:0 10px;
				height:25px;
				line-height: 25px;
				font-size: 12px;
				border:solid 1px #ccc;
				margin:0 4px;
			}
			.color_red{
				color:#fff;
				border:solid 1px #e12c28;
				background:#e12c28;
			}
		}
	}
	.list-none{
		text-align: center;
		margin-bottom:80px;
		img{
			margin:10px auto;
			display: block;
		}
		span{
			font-size: 17px;
			color:#999;
		}
	}
</style>
