<template>
    <div class="special">
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
               <img :src="https"/>    
         </div>
         <div class="option clearfix">
         	<div :class="{'selected':indexs==1}" @click="show(1)">详情</div>
         	<div :class="{'selected':indexs==2}" @click="show(2)">目录</div>
         </div>
         <div class="box_1" :class="{'display':indexs==1}">
           <div class="title">
           	  <p class="h1">{{lists.name}} <span v-if="lists.vip!=false">vip</span></p>
           	  <p>{{lists.slogan}}</p>
           	  <div class="btn clearfix">
           	  	<p class="btn_l">已更新{{lists.singleNum}}期</p>
           	  	<p class="btn_r">{{lists.orderNum}}人订阅</p>
           	  </div>
           </div>
           <div class="con">
           <div class="label">
           	   专栏介绍
           </div>
           <div class="conter" id="special">
       <!--     	12月3日，在国家宪法日即将到来之际，法律互联网服务机构无讼举办了一年一度的“无讼有声”大会。在这场主题为“AI时代的企业法律服务”的大会上，无讼发布了基于人工智能的全新企业法律服务产品“无讼法务”，正式进军企业服务赛道 -->
           </div>
           	
           </div>
         	
         </div>
         <div class="box_2" :class="{'display':indexs==2}">
         	<div class="ros clearfix">
         		<div class="ros_l">12</div>
         		<div class="ros_r">
         			<p class="h3">【试看】中国近代政治家战略家、理学家</p>
         			<p class="lable"><i class="iconfont icon-yinpinx"></i><span>04:23</span><span>1234次收听</span></p>
         		</div>
         	</div>
         	<div class="ros clearfix">
         		<div class="ros_l clearfix">12</div>
         		<div class="ros_r">
         			<p class="h3">【试看】中国近代政治家战略家、理学家</p>
         			<p class="lable"><i class="iconfont icon-yinpinx"></i><span>04:23</span><span>1234次收听</span></p>
         		</div>
         	</div>
         	<div class="ros clearfix">
         		<div class="ros_l clearfix">12</div>
         		<div class="ros_r">
         			<p class="h3">北大教授陈玉宇：如今的高房价是危险的，但泡沫不会迅速破裂</p>
         			<p class="lable"><i class="iconfont icon-yinpinx"></i><span>04:23</span><span>1234次收听</span></p>
         		</div>
         	</div>
         	<div class="ros clearfix">
         		<div class="ros_l">12</div>
         		<div class="ros_r">
         			<p class="h3">北大教授陈玉宇：如今的高房价是危险的，但泡沫不会迅速破裂</p>
         			<p class="lable"><i class="iconfont icon-yinpinx"></i><span>04:23</span><span>1234次收听</span></p>
         		</div>
         	</div>
         	<div class="ros clearfix">
         		<div class="ros_l">12</div>
         		<div class="ros_r">
         			<p class="h3">【试看】中国近代政治家战略家、理学家</p>
         			<p class="lable"><i class="iconfont icon-yinpinx"></i><span>04:23</span><span>1234次收听</span></p>
         		</div>
         	</div>
         	<div class="ros clearfix">
         		<div class="ros_l">12</div>
         		<div class="ros_r">
         			<p class="h3">【试看】中国近代政治家战略家、理学家</p>
         			<p class="lable"><i class="iconfont icon-yinpinx"></i><span>04:23</span><span>1234次收听</span></p>
         		</div>
         	</div>
         </div>
     
      


    </div>
</template>

<script>
    import {appService} from '../../service/appService'
    import {details} from '../../service/details.js'
    export default {
        data () {
            return {
            	indexs:1,
            	lists:'',
            	https:'',
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
                this.getColumn()
        },
        methods: {
        	show:function(index){
                 this.indexs=index
        	},
            getColumn:function(){
              let id = "5a0021b8ebc3c55fccae786e"
              let that=this;
              details.getColumn("5a0021b8ebc3c55fccae786e").then(function(res){
                    // that.content=res.data.datas.datas                 
                that.lists=res.data.datas 
                 console.log(that.lists)
                that.https=that.$store.state.picHead+that.lists.poster
                document.getElementById('special').innerHTML = that.lists.desc
                // console.log(that.list)
              })
            },

        }
    }
</script>
<style lang="less">
    /*rem等基本设置都放在base中，不写多个*/
    @import url('../../assets/css/base.less');
    .special{
    
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
        }
        .option{
        	width: 100%;
        	height: @size50;
        	border-bottom: 1px solid #999999;
        	div{
        		float: left;
        		width: 50%;
        		font-size: 16px;
        		text-align: center;
        		line-height: @size50;
        		color: #333;
        	}
        	.selected{
        		border-bottom: 2px solid #FFCC00;
        		color: #FFCC00;
        		line-height: 1.28rem;
        	}

        }
        .box_1{
        	display: none;
        	padding: 0 @size15;
        	.title{
        		border-bottom: 1px solid #999;
        		.h1{
        		font-weight: 700;
        		font-size: 18px;
        		color: #333;
        		margin: @size15 0 @size10 0;
        		span{
        			color: #F8E0A2;
        			background: #333333;
        			padding: 0 4px;
        			margin-left: 4px;
        		}
        	}
        	p{
        		font-size: 14px;
        		color: #999999;
        		line-height: 26px;
        	}
        	.btn{
        		margin: @size10 0 @size10 0;
        		p{
        			float: left;
        			margin-right: @size14;
        		}
        	}
        	}
        	.con{

        		.label{
        			margin: @size15 0 @size12 0;
        			color: #333333;
        			font-size: 16px;
        			background: url("../../assets/image/copy2.png") no-repeat;
        		}
        		.conter{
        			p{
        			font-size: 14px;
        			color: #333;
        			line-height: 26px;
        		}
        		}
        	}
        }
        .box_2{
        	display: none;
        	padding: 0 @size15;
        	margin-top: @size15;
        	.ros{
                margin-bottom: @size10;
                .ros_l{
                	width: 8%;
                	float: left;
                	font-size: 16px;
                	margin-top: 4px;
                	color: #999;
                }
                .ros_r{
                	width: 92%;
                	float: left;
                	border-bottom: 1px solid #EEEEEE;
                	.h3{
                		font-size: 16px;
                		line-height: 26px;
                		color: #333333;
                	}
                	.lable{
                		font-size: 12px;
                		line-height: @size28;
                		color: #999;
                		margin-bottom: @size4;
                		span{

                			margin-left: 8px;
                		}
                	}
                }
        	}

        }
        .display{
        	display: block;
        }
   
   
    }

</style>

