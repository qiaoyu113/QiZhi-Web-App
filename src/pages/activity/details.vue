<template>
    <div class="activity">
         <div class="head clearfix">
             <div class="head_l">
             	<div><i class="iconfont icon-fanhui"></i></div>
             </div>
             <div class="head_r">
                <div><i class="iconfont icon-ganxingqu"></i></div>
             	<div><i class="iconfont icon-fenxiang"></i></div>
             </div>
         </div>
         <div class="backimg">
               <img src="../../assets/image/default.png" />     
               <div class="biaoqian" v-if="list.activityStatus==0">未开始</div>  
               <div class="biaoqian" v-if="list.activityStatus==1">进行中</div>  
               <div class="biaoqian" v-if="list.activityStatus==2">已结束</div>  
         </div>
         <div class="details">
           <p class="h2">{{list.activityTitle}}</p>
           <p class="browse"><span>{{list.actReadNum}}次浏览</span><span>{{list.actApplyNum}}人报名</span></p>
            <div class="ros">
                <p><i class="iconfont icon-wait"></i>{{actStartTime}} 至 {{actEndTime}}</p>
            </div>
            <div class="ros">
                <p><i class="iconfont icon-chanpin-didian"></i>
                  <i>{{list.prov}}{{list.city}}{{list.dist}}{{list.activityAddress}}</i>
                  <i class="iconfont icon-fanhui right"></i></p>
            </div>
             <div class="ros">
                <p><i class="iconfont icon-piaojia"></i>
                   <span v-if="list.actCostType== 1&&list.tickets.length != 1">
                   ¥{{list.minTicketPrice / 100}} - {{list.maxTicketPrice / 100}}</span>
                   <span v-if="list.tickets.length == 1&&list.actCostType==1" v-for="(lists,index) in list.tickets">¥{{lists.price / 100}}</span>
                   <span v-if="list.actCostType==0">免费</span></p>
            </div>
             <div v-if="list.actApplyStauts == 1" class="ros clearfix">
                <div class="ros_l"><i class="iconfont icon-wode"></i>{{list.actApplyNum}}人已报名 限{{list.peoUpperLimit}}人</div>
                <div class="ros_r cleafix">
                                    <i class="iconfont icon-fanhui"></i>
                                    <div><img src="../../assets/image/default.png" /></div>
                                    <div><img src="../../assets/image/default.png" /></div>
                                    <div><img src="../../assets/image/default.png" /></div>
                                    <div><img src="../../assets/image/default.png" /></div>
                                    </div>
            </div>
            <div class="publisher clearfix">
                 <div class="publisher_l"><img :src="https + list.pubUserHeadimg" v-if="list.pubUserHeadimg!=null"/></div>
                 <div class="publisher_con">
                     <p class="h3">{{list.publishUser}}</p>
                     <p class="p">北京大学工学院工程技术研究院成立于2011年,是工学院的重要机北京大学工学院工程技术研究院成立于2011年</p>
                 </div>
                 <div class="publisher_r">
                     <i class="iconfont icon-jiahao"></i>
                     关注
                 </div>
            </div>
         </div>
         <div class="lecturer">
             <div class="lecturer_top" ><p>活动详情</p></div>
             <div id="text">
            <!--  12月3日，在国家宪法日即将到来之际，法律互联网服务机构无讼举办了一年一度的“无讼有声”大会。在这场主题为“AI时代的企业法律服务”的大会上，无讼发布了基于人工智能的全新企业法律服务产品“无讼法务”，正式进军企业服务赛道。 -->
             </div>

         </div>
      


    </div>
</template>

<script>
    import {appService} from '../../service/appService'
    import {details} from '../../service/details.js'
    import publics from '../../mixin/publics.js'

    export default {
        data () {
            return {
                list:'',
                https:'',
                actStartTime:'',
                actEndTime:'',
            }
        },
        computed:{
        },
        syncData({store}) {
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
            listImg() {
                return this.$store.state.homeStore.listImg || []
            },
            noticelist() {
                return this.$store.state.homeStore.noticelist || []
            },
        },
        mounted: function() {
                this.getActivity()
        },
        methods: {
            getActivity:function(){
              let that=this;
              details.getActivity("59116a036f7d13437d476100").then(function(res){
                    // that.content=res.data.datas.datas
                    that.https=that.$store.state.picHead
                    console.log(res.data)
                that.list=res.data.datas
                document.getElementById('text').innerHTML = that.list.activityDetails
                // console.log(that.list)
                that.actStartTime = publics.stamp2(Number(that.list.actStartTime))
                that.actEndTime = publics.stamp2(Number(that.list.actEndTime))
              })
            },

        }
    }
