<template>
	<div class="home">
		<ma-header name="我的" :hideReturn="true"></ma-header>
		<div>222</div>
		<ma-footer></ma-footer>
	</div>
</template>

<script>
	import maHeader from 'components/maHeader'
	import maFooter from 'components/maFooter'
	export default {
		components:{
			maFooter,maHeader
		}
	}
</script>

<style>
</style>