<template>
	<view class="container">
		<view class="box">
			<view class="gear1">
				<view class="inner inner1"> </view>
				<view class="inner inner2"> </view>
				<view class="inner inner3"> </view>
			</view>
			<view class="gear2">
				<view class="inner inner1"> </view>
				<view class="inner inner2"> </view>
				<view class="inner inner3"> </view>
			</view>
			<view class="gear3">
				<view class="inner inner1"> </view>
				<view class="inner inner2"> </view>
				<view class="inner inner3"> </view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'loading-gear',
		data() {
			return {};
		}
	};
</script>

<style lang="scss" scoped>
	$size:80rpx;
	$bgc:red;

	.container {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.box {
		width: 200rpx;
		height: 200rpx;
		position: relative;
	}

	@mixin gear($size:$size, $bgc:$bgc) {
		width: $size;
		height: $size;
		.inner {
			position: absolute;
			width: $size;
			height: $size;
			top: 0;
			left: 0;
			background: $bgc;
			border-radius: 6rpx;
			mask: radial-gradient(transparent 40%, #fff 60%);
		}

		.inner2 {
			transform: rotate(120deg);
		}

		.inner3 {
			transform: rotate(240deg);
		}

		// &:after {
		// 	position: absolute;
		// 	content: '';
		// 	background: #fff;
		// 	width: $size / 1.8;
		// 	height: $size / 1.8;
		// 	border-radius: 100%;
		// 	top: 50%;
		// 	left: 50%;
		// 	transform: translate(-50%, -50%);
		// }
	}

	.gear1 {
		@include gear(60rpx,#0396FF);
		position: absolute;
		top: 35rpx;
		left: 35rpx;
		animation: rotate 5s infinite linear;
	}

	.gear2 {
		@include gear(50rpx, #dd524d);
		position: absolute;
		top: 50rpx;
		left: 110rpx;
		animation: rotateR 5s infinite linear;
	}
	.gear3 {
		@include gear(50rpx, #f0ad4e);
		position: absolute;
		top: 110rpx;
		left: 50rpx;
		animation: rotateR 5s infinite linear;
	}
	

	@keyframes rotate {
		from {
			transform: rotate(0deg)
		}

		to {
			transform: rotate(360deg)
		}
	}
	@keyframes rotateR {
		from {
			transform: rotate(0deg)
		}
	
		to {
			transform: rotate(-360deg)
		}
	}
</style>
