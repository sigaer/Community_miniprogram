<template>
	<view class="container">
		<view class="item"></view>
		<view class="item"></view>
		<view class="item"></view>
		<view class="item"></view>
		<view class="item"></view>
		<view class="item"></view>
		<view class="item"></view>
		<view class="item"></view>
		<view class="item"></view>
	</view>
</template>

<script>
	export default {
		name: "loading-love",
		data() {
			return {};
		}
	};
</script>

<style lang="scss" scoped>
	.container {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		justify-content: center;
		align-items: center;
		flex-flow: row nowrap;
	}

	.item {
	    background: linear-gradient(to bottom,  #F00000, #e73827);
		width: 16rpx;
		height: 16rpx;
		border-radius: 20rpx;
		margin-right: 10rpx;
	}

	.item:nth-child(1) {
		animation: love1 4s infinite;
	}

	.item:nth-child(2) {
		animation: love2 4s infinite;
		animation-delay: 0.15s;
	}

	.item:nth-child(3) {
		animation: love3 4s infinite;
		animation-delay: 0.3s;
	}

	.item:nth-child(4) {
		animation: love4 4s infinite;
		animation-delay: 0.45s;
	}

	.item:nth-child(5) {

		animation: love5 4s infinite;
		animation-delay: 0.6s;
	}

	.item:nth-child(6) {
		animation: love4 4s infinite;
		animation-delay: 0.75s;
	}

	.item:nth-child(7) {
		animation: love3 4s infinite;
		animation-delay: 0.9s;
	}

	.item:nth-child(8) {
		animation: love2 4s infinite;
		animation-delay: 1.05s;
	}

	.item:nth-child(9) {
		animation: love1 4s infinite;
		animation-delay: 1.2s;
	}


	@keyframes love1 {

		30%,
		50% {
			height: 50rpx;
			transform: translateY(-20rpx);
		}

		75%,
		100% {
			height: 20rpx;
			transform: translateY(0);
		}
	}

	@keyframes love2 {

		30%,
		50% {
			height: 90rpx;
			transform: translateY(-25rpx);
		}

		75%,
		100% {
			height: 20rpx;
			transform: translateY(0);
		}

	}

	@keyframes love3 {

		30%,
		50% {
			height: 120rpx;
			transform: translateY(-20rpx);
		}

		75%,
		100% {
			height: 20rpx;
			transform: translateY(0);
		}
	}

	@keyframes love4 {

		30%,
		50% {
			height: 130rpx;
			transform: translateY(-10rpx);
		}

		75%,
		100% {
			height: 20rpx;
			transform: translateY(0);
		}
	}

	@keyframes love5 {

		30%,
		50% {
			height: 130rpx;
			transform: translateY(10rpx);
		}

		75%,
		100% {
			height: 20rpx;
			transform: translateY(0);
		}
	}

	// .item:nth-child(1) {
	// 	height: 50rpx;
	// 	transform: translateY(-20rpx);
	// }

	// .item:nth-child(2) {
	// 	height: 90rpx;
	// 	transform: translateY(-25rpx);
	// }

	// .item:nth-child(3) {
	// 	height: 120rpx;
	// 	transform: translateY(-20rpx);
	// }

	// .item:nth-child(4) {
	// 	height: 130rpx;
	// 	transform: translateY(-10rpx);
	// }

	// .item:nth-child(5) {
	// 	height: 130rpx;
	// 	transform: translateY(10rpx);
	// }

	// .item:nth-child(6) {
	// 	height: 130rpx;
	// 	transform: translateY(-10rpx);
	// }

	// .item:nth-child(7) {
	// 	height: 120rpx;
	// 	transform: translateY(-20rpx);
	// }

	// .item:nth-child(8) {
	// 	height: 90rpx;
	// 	transform: translateY(-25rpx);
	// }

	// .item:nth-child(9) {
	// 	height: 50rpx;
	// 	transform: translateY(-20rpx);
	// }
</style>
