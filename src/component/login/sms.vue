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

  export default {
    props: ['myTest'],
    data () {
      return {
        smsCode: '',
        phoneNo: '',
        geetest: '', //极客验证
        gtType: 6,
        isFlag: 1 // 是否可以点击
      }
    },
    components: {},
    mounted () {
    },
    computed: {
      geetest (cur, old){
        console.log('dddd',cur);
      }
    },
    watch: {
      geetest (cur, old){
        console.log('watch dddd',cur);
      }
    },
    methods: {
      getFromPhone () {
        let that = this;
        console.log('aaaaaa')
        if(that.geetest == ''){
          that.$emit('getGeetest', that.gtType);
        }else{
          that.phoneNo= that.$store.state.loginStore.phoneNo;
          console.log('myTest', that.myTest);
        }
        // 极客验证

        //that.geetest = that.$store.state.loginStore.geetest;
        //console.log()
        /*
        * phone:
        * type=2
        * challenge= //0bf697927c06c906ca8729eee432aa4dfs
        * validate= //5dfc80d9a9b7d5fd36e8a751373a7d11
        * seccode= //5dfc80d9a9b7d5fd36e8a751373a7d11|jordan
        *
        * */
        //http://api.qizhi.vjuzhen.com/sms?&&&&
        //that.getFromPhoneReal();
      },
      getFromPhoneReal () {
        // 获取短信验证码效果//需要将手机号和图片验证码框传递过来
        let that = this
        if(that.phoneNo.trim('').length > 0){
          if(!validate.isPhoneNumber(that.phoneNo)){
            that.$emit('listenToSmsCode', '请填写正确的手机号格式');
          }else {
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

      },
      validateFromPhone () {
        let that = this
        that.$store.state.loginStore.messValidate = that.smsCode;
      }
    }
  }
</script>
<style></style>