<template>
  <div class="login">
    <login-close></login-close>
    <form class="login-form">
      <p class="login-title">快速注册</p>
      <phone v-on:listenToPhone="showMessFromChild"></phone>
      <kapt-sms v-on:listenToSmsCode="showMessFromChild"></kapt-sms>
      <pwd></pwd>
      <div class="item argument-item">
        <label class="argument" @click="isChecked">
          <i class="iconfont icon-duoxuan_xuanzhong_shixin" id="y"></i>
          <i class="iconfont icon-duoxuan_moren" id="n"></i>
          <input type="checkbox" checked id="agree">我已阅读并同意
        </label>
        <a class="argumentItem font1" @click="isAgree">《用户服务协议》</a>
      </div>
      <div class="item"><p v-if="isCheck" class="form-btn btn3" @click="submit">注册并登录</p><p class="form-btn form-btn-enable" v-else>注册并登录</p></div>
      <p class="btn-under font1" @click="goToTarget('login')">返回登录</p>
    </form>
    <z-modal :msgs="msg"></z-modal>
    <z-agree :agrees="agreeMe"></z-agree>
  </div>
</template>
<script type="text/ecmascript-6">
  import phone from '../../component/login/phoneIpt.vue'
  import pwd from '../../component/login/pwdIpg.vue'
  import loginClose from '../../component/login/close.vue'
//  import kaptSms from '../../component/login/kaptSms.vue'
//  import zagree from '../../component/agreement/agreement.vue'
  import {loginCommon} from '../../assets/js/login/loginCommon'
  import {common} from '../../assets/js/common/common'
  import {loginService} from '../../service/loginService'

  export default {
    components: {'z-agree': zagree,"phone": phone, 'kapt-sms': kaptSms, "pwd": pwd, 'login-close': loginClose  },
    props: [],
    data () {
      common.pageTitle('快速注册')
      this.$store.state.loginStore.smsType = 1;
      return {
        msg: {type: 0 },
        agreeMe: '',
        phoneNo: '', //手机号
        kaptchaValue: '',
        smsValue: '', //短信验证码
        platform: 'WXH5', //平台
        pwd: '', // 密码
        isCheck: true //用户协议是否选中
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
        that.phoneNo =that.$store.state.loginStore.phoneNo; //手机号
        that.kaptchaValue =that.$store.state.loginStore.kaptchaValue; //图片验证码
        that.smsValue =that.$store.state.loginStore.messValidate; // 短信验证码
        that.pwd =that.$store.state.loginStore.password; // 密码
        // 赋值区域 end
        //mess = that.formValidate(1, 1, 1, 1);
        mess = loginCommon.formValidate(1, 1, 1, 1,{phoneNo: that.phoneNo, kaptchaValue: that.kaptchaValue, smsValue: that.smsValue, pwd: that.pwd});
        // console.log('reg mess', mess)
        if(typeof mess != 'undefined') {
          if(mess.trim('').length > 0){
            that.pop(mess);
            return false;
          }
        }
        else{
          loginService.register({phone: that.phoneNo, password: that.pwd, platform: that.platform, smsCode: that.smsValue, type:1}).then(function (res) {
            // console.log('phone reg', res)
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
              if(res.data.code >= 512102 && res.data.code <= 512110) {
                that.pop( res.data.message);
              }
            }
          });
        }
      },
      isAgree () {
        let that = this
        that.agreeMe = {
          text: 'aa',
          type: 1
        };
      },
      isChecked () {
        let that = this;
        let ipt = document.getElementById('agree');
        if(ipt.checked){
          that.isCheck = true;
          document.getElementById('y').style.display = 'block';
          document.getElementById('n').style.display = 'none';
        }else {
          that.isCheck = false;
          document.getElementById('y').style.display = 'none';
          document.getElementById('n').style.display = 'block';
        }
      },
      showMessFromChild (data) {
        let that = this;
        if(data.length > 0){
          that.pop(data); // 弹框
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