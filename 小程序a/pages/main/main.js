var amapFile = require('../../libs/amap-wx');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    city: '',
    weather: '',
    future:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadInfo()
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
  loadInfo:function(){
    var page = this
    wx.getLocation({
      type: 'gcj02',
      success:function(res){
        var latitude = res.latitude
        var longitude  = res.longitude 
        console.log(latitude,longitude )
        page.loadCity(latitude,longitude)
      }
    })
  },
  loadCity:function(latitude,longitude){
    var myAmapFun = new amapFile.AMapWX({key:'8ec253023540ee27dfe4f5a0b4288b50'})
    var that = this
    myAmapFun.getRegeo({
      success: function(data){
        //成功回调
        var localcity = data[0].regeocodeData.addressComponent.city
        localcity = localcity.substring(0,localcity.length-1)
        that.setData({city: localcity})
        that.loadWeather(localcity)
      },
      fail: function(info){
        //失败回调
        console.log(info)
      }
    })
  },
  loadWeather:function(city){
    var that =this
    wx.request({
      url: 'https://tianqiapi.com/api?version=v1&appid=65241933&appsecret=G86mcNRK&city='+city,
      success:function(data){
        that.setData({weather: data.data.data[0],future:data.data.data.splice(1,4)})
      }
    })
  }
})