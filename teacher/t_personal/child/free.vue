<template>
	<view class="c-refuse" @click="close">
		<view class="c-background">
			<view class="content">
				<view class="flex top">
					<image @click="close" src="/static/teacher/close.png" mode=""></image>
					<text class="t-text title">添加空余时间</text>
					<text @click.stop="submit" class="t-text submit">确定</text>
				</view>
				<view class="t-line"></view>
				<view class="flex middle">
					<view class="flex-column middle-left" @click.stop="showStartTimer">
						<text class="start">开始时间</text>
						<text v-show="startTime==0"  class="chose-title">请选择</text>
						<text v-show="startTime==1"  class="middle-date">({{startTimeDate}})</text>
						<text v-show="startTime==1"  class="middle-minute">{{startTimeHour}}:{{startTimeMinute}}</text>
					</view>
					<view class="flex-column middle-left"  @click.stop="showEndTimer">
						<text class="start">结束时间</text>
						
						<text v-show="endTime==0"  class="chose-title">请选择</text>
						<text v-show="endTime==1" class="middle-date">({{endTimeDate}})</text>
						<text v-show="endTime==1" class="middle-minute">{{endTimeHour}}:{{endTimeMinute}}</text>
					</view>
					
				</view>
				<view class="bottom">
					<view class="t-line"></view>
					<view v-show="showStart==1" >
						<view class="flex bottom-picker" >
							<view class="bottom-date">
								<!-- <view class="date-active"> </view> -->
								<view v-for="(i,n) in calendar" :key="n">
									<view
									 :class="{'calendar-active':i.active==true}"
									 class="t-text calendar"
									 @click.stop="changeOne(i,n)"
									 >
										{{i.year}}{{i.month}}{{i.day}}{{i.week}}
									 </view>
								</view>
								
							</view>
							<view class="bottom-clock">
								<view v-for="(i,n) in calendar[current].hour" :key="n" >
									<view
									 :class="{'calendar-active':i.active==true}"
									 @click.stop="changeTwo(i)"
									 class="t-text calendar">
										{{i.hour1}}
									 </view>
								</view>
							</view>
							<view class="bottom-minute">
								<view v-for="(i,n) in calendar[current].minute" :key="n" >
									<view
									 :class="{'calendar-active':i.active==true}"
									 @click.stop="changeThree(i)"
									 class="t-text calendar">
										{{i.minute1}}
									</view>
								</view>
							</view>
						</view>
						
					</view>
					
					<view v-show="showEnd==1" >
						<view class="flex bottom-picker" >
							<view class="bottom-date">
								<!-- <view class="date-active"> </view> -->
								<view>
									<view class="t-text calendar" @click.stop="">
										{{startTimeDate}}
									 </view>
								</view>
								
							</view>
							<view class="bottom-clock">
								<view v-for="(i,n) in calendar[current].hour" :key="n" >
									<view
									 :class="{'calendar-active':i.active==true}"
									 @click.stop="changeTwo(i,2)"
									 class="t-text calendar">
										{{i.hour1}}
									 </view>
								</view>
							</view>
							<view class="bottom-minute">
								<view v-for="(i,n) in calendar[current].minute" :key="n" >
									<view
									 :class="{'calendar-active':i.active==true}"
									 @click.stop="changeThree(i,2)"
									 class="t-text calendar">
										{{i.minute1}}
									</view>
								</view>
							</view>
						</view>
						
					</view>
					<view class="t-line"></view>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	
	const { Post } = require('@/main/mainFun.js')
	import main from '@/main/main.js'
	
	export default {
		props:{
			teacherId:{
				type:Number,
				default:0,			
			},
		},
		data() {
			return {
				number:0,
				height:320,
				startTime:0,
				calendar:[],
				current:0,
				startTimeDate:'',
				startTimeHour:'',
				startTimeMinute:'',
				showStart:0,
				
				endTime:0,
				calendar2:[],
				current2:0,
				showEnd:0,
				endTimeDate:'',
				endTimeHour:'',
				endTimeMinute:'',
				
				
			}
		},
		mounted() {
			this.getCurrentDate();
		},
		methods:{
			returnfalseDate(){
				this.calendar.forEach(item=>{
					item.active = false
				})
			},
			returnfalseHour(){
				let arr = this.calendar[this.current].hour
				arr.forEach(item=>{
					item.active = false
				})
			},
			returnfalseMinute(){
				let arr = this.calendar[this.current].minute
				arr.forEach(item=>{
					item.active = false
				})
			},
			
			showStartTimer(){
				this.showStart = 1;
				this.showEnd = 0;
				this.returnfalseDate();
				this.returnfalseHour();
				this.returnfalseMinute();
			},
			
			changeOne(i,n,type=1){
				
				this.current = n;
				this.returnfalseDate();
				this.returnfalseHour();
				this.returnfalseMinute();
				i.active = true;
				
					
				this.startTime = 1;
				this.endTime = 1;
				this.startTimeDate = i.year+i.month+i.day;
				
				this.startTimeHour  = this.startTimeMinute  = '';
				this.endTimeDate = this.endTimeHour = this.endTimeMinute =  '';
			},
			changeTwo(i){
				
				this.startTimeHour = (i.hour<10)? ('0'+i.hour): i.hour ;
				this.returnfalseHour();
				i.active = true;
				
				if(this.startTimeDate &&  this.startTimeHour && this.startTimeMinute){
					
					// 选择完分钟后，就开始计算结束时间
					var dataTime = this.startTimeDate +" "+ this.startTimeHour +":"+ this.startTimeMinute+":"+ "00";
					var result = this.get_time_after_45_minutes(dataTime);
					this.endTimeDate = result.end;
					this.endTimeHour = result.hour;
					this.endTimeMinute = result.min;
				}
				
				
			},
			changeThree(i){
				
					
				this.startTimeMinute =  i.minute;
				
				
				if(this.startTimeDate &&  this.startTimeHour && this.startTimeMinute){
					// 选择完分钟后，就开始计算结束时间
					var dataTime = this.startTimeDate +" "+ this.startTimeHour +":"+ this.startTimeMinute+":"+ "00";
					var result = this.get_time_after_45_minutes(dataTime);
					this.endTimeDate = result.end;
					this.endTimeHour = result.hour;
					this.endTimeMinute = result.min;
				}
				
				
				this.returnfalseMinute();
				i.active = true;
			},
			
			showEndTimer(){
				this.showStart = 0;
				this.showEnd = 1;
				this.returnfalseDate();
				this.returnfalseHour();
				this.returnfalseMinute();
			},
		
			close(){
				this.$emit("close");
			},
			submit(){
				console.log('提交');
				let date = this.startTimeDate;
				let starthour = this.startTimeHour;
				let startminute = this.startTimeMinute;
				let endhour = this.endTimeHour;
				let endminute = this.endTimeMinute;
				if(!date){
					return main.showToast('请选择预约日期');
				}
				if(!starthour){
					return main.showToast('请选择开始小时');
				}
				if(!startminute){
					return main.showToast('请选择开始分钟');
				}
				if(!endhour){
					return main.showToast('请选择结束小时');
				}
				if(!endminute){
					return main.showToast('请选择结束分钟');
				}
				var that = this;
				Post("/api/teacher/add_teacher_yuyuetime",{
					teacher_id:this.teacherId,
					date,
					starthour,
					startminute,
					endhour,
					endminute
				}).then(res=>{
					that.$emit("submit");
					return main.showToast('添加成功');
				})
				
				
			},
			getCurrentDate(format){
				var now = new Date();
				var year = now.getFullYear();
				var month = now.getMonth();
				var date = now.getDate();
				var day = now.getDay();
				var hour = now.getHours();
				month = month + 1;
				
				let result = [];
				result.push(
					{
						week:'今天',
						year:year+'/',
						day:date,
						month:month+'/',
						select:true,
						active:false,
						i:0,
						hour:this.getHours(hour+1),
						minute:this.getMinute()
					}
				);
				let height =  70 / 750 * wx.getSystemInfoSync().windowWidth;
				for(let i = 1; i<=10; i++){
					let oTime =  this.getDay(+i)
					result.push(oTime);
				}
				this.calendar = result;
			},
			getDay(num) {
				var today = new Date();
				var nowTime = today.getTime();
			    var ms = 24*3600*1000*num;
			    today.setTime(parseInt(nowTime + ms));
			    var oYear = today.getFullYear();
			    var oMoth = (today.getMonth() + 1).toString();
			    var oDate = today.getDate().toString();
				var oday = today.getDay();
				var oyear = today.getFullYear();
				return {
						week:'星期'+ this.returnWeek(oday),
						day:oDate,
						year:oyear+'/',
						month:oMoth+'/',
						select:false,
						active:false,
						i:num,
						hour:this.getHours(0),
						minute:this.getMinute()
					}
			},
			getMinute(){
				let arr = [];
				for(var i = 0;i<6;i++){
					let minute1 = i+'0分';
					arr.push({
						minute1:minute1,
						active:false,
						minute:i+'0',
					})
				}
				return  arr;
			},
			getHours(hour = 0){
				let clock2 = [];
				for(let i=hour;i<=22;i++){
					let hour1 = i+'点';
					clock2.push({
						hour1:hour1,
						active:false,
						hour:i,
					})
				}
				return  clock2;
			},
			returnWeek(i){
				let week = '';
				if(i == 0 || i == 7){
					week = "日"
				}else if(i == 1){
					week = "一"
				}else if(i == 2){
					week = "二"
				}else if(i == 3){
					week = "三"
				}else if(i == 4){
					week = "四"
				}else if(i == 5){
					week = "五"
				}else if(i == 6){
					week = "六"
				}
				return week;
			},
			
			get_time_after_45_minutes(dataTime){
				var timer = new Date(dataTime).getTime();
				var minutes = ((timer/1000) + 2700) * 1000;
				let next = new Date(minutes);
				var oYear = next.getFullYear();
				var oMoth = (next.getMonth() + 1).toString();
				var oDate = next.getDate().toString();
				var oday = next.getDate();
				var result = {
					end:oYear+'/'+oMoth+'/'+((oday>9)? oday : '0'+oday),
					hour:((next.getHours() > 9) ? next.getHours() : '0'+next.getHours()),
					min:((next.getMinutes()>9)? next.getMinutes() : '0'+next.getMinutes()) ,
				}
				console.log(result);
				return result
				
			},
		}
	}
