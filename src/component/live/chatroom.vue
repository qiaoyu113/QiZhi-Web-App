<template>
  <div class="chatRoom" @click="documentClick">
    <div  class="chat-room-info" id="chatZone">
      <!--<div class="chat-item">
        <p class="con-tips">星期二  下午1:32</p>
      </div>-->
      <!--默认信息-->
      <div class="chat-item teacher">
        <div class="photo chatRoom-t-photo"></div>
        <!--<img class="photo" src="../../assets/image/default.png">-->
        <div class="talk">
          <p class="nike">讲师</p>
          <div class="mess">
            <i class="mess-trangle background1"></i>
            <div class="mess-con mess-box">{{ startTime}}开始直播：{{ title }}</div>
          </div>
        </div>
      </div>
      <div v-for="mess in messCollection">
        <!--自己-->
        <div v-if="mess.senderUserId == userId">
          <!--纯图片-->
          <div class="chat-item image s" v-if="mess.isImage">
            <img class="photo" :src="mess.photo" v-if="mess.photo.length > 33">
            <img class="photo" src="../../assets/image/common/default_photo.png" v-else>
            <div class="talk">
              <div class="mess mess-box">
                <img class="pic" :src="mess.content" @click="scalePic">
                <p class="imgCover">
                  <span class="bar bar-top"></span>
                  <span class="bar bar-bot"></span>
                </p>
              </div>
            </div>
          </div>
          <div class="chat-item self" v-else>
            <img class="photo" :src="mess.photo" v-if="mess.photo.length > 33">
            <img class="photo" src="../../assets/image/common/default_photo.png" v-else>
            <div class="talk">
              <div class="mess">
                <i class="mess-trangle background1"></i>
                <p class="mess-con mess-box" v-html="mess.content"></p>
              </div>
            </div>
          </div>
          <!--纯文本-->
        </div>
        <!--他人-->
        <div v-else>
          <!--讲师-->
          <div v-if="mess.isAdmin">
            <!--纯图片-->
            <div class="chat-item image t" v-if="mess.isImage">
              <div class="photo chatRoom-t-photo"></div>
              <!--<img class="photo" src="../../assets/image/default.png">-->
              <div class="talk">
                <p class="nike">讲师</p>
                <div class="mess mess-box">
                  <img class="pic" :src="mess.content" @click="scalePic">
                  <p class="imgCover">
                    <span class="bar bar-top"></span>
                    <span class="bar bar-bot"></span>
                  </p>
                </div>
              </div>
            </div>
            <!--纯文本-->
            <div class="chat-item teacher" v-else>
              <div class="photo chatRoom-t-photo"></div>
              <!--<img class="photo" src="../../assets/image/default.png">-->
              <div class="talk">
                <p class="nike">讲师</p>
                <div class="mess">
                  <i class="mess-trangle background1"></i>
                  <p class="mess-con mess-box" v-html="mess.content"></p>
                </div>
              </div>
            </div>
          </div>
          <!--其他人-->
          <div v-else>
            <!--纯图片-->
            <div class="chat-item image o" v-if="mess.isImage">
              <img class="photo" :src="mess.photo" v-if="mess.photo.length > 33">
              <img class="photo" src="../../assets/image/common/default_photo.png" v-else>
              <div class="talk">
                <p class="nike">{{ mess.name }}</p>
                <div class="mess">
                  <img class="pic" :src="mess.content" @click="scalePic">
                  <p class="imgCover">
                    <span class="bar bar-top"></span>
                    <span class="bar bar-bot"></span>
                  </p>
                </div>
              </div>
            </div>
            <!--纯文本-->
            <div class="chat-item other" v-else>
              <img class="photo" :src="mess.photo" v-if="mess.photo.length > 33">
              <img class="photo" src="../../assets/image/common/default_photo.png" v-else>

              <div class="talk">
                <p class="nike">{{ mess.name }}</p>
                <div class="mess">
                  <i class="mess-trangle"></i>
                  <p class="mess-con" v-html="mess.content"></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="paddingBot" id="paddingBot"></div>
    </div>
    <!--底部输入框-->
    <div class="emojiZone hide" id="emoji"></div>
    <div class="chat-room-ipt" v-if="isLogin === 1">
      <div class="ipt-cover" v-if="isCover"></div>
      <p class="ipt"><i class="iconfont icon-bianji2"></i><input type="text" class="kuang" :placeholder="placeholderMess" v-model="mySuggestion" @input="iptFocus" @focus="iptBlur('focus')" @blur="iptBlur('blur')"></p>
      <p class="iconZ">
        <i class="iconfont icon-xiaolian" @click="initEmoji"></i>
        <span class="btn btn1" v-if="focusState" @click="sendMessage('txt')">发送</span>
        <i class="iconfont icon-tupian" v-else><input type="file" class="myFile" id="myFile" @change="sendMessage('image')"></i>
      </p>
    </div>
    <div class="chat-room-ipt" v-if="isLogin === 0">
      <p @click="login" class="chatRoom-login">登录后再发表观点</p>
    </div>
    <z-modal :msgs="msg"></z-modal>
  </div>
