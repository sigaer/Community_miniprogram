const baseurl = "http://101.34.19.31:4399"
export default function request(options) {
	const token = uni.getStorageSync('token')
	return new Promise((resolve, reject) => {
		console.log(token);
		if (token) {
			uni.request({
				url: baseurl + options.url,
				method: options.method || "GET",
				data: options.data,
				dataType: 'json',
				header: {
					'Authorization': token
				},
				success: (res) => {
					resolve(res)
				},
				fail: (err) => {
					reject('Network Error')
				}
			})
		} else {
			uni.request({
				url: baseurl + options.url,
				method: options.method || "GET",
				data: options.data,
				dataType: 'json',
				success: (res) => {
					resolve(res)
				},
				fail: (err) => {
					reject('Network Error')
				}
			})
		}
	})
}