<template>
	<view class="wrapper">
		<uni-forms ref="customForm" :rules="customRules" :modelValue="form">
			<uni-forms-item label="体重(kg)" name="weight"><uni-easyinput v-model="form.weight" placeholder="请输入体重" /></uni-forms-item>
			<uni-forms-item label="舒张压(mmHg)" name="dp"><uni-easyinput v-model="form.dp" placeholder="请输入舒张压" /></uni-forms-item>
			<uni-forms-item label="收缩压(mmHg)" name="sp"><uni-easyinput v-model="form.sp" placeholder="请输入收缩压" /></uni-forms-item>
			<uni-forms-item label="血糖(mmol/l)" name="glu"><uni-easyinput v-model="form.glu" placeholder="请输入血糖" /></uni-forms-item>
			<uni-forms-item label="总胆固醇(mmol/l)" name="lipid_a"><uni-easyinput v-model="form.lipid_a" placeholder="请输入总胆固醇" /></uni-forms-item>
			<uni-forms-item label="甘油三脂(mmol/l)" name="lipid_b"><uni-easyinput v-model="form.lipid_b" placeholder="请输入甘油三脂" /></uni-forms-item>
			<uni-forms-item label="高密度脂蛋白(mmol/l)" name="lipid_c"><uni-easyinput v-model="form.lipid_c" placeholder="请输入高密度脂蛋白" /></uni-forms-item>
			<uni-forms-item label="低密度脂蛋白(mmol/l)" name="lipid_d"><uni-easyinput v-model="form.lipid_d" placeholder="请输入低密度脂蛋白" /></uni-forms-item>
			<button type="primary" @click="submit('customForm')">提交</button>
		</uni-forms>
	</view>
</template>

<script>
export default {
	data() {
		return {
			form: {
				weight: '',
				dp: '',
				sp: '',
				glu: '',
				lipid_a: '',
				lipid_b: '',
				lipid_c: '',
				lipid_d: ''
			},
			customRules: {
				weight: {
					rules: [
						{
							format: 'number',
							errorMessage: '请输入数字'
						}
					]
				},
				dp: {
					rules: [
						{
							format: 'number',
							errorMessage: '请输入数字'
						}
					]
				},
				sp: {
					rules: [
						{
							format: 'number',
							errorMessage: '请输入数字'
						}
					]
				},
				glu: {
					rules: [
						{
							format: 'number',
							errorMessage: '请输入数字'
						}
					]
				},
				lipid_a: {
					rules: [
						{
							format: 'number',
							errorMessage: '请输入数字'
						}
					]
				},
				lipid_b: {
					rules: [
						{
							format: 'number',
							errorMessage: '请输入数字'
						}
					]
				},
				lipid_c: {
					rules: [
						{
							format: 'number',
							errorMessage: '请输入数字'
						}
					]
				},
				lipid_d: {
					rules: [
						{
							format: 'number',
							errorMessage: '请输入数字'
						}
					]
				}
			}
		};
	},
	methods: {
		submit(ref) {
			// uni.showToast({
			// 	icon: 'success',
			// 	title: '添加成功！'
			// });
			const openid = uni.getStorageSync('openid');
			this.$refs[ref]
				.validate()
				.then(res => {
					let allEmpty = true;
					for (let v in res) {
						allEmpty = !res[v] && allEmpty;
					}
					if (allEmpty) {
						uni.showToast({
							icon: 'error',
							title: '请填写内容'
						});
						return;
					}
					console.log('success', res);
					this.request({
						url: '/user/addhealth',
						method: 'POST',
						data: {
							...this.form,
							c_time: new Date().toLocaleString('chinese', { hour12: false }),
							userid: openid
						}
					}).then(r => {
						this.action('addhealth').then(
							res => {
								uni.showToast({
									icon: 'success',
									title: `添加成功！`,
									success() {
										setTimeout(() => {
											uni.navigateBack();
										}, 1500);
									}
								});
							},
							err => {
								uni.showToast({
									icon: 'error',
									title: `请检查网络`
								});
							}
						);
					});
				})
				.catch(err => {
					console.log('err', err);
				});
		}
	}
};
</script>

<style scoped>
.wrapper {
	padding: 15px;
}
.form-item {
	display: flex;
	align-items: center;
}
::v-deep .uni-forms-item__label {
	width: 100px !important;
}
</style>
