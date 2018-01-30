<template>
    <div class="list">
        <div class="head">
            <p><i class="iconfont icon-fanhui"></i>热门文章</p>
        </div>
        <div class="box">
            <div class="ros clearfix">
                 <div class="ros_l"><img src="../../assets/image/default.png" /></div>
                 <div class="ros_r">
                     <p class="con">京东副总裁唐伟：无人仓智能设备开启智慧物流</p>
                     <div class="label clearfix">
                       <div class="label_l"><p>汽车•1小时</p></div>
                       <div class="label_r"><p><i class="iconfont icon-yanjing"></i>29k</p></div>
                     </div>
                 </div>
            </div>
            <div class="ros clearfix">
                 <div class="ros_l"><img src="../../assets/image/default.png" /></div>
                 <div class="ros_r">
                     <p class="con">京东副总裁唐伟：无人仓智能设备开启智慧物流</p>
                     <div class="label clearfix">
                       <div class="label_l"><p>汽车•1小时</p></div>
                       <div class="label_r"><p><i class="iconfont icon-yanjing"></i>29k</p></div>
                     </div>
                 </div>
            </div>
            <div class="ros clearfix">
                 <div class="ros_l"><img src="../../assets/image/default.png" /></div>
                 <div class="ros_r">
                     <p class="con">京东副总裁唐伟：无人仓智能设备开启智慧物流</p>
                     <div class="label clearfix">
                       <div class="label_l"><p>汽车•1小时</p></div>
                       <div class="label_r"><p><i class="iconfont icon-yanjing"></i>29k</p></div>
                     </div>
                 </div>
            </div>
            <div class="ros clearfix">
                 <div class="ros_l"><img src="../../assets/image/default.png" /></div>
                 <div class="ros_r">
                     <p class="con">京东副总裁唐伟：无人仓智能设备开启智慧物流</p>
                     <div class="label clearfix">
                       <div class="label_l"><p>汽车•1小时</p></div>
                       <div class="label_r"><p><i class="iconfont icon-yanjing"></i>29k</p></div>
                     </div>
                 </div>
            </div>
            <div class="ros clearfix">
                 <div class="ros_l"><img src="../../assets/image/default.png" /></div>
                 <div class="ros_r">
                     <p class="con">京东副总裁唐伟：无人仓智能设备开启智慧物流</p>
                     <div class="label clearfix">
                       <div class="label_l"><p>汽车•1小时</p></div>
                       <div class="label_r"><p><i class="iconfont icon-yanjing"></i>29k</p></div>
                     </div>
                 </div>
            </div>
            <div class="ros clearfix">
                 <div class="ros_l"><img src="../../assets/image/default.png" /></div>
                 <div class="ros_r">
                     <p class="con">京东副总裁唐伟：无人仓智能设备开启智慧物流</p>
                     <div class="label clearfix">
                       <div class="label_l"><p>汽车•1小时</p></div>
                       <div class="label_r"><p><i class="iconfont icon-yanjing"></i>29k</p></div>
                     </div>
                 </div>
            </div>
            <div class="ros clearfix">
                 <div class="ros_l"><img src="../../assets/image/default.png" /></div>
                 <div class="ros_r">
                     <p class="con">京东副总裁唐伟：无人仓智能设备开启智慧物流</p>
                     <div class="label clearfix">
                       <div class="label_l"><p>汽车•1小时</p></div>
                       <div class="label_r"><p><i class="iconfont icon-yanjing"></i>29k</p></div>
                     </div>
                 </div>
            </div>

        </div>
    </div>
</template>

<script>
    import {appService} from '../../service/appService'
    export default {
        data () {
            return {
            }
        },
        asyncData({store,route}) {
            const that = this;
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
        },
        methods: {
        }
    }
</script>
<style lang="less">
    /*rem等基本设置都放在base中，不写多个*/
    @import url('../../assets/css/base.less');
   .list{
    .head{
        position: fixed;
        left: 0;
        top: 0;
        z-index: 999;
        height: 44px;
        width: 100%;
        background: #fff;
        box-shadow: inset 0 -1px 0 0 rgba(221,221,221,0.50);
        p{
            text-align: center;
            font-size: 18px;
            color: #333333;
            line-height: 44px;
            position: relative;
            i{
                font-size: 22px;
                color: #333;
                position: absolute;
                left: @size15;
                top: 0px;
                line-height: 44px;
            }
        } 
    }
    .box{
        margin-top:46px;
        padding:0 @size15;
        .ros{
            padding: @size15 0;
            border-bottom: 2px solid #eee;
            .ros_l{
                float: left;
                width: 3.04rem;
                height: 2.1333rem;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .ros_r{
                float: left;
                margin-left: @size10;
                .con{
                    width: 5.8666rem;
                    height: @size44;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    display:-webkit-box; 
                    -webkit-box-orient:vertical;
                    -webkit-line-clamp:2; 
                    font-size: 16px;
                    color: #333333;
                }
                .label{
                    margin-top: @size16;
                    .label_l{
                        float: left;
                        p{
                          font-size: 12px;
                        color: #999999;  
                        }
                        
                    }
                    .label_r{
                        float: right;
                        p{
                          font-size: 12px;
                          color: #999999; 
                          i{
                            font-size: 12px;
                            margin-right: 4px;
                          } 
                        }
                        

                    }
                }
            }

        }  

    }
  }
</style>