</script>

<style scoped>
	.c-refuse{
		width: 100vw;
		height: 100vh;
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 9;
		background-color: rgba(0,0,0,0.5);
	}
	.c-background{
		width: 100vw;
		position: absolute;
		bottom: 0;
	}
	.content{
		padding: 30rpx 0 ;
		background: rgba(255,255,255,1);
		border-radius:20px 20px 0px 0px;
	}
	.top{
		padding: 0 30rpx 30rpx 30rpx;
	}
	.top>image{
		width: 27rpx;
		height: 27rpx;
	}
	
	.title{
		font-size:34rpx;
		color:rgba(25,25,25,1);
	}
	
	/* 提交 */
	.submit{
		font-size:34rpx;
		color:rgba(63,204,134,1);
	}
	
	
	
	
	/* 中间样式 */
	.start{
		font-size:26rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(87,95,121,1);
	}
	.middle{
		padding: 30rpx 0;
		align-items: flex-start;
	}
	.middle-left{
		width: 50%;
	}
	.middle-date{
		margin-top: 20rpx;
		font-size:24rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(33,33,33,1);
	}
	.middle-minute{
		
		margin-top: 30rpx;
		font-size:36rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(33,33,33,1);
	}
	.chose-title{
		
		margin-top: 45rpx;
		font-size:36rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(187,187,187,1);
		
	}

	.bottom{
		position: relative;
		height: 200rpx;
		padding: 0 30rpx;
	}
	.bottom-picker{
		/* position: absolute;
		width: 100%;
		height: 200rpx;
		z-index: 0; */
	}
	
	.bottom-date{
		width: 50%;
		height: 200rpx;
		overflow: scroll;
		overflow-y: auto;
	}
	.bottom-clock{
		width: 25%;
		height: 200rpx;
		overflow: scroll;
		overflow-y: auto;
	}
	.bottom-minute{
		width: 25%;
		height: 200rpx;
		overflow: scroll;
		overflow-y: auto;
		
	}
	.calendar{
		width: 100%;
		height: 70rpx;
		line-height: 70rpx;
		text-align: center;
		color: rgba(0,0,0,0.5);
	}
	.calendar-active{
		color: #ff0000;
	}
	
</style>
