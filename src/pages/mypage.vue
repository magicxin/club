<template>
	<div class="home">
		<ma-header name="我的" :hideReturn="true"></ma-header>
		<div class="column">
			<div class="row">
				<div class="left">
					<div class="cover"><img :src="avatar"/></div>
				</div>
				<div class="middle co-center">nicheng</div>
				<div class="right"></div>
			</div>
			<div class="row">
				<div class="left co-center"><i class="iconfont icon-shoucang"></i></div>
				<div class="middle co-center">收藏</div>
			</div>
			<div class="row">
				<div class="left co-center"><i class="iconfont icon-guanzhu"></i></div>
				<div class="middle co-center">关注</div>
			</div>
		</div>
		<ma-footer></ma-footer>
	</div>
</template>

<script>
	import avatar from 'assets/face.png'
	import maHeader from 'components/maHeader'
	import maFooter from 'components/maFooter'
	export default {
		data(){
			return {
				avatar : avatar
			}
		},
		components:{
			maFooter,maHeader
		}
	}
</script>

<style>
	.home {
		height:100%;
	}
	.home .column{
		background:#eee;
	}
	.home .row {
		margin-bottom: 1em;
		background:#fff;
	}
	.home .left{
		flex:1 1 0;
		padding :4px;
		overflow: hidden;
	}
	.home .cover{
		width:15vw;
		height:15vw;
	}
	.home .left img{
		width:100%;
		object-fit : cover;
	}
	.home .middle{
		padding :4px;
		flex:4 1 0;
	}
	.home .right{
		padding :4px;
		flex:1 1 0;
	}
</style>