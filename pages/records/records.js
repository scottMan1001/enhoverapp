Page({
  data: {
    text: "Developing",
    showFlag: true,
  },
  getUrl({ detail }) {
    const filePath = detail.fileList[0].url;
    console.log(detail.fileList[0].url);

    const uploadTask = wx.uploadFile({
      url: "http://192.168.0.101:8090/fileVideo/fileUpload", //仅为示例，非真实的接口地址
      filePath: filePath,
      name: "file",

      success(res) {
        const data = res.data;
        //do something
      },
      fail(e) {
        wx.showToast({
          title: "Fail！",
          icon: "error",
          duration: 1500,
        });
        console.log(e);
      },
    });
    uploadTask.onProgressUpdate((res) => {
      if (res.progress < 100) {
        wx.showToast({
          title: "Uploading！",
          icon: "loading",
        });
      } else {
        wx.showToast({
          title: "Uploaded！",
          icon: "success",
        });
      }
      console.log("上传进度", res.progress);
      console.log("已经上传的数据长度", res.totalBytesSent);
      console.log("预期需要上传的数据总长度", res.totalBytesExpectedToSend);
    });
  },

  onLoad() {},
  onHide() {
    this.setData({
      showFlag: false,
    });
  },
  onShow() {
    this.setData({
      showFlag: true,
    });
  },
});
