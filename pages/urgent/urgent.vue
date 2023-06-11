<template>
	<view></view>
</template>

<script>
export default {
	data() {
		return {};
	},
	onLoad() {
		const { urgent } = JSON.parse(uni.getStorageSync('userinfo'));
		uni.makePhoneCall({
			phoneNumber: urgent,
			success: r => {
				console.log(r);
				this.action('phone').then(
					res => {
						console.log(res);
					},
					err => {
						uni.showToast({
							icon: 'error',
							title: `呼叫失败！`
						});
					}
				);
			},
			fail: rea => {
				console.log(rea);
			}
		});
	},
	methods: {}
};
</script>

<style></style>
