import {
	request
} from "@/utils/request.js"

export default {
	apiGetBanner() {
		return request({
			url: "/homeBanner"
		})
	},
	apiGetDayRandom() {
		return request({
			url: "/randomWall"
		})
	},
	apiGetNotice(data = {}) {
		return request({
			url: "/wallNewsList",
			data
		})
	},
	apiGetClassify(data = {}) {
		return request({
			url: "/classify",
			data
		})
	},
	apiGetClassList(data = {}) {
		return request({
			url: "/wallList",
			data
		})
	},

	apiGetSetupScore(data = {}) {
		return request({
			url: "/setupScore",
			data
		})
	},

	apiWriteDownload(data = {}) {
		return request({
			url: "/downloadWall",
			data
		})
	},

	apiDetailWall(data = {}) {
		return request({
			url: "/detailWall",
			data
		})
	},
	apiUserInfo(data = {}) {
		return request({
			url: "/userInfo",
			data
		})
	},
	apiGetHistoryList(data = {}) {
		return request({
			url: "/userWallList",
			data
		})
	},

	apiNoticeDetail(data = {}) {
		return request({
			url: "/wallNewsDetail",
			data
		})
	},

	apiSearchData(data = {}) {
		return request({
			url: "/searchWall",
			data
		})
	}
}