// pages/edit/edit.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
     id:null,
     dist:[],
     addurl:app.globalData.hostUrl+'/sims/distributor-info/add',
     modifyurl:app.globalData.hostUrl+'/sims/distributor-info/edit'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id==null) {
      return;
    }
    var that = this;
    that.setData({id:options.id})
    wx.request({
      url: app.globalData.hostUrl+'/sims/distributor-info/find',
      data:{"id":options.id},
      method: 'GET',
      success:function(res){
        var data = res.data;
        if (data!=null) {
          that.setData({dist:data})
        }else
        {
          var toastText='获取数据失败';
      wx.showToast({
        title: toastText,
        icon:'fail',
        duration:2000
      });
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  formSubmit:function (e) {
   var that = this;
   var formData= e.detail.value;
   formData.inputId=1;
   var url = that.data.addurl;
   if (that.data.id!=null) {
     formData.id = that.data.id;
     url=that.data.modifyurl;
   }
   console.log(JSON.stringify(formData));
   wx.request({
     url: url,
     data: JSON.stringify(formData),
     method:'POST',
     header: {
      'Content-Type': 'application/json'
    },success:function (res) {
       var result = res.data
       var toastText ="操作成功！";
       if (!result) {
         toastText="操作失败！";
       } 
       wx.showToast({
         title: toastText,
         icon: '',
         duration: 2000
       });
       if (that.data.id == null) {
        wx.switchTab({
          url: '../list/list',
        })
       }
      
     }
   })
    
  }
})