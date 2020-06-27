<template>
	<view class="background">

		<mlvb-live-room style="width: 100vw;height:100vh;" v-if="isRoom" id="id_liveroom" :userSig="userSig" :name="userID"
		 :SdkAppid="SdkAppid" :roomid="roomID" :roomName="roomName" template="float" :beauty="beauty" :debug="debug"
		 role="anchor" @RoomEvent="onRoomEvent">
		</mlvb-live-room>

		<view class="flex on-line-top">
			<view class="flex line-top-back" >
				<image class="avatar" :src="teacher_avatar" mode=""></image>
				<view class="flex-column line-info">
					<text class="t-text nickname">{{teacher_name}}</text>
					<view class=""  @click="onlineNumber">
						<image class="member-icon" src="/static/teacher/member.png" mode=""></image>
						<text class="t-text add-number">30人</text>
					</view>
				</view>
			</view>
			<view class="flex line-back" @click="changeCamera">
				<image class="camera" src="/static/teacher/camera.png" mode=""></image>
			</view>
			<view class="flex line-back" @click="changeVolume">
				<image class="volume" src="/static/teacher/volume.png" mode=""></image>
			</view>
			<view class="flex line-back"  @click="lianmai">
				<image class="share" src="/static/teacher/line.png" mode=""></image>
				<view class="share-number" v-if="audienceLists.length > 0" >{{audienceLists.length}}</view>
			</view>
		</view>
		
		<view class="flex line-back go-to-back"  @click="closeOnLine">
			<image class="camera" src="/static/teacher/close1.png" mode=""></image>
		</view>

		<!-- 弹幕 -->
		<view class="bullet-chat">
			<scroll-view scroll-y="true" class="chat-scroll-view" :scroll-top="scrollTop">
				<view class="chat-lists" v-for="(item,i) in chatList" :key="i">
					<text class="t-text chat-name" v-if="item.userName">{{item.userName}}：</text>
					<text class="t-text chat-content">{{item.message}}</text>
				</view>
				<!-- <view class="chat-lists">
					<text class="t-text chat-name">陈达：</text>
					<text class="t-text chat-content">这个是怎么做到的</text>
				</view>
				<view class="chat-lists">
					<text class="t-text chat-name">陈达：</text>
					<text class="t-text chat-content">这个是怎么做到的</text>
				</view>
				<view class="chat-lists">
					<text class="t-text chat-name">陈达：</text>
					<text class="t-text chat-content">这个是怎么做到的</text>
				</view> -->
			</scroll-view>
		</view>
		<!-- 在线人数 -->
		<view class="online-number" :class="{'online-number-ipx':iphonex}"  v-if="isShowOnLine==1">
			<view class="online-lists">
				<view class="online-title">在线人数（26）</view>
				<scroll-view scroll-y="true" class="online-scroll">

					<view class="flex online-item">
						<view class="flex online-item-left">
							<image src="/static/logo.jpg" mode=""></image>
							<text class="t-text ">李静</text>
						</view>
						<view class="online-item-right">在线</view>
					</view>
					<view class="t-line"></view>

				</scroll-view>
				<image @click="closeShowOnLine" src="/static/teacher/delete.png" mode=""></image>
			</view>
		</view>

		<!-- 连麦人数 -->
		<view class="online-number" :class="{'online-number-ipx':iphonex}"  v-if="isShowLianmai==1">
			<view class="online-lists">
				<view class="online-title">连麦人数（{{audienceLists.length}}）</view>

				<scroll-view scroll-y="true" class="online-scroll">
					
					<view class="" v-for="(item,i) in audienceLists" :key="i">
						<view class="flex online-item">
							<view class="flex online-item-left">
								<image v-if="item.userAvatar" :src="item.userAvatar" mode=""></image>
								<text class="t-text " v-if="item.userName" >{{item.userName}}</text>
							</view>
							<view class="flex Lianmai-item-right">
								<view class="online-item-right" @click="agree(item,i)">同意</view>
								<view class="online-item-right Lianmai-refuse"  @click="refuse(item,i)">拒绝</view>
							</view>
						</view>
						<view class="t-line"></view>
					</view>

				</scroll-view>
				<image @click="closeShowLianmai" src="/static/teacher/delete.png" mode=""></image>

			</view>
		</view>



	</view>
</template>

