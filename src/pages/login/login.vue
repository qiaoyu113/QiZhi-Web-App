<template>
  <div class="login">
    <close></close><!--关闭-->
    <form class="login-form">
      <phone-no v-on:listenToPhone="showMessFromChild"></phone-no> <!--手机号-->
      <sms v-on:listenToPhone="showMessFromChild"></sms><!--短信验证码-->
      <div class="item"><p class="form-btn btn3">登录</p></div>
      <p class="btn-under font1" >登录即表示同意<span class="font1">《企智网服务协议》</span>  <span>忘记密码？</span></p>
    </form>
    <div class="loginType">
      <p class="item" @click="goToTarget('password')"><i class="iconfont icon-mima mm"></i><span>密码登录</span></p>
      <p class="item" @click="getThirdUrl('wx')" v-if=" platform === 'WXH5' "><i class="iconfont icon-weixin1 wx"></i><span>微信登录</span></p>
      <p class="item" @click="getThirdUrl('qq')"><i class="iconfont icon-koukouqq"></i><span>QQ登录</span></p>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import loginClose from '../../component/login/close.vue'
  import phoneNo from '../../component/login/phoneIpt.vue'
  import smsCode from '../../component/login/sms.vue'

  export default{
    props: [],
    data () {
      return {
        platform: 'WXH5'
      };
    },
    components: {'close': loginClose, 'phone-no': phoneNo, 'sms': smsCode},
    mounted () {},
    methods: {
      showMessFromChild () {}
    }
  }
</script>
<style lang="less">
  @import "../../assets/css/login/login.less";
</style>