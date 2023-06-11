<template>
	<view class="wrapper">
		<uni-section title="体重变化曲线(kg)" type="line">
			<view class="charts-box"><qiun-data-charts type="line" :opts="opts" :chartData="weightData" /></view>
		</uni-section>
		<uni-section title="血压变化曲线(mmHg)" type="line">
			<view class="charts-box"><qiun-data-charts type="line" :opts="opts" :chartData="bpData" /></view>
		</uni-section>
		<uni-section title="血糖变化曲线(mmol/l)" type="line">
			<view class="charts-box"><qiun-data-charts type="line" :opts="opts" :chartData="gluData" /></view>
		</uni-section>
		<uni-section title="血脂变化曲线(mmol/l)" type="line">
			<view class="charts-box"><qiun-data-charts type="line" :opts="opts" :chartData="lipidData" /></view>
		</uni-section>
		<uni-section title="分析建议" type="line">
			<view class="bottom" v-for="(item,index) in advices" :key="index">
				<span class="advise"></span>
				<text class="tip">{{item}}</text>
			</view>
		</uni-section>
	</view>
</template>

<script>
export default {
	data() {
		return {
			bpData: {},
			weightData: {},
			gluData: {},
			lipidData: {},
			//您可以通过修改 config-ucharts.js 文件中下标为 ['line'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
			opts: {
				color: ['#1890FF', '#91CB74', '#FAC858', '#EE6666', '#73C0DE', '#3CA272', '#FC8452', '#9A60B4', '#ea7ccc'],
				padding: [15, 10, 0, 15],
				enableScroll: false,
				legend: {},
				xAxis: {
					disableGrid: true,
					rotateLabel: true,
					marginTop: 10
				},
				yAxis: {
					gridType: 'dash',
					dashLength: 2
				},
				extra: {
					line: {
						type: 'straight',
						width: 2,
						activeType: 'hollow'
					}
				}
			},
			advices:{}
		};
	},
	onReady() {
		this.getServerData();
	},
	methods: {
		getServerData() {
			const openid = uni.getStorageSync('openid');
			//模拟从服务器获取数据时的延时
			this.request({
				url: '/user/healthlist?openid=' + openid
			}).then(
				res => {
					console.log(res.data);
					const { bpData, weightData, lipidData, gluData, advices } = res.data;
					this.bpData = bpData;
					this.weightData = weightData;
					this.gluData = gluData;
					this.lipidData = lipidData;
					this.advices = advices;
				},
				err => {
					uni.showToast({
						icon: 'error',
						title: `请检查网络`
					});
				}
			);
		}
	}
};
</script>

<style scoped lang="scss">
/* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */
.charts-box {
	width: 100%;
	height: 300px;
}
.bottom {
	margin: 10px;
	.advise {
		display: inline-block;
		width: 12px;
		height: 12px;
		margin-right: 10px;
		border-radius: 100%;
		background-color: cornflowerblue;
	}
	// .tip {
	// 	display: inline-block;
	// 	margin: 0 10px;
	// }
}
</style>
