<template>

    <div class="indexbox">
      <div class="fix">
         <div class="head clearfix">
         	<div class="logo"><i class="iconfont icon-home"></i></div>
         	<div class="search"><i class="iconfont icon-home"></i>搜索企智内容</div>
         </div>
           <div class="swiper-container" id="navigation">
            <div class="swiper-wrapper">
              <div class="swiper-slide">
                <span class="color">推荐</span></div>
              <div class="swiper-slide">
                <span>智能生活</span></div>
              <div class="swiper-slide">
                <span>新媒体</span></div>
              <div class="swiper-slide">
                <span>新零售</span></div>
              <div class="swiper-slide">
                <span>社群通</span></div>
              <div class="swiper-slide">
                <span>企智</span></div>
              <div class="swiper-slide">
                <span>AI智能</span></div>
              <div class="swiper-slide">
                <span>新模式</span></div>
                <div class="swiper-slide">
                <span>百家讲坛</span></div>
                <div class="swiper-slide">
                <span>生活</span></div>
           
             </div>
            </div>
        </div>
         <div class="banner">
            <z-banner :listImg="2"></z-banner>
         </div>

         <div class="hot">
         	<p class="hot_top clearfix"><b>热门文章</b><a href="javaScript:;">更多</a></p>
             <div class="swiper-container" id="hot">
               <div class="swiper-wrapper">
                    <div class="swiper-slide">
                         <div class="hot_img"><img src="../../assets/image/default.png" /></div>
                         <p class="con">破局年底人才流失困局，薪人薪事携手助力HR排忧解惑</p>
                         <div class="label clearfix">
                            <p>商业</p>
                            <p><i class="iconfont icon-yanjing"></i>3.8K</p>
                            <p><i class="iconfont icon-zan"></i>300</p>
                        </div>
                    </div>
                    <div class="swiper-slide">
                         <div class="hot_img"><img src="../../assets/image/default.png" /></div>
                         <p class="con">破局年底人才流失困局，薪人薪事携手助力HR排忧解惑</p>
                         <div class="label clearfix">
                            <p>共享餐厅</p>
                            <p><i class="iconfont icon-yanjing"></i>3.8K</p>
                            <p><i class="iconfont icon-zan"></i>300</p>
                        </div>
                    </div>
                    <div class="swiper-slide">
                         <div class="hot_img"><img src="../../assets/image/default.png" /></div>
                         <p class="con">破局年底人才流失困局，薪人薪事携手助力HR排忧解惑</p>
                         <div class="label clearfix">
                            <p>金融</p>
                            <p><i class="iconfont icon-yanjing"></i>3.8K</p>
                            <p><i class="iconfont icon-zan"></i>300</p>
                        </div>
                    </div>
                  </div>
               </div>
         </div>
          <div class="line"></div>
         <div class="recomTopics">
            <p class="hot_top clearfix"><b>推荐专题</b><a href="javaScript:;">更多</a></p>
             <div class="swiper-container" id="recomTopics">
               <div class="swiper-wrapper">
                    <div class="swiper-slide">
                         <div class="recomTopics_img"><img src="../../assets/image/default.png" /></div>
                         <p>在垄断下微头条做在垄断下微头条做移动社交的机会在哪里？移动社交的机会在哪里？</p>
                    </div>
                    <div class="swiper-slide">
                         <div class="recomTopics_img"><img src="../../assets/image/default.png" /></div>
                         <p>在垄断下微头条做移动社交的机会在哪里？</p>
                    </div>
                    <div class="swiper-slide">
                         <div class="recomTopics_img"><img src="../../assets/image/default.png" /></div>
                         <p>在垄断下微头条做移动社交的机会在哪里？</p>
                    </div>
                 
                  </div>
               </div>
         </div>
         <div class="list">
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
         <div class="toolbar clearfix">
             <div>
                 <i class="iconfont icon-shouye1"></i>
                 <p>链接</p>
             </div>
             <div>
                 <i class="iconfont icon-yuedu"></i>
                 <p>阅读</p>
             </div>
             <div>
                 <i class="iconfont icon-qizhi"></i>
                 <p>企智</p>
             </div>
             <div>
                 <i class="iconfont icon-wode1"></i>
                 <p>我的</p>
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
                appService.getParam().then(res=>{
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
            this.hot('#hot');
            this.hot('#recomTopics');
            this.hot('#navigation')
        },
        methods: {
            
            hot:function(id){
                  var navSwiper = new Swiper(id, {
                        slidesPerView: 'auto',
                      freeMode: true,
                     });
            }
        }
    }
