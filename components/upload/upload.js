Page({
  /**
   * 页面的初始数据
   */
  data: {
    fileList: [],
  },

  chooseImg: function (e) {
    var that = this;
    var fileList = this.data.fileList;
    wx.chooseMedia({
      mediaType: ["video"],
      count: 1,
      sizeType: ["original"], // 可以指定是原图还是压缩图，默认二者都有
      // mediaType: ["mix"],
      sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFiles.forEach((item) => {
          if (item.size > 41943040) {
            wx.showToast({
              title: "视频过大！",
              icon: "error",
              mask: true,
              duration: 2000,
            });
            return;
          }
          if (item.fileType != "video" && !item.tempFilePath.includes(".mp4")) {
            wx.showToast({
              title: "支持video/MP4",
              icon: "error",
              mask: true,
              duration: 2000,
            });
            return;
          }
          fileList = [];
          fileList.push({ url: item.tempFilePath, type: item.fileType });
        });

        that.setData({
          fileList: fileList,
        });
        console.log(that.data.fileList);
        that.triggerEvent("getUrl", { fileList: fileList });
      },
    });
  },

  deleteImg(e) {
    this.data.imgs.splice(e.currentTarget.dataset.index, 1);
    this.setData({
      imgs: this.data.imgs,
    });
  },
});
