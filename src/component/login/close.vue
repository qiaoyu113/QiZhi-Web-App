<template>
  <p class="login-close"><i class="iconfont icon-guanbi2" @click="close()"></i></p>
</template>
<script type="text/ecmascript-6">
  export default {
    props: [],
    data () {
      return {}
    },
    components: {},
    mounted () {},
    methods: {
      close () {
        let that = this;
        let i = that.$store.state.fromPath.length
        if(that.$store.state.fromPath[i-1] && that.$store.state.fromPath[i-1] !='home')
        {
           if(that.$route.name=='bind'){
               that.$router.push({name:'login'})
           }else{
               window.location.href = location.origin + that.$store.state.fromPath[i-1]
           }
        }
        else {
            that.$route.params.shopId = localStorage.pathId;
//          that.$router.push({name: 'home'});
            window.location.href = location.origin + '/shops/'+that.$route.params.shopId

        }
//        if(this.$store.state.fromPath.length>1){
//            this.$router.back();
//        }else{
//            this.$router.push({name:"home"})
//        }
      }
    }
  }
</script>
<style></style>