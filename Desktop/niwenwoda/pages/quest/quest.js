const utils = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    zan:"点赞",
    text:1,
    bian:true,
    bangdanCont:[],
    logs: [],
    currentTab:0,   //默认第一个tab
    show: false,    //转发弹出
    value: ''       //聊天input
  },
  //转发弹出
  dianji:function(){
    this.setData({ show: true });
    console.log(this.data.show)

  },
   //点击评论

  //聊天input
  onChange(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
  },
  onClose() {
    this.setData({ show: false });
  },
  dianzan:function(){
    
    if (this.data.zan =="点赞"){
      this.setData({ bian: false})
      console.log(222)
      
      this.data.zan=""
    }else{
      var a = this.data.text+1
      this.setData({ text: a })
      console.log(333)
      console.log(this.data.text)
    }

  },
  zhuanfa:function(){
    wx.showShareMenu({
      withShareTicket: true
    })
  },

  // 获取评论框值
  xiePingLun(e) {
    console.log(e.detail.value)
    this.setData({
      
      xiePingLun: e.detail.value
    })
  },
  confirm() {

    if (this.data.xiePingLun == '') {
      wx.showToast({
        title: '请输入内容',
        icon: 'none',
        
        duration: 3000
      })
    } else {
      console.log(this.data.xiePingLun)
      // zuan 为本人钻石得数量
      var zuan = 1;
      let that = this
      // 有钻石
      if (zuan > 0) {
        wx.showModal({
          title: '提示',
          content: '确认提交评论?',
          success(res) {
            if (res.confirm) {
              let value = that.data.xiePingLun
              let comment = that.data.bangdanCont
              console.log('用户点击确定')
              let arr = {
                title: '测试用户',
                pubdates: value
              }
              
              comment.push(arr)
              console.log(comment)
              that.setData({
                bangdanCont: comment,
                'inputValue': ''
              })
              
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    }
  },

//end


  clickTab: function (e) {//头部tab切换
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      console.log(123)
      return false;
    } else {
      console.log(123)
      that.setData({
        currentTab: e.target.dataset.current,
      })
    }
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      logs: utils.formatTime(new Date())
    })
    if (this.data.logs == utils.formatTime(new Date())){
      console.log("刚刚")
      this.setData({
        logs: "刚刚"
      
      })
    }
    else if (this.data.logs > utils.formatTime(new Date())){
      this.setData({
        logs: this.getData +"天前"

      })
    }
    const _this = this;
    wx.request({
      url: "https://douban.uieee.com/v2/movie/top250",
      data: {},
      header: {
        'content-type': 'json'
      },
      success: function (res) {
        console.log(res.data)
        _this.setData({
          bangdanCont: res.data.subjects
        })
      }
    });
    wx.request({
      url: "https://douban.uieee.com/v2/movie/in_theaters",
      data: {},
      header: {
        'content-type': 'json'
      },
      success: function (res) {
        console.log(res.data)
        _this.setData({
          subjects: res.data.subjects,
        })
      }
    });
    wx.request({
      url: "https://douban.uieee.com/v2/movie/subject/26942674",
      data: {},
      header: {
        'content-type': 'json'
      },
      success: function (res) {
        console.log(res.data)
        _this.setData({
          renwu: res.data
        })
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 时间
    
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