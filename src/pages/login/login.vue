<template>
  <div class="login">
    <login-close></login-close>
    <form class="login-form">
      <p class="login-title">手机验证码登录</p>
      <phone v-on:listenToPhone="showMessFromChild"></phone>
      <!--<kapt-sms v-on:listenToSmsCode="showMessFromChild"></kapt-sms>-->
      <div class="item forget-item blank"></div>
      <div class="item"><p class="form-btn btn3" @click="submit">快捷登录</p></div>
      <p class="btn-under font1" @click="goToTarget('register')">新用户注册</p>
    </form>
    <div class="loginType">
      <p class="item" @click="getThirdUrl('wx')" v-if=" platform === 'WXH5' "><i class="iconfont icon-weixin1 wx"></i><span>微信登录</span></p>
      <!--<p class="item" @click="getThirdUrl('qq')"><i class="iconfont icon-koukou qq"></i><span>QQ登录</span></p>-->
      <!--<p class="item" @click="getThirdUrl('wb')"><i class="iconfont icon-sina wb"></i><span>微博登录</span></p>-->
      <p class="item" @click="goToTarget('password')"><i class="iconfont icon-mima mm"></i><span>密码登录</span></p>
    </div>
    <z-modal :msgs="msg"></z-modal>
  </div>
</template>
<script type="text/ecmascript-6">
  import phone from '../../component/login/phoneIpt.vue'
  import loginClose from '../../component/login/close.vue'
  import {common} from '../../assets/js/common/common'
  import {loginCommon} from '../../assets/js/login/loginCommon'
  import {loginService} from '../../service/loginService'
//  import {commonService} from '../../service/commonService'
  export default {
    components: {"phone": phone, 'login-close': loginClose, 'kapt-sms': kaptSms},
    props: [],
    data () {
      common.pageTitle('手机验证码登录')
      this.$store.state.loginStore.smsType = 2;
      return {
        msg: {type: 0 },
        phoneNo: '', //手机号
        kaptchaValue: '',
        smsValue: '', //短信验证码
        platform: 'WXH5', //平台
        loginType: '',
        errorMessage: '' //错误信息暂存字段
      }
    },
    mounted: function () {
      let that = this
      that.platform = loginCommon.getPlatForm();
      localStorage.platform = that.platform;
      localStorage.pathId = that.$route.params.shopId;
    },
    methods: {
      submit () { //表单提交的方法
        let that = this
        let mess = '';
        // 赋值区域 Begin
        that.phoneNo =that.$store.state.loginStore.phoneNo; //手机号
        that.kaptchaValue =that.$store.state.loginStore.kaptchaValue; //图片验证码
        that.smsValue =that.$store.state.loginStore.messValidate; // 短信验证码
        // 赋值区域 end
        mess = loginCommon.formValidate(1, 1, 1, 0, {phoneNo: that.phoneNo, kaptchaValue: that.kaptchaValue, smsValue: that.smsValue, pwd: that.pwd});
        if(typeof mess != 'undefined') {
          if(mess.trim('').length > 0){
            that.pop(mess);
            return false;
          }
        }
        else{
          loginService.phoneLogin({platform: localStorage.platform, phone: that.phoneNo, smsCode: that.smsValue, type: 2}).then(function (res) {
//            console.log('phone login', res)
            if(res.data.success){
              localStorage.token = res.data.datas;
              let JWT = res.data.datas.split('.');
              let info = JWT[1];
                loginService.packageUserInfo(info);
              // 清空倒计时
              if(that.$store.state.loginStore.timer > 0){
                clearInterval(that.$store.state.loginStore.timer)
              }
              that.goToTarget('');//跳转到来的页面
            }else{
              //if(res.data.code >= 512102 && res.data.code >= 512110) { // 短信验证码不正确，请重新输入
                that.pop(res.data.message)
              //}
            }
          });
        }
      },
      showMessFromChild (data) {
        let that = this;
        if(data.length > 0){
          that.pop(data); // 弹框
        }
        //console.log('各个组件传递回来的错误信息', data);

      },
      getThirdUrl (loginType) {
        let that = this, jumpRouter = '', wxscope = '';
        if(loginType === 'qq') {
          that.loginType = 'QQ';
          jumpRouter = 'qqlogin';
          wxscope = '';
        }
        if(loginType === 'wx') {
          that.loginType = 'WEIXIN';
          jumpRouter = 'wxlogin';
          wxscope = 'snsapi_userinfo';
        }
        if(loginType === 'wb') {
          that.loginType = 'WEIBO';
          jumpRouter = 'wblogin';
          wxscope = '';
        }
        commonService.getOauth({loginType: that.loginType, platform: localStorage.platform, jumpRouter: jumpRouter,wxscope: wxscope}).then(function (res) {
//          console.log('oauth', res);
          if(res.data.success){
            window.location.href = res.data.datas;
          }else {}
        });
      },
      pop (mess) { //弹框的方法
        let that = this
        common.autoCloseModal(that, mess, 1);
      },
      goToTarget (path) { //返回登录
        let that = this
        if(typeof path != 'undefined' && path.trim().length > 0){
          this.$router.replace({name: path})
        }
        else{
            if(that.$store.state.toolBox.redirect_uri && that.$store.state.toolBox.redirect_uri.name){
                let name = that.$store.state.toolBox.redirect_uri.name, params = that.$store.state.toolBox.redirect_uri.params;
                that.$router.replace({name: name, params: params})
                that.$store.state.toolBox.redirect_uri = {}
            }else if(localStorage.redirectUrl && localStorage.redirectUrl!="undefined"){
                let url = localStorage.redirectUrl
                localStorage.removeItem('redirectUrl')
                window.location.href = url
            }else{
                that.$router.replace({name: 'home'})
            }

        }
      }
    },
    watch: {
      errorMessage (cur, old) {
        if(cur.length > 0){
          this.pop(cur); // 弹框
        }
      }
    }
  }
</script>
<style lang="less">
  @import "../../assets/css/login/login.less";
</style>