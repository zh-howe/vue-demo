<template>
	<div>
		<to-header></to-header>
		<div class="cases-page">
			<div class="cases-page-link">
				<img src="../assets/img/sy.png" alt="">
				<a href="/">首页 - </a>
				<a href="/cases">精彩案例 - </a>
				<span>{{this.datao.title}}</span>
			</div>
			<div class="cases-page-left">
				<div class="cases-swiper">
					<img :src="this.datao.img" :alt="this.datao.alt">
				</div>
				<div class="cases-page-details">
					<h2>
						{{this.datao.title}}
					</h2>
					<div class="cases-page-list">
						<span>{{this.datao.building_type_id}}</span>|<span>{{this.datao.decorate_style_id}}</span>|<span>{{this.datao.building_area_id}}m²</span>
					</div>
					<span class="page-details-span">地址：{{this.datao.address}}</span>
					<p>
						案例描述：{{this.datao.description}}
					</p>
					<span class="page-price">{{this.datao.price_id}}万元</span>
				</div>
				<span class="page-content-title">案例图片：</span>
				<div class="cases-page-content" v-html="this.datao.content">
					{{this.datao.content}}
				</div>
			</div>
			<div class="cases-page-right">
				<div class="cases-page-input">
					<span class="page-title">按此风格设计</span>
					<div class="page-input">
						<form @submit.prevent="page_submit">
							<input type="text" placeholder="请输入您的姓名" name="name" v-model="inputs.name" />
							<input type="text" placeholder="请输入您的手机号码" name="tel" v-model="inputs.tel" />
							<input type="text" placeholder="请输入您的建筑面积" name="area" v-model="inputs.area" />
							<input type="submit" value="提交信息" class="page-but" />
							<span>已有<i>{{this.count}}</i>人提交</span>
						</form>
					</div>
				</div>
				<div class="cases-page-guess">
					<span class="page-title">猜你喜欢</span>
					<ul class="page-guess-ul">
						<li v-for="(item,index) in datat" :key="index" @click="onload">
							<router-link :to="`/cases_page?id=${item.id}`">
								<img :src="item.img" :alt="item.alt">
								<div class="page-details">
									<span class="page-details-span">{{item.title}}</span>
									<div class="page-details-div">
										<span>{{item.building_type_id}}</span>|<span>{{item.decorate_style_id}}</span>|<span>{{item.building_area_id}}㎡</span>
									</div>
								</div>
							</router-link>
						</li>
					</ul>
				</div>
			</div>
			<div class="cases-pages-bottom">
				<div class="cases-pages-bottom-title">
					<h3>推荐案例</h3>
					<router-link to="/cases">更多></router-link>
				</div>
				<ul class="page-ul">
					<li v-for="(item,key) in datas" :key="key" @click="onload">
						<router-link :to="`/cases_page?id=${item.id}`">
							<img :src="item.img" :alt="item.alt">
							<div class="page-details">
								<span class="page-details-span">{{item.title}}</span>
								<div class="page-details-div">
									<span>{{item.building_type_id}}</span>|<span>{{item.decorate_style_id}}</span>|<span>{{item.building_area_id}}㎡</span>
								</div>
							</div>
						</router-link>
					</li>
				</ul>
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
	var tel = /^1[3456789]\d{9}$/;
	var tel2 = /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/;
	
	export default {
		name:'cases_page',
		data(){
			return{
				count:0,
				datao:[],
				datat:[],
				datas:[],
				inputs:{
					name:'',
					tel:'',
					area:''
				}
			}
		},
		created(){
			post('/mgr/building/casedetail', {
				id:this.$route.query.id
			}).then(res => {
				this.count = res.count
				this.datao = res.res
				this.datat = res.list
				this.datas = res.pre
			}).catch(res => {
				
			});
		},
		methods:{
			onload(){
				location.reload()
			},
			page_submit(){
				if(this.inputs.name == "" || this.inputs.tel == "" || this.inputs.area == "" ){
					alert('请输入完整信息！')
				}else if(!tel.test(this.inputs.tel) && !tel2.test(this.inputs.tel)){
					alert('请输入正确手机号码！')
				}else{
					post('/mgr/building/userlike', {
						data: this.inputs,
						id:this.$route.query.id
					}).then(res => {
						if (res.code == 0) {
							alert(res.msg);
						}else if(res.code == 1){
							alert(res.msg);
						}
					}).catch(res => {
						console.log('未连接到服务器!')
					})
				}
			}
		},
		components:{
			'to-header':ToHeader,
			'to-footer':ToFooter,
			'fixed-right':FixedRight
		},
		metaInfo(){
			return{
				title: '装修案例-卯合卯装饰-北京卯合卯建筑装饰工程设计有限责任公司',
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
	.cases-page{
		.w1200;
		.dis-o;
		flex-wrap: wrap;
		.cases-page-link{
			width:1200px;
			.dis;
			font-size: 14px;
			height:20px;
			line-height: 20px;
			margin:15px 0;
			img{
				height:20px;
				margin-right:5px;
			}
			span,a{
				color:#666;
			}
		}
		.cases-page-left{
			width:900px;
			.cases-swiper{
				width:100%;
				height:526px;
				background:#f5f5f5;
				img{
					width:100%;
					height:100%;
					vertical-align: bottom;
				}
			}
			.cases-page-details{
				background:#f5f5f5;
				padding: 10px 20px;
				position: relative;
				h2{
					font-size: 23px;
					height:45px;
					line-height: 45px;
				}
				.cases-page-list{
					.dis;
					font-size: 12px;
					span{
						font-size: 14px;
						color:#666;
						padding:0 10px;
						&:nth-child(1){
							padding-left:0;
						}
					}
				}
				.page-details-span{
					font-size: 16px;
					color:#333;
				}
				p{
					margin-top:10px;
					font-size: 15px;
					color:#333;
					line-height: 26px;
				}
				.page-price{
					position: absolute;
					top:10px;
					right:20px;
					display: inline-block;
					height:45px;
					line-height: 45px;
					color:#df2f30;
					font-size: 20px;
					font-weight: 600;
				}
			}
			.page-content-title{
				font-size: 18px;
				display: inline-block;
				margin:20px 0;
			}
			.cases-page-content{
				margin: 20px 0 60px;
				text-align: center;
				span{
					font-size: 15px;
				}
				img{
					max-width:900px;
					vertical-align: bottom;
					margin-bottom:10px;
				}
			}
		}
		.cases-page-right{
			width:280px;
			.page-title{
				font-size: 15px;
				font-weight: 600;
				display: inline-block;
				padding:2px 8px;
				border-left:solid 3px #df2f30;
			}
			.page-input{
				margin:15px auto;
				text-align: center;
				input{
					width:180px;
					padding:0 10px;
					height:27px;
					margin:5px 0;
				}
				.page-but{
					background:#df2f30;
					border:0;
					color:#fff;
					display: block;
					margin:0 auto;
					margin-top:10px;
					height:35px;
				}
				span{
					font-size: 14px;
					i{
						font-style: normal;
						color:red;
					}
				}
			}
			.cases-page-guess{
				padding-top:10px;
				.page-guess-ul{
					margin:15px auto;
					li{
						text-align: center;
						a{
							display: inline-block;
							width:230px;
							border-bottom:solid 1px #ccc;
							padding-bottom:10px;
							margin-bottom:15px;
							img{
								width:230px;
								height:151px;
								vertical-align: bottom;
							}
							.page-details{
								text-align: left;
								.page-details-span{
									font-size: 15px;
									display: inline-block;
									height:30px;
									line-height: 30px;
								}
								.page-details-div{
									.dis;
									font-size: 12px;
									span{
										font-size: 12px;
										color:#666;
										padding:0 10px;
										&:nth-child(1){
											padding-left:0;
										}
									}
								}
							}
							&:hover{
								span{
									color:#df2f30;
								}
							}
						}
					}
				}
			}
		}
		.cases-pages-bottom{
			width:100%;
			margin:20px 0 30px;
			.cases-pages-bottom-title{
				.dis-o;
				height:30px;
				line-height: 30px;
				h3{
					font-size: 18px;
					border-left:solid 3px #df2f30;
					padding:0 10px;
				}
				a{
					color:#666;
					font-size: 12px;
				}
			}
			.page-ul{
				width:100%;
				margin:10px auto;
				.dis;
				border-top:solid 1px #ddd;
				padding-top:20px;
				li{
					width:240px;
					text-align: center;
					a{
						display: inline-block;
						width:220px;
						img{
							width:220px;
							height:141px;
							vertical-align: bottom;
						}
						.page-details{
							text-align: left;
							.page-details-span{
								font-size: 15px;
								display: inline-block;
								height:30px;
								line-height: 30px;
							}
							.page-details-div{
								.dis;
								font-size: 12px;
								span{
									font-size: 12px;
									color:#666;
									padding:0 10px;
									&:nth-child(1){
										padding-left:0;
									}
								}
							}
						}
						&:hover{
							span{
								color:#df2f30;
							}
						}
					}
				}
			}
		}
	}
</style>
