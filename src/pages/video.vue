<template>
	<div>
		<to-header @oheader="headerValue"></to-header>
		<div class="video-banner">
			<video src="../assets/img/video.mp4" autoplay="true" loop="loop" muted></video>
			<div class="video-bg">
				<span>
					装修视频</br>
					<i>Decoration Video</i>
				</span>
				<p>看装修视频，体验最酷的装修风格，选择您的心仪案例</p>
			</div>
		</div>
		<div class="video-list">
			<ul class="video-ul">
				<li v-for="(item,index) in datas" :key="index" @click="videoPlay(index)">
					<div class="video-ul-img">
						<img :src="item.img">
					</div>
					<div class="video-ul-play">
						<div>
							<img src="../assets/img/audio.png" alt="">
						</div>
					</div>
					<div class="video-ul-cont">
						<span></span>
						<p>
							{{item.title}}
						</p>
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
		name:'about',
		data(){
			return{
				state:false,
				datas:[]
			}
		},
		created(){
			
			post('/mgr/building/get_video_data', {
				value:this.$route.params.value
			}).then(res => {
				this.datas = res
			}).catch(res => {
			  
			});
		},
		methods:{
			videoPlay(index){
				this.state = true
				this.$refs.pause.src = this.datas[index].src
				this.$refs.pause.play()
			},
			pause(){
				this.state = false
				this.$refs.pause.pause()
			},
			headerValue(value){
				post('/mgr/building/get_video_data', {
					value:value
				}).then(res => {
					this.datas = res
				}).catch(res => {
				  
				});
			}
		},
		components:{
			'to-header':ToHeader,
			'to-footer':ToFooter,
			'fixed-right':FixedRight
		},
		metaInfo(){
			return{
				title: '装修视频-卯合卯装饰-北京卯合卯建筑装饰工程设计有限责任公司',
				meta: [
					{
						name: 'keywords', 
						content: '卯合卯装饰，装修视频，装修设计，北京装修，北京工装'
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
	.video-banner{
		height:350px;
		max-width:1920px;
		margin:0 auto;
		overflow: hidden;
		position: relative;
		video{
			width:100%;
			max-width: 1920px;
			display: block;
			margin:0 auto;
			margin-top:-350px;
			z-index: 1;
		}
		.video-bg{
			position: absolute;
			top:0;
			left:0;
			background:rgba(44,44,44,.5);
			width:100%;
			height:100%;
			z-index: 2;
			text-align: center;
			span{
				font-size: 22px;
				color:#eee;
				font-weight: 600;
				display: inline-block;
				margin-top:150px;
				border:solid 2px #ccc;
				padding:15px 70px;
				i{
					font-size: 15px;
					color:#fff;
					font-style: normal;
					font-weight: 500;
				}
			}
			P{
				margin-top:20px;
				color:#ddd;
				font-size: 14px;
			}
		}
	}
	.video-list{
		background:#f5f5f5;
		padding:60px 0;
		.video-ul{
			.w1200;
			.dis-o;
			flex-wrap: wrap;
			li{
				height:503px;
				width:585px;
				background:#fff;
				position: relative;
				margin:15px 0;
				.video-ul-img{
					overflow: hidden;
					height:403px;
					width:585px;
					img{
						height:403px;
						width:585px;
						vertical-align: bottom;
						.guodu(.4s);
					}
				}
				.video-ul-play{
					position: absolute;
					top:0;
					left:0;
					width:585px;
					height:403px;
					text-align: center;
					line-height: 403px;
					background:rgba(0,0,0,.3);
					div{
						border:solid 1px #eee;
						width:543px;
						height:361px;
						margin:20px auto;
						img{
							width:70px;
							height:70px;
							.guodu(.4s);
						}
					}
				}
				&:hover{
					cursor: pointer;
					.video-ul-img{
						img{
							.guodu(.4s);
							transform: scale(1.1);
							-moz-transform: scale(1.1);
							-webkit-transform: scale(1.1);
							-o-transform: scale(1.1);
						}
					}
					.video-ul-play{
						div{
							img{
								.guodu(.4s);
								transform: scale(.9);
								-moz-transform: scale(.9);
								-webkit-transform: scale(.9);
								-o-transform: scale(.9);
							}
						}
					}
				}
				.video-ul-cont{
					span{
						display: inline-block;
						width:100px;
						height:3px;
						margin:20px;
						background:crimson;
					}
					p{
						padding: 0 20px;
						height:30px;
						line-height: 30px;
						color:#333;
						font-size: 20px;
						margin-top:-10px;
					}
				}
			}
		}
	}
</style>
