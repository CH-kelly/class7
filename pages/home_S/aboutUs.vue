<template>
	<div class='aboutUs'>
		<div class="rich">
			<rich-text style="width: 100%;word-wrap:break-word" :nodes="nodes"></rich-text>
		</div>
	</div>
</template>

<script>
	const {
	  Post
	} = require('@/main/mainFun.js')
	import main from '@/main/main.js'
	export default {
		name: 'aboutUs',
		data() {
			return {
				nodes:''
			}
		},
		onLoad(){
			Post('api/Index/abouts',{
				uniacid:16
			}).then(res => {
				console.log(res)
				this.nodes = res.replace(/\<img/gi, '<img style="max-width:100%;height:auto"')
			})
		},
		onShow(){

		},
		methods: {

		},

		filters: {
			//过滤器
		},
		onReachBottom(){
			//滚动到底部
		},
	}
</script>

<style lang="scss" scoped>
.rich{
	width: calc(100% - 60rpx);
	margin-left: 30rpx;
}
</style>
