let main = {}
main.url = "https://qiketang.shengbokj.com/"
main.ImgUrl = "https://qiketang.shengbokj.com/"
main.userID = ''
main.openID = ''
main.SdkAppid = ''

main.tid = ''
main.t_order = "/teacher/t_order/index";
main.t_course = "/teacher/t_course/index";
main.t_personal = "/teacher/t_personal/index";
// 跳转页面
main.pageJump = function(url, tab) {
	if (tab) {
		uni.switchTab({
			url: url
		})
	} else {
		uni.navigateTo({
			url: url
		})
	}
}
main.redirectTo = function(url) {
	uni.redirectTo({
		url: url
	})
}
//返回上一页
main.navigateBack = function(num) {
	setTimeout(function() {
		uni.navigateBack({
			delta: num
		})
	}, 2000)
}
// 弹窗提示
main.showToast = function(title) {
	uni.showToast({
		title,
		icon: 'none',
		duration: 2000,
		mask: true,
	})
} // 检验手机号
main.isPhoneNumber = function(number) {
	var reg = /^1[3,4,5,7,8,9]\d{9}$/;
	if (!reg.test(number)) {
		return false
	} else {
		return true
	}
}
//去登陆
main.toLoing = function() {
	uni.showModal({
		title: '暂未登陆',
		content: '检测到您暂未登陆，马上去登陆吧！',
		cancelText: '随便看看',
		confirmText: '去登陆',
		confirmColor: '#3FCB85',
		success: function(res) {
			if (res.confirm) {
				console.log('用户点击确定');
				main.pageJump('/pages/user_S/user', true)
			} else if (res.cancel) {
				console.log('用户点击取消');
			}
		}
	});
}
export default main
