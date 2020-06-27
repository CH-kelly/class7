import main from '../main/main'
module.exports = {
	// GET请求
	Get(url, data = {}) {
		return new Promise((resolve, reject) => {
			uni.showLoading({
				title: '加载中...',
				mask: true
			})
			uni.request({
				url: main.url + url,
				method: 'GET',
				data: data,
				success(res) {
					uni.hideLoading();
					if (res.data.code === 1) {
						resolve(res.data.data)
					} else {
						main.showToast(res.data.msg)
					}
				},
				fail(err) {
					uni.hideLoading();
					main.showToast('网络出现异常')
					reject(err)
				}
			})
		})
	},
	// POST请求
	Post(url, data = {}) {
		return new Promise((resolve, reject) => {
			uni.showLoading({
				title: '加载中...',
				mask: true
			})
			uni.request({
				url: main.url + url,
				method: 'POST',
				data: data,
				// header:{
					// 'content-type':'application/x-www-form-urlencoded',
					// 'content-type':'application/x-www-form-urlencoded'
				// },
				success(res) {
					uni.hideLoading();
					if (res.data.code === 1) {
						resolve(res.data.data)
					} else {
						if(url === "xqcommentList" ){
							main.showToast('暂无更多评论')
							return false
						}
						if(data.page === undefined){
							if(res.data.msg !== ''){
								main.showToast(res.data.msg)
							}
						}else{
							main.showToast('下面没有了')
						}
					}
				},
				fail(err) {
					uni.hideLoading();
					// main.showToast('网络出现异常')
					reject(err)
				}
			})
		})
	},
	// 选择图片
	ChooseImage(num = {}) {
		return new Promise((resolve, reject) => {
			uni.chooseImage({
				count: num,
				sizeType: ['original', 'compressed'],
				sourceType: ['album', 'camera'],
				success(res) {
					// tempFilePath可以作为img标签的src属性显示图片
					const tempFilePaths = res.tempFilePaths
					resolve(tempFilePaths)
				}
			})
		})
	},
	//上传图片
	uploadImg(list = {}) {
		console.log(list)
		return new Promise((resolve, reject) => {
			uni.showLoading({
				title: '上传中...',
				mask: true
			})
			let arr = []
			for (let index = 0; index < list.length; index++) {
				uni.uploadFile({
					url: main.url + 'api/upload/uploadfile',
					filePath: list[index],
					name: 'file',
					success(res) {
						console.log(res)
						res.data = JSON.parse(res.data)
						if (res.data.code === 0) {
							main.showToast(res.data.msg)
							return false
						}
						arr.push(res.data.data)
						if (index === list.length - 1) {
							setTimeout(function() {
								wx.hideLoading();
								resolve(arr)
							}, 2000)
						}
					}
				})
			}
		})
	},
	//上传文件
	uploadFile(list = {}) {
		console.log(list)
		return new Promise((resolve, reject) => {
			uni.showLoading({
				title: '上传中...',
				mask: true
			})
			let arr = []
			for (let index = 0; index < list.length; index++) {
				uni.uploadFile({
					url: main.url + 'uploadFile',
					file: list[index],
					name: 'file',
					success(res) {
						console.log(res)
						res.data = JSON.parse(res.data)
						if (res.data.code === 0) {
							main.showToast(res.data.msg)
							return false
						}
						arr.push(res.data.data)
						if (index === list.length - 1) {
							setTimeout(function() {
								wx.hideLoading();
								resolve(arr)
							}, 2000)
						}
					}
				})
			}
		})
	},
	previewImage(current,urls){
		uni.previewImage({
			current,
			urls
		});
		
	}
}
