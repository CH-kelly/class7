<script>
	import utils from "common/utils.js"
	export default {
		data(){
			return {}
		},
		onLaunch: function() {
			console.log('App Launch')
			var that = this;
			wx.getSystemInfo({
			  success (res) {
				let modelmes = res.model;
				if (modelmes.search('iPhone X') != -1) {
				  utils.iphonex = true;
				  utils.bottom = 30;
				}
				
			  }
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */

@import url("/common/base.css");	
	
	
</style>
