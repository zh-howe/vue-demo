<template>
	<div>
		<to-header></to-header>
		<div class="news-banner">
			<img src="../assets/img/banner05.jpg" alt="">
		</div>
		<div class="about-main">
			<h2>关于我们</h2>
			<div class="about-contact">
				<div class="about-contact-left">
					<img src="../assets/img/about.jpg" alt="">
				</div>
				<div class="about-contact-right">
					<span>{{datas.sitetitle}}</span>
					<span>Tel：{{datas.tel}}</span>
					<span>Phone：18610466388-18610794808</span>
					<span>Email：88hf88@m-h-m.cn</span>
					<span>QQ：{{datas.qq}}</span>
					<span>微信小程序：室内设计家装公装</span>
					<span>微信公众号：{{datas.wechat}}</span>
					<span>公司地址：{{datas.addr}}</span>
					<span>公司理念：{{datas.concept}}</span>
					<span>公司描述：<p v-html="datas.about">{{datas.about}}</p></span>
				</div>
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
				datas:[]
			}
		},
		created(){
			get('/mgr/building/site', {
				
			}).then(res => {
				this.datas = res
			}).catch(res => {
				
			});
		},
		methods:{
			
		},
		components:{
			'to-header':ToHeader,
			'to-footer':ToFooter,
			'fixed-right':FixedRight
		},
		metaInfo(){
			return{
				title: '关于我们-卯合卯装饰',
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
	.about-main{
		.w1200;
		padding:30px 0;
		h2{
			text-align: center;
			border-bottom:solid 1px #ddd;
			padding-bottom:30px;
		}
		.about-contact{
			margin:60px 0;
			.dis;
			.about-contact-left{
				width:600px;
				img{
					width:100%;
				}
			}
			.about-contact-right{
				width:540px;
				padding:0 30px;
				span{
					display: block;
					margin-bottom:10px;
					font-size: 15px;
					p{
						text-indent: 2em;
					}
					&:nth-child(1){
						font-size: 20px;
						margin-bottom:25px;
					}
				}
			}
		}
	}
</style>
