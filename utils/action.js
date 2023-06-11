const url = "http://101.34.19.31:4399/user/action"
export default function action(operate) {
	const openid = uni.getStorageSync('openid')
	return new Promise((resolve, reject) => {
		uni.request({
			url,
			method: "POST",
			data: {
				userid: openid,
				c_time: new Date().toLocaleString('chinese', {
					'hour12': false
				}),
				content: operate
			},
			dataType: 'json',
			success: (res) => {
				resolve(res)
			},
			fail: (err) => {
				reject('Network Error')
			}
		})
	})
}