<template>

    <div class="special">
        <div class="head clearfix">
        	<div class="head_l"><i class="iconfont icon-fanhui"></i></div>
        	<div class="head_r">
        	      <i class="iconfont icon-shoucang"></i>
        	      <i class="iconfont icon-fenxiang"></i>
        	</div>	
        </div>
        <div class="background_img">
        	<img src="../../assets/image/default.png" />
        </div>
        <div class="box">
        	<h2>职场人如何摆脱底薪引力？</h2>
        	<div class="field">
        		<p>12月3日，在国家宪法日即将到来之际</p>
        		<p>在这场主题为“AI时代的企业法律服务”的大会上，正式进军企业服务赛道。</p>
        	</div>
        	<div class="ros clearfix">
        		<div class="ros_l"><img src="../../assets/image/default.png" /></div>
        		<div class="ros_r">
        			<p class="wenzi">两行大概能放多少个字呢来我们数一下苹果六放二十六个字省道撒打算</p>
        			<div class="ros_lable clearfix">
                        <div class="ros_lable_l"><p>汽车·1小时前</p></div>
        				<div class="ros_lable_r"><p><i class="iconfont icon-yanjing"></i>20K</p></div>
        			</div>
        		</div>
        	</div>
        	<div class="ros clearfix">
        		<div class="ros_l"><img src="../../assets/image/default.png" /></div>
        		<div class="ros_r">
        			<p class="wenzi">两行大概能放多少个字呢来我们数一下苹果六放二十六个字省道撒打算</p>
        			<div class="ros_lable clearfix">
                        <div class="ros_lable_l"><p>汽车·1小时前</p></div>
        				<div class="ros_lable_r"><p><i class="iconfont icon-yanjing"></i>20K</p></div>
        			</div>
        		</div>
        	</div>
        	<div class="ros clearfix">
        		<div class="ros_l"><img src="../../assets/image/default.png" /></div>
        		<div class="ros_r">
        			<p class="wenzi">两行大概能放多少个字呢来我们数一下苹果六放二十六个字省道撒打算</p>
        			<div class="ros_lable clearfix">
                        <div class="ros_lable_l"><p>汽车·1小时前</p></div>
        				<div class="ros_lable_r"><p><i class="iconfont icon-yanjing"></i>20K</p></div>
        			</div>
        		</div>
        	</div>
        	<div class="ros clearfix">
        		<div class="ros_l"><img src="../../assets/image/default.png" /></div>
        		<div class="ros_r">
        			<p class="wenzi">两行大概能放多少个字呢来我们数一下苹果六放二十六个字省道撒打算</p>
        			<div class="ros_lable clearfix">
                        <div class="ros_lable_l"><p>汽车·1小时前</p></div>
        				<div class="ros_lable_r"><p><i class="iconfont icon-yanjing"></i>20K</p></div>
        			</div>
        		</div>
        	</div>
          <div class="ros clearfix">
            <div class="ros_l"><img src="../../assets/image/default.png" /></div>
            <div class="ros_r">
              <p class="wenzi">两行大概能放多少个字呢来我们数一下苹果六放二十六个字省道撒打算</p>
              <div class="ros_lable clearfix">
                        <div class="ros_lable_l"><p>汽车·1小时前</p></div>
                <div class="ros_lable_r"><p><i class="iconfont icon-yanjing"></i>20K</p></div>
              </div>
            </div>
          </div>
          <div class="ros clearfix">
            <div class="ros_l"><img src="../../assets/image/default.png" /></div>
            <div class="ros_r">
              <p class="wenzi">两行大概能放多少个字呢来我们数一下苹果六放二十六个字省道撒打算</p>
              <div class="ros_lable clearfix">
                        <div class="ros_lable_l"><p>汽车·1小时前</p></div>
                <div class="ros_lable_r"><p><i class="iconfont icon-yanjing"></i>20K</p></div>
              </div>
            </div>
          </div>
          <div class="ros clearfix">
            <div class="ros_l"><img src="../../assets/image/default.png" /></div>
            <div class="ros_r">
              <p class="wenzi">两行大概能放多少个字呢来我们数一下苹果六放二十六个字省道撒打算</p>
              <div class="ros_lable clearfix">
                        <div class="ros_lable_l"><p>汽车·1小时前</p></div>
                <div class="ros_lable_r"><p><i class="iconfont icon-yanjing"></i>20K</p></div>
              </div>
            </div>
          </div>
          <div class="ros clearfix">
            <div class="ros_l"><img src="../../assets/image/default.png" /></div>
            <div class="ros_r">
              <p class="wenzi">两行大概能放多少个字呢来我们数一下苹果六放二十六个字省道撒打算</p>
              <div class="ros_lable clearfix">
                        <div class="ros_lable_l"><p>汽车·1小时前</p></div>
                <div class="ros_lable_r"><p><i class="iconfont icon-yanjing"></i>20K</p></div>
              </div>
            </div>
          </div>
          <div class="ros clearfix">
            <div class="ros_l"><img src="../../assets/image/default.png" /></div>
            <div class="ros_r">
              <p class="wenzi">两行大概能放多少个字呢来我们数一下苹果六放二十六个字省道撒打算</p>
              <div class="ros_lable clearfix">
                        <div class="ros_lable_l"><p>汽车·1小时前</p></div>
                <div class="ros_lable_r"><p><i class="iconfont icon-yanjing"></i>20K</p></div>
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
            //将存在store中的数据取出
            listImg() {
                return this.$store.state.homeStore.listImg || []
            },
            noticelist() {
                return this.$store.state.homeStore.noticelist || []
            },
        },
        mounted: function() {
           this.Vscroll();
        },
        methods: {
               Vscroll:function(){
                  $(document).scroll(function(){
                var stop = $("body").scrollTop();//滚动条距离顶部的距离
                var stopp=stop / 37.5
                   if(stopp >= 4.48){
                      $('.head').css({'background':'#fff','box-shadow':'inset 0 -1px 0 0 rgba(221,221,221,0.50)'})
                      $('.head i').css('color','#000')
                   }else{
                     $('.head').css({'background':'none','box-shadow':'inset 0 0px 0 0 rgba(221,221,221,0.50)'})
                      $('.head i').css('color','#fff')
                   }
  
                          });
            }
        }
    }
