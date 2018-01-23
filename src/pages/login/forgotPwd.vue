<template>
  <div class="login">
    <login-close></login-close>
    <form class="login-form">
      <p class="login-title">重置密码</p>
      <phone v-on:listenToPhone="showMessFromChild"></phone>
      <!--<kapt-sms v-on:listenToSmsCode="showMessFromChild"></kapt-sms>-->
      <pwd></pwd>
      <div class="item forget-item blank"></div>
      <div class="item"><p class="form-btn btn3" @click="submit">立即重置</p></div>
      <p class="btn-under font1" @click="goToTarget('password')">返回登录</p>
    </form>
    <z-modal :msgs="msg"></z-modal>
  </div>
</template>
<script type="text/ecmascript-6">
  import phone from '../../component/login/phoneIpt.vue'
  import pwd from '../../component/login/pwdIpt.vue'
  import loginClose from '../../component/login/close.vue'
  import {loginService} from '../../service/loginService'
//  import {loginCommon} from '../../assets/js/login/loginCommon'
  import {common} from '../../assets/js/common/common'

  export default {
    props: [],
    components: {"phone": phone,"pwd": pwd, 'login-close': loginClose  },
    data () {
      common.pageTitle('密码重置')
      this.$store.state.loginStore.smsType = 3;
      return {
        msg: {type: 0 },
        phoneNo: '', //手机号
        kaptchaValue: '',
        smsValue: '', //用户输入的短信验证码
        pwd: ''
      }
    },
    mounted: function () {},
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
        mess = loginCommon.formValidate(1, 1, 1, 1,{phoneNo: that.phoneNo, kaptchaValue: that.kaptchaValue, smsValue: that.smsValue, pwd: that.pwd});
        if(typeof mess != 'undefined') {
          if(mess.trim('').length > 0){
            that.pop(mess);
          }
        }
        else{
          loginService.findPwd({phone: that.phoneNo, newPassword: that.pwd, smsCode: that.smsValue, type: 3}).then(function (res) {
            if(res.data.success){
              // 清空倒计时
              if(that.$store.state.loginStore.timer > 0){
                clearInterval(that.$store.state.loginStore.timer)
              }
              that.$router.push({name: 'password'})
            }else{
//              if(res.data.code === 513107) {
//                // 密码格式不正确,请重新输入
//              }
              that.pop(res.data.message);
            }
          });
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
          let name = that.$store.state.toolBox.redirect_uri.name, params = that.$store.state.toolBox.redirect_uri.params;
            that.$router.replace({name: name, params: params})
        }
      }
    }
  }
</script>
<style lang="less">
  @import "../../assets/css/login/login.less";
</style>