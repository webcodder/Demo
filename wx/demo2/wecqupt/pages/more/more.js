//more.js
//获取应用实例
var app = getApp();
Page({
  data: {
    user: {}
  },
  //下拉更新
  onPullDownRefresh: function(){
    this.getData();
  },
  onLoad: function(){
    this.getData();
  },
  getData: function(){
    var _this = this;
    var days = ['一','二','三','四','五','六','日'];
    _this.setData({
      'user': app._user,
      'time': {
        'term': app._time.term,
        'week': app._time.week,
        'day': days[app._time.day]
      },
      'is_bind': !!app._user.is_bind
    });
    wx.stopPullDownRefresh();
  }
});