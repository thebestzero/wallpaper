<template>
	<view class="preview" v-if="currentInfo  ">
		<swiper circular :current="currentIndex" @change="swiperChange">
			<swiper-item v-for="(item,index) in classList" :key="item._id">
				<image v-if="readImgsList.includes(index)" :src="item.picUrl" mode="aspectFill" @click="maskChange">
				</image>
			</swiper-item>
		</swiper>
		<view class="mask" v-show="maskState">
			<view class="goBack" @click="goBack" :style="{top:getStatusBarHeight()+'px'}">
				<uni-icons type="back" color="#fff" size="20"></uni-icons>
			</view>
			<view class="count">{{currentIndex +1 }} / {{classList.length}}</view>
			<view class="time">
				<uni-dateformat :date="new Date()" format="hh:mm"></uni-dateformat>
			</view>
			<view class="date">
				<uni-dateformat :date="new Date()" format="MM月dd日"></uni-dateformat>
			</view>
			<view class="footer">
				<view class="box" @click="clickInfoPopup">
					<uni-icons type="info" size="28"></uni-icons>
					<view class="text">信息</view>
				</view>

				<view class="box" @click="clickScorePopup">
					<uni-icons type="star" size="28"></uni-icons>
					<view class="text">{{currentInfo.score}}分</view>
				</view>

				<view class="box">
					<uni-icons type="download" size="23" @click="downloadImage"></uni-icons>
					<view class="text">下载</view>
				</view>
			</view>
		</view>
	</view>
	<uni-popup ref="infoPopup" type="bottom">
		<view class="infoPopup">
			<view class="popHeader">
				<view></view>
				<view class="title">壁纸信息</view>
				<view class="close" @click="clickInfoClose">
					<uni-icons type="closeempty" size="18" color="#999"></uni-icons>
				</view>
			</view>
			<scroll-view scroll-y>
				<view class="content">
					<view class="row">
						<view class="label">壁纸ID：</view>
						<text selectable class="value">{{currentInfo._id}}</text>
					</view>
					<!-- 
					<view class="row">
						<view class="label">分类：</view>
						<text class="value class">{{currentInfo.classid}}</text>
					</view> -->

					<view class="row">
						<view class="label">发布者：</view>
						<text class="value">{{currentInfo.nickname}}</text>
					</view>

					<view class="row">
						<text class="label">评分：</text>
						<view class='value roteBox'>
							<uni-rate readonly touchable value="3.5" size="16" />
							<text class="score">{{currentInfo.score}}</text>
						</view>
					</view>

					<view class="row">
						<text class="label">摘要：</text>
						<view class='value'>
							{{currentInfo.description}}
						</view>
					</view>

					<view class="row">
						<text class="label">标签：</text>
						<view class='value tabs'>
							<view class="tab" v-for="item in currentInfo.tabs" :key="item">{{item}}</view>
						</view>
					</view>

					<view class="copyright">
						声明：本图片来用户投稿，非商业使用，用于免费学习交流，如侵犯了您的权益，您可以拷贝壁纸ID举报至平台，邮箱513894357@qq.com，管理将删除侵权壁纸，维护您的权益。

					</view>
					<view class="safe-area-inset-bottom"></view>
				</view>
			</scroll-view>
		</view>
	</uni-popup>
	<uni-popup ref="scorePopup" :is-mask-click="false">
		<view class="scorePopup">
			<view class="popHeader">
				<view></view>
				<view class="title">{{isScore ? '评分过了~' : '壁纸评分'}}</view>
				<view class="close" @click="clickScoreClose">
					<uni-icons type="closeempty" size="18" color="#999"></uni-icons>
				</view>
			</view>

			<view class="content">
				<uni-rate v-model="userScore" allowHalf />
				<text class="text">{{userScore}}分</text>
			</view>

			<view class="footer">
				<button @click="submitScore" :disabled="!userScore || isScore" type="default" size="mini"
					plain>确认评分</button>
			</view>
		</view>
	</uni-popup>
</template>

