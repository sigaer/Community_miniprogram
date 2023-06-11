<template>
	<view class="container">
		<view class="box">
			<view class="sun"></view>
			<view class="orbit orbit1">
				<view class="planetX planet1"></view>
			</view>
			<view class="orbit orbit2">
				<view class="planetX planet2"></view>
			</view>
			<view class="orbit orbit3">
				<view class="planetX planet3"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "loading-triangle",
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
	.box{
		width:300rpx;
		height:300rpx;
		position: relative;
	}
	.sun {
		background: radial-gradient(#ff0, #f90);
		height: 50rpx;
		width: 50rpx;
		border-radius: 50%;
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
	}

	.planetX {
		position: absolute;
		z-index: 100;
		border-radius: 50%;
	}

	.planet1 {
		left: 20rpx;
		height: 13rpx;
		width: 13rpx;
		background-color: #fed313;
	}

	.planet2 {
		left: 23rpx;
		height: 20rpx;
		width: 20rpx;
		background: linear-gradient(#00ff00, #09f, #09f);
		-webkit-animation: rotation 1s infinite linear;
		animation: rotation 1s infinite linear;
	}

	.planet3 {
		left: 49rpx;
		height: 17rpx;
		width: 17rpx;
		background: radial-gradient(#ff9900, #ff4400);
	}

	.orbit {
		background: transparent;
		border-radius: 50%;
		border: 1rpx solid #cccccc;
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
	}

	.orbit1 {
		height: 100rpx;
		width: 100rpx;
		-webkit-animation: rotation 2s infinite linear;
		-moz-animation: rotation 2s infinite linear;
		animation: rotation 2s infinite linear;
	}

	.orbit2 {
		height: 150rpx;
		width: 150rpx;
		-webkit-animation: rotation 3s infinite linear;
		-moz-animation: rotation 3s infinite linear;
		animation: rotation 3s infinite linear;


	}

	.orbit3 {
		height: 200rpx;
		width: 200rpx;
		-moz-animation: rotation 6s infinite linear;
		-webkit-animation: rotation 6s infinite linear;
		animation: rotation 6s infinite linear;
	}

	@-webkit-keyframes rotation {
		from {
			-webkit-transform: rotate(0deg);
		}

		to {
			-webkit-transform: rotate(359deg);
		}
	}

	@keyframes rotation {
		from {
			transform: rotate(0deg);
		}

		to {
			transform: rotate(359deg);
		}
	}

	@-moz-keyframes rotation {
		from {
			-moz-transform: rotate(0deg);
		}

		to {
			-moz-transform: rotate(359deg);
		}
	}
</style>
