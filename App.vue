<script>
	
	import utils from "common/utils.js"
	export default {
		onLaunch: function() {
			console.log('App Launch')
			var that = this;
			wx.getSystemInfo({
				success(res) {
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
		},
		globalData: {
			accountInfo:{
				userID: '',			// 用户ID
				userName: '',		// 用户昵称
				userAvatar: '',		// 用户头像URL
				userSig: '',		// IM登录凭证
				sdkAppID: '',		// IM应用ID
				accountType: '',	// 账号集成类型
				accountMode: 0,		//帐号模式，0-表示独立模式，1-表示托管模式
				token: ''			//登录RoomService后使用的票据
			},
			roomname:'123',
			roomInfo:{
				roomID: '',			// 视频位房间ID
				roomInfo: '',		// 房间名称
				mixedPlayURL: '', 	// 混流地址
				isCreator: false,	// 是否为创建者
				pushers: [],		// 当前用户信息
				isLoginIM: false,	// 是否登录IM
				isJoinGroup: false,	// 是否加入群
				isDestory: false,	// 是否已解散
				hasJoinAnchor: false,
				roomStatusCode: 0
			},
			ctx:{
			    sdkAppID:  null,
			    appIDAt3rd: null,
			    accountType: null,
			    identifier:  null,
			    tinyid: null,
			    identifierNick: null,
			    userSig: null,
			    a2: null,
			    contentType: 'json',
			    apn: 1
			},
			loginInfo:{},
			listeners:{
				
			},
			event:{},	//监听事件
			requestJoinCallback:function(){},	//连麦回调函数
		},
	}
</script>

<style>
	@import url("/common/base.css");

	/*每个页面公共css */
	.Ellipsis {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.Ellipsis2 {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}

	.Ellipsis3 {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		overflow: hidden;
	}
</style>
