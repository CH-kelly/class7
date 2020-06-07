<template>
	<view class="date">
		<view class="flex date-top">
			<view v-for="(item,i) in calendar" 
				:key="i" 
				class="date-item">
				<view 
				@click="changeItem(i)"
				class="flex-column item" :class="{'active':item.select}">
					<text class="t-text week">{{item.week}}</text>
					<text class="t-text day">{{item.day}}</text>
					<text class="t-text month">{{item.month}}</text>
				</view>
			</view>
		</view>
		
		<view class="t-line"></view>
		
		<scroll-view 
		scroll-y="true"
		class="scroll-view"
		 >
			<view class="flex date-timer">
				<view v-for="(item,i) in timer"
					:key="i" >
					<view
					:class="{'no-item':item == ''}"
					class="timer-item">
						{{item}}
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer:["09:00-10:00","09:00-10:00",""],
				calendar:[]
			}
		},
		mounted() {
			this.getCurrentDate();
		},
		methods:{
			changeItem(i){
				let item = this.calendar[i];
				this.calendar.forEach(item=>{
					item.select = false
				})
				item.select = true;
			},
			// 计算日期
			getCurrentDate(format){
				var now = new Date();
				var month = now.getMonth();
				var date = now.getDate();
				var day = now.getDay();
				month = month + 1;
				let week = "1234560";
				let result = [];
				
				let arr = week.split(day)
				
				console.log(week,day,arr)
				let arr1 = arr[0].split("").reverse().forEach(item=>{
					let oTime =  this.getDay(-item)
					result.push(oTime);
				})
				result.push(
					{
						week:'星期'+ this.returnWeek(day),
						day:date,
						month:month+'月',
						select:true
					}
				);
				if(day!=0){
					let timer = 7-day;
					for(let i = 1; i<=timer; i++){
						let oTime =  this.getDay(+i)
						result.push(oTime);
					}
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
				
				return {
						week:'星期'+ this.returnWeek(oday),
						day:oDate,
						month:oMoth+'月',
						select:false
					}
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
			}
		}
	}
</script>

<style scoped>

	.date-top{
		margin: 22rpx 0;
	}
	
	
	.date-item{
		width: 14%;

	}
	.item{
		padding: 10rpx;
	}
	
	.week{
		font-size:24rpx;
		color:rgba(169,169,169,1);
	}
	.day{
		font-size:40rpx;
		
		font-weight:bold;
		color:rgba(80,80,80,1);
	}
	.month{
		font-size:20rpx;
		color:rgba(187,187,187,1);
	}
	
	.active{
		background: linear-gradient(to bottom,#3FCC86 8%,#2FB27F);
		box-shadow: 0 0 10rpx 10rpx rgba(49,189,119,0.1);
		border-radius: 20rpx;
	}
	.active>text{
		color: #ffffff !important;
	}
	
	.date-timer{
		flex-wrap: wrap;
		padding: 30rpx 30rpx 0 30rpx ;
		/* justify-content: space-evenly; */
	}
	.timer-item{
		height:58rpx;
		width:170rpx;
		line-height: 58rpx;
		text-align: center;
		border:1rpx solid rgba(191,191,191,1);
		border-radius:29rpx;
		
		
		font-size:24rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(187,187,187,1);
		margin-bottom: 30rpx;
		/* margin: 30rpx; */
		/* margin: 30rpx 50rpx 0 0; */
	}
	.no-item{
		border: none;
	}
	
	.scroll-view{
		height: 200rpx;

		/* height: 140rpx; */
	}
</style>