<script setup>
	import {
		computed,
		ref,
		useAttrs
	} from 'vue'
	import {
		getStatusBarHeight
	} from '@/utils/system.js'
	import {
		onLoad,
		onShareAppMessage,
		onShareTimeline,
		onUnload
	} from '@dcloudio/uni-app'
	import serverApi from '../../api/apis.js'
	import path from 'node:path/posix';

	console.log(useAttrs());
	const maskState = ref(true);
	const infoPopup = ref(null);
	const scorePopup = ref(null);
	const userScore = ref(0)
	const StrClassList = uni.getStorageSync('classList') || []
	const classList = ref([])
	const readImgsList = ref([])
	const isScore = ref(false)
	classList.value = StrClassList.map((item) => {
		return {
			...item,
			picUrl: item.smallPicurl.replace("_small.webp", ".jpg")
		}
	})
	const currentIndex = ref(0)

	const currentInfo = ref(null)
	const maskChange = (e) => {
		maskState.value = !maskState.value
	}
	const swiperChange = (e) => {
		console.log(e);
		currentIndex.value = e.detail.current
		currentInfo.value = classList.value[currentIndex.value]
		readImgs()
	}
	const clickInfoPopup = () => {
		infoPopup.value.open()
	}

	const clickInfoClose = () => {
		infoPopup.value.close()
	}
	const clickScorePopup = () => {

		if (currentInfo.value.userScore) {
			isScore.value = true
			userScore.value = currentInfo.value.userScore
		} else {
			isScore.value = false
			userScore.value = 0
		}
		scorePopup.value.open()
	}

	const clickScoreClose = () => {
		scorePopup.value.close()
	}

	const submitScore = async () => {
		uni.showLoading({
			title: '加载中...'
		})
		const {
			classid,
			_id: wallId
		} = currentInfo.value

		let res = await serverApi.apiGetSetupScore({
			classid,
			wallId,
			userScore: userScore.value
		})

		uni.hideLoading()

		if (res.errCode === 0) {
			uni.showToast({
				title: "评分成功",
				icon: "none"
			})
			classList.value[currentIndex.value].userScore = userScore.value;
			uni.setStorageSync("storgClassList", classList.value);

		}
		clickScoreClose();
	}

	const goBack = () => {
		uni.navigateBack({
			fail() {
				uni.reLaunch({
					url: '/pages/index/index'
				})
			}
		})
	}

	onLoad(async (e) => {
		const id = e.id || ''
		if (e.type == 'share') {
			let res = await serverApi.apiDetailWall({
				id
			});
			classList.value = res.data.map(item => {
				return {
					...item,
					picUrl: item.smallPicurl.replace("_small.webp", ".jpg")
				}
			})
		}

		currentIndex.value = (classList.value.findIndex(item => item._id === id)) || 0
		currentInfo.value = classList.value[currentIndex.value] || {}
		readImgs()
	})

	function readImgs() {
		const curIndex = currentIndex.value
		readImgsList.value.push(
			curIndex <= 0 ? classList.value.length - 1 : curIndex - 1,
			curIndex,
			curIndex >= classList.value.length - 1 ? 0 : curIndex + 1
		)
		readImgsList.value = [...new Set(readImgsList.value)]
	}

	const downloadImage = async () => {
		// #ifdef H5
		uni.showModal({
			content: "请长按保存壁纸",
			showCancel: false
		})
		// #endif

		// #ifndef H5
		try {
			uni.showLoading({
				mask: true,
				title: '下载中...'
			})
			let {
				classid,
				_id: wallId
			} = currentInfo.value;
			let res = await serverApi.apiWriteDownload({
				classid,
				wallId
			})
			if (res.errCode != 0) throw res;
			// 获取下载图片临时地址
			uni.getImageInfo({
				src: currentInfo.value.picUrl,
				success(res) {
					// 微信自带授权下载图片
					uni.saveImageToPhotosAlbum({
						filePath: res.path,
						success() {
							uni.showToast({
								title: "保存成功，请到相册查看",
								icon: "none"
							})
						},
						fail(err) {
							// 授权成功取消保存
							if (err.errMsg === "saveImageToPhotosAlbum:fail cancel") {
								console.log(err);
								uni.showToast({
									title: '保存失败，请重新点击下载',
									icon: "none"
								})
								return;
							}
							// 授权失败，手动授权
							// 调起客户端小程序设置界面，返回用户设置的操作结果。
							uni.showModal({
								title: "授权提示",
								content: "需要授权保存相册",
								success(res) {
									if (res.confirm) {
										uni.openSetting({
											success(setting) {
												console.log(setting);
												if (setting
													.authSetting[
														'scope.writePhotosAlbum'
													]) {
													uni.showToast({
														title: "获取授权成功",
														icon: "none"
													})
												} else {
													uni.showToast({
														title: "获取权限失败",
														icon: "none"
													})
												}
											}
										})
									}
								}
							})

						},
					})
				},
				complete() {
					uni.hideLoading()
				}
			})
		} catch (err) {
			console.error(err)
			uni.hideLoading()
		}
		// #endif
	}

	//分享给好友
	onShareAppMessage(() => {
		return {
			title: '壁纸',
			path: '/pages/preview/preview?id=' + currentInfo.value._id + '&type=share'
		}
	})

	//分享朋友圈
	onShareTimeline(() => {
		return {
			title: "咸虾米壁纸",
			query: "id=" + currentInfo.value._id + "&type=share"
		}
	})

	onUnload(() => {
		uni.removeStorageSync('classList')
	})
