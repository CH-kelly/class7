<template>
	<div class="liveBroadcastDetails">
		<div :class="isFullScreen? 'liveBroadcast FullScreen' :'liveBroadcast'" >
			<mlvb-live-room v-if="isRoom"  id="id_liveroom" :roomid="roomID" :roomName="roomName"
			 template="float" :beauty="3"  :debug="true" role="audience" @RoomEvent="onRoomEvent">
			</mlvb-live-room>
			<image @click="FullScreen" src="/static/home_s/fullScreen.png"></image>
		</div>
		<div class="user" v-if="isUser" @click="isUser=!isUser">
			<p>授课老师：林晓</p>
			<image src="/static/home_s/item1.png"></image>
		</div>
		<div class="User" v-if="!isUser" @click="isUser=!isUser">
			<image src="/static/logo.jpg" mode="aspectFill"></image>
			<div class="text">
				<div>
					<p>授课老师：林晓</p>
					<image src="/static/home_s/item2.png"></image>
				</div>
				<p>有python以及人工智能领域的项目经历,系统辅导过学员相关课程，希望通过我的辅导能够让学员理解编程理念，学会常用的编程设计方</p>
			</div>
		</div>
		<div class="announcement">欢迎学习林晓老师课程，与老师或机构私下交易造成损失与纠纷，平不承认任何责任，学习愉快~</div>
		<!-- <div style="width: 100%;height: 536rpx;"></div> -->
		<div class="msg">
			<block v-for="(item,index) in msgList" :key="index">
				<div class="text" v-if="item.userName"><text>{{item.userName}}：</text><text>{{item.message}}</text></div>	
			</block>
			<div class="apply" @click="voice=!voice">申请连麦</div>
		</div>
		<div class="sendMsg">
			<input type="text" v-model="msg" placeholder="我要发言" placeholder-style="color:#999999" />
			<p @click="sendTextMsg">发送</p>
		</div>
		<div class="model" v-if="voice" @click="voice=!voice">
			<div class="box">
				<image class="voice" src="../../static/home_s/voice.png"></image>
				<div class="img">
					<div>
						<image src="/static/home_s/connect.png"></image>
					</div>
					<p>点击下方申请按钮即可连麦</p>
				</div>
				<div class="apply" @click="requestJoinAnchor">申请连麦</div>
			</div>
		</div>
		<div class="model" v-if="false">
			<div class="people">
				<div class="title">在线人数</div>
				<div class="box">
					<image src="/static/logo.jpg" mode="aspectFill"></image>
					<p>某某</p><span>在线</span>
				</div>
				<div class="box">
					<image src="/static/logo.jpg" mode="aspectFill"></image>
					<p>某某</p><span class="no">离线</span>
				</div>
				<div class="box">
					<image src="/static/logo.jpg" mode="aspectFill"></image>
					<p>某某</p><span class="no">离线</span>
				</div>
				<div class="box">
					<image src="/static/logo.jpg" mode="aspectFill"></image>
					<p>某某</p><span>在线</span>
				</div>
				<div class="box">
					<image src="/static/logo.jpg" mode="aspectFill"></image>
					<p>某某</p><span>在线</span>
				</div>
				<div class="box">
					<image src="/static/logo.jpg" mode="aspectFill"></image>
					<p>某某</p><span>在线</span>
				</div>
				<div class="box">
					<image src="/static/logo.jpg" mode="aspectFill"></image>
					<p>某某</p><span>在线</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	const {
		Post
	} = require('@/main/mainFun.js')
	import main from '@/main/main.js'
	import mlvbliveroomcore from '@/wxcomponents/mlvb-live-room/mlvbliveroomcore.js'
	let trtcRoomContext = ''
	let liveroom = ''
	export default {
		name: 'liveBroadcastDetails',
		data() {
			return {
				isFullScreen:false,
				isUser: true,
				voice: false,
				msg:'',
				
				SdkAppid: '',
				userID: '',
				userSig: '',
				isRoom: false,
				roomID: '',
				roomName: '',
				nickName: '',
				user_avatar: '',
				msgList:[]
			}
		},
		onReady() {
			let loginInfo= {
				sdkAppID: this.SdkAppid,
				userID: this.userID,
				userSig: this.userSig,
				userName: this.nickName,
				userAvatar: this.user_avatar
			}
			let _this = this
			this.isRoom = true
			uni.showLoading({
			    title: '加载直播中...'
			});
			mlvbliveroomcore.login({
				data: loginInfo,
				success: function(ret) {
					liveroom = _this.selectComponent("#id_liveroom");
					liveroom.start();
					uni.hideLoading();
				},
				fail: function(ret) {
					//登录失败
					uni.hideLoading();
					main.showToast('加载失败')
				}
			})
		},
		onLoad(options) {
			this.userID = options.userID
			this.SdkAppid = options.SdkAppid
			this.userSig = options.userSig
			this.roomID = options.roomID
			this.roomName = options.userID
			this.nickName = options.nickName
			this.user_avatar = options.user_avatar
		},
		onShow() {

		},
		methods: {
			pageJump(url) {
				main.pageJump(url)
			},
			requestJoinAnchor(){
				liveroom.requestJoinAnchor()
			},
			onRoomEvent(e) {
				console.log('onRoomEvent ------------  ',e);
				switch (e.detail.tag) {
					case 'roomClosed':
						{
							//房间已经关闭
							break;
						}
					case 'error':
						{
							//发生错误
							var code = e.detail.code;
							var detail = e.detail.detail;
							break;
						}
					case 'recvTextMsg':
						{
							//收到文本消息
							console.log('=====================')
							console.log(e.detail)
							this.msgList.push(e.detail.detail)
							break;
						}
					case 'requestJoinAnchor':
						{
							//主播收到来自观众的连麦请求
							var audience = e.detail;
							var name = audience.userName;
							var id = audience.userID;
							// 允许请求
							liveroom.respondJoinReq(true, audience)
							break;
						}
					case 'linkOn':
						{
							//连麦观众在连麦成功时会收到此通知
							console.log('连麦成功')
							
							// liveroom && liveroom.linkJionPusher()
							break;
						}
					case 'linkOut':
						{
							//连麦观众退出连麦时会收到此通知
							console.log('连麦失败')
							break;
						}
				}
			},
			//发送消息
			sendTextMsg(){
				if(this.msg === ""){
					main.showToast('信息不能为空')
					return false
				}
				liveroom.sendTextMsg(this.msg)
				this.msg = ''
			},
			FullScreen(){
				this.isFullScreen = !this.isFullScreen
			}

		},

		filters: {
			//过滤器
		},
		onReachBottom() {
			//滚动到底部
		},
		onUnload(){
			liveroom.stop()
		}
	}
