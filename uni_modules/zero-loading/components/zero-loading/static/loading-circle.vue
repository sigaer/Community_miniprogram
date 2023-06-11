<template>
	<view class="container">
		<view class="loader"></view>
	</view>
</template>

<script>
	export default {
		name: "loading-circle",
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
	}
	.loader {
		display: block;
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
		border: 3rpx solid transparent;
		border-top-color: #1FA2FF;
		-webkit-animation: spin 2s linear infinite;
		animation: spin 2s linear infinite;
		position: relative;
	}

	.loader::before {
		content: "";
		position: absolute;
		top: 8rpx;
		left: 8rpx;
		right: 8rpx;
		bottom: 8rpx;
		border-radius: 50%;
		border: 3rpx solid transparent;
		border-top-color: #12D8FA;
		-webkit-animation: spin 3s linear infinite;
		animation: spin 3s linear infinite;
	}

	.loader::after {
		content: "";
		position: absolute;
		top: 16rpx;
		left: 16rpx;
		right: 16rpx;
		bottom: 16rpx;
		border-radius: 50%;
		border: 3rpx solid transparent;
		border-top-color: #29ffc6;
		-webkit-animation: spin 1.5s linear infinite;
		animation: spin 1.5s linear infinite;
	}

	@-webkit-keyframes spin {
		0% {
			-webkit-transform: rotate(0deg);
			-ms-transform: rotate(0deg);
			transform: rotate(0deg);
		}

		100% {
			-webkit-transform: rotate(360deg);
			-ms-transform: rotate(360deg);
			transform: rotate(360deg);
		}
	}

	@keyframes spin {
		0% {
			-webkit-transform: rotate(0deg);
			-ms-transform: rotate(0deg);
			transform: rotate(0deg);
		}

		100% {
			-webkit-transform: rotate(360deg);
			-ms-transform: rotate(360deg);
			transform: rotate(360deg);
		}
	}
</style>