<script>
	
	import utils from "common/utils.js"
	
	const {
		Post
	} = require('@/main/mainFun.js')
	let liveroom = ''
	import mlvbliveroomcore from '@/wxcomponents/mlvb-live-room/mlvbliveroomcore.js'
	import main from '@/main/main.js'


	export default {
		data() {
			return {
				trtcConfig: {},
				iphonex:false,
				id: 0,
				user_id: 0,

				scrollTop: 0, //滚动位置

				isShowOnLine: 0,
				isShowLianmai: 0,


				SdkAppid: '',
				userID: '',
				userSig: '',
				isRoom: false,
				roomID: '',
				roomName: '123',
				beauty: 3,
				muted: true,
				debug: true,
				role: 'anchor',
				
				frontCame:true,
				teacher_name:'',
				teacher_avatar:'',
				
				chatList:[],	//弹幕列表
				audienceLists:[],	//	连麦列表
			}
		},
		onLoad(e) {
			console.log(e);
			this.id = e.id;
			this.user_id = e.user_id;
			

			this.bottom = utils.bottom	
			this.iphonex = utils.iphonex;
		},
		onShow(){},
		onReady() {
			var that = this;
			Post("/api/Video/getSig", {
				type: 'curriculum',
				status_id: this.id,
				user_id: main.userID
			}).then(res => {
				that.userID = res.userID
				that.SdkAppid = res.SdkAppid
				that.userSig = res.userSig
				that.roomID = res.roomID
				that.roomName = res.roomID,
				that.isRoom = true
				
				that.teacher_name = res.teacher_name;
				that.teacher_avatar = res.teacher_avatar
				
				let loginInfo= {
					sdkAppID: res.SdkAppid,
					userID: res.userID,
					userSig: res.userSig,
					userName: res.teacher_name,
					userAvatar: res.teacher_avatar
				}
				console.log(loginInfo);
				wx.showLoading({
				  title: '加载中',
				})
				mlvbliveroomcore.login({
					data: loginInfo,
					success: function(ret) {
						wx.hideLoading()
						liveroom = that.selectComponent("#id_liveroom");
						liveroom.start();
					},
					fail: function(ret) {
						//登录失败
						console.log(456)
					}
				})
		
			})
		},
		
		  /**
		   * 生命周期函数--监听页面隐藏
		   */
		  onHide: function () {
				liveroom && liveroom.pause();
		  },
		methods: {
			
			onRoomEvent:function(e){
				var that = this;
				var args = e.detail;
				console.log('onRoomEvent', args)
				  
				 switch(e.detail.tag){
					case 'roomClosed': {
						//房间已经关闭
						main.showToast('直播间已关闭')
						break;
					}
					case 'error': {
						//发生错误
						var code = e.detail.code;
						var detail = e.detail.detail;
						break;
					}
					case 'recvTextMsg': {
						//收到文本消息
						var text = e.detail.detail;
						let chatList = this.chatList;
						chatList.push(text)
						that.chatList = chatList;
						that.scrollTop = chatList.length * 999
						break;
					}
					case 'requestJoinAnchor': {
						//主播收到来自观众的连麦请求
						var audience = e.detail.detail;
						var name = audience.userName;
						var id = audience.userID;
						
						let audienceLists = this.audienceLists;
						audienceLists.push(audience)
						that.audienceLists = audienceLists; 
						console.log('audienceLists ---------  ',audienceLists)
						
						break;
					}
					case 'linkOn': {
						//连麦观众在连麦成功时会收到此通知
						
						var audience = e.detail.detail;
						console.log(audience);
						
						
						break;
					}
					case 'linkOut': {
						//连麦观众退出连麦时会收到此通知
						break;
					}
					default: {
					console.log('onRoomEvent default: ', e)
					break;
				  }
				}
			},
			// 切换摄像头
		  changeCamera: function () {
			 console.log('changeCamera ------');
			 
			 liveroom && liveroom.switchCamera();
				 
		  },
		  // 关闭直播间
		  closeOnLine(){
			  wx.showModal({
			    title: '关闭直播间',
			    content: '确认关闭直播间吗？',
			    success (res) {
			      if (res.confirm) {
						liveroom && liveroom.stop();
						main.navigateBack(1)
			      } else if (res.cancel) {
			        console.log('没有关闭');
			      }
			    }
			  })
		  }, 
		  // 设置音量
		  changeVolume(){
			  console.log('changeVolume ------');
			LivePusherContext.setMICVolume({
				volume:1,
				success(){
					console.log(1)
				},
				fail(){
					console.log(2)
				}
			})
		  },
			onlineNumber() {
				let is = this.isShowOnLine;
				this.isShowOnLine = is == 1 ? 0 : 1;
				this.isShowLianmai = 0;
			},
			lianmai() {
				let is = this.isShowLianmai;
				this.isShowLianmai = is == 1 ? 0 : 1;
				this.isShowOnLine = 0;
			},
			
			closeShowLianmai(){
				this.isShowLianmai = 0;
				this.isShowOnLine = 0;
			},
			closeShowOnLine(){
				this.isShowLianmai = 0;
				this.isShowOnLine = 0;
			},
			// 同意连麦
			agree(audience,index){
				// main.showToast('同意连麦开发中...')
				// 允许请求
				liveroom && liveroom.respondJoinAnchor(true, audience);
				var audience = this.audienceLists;
				audience.splice(index,1);
				this.audienceLists = audience
			},
			
			// 拒绝连麦
			refuse(audience,index){
				// main.showToast('拒绝连麦开发中...')
				// 拒绝连麦
				liveroom && liveroom.respondJoinAnchor(false, audience)
				var audience = this.audienceLists;
				audience.splice(index,1);
				this.audienceLists = audience
			},
			getSig() {
				var that = this;
				Post("/api/Video/getSig", {
					type: 'curriculum',
					status_id: this.id,
					user_id: main.userID
				}).then(res => {
					that.userID = res.userID
					that.SdkAppid = res.SdkAppid
					that.userSig = res.userSig
					that.roomID = res.roomID
					that.roomName = res.userID;
					that.isRoom = true;
					that.nickname = res.nickName;
					that.user_avatar = res.user_avatar
					
					
					setTimeout(() => {
						liveroom = that.selectComponent("#id_liveroom");
						liveroom.start();
					}, 100)

				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@function tovmin($rpx){//$rpx为需要转换的字号
	    @return #{$rpx * 100 / 750}vmin; 
	}
	
	.background {
		height: 100vh;
		width: 100vw;
		overflow: hidden;
		background-image: -webkit-radial-gradient(circle at top, #584C62, #151E57);
		background-image: radial-gradient(circle at top, #584C62, #151E57);

		position: relative;
	}

	.on-line-top {
		width: tovmin(600);
		position: absolute;
		top: tovmin(30);
		left: 80px;
		z-index: 9;
	}

	.nickname {
		font-size: tovmin(30);
		font-weight: bold;
		color: rgba(255, 255, 255, 1);
	}

	.add-number {
		font-size: tovmin(22);
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
	}
	.line-top-back{
		width: tovmin(206);
		
		background: rgba(0, 0, 0, 0.5);
		border-radius: 40px;
		padding: tovmin(14) tovmin(24);
		justify-content: flex-start;
		
		position: relative;
	}
	.line-back {
		width:  tovmin(80);
		height:  tovmin(80);
		background: rgba(0, 0, 0, 0.5);
		border-radius: 40px;
		// padding: tovmin(14) tovmin(24);
		justify-content: center;
		
		position: relative;
	}

	.member-icon {
		width: tovmin(20);
		height: tovmin(22);
		margin-right: tovmin(6);
	}

	.avatar {
		width: tovmin(70);
		height: tovmin(70);
		border-radius: 50%;
		margin-right: tovmin(10);
	}

	.camera {
		width: tovmin(45);
		height: tovmin(38);
	}

	.volume {
		width: tovmin(38);
		height: tovmin(38);
	}

	.share {
		width: tovmin(53);
		height: tovmin(23);
	}

	.share-number {
		position: absolute;
		top: -5rpx;
		right: -4rpx;

		width: tovmin(28);
		height: tovmin(28);
		line-height: tovmin(28);
		background: rgba(255, 255, 255, 1);
		border-radius: 50%;

		text-align: center;


		font-size: tovmin(20);
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(255, 0, 0, 1);
	}


	/* 聊天内容 */
	.bullet-chat {
		width: tovmin(600);
		height: tovmin(200);

		position: absolute;
		bottom: 10px;
		left: 80px;
		z-index: 9;

	}

	.chat-scroll-view {
		width: tovmin(600);
		height: tovmin(200);
	}

	.chat-name {
		font-size: tovmin(28);
		font-weight: 500;
		color: #BBBBBB;
	}

	.chat-content {
		font-size: tovmin(28);
		font-weight: 500;
		color: #FFFFFF;
	}



	/* 在线人数 */
	.online-number {
		// width: 100vw;
		height: calc(100vh - 50%);
		position: fixed;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: 9;
	}
	.online-number-ipx{
		padding-left: tovmin(60);
	}

	.online-title {
		height: tovmin(80);
		line-height: tovmin(80);
		text-align: center;
		font-size: tovmin(32);
		font-weight: bold;
		color: rgba(34, 34, 34, 1);
	}

	.online-lists {
		/* width: 100%; */
		height: 100%;
		background: #FFFFFF;
		border-radius: tovmin(20) tovmin(20) 0px 0px;
		/* padding: 100rpx; */
		padding: 0 tovmin(30);

	}

	.online-lists>image {
		width: tovmin(34);
		height: tovmin(34);

		position: absolute;
		z-index: 1;
		top: 10rpx;
		right: 20rpx;

	}

	.online-scroll {
		height: calc(100% - 80rpx);
	}

	.online-item {
		padding: tovmin(20) 0;
	}

	.online-item-left {
		width: 50%;
		justify-content: flex-start;

	}

	.online-item-left>image {
		width: tovmin(68);
		height: tovmin(68);
		border-radius: 50%;
	}

	.online-item-left>text {
		font-size: tovmin(30);
		font-weight: bold;
		color: rgba(34, 34, 34, 1);
	}

	.online-item-right {
		width: tovmin(80);
		height: tovmin(40);
		line-height: tovmin(40);
		text-align: center;
		background: rgba(233, 200, 84, 1);
		border-radius: 10rpx;

		font-size: tovmin(30);
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
	}


	.Lianmai-item-right {
		width: 50%;
		justify-content: flex-end;
	}

	.Lianmai-refuse {
		margin-left: tovmin(30);
		background: rgba(255, 255, 255, 1);
		color: rgba(153, 153, 153, 1);
	}
	
	
	.go-to-back{
	
		position: absolute;
		top: tovmin(30);
		right: 120px;
		z-index: 9;
	}
</style>
