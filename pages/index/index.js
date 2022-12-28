// index.js
// 获取应用实例
const { url } = require("../../utils/common");
const app = getApp();

Page({
  data: {
    videoUrl: `${url}/fileVideo/daily`,
    everyDayRecommendLabel: "Daily recommendation",
  },
  videoErrorCallback: function (e) {
    console.log("视频错误信息:" + e.detail.errMsg);
  },

  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: "../logs/logs",
    });
  },
  onLoad() {
    wx.login({
      success: (res) => {
        wx.request({
          url: `${url}/weixin`, //仅为示例，并非真实的接口地址
          data: {
            code: res.code,
          },
          header: {
            "content-type": "application/json", // 默认值
          },
          success(res) {
            console.log(res.data);
          },
          fail(err) {
            console.log(err);
          },
        });
      },
    });
  },

  onShow(evt) {
    const flag = wx.getStorageSync("shouldRefresh");
    if (flag) {
      wx.setStorageSync("shouldRefresh", false);
      this.setData({
        videoUrl: `${url}/fileVideo/daily?timestr=` + Date.now(),
      });
    }
  },
});