</template>
<script type="text/ecmascript-6">
  import {liveService} from '../../service/liveService'
  import {common} from '../../assets/js/common/common'

  export default {
    props: ['comChatRoom'],
    data () {
      return {
        msg: {type: 0 },
        focusState: 0, // "发送"按钮是否显示
        chatroomId: '', // chatRoomid
        shopId: '', // 路径的shopId
        mySuggestion: '', // 输入框内容
        isLogin: 0, //是否已经登录过
        placeholderMess: '输入你想问的问题', //
        isCover: 0, //输入框是否可以输入内容
        userId: '',  //发送消息人标识
        startTime: '', //直播开始时间
        title: '', //直播名称
        messCollection: [] //信息集合
      }
    },
    components: {},
    mounted () {
      let that = this;
      that.chatroomId = that.comChatRoom.id;
      that.startTime = that.comChatRoom.startTime;
      that.title = that.comChatRoom.title;
      that.shopId = that.$route.params.shopId; //shopId
      document.getElementById('chatZone').style.height = (window.screen.availHeight - 306) + 'px';//计算交流区高度
      if(common.getRedirectPath(that)) {
        this.isLogin = 1;
      }else{
        this.isLogin = 0;
      }
      this.getAppKey();// 获取融云appkey
    },
    beforeDestroy () {
      this.quitChatRoom();
    },
    methods: {
      getAppKey () {
        let that = this;
        liveService.getChatAppKey(that.$route.params.shopId, that.chatroomId).then(function (res) {
          if(res.data.success){
            let myData = res.data.datas,appKey = myData.rongcloudAppkey,token = myData.userToken,isTalk = myData.chatroom.banTalk;
            if(isTalk){ // 是否全局禁言
              that.placeholderMess = '全局禁言中，只允许管理员发言';
              that.isCover = 1;
            }else{ // 是否自己被禁言
                if(that.isLogin){
                    liveService.isAllowedToTalk(that.shopId, that.chatroomId).then(function(res){
                        if(res.data.success){
                            if(!res.data.datas){//没有禁言
                                that.placeholderMess = '输入你想问的问题';
                                that.isCover = 0;
                            }else{
                                that.placeholderMess = '你已被管理员禁言';
                                that.isCover = 1;
                            }//禁言
                        }else{}
                    });
                }
            }
            that.getChatRoomInfo(appKey, token);//不管禁不禁言，都不影响看消息
          }else{
            //522101 聊天室ID不能为空
            //522102 chatroom为空,id参数错误
          }
        });
      },
      getChatRoomInfo (appkey, token) {
        let that = this;
          RongIMLib.RongIMClient.init(appkey);//初始化
          that.goListener(); // 监听器
          that.goConnection(token);// 连接

      },
      goListener() { //监听器
        let that = this;
        // 设置连接监听状态 （ status 标识当前连接状态 ）
        // 连接状态监听器
        RongIMClient.setConnectionStatusListener({
          onChanged: function (status) {
            switch (status) {
              case RongIMLib.ConnectionStatus.CONNECTED:
                console.log('链接成功');
                break;
              case RongIMLib.ConnectionStatus.CONNECTING:
                console.log('正在链接');
                break;
              case RongIMLib.ConnectionStatus.DISCONNECTED:
                console.log('断开连接');
                break;
              case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
                console.log('其他设备登录');
                //that.reConnection();
                break;
              case RongIMLib.ConnectionStatus.DOMAIN_INCORRECT:
                console.log('域名不正确');
                break;
              case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
                console.log('网络不可用');
                //that.reConnection();
                break;
            }
          }});

        // 消息监听器
        RongIMClient.setOnReceiveMessageListener({
          // 接收到的消息
          onReceived: function (message) {
            // 判断消息类型
            switch(message.messageType){
              case RongIMClient.MessageType.TextMessage: {
                // message.content.content => 消息内容
                let content = message.content.content;
                let extra = eval('('+ message.content.extra +')');
                //console.log('头像Rong before', extra.icon);
                if(extra.icon == null || extra.icon == 'undefined' || extra.icon == ''){
                  extra.icon = '';
                }
                let temp = {
                  content: RongIMLib.RongIMEmoji.symbolToHTML(content),
                  photo:  that.$store.state.picHead + extra.icon,
                  name: extra.name,
                  senderUserId: message.senderUserId,
                  isAdmin: extra.isAdmin,
                  isImage: 0
                };
                that.messCollection.push(temp)
                // 循环完毕没有定位到最低端
                  //定义到最底部
                  setTimeout(function () {
                      let tempHeight = document.getElementById('chatZone').scrollHeight;
                      document.getElementById('chatZone').scrollTop = tempHeight;
                  },500);
              }
                break;
              case RongIMClient.MessageType.VoiceMessage:
                // 对声音进行预加载
                // message.content.content 格式为 AMR 格式的 base64 码
                break;
              case RongIMClient.MessageType.ImageMessage:{
                // message.content.content => 图片缩略图 base64。
                // message.content.imageUri => 原图 URL。
                let con = message.content.content;
                let ext = eval('('+ message.content.extra +')');
                //console.log('图片', message);
                if(ext.icon == null || ext.icon == 'undefined' || ext.icon == ''){
                  ext.icon = '';
                }
                let tem = {
                  content: con,
                  photo: that.$store.state.picHead + ext.icon,
                  name: ext.name,
                  senderUserId: message.senderUserId,
                  isAdmin: ext.isAdmin,
                  isImage: 1
                };
                //console.log('头像rongimage')
                that.messCollection.push(tem);
                  //定义到最底部
                  setTimeout(function () {
                      let tempHeight = document.getElementById('chatZone').scrollHeight;
                      document.getElementById('chatZone').scrollTop = tempHeight;
                  },500);
              }
                break;
              case RongIMClient.MessageType.DiscussionNotificationMessage:
                // message.content.extension => 讨论组中的人员。
                break;
              case RongIMClient.MessageType.LocationMessage:
                // message.content.latiude => 纬度。
                // message.content.longitude => 经度。
                // message.content.content => 位置图片 base64。
                break;
              case RongIMClient.MessageType.RichContentMessage:
                // message.content.content => 文本消息内容。
                // message.content.imageUri => 图片 base64。
                // message.content.url => 原图 URL。
                break;
              case RongIMClient.MessageType.InformationNotificationMessage:
                // do something...
                break;
              case RongIMClient.MessageType.ContactNotificationMessage:
                // do something...
                break;
              case RongIMClient.MessageType.ProfileNotificationMessage:
                // do something...
                break;
              case RongIMClient.MessageType.CommandNotificationMessage:
                // do something...
                break;
              case RongIMClient.MessageType.CommandMessage:
                // do something...
                break;
              case RongIMClient.MessageType.UnknownMessage:
                // do something...
                break;
              default:
                    // do something...
            }
          }
        });
      },
      goConnection(token) { //连接
        let that = this;
        RongIMClient.connect(token, {
          onSuccess: function(userId) {
            that.userId = userId;
            that.joinChat();
          },
          onTokenIncorrect: function() {
//            console.log('token无效');
          },
          onError:function(errorCode){
            var info = '';
            switch (errorCode) {
              case RongIMLib.ErrorCode.TIMEOUT:
                info = '超时';
                break;
              case RongIMLib.ErrorCode.UNKNOWN_ERROR:
                info = '未知错误';
                break;
              case RongIMLib.ErrorCode.UNACCEPTABLE_PaROTOCOL_VERSION:
                info = '不可接受的协议版本';
                break;
              case RongIMLib.ErrorCode.IDENTIFIER_REJECTED:
                info = 'appkey不正确';
                break;
              case RongIMLib.ErrorCode.SERVER_UNAVAILABLE:
                info = '服务器不可用';
                break;
            }
            console.log(errorCode);
          }
        });
      },
      reConnection() { ///重新连接
        let that = this;
        var callback = {
          onSuccess: function(userId) {
//            console.log("Reconnect successfully.");
            that.userId = userId;
            that.joinChat();
          },
          onTokenIncorrect: function() {
            //console.log('token无效');
          },
          onError:function(errorCode){
            //console.log(errorcode);
          }
        };
        var config = {
          // 默认 false, true 启用自动重连，启用则为必选参数
          auto: true,
          // 重试频率 [100, 1000, 3000, 6000, 10000, 18000] 单位为毫秒，可选
          url: 'cdn.ronghub.com/RongIMLib-2.2.6.min.js',
          // 网络嗅探地址 [http(s)://]cdn.ronghub.com/RongIMLib-2.2.6.min.js 可选
          rate: [100, 1000, 3000, 6000, 10000]
        };
        RongIMClient.reconnect(callback, config);
      },
      sendMessage (typ) { //纯文本消息，sendImage
        let that = this;
        if(typ == 'txt'){
          that.sendMessCallback(); // 纯文本
        }else if(typ == 'image'){
          that.sendImageCallback(); // 纯图片
        }
        //定义到最底部
        document.getElementById('chatZone').scrollTop = document.getElementById('chatZone').scrollHeight;
      },
      sendMessCallback () {
        let that = this;
        if(that.mySuggestion.trim().length > 0){ //确定发送的内容，有内容，不是空，都是success=true
          liveService.sendTxt(that.shopId, that.chatroomId, {message: that.mySuggestion}).then(function(res){
            //console.log('发送消息', res);
            if(res.data.success){
              let myData = res.data.datas;
              if(myData.icon == null || myData.icon == 'undefined' || myData.icon == ''){//避免传递回来的头像值为空
                myData.icon = '';
              }
              // 判断禁言，全局禁言banspeak，自己被禁言banspeakone
              if(that.isBanSpoken(myData.banspeak, myData.banspeakone)){
                return false;
              }else{
                //本地dom操作
                let temp = {
                  //content: that.mySuggestion,
                  content: RongIMLib.RongIMEmoji.symbolToHTML(that.mySuggestion),
                  photo: that.$store.state.picHead + myData.icon,
                  name: '',
                  senderUserId: that.userId,
                  isAdmin: 0,
                  isImage: 0
                };
                //console.log('头像', temp.photo);
                that.messCollection.push(temp)
                that.mySuggestion = '';
                that.focusState = 0;
              }
            }else{
//                  522101 聊天室ID不能为空
//                  522102  chatroom为空,id参数错误
//                  522103  rongcloudAPI错误
            }
          });
        }
      },
      sendImageCallback () {
        let that = this, file = myFile.files[0], limitSize = 100*1024, choseSize = file.size;
        if(choseSize <= limitSize){//单位byte
          var formData = new FormData();
          formData.append("myfile", myFile.files[0]); //myFile是file的ID
          //console.log('如果我的formData',formData);
          liveService.sendImage(that.shopId, that.chatroomId, formData ).then(function(res){
            if(res.data.success){
              let myData = res.data.datas;
              if(myData.icon == null || myData.icon == 'undefined' || myData.icon == ''){
                myData.icon = '';
              }
              // 判断禁言，全局禁言banspeak，自己被禁言banspeakone
              if(that.isBanSpoken(myData.banspeak, myData.banspeakone)){
                return false;
              }else{
                //本地dom操作
                let temp = {
                  content: myData.content,
                  photo: that.$store.state.picHead + myData.icon,
                  name: '',
                  senderUserId: that.userId,
                  isAdmin: 0,
                  isImage: 1
                };
                //console.log(extra);
                that.messCollection.push(temp)
              }

            }else{
              let code = res.data.code;
              if( code >= 522104 && code <= 20){
//                  522104  图片不能超过100KB
//                  522105  图片不存在
                that.pop(res.data.message);
              }
//                  522101 聊天室ID不能为空
//                  522102  chatroom为空,id参数错误
//                  522103  rongcloudAPI错误
            }
          });
        }else {
          that.pop('图片大小不能超过100KB');
        }
        let obj = document.getElementById('myFile');//清空文件选择器
        obj.value = '';//清空文件选择器
      },
      joinChat () {
        let that = this;
        var chatRoomId = that.chatroomId; // 聊天室 Id。
        var count = 50;// 拉取最近聊天最多 50 条。
        RongIMClient.getInstance().joinChatRoom(chatRoomId, count, {
          onSuccess: function() {
            // 加入聊天室成功。
            console.log('success  joined')
          },
          onError: function(error) {
            // 加入聊天室失败
            console.log('success  error')
          }
        });
      },
      quitChatRoom () {
        let that = this;
        let chatRoomId = that.chatroomId; // 聊天室 Id。
        RongIMClient.getInstance().quitChatRoom(chatRoomId, {
          onSuccess: function() {
            // 退出聊天室成功。
//            console.log('退出聊天室成功。')
            RongIMClient.getInstance().disconnect();
          },
          onError: function(error) {
            // 退出聊天室失败。
//            console.log('退出聊天室失败。')
          }
        });
      },
      getHistory () {
        var conversationType = RongIMLib.ConversationType.CHATROOM; //聊天室,其他会话选择相应的消息类型即可。
        var targetId = this.chatroomId; // 想获取自己和谁的历史消息，targetId 赋值为对方的 Id。
        var timestrap = 0; // 默认传 null，若从头开始获取历史消息，请赋值为 0 ,timestrap = 0;
        var count = 20; // 每次获取的历史消息条数，范围 0-20 条，可以多次获取。
        RongIMLib.RongIMClient.getInstance().getHistoryMessages(conversationType, targetId, timestrap, count, {
          onSuccess: function(list, hasMsg) {
            // list => Message 数组。
            // hasMsg => 是否还有历史消息可以获取。
            //console.log('Message 数组', list, '是否还有历史消息可以获取', hasMsg);
            if(hasMsg){
            }else{
            }
          },
          onError: function(error) {
            //console.log("GetHistoryMessages,errorcode:" + error);
          }
        });
      },
      createDom (dom, info, zoneId) {
        let that = this;
        let item = document.createElement('div');
        item.className = 'chat-item '+ dom.className;
        let photo = document.createElement('img');
        photo.className = 'photo';
        photo.src = info.src;
        let talk = document.createElement('div');
        talk.className = 'talk';
        let nike = document.createElement('p');
        nike.className = 'nike';
        nike.innerHTML = info.name;
        let mess = document.createElement('div');
        mess.className = 'mess';
        if(dom.isImage){
          //mess下的情况二：纯图片
          let pic = document.createElement('img');
          pic.className = 'pic';
          pic.src = info.con;
          pic.onclick = that.scalePic(info.con);
          let imgCover = document.createElement('p');
          imgCover.className = 'imgCover';
          let barTop = document.createElement('span');
          barTop.className = 'bar bar-top';
          let barBot = document.createElement('span');
          barBot.className = 'bar bar-bot';


          imgCover.appendChild(barTop);
          imgCover.appendChild(barBot);
          mess.appendChild(pic);
          mess.appendChild(imgCover);
        }else{
          // mess下的情况一：纯文本消息
          let triangle = document.createElement('i');
          triangle.className = 'mess-trangle';
          let con = document.createElement('div');
          con.className = 'mess-con';
          con.innerHTML = RongIMLib.RongIMEmoji.symbolToHTML(info.con); //将表情名称转换为对应的HTML
          mess.appendChild(triangle);
          mess.appendChild(con);
        }
        talk.appendChild(nike);
        talk.appendChild(mess);
        item.appendChild(photo);
        item.appendChild(talk);
        document.getElementById(zoneId).appendChild(item);
        //定义到最底部
        document.getElementById(zoneId).scrollTop = document.getElementById(zoneId).scrollHeight;
      },
      initEmoji (event) {  //表情库
        let e = event || window.event;
        e.stopPropagation(); //阻止冒泡
        let that = this;
        let eZone = document.getElementById('emoji');//存放表情的弹出层
        let config = {
          size: 24,
          lang: 'zh',
          extension: {
            dataSource: {
              u1F914: {
                zh: '思考',
                en: 'thinking face',
                tag: '🤔',
                position: '0px 0px'
              }
            },
            url: 'https://emojipedia-us.s3.amazonaws.com/thumbs/160/apple/96/thinking-face_1f914.png'
          }
        };
        RongIMLib.RongIMEmoji.init(config); // 初始化
        let list = RongIMLib.RongIMEmoji.list;// 获得所有表情的集合
        for (var i = 0; i < list.length; i++) { // 追加到对应的HTML区域
          var emojiHtml = list[i].node;
          eZone.appendChild(emojiHtml);
          emojiHtml.onclick = that.clickEmoji;
        }
        document.getElementById('emoji').className = 'emojiZone'; //显示表情层
      },
      clickEmoji(event) {  //点击每一个单独的表情的触发事件
        let that = this;
        let e = event || window.event;
        let target = e.target || e.srcElement;
        if (document.all && !document.addEventListener === false) {
          //console.log(target);
        }
        that.mySuggestion = that.mySuggestion + target.getAttribute("name");
        that.focusState = 1;
      },
      documentClick () { //点击非空白区域关闭层
        document.getElementById('emoji').className = 'emojiZone hide';
      },
      scalePic (event) {
        let obj = event.currentTarget;
        let src = obj.src;
        this.msg = {
          imageUrl: src,
          type: 5
        }
      },
      isBanSpoken (isAll, isSelf) {
        let that = this;
        if(isAll){// 是全局禁言状态
          that.pop('全局禁言中，只允许管理员发言');
          that.mySuggestion = '';
          that.focusState = 0;
          that.placeholderMess = '全局禁言中，只允许管理员发言';
          that.isCover = 1;
          return true;
        }else{
          if(isSelf){// 是自己被禁言了
            that.pop('你已被管理员禁言');
            that.mySuggestion = '';
            that.focusState = 0;
            that.placeholderMess = '你已被管理员禁言';
            that.isCover = 1;
            return true;
          }else{
            that.placeholderMess = '输入你想问的问题';
            that.isCover = 0;
            return false;
          }
        }
      },
      login () {
        this.$router.push({name: 'login'});
      },
      iptFocus (event) {
        let that = this,obj = event.currentTarget;
        if(obj.value.trim().length > 0){
          that.focusState = 1;
        }else{
          that.focusState = 0;
        }
      },
      iptBlur (sty){
          if(sty == 'focus'){
              //document.getElementById('back-home').style.display = 'none';
              document.getElementById('back-home').className = 'isStatic';
          }else if(sty == 'blur'){
              //document.getElementById('back-home').style.display = 'block';
              document.getElementById('back-home').className = '';
          }
      },
      pop (mess) {
        let that = this
        common.autoCloseModal(that, mess, 1);
      }
    },
    watch: {
      chatroomId (cur, old) {
        this.chatroomId = cur;
        //this.getAppKey ();
      },
      startTime (cur, old){
        this.startTime = cur;
      },
      title (cur, old) {
        this.title  = cur;
      }
    }
  }
</script>
<style>
  .chatZone{
    max-width: 450px;
  }
  .chatRoom-login{width:100%;height:100%;font-size: .4267rem;;display:flex;justify-content:center;align-items: center;background:#fff;color:#666;}
  .isStatic{position:static!important;bottom:0!important;right:0!important;}
</style>