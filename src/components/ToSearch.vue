<template>
	<div class="search-page">
		
		<!-- 条件筛选 -->
		<ul class="search-ul">
			<li v-for="(items,index) in datas" :key="index">
				<div class="search-title">
					{{items.title}}
				</div>
				<ul class="search-lists">
					<li v-for="(item,key) in items.lists" :key="key" class="search-list">
						<span v-if="item.checked" @click="refresh(index,key,item)" class="search-span color-red">{{item.name}}</span>
						<span v-if="!item.checked" @click="refresh(index,key,item)" class="search-span">{{item.name}}</span>
					</li>
				</ul>
			</li>
		</ul>
		
		<!-- 排序方式 -->
		<div class="sorting">
			<ul class="search-lists">
				<li v-for="(item,index) in searchLists" :key='index' :class="{'bgcolor':active1 == index}" @click="searchList(index)">
					{{item}}
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import { get,post } from '../httputil/httpUtil.js'
	export default{
		name: 'ToSearch',
		data(){
			return {
				active1:0, //高亮
				datas:[], //条件数据
				urls:[],
				searchLists:['全部','综合排序','人气最高']
			}
		},
		props:{
			urls2:Array
		},
		created(){
			this.urls = this.urls2
			post('/mgr/building/get_condition', {//获取后台传来的条件 渲染到页面
				
			}).then(res => {
				
				for(var i=0;i<res.length;i++){//判断cheked 控制高亮
					for(var j=0;j<res[i].lists.length;j++){
						if(j!=0){
							res[i].lists[j].checked = false;
						}else{
							res[i].lists[j].checked = true;
						}
					}
				}
				
				this.datas = res //将数据渲染到页面
				
			}).catch(res => {
				
			});
			
		},
		methods:{
			
			//根据所选条件筛选数据
			refresh(index,key,item){
				
				this.urls[5] = 1
				
				for(var i=0;i<this.datas[index].lists.length;i++){//通过控制cheked 为所选高亮
					this.datas[index].lists[i].checked = false;
				}
				this.datas[index].lists[key].checked = true;
				
				this.urls[index] = key //为数组 赋予对应的值
				
				post('/mgr/building/search', {//通过条件筛选获取数据
					data:this.urls //发送筛选的条件 与 排序类型 与 分页信息 给后台
				}).then(res => {
					this.$emit('results',res,this.urls)//将获取到的数据 发送到父组件
				}).catch(res => {
				  
				});
				
			},
			
			//根据排序类型筛选数据
			searchList(index){
				
				this.active1 = index //高亮
				
				this.urls[4] = index + 1  //为数组 赋予对应的值 为了后台方便 尽量别用0 所以+1
				
				post('/mgr/building/search', {//通过综合排序获取数据
					data:this.urls //发送筛选的条件 与 排序类型 与 分页信息 给后台
				}).then(res => {
					this.$emit('results',res,this.urls)//将传回来的数据 发送到父组件
				}).catch(res => {
				  
				});
				
			}
		}
	}
</script>

<style lang="less">
	.search-page{
		.w1200;
		margin-top:40px;
		.search-ul{
			border:solid 1px #ddd;
			li{
				height:45px;
				line-height: 45px;
				border-top:dashed 1px #ddd;
				&:nth-child(1){
					border:0;
				}
				.dis;
				.search-title{
					background:#f4f4f4;
					font-size: 13px;
					color:#555;
					width:100px;
					text-align: center;
				}
				.search-lists{
					.dis;
					li{
						border:0;
						padding:0 18px;
						span{
							color:#555;
							font-size: 13px;
							cursor: pointer;
							&:hover{
								color:red;
							}
						}
						&:nth-child(1){
							padding-left:36px;
						}
						.color-red{
							color:red;
						}
					}
				}
			}
		}
		.sorting{
			margin:20px 0;
			.search-lists{
				.dis;
				li{
					font-size: 14px;
					width:100px;
					text-align: center;
					height:30px;
					line-height: 30px;
					margin-right:20px;
					border:solid 1px #ccc;
					color:#333;
					cursor: pointer;
				}
				.bgcolor{
					background:#e12c28;
					color:#fff;
					border:solid 1px #e12c28;
				}
			}
		}
	}
</style>

