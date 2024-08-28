<template>
	<view class="homeLayout pageBg">
		<custom-nav-bar></custom-nav-bar>
		<view class="banner">
			<swiper indicator-dots autoplay indicator-color="rgba(255,255,255,0.5)" indicator-active-color="#fff"
				circular class="swiper">
				<swiper-item v-for="item in bannerList" :key="item._id">
					<view class="swiper-item">
						<image :src="item.picurl" mode="aspectFill"></image>
					</view>
				</swiper-item>



			</swiper>
		</view>
		<view class="notice">
			<view class="left">
				<uni-icons type="sound-filled" size="20"></uni-icons>
				<text>公共</text>
			</view>
			<view class="center">
				<swiper autoplay interval="1500" duration="300" circular vertical>
					<swiper-item v-for="(item,index) in noticeList" :key="item._id">
						<view class="swiper-item">{{item.title}}
						</view>
					</swiper-item>
				</swiper>
			</view>
			<view class="right">
				<uni-icons type="right" size="16" color="#333"></uni-icons>
			</view>
		</view>
		<view class="select">
			<common-title>
				<template #name>
					每日推荐
				</template>
				<template #custom>
					<view class="date">
						<uni-icons type="calendar" size="18"></uni-icons>
						<view class="text">
							<uni-dateformat :date="Date.now()" format="dd日"></uni-dateformat>
						</view>
					</view>
				</template>
			</common-title>
			<view class="content">
				<scroll-view scroll-x>
					<template v-for="item in randomList" :key="item._id">
						<view class="box" @click="goPreview">
							<image :src="item.smallPicurl" mode="aspectFill"></image>
						</view>
					</template>
				</scroll-view>
			</view>
		</view>
		<view class="theme">
			<common-title>
				<template #name>
					专题精选
				</template>
				<template #custom>
					<view class="more">More+</view>
				</template>
			</common-title>
			<view class="content">
				<theme-item v-for="item in classifyList" :key="item._id" :item="item"></theme-item>
				<theme-item :isMore="true"></theme-item>
			</view>
		</view>
	</view>
</template>

<script setup>
	import serverApi from '@/api/apis.js';
	import {
		ref
	} from 'vue';
	const goPreview = () => {
		uni.setStorageSync('classList',randomList.value)
		uni.navigateTo({
			url: '/pages/preview/preview'
		})
	}
	const bannerList = ref([]);
	const randomList = ref([]);
	const noticeList = ref([]);
	const classifyList = ref([]);

	const getBanner = async () => {
		let res = await serverApi.apiGetBanner();
		bannerList.value = res.data;
	}

	const getDayRandom = async () => {
		let res = await serverApi.apiGetDayRandom();
		randomList.value = res.data
	}

	const getNotice = async () => {
		let res = await serverApi.apiGetNotice({
			select: true
		});
		noticeList.value = res.data
	}

	const getClassify = async () => {
		let res = await serverApi.apiGetClassify({
			select: true
		});
		classifyList.value = res.data
	}

	getBanner();
	getDayRandom();
	getNotice();
	getClassify();
</script>

<style lang="scss" scoped>
	.homeLayout {
		.banner {
			width: 750rpx;
			padding: 30rpx 0;

			.swiper {
				width: 100%;
				height: 340rpx;
				padding: 0 30rpx;

				&-item {
					width: 100%;
					height: 100%;

					image {
						width: 100%;
						height: 100%;
						border-radius: 10rpx;
					}
				}
			}
		}

		.notice {
			margin: 30rpx auto;
			width: 690rpx;
			height: 80rpx;
			border: 50rpx;
			background: #f9f9f9;
			line-height: 80rpx;
			display: flex;

			.left {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 140rpx;

				:deep() {
					.uni-icons {
						color: $brand-theme-color !important;
					}
				}

				text {
					color: $brand-theme-color;
					font-weight: 600;
					font-size: 28rpx;
				}
			}

			.center {
				flex: 1;

				swiper {
					height: 100%;

					&-item {
						height: 100%;
						font-size: 30rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}

			}

			.right {
				width: 70rpx;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}

		.select {
			.date {
				color: $brand-theme-color;
				display: flex;
				align-items: center;

				:deep() {
					.uni-icons {
						color: $brand-theme-color !important;
					}
				}

				.text {
					margin-left: 5rpx;
				}
			}

			.content {
				width: 720rpx;
				margin: 30rpx 0 0 30rpx;

				scroll-view {
					white-space: nowrap;

					.box {
						width: 200rpx;
						height: 430rpx;
						display: inline-block;
						margin-right: 15rpx;

						image {
							width: 100%;
							height: 100%;
							border-radius: 10rpx;
						}

						&:last-child {
							margin-right: 30rpx;
						}
					}

				}

			}
		}

		.theme {
			padding: 50rpx 0;

			.more {
				font-size: 32rpx;
				color: #888;

			}

			.content {
				margin-top: 30rpx;
				padding: 0 30rpx;
				display: grid;
				gap: 15rpx;
				grid-template-columns: repeat(3, 1fr);
			}
		}
	}
</style>