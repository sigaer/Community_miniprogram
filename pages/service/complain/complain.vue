<template>
	<view>
		<uni-section title="投诉建议" type="line">
			<view style="padding: 0 2em;"><textarea v-model="words" placeholder="在这输入您的意见或建议" /></view>
		</uni-section>
		<button type="primary" @click="submit()">提交</button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			words: ''
		};
	},
	methods: {
		submit() {
			//假定接口
			const url = '/complain';
			if (this.words.length === 0) {
				uni.showToast({
					icon: 'error',
					title: '请输入文本内容'
				});
				return;
			}
			this.request({
				url,
				method: 'POST',
				data: {
					content: this.words
				}
			}).then(r => {
				console.log(r);
				this.action('complainService').then(
					res => {
						console.log(res);
						uni.showToast({
							icon: 'success',
							title: '反馈已收到'
						});
						this.words = '';
						setTimeout(() => {
							uni.navigateBack();
						}, 1500);
					},
					rea => {
						console.log(rea);
						uni.showToast({
							icon: 'error',
							title: '网络错误'
						});
					}
				);
			});
		}
	}
};
</script>

<style scoped>
button {
	/* 	position: fixed;
	left:10%;
	bottom: 10%; */
	border-radius: 0.5rem;
	margin-left: 1rem;
	margin-right: 1rem;
}
</style>
