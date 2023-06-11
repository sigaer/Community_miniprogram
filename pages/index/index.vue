<template>
	<view class="content">
		<view class="top">
			<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="true" :interval="4000" :duration="1000">
				<swiper-item><img src="/static/images/rolla.jpg" /></swiper-item>
				<swiper-item><img src="/static/images/rollb.jpg" /></swiper-item>
				<swiper-item><img src="/static/images/rollc.jpg" /></swiper-item>
			</swiper>
		</view>
		<view class="noticeBar">
			<uni-icons type="sound" size="35" color="#3795F9" style="margin:0 10rpx 0 15rpx;" />
			<swiper class="list" circular="true" vertical="true" autoplay="true" interval="3000" duration="1000">
				<swiper-item v-for="item in noticeList" :key="item.id" @click="toAnno(item.id)">
					<text style="font-size:20px;">{{ item.title }}</text>
				</swiper-item>
			</swiper>
			<uni-icons type="right" size="20" color="#999" style="margin-right: 15rpx;" />
		</view>
		<uni-card>
			<view class="outer">
				<view v-for="(item, index) in funList" :key="index" class="wrapper" @click="jumpTo(item.path)">
					<img :src="item.icon" style="width: 32px;height: 32px;" />
					<text>{{ item.title }}</text>
				</view>
			</view>
		</uni-card>
	</view>
</template>

<script>
export default {
	data() {
		return {
			title: 'Hello',
			noticeList: [],
			funList: [
				{ title: '实名认证', icon: '../../static/icon/auth.png', path: '/pages/auth/auth' },
				{ title: '健康档案', icon: '../../static/icon/archive.png', path: '/pages/archive/archive' },
				{ title: '紧急呼叫', icon: '../../static/icon/telephone.png', path: '/pages/urgent/urgent' },
				{ title: '社区公告', icon: '../../static/icon/anno.png', path: '/pages/anno/anno' },
				{ title: '聊天室', icon: '../../static/icon/team.png', path: '/pages/chatroom/chatroom' },
				{ title: '消息记录', icon: '../../static/icon/message.png', path: '/pages/message/message' }
			]
		};
	},
	onLoad() {
		// const url = '/user/info?openid=1';
		// this.request({
		// 	url: url,
		// 	dataType: JSON
		// }).then(res => {
		// 	console.log(res.data);
		// 	uni.setStorage({
		// 		key: 'userinfo',
		// 		data: JSON.stringify(res.data)
		// 	});
		// });
		this.request({
			url: '/anno'
		}).then(
			res => {
				this.noticeList = res.data
			},
			rea => {
				uni.showToast({
					icon: 'error',
					title: '请检查网络'
				});
			}
		);
		console.log(wx.getSystemInfo());
		uni.getStorage({
			key: 'openid',
			complete: res => {
				console.log(res);
				const openid = res.data;
				if (openid) {
					let url = '/user/info';
					this.request({
						url: url,
						method: 'POST',
						data: {
							openid: res.data
						}
					}).then(result => {
						console.log(result);
						if (result.statusCode == 401) {
							uni.setStorage({
								key: 'openid',
								data: openid
							});
							this.request({
								url: '/auth/login',
								data: {
									username: openid,
									password: 'wx'
								},
								method: 'POST'
							}).then(tokenRes => {
								console.log(tokenRes);
								if (tokenRes.data.code == 200) {
									uni.setStorageSync('token', 'Bearer ' + tokenRes.data.access_token);
									this.request({
										url: url
									}).then(reRes => {
										uni.setStorage({
											key: 'userinfo',
											data: JSON.stringify(reRes.data.data)
										});
									});
								} else {
									uni.showToast({
										icon: 'error',
										title: '网络异常'
									});
								}
							});
						} else {
							uni.setStorage({
								key: 'userinfo',
								data: JSON.stringify(result.data.data)
							});
						}
					});
				} else {
					uni.login({
						provider: 'weixin',
						success: loginRes => {
							console.log(loginRes);
							let code = loginRes.code;
							// 填写你的开发者appid
							let appid = '';
							// 填写你的开发者secret
							let secret = '';
							// 获取用户信息
							let url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&js_code=' + code + '&grant_type=authorization_code';
							uni.request({
								url: url,
								success: res => {
									const openid = res.data.openid;
									uni.setStorage({
										key: 'openid',
										data: openid
									});
									uni.getUserInfo({
										provider: 'weixin',
										success: infoRes => {
											const avatar = infoRes.userInfo.avatarUrl;
											let uuid = '';
											for (let i = 0; i < 6; i++) {
												uuid += Math.floor((1 + Math.random()) * 0x100000)
													.toString(16)
													.substring(1)
													.charAt(0);
											}
											console.log(openid);
											const username = `用户${uuid}`;
											const postdata = {
												openid,
												username,
												avatar
											};
											let url = '/user/register';
											this.request({
												url: url,
												data: postdata,
												method: 'POST'
											}).then(res => {
												console.log(res);
												if (res.data.code == 200) {
													console.log('Success');
													this.request({
														url: '/auth/login',
														data: {
															username: openid,
															password: 'wx'
														},
														method: 'POST'
													}).then(tokenRes => {
														console.log(tokenRes);
														if (tokenRes.data.code == 200) {
															uni.setStorage({
																key: 'token',
																data: 'Bearer ' + tokenRes.data.access_token
															});
															uni.getStorage({
																key: 'token',
																success: res => {
																	console.log(res.data);
																}
															});
														} else {
															uni.showToast({
																icon: 'error',
																title: '网络异常'
															});
														}
													});
												} else if (res.data.code == 403) {
													//没什么用的东西
													console.log('Openid has been used.');
												}
											});
										}
									});
								}
							});
						}
					});
				}
			},
			fail: rea => {
				console.log(rea);
			}
		});
	},
	methods: {
		jumpTo(path) {
			uni.navigateTo({
				url: path
			});
		},
		toAnno(id){
			console.log(id);
			uni.navigateTo({
				url:'/pages/anno/detail/detail?id='+id,
				complete(res) {
					console.log(res);
				}
			})
		}
	}
};
</script>

<style lang="scss" scoped>
.noticeBar {
	margin: 10rpx auto 20rpx;
	width: 690rpx;
	height: 50rpx;
	line-height: 50rpx;
	background: #f0fdff;
	color: #999;
	font-size: 24rpx;
	border-radius: 50rpx;
	display: flex;
	.list {
		width: 100%;
		height: 100%;
	}
}
.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.logo {
	height: 200rpx;
	width: 200rpx;
	margin-top: 200rpx;
	margin-left: auto;
	margin-right: auto;
	margin-bottom: 50rpx;
}

.text-area {
	display: flex;
	justify-content: center;
}

.title {
	font-size: 36rpx;
	color: #8f8f94;
}
.top {
	margin: 1.5rem;
	border-radius: 1rem;
	width: 80%;
	image {
		height: 300rpx;
		width: 100%;
	}
	overflow: hidden;
}
.swiper {
	height: 300rpx;
	border-radius: 2rem;
}
.swiper-item {
	display: block;
	border-radius: 2rem;
	height: 300rpx;
	line-height: 300rpx;
	text-align: center;
}
.uni-bg-red {
	background: #f76260;
	color: #fff;
}
.uni-bg-green {
	background: #09bb07;
	color: #fff;
}
.uni-bg-blue {
	background: #007aff;
	color: #fff;
}
.outer {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
}
.wrapper {
	width: 4rem;
	margin: 0.5rem;
	display: flex;
	flex-direction: column;
	align-items: center;
}
</style>
