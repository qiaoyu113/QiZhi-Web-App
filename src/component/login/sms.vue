<template>
  <div>
    <div class="item">
      <input type="number" class="form-ipt validatePhone" placeholder="4位短信验证码" v-model="mess" @blur="validateFromPhone">
      <span class="validateFromPhone" v-if="isFlag" @click="getFromPhone"><i class="mid-line"></i>获取验证码</span>
      <span class="validateFromPhone validateWaiting" v-else>(<span id="countDown">60</span>s)重新获取</span>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {commonService} from '../../service/commonService'
  import {loginCommon} from '../../assets/js/login/loginCommon'
  import {common} from '../../assets/js/common/common'
  import {validate} from '../../assets/js/common/validate'

  export default {
    props: [],
    data () {
      return {
        msg: '',
        mess: '',
        phoneNo: '',
        isFlag: 1, // 是否可以点击
        kaptchaValue: '',// 用户端输入验证码
        kaptchaKey: '', // 服务器端验证码
        baseCode: '' //验证码图片
      }
    },
    components: {},
    mounted () {},
    methods: {
      getFromPhone () {
        let that = this;
        that.getFromPhoneReal();
      },
      getFromPhoneReal () {
        // 获取短信验证码效果//需要将手机号和图片验证码框传递过来

        let that = this
        that.phoneNo= that.$store.state.loginStore.phoneNo
        that.kaptchaKey= that.$store.state.loginStore.kaptchaKey // 图片验证码生成
        that.kaptchaValue= that.$store.state.loginStore.kaptchaValue // 图片验证码输入的

        if(that.phoneNo.trim('').length > 0){
          if(!validate.isPhoneNumber(that.phoneNo)){
            that.$emit('listenToSmsCode', '请填写正确的手机号格式');
          }else {
            //that.valImg(event)
            // 发送请求 type: 1.注册；2.手机（动态验证码）登陆并注册；3.手机充值密码
            if(that.kaptchaKey!= '' && that.kaptchaValue != ''){
              commonService.getValidateMess({phone: that.phoneNo, type: that.$store.state.loginStore.smsType, kaptchaKey:that.kaptchaKey,kaptchaValue:that.kaptchaValue}).then(function (res) {
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
            }else {
              that.$emit('listenToSmsCode', '请先填写图片验证码');
            }
          }
        }
        else
        {
          //that.pop('请输入手机号')
          return false;
        }

      },
      validateFromPhone () {
        let that = this
        that.$store.state.loginStore.messValidate = that.mess
      }
    }
  }
</script>
<style></style>