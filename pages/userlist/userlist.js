// pages/userlist/userlist.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    users:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
var that = this;
wx.request({
  url: app.globalData.hostUrl+'/sims/user/findall',
  method:'GET',
  data:{},
  success:function(res){
    var list = res.data;
    if (list == null)
    {
      var toastText='获取数据失败';
      wx.showToast({
        title: toastText,
        icon:'fail',
        duration:2000
      });
    }else{
      that.setData({
        users:list
        })
    }
  }
})
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
  addUser:function()
  {
    wx.navigateTo({
      url: '../useredit/useredit',
    })
  },
  deleteUser:function(e)
  {
    var that = this;
    wx.showModal({
      title:'Alert',
      cancelColor: 'cancelColor',
      content:'确定要删除['+e.target.dataset.name+']吗？',
      success:function(sm){
        if (sm.confirm) {
          wx.request({
            url: app.globalData.hostUrl+'/sims/user/remove',
            data:{"id":e.target.dataset.id},
            method:'GET',
            success:function(res){
              var result =res.data;
              var toastText ="Delete successful";
              if (!result) {
                toastText="Delete Failure";
              }else 
              {
                that.data.users.splice(e.target.dataset.index,1)
                that.setData({users:that.data.users})
              }
              wx.showToast({
                title: toastText,
                icon: '',
                duration: 2000
              })
            }
          })
        }
      }
    })
  }
})