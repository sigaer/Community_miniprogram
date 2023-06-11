<template>
	<view>
		<uni-card title="个人健康状态" thumbnail="/static/default/heart.png">
			<uni-table stripe emptyText="暂无更多数据">
				<!-- 				<uni-tr>
					<uni-th align="center"></uni-th>
				</uni-tr> -->
				<uni-tr>
					<uni-td>检测时间</uni-td>
					<uni-td>{{record.c_time}}</uni-td>
				</uni-tr>
				<uni-tr>
					<uni-td>体重</uni-td>
					<uni-td>{{record.weight+" kg"}}</uni-td>
				</uni-tr>
				<uni-tr>
					<uni-td>血压</uni-td>
					<uni-td>{{record.dp+" / "+record.sp+" mmHg"}}</uni-td>
				</uni-tr>
				<uni-tr>
					<uni-td>血糖</uni-td>
					<uni-td>{{record.glu+" mmol/l"}}</uni-td>
				</uni-tr>
				<uni-tr>
					<uni-td>总胆固醇</uni-td>
					<uni-td>{{record.lipid_a+" mmol/l"}}</uni-td>
				</uni-tr>
				<uni-tr>
					<uni-td>甘油三酯</uni-td>
					<uni-td>{{record.lipid_b+" mmol/l"}}</uni-td>
				</uni-tr>
				<uni-tr>
					<uni-td>高密度脂蛋白</uni-td>
					<uni-td>{{record.lipid_c+" mmol/l"}}</uni-td>
				</uni-tr>
				<uni-tr>
					<uni-td>低密度脂蛋白</uni-td>
					<uni-td>{{record.lipid_d+" mmol/l"}}</uni-td>
				</uni-tr>
			</uni-table>
		</uni-card>
	</view>
</template>

<script>
export default {
	data() {
		return {
			record:{}
		};
	},
	onLoad(option) {
		console.log(option);
		const openid = uni.getStorageSync('openid');
		this.request({
			url: '/user/health?openid=' + openid + '&id=' + option.id
		}).then(
			res => {
				console.log(res.data);
				this.record=res.data
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