</script>
<style lang="less">
    /*rem等基本设置都放在base中，不写多个*/
    @import url('../../assets/css/base.less');
    .special{
          
          .head{
          	position: fixed;
          	left: 0px;
          	top:0px;
          	z-index: 999;
          	height: 44px;
          	width: 100%;
            box-shadow:inset 0 0px 0 0 rgba(221,221,221,0.50);
            transition:1.4s;
          	.head_l{
          		float: left;
          		margin-left: @size15;
          	}
          	.head_r{
          		float: right;
          		margin-right: @size15;
          		i{
          			margin-left: @size30;
          		}
          	}
          	i{
          		font-size: 24px;
          		line-height: 44px;
          		color: #fff;
          	}
          }   
          .background_img{
          	width: 100%;
          	height: 5rem;
          	img{
          		width: 100%;
          		height: 100%;
          	}
          } 
          .box{
          	padding: 0 @size15;
          	h2{
          		margin: @size20 0;
          		font-size: 22px;
                color: #333333;
                line-height: 30px;
          	}
          	.field{
          		p{
          			font-size: 14px;
          			line-height: 28px;
          			color: #333;
          		}
          	}
          	.ros{
          		padding: @size15 0;
          		border-bottom: 1px solid #EEEEEE;
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
          			width: 5.8666rem;
          			.wenzi{
          				height:@size44;
          				font-size: 16px;
          				line-height: @size22;
          				overflow: hidden;
          				text-overflow:ellipsis;
          				display:-webkit-box; 
                        -webkit-box-orient:vertical;
                        -webkit-line-clamp:2; 
                    }
                        .ros_lable{
                        	margin-top: @size15;
                        	.ros_lable_l{
                        		float: left;
                        		p{
                        			font-size: 12px;
									color: #999999; 
									line-height: @size18;
                        		}
                        	}
                        	.ros_lable_r{
                        		float: right;
                        		p{
                        			font-size: 12px;
									color: #999999; 
									line-height: @size18;
									i{
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

