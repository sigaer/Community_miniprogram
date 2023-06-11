<template>
	<view>
		<view class="userInfo">
			<image :src="avatar" mode=""></image>
			<text style="font-size: 18px;">{{ name }}</text>
		</view>
		<view class="panel">
			<view class="uni-navigate-item" v-for="(item, key) in list" :key="key" @click="goDetailPage(item.path)">
				<text class="uni-navigate-text">{{ item.name }}</text>
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
					path: 'information',
					name: '个人信息'
				},
				{
					path: 'archive',
					name: '我的健康档案'
				},
				{
					path: 'myquestion',
					name: '我发布的问题'
				},
				{
					path: 'help',
					name: '帮助与反馈'
				},
				{
					path: 'about',
					name: '关于我们'
				}
			],
			avatar: undefined,
			name: undefined
		};
	},
	onShow() {
		const { avatar, username } = JSON.parse(uni.getStorageSync('userinfo'));
		this.avatar = avatar;
		this.name = username;
		console.log(1111);
	},
	methods: {
		goDetailPage(path) {
			console.log(path);
			const url = path === 'archive' ? '/pages/archive/detail/detail' : '/pages/me/' + path + '/' + path;
			uni.navigateTo({
				url: url
			});
		}
	}
};
</script>

<style>
.userInfo {
	width: 80%;
	height: 135px;
	display: flex;
	justify-content: space-around;
	align-items: center;
}
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
}
</style>
