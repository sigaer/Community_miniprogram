<template>
	<view>
		<uni-section title="社区公告" type="line">
			<uni-list><uni-list-item v-for="item in annolist" :key="item.id" link showArrow @click="jumpTo(item)" :title="item.title" :right-text="item.time" /></uni-list>
		</uni-section>
	</view>
</template>

<script>
export default {
	data() {
		return {
			annolist: []
		};
	},
	onLoad() {
		this.request({
			url: '/anno'
		}).then(
			res => {
				console.log(res.data);
				this.annolist = res.data
			},
			rea => {
				uni.showToast({
					icon: 'error',
					title: `请检查网络`
				});
			}
		);
	},
	methods: {
		jumpTo(check) {
			uni.navigateTo({
				url: '/pages/anno/detail/detail?id=' + check.id
			});
		}
	}
};
</script>

<style></style>
