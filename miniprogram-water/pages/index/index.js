
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item:0,
    tab:0,
    opacity: 0.4,
    disabled: true,
    threshold: 0,
    rule: 'up',
    items: [
      { name: 'up', value: '高于门限报警', checked: 'ture' },
      { name: 'down', value: '低于门限报警' },
    ]
  },

  radioChange: function (e) {
    //保存报警规则到当前页面的数据
    if (e.detail.value != "") {
      this.setData({
        rule: e.detail.value
      })
    }
    console.log(this.data.rule)
  },

  send: function () {

    var theBaiDuAPPkey = "cT5BI2EDic66YWxqm9cllbAuGkPgnvKY" //百度的AK, 此处要替换为你自己的APPKey
    var district_id = "110108"  //天气查询的区域编码,参考百度的api文档说明
    
    //调用百度天气API
    wx.request({
      url: `https://api.map.baidu.com/weather/v1/?district_id=${district_id}&data_type=all&ak=${theBaiDuAPPkey}`, //百度天气API

      success: (res) => {
        console.log(`APPKey: ${theBaiDuAPPkey}`, res.data)
        var tmp = res.data.result.now.temp

        //温度高于设置的门限值
        if (tmp > this.data.threshold) {
          if (this.data.rule == "up") {
            //规则为高于门限报警，于是报警
            wx.showModal({
              title: '警报！',
              content: `当前温度${tmp}度,高于设定值${this.data.threshold}`
            })
          }
          //规则为低于门限报警，于是不报警
          else if (this.data.rule == "down") {
            wx.showModal({
              title: '提示～',
              content: `当前温度${tmp}度,温度处于正常范围`
            })
          }
        }
        //温度低于设置的门限值
        else if (tmp <= this.data.threshold) {
          //规则为高于门限报警，于是不报警
          if (this.data.rule == "up") {
            wx.showModal({
              title: '提示～',
              content: `当前温度${tmp}度,温度处于正常范围`
            })
          }
          //规则为低于门限报警，于是报警
          else if (this.data.rule == "down") {
            wx.showModal({
              title: '警报！',
              content: `当前温度${tmp}度, 低于设定值${this.data.threshold}`
            })
          }
        }
      },

      fail: function (res) {
        console.log("请求失败", res)
      }
    })
  },

  change: function (e) {
    //当有输入时激活发送按钮，无输入则禁用按钮
    if (e.detail.value != "") {
      this.setData({
        threshold: e.detail.value,
        opacity: 1,
        disabled: false,
      })
    } else {
      this.setData({
        threshold: 0,
        opacity: 0.4,
        disabled: true,
      })
    }
  },
  changeItem:function(e){
    this.setData({
      item:e.target.dataset.item
    })
  },
  changeTab:function(e){
    this.setData({
      tab: e.detail.current
    })
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

  }
})