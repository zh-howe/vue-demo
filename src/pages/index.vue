<template>
	<div class="index-page">
		<to-header></to-header>
		<div class="banner">
			<swiper :options="swiperOption" ref="mySwiper">
				<swiper-slide v-for="(item,index) in banner" :key="index">
					<router-link :to="`/news_page?id=${item.id}`" :title="item.alt">
						<img :src="item.src" :alt="item.alt">
					</router-link>
				</swiper-slide>
				<div class="swiper-pagination" slot="pagination"></div>
			</swiper>
			<div class="banner-xinx">
				
				<form @submit.prevent="banner_submit">
					<div class="banner-form">
						<span class="banner-title">填写信息获取设计方案</span>
						<input type="text" placeholder="您的称呼" name="name" v-model="banner_but.name">
						<input type="text" placeholder="您的联系方式" name="tel" v-model="banner_but.tel">
						<input type="text" placeholder="小区/楼盘名称" name="areaname" v-model="banner_but.areaname">
						<select name="zhuangxiu" v-model="banner_but.decorate">
							<option value="装修类型">装修类型</option>
							<option v-for="(item,index) in banner_option" :key="index" :value="item.id">{{item.name}}</option>
						</select>
						<input type="submit" value="免费获取设计方案" class="banner-but">
						<span class="banner-rexian">拨打公司热线：<i>010-67765605</i></span>
						<span class="banner-num">累计获取设计方案人数：<i>99</i></span>
					</div>
				</form>
			</div>
		</div>
		<div class="adtage">
			<ul>
				<li>
					<div class="adtage-img">
						<img src="../assets/img/01.jpg" alt="">
						<div></div>
					</div>
					<span>设计新颖</span>
					<p>风格多样 自由组合 灵活搭配 别具一格的设计优势</p>
				</li>
				<li>
					<div class="adtage-img">
						<img src="../assets/img/02.jpg" alt="">
						<div></div>
					</div>
					<span>健康环保</span>
					<p>采用环保材料 杜绝隐患 质量保证 为您的健康负责</p>
				</li>
				<li>
					<d<div class="adtage-img">
						<img src="../assets/img/03.jpg" alt="">
						<div></div>
					</div>
					<span>高性价比</span>
					<p>专业定制 充分发挥空间价值 做到最优性价比装修</p>
				</li>
				<li>
					<div class="adtage-img">
						<img src="../assets/img/04.jpg" alt="">
						<div></div>
					</div>
					<span>品牌打造</span>
					<p>精选国内外品牌 量身打造 为您呈现不一样的生活方式</p>
				</li>
				<li>
					<div class="adtage-img">
						<img src="../assets/img/05.jpg" alt="">
						<div>
							<span></span>
						</div>
					</div>
					<span>一站式整装</span>
					<p>优质的施工体系 一站式整体家装 让您更省心</p>
				</li>
			</ul>
		</div>
		<div class="baojia">
			<div class="baojia-form">
				<div class="baojia-left">
					<div class="baojia-left-l">
						<img src="../assets/img/06.jpg" alt="">
						<span>
							免费预测家装费用<br/>
							<i>— · 卯合卯建筑装饰 · —</i>
						</span>
					</div>
					<div class="baojia-left-r">
						<div class="baojia-left-bg">
							<i>
								<router-link to="/video">
									<img src="../assets/img/audio.png" alt="">
								</router-link>
							</i>
						</div>
					</div>
				</div>
				<div class="baojia-right">
					<span class="baojia-title">我家装修要花多少钱？</span>
					<i class="baojia-border"></i>
					<form ref="baojia" @submit.prevent="submit">
						<div class="baojia-ziliao">
							<div class="baojia-zl-left">
								<div class="baojia-huxing">
									<span>房屋户型</span>
									<select name="bedroom" v-model="inputtext.bedroom">
										<option value="2室">2室</option>
										<option value="3室">3室</option>
										<option value="4室">4室</option>
										<option value="5室">5室</option>
										<option value="6室">6室</option>
										<option value="更多">更多</option>
									</select>
									<select name="living" v-model="inputtext.living">
										<option value="1厅">1厅</option>
										<option value="2厅">2厅</option>
										<option value="3厅">3厅</option>
										<option value="4厅">4厅</option>
										<option value="5厅">5厅</option>
										<option value="更多">更多</option>
									</select>
									<select name="toilet" v-model="inputtext.toilet">
										<option value="1卫">1卫</option>
										<option value="2卫">2卫</option>
										<option value="3卫">3卫</option>
										<option value="4卫">4卫</option>
										<option value="5卫">5卫</option>
										<option value="6卫">6卫</option>
										<option value="更多">更多</option>
									</select>
								</div>
								<div class="baojia-mianji">
									<span>房屋面积</span>
									<input type="text" placeholder="房屋面积㎡" name="area" v-model="inputtext.area" maxlength="15">
								</div>
								<div class="baojia-name">
									<span>您的称呼</span>
									<input type="text" placeholder="您的称呼" name="name" v-model="inputtext.name" maxlength="10">
								</div>
								<div class="baojia-tel">
									<span>您的电话</span>
									<input type="text" placeholder="您的联系方式" name="tel" v-model="inputtext.tel">
								</div>
							</div>
							<div class="baojia-zl-right">
								<input type="submit" value="立即获取报价">
								<router-link to="/offer">在线获取报价></router-link>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
		<div class="case">
			<main-title title="案例分享" content="数万套精品案例作品，融合时尚元素潮流理"></main-title>
			<ul class="case-ul">
				<li v-for="(item,index) in cases" :key="index" v-if="index < 8">
					<router-link :to="`/cases_page?id=${item.id}`" :title="item.alt">
						<img :src="item.img" :alt="item.alt">
						<div>
							<span>{{item.title}}</span>
							<span>造价：{{item.price_id}}万</span>
						</div>
					</router-link>
				</li>
			</ul>
		</div>
		<div class="step">
			<main-title title="服务流程" content="标准化精心服务，品质保证高端体验"></main-title>
			<ul class="step-ul">
				<li>
					<div>
						<img src="../assets/img/icon01.png">
					</div>
					<span>装修咨询</span>
				</li>
				<li>
					<div>
						<img src="../assets/img/icon02.png">
					</div>
					<span>设计测量</span>
				</li>
				<li>
					<div>
						<img src="../assets/img/icon03.png">
					</div>
					<span>签订设计协议</span>
				</li>
				<li>
					<div>
						<img src="../assets/img/icon04.png">
					</div>
					<span>效果图预览</span>
				</li>
				<li>
					<div>
						<img src="../assets/img/icon05.png">
					</div>
					<span>签订装修合同</span>
				</li>
				<li>
					<div>
						<img src="../assets/img/icon06.png">
					</div>
					<span>工程施工</span>
				</li>
				<li>
					<div>
						<img src="../assets/img/icon07.png">
					</div>
					<span>验收安装</span>
				</li>
				<li>
					<div>
						<img src="../assets/img/icon08.png">
					</div>
					<span>售后服务</span>
				</li>
			</ul>
		</div>
		<div class="news">
			<main-title title="装修咨询" content="海量装修攻略，让您深入了解装修的各个环节，给自己的家更多想象空间，发现更多装修灵感"></main-title>
			<div class="news-main">
				<div class="news-left" v-for="(item,index) in newspage" :key="index" v-if="item.status == 0">
					<router-link :to="`/news_page?id=${item.id}&type=1`">
						<div>
							<img :src="item.img" :alt="item.alt">
						</div>
					</router-link>
					<router-link :to="`/news_page?id=${item.id}&type=1`">
						<span>{{item.title}}</span>
					</router-link>
					<time>{{item.date[0]}}-{{item.date[1]}}-{{item.date[2]}}</time>
					<p>
						{{item.describe}}
					</p>
				</div>
				<ul class="news-right">
					<router-link v-for="(item,index) in newspage" :key="index" v-if="item.status == 1" :to="`/news_page?id=${item.id}&type=1`">
						<li>
							<div class="news-time">
								<time class="news-day">{{item.date[2]}}</time>
								<time class="news-month">/{{item.date[1]}}</time>
							</div>
							<div class="news-content">
								<div class="news-title">{{item.title}}</div>
								<p>​{{item.miaoshu}}</p>
							</div>
						</li>
					</router-link>
				</ul>
			</div>
		</div>
		<div class="build">
			<main-title title="装修视频" content="看装修视频，体验最酷的装修风格！"></main-title>
			<ul class="build-ul">
				<li v-for="(item,index) in builds" v-if="index<3" :key="index">
					<div class="build-img">
						<img :src="item.img">
					</div>
					<div class="visit" @click="videoPlay(index)">
						<div class="visit-span"><span>{{item.title}}</span><span>点击观看</span></div>
						<div class="visit-img">
							<img src="../assets/img/visit3.png">
						</div>
					</div>
				</li>
			</ul>
		</div>
		<div class="start-stop" v-show="state">
			<div class="start-stop-video">
				<img src="../assets/img/gaunbi.png" @click="pause">
				<video preload controls controlsList="nodownload" ref="pause">
					<source type='video/mp4'></source>
				</video>
			</div>
		</div>
		<div class="link">
			<div class="link-title">
				<span>友情链接</span>
			</div>
			<ul class="link-ul">
				<li v-for="(item,index) in links" :key="index"><a :href="item.href" target="_blank">{{item.name}}</a></li>
			</ul>
		</div>
		<fixed-right></fixed-right>
		<to-footer></to-footer>
	</div>
