const { url } = require("../../utils/common");
Page({
  data: {
    historyList: [],
    videoUrl: `${url}/fileVideo/history`,
    urlPath: [],
  },
  onLoad() {
    console.log("this指向", this);
    const that = this;
    wx.request({
      url: `${url}/fileVideo/history`,
      success(res) {
        const urlList = res.data.map((item) => {
          return item.slice(item.lastIndexOf("/"), -4);
        });
        that.setData({
          historyList: res.data,
          urlPath: urlList,
        });
      },
      fail(err) {
        console.log(err);
      },
    });
  },
  changeFunc(e) {
    // const videoDom = wx.createVideoContext("myvideo");
    if (e.detail.current == 1) {
      const videoDom = wx.createVideoContext("myvideo-0");
      videoDom.pause();
    } else {
      const videoDom = wx.createVideoContext("myvideo-1");
      videoDom.pause();
    }
  },
});
