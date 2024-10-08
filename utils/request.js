const BASE_URL = 'https://tea.qingnian8.com/api/bizhi'

export function request(config = {}) {
	let {
		url,
		data ={},
		header = {},
		method = "GET",
	} = config
	url = BASE_URL + url
	header['access-key'] = "zad@mail.com"
	return new Promise((resolve, reject) => {
			uni.request({
					url,
					data,
					header,
					method,
					success(res) {
						if (res.data.errCode === 0) {
							resolve(res.data)
						} else if(res.data.errCode === 400) {
							uni.showModal({
								title: "错误提示",
								content: res.data.errMsg,
								showCancel: false
							})
							resolve(res.data)
						} else {
							uni.showToast({
								title: res.data.errMsg,
								showCancel: false
							})
							resolve(res.data)
						}
					},
					fail(err) {
						reject(err)
					}
			})
	})
}