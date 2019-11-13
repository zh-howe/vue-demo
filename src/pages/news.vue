<template>
	<div>
		<to-header @oheader="headerValue"></to-header>
		<div class="news-banner">
			<img src="../assets/img/news_banner.jpg" alt="">
		</div>
		<div class="news-main">
			<div class="news-left">
				<div class="news-list-title">
					<span v-for="(item,index) in news_list" :class="{'active':okey == index}" @click="list_title(index)">{{item}}</span>
				</div>
				<ul class="news-left-ul">
					<li v-for="(item,index) in data_list" :key="index">
						<router-link :to="`/news_page?id=${item.id}&type=${list_id}`" append>
						<div class="news-ul-img">
							<img :src="item.img" :alt="item.alt">
						</div>
						<div class="news-ul-content">
							<span>{{item.title}}</span>
							<p>{{item.miaoshu}}</p>
							<div class="news-ul-time">
								<time>{{item.date}}</time>
								<span>阅读详情</span>
							</div>
						</div>
						</router-link>
					</li>
				</ul>
				<div class="news-paging" v-show="ront">
					<span @click="page_jump_0">首页</span>
					<span @click="page_jump_1">上一页</span>
					<span v-for="(item,index) in nums" :key="index" @click="page_jump(index)" v-if="offset-2<=item&&item<=(offset+2<5?5:offset+2)" :class="{'color-red':active == index}">{{item}}</span>
					<span @click="page_jump_2">下一页</span>
					<span @click="page_jump_3">尾页</span>
				</div>
			</div>
			<div class="news-right">
				<div class="news-right-top">
					<span class="news-right-title">行业咨询</span>
					<ul class="news-right-ul">
						<li v-for="(item,index) in data_news" :key="index">
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
						<li v-for="(item,index) in data_guide" :key="index">
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
		name:'news',
		data(){
			return{
				nums:[],
				urls:[],
				false_true:[true,true],
				active:0,
				news_list:['全部动态','行业咨询','公司新闻','装修指南'],
				okey:0,
				data_list:[],
				data_news:[],
				data_guide:[],
				offset:0, //列表分页 当前页
				length:6 ,//列表分页 每页显示的数据
				pages:1 ,//列表分页 总页数
				ront:true,
				ovalue:'',
				list_id:0
			}
		},
		created(){
			this.ovalue = this.$route.params.value
			this.post_get()
			
			post('/mgr/building/recommended', { 
				
			}).then(res => {
				this.data_news = res.res
				this.data_guide = res.data
			}).catch(res => {
				console.log("链接服务器失败")
			});
		},
		methods:{
			post_get(){
				post('/mgr/building/newlist', { 
					id:this.okey+1,
					offset:this.offset,
					length:this.length,
					value:this.ovalue
				}).then(res => {
					this.data_list = res.list
					this.pages = res.page
					if(res.page<=5){
						this.ofor();
					}else{
						for(var i = 0; i < 5; i ++){
							this.nums[i] = i + 1
						}
					}
				}).catch(res => {
					console.log("链接服务器失败")
				});
			},
			post_get2(){
				post('/mgr/building/newlist', {
					id:this.okey+1,
					offset:this.offset,
					length:this.length
				}).then(res => {
					this.data_list = res.list
				}).catch(res => {
					console.log("链接服务器失败")
				});
			},
			ofor(){
				for(var i = 0; i < this.pages; i ++){
					this.nums[i] = i + 1
				}
			},
			list_title(index){ //点击分类 重新渲染数据
				this.okey = index
				this.offset = 0
				this.active = 0
				this.nums = []
				this.post_get()
				this.list_id = index
			},
			page_jump(index){
				this.ofor();
				this.active = index
				this.offset = index
				this.post_get2();
			},
			page_jump_0(){
				this.ofor();
				this.offset = 0
				this.active = 0
				this.post_get2();
			},
			page_jump_1(){
				this.ofor();
				this.offset--
				this.active--
				if(this.offset <= 1){
					this.offset = 0
					this.active = 0
				}
				this.post_get2();
			},
			page_jump_2(){
				this.ofor();
				this.offset++
				this.active++
				if(this.offset >= this.pages){
					this.offset = this.pages - 1
					this.active = this.pages - 1
				}
				this.post_get2();
			},
			page_jump_3(){
				this.ofor();
				this.offset = this.pages - 1
				this.active = this.pages - 1
				this.post_get2();
			},
			headerValue(value){
				this.ovalue = value
				this.post_get()
			}
		},
		components:{
			'to-header':ToHeader,
			'to-footer':ToFooter,
			'fixed-right':FixedRight
		},
		metaInfo(){
			return{
				title: '装修资讯-卯合卯装饰-北京卯合卯建筑装饰工程设计有限责任公司',
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
	.news-main{
		.w1200;
		.dis-o;
		margin:20px auto;
		.news-left{
			width:900px;
			.news-list-title{
				height:40px;
				line-height: 40px;
				border-bottom:solid 1px #ccc;
				.dis;
				span{
					font-size: 14px;
					color:#333;
					display: inline-block;
					padding:0 15px;
					cursor: pointer;
				}
				.active{
					background:#e12c28;
					color:#fff;
				}
			}
			.news-left-ul{
				li{
					border-bottom:dashed 1px #ddd;
					padding:20px 0;
					a{
						.dis-o;
						.news-ul-img{
							width:200px;
							height:130px;
							border:solid 1px #eee;
							img{
								width:100%;
								height:100%;
							}
						}
						.news-ul-content{
							width:680px;
							span{
								font-size: 17px;
							}
							p{
								font-size: 14px;
								height:60px;
								margin:10px 0;
								.nowarp-t(3);
								text-indent: 2em;
								color:#888;
							}
							.news-ul-time{
								.dis-o;
								height:30px;
								line-height: 30px;
								time{
									font-size: 14px;
									color:#888;
								}
								span{
									font-size: 13px;
									padding:0 15px;
									border:solid 1px #ccc;
									color:#666;
								}
							}
						}
					}
				}
			}
			.news-paging{
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
				.color-red{
					color:#fff;
					border:solid 1px #e12c28;
					background:#e12c28;
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
				margin-top:30px;
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
							img{
								width:100%;
								height:100%;
							}
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
