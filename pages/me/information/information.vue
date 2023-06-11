<template>
	<view>
		<view class="panel">
			<view class="uni-navigate-item" v-for="(item, key) in list" :key="key" @click="goDetailPage(item)">
				<text class="uni-navigate-text">{{ item.fieldName }}</text>
				<img :src="item.content" v-if="item.type === 'avatar'" style="width:2rem;height:2rem" />
				<text v-else>{{ item.type === 'gender' ? (item.content == 1 ? '男' : '女') : item.content }}</text>
				<uni-icons type="forward" size="24"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: [
				{
					fieldName: '头像',
					title: '设置头像',
					type: 'avatar'
				},
				{
					fieldName: '性别',
					title: '设置性别',
					type: 'gender'
				},
				{
					fieldName: '年龄',
					title: '设置年龄',
					type: 'age'
				},
				{
					fieldName: '昵称',
					title: '设置昵称',
					type: 'username'
				},
				{
					fieldName: '家庭地址',
					title: '设置地址',
					type: 'address'
				},
				{
					fieldName: '联系方式',
					title: '设置联系方式',
					type: 'phone'
				},
				{
					fieldName: '紧急联系人',
					title: '设置紧急联系人',
					type: 'urgent'
				}
			]
		};
	},
	onShow() {
		console.log('dinner');
		const openid = uni.getStorageSync('openid');
		this.openid = openid;
		const userinfo = JSON.parse(uni.getStorageSync('userinfo'));
		console.log(userinfo);
		if (userinfo) {
			this.userinfo = userinfo;
			this.list = this.list.map((value, index) => {
				// if (value['type'] === 'gender') {
				// 	value['content'] = userinfo[value['type']] == 1 ? '男' : '女';
				// } else {
				value['content'] = userinfo[value['type']] || '';
				// }
				return value;
			});
			console.log(this.list);
		} else {
			const openid = uni.getStorageSync('openid');
			const url = `/user/info?openid=${openid}`;
			this.request({
				url: url,
				dataType: JSON
			}).then(res => {
				console.log(res.data);
				this.list = this.list.map((value, index) => {
					value['content'] = res.data[value['type']];
					return value;
				});
			});
		}
	},
	methods: {
		goDetailPage(obj) {
			const { title, type, content } = obj;
			const url = '/pages/general/general';
			if (type === 'avatar') {
				uni.chooseMedia({
					success: res => {
						console.log(res);
						const files = res.tempFiles;
						if (files.length > 1) {
							uni.showToast({
								title: '只能选择一张图片'
							});
						}
						const imgPath = files[0].tempFilePath;
						uniCloud.uploadFile({
							cloudPath: `${new Date().getTime()}.png`,
							filePath: imgPath,
							onUploadProgress: progressEvent => {
								console.log(progressEvent);
								var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
								console.log(percentCompleted);
							},
							success: res => {
								console.log('Upload successfully');
								const uploadUrl = res.fileID;
								this.userinfo.avatar = uploadUrl;
								const url = '/user/updateinfo';
								const postdata = {
									type: 'avatar',
									content: uploadUrl,
									openid: this.openid
								};
								console.log(postdata);
								this.request({
									url: url,
									data: postdata,
									method: 'POST'
								}).then(
									res => {
										if (res.data.code == 200) {
											uni.setStorageSync('userinfo', JSON.stringify(this.userinfo));
											const oldInfo = this.list[0];
											oldInfo['content'] = uploadUrl;
											this.list.splice(0, 1, oldInfo);
											uni.showToast({
												duration: 2000,
												title: '保存成功'
											});
											// uni.redirectTo({
											// 	url:'/pages/me/information/information'
											// })
										} else {
											uni.showToast({
												duration: 2000,
												icon: 'error',
												title: '请检查网络'
											});
										}
										console.log(res);
									},
									rea => {
										uni.showToast({
											duration: 2000,
											icon: 'error',
											title: '请检查网络'
										});
									}
								);
							},
							fail(rea) {
								console.log('Upload failed');
							}
						});
					}
				});
			} else {
				uni.navigateTo({
					url: url + `?title=${title}&type=${type}&content=${content}`
				});
			}
		}
	}
};
</script>

<style>
image {
	width: 96px;
	height: 96px;
}

.uni-navigate-item {
	display: flex;
	align-items: center;
	background-color: #ffffff;
	border-top-style: solid;
	border-top-color: #f0f0f0;
	border-top-width: 1px;
	padding: 12px;
}

.uni-navigate-text {
	flex: 1;
	color: #000000;
	font-size: 18px;
	font-weight: normal;
	min-width: 150rpx;
	padding-right: 50rpx;
}
</style>
