<template>
  <div class="live-details">
    <z-history :type="2"></z-history>
    <!--存放播放器的区域-->
    <div class="live-show" v-if="isShowVideo">
      <live-video></live-video>
      <span class="having-people vjs-paused" v-if="liveObject.liveStatus === 2">{{ socketPerson }}人</span>
    </div>
    <!--直播的没有播放器的三种情况-->
    <div class="live-show" v-else>
      <img class="image" :src="liveObject.cover">
      <div class="countdown" v-if="liveObject.liveStatus === 1"><!--未开始-->
        <p class="timeR">
          倒计时
          <span class="cd" id="dd"> {{ toOrder.timeR.dd }}</span>:
          <span class="cd" id="hh">{{ toOrder.timeR.hh }}</span>:
          <span class="cd" id="mm">{{ toOrder.timeR.mm }}</span>:
          <span class="cd" id="ss">{{ toOrder.timeR.ss }}</span>
        </p>
      </div>
      <div class="d-cover" v-if="liveObject.liveStatus === 2"><!--直播中-->
        <p class="end-txt">{{ liveMessage }}</p>
      </div>
      <div class="d-cover" v-if="liveObject.liveStatus === 3"><!--已结束-->
        <div class="d-cover-center">
          <p class="end-txt" v-if="finish.isWatchBack">直播已结束</p>
          <span class="btn joined" v-if="finish.isWatchBack" @click="playBack">回放</span>
          <p class="end-txt" v-else>直播已结束，直播不允许回放</p>
        </div>
      </div>
    </div>
    <!--tab切换-->
    <div class="live-mid">
      <span class="live-mid-item cur-item" @click="howToShow(1,$event)">直播简介</span>
      <span class="live-mid-item" @click="howToShow(3,$event)">讲师</span>
      <span class="live-mid-item" @click="howToShow(2,$event)">交流区</span>
    </div>
    <!--详情介绍，交流区，讲师-->
    <div class="live-bot">
      <div class="live-bot-details" v-if="liveMid === 1"><!--详情编辑器内容-->
        <p class="intro-title">{{ liveObject.title }}</p>
        <p class="intro-des">{{ liveObject.startTime }}开始|{{ liveObject.subscribeNum }}人报名</p>
        <div class="intro-aws paddingBottom" v-html="liveObject.description"></div>
      </div>
      <chat-room class="live-bot-chat" v-if="liveMid === 2"></chat-room><!--交流区-->
      <div class="chatRoom live-bot-chat" v-if="liveMid === 3"><!--讲师-->
        <div  class="chat-room-info" id="chatZoneTea" >
          <div class="chat-item teacher">
            <div class="photo chatRoom-t-photo"></div><!--为了方便一键换头像-->
            <div class="talk">
              <p class="nike">讲师</p>
              <div class="mess">
                <i class="mess-trangle background1"></i>
                <div class="mess-con mess-box">{{ liveObject.startTime }}开始直播：{{ liveObject.title }}</div>
              </div>
            </div>
          </div>
          <div class="chat-item image t" v-if="item.type === 2" v-for="item in teachMess">
            <div class="photo chatRoom-t-photo"></div><!--为了方便一键换头像-->
            <div class="talk">
              <p class="nike">讲师</p>
              <div class="mess">
                <img class="pic" :src="item.msg">
                <p class="imgCover">
                  <span class="bar bar-top"></span>
                  <span class="bar bar-bot"></span>
                </p>
              </div>
            </div>
          </div>
          <div class="chat-item teacher" v-else>
            <div class="photo chatRoom-t-photo"></div><!--为了方便一键换头像-->
            <div class="talk">
              <p class="nike">讲师</p>
              <div class="mess">
                <i class="mess-trangle background1"></i>
                <div class="mess-con mess-box" v-html="item.msg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  const video = (resolve) => {require(['../../component/video/video.vue'],resolve)}
  import chatRoom from '../../component/live/chatroom.vue'
  import {appService} from '../../service/appService'

  export default {
    data () {
      return {
        watchNo: 0, //详情观看房间号
        isShowVideo: 0, //是否显示播放器
        socketPerson: 0, // 观看直播的在线人数
        liveObject: {
          cover: 'http://p0.qhimgs4.com/t01ce150b767122f35d.webp', // 封面图
          liveStatus: 2, // 直播所处于的状态 1.未开始 2.直播中 3.已结束
          watchType: 1, // 直播所属于的类型 1.公开 2.付费 3.密码
          title: '除了老字号，前门还有什么洋气小馆？名称显示全', // 直播标题
          startTime: '2017-12-31 14:00', // 直播开始时间
          subscribeNum: 123, // 直播报名人数
          description: '<p>的发送到非的第三方的</p>', // 直播报名人数
          aa: ''
        }, // 直播详情数据
        toOrder: { // 直播未开始
          timeR: {
            dd: '00',
            hh: '00',
            mm: '00',
            ss: '00',
          },// 倒计时的天、时、分、秒
          isBook: 0 // 是否预约了
        },
        liveMessage: '购买后才可以观看', // 直播中状态，的消息提示
        finish: { // 直播已结束
          isWatchBack: 1 // 是否允许回放
        },
        liveMid: 1, // 三个tab的切换状态, 1.详情区 2.交流区 3.讲师区
//        socketPerson: 0, // 观看直播的在线人数
      }
    },
    components: { 'live-video': video, 'chat-room': chatRoom},
    computed:{

    },
    syncData({store}) {
      /*基本规则
       * 所有不需要token的请求都放在这里
       * 这里不出现window，document等DOM元素
       * 这里获得的数据都要存储在store中
       * 写法如下
       * */
      const that = this;
      /*
       * 将所有的请求处理以数组放在promise中
       * that.data().data调用数据
       * */
      return Promise.all([
        appervice.getParam().then(res=>{
//                    store.state.homeStore.listImg = res.data;
        }),
      service.getParam().then(res=>{
//                    store.state.homeStore.noticelist = res.data.datas;
      }),
    ])
    },
    computed: {
      //将存在store中的数据取出
      listImg() {
        return this.$store.state.homeStore.listImg || []
      },
      noticelist() {
        return this.$store.state.homeStore.noticelist || []
      },
    },
    mounted: function() {
      /*
       * 所有需要token的请求都放在这里
       * 可以使用DOM元素
       * 这里的数据可以放在data中
       * */
      let that = this;
      that.watchNo = that.$route.params.watchNo;
      that.getDetails(); //加载详情

    },
    methods: {
      getDetails () {
         liveService.getDetails().then(function () {

         });
      },
      // 获得讲师消息
      getMessOfSponsor () {},
      // 详情页三个tab切换
      howToShow (no, event) {
        let that = this, obj = event.currentTarget;
        let parentN = obj.parentNode,childrenN = parentN.childNodes;
        for(let i = 0; i< childrenN.length; i++){
          childrenN[i].className = 'live-mid-item';
        }
        obj.className = 'live-mid-item cur-item';
        that.liveMid = no;
        if (no== 2){
        }else if(no == 3){
          setTimeout(function(){
            that.getMessOfSponsor();
          },200);
        }
      },
      // 回放
      playBack () {
        let that = this;
        // 调用播放器
        if(that.liveObject.watchType === 1){
          that.video.autoplay = true; //开始自动播放
          that.liveObject.liveStatus = 2;
          that.isShowVideo = 1;
        }else{
          if(common.getRedirectPath(that)){
            that.video.autoplay = true; //开始自动播放
            that.liveObject.liveStatus = 2;
            that.isShowVideo = 1;
          }else{
            //that.$router.push({name: 'login'});
          }
        }

      },
    }
  }
</script>
<style lang="less">
  /*rem等基本设置都放在base中，不写多个*/
  @import url('../../assets/css/base.less');
  @import url('../../assets/css/live/live.less');
</style>