</script>

<style lang="scss" scoped>
	.liveBroadcast {
		width: 100%;
		height: 380rpx;
		background: #333333;
		position: relative;

		>image {
			width: 30rpx;
			height: 30rpx;
			position: absolute;
			right: 30rpx;
			bottom: 20rpx;
			z-index: 2;
		}
	}
	.FullScreen{
		width: 100%;
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 5;
	}

	.user {
		width: 100%;
		height: 77rpx;
		background: rgba(255, 255, 255, 1);
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 30rpx;
		box-sizing: border-box;
		position: relative;
		z-index: 2;

		p {
			font-size: 30rpx;
			color: #29323D;
			font-weight: bold;
		}

		image {
			width: 24rpx;
			height: 12rpx;
		}
	}

	.User {
		width: 100%;
		padding: 10rpx 30rpx;
		box-sizing: border-box;
		overflow: hidden;
		background: #FFFFFF;
		position: relative;
		z-index: 2;

		image {
			width: 82rpx;
			height: 82rpx;
			border-radius: 50%;
			float: left;
		}

		.text {
			width: calc(100% - 100rpx);
			float: right;
			overflow: hidden;

			div {
				width: 100%;
				height: 60rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;

				p {
					font-size: 30rpx;
					color: #29323D;
					font-weight: bold;
				}

				image {
					width: 24rpx;
					height: 12rpx;
				}
			}

			>p {
				width: 100%;
				color: #999999;
				font-size: 23rpx;
				line-height: 36rpx;
			}
		}
	}

	.announcement {
		width: 100%;
		height: 80rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		color: #BBBBBB;
		font-size: 25rpx;
		line-height: 36rpx;
		position: relative;
		z-index: 2;
		background: #FFFFFF;
	}

	.msg {
		width: 100%;
		height: calc(100% - 536rpx - 90rpx);
		overflow-y: scroll;
		position: fixed;
		bottom: 90rpx;
		padding: 25rpx;
		box-sizing: border-box;
		background: #F5F5F5;
		z-index: 1;

		.text {
			font-size: 28rpx;
			width: 100%;
			margin-top: 20rpx;
			margin-bottom: 10rpx;

			text:nth-child(1) {
				color: #999999;
			}

			text:nth-child(2) {
				color: #000000;
			}
		}

		.apply {
			width: 183rpx;
			height: 53rpx;
			background: rgba(0, 0, 0, .26);
			border-radius: 26px;
			display: block;
			color: #FFFFFF;
			font-size: 24rpx;
			position: fixed;
			right: 20rpx;
			bottom: 130rpx;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}

	.sendMsg {
		width: 100%;
		height: 90rpx;
		background: #FFFFFF;
		position: fixed;
		bottom: 0;
		padding: 10rpx 25rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;

		input {
			width: 580rpx;
			height: 66rpx;
			background: rgba(245, 245, 245, 1);
			border-radius: 33rpx;
			font-size: 24rpx;
			line-height: 66rpx;
			padding: 0 30rpx;
			box-sizing: border-box;
		}

		p {
			color: #999999;
			font-size: 24rpx;
			width: 70rpx;
			text-align: center;
			height: 90rpx;
			line-height: 90rpx;
		}
	}

	.model {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		position: fixed;
		top: 0;
		z-index: 3;

		>.box {
			width: 600rpx;
			height: 684rpx;
			background: rgba(255, 255, 255, 1);
			border-radius: 30rpx;
			position: absolute;
			top: 200rpx;
			left: 75rpx;
			overflow: hidden;

			.voice {
				width: 100%;
				height: 390rpx;
				display: block;
				float: left;
			}

			.img {
				width: 510rpx;
				height: 290rpx;
				background: rgba(255, 255, 255, 1);
				border-radius: 20rpx;
				margin-top: -173rpx;
				float: left;
				margin-left: 45rpx;
				box-shadow: 0px 9px 32px 0px rgba(54, 179, 116, 0.2);

				div {
					width: 183rpx;
					height: 183rpx;
					margin-left: 163.5rpx;
					margin-top: -30rpx;
					float: left;
					background: rgba(255, 255, 255, 1);
					box-shadow: 0px 9rpx 32rpx 0px rgba(54, 179, 116, 0.2);
					border-radius: 50%;
					display: flex;
					justify-content: center;
					align-items: center;

					image {
						width: 128rpx;
						height: 140rpx;
					}
				}

				p {
					width: 100%;
					text-align: center;
					color: #333333;
					font-size: 30rpx;
					padding-top: 40rpx;
					float: left;
				}
			}

			.apply {
				width: 510rpx;
				height: 77rpx;
				line-height: 77rpx;
				color: #A96700;
				font-size: 28rpx;
				text-align: center;
				font-weight: bold;
				background: linear-gradient(117deg, rgba(247, 199, 78, 1), rgba(243, 223, 141, 1));
				box-shadow: 0px 6px 27px 0px rgba(177, 140, 48, 0.27);
				border-radius: 38px;
				float: left;
				margin-left: 45rpx;
				margin-top: 50rpx;
			}
		}

		.people {
			width: 100%;
			height: 50%;
			position: absolute;
			bottom: 0;
			background: rgba(255, 255, 255, 1);
			border-radius: 30rpx 30rpx 0px 0px;
			overflow-y: scroll;

			.title {
				width: 100%;
				height: 90rpx;
				text-align: center;
				line-height: 90rpx;
				color: #212121;
				font-size: 32rpx;
				font-weight: bold;
			}

			.box {
				width: calc(100% - 80rpx);
				height: 110rpx;
				margin-left: 40rpx;
				border-bottom: 1rpx solid #EDEDED;
				padding: 20rpx 0;
				box-sizing: border-box;

				image {
					width: 70rpx;
					height: 70rpx;
					float: left;
					border-radius: 50%;
				}

				p {
					line-height: 70rpx;
					color: #212121;
					font-size: 30rpx;
					font-weight: bold;
					float: left;
					margin-left: 10rpx;
				}

				span {
					width: 63rpx;
					height: 33rpx;
					line-height: 33rpx;
					background: rgba(233, 199, 84, 1);
					border-radius: 10rpx;
					color: #FFFFFF;
					font-size: 20rpx;
					margin-top: 18rpx;
					float: right;
					text-align: center;
				}

				.no {
					background: #E9E9E9;
					color: #999999;
				}
			}
		}
	}
</style>
