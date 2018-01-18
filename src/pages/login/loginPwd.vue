<template>
  <div class="login">
    <login-close></login-close>
    <form class="login-form">
      <p class="login-title">帐号密码登录</p>
      <phone v-on:listenToPhone="showMessFromChild"></phone>
      <pwd v-modal="pwd-com"></pwd>
      <!--<cha-key v-modal="key-com" ref="chaKey"></cha-key>-->
      <div class="item forget-item">
        <a class="forgetPwd font1" @click="goToTarget('find')">忘记密码？</a>
      </div>
      <div class="item"><p class="form-btn btn3" @click="submit">登录</p></div>
      <p class="btn-under font1" @click="goToTarget('login')">动态验证码登录</p>
    </form>
    <z-modal :msgs="msg"></z-modal>
  </div>
</template>
<script type="text/ecmascript-6">
  import phone from '../../component/login/phoneIpt.vue'
  import pwd from '../../component/login/pwdIpg.vue'
  import loginClose from '../../component/login/close.vue'
  import {common} from '../../assets/js/common/common'
  import {loginCommon} from '../../assets/js/login/loginCommon'
  import {loginService} from '../../service/loginService'

  export default {
    props: [],
    components: {"phone": phone, "cha-key": chaKey, "pwd": pwd, 'login-close': loginClose },
    data () {
      common.pageTitle('帐号密码登录')
      return {
        msg: {type: 0 },
        phoneNo: '', //手机号
        kaptchaValue: '', //用户输入的图片验证码
        pwd: '', //密码
        platform: 'WXH5'

      }
    },
    mounted: function () {
      let that = this
      that.platform = loginCommon.getPlatForm();
      that.$store.state.loginStore.platform = that.platform;
    },
    methods: {
      submit () { //表单提交的方法
        let that = this
        let mess = '';
        // 赋值区域 Begin
        that.phoneNo =that.$store.state.loginStore.phoneNo;
        that.kaptchaValue =that.$store.state.loginStore.kaptchaValue;
        that.pwd =that.$store.state.loginStore.password;
        // 赋值区域 end
        mess = loginCommon.formValidate(1, 1, 0, 1,{phoneNo: that.phoneNo, kaptchaValue: that.kaptchaValue, smsValue: that.smsValue, pwd: that.pwd});
        if(typeof mess != 'undefined') {
          if(mess.trim('').length > 0){
            that.pop(mess);
          }
        }
        else {
          let kaptchaKey = that.$store.state.loginStore.kaptchaKey;
          document.getElementById('yes').style.display = 'block';
          loginService.pwdLogin({platform: that.platform, phone: that.phoneNo, password: that.pwd, kaptchaKey: kaptchaKey, kaptchaValue: that.kaptchaValue, }).then(function (res) {
//            console.log('pwd login', res)
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
              //if(res.data.code >= 513110 && res.data.code <= 513120){
              document.getElementById('yes').style.display = 'none';
                that.pop(res.data.message);
                that.$refs.chaKey.kaptchaValue = '';
                that.$refs.chaKey.getImg();
              //}
              //------------------
            }
          });
        }
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
    }
  }
</script>
<style lang="less">
  @import "../../assets/css/login/login.less";
</style>