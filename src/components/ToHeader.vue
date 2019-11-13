<template>
	<div>
		<div class="tobar">
			<div class="tobar-main">
				<span>精心服务、良心打造、用心创作</span>
				<router-link to="/about">关于我们</router-link>
			</div>
		</div>
		<div class="toheader">
			<div class="header-logo">
				<img src="../assets/img/logo2.png" alt="">
			</div>
			<div class="header-center">
				<div class="header-sousuo">
					<div class="option">
						<span @mouseover="option = true" @mouseout="option = false">
							<span>{{otext}}</span>
							<i></i>
						</span>
						<ul v-show="option" @mouseover="option = true" @mouseout="option = false">
							<li v-for="(item,index) in select" @click="otext = select[index];option = false">
								{{item}}
							</li>
						</ul>
					</div>
					<input type="text" placeholder="请输入关键字" v-model="value" @keyup.enter="sousuo">
					<span class="sousuo-text" @click="sousuo">
						搜索
					</span>
				</div>
			</div>
			<div class="header-right">
				<span>010-67765605</span>
			</div>
		</div>
		<nav>
			<ul>
				<li>
					<router-link to="/">网站首页</router-link>
				</li>
				<li>
					<router-link to="/offer">工程报价</router-link>
				</li>
				<li>
					<router-link to="/cases">精彩案例</router-link>
				</li>
				<li>
					<router-link to="/news">资讯动态</router-link>
				</li>
				<li>
					<router-link to="/video">装修视频</router-link>
				</li>
				<li>
					<router-link to="/about">关于企业</router-link>
				</li>
			</ul>
		</nav>
	</div>
</template>

<script>
	import { get,post } from '../httputil/httpUtil.js'
	export default {
		name: 'ToHeader',
		data(){
			return{
				select:['精彩案例','装修视频','新闻动态'],
				otext:'精彩案例',
				option:false,
				value:''
			}
		},
		created(){
			if(this.$route.path == '/news' || this.$route.path == '/news_page'){
				this.otext = '新闻动态'
			}else if(this.$route.path == '/video'){
				this.otext = '装修视频'
			}else{
				this.otext = '精彩案例'
			}
		},
		methods:{
			sousuo(){
				if(this.otext == '精彩案例'){
					this.$router.push({
						path:'/cases',
						name:'cases',
						params:{
							value:this.value
						}
					})
					this.$emit('oheader',this.value)
				}else if(this.otext == '装修视频'){
					this.$router.push({
						path:'/video',
						name:'video',
						params:{
							value:this.value
						}
					})
					this.$emit('oheader',this.value)
				}else if(this.otext == '新闻动态'){
					this.$router.push({
						path:'/news',
						name:'news',
						params:{
							value:this.value
						}
					})
					this.$emit('oheader',this.value)
				}
			}
		}
	}
</script>

<style lang="less">
	.tobar{
		background:#f9f9f9;
		border-bottom:solid 1px #eee;
		.tobar-main{
			display: flex;
			justify-content: space-between;
			height:30px;
			line-height: 30px;
			.w1200;
			span{
				color:#888;
				font-size: 12px;
				padding:0 5px;
			}
			a{
				color:#888;
				font-size: 14px;
				font-style:normal;
				font-weight: 400;
			}
		}
	}
	.toheader{
		.w1200;
		.dis-o;
		height:120px;
		.header-logo{
			height:60px;
			margin-top:40px;
			img{
				height:100%;
			}
		}
		.header-center{
			margin-top:45px;
			.header-sousuo{
				width:440px;
				height:34px;
				border:solid 2px @color;
				.dis-o;
				.option{
					border:0;
					width:90px;
					position: relative;
					span{
						display: flex;
						justify-content: center;
						width:90px;
						height: 34px;
						line-height: 34px;
						color: #000;
						text-align: center;
						font-size: 14px;
						position: relative;
						i{
							position: absolute;
							right:0;
							line-height: 34px;
							display: inline-block;
							width: 0;
							height: 0;
							border-left: 6px solid transparent;
							border-right: 6px solid transparent;
							border-top: 5px solid #999;
							margin-top:14px;
						}
					}
					ul{
						position: absolute;
						left:-2px;
						top:34px;
						width:100%;
						border:solid 2px @color;
						background:#fff;
						border-top:0;
						z-index: 99;
						li{
							cursor:pointer;
							font-size: 12px;
							text-align: center;
							line-height: 28px;
							&:hover{
								color:@color;
							}
						}
					}
				}
				input{
					width:240px;
					border:0;
					outline:none;
					height:34px;
					color:#666;
					margin-left:10px;
				}
				.sousuo-text{
					text-align: center;
					font-size: 13px;
					color:#fff;
					background:@color;
					display: inline-block;
					width:80px;
					height:100%;
					line-height: 34px;
					cursor: pointer;
				}
			}
		}
		.header-right{
			margin-top:40px;
			background:url('../assets/img/sjbg.png') no-repeat;
			width:200px;
			height:50px;
			position: relative;
			span{
				position: absolute;
				right:34px;
				bottom:5px;
				font-size: 17px;
			}
		}
	}
	nav{
		background:@color;
		ul{
			.w1200;
			.dis-o;
			height:50px;
			line-height: 50px;
			text-align: center;
			li{
				width:15%;
				cursor: pointer;
				.guodu(.2s);
				background-size:0;
				a{
					color:#fff;
					font-size: 14px;
					display: inline-block;
					width:100%;
					height:100%;
					&:hover{
						font-size: 16px;
					}
				}
				&:hover{
					.guodu(.2s);
					background:#333;
				}
			}
		}
	}
</style>
