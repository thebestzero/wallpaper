<template>
	<view class="themeItem">
		<navigator url="/pages/classify/classList" class="box" v-if="!isMore">
			<image class="pic" src="../../common/images/classify1.jpg" mode="aspectFill"></image>
			<view class="mask">明星美女</view>
			<view class="tab">3天前更新</view>
		</navigator>
		<navigator url="/pages/classify/classify" open-type="reLaunch" class="box more" v-if="isMore">
			<image class="pic" src="../../common/images/more.jpg" mode="aspectFill"></image>
			<view class="mask">
				<uni-icons type="more-filled" size="34" color="#fff"></uni-icons>
				<view class="text">更多</view>
			</view>
		</navigator>
	</view>
</template>

<script setup>
defineProps({
	isMore:{
		type:Boolean,
		default:false
	}
})
</script>

<style lang="scss">
	.themeItem {
		.box {
			height: 340rpx;
			border-radius: 10rpx;
			overflow: hidden;
			position: relative;

			.pic {
				width: 100%;
				height: 100%;
			}

			.mask {
				width: 100%;
				height: 70rpx;
				position: absolute;
				bottom: 0;
				left: 0;
				font-size: 28rpx;
				font-weight: 600;
				color: #fff;
				display: flex;
				align-items: center;
				justify-content: center;
				backdrop-filter: blur(20rpx);
				background: rgba(0, 0, 0, 0.2);
			}

			.tab {
				width: 100%;
				height: 30rpx;
				position: absolute;
				top: 0;
				left: 0;
				color: #fff;
				display: flex;
				align-items: center;
				justify-content: center;
				backdrop-filter: blur(20rpx);
				background: rgba(250, 129, 90, 0.7);
				font-size: 22rpx;
				padding: 6rpx 14rpx;
				border-radius: 0 0 20rpx 0;
				transform: scale(0.8);
				transform-origin: left top;
			}
		}
	
		.box.more{
			.mask{
				width: 100%;
				height: 100%;
				flex-direction: column;
			}
			.text{
				font-size: 28rpx;
			}
		}
	}
	
</style>