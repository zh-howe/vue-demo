<template>
	<div class="fiexd" @click="goTop" v-show="goTopShow">
		<img src="../assets/img/top.png">
	</div>
</template>

<script>
	let timer = null
	export default {
		name: 'FixedRight',
		data(){
			return{
				scrollTop: '',
				goTopShow:false,
			}
		},
		mounted(){
			window.addEventListener('scroll', this.handleScroll);
		},
		destroyed(){
			window.removeEventListener('scroll', this.handleScroll)
		},
		methods:{
			handleScroll () {
				this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
				if(this.scrollTop > 500){
					this.goTopShow = true
				}else{
					this.goTopShow = false
				}
			},
			goTop(){
				let timer=null,_that=this;
				cancelAnimationFrame(timer);
				timer=requestAnimationFrame(function fn(){
					if(_that.scrollTop>0){
						_that.scrollTop-=200;
						document.body.scrollTop = document.documentElement.scrollTop = _that.scrollTop;
						timer=requestAnimationFrame(fn)
					}else {
						cancelAnimationFrame(timer);
						_that.goTopShow=false;
					}
				})
			}
		}
	}
</script>
<style lang="less">
	.fiexd{
		position: fixed;
		bottom:100px;
		right:0;
		width:50px;
		background: @color;
		text-align:center;
		opacity: .7;
		img{
			width:100%;
			vertical-align: bottom;
		}
		span{
			color:#fff;
			font-size: 12px;
		}
		&:hover{
			opacity: 1;
		}
	}
</style>
