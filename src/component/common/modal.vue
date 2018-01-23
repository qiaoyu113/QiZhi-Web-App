<template>
  <div id="modal">
    <div class="modal"  v-if="msgs.type" >
      <div class="tips" v-if="msgs.type == 1">
        <p>{{msgs.text}}</p>
      </div>
      <div  v-if="msgs.type == 2">
        <div>
          <p>{{msgs.text}}</p>
          <div class="confirm-btn" @click="close">确定</div>
        </div>
      </div>
      <div class="tips3" v-if=" msgs.type == 3">
        <div class="center">
          <div class="confirm-info">
            <p>{{msgs.text}}</p>
          </div>
          <div class="confirm-btn" @click="ok">确定</div>
        </div>
      </div>
      <div class="tips4"  v-if="msgs.type == 4">
        <div class="center">
          <div class="confirm-info"><input :type="msgs.iptType" class="ipt" :placeholder="msgs.text" v-model="iptPwd"></div>
          <div class="confirm-btn" @click="ok">确定</div>
        </div>
      </div>
      <div class="tips-photo"  v-if="msgs.type == 5"><!--图片放大-->
        <i class="iconfont icon-guanbi2" @click="close"></i>
        <div class="center">
           <img class="original" :src="msgs.imageUrl">
        </div>
      </div>
      <div class="tips-gt" v-if="msgs.type === 6">
        <div class="center" id="cap"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      iptPwd: '',
    }
  },
  props:['msgs'],
  mounted: function() {
  },
  updated: function() {
    if(this.msgs.type==6){
      this.getGt();
    }
  },
  methods: {
    close:function(){
      this.msgs.type = 0;
    },
    getGt: function () {
      var that = this;
      axios.get('http://admin.saas.vjuzhen.com/open/initcaptcha?t=" + (new Date()).getTime()').then(function (res) {
        // 使用initGeetest接口gt:"9966aae93f8e16fdd254b8adeffcddfa   challenge:107be150a425ee397d4f8716222f4242
        // 参数1：配置参数
        // 参数2：回调，回调的第一个参数验证码对象，之后可以使用它做appendTo之类的事件
        console.log('后台清洁球', res);
          if(res.data.success){
            var data = res.data;
            initGeetest({
              // 省略配置参数
              gt: data.gt, //字符串类型。验证 id，极验后台申请得到
              challenge: data.challenge,//字符串类型。验证流水号，后服务端 SDK 向极验服务器申请得到
              offline:  !data.success,//布尔类型。极验API服务器是否宕机（即处于 fallback 状态）
              new_captcha: true,//布尔类型。宕机情况下使用，表示验证是 3.0 还是 2.0，3.0 的 sdk 该字段为 true
              //product: 'bind',
              //product: 'popup',
              product: 'custom',
//              area: '#cap', // 假设页面有一个id为area的标签
//              next_width: '300px',
//              bg_color: 'black'
            }, function (captchaObj) {
              console.log('captchaObj', captchaObj);
              captchaObj.appendTo("#cap");//将验证按钮插入到宿主页面中，参数可以是 id 选择器，也可以是具体的元素
              //captchaObj.bindForm();//假如您的页面信息通过表单进行提交的，可以通过此接口将验证参数的结果绑定到一个表单上去
              //captchaObj.getValidate();//获取二次验证所需的凭证
              //captchaObj.reset();//重置验证到初始状态
              //captchaObj.verify();// 供product为bind类型的验证使用，进行验证
              captchaObj.onReady(function () {
                //监听验证按钮的 DOM 生成完毕事件
                //$("#wait").hide();
                 //console.log(11111)
              });
              captchaObj.onSuccess(function () {
                // 监听验证成功事件
                var result = captchaObj.getValidate();
                var geetest = {
                  geetest_challenge: result.geetest_challenge,
                  geetest_validate: result.geetest_validate,
                  geetest_seccode: result.geetest_seccode,
                }

                console.log('成功', result);
                //that.$store.state.loginStore.geetest = geetest;
                that.$emit('geetest', geetest);
                that.msgs.type = 0;
              });
              captchaObj.onError(function () {
                //监听验证出错事件
              });
//              captchaObj.onClose(function () {
//                //监听product为bind时的关闭验证事件
//              });

//                var result = captchaObj.getValidate();
//                if (!result) {
//                  $("#notice1").show();
//                  setTimeout(function () {
//                    $("#notice1").hide();
//                  }, 2000);
//                  e.preventDefault();
//                }

              // 将验证码加到id为captcha的元素里，同时会有三个input的值用于表单提交
//              captchaObj.appendTo("#captcha1");
//              captchaObj.onReady(function () {
//                $("#wait1").hide();
//              });

              //captchaObj.appendTo('#captcha-box');
              // 省略其他方法的调用
//              captchaObj.onError(function () {
//                // 出错啦，可以提醒用户稍后进行重试
//                // console.log('进入出错方法')
//              });
            });
          }
      });

    },
    ok: function () {
      // 用于解决弹框输密码的功能
      this.msgs.dialogs.livePwd = this.iptPwd;
      this.$emit('iamSure', this.msgs.dialogs);
      this.iptPwd = '';
      this.msgs.type = 0;
    }
  }
}
</script>
<style>
  .modal{width:100%;height:100%;position:fixed;z-index:100;top:0;left:0;display:flex;justify-content: center;align-items:center;}
  .tips{ z-index:200;animation: showPop 2s ease 0s;max-width:295px;padding:14px 30px;line-height:24px;font-size: 16px;color: #FFF;opacity:0;background: #000;border-radius: 4px;}
  .tips3,.tips4,.tips-photo,.tips-gt{width:100%;height:100%;background:rgba(0,0,0,.5);display:flex;justify-content: center;align-items: center;}
  .tips3 .center,.tips4 .center{width:270px;height:138px;background:#fff;border-radius: 12px;}
  .tips3 .center .confirm-info,.tips4 .center .confirm-info{width:100%;height:93px;font-size: 13px;display:flex;justify-content: center;align-items: center;}
  .tips3 .center .confirm-btn,.tips4 .center .confirm-btn{width:100%;height:44px;line-height:44px;text-align:center;font-size: 17px;color: #0076FF;border-top:1px solid #eee;}
  .tips4 .center .confirm-info .ipt{width:237px;height:40px;padding:0 6px;border:1px solid #ddd;outline:none;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;}
  .tips-photo{background:rgba(0,0,0,.9);z-index:99;}
  .tips-photo .icon-guanbi2{font-size:.8rem;color:#ddd;position:absolute;top:.4rem;right:.4rem;}
  .tips-photo .center{width:90%;margin:0 auto;display:flex;align-items: center; justify-content: center;}
  .tips-photo .center .original{max-width:100%;max-height:100%;}
  /* 极客验证 */
  /*.tips-gt .center{width: 6.6667rem;height: 6.5067rem;}.tips-gt .center {width: 6.6667rem!important;height: 6.5067rem!important;}*/
    @keyframes showPop{
      0%{
          -webkit-transform: scale(.1);
          -moz-transform: scale(.1);
          -o-transform: scale(.1);
          -ms-transform: scale(.1);
          transform: scale(.1);
          opacity: 0;
      }
      15%{
          -webkit-transform: scale(1);
          -moz-transform: scale(1);
          -o-transform: scale(1);
          -ms-transform: scale(1);
          transform: scale(1);
          opacity: 0.8;
      }
      90%{
          -webkit-transform: scale(1);
          -moz-transform: scale(1);
          -o-transform: scale(1);
          -ms-transform: scale(1);
          transform: scale(1);
          opacity: 0.8;
      }
      100%{
          -webkit-transform: scale(1);
          -moz-transform: scale(1);
          -o-transform: scale(1);
          -ms-transform: scale(1);
          transform: scale(1);
          opacity: 0;
      }
  }
</style>

