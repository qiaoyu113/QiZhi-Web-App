<template>
    <!--title为当前页标题
        组件要小，如遇list，只将item做成组件，其他的都写在页面中
    -->
    <div id="article_detail" v-set-title="title">
       
        <z-good ref="selectfood" :good="good" v-if="good"></z-good>
    </div>
</template>

<script>
    import {mjhService} from '../../service/mjhService'
    import zgood from '../../component/common/good.vue'
    export default {
        components:{'z-good':zgood},
        data () {
            return {
                title:"文章详情页",
                good:null
            }
        },
        syncData({store}) {
            /*基本规则
            * 所有不需要token的请求都放在这里
            * 这里不出现window，document等DOM元素
            * 这里获得的数据都要存储在store中
            * 写法如下
            * */
            const that = this;
            /*
            * 将所有的请求处理以数组放在promise中
            * that.data().data调用数据
            * */
            return Promise.all([
                appervice.getParam().then(res=>{
//                    store.state.homeStore.listImg = res.data;
                }),
                service.getParam().then(res=>{
//                    store.state.homeStore.noticelist = res.data.datas;
                }),
            ])
        },
        computed: {
            //将存在store中的数据取出
            listImg() {
                return this.$store.state.homeStore.listImg || []
            },
            noticelist() {
                return this.$store.state.homeStore.noticelist || []
            },
        },
        mounted: function() {
            /*
            * 所有需要token的请求都放在这里
            * 可以使用DOM元素
            * 这里的数据可以放在data中
            * */
            this.good ={
                id : '5a40a2ecfde98828ea931d8f',
                type : '1'
            }


        },
        methods: {

        }
    }
</script>
<style lang="less">
    
</style>

