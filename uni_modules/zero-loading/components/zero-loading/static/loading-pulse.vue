<template>
	<view class="container">
		<view class="pulse-bubble pulse-bubble-1"></view>
		<view class="pulse-bubble pulse-bubble-2"></view>
		<view class="pulse-bubble pulse-bubble-3"></view>
	</view>
</template>

<script>
	export default {
		name: "loading-pulse",
		data() {
			return {};
		}
	};
</script>

<style lang="scss" scoped>
	/* pulse */
	.container {
		width: 100rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.pulse-bubble {
		width: 16rpx;
		height: 16rpx;
		border-radius: 50%;
		background: #007AFF;
	}

	.pulse-bubble-1 {
		background: #1FA2FF;
		animation: pulse .4s ease 0s infinite alternate;
	}

	.pulse-bubble-2 {
		background: #12D8FA;
		animation: pulse .4s ease .2s infinite alternate;
	}

	.pulse-bubble-3 {
		background: #29ffc6;
		animation: pulse .4s ease .4s infinite alternate;
	}

	@keyframes pulse {
		from {
			opacity: 1;
			transform: scale(1);
		}

		to {
			opacity: .25;
			transform: scale(.75);
		}
	}
</style>
