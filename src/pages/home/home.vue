<template>
    <!--title为当前页标题
        组件要小，如遇list，只将item做成组件，其他的都写在页面中
    -->
    <div id="home" v-set-title="title">
        企智网
    </div>
</template>

<script>
    import {appService} from '../../service/appService'
    export default {
        data () {
            return {

            }
        },
        computed:{

        },
        created: function() {
            /*基本规则
            * 所有不需要token的请求都放在这里
            * 这里不出现window，document等DOM元素
            * 这里获得的数据都要存储在store中
            * */
        },
        mounted: function() {
            /*
            * 所有需要token的请求都放在这里
            * 可以使用DOM元素
            * 这里的数据可以放在data中
            * */


        },
        methods: {

        }
    }
</script>
<style lang="less">
    /*rem等基本设置都放在base中，不写多个*/
    @import url('../../assets/css/base.less');
</style>

