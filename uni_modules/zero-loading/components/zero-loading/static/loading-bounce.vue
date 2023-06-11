<template>
	<view class="container">
		<view class="dot dot1"></view>
		<view class="dot dot2"></view>
		<view class="dot dot3"></view>
	</view>
</template>

<script>
	export default {
		name: "loading-bounce",
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
		width: 50rpx;
		height: 30rpx;
	}
	.dot {
		width: 12rpx;
		height: 12rpx;
		background: #007AFF;
		border-radius: 50%;
		position: absolute;
		top: calc(50% - 5rpx);
	}

	.dot1 {
		background: #1FA2FF;
		left: 0rpx;
		-webkit-animation: bounce 0.5s cubic-bezier(0.77, 0.47, 0.64, 0.28) alternate infinite;
		animation: bounce 0.5s cubic-bezier(0.77, 0.47, 0.64, 0.28) alternate infinite;
	}

	.dot2 {
		background: #12D8FA;
		left: 25rpx;
		-webkit-animation: bounce 0.5s 0.2s cubic-bezier(0.77, 0.47, 0.64, 0.28) alternate infinite;
		animation: bounce 0.5s 0.2s cubic-bezier(0.77, 0.47, 0.64, 0.28) alternate infinite;
	}

	.dot3 {
		background: #29ffc6;
		left: 50rpx;
		-webkit-animation: bounce 0.5s 0.4s cubic-bezier(0.77, 0.47, 0.64, 0.28) alternate infinite;
		animation: bounce 0.5s 0.4s cubic-bezier(0.77, 0.47, 0.64, 0.28) alternate infinite;
	}

	@-webkit-keyframes bounce {
		0% {
			-webkit-transform: translateY(0);
			transform: translateY(0);
		}

		100% {
			-webkit-transform: translateY(-15rpx);
			transform: translateY(-15rpx);
		}
	}

	@keyframes bounce {
		0% {
			-webkit-transform: translateY(0);
			transform: translateY(0);
		}

		100% {
			-webkit-transform: translateY(-15rpx);
			transform: translateY(-15rpx);
		}
	}
</style>
