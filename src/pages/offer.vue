<template>
	<div>
		<to-header></to-header>
		<div class="banner-offer">
			<img src="../assets/img/banner04.jpg" alt="建筑装饰报价">
		</div>
		<div class="baojia-main">
			<div class="baojia-title">快速报价</div>
			<div class="baojia">
				<form @submit.prevent="banner_submit">
					<div class="baojia-o">
						<span class="bj-span">装修类型：</span>
						<select name="decorate_type" v-model="baojia_type.decorate_style" @click="list_type()">
							<option value="请选择">请选择</option>
							<option v-for="(item,index) in decorate_list" :key="index" :value="item.id">{{item.name}}</option>
						</select>
						<span style="color:red;">*</span>
						<span class="bj-span bj-left-margin">建筑面积：</span>
						<input type="text" v-model="baojia_type.area" placeholder="/m²">
						<span style="color:red;">*</span>
					</div>
					<div class="baojia-t">
						<span class="bj-span">建筑类型：</span>
						<select name="decorate_type" v-model="baojia_type.decorate_type">
							<option value="请选择">请选择</option>
							<option v-for="(item,index) in baojia_option1" :key="index" :value="item.id">{{item.name}}</option>
						</select>
						<span style="color:red;">*</span>
						<span class="bj-span bj-left-margin">装修档次：</span>
						<select name="decorate_grade" v-model="baojia_type.decorate_class">
							<option value="请选择">请选择</option>
							<option v-for="(item,index) in baojia_option[0]" :key="index" :value="item.id">{{item.name}}</option>
						</select>
					</div>
					<div class="baojia-s">
						<span class="bj-span">您的手机：</span>
						<input type="text" v-model="baojia_type.tel" placeholder="请输入您的手机号码">
						<span style="color:red;">*</span>
						<div>
							<span class="bj-span"></span><span class="bj-span2">为了您的权益，您的隐私将被严格保密</span>
						</div>
					</div>
					<div class="baojia-but">
						<input type="submit" value="估算报价">
						<a href="tencent://message/?uin=392009003&Site=Sambow&Menu=yes">在线咨询</a>
					</div>
				</form>
			</div>
			<div class="alert-offer" v-show="show">
				<img src="../assets/img/chahao.png" @click="show = false">
				<div class="offer-end">
					<div class="offer-end-left">
						<span>装修类型：<i>{{olist.style}}</i></span>
						<span>建筑类型：<i>{{olist.type}}</i></span>
						<span>装修面积：<i>{{olist.area}}m²</i></span>
						<span>装修档次：<i>{{olist.class}}</i></span>
					</div>
					<div class="offer-end-right">
						<span>当前报价为：<i>{{offer}}</i>元</span>
					</div>
				</div>
			</div>
			<div class="baojia-right">
				<div class="baojia-futitle">
					<span>已有<i>{{num1}}</i>位业主获得报价</span>
				</div>
				<marquee direction=up behavior=scroll scrolldelay=200 class="baojia-div">
					<div class="baojia-roll" v-for="item in roll">
						<div>{{item.tel}}</div>
						<div>{{item.area}}m²</div>
						<div>{{item.price}}万元</div>
					</div>
				</marquee>
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
		data(){
			return{
				num1:100,
				num2:74,
				offer:0,
				show:false,
				baojia_type:{
					tel:'',//手机
					area:'',//面积
					decorate_style:'请选择',
					decorate_type:'请选择',
					decorate_class:'请选择'
				},
				roll:[],
				olist:[],
				decorate_list:[
					{
						id:1,
						name:'家装'
					},
					{
						id:2,
						name:'工装'
					}
				],
				baojia_option:[],
				baojia_option1:[],
			}
		},
		created(){
			post('/mgr/building/offer_output', {
			}).then(res => {
				this.roll = res
				this.num1 = this.roll.length;
			}).catch(res => {
				
			});
			
			post('/mgr/building/get_offer_array', {
				
			}).then(res => {
				this.baojia_option = res
				this.baojia_option1 = this.baojia_option[1]
			}).catch(res => {
				
			});
		},
		methods:{
			list_type(){
				var oindex = this.baojia_type.decorate_style
				if(oindex == 1){
					this.baojia_option1 = this.baojia_option[1]
				}else if(oindex == 2){
					this.baojia_option1 = this.baojia_option[2]
				}else if(oindex == "请选择"){
					this.baojia_option1 = ''
				}
			},
			banner_submit(){
				var tel = /^1[3456789]\d{9}$/;
				var tel2 = /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/;
				var area = /^\d+(\.\d{2})?$/;
				if(this.baojia_type.tel == '' || this.baojia_type.area == '' || this.baojia_type.decorate_style == '请选择' || this.baojia_type.decorate_type == '请选择' || this.baojia_type.decorate_class == '请选择'){
					alert("请输入必填信息以获得报价！")
				}else if(!tel.test(this.baojia_type.tel) && !tel2.test(this.baojia_type.tel)){
					alert('请输入11位正确手机号码！')
				}else if(!area.test(this.baojia_type.area)){
					alert('建筑面积只能输入数字（可以保留小数点后两位）！')
				}else{
					post('/mgr/building/offerone', {
						data: this.baojia_type
					}).then(res => {
						this.offer = res.count
						this.olist = res.list
						this.show = true
						post('/mgr/building/offer_output', {
						}).then(res => {
							this.roll = res
							this.num1 = this.roll.length;
						}).catch(res => {
							
						});
					}).catch(res => {
						
					});
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
				title: '装修报价-卯合卯装饰-北京卯合卯建筑装饰工程设计有限责任公司',
				meta: [
					{
						name: 'keywords', 
						content: '卯合卯装饰，装修报价，装修设计，北京装修，北京工装'
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
	.banner-offer{
		height:214px;
		img{
			width:100%;
			height:100%;
			max-width: 1920px;
			display: block;
			margin:0 auto;
		}
	}
	.baojia-main{
		width: 1200px;
		background:#f4f4f4;
		margin:60px auto;
		padding:50px 0;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		.alert-offer{
			position: fixed;
			top:50%;
			left:50%;
			z-index: 999;
			background:url(../assets/img/alert-bg.jpg) no-repeat;
			background-size:100% 100%;
			width:510px;
			height:160px;
			margin-top:-80px;
			margin-left:-255px;
			img{
				position: absolute;
				right:-16px;
				top:-16px;
				width:35px;
				height:35px;
			}
			.offer-end{
				display: flex;
				justify-content: space-around;
				padding:15px 20px;
				.offer-end-left{
					width:40%;
					display: flex;
					flex-direction: column;
					span{
						padding:6px 0;
						color:#555;
						font-size: 15px;
						i{
							font-style: normal;
							color:#f35626;
						}
					}
				}
				.offer-end-right{
					width: 55%;
					line-height: 120px;
					span{
						font-size: 18px;
						i{
							font-style: normal;
							font-size: 24px;
							color:#f35626;
							padding:0 10px 0 3px;
						}
					}
				}
			}
		}
		.baojia{
			width: 600px;
			padding:0;
		}
		.baojia-right{
			width:300px;
			border:solid 1px #ddd;
			text-align: center;
			.baojia-futitle{
				width:100%;
				text-align: center;
				margin:12px auto;
				span{
					color:#666;
					font-size: 14px;
					i{
						font-style: normal;
						color:red;
						font-weight: 600;
					}
				}
			}
			.baojia-div{
				width:260px;
				margin:0 auto;
				height:190px;
				.baojia-roll{
					display: flex;
					justify-content: space-between;
					height:30px;
					line-height: 30px;
					div{
						&:nth-child(1){
							color:#666;
							font-size: 14px;
							width:91px;
							min-width:91px;
						}
						&:nth-child(2){
							color:#333;
							width:60px;
							min-width:60px;
							font-size: 14px;
							text-align: center;
						}
						&:nth-child(3){
							width:70px;
							min-width:70px;
							font-size: 14px;
							color:red;
							text-align: right;
						}
					}
				}
			}
		}
		.baojia-title{
			width:100%;
			font-size: 25px;
			font-weight: 600;
			color:#f35626;
			text-align: center;
			margin-bottom:40px;
		}
		.bj-span{
			font-size: 15px;
			color:#666;
			display: inline-block;
			width:80px;
		}
		input{
			height:30px;
			padding:0 10px;
			font-size: 13px;
			outline:none;
		}
		.bj-left-margin{
			margin-left:50px;
		}
		.baojia-o{
			select{
				width:130px;
				height:33px;
				color:#666;
				outline:none;
				padding-left:5px;
			}
			input{
				width:105px;
			}
			padding:10px 0;
		}
		.baojia-t{
			select{
				width:130px;
				height:33px;
				color:#666;
				outline:none;
				padding-left:5px;
			}
			padding:10px 0;
		}
		.baojia-s{
			input{
				width:170px;
			}
			padding:10px 0;
			.bj-span2{
				display: inline-block;
				height:20px;
				line-height: 20px;
				font-size: 12px;
				color:#888;
				padding-left:5px;
			}
		}
		.baojia-but{
			text-align: left;
			margin-top:40px;
			input{
				width:200px;
				height:35px;
				margin:0 15px;
				background:#fff;
				border:solid 1px #f35626;
				color:#f35626;
				font-size: 15px;
				.guodu(.3s);
				&:hover{
					background:#f35626;
					color:#fff;
					.guodu(.3s);
				}
			}
			a{
				display: inline-block;
				width:200px;
				height:34px;
				line-height: 34px;
				margin:0 15px;
				background:#fff;
				border:solid 1px #f35626;
				color:#f35626;
				font-size: 15px;
				.guodu(.3s);
				text-align: center;
				&:hover{
					background:#f35626;
					color:#fff;
					.guodu(.3s);
				}
			}
		}
	}
	
</style>
