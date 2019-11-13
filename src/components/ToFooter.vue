<template>
	<div class="footer">
		<div class="footer-top">
			<img src="../assets/img/logo.png">
		</div>
		<div class="footer-center">
			<div class="footer-link">
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
				<div>
					<span>北京卯合卯建筑装饰工程设计有限责任公司</span>
					<span>联系方式1：18610466388</span>
					<span>联系方式2：18610794808</span>
					<span>公司地址：北京市朝阳区王四营观音堂398号院内东向11号</span>
				</div>
			</div>
			<form class="footer-input" @submit.prevent="but">
				<span>在线预约尊享贵宾体验</span>
				<input type="text" placeholder="姓名" v-model="data.name">
				<input type="text" placeholder="联系电话" v-model="data.tel">
				<input type="submit" value="提交" class="footer-but">
			</form>
			<div class="footer-erw">
				<div>
					<div class="footer-img">
						<img src="../assets/img/erw01.jpg">
					</div>
					<div class="footer-span">
						<span>用手机扫描查看</span>
					</div>
				</div>
				<div>
					<div class="footer-img">
						<img src="../assets/img/erw02.jpg">
					</div>
					<div class="footer-span">
						<span>关注卯合卯公众号</span>
					</div>
				</div>
			</div>
		</div>
		<div class="footer-bottom">
			<div class="footer-beian">
				<p>Copyright © 2019 北京卯合卯建筑装饰工程设计有限责任公司 版权所有 京ICP备19022700号-2</p>
				<p>技术支持：<a href="http://www.maohemao.com">北京卯合卯科技</a></p>
			</div>
		</div>
	</div>
</template>

<script>
	import { get,post } from '../httputil/httpUtil.js'
	var tel = /^1[3456789]\d{9}$/;
	var tel2 = /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/;
	export default {
		name: 'ToFooter',
		data(){
			return {
				data:{
					name:'',
					tel:''
				}
			}
		},
		methods: {
			but(){
				if(this.data.name == "" || this.data.tel == ""){
					alert('请输入完整信息！')
				}else if(!tel.test(this.data.tel) && !tel2.test(this.data.tel)){
					alert('请输入正确手机号码！')
				}else{
					post('/mgr/building/make', {
						data: this.data
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
		}
	}
</script>

<style lang="less">
	.footer{
		width:100%;
		background:#444;
		.footer-top{
			padding:30px 0;
			.w1200;
			img{
				width:200px;
			}
		}
		.footer-center{
			.w1200;
			.dis;
			.footer-link{
				width:400px;
				padding-top:10px;
				ul{
					.dis;
					flex-wrap: wrap;
					height:60px;
					line-height: 30px;
					margin-bottom:20px;
					li{
						width:100px;
						a{
							color:#ccc;
							font-size: 14px;
							display: inline-block;
							width:100%;
							height:100%;
						}
					}
				}
				div{
					.dis;
					flex-direction: column;
					span{
						padding:5px 0;
						color:#bbb;
						font-size: 14px;
					}
				}
			}
			.footer-input{
				width:400px;
				border-left:solid 1px #ccc;
				border-right:solid 1px #ccc;
				padding:10px 0;
				.dis;
				flex-direction: column;
				span{
					color:#fff;
					font-size: 18px;
					display: inline-block;
					margin-left:40px;
					padding-bottom: 10px;
				}
				input{
					margin:auto;
					width:300px;
					height:35px;
					padding: 0 10px;
					border:0;
					border-radius: 5px;
					margin-top:10px;
				}
				.footer-but{
					width: 95px;
					height: 38px;
					background: #E33F4B;
					border-radius: 4px;
					border: none;
					outline: none;
					color: #fff;
					margin-left: 40px;
					cursor: pointer;
				}
			}
			.footer-erw{
				width:390px;
				padding-top:10px;
				.dis;
				justify-content: center;
				.footer-img{
					margin:10px auto;
					text-align: center;
					background:#fff;
					width:110px;
					padding:5px 0;
					img{
						width:100px;
						height:100px;
						display: block;
						margin:0 auto;
					}
				}
				.footer-span{
					margin:0 auto;
					width:130px;
					text-align: center;
					span{
						font-size: 14px;
						color:#ddd;
					}
				}
			}
		}
		.footer-bottom{
			margin-top: 30px;
			border-top:solid 1px #ddd;
			.footer-beian{
				.w1200;
				.dis-o;
				height:40px;
				line-height:40px;
				p{
					color:#aaa;
					font-size: 13px;
					a{
						color:#aaa;
					}
				}
			}
		}
	}
</style>
