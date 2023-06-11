<template>
	<view>
		<uni-section title="帮助与反馈" type="line">
			<text class="intro">尊敬的用户，本系统旨在为您提供方便、舒适、安心的生活体验。如果您在使用过程中遇到困难，请联系工作人员，或拨打客服电话xxxxxxxxxxx取得帮助。</text>
			<text class="intro">除此之外，如果您有想说的话，比如功能上的建议或者反馈等，可以在下方提交，我们会积极听取您的意见。</text>
			<view style="padding: 1.5em;"><textarea v-model="words" placeholder="在这输入您想说的话" class="uni-input" placeholder-style="margin:0.2rem" /></view>
			<button type="primary" @click="submit()">提交</button>
		</uni-section>
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
			if (this.words.length === 0) {
				uni.showToast({
					icon: 'error',
					title: '请输入内容'
				});
			} else {
				this.request({
					url: '/feedback',
					method: 'POST',
					data: {
						content: this.words
					}
				}).then(r => {
					console.log(r);
					this.action('feedback').then(
						res => {
							console.log(res);
							uni.showToast({
								icon: 'success',
								title: '感谢您的意见'
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
								title: '请检查网络'
							});
						}
					);
				});
			}
		}
	}
};
</script>

<style scoped>
.intro {
	display: block;
	text-indent: 2em;
	margin-top: 1rem;
	padding: 0 0.5em;
}
button {
	border-radius: 0.5rem;
	margin-left: 1rem;
	margin-right: 1rem;
}
.uni-input {
	border: 1px solid #cccccc;
	border-radius: 0.5rem;
	margin: 0.5rem;
	height: 5rem;
	padding-left: 0.5rem;
	padding-top: 0.3rem;
}
</style>
