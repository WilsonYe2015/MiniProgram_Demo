// pages/list/list.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dists:[],
    page: 1,                              
    pageSize: 3,     
    hasMoreData: true,                      //上拉时是否继续请求数据，即是否还有更多数据                     
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
onShow:function(){
  this.data.page = 1
    this.getInfo('正在刷新数据')
},  
getInfo: function (message) {
var that = this;
wx.showNavigationBarLoading()              //在当前页面显示导航条加载动画
    wx.showLoading({                        //显示 loading 提示框
        title: message,
    })
wx.request({
  url: app.globalData.hostUrl+'/sims/distributor-info/selectbypage',
  method:'GET',
  data:{iCurrentPage: that.data.page, iPageSize: that.data.pageSize},
  success:function(res){
    var distsTem = that.data.dists;
    var data = res.data;
    if (!data.success)
    {
      var toastText='获取数据失败';
      wx.showToast({
        title: toastText,
        icon:'fail',
        duration:2000
      });
    }else{
      wx.hideNavigationBarLoading()     //在当前页面隐藏导航条加载动画
      wx.hideLoading()               //隐藏 loading 提示框
      if (that.data.page == 1) {
        distsTem = []
      }
      if(data.result.length<that.data.pageSize)
        {
          
          that.setData({
            dists:distsTem.concat(data.result),
            hasMoreData: false
            })
        }
        else
        {
          that.setData({
            dists:distsTem.concat(data.result),
            hasMoreData: true,
            page:that.data.page+1
            })
        }

    }
  },
  fail: function (res) {
      wx.hideNavigationBarLoading()
      wx.hideLoading()
      fail()
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
  this.data.page = 1
  this.getInfo('正在刷新数据')
},

/**
* 页面上拉触底事件的处理函数
*/
onReachBottom: function () {
  if (this.data.hasMoreData) {
      this.getInfo('加载更多数据')
  } else {
      wx.showToast({
          title: '没有更多数据',
      })
  }
},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  addDist:function()
  {
    wx.navigateTo({
      url: '../edit/edit',
    })
  },
  deleteDist:function(e)
  {
    var that = this;
    wx.showModal({
      title:'Alert',
      cancelColor: 'cancelColor',
      content:'确定要删除['+e.target.dataset.name+']吗？',
      success:function(sm){
        if (sm.confirm) {
          wx.request({
            url: app.globalData.hostUrl+'/sims/distributor-info/remove',
            data:{"id":e.target.dataset.id},
            method:'GET',
            success:function(res){
              var result =res.data.success;
              var toastText ="Delete successful";
              if (!result) {
                toastText="Delete Failure";
              }else 
              {
                that.data.dists.splice(e.target.dataset.index,1)
                that.setData({dists:that.data.dists})
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