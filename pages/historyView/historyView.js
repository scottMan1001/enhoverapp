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
        that.setData({ historyList: res.data, urlPath: urlList });
      },
      fail(err) {
        console.log(err);
      },
    });
  },
});
