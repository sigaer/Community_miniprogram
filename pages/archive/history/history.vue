<template>
	<view>
		<uni-section title="历史记录" type="line">
			<uni-list>
				<uni-list-item v-for="item in list" :key="item.id" :title="item.c_time+' 健康记录'" showArrow link :to="'../record/record?id='+item.id" />
			</uni-list>
		</uni-section>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: []
		};
	},
	onLoad() {
		const openid = uni.getStorageSync('openid');
		this.request({
			url: '/user/healthinfo?openid=' + openid
		}).then(
			res => {
				console.log(res.data);
				this.list = res.data.sort((a, b) => Date.parse(b.c_time) - Date.parse(a.c_time));
			},
			rea => {
				uni.showToast({
					icon: 'error',
					title: '请检查网络'
				});
			}
		);
	},
	methods: {}
};
</script>

<style></style>