</script>

<style scoped lang="scss">
	.preview {
		width: 100%;
		height: 100vh;
		position: relative;

		swiper {
			width: 100%;
			height: 100%;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.mask {
			&>view {
				position: absolute;
				left: 0;
				right: 0;
				margin: auto;
				width: fit-content;
				color: #fff;
			}

			.goBack {
				width: 38px;
				height: 38px;
				background: rgba(0, 0, 0, 0.5);
				left: 30rpx;
				margin-left: 0;
				border-radius: 100px;
				top: 0;
				backdrop-filter: blur(10rpx);
				border: 1rpx solid rgba(255, 255, 255, 0.3);
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.count {
				top: 10vh;
				background: rgba(0, 0, 0, 0.3);
				font-size: 28rpx;
				border-radius: 40rpx;
				padding: 8rpx 28rpx;
				backdrop-filter: blur(10rpx);
			}

			.time {
				font-size: 140rpx;
				top: calc(10vh + 80rpx);
				font-weight: 100;
				line-height: 1em;
				text-shadow: 0 4rpx rgba(0, 0, 0, 0.3);
			}

			.date {
				font-size: 34rpx;
				top: calc(10vh + 230rpx);
				text-shadow: 0 2rpx rgba(0, 0, 0, 0.3);
			}

			.footer {
				bottom: 10vh;
				background: rgba(255, 255, 255, 0.8);
				backdrop-filter: blur(20rpx);
				display: flex;
				justify-content: space-around;
				width: 65vw;
				height: 120rpx;
				border-radius: 120rpx;
				box-shadow: 0 2rpx 0 rgba(0, 0, 0, 0.1);
				color: #000;

				.box {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					padding: 2rpx 12rpx;

					.text {
						font-size: 26rpx;
						color: $text-font-color-2;
					}
				}
			}
		}
	}

	.popHeader {
		display: flex;
		justify-content: space-between;
		align-items: center;

		.title {
			color: $text-font-color-2;
			font-size: 26rpx;
		}

		.close {
			padding: 6rpx;
		}
	}

	.infoPopup {
		background-color: #fff;
		padding: 30rpx;
		border-radius: 30rpx 30rpx 0 0;
		overflow: hidden;

		scroll-view {
			max-height: 60vh;

			.content {
				.row {
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 16rpx 0;
					font-size: 32rpx;
					line-height: 1.7em;

					.label {
						width: 140rpx;
						color: $text-font-color-3;
						text-align: right;
					}

					.value {
						flex: 1;
						width: 0;
					}
				}
			}

			.roteBox {
				display: flex;
				align-items: center;

				.score {
					font-size: 26rpx;
					color: $text-font-color-2;
					padding-left: 10rpx;
				}
			}

			.tabs {
				display: flex;
				align-items: center;
				flex-wrap: wrap;

				.tab {
					border: 1px solid $brand-theme-color;
					color: $brand-theme-color;
					font-size: 22rpx;
					padding: 10rpx 30rpx;
					border-radius: 40rpx;
					line-height: 1em;
					margin: 0 10rpx 10rpx 0;
				}
			}

			.copyright {
				font-size: 28rpx;
				padding: 20rpx;
				background: #F6F6F6;
				color: #666;
				border-radius: 10rpx;
				margin: 20rpx 0;
				line-height: 1.6em;
			}
		}
	}

	.scorePopup {
		background-color: #fff;
		padding: 30rpx;
		border-radius: 30rpx;
		width: 70vw;

		.content {
			padding: 30rpx 0;
			display: flex;
			justify-content: center;
			align-items: center;

			.text {
				color: #FFCA3E;
				padding-left: 10rpx;
				width: 80rpx;
				line-height: 1em;
				text-align: right;
			}
		}

		.footer {
			padding: 10rpx 0;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
</style>