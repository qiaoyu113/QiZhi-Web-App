<template>
  <div class="item">
    <input type="number" class="form-ipt namePwd" placeholder="手机号" v-model="phoneNo" @keyup="iptLength"  @input="iptLength">
    <i class="iconfont icon-Shape hide" @click="reset"></i>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: [],
    data () {
      return {
        phoneNo: ''
      }
    },
    components: {},
    mounted () {},
    methods: {
      iptLength (event) { // 动态监测帐号文本框字符长度
        let that = this,obj = event.currentTarget;
        that.iptLen(obj);
        that.$store.state.loginStore.phoneNo = that.phoneNo
      },
      reset (event) { // 清空帐号文本框
        let that = this;
        let obj = event.currentTarget;
        let parent = obj.parentNode;
        let lastChild = parent.lastChild;
        lastChild.className = 'iconfont icon-Shape hide';
        that.phoneNo = '';
      },
      iptLen (obj) {//显示清除图标
        let pant = obj.parentNode;
        let lastChild = pant.lastChild;
        if(obj.value.trim().length > 0 ){
          lastChild.className = 'iconfont icon-Shape';
        }else{
          lastChild.className = 'iconfont icon-Shape hide';
        }
      },
    }
  }
</script>
<style></style>