</script>
 <!--  -->
<style lang="less">
    /*rem等基本设置都放在base中，不写多个*/
    @import url('../../assets/css/base.less');
    .indexbox{
        .fix{
            position: fixed;
            left: 0;
            top:0;
            z-index: 9999;
            background: #fff;
            width: 100%;
        }
         .head{
            width: 100%;
         	.logo{
         		float: left;
         		font-size:@size30;
         		line-height: @size44;
         		margin: 0 @size20;

         	}
         	.search{
         		float: left;
         		width:7.68rem;
         		margin-right: @size20;
         		height: @size28;
         	    margin-top: 0.21333rem; 
         		background: #eee;
         		border-radius: @size14;
         		text-align: center;
         		font-size: 13px;
         		line-height: @size28;
         		color: #999999;
         	}
         } 
         #navigation{
             width:100%;
             height:@size40;
             .swiper-wrapper{
                    height: auto;

                }
                .swiper-slide{
                    height: auto;
                    width: 2rem;
                    // line-height: @size40;
                    text-align: center;
                    span{
                        padding: 0 5px 4px;
                        line-height: @size40;
                        color: #999;
                    }
                    .color{
                        color: #333;
                        border-bottom: 2px solid #FFCC00;
                    }
                }  
         }
         .banner{
            width: 100%;
         	height:5rem;
            margin-top: 84px;
         }
         .hot{
         	width:100%;
         	margin-top:10px;
            overflow: hidden;
         	.hot_top{
         		font-size: 18px;
                color: #333333;
                line-height:30px;
                position: relative;
                margin-left: @size15;
                margin-bottom: @size6;
                a{
                    position: absolute;
                    right: @size15;
                    top: top;
                    line-height: 30px;
                    font-size: 14px;
                    color: #666666;
                }
         	}
            #hot{
                margin-left: @size15;
                .swiper-wrapper{
                    height: auto;
                }
                .swiper-slide{
                    height: auto;
                    padding-right: @size10;
                    width: @size200;
                    .hot_img{
                        width: @size200;
                        height: 2.6666rem;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .con{

                        margin-top: @size6;
                        font-size: 15px;
                        color: #333333;
                        line-height: 22px;
                    }
                    .label{
                            p{
                                float: left;
                                 margin-right: @size15;
                                font-size: 12px;
                                line-height: 18px;
                                color: #999;
                                i{
                                    margin-right: 4px;
                                    font-size: 12px;
                                    line-height: 18px;
                                }
                            }  
                    }
                }
            }
         }
         .line{
            margin: @size15;
            border:1px solid #eee;
         }
        .recomTopics{
            width:100%;
            margin-top:10px;
            overflow: hidden;
            .hot_top{
                font-size: 18px;
                color: #333333;
                line-height:30px;
                position: relative;
                margin-left: @size15;
                margin-bottom: @size6;
                a{
                    position: absolute;
                    right: @size15;
                    top: top;
                    line-height: 30px;
                    font-size: 14px;
                    color: #666666;
                }
              }
              #recomTopics{
                    margin-left: @size15;
                    height: @size200;
                .swiper-wrapper{
                    height: auto;
                }
                  .swiper-slide{
                    height: auto;
                    padding-right: @size10;
                    width: 9.0667rem;
                    
                    .recomTopics_img{
                        width: 9.0667rem;
                        height: 4.5333rem;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                    p{
                        font-size: 16px;
                        color: #333333;
                        line-height: @size22;
                        margin-top: @size4;
                        font-weight: bold;
                    }
                }
              }
         }
         .list{
             margin-bottom:50px;
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
         .toolbar{
             position: fixed;
             left: 0;
             bottom: 0;
             z-index: 9999;
             border-top: 1px solid #999;
             width: 100%;
             background: #fff;
             height: 50px;
             div{
                float: left;
                width: 25%;
                text-align: center;
                i{
                    font-size: 22px;
                    line-height: 32px;
                    
                }
                p{
                    font-size: 12px;
                    color: #333;

                }
             }
         }
    }




</style>

