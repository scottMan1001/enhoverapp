// index.js
//7bb59c1d1247150a30fc1fa8e50068aa
// 获取应用实例
const app = getApp();

Page({
  data: {
    motto: "Video lsit 1",
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse("button.open-type.getUserInfo"),
    canIUseGetUserProfile: false,
    canIUseOpenData:
      wx.canIUse("open-data.type.userAvatarUrl") &&
      wx.canIUse("open-data.type.userNickName") &&
      wx.canIUse("open-data.type.userCountry"), // 如需尝试获取用户信息可改为false

    videoUrl: "http://localhost:3000/fileVideo/daily",
    videoDomRefresh: true,
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
  /**
   * 监听 TabBar 切换点击
   */
  // onTabItemTap: function (item) {
  //   console.log(item);
  // },
  onLoad() {
    wx.login({
      success: (res) => {
        wx.request({
          url: "http://192.168.0.101:8090/weixin", //仅为示例，并非真实的接口地址
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
  onHide(evt) {},
  onShow(evt) {
    this.setData({
      videoUrl: "http://localhost:3000/fileVideo/daily?timestr=" + Date.now(),
    });
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: "展示用户信息", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        debugger;
        console.log(res);
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
        });
      },
    });
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e);
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
    });
  },
});
