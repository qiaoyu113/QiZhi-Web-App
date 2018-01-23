<template>
  <div class="login">
    <close></close><!--关闭-->
    <form class="login-form">
      <phone-no v-on:listenToPhone="showMessFromChild"></phone-no> <!--手机号-->
      <sms v-on:listenToPhone="showMessFromChild" v-on:getGeetest="getGeetestModal" ref="myTest"></sms><!--短信验证码-->
      <div class="item" v-if="isLogin" @click="submit"><p class="form-btn form-btn-marT btn3">登录</p></div>
      <div class="item" v-else  @click="submit"><p class="form-btn form-btn-marT form-btn-enable btn3">登录</p></div>
      <p class="btn-under font1" >登录即表示同意<span class="small font1">《企智网服务协议》</span>  <span class="forget">忘记密码？</span></p>
    </form>
    <div class="loginType">
      <p class="item" @click="goToTarget('password')"><i class="iconfont icon-mima mm"></i><span>密码登录</span></p>
      <p class="item" @click="getThirdUrl('wx')" v-if=" platform === 'WXH5' "><i class="iconfont icon-weixin1 wx"></i><span>微信登录</span></p>
      <p class="item" @click="getThirdUrl('qq')"><i class="iconfont icon-koukou qq"></i><span>QQ登录</span></p>
    </div>
    <z-modal :msgs="myMsg" v-on:geetest="smsGeet"></z-modal>
  </div>
</template>
<script type="text/ecmascript-6">
  import loginClose from '../../component/login/close.vue'
  import phoneNo from '../../component/login/phoneIpt.vue'
  import smsCode from '../../component/login/sms.vue'
  import {loginService} from '../../service/loginService'

  export default{
    props: [],
    data () {
      return {
        myMsg: '',
        myTest: '',
        isLogin: 0,
        platform: 'WXH5'
      };
    },
    components: {'close': loginClose, 'phone-no': phoneNo, 'sms': smsCode},
    mounted () {
    },
    methods: {
      submit () {
        let that = this;

        //phone=18210140036&platform=1&smsCode=7508&type=2phoneLogin
//        loginService.phoneLogin({phone: 123, platform: 'wxh5', smsCode: 2345, type:2}).then(function (res) {
//
//        });
      },
      getGeetestModal (data) { /*点击获取短信验证码，弹出框*/
        this.myMsg = {
          type: data
        }
      },
      smsGeet (data) {
        let that = this;
        that.myTest = data;
        console.log('geetest', that.myTest);
      },
      showMessFromChild () {}

    }
  }
</script>
<style lang="less">
  @import "../../assets/css/login/login.less";
</style>