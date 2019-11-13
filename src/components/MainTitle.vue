<template>
	<div class="main-title">
		<h2>{{title}}</h2>
		<p>{{content}}</p>
	</div>
</template>

<script>
	export default {
		name: 'MainTitle',
		props:['title','content']
	}
</script>

<style lang="less">
	.main-title{
		.w1200;
		text-align: center;
		margin:40px auto;
		h2{
			font-weight: 500;
			letter-spacing: 3px;
			font-size: 30px;
			color: #000;
		}
		p{
			width: 100%;
			height: 16px;
			line-height: 18px;
			font-size: 15px;
			margin-top: 5px;
		}
	}
</style>
