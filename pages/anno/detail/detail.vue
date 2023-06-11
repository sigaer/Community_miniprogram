<template>
	<view>
		<view class="top">
			<view class="title">{{ anno.title }}</view>
			<view class="c_time">发布于{{ ' ' + anno.time }}</view>
		</view>
		<hr />
		<view class="content">{{ anno.content }}</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			anno: {}
		};
	},
	onLoad(option) {
		console.log(option.id);
		this.request({
			url: '/anno/' + option.id
		}).then(res => {
			this.anno = res.data;
		});
	},
	methods: {}
};
</script>

<style>
.title {
	font-size: 25px;
	font-weight: bolder;
	text-align: center;
	margin: 20rpx 0;
}
.c_time {
	font-size: 12px;
	color: grey;
	text-indent: 0.5em;
}
.content {
	padding: 20rpx 16rpx;
	text-indent: 1em;
}
</style>
