<template>
	<view>
		<uni-section title="消息记录" type="line">
			<uni-list><uni-list-item v-for="(item, index) in actionList" :key="index" :title="item.msg" :note="item.c_time" /></uni-list>
		</uni-section>
	</view>
</template>

<script>
export default {
	data() {
		return {
			actionList: []
		};
	},
	onLoad() {
		const openid = uni.getStorageSync('openid');
		this.request({
			url: '/user/action?openid=' + openid
		}).then(
			res => {
				console.log(res.data);
				res.data.sort((a, b) => Date.parse(b.c_time) - Date.parse(a.c_time));
				this.actionList = res.data;
			},
			rea => {
				uni.showToast({
					icon: 'error',
					title: `请检查网络`
				});
			}
		);
	},
	methods: {}
};
</script>

<style></style>
