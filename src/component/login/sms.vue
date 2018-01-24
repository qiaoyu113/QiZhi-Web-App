<template>
  <div class="item">
    <input type="number" class="form-ipt validatePhone" placeholder="4位短信验证码" v-model="smsCode">
    <span class="validateFromPhone" v-if="isFlag" @click="getFromPhone">获取验证码</span>
    <span class="validateFromPhone validateWaiting" v-else>(<span id="countDown">60</span>s)重新获取</span>
  </div>
</template>
<script type="text/ecmascript-6">
  import {common} from '../../assets/js/common/common'
  import {validate} from '../../assets/js/common/validate'
  import {loginService} from '../../service/loginService'

  export default {
    props: ['geetest'],
    data () {
      return {
        smsCode: '',
        phoneNo: '',
        isLoginType: 0,
        gtType: 6,
        isFlag: 1 // 是否可以点击
      }
    },
    components: {},
    mounted () {
    },
    watch: {
      geetest (cur, old){
        console.log('watch dddd',cur);
        //return cur;
          this.getFromPhone() ;
      }
    },
    methods: {
      getFromPhone () {
        let that = this;
          that.phoneNo= that.$store.state.loginStore.phoneNo;
          if(that.phoneNo.trim('').length > 0){
              if(!validate.isPhoneNumber(that.phoneNo)){
                  that.$emit('listenToPhone', '请填写正确的手机号格式');
              }else{
                  // console.log('方法中的geetest', that.geetest);
                  if(that.geetest == ''){
                      that.$emit('getGeetest', that.gtType);
                  }else{
                      let data = that.geetest;
                      let type = data.type;
                      let challenge = data.geetest_challenge;
                      let validate = data.geetest_validate;
                      let seccode = data.geetest_seccode;
                      // 极客验证
                      that.getFromPhoneReal(type,challenge,validate,seccode);
                  }
              }
          }else{
              that.$emit('listenToPhone', '请填写手机号');
          }
      },
      getFromPhoneReal (type, challenge, validate, seccode) {
        // 获取短信验证码效果//需要将手机号和图片验证码框传递过来
        let that = this
        loginService.getSmsCode({phone: that.phoneNo, type: type, challenge: challenge, validate: validate, seccode: seccode}).then(function (res) {
              //console.log('mess', res);
              if(res.data.success){  // 返回正确
                  let count = 0;
                  that.isFlag = 0; //显示倒计时
                  if(that.isFlag) {
                      clearInterval(that.$store.state.loginStore.timer);
                  }else {
                      that.$store.state.loginStore.timer = setInterval(function () {
                          count = parseInt(document.getElementById('countDown').innerHTML) - 1;
                          if(count > 0) {
                              document.getElementById('countDown').innerHTML = count;
                          }
                          else{
                              clearInterval(that.$store.state.loginStore.timer);
                              that.isFlag = 1;
                          }
                      },1000);
                  }
              }else { //返回错误
                  let errorMessage = '';
                  if(res.data.code >= 510100 && res.data.code <= 510400){
                      errorMessage = res.data.message;
                      that.$emit('listenToSmsCode', errorMessage);
                  }
              }
          });
      },
      validateFromPhone () {
        let that = this
        that.$store.state.loginStore.messValidate = that.smsCode;
      }
    }
  }
</script>
<style></style>