</template>

<script>
	import ToHeader from '../components/ToHeader'
	import ToFooter from '../components/ToFooter'
	import FixedRight from '../components/FixedRight'
	import MainTitle from '../components/MainTitle'
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	import { get, post } from '../httputil/httpUtil.js'
	var tel = /^1[3456789]\d{9}$/;
	var tel2 = /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/;
	export default {
		metaInfo(){
			return{
				title: this.tdk.title,
				meta: [
					{
						name: 'keywords', 
						content: this.tdk.keywords
					},
					{
						name: 'description',
						content: this.tdk.description
					}
				]
			}
		},
		data () {
			return{
				banner_but:{
					name:'',
					tel:'',
					areaname:'',
					decorate:'装修类型'
				},
				banner_option:[],
				inputtext:{
					bedroom:'3室',
					living:'1厅',
					toilet:'2卫',
					area:'',
					name:'',
					tel:''
				},
				banner:[],
				urls:['','','','','1','1','15'],
				state:false,
				cases:[],
				builds:[],
				newspage:[],
				links:[
					{
						name:'北京建筑装饰',
						href: 'http://www.m-h-m.cn'
					}
				],
				
				swiperOption: {
					notNextTick: true,
					//循环
					loop:true,
					//设定初始化时slide的索引
					initialSlide:0,
					//自动播放
					autoplay:true,
					autoplay: {
					    delay: 4000,
					    stopOnLastSlide: false,
					    disableOnInteraction: false,
					},
					// 设置轮播
					effect : 'fade',
					//滑动速度
					speed:800,
					//滑动方向
					direction : 'horizontal',
					//滑动之后回调函数
					on: {
						slideChangeTransitionEnd: function(){
						// console.log(this.activeIndex);//切换结束时，告诉我现在是第几个slide
						},
					},
					//分页器设置         
					pagination: {
						el: '.swiper-pagination',
						clickable :true
					}
				},
				swiperSlides: [1, 2, 3],
				tdk:{
					title:'',
					keywords:'',
					description:''
				}
				
			}
		},
		created(){
			post('/mgr/building/site', {
				
			}).then(res => {
				this.tdk.title = res.sitetitle
				this.tdk.keywords = res.keyword
				this.tdk.description = res.sitedetail
			}).catch(res => {
				console.log('未连接到服务器!')
			}),
			post('/mgr/building/get_decorate_data', {
				
			}).then(res => {
				this.banner_option = res
			}).catch(res => {
			  
			});
			
			post('/mgr/building/banner', {
				
			}).then(res => {
				this.banner = res;
			}).catch(res => {
			 	
			});
			
			post('/mgr/building/search', {
				data:['','','','','3','1','15','0'],
			}).then(res => {
				this.cases = res.list;
			}).catch(res => {
			  
			});
			
			post('/mgr/building/indexNews', {
				
			}).then(res => {
				this.newspage = res;
			}).catch(res => {
			  
			});
			
			post('/mgr/building/get_video_data', {
				
			}).then(res => {
				this.builds = res;
			}).catch(res => {
			  
			});
			
			post('/mgr/building/links', {
				
			}).then(res => {
				this.links = res;
			}).catch(res => {
			  
			});
			
		},
		computed: {
			swiper() {
				return this.$refs.mySwiper.swiper;
			}
		},
		methods:{
			videoPlay(index){
				this.state = true
				this.$refs.pause.src = this.builds[index].src
				this.$refs.pause.play()
			},
			pause(){
				this.state = false
				this.$refs.pause.pause()
			},
			banner_submit(){
				if(this.banner_but.areaname == "" || this.banner_but.name == "" || this.banner_but.tel == "" ){
					alert('请输入完整信息！')
				}else if(!tel.test(this.banner_but.tel) && !tel2.test(this.banner_but.tel)){
					alert('请输入正确手机号码！')
				}else if(this.banner_but.decorate == '装修类型'){
					alert('请选择装修类型！')
				}else{
					post('/mgr/building/scheme', {
						data: this.banner_but
					}).then(res => {
						if (res.code == 0) {
							alert(res.msg);
						}else if(res.code == 1){
							alert(res.msg);
						}
					}).catch(res => {
					  console.log(res)
					})
				}
			},
			submit(){
				if(this.inputtext.area == "" || this.inputtext.name == "" || this.inputtext.tel == "" ){
					alert('请输入完整信息！')
				}else if(!tel.test(this.inputtext.tel) && !tel2.test(this.inputtext.tel)){
					alert('请输入正确手机号码！')
				}else{
					post('/mgr/building/inquiry', {
						data: this.inputtext
					}).then(res => {
						if (res.code == 0) {
							alert(res.msg);
						}else if(res.code == 1){
							alert(res.msg);
						}
					}).catch(res => {
					  console.log(res)
					})
				}
			}
		
		},
		components:{
			swiper,  
			swiperSlide,
			'to-header':ToHeader,
			'to-footer':ToFooter,
			'fixed-right':FixedRight,
			'main-title':MainTitle
		}
	}