</script>
<style lang="less">
    /*rem等基本设置都放在base中，不写多个*/
    @import url('../../assets/css/base.less');
    .activity{
    
          .head{
            position: fixed;
            left: 0;
            top: 0;
            z-index: 999;
            height: 44px;
            width: 100%;
            box-shadow:inset 0 0px 0 0 rgba(221,221,221,0.50);
            transition:1.4s;
            .head_l{
                float: left;
                margin-left: .4rem;
              i{
                color: #fff;
                font-size: 22px;
                line-height: 44px;
                }
            }
            .head_r{
                float: right;
                margin-right: .4rem;
              i{
                color: #fff;
                font-size: 22px;
                line-height: 44px;
                 }
             }
        }
        .backimg{
            width: 100%;
            height: 5rem;
            position: relative;
            img{
                width: 100%;
                height: 100%;
            }
            .biaoqian{
                position: absolute;
                left: 0;
                bottom: 0;
                width: 42px;
                height: 14px;
                text-align: center;
                font-size: 10px;
                line-height: 14px;
                color: #333;
                background: #FFCC00;


            }
        }
        .details{
            padding: 0 @size15;
            .h2{
                font-weight: 700;
                margin-top: @size15;
                font-size: 22px;
                color: #333;
                line-height: 30px;
            }
            .browse{
                margin-top: 5px;
                span{
                    color: #999;
                    margin-right: @size20;
                    line-height: 18px;
                }
            }
             .ros{
                    height: @size50;
                    border-bottom: 1px solid #EEEEEE;
                    line-height: @size50;
                    color: #666;
                    font-size: 15px;
                    i{
                        margin-right: 8px;
                    }
                    .right{
                        float: right;
                         transform:rotate(180deg);
                    }
                    span{
                        color: #F4A21B;
                        margin-right: @size30;
                    }
                    .ros_l{
                        float: left;
                    }
                    .ros_r{
                        float: right;
                        position: relative;
                        div{
                            float: right;
                            width: @size24;
                            height: @size24;
                            border-radius: 50%;
                            overflow: hidden;
                            border:1px solid #fff;
                            margin-left: -@size10;
                            margin-top: @size13;
                            img{
                                width: 100%;
                                height: 100%;
                            }
                        }
                        i{
                            float: right;
                            transform:rotate(180deg);

                        }
                    }
                }
                .publisher{
                    padding: 15px 0;
                    .publisher_l{
                        float: left;
                        width: 1.76rem;
                        height: 1.76rem;
                        border-radius: 50%;
                        overflow: hidden;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .publisher_con{
                        float: left;
                        margin-left: @size10;
                        .h3{
                            font-weight: 700;
                            line-height: @size22;
                            font-size: 16px;
                            color: #333;
                        }
                        .p{
                            font-size: 12px;
                            line-height: @size18;
                            margin-top: @size4;
                            width: 4.98rem;
                            height: @size36;
                            overflow : hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-line-clamp: 2;
                            -webkit-box-orient: vertical;
                            
                        }
                    }
                    .publisher_r{
                        margin-top: @size20;
                        margin-left: @size16;
                        float: left;
                        width: 1.6rem;
                        height: @size26;
                        border: 1px solid #333333;
                        border-radius: @size13;
                        line-height: @size26;
                        text-align: center;
                        font-size: 12px;
                    }
                }
        }
        .lecturer{
            border-top:10px solid #f9f9f9;
            .lecturer_top{
                margin: @size12;
                background: url("../../assets/image/copy2.png") no-repeat;
                p{
                  font-size: 16px;
                  line-height: 22px;  
                  margin-left: 4px;
                }
            }
            #text{
                padding: 0 @size15;
              
            }
        }
    }

</style>