</script>
<style lang="less">
	.start-stop{
		position: fixed;
		top:0;
		left:0;
		z-index: 999;
		width:100%;
		height:100%;
		background:rgba(0,0,0,.8);
		.start-stop-video{
			width: 800px;
			position: absolute;
			top:calc(20%);
			left:calc(~"(50% - 400px)");
			z-index: 1;
			text-align: center;
			img{
				display: inline-block;
				width:38px;
				height:38px;
				position: absolute;
				top:-16px;
				right:-16px;
				opacity: .6;
				z-index: 10;
				&:hover{
					opacity: 1;
				}
			}
			video{
				max-width:100%;
			}
		}
	}
	.swiper-pagination-clickable .swiper-pagination-bullet{
		display: inline-block;
		width:50px;
		height:4px;
		border-radius: 0;
		border:solid 1px #ccc;
	}
	.swiper-container-horizontal>.swiper-pagination-bullets .swiper-pagination-bullet{
		margin:0 10px;
	}
	.swiper-pagination-bullet{
		opacity: .4;
	}
	.swiper-pagination-bullet-active{
		background:#fff !important;
		opacity: 1;
	}
	.banner{
		position: relative;
		margin:0 auto;
		img{
			max-width:1920px;
			height:560px;
			display: block;
			margin:0 auto;
		}
		.banner-xinx{
			position: absolute;
			right:20%;
			top:75px;
			z-index: 99;
			width:280px;
			height:400px;
			background:rgba(0,0,0,.55);
			.banner-form{
				width:100%;
				height:100%;
				padding-top:15px;
				display: flex;
				flex-direction: column;
				text-align: center;
				.banner-title{
					color:#fff;
					font-size: 17px;
					font-weight: 600;
					padding:10px 0;
				}
				input,select{
					width:200px;
					height:30px;
					margin:10px auto;
					padding:0 10px;
				}
				select{
					width:220px;
					color:#333;
					option{
						color:#333;
					}
				}
				.banner-but{
					background:@color;
					color:#fff;
					border:0;
					height:40px;
				}
				.banner-rexian{
					color:#fff;
					padding-top:10px;
					font-size:13px;
					i{
						color:#fdf43f;
						font-style:normal;
						font-size:14px;
					}
				}
				.banner-num{
					padding-top:5px;
					color:#fff;
					font-size:13px;
					i{
						color:#fdf43f;
						font-style:normal;
						font-size: 18px;
					}
				}
			}
		}
	}
	.adtage{
		.w1200;
		ul{
			margin:60px 0;
			.dis-o;
			li{
				width:25%;
				text-align: center;
				.adtage-img{
					width:170px;
					height:170px;
					margin:0 auto;
					position: relative;
					border-radius: 50%;
					margin-bottom:15px;
					overflow:hidden;
					img{
						display: block;
						width:168px;
						height:168px;
						border:solid 1px #eee;
						border-radius: 50%;
						.guodu(.4s);
					}
					div{
						position: absolute;
						top:0;
						left:0;
						width:170px;
						height:170px;
						border-radius: 50%;
						border:solid 15px #eee;
						box-sizing: border-box;
						opacity: .7;
					}
					&:hover{
						img{
							.guodu(.4s);
							transform:scale(1.2);
							-webkit-transform:scale(1.2);
							-moz-transform:scale(1.2);
						}
					}
				}
				span{
					font-size: 17px;
				}
				p{
					font-size: 14px;
					color:#666;
					width:80%;
					margin:0 auto;
					margin-top:10px;
				}
			}
		}
	}
	.baojia{
		background:#f4f4f4;
		padding:60px 0;
		.baojia-form{
			.w1200;
			background:#fff;
			box-shadow: 5px 2px 10px #ddd;
			display: flex;
			.baojia-left{
				display: flex;
				width:780px;
				img{
					display: block;
				}
				.baojia-left-l{
					width:240px;
					min-width:240px;
					height:380px;
					position: relative;
					overflow: hidden;
					.guodu(.4s);
					img{
						height:380px;
					}
					span{
						position: absolute;
						left:10%;
						top:45px;
						background:url(../assets/img/￥.png) no-repeat;
						background-position: center 20px;
						width:80%;
						height:140px;
						text-align: center;
						display: inline-block;
						padding-top:150px;
						color:#fff;
						font-size: 17px;
						border:solid 1px #aaa;
						i{
							font-size: 12px;
							color:#fff;
							font-style: normal;
						}
					}
					&:hover{
						.guodu(.4s);
						width:270px;
						min-width:270px;
					}
				}
				.baojia-left-r{
					background:url(http://www.maohemao.cn/static/img/07.jpg) center center;
					background-size:100% 100%;
					width:500px;
					margin-left:5px;
					position: relative;
					.baojia-left-bg{
						position: absolute;
						top:0;
						bottom:0;
						background:rgba(0,0,0,0);
						width:100%;
						height:100%;
						.guodu(.3s);
						img{
							margin:140px auto;
							width:80px;
							height:80px;
							opacity: .9;
							cursor: pointer;
						}
						&:hover{
							.guodu(.3s);
							background:rgba(0,0,0,.4);
						}
					}
				}
			}
			
			.baojia-right{
				padding:20px 30px;
				.dis;
				flex-direction:column;
				.baojia-title{
					display: inline-block;
					margin-bottom: 20px;
					font-size: 24px;
				}
				.baojia-border{
					display: inline-block;
					height:2px;
					width:50px;
					background:@color;
					margin-bottom:20px;
				}
				.baojia-ziliao{
					width:350px;
					min-width:350px;
					.baojia-zl-left{
						margin-bottom:20px;
						div{
							height:50px;
							select{
								height:35px;
								width:84px;
								background:#f5f5f5;
								border:solid 1px #ddd;
								color:#666;
								outline: none;
							}
							input{
								height:35px;
								width:240px;
								padding:0 10px;
								background:#f5f5f5;
								border:solid 1px #ddd;
								outline: none;
							}
							span{
								display: inline-block;
								width:80px;
								font-size: 16px;
							}
						}
					}
					.baojia-zl-right{
						text-align: center;
						position: relative;
						input{
							outline: none;
							margin:0 auto;
							cursor: pointer;
							background:@color;
							color:#fff;
							padding:15px 35px;
							font-size: 14px;
							border:0;
						}
						a{
							position: absolute;
							bottom:0;
							right:0;
							color:#666;
							font-size: 12px;
						}
					}
				}
			}
		}
		
	}
	.case-ul{
		.w1200;
		.dis-o;
		flex-wrap:wrap;
		padding-bottom:50px;
		li{
			text-align: center;
			position: relative;
			width:278px;
			height:207px;
			overflow: hidden;
			margin-bottom:20px;
			img{
				width:278px;
				height:207px;
				.guodu(.5s);
				&:hover{
					.guodu(.5s);
					transform: scale(1.1);
					-moz-transform: scale(1.1);
					-webkit-transform: scale(1.1);
					-o-transform: scale(1.1);
				}
			}
			div{
				position: absolute;
				bottom:10px;
				left:0;
				background:rgba(0,0,0,.6);
				padding:8px 20px;
				span{
					font-size: 14px;
					color:#fff;
				}
			}
		}
	}
	.build{
		background:#f4f4f4;
		padding:1px 0 60px;
		.build-ul{
			.w1200;
			.dis-o;
			li{
				width:350px;
				border:solid 1px #ddd;
				background:#fff;
				.guodu(.3s);
				overflow: hidden;
				.build-img{
					position: relative;
					background:#000;
					img{
						display: block;
						margin:auto;
						max-height:235px;
						opacity: .9;
					}
				}
				.build-cont{
					padding:10px 15px;
					span{
						color:#666;
						font-size: 14px;
					}
					div{
						margin-top:5px;
						.dis-o;
					}
				}
				.visit{
					width:100%;
					height:45px;
					line-height: 45px;
					position: relative;
					overflow: hidden;
					text-align: center;
					.visit-span{
						position:absolute;
						top:0;
						left:0;
						width:320px;
						height:100%;
						.dis-o;
						padding:0 15px;
						.guodu(.3s);
						span{
							font-size:14px;
							color:#666;
						}
					}
					.visit-img{
						position:absolute;
						bottom:-45px;
						left:0;
						width:100%;
						height:45px;
						background:#e34b4f;
						.guodu(.3s);
						cursor: pointer;
						a{
							display: inline-block;
							width:100%;
							height:100%;
						}
						img{
							height:30px;
							margin-top:7px;
						}
					}
					&:hover{
						.visit-span{
							position:absolute;
							top:-45px;
							left:0;
							.guodu(.3s);
						}
						.visit-img{
							position:absolute;
							bottom:0;
							left:0;
							.guodu(.3s);
						}
					}
				}
				&:hover{
					.guodu(.3s);
					box-shadow: 1px 1px 15px #bbb;
				}
			}
		}
	}
	.step{
		width:100%;
		height:380px;
		padding:1px 0;
		background:url(http://www.maohemao.cn/static/img/step.jpg) 20% no-repeat;
		background-size:cover;
		*,.main-title h2{
			color:#eee;
		}
		.step-ul{
			.w1200;
			.dis;
			div{
				width:100px;
				height:100px;
				text-align: center;
				opacity: .65;
				border:solid 1px #fff;
				border-radius: 50%;
				margin:30px auto;
				margin-bottom: 15px;
				.guodu(.3s);
				img{
					margin-top:25px;
					height:50px;
				}
			}
			li{
				width:150px;
				text-align: center;
				&:hover{
					.guodu(.3s);
					div{
						opacity: 1;
					}
				}
			}
		}
	}
	.news{
		padding:1px 0;
		padding-bottom:40px;
		.news-main{
			.w1200;
			.dis-o;
			.news-left{
				width:580px;
				div{
					width:580px;
					height:300px;
					overflow: hidden;
					img{
						width:100%;
						height:100%;
						.guodu(.4s);
						&:hover{
							.guodu(.4s);
							transform: scale(1.1);
							-moz-transform: scale(1.1);
							-webkit-transform: scale(1.1);
							-o-transform: scale(1.1);
						}
					}
				}
				span{
					width: 580px;
					height: 30px;
					margin-top: 10px;
					color: #333;
					font-size: 18px;
					line-height: 1.5;
					display: inline-block;
					.nowarp-o;
					&:hover{
						color: #e34b4f;
					}
				}
				time{
					color:#666;
					font-size: 13px;
				}
				p{
					color:#666;
					font-size: 14px;
					width:580px;
					height:40px;
					line-height: 20px;
					.nowarp-t(2);
				}
			}
			.news-right{
				width:580px;
				a{
					display: inline-block;
					margin-top:15px;
					&:nth-child(1){
						margin-top:0;
					}
					li{
						.guodu(.4s);
						.dis-o;
						height:90px;
						.news-time{
							width:90px;
							height:90px;
							background:#c0b8ac;
							position: relative;
							.guodu(.4s);
							time{
								position: absolute;
								color:#fff;
							}
							.news-day{
								top:20px;
								left:28px;
								font-size: 27px;
							}
							.news-month{
								top:55px;
								left:50px;
								font-size: 14px;
							}
						}
						.news-content{
							width:470px;
							padding:0 10px;
							.news-title{
								font-size: 18px;
								color:#333;
								margin:7px 0;
								.nowarp-o;
							}
							p{
								font-size: 14px;
								color:#666;
								.nowarp-t(2);
							}
						}
						&:hover{
							.guodu(.4s);
							box-shadow: 2px 2px 10px #ddd;
							.news-time{
								.guodu(.4s);
								background:#e34b4f;
							}
						}
					}
				}
			}
		}
	}
	.link{
		.w1200;
		margin:50px auto;
		.link-title{
			height:35px;
			line-height: 35px;
			border-left: solid 3px #e74c3c;
			background:#f5f5f5;
			span{
				display: inline-block;
				text-align: center;
				width:90px;
				color: #333;
				font-size: 16px;
			}
		}
		.link-ul{
			display: flex;
			flex-wrap: wrap;
			margin-top:10px;
			li{
				padding:5px 15px 0 0;
				font-size: 14px;
				a{
					color:#888;
				}
			}
		}
	}
</style>