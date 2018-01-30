<template>
    <div class="content">
<!--         <div class="head clearfix">
        	<div class="head_l"><i class="iconfont icon-fanhui"></i></div>
        	<div class="head_r"><i class="iconfont icon-fenxiang"></i></div>

        </div> -->
   <!--      <div class="back">
        	<img :src='https + list.poster' v-if="list.poster!=null"/>
        </div> -->
        <div class="con">
        
        	 <div class="h1"><p>{{list.name}}</p></div>
             <div class="author clearfix">
             	<div class="author_l">
             	  <img :src='https + list.authorHead' v-if="list.authorHead!=null"/></div>
             	<div class="author_con">
             		 <p>{{list.authorName}}</p>
             		 <span>{{createTime}}</span>
             	</div>
             </div>
             <div class="box" id="content">
                <!--  <p>12月3日，在国家宪法日即将到来之际，<i>法律互联网服务机构</i>无讼举办了一年一度的“无讼有声”大会。在这场主题为“AI时代的企业法律服务”的大会上，无讼发布了基于人工智能的全新企业法律服务产品“无讼法务”，正式进军企业服务赛道</p>
                 <img src="../../assets/image/default.png" />
                 <p>不同于传统的法律电商逻辑，无讼法务并未从帮助企业对接外部律师切入，而是以云端法务部的模式，用人工智能填补中小企业的法务职能空缺。</p>
                 <h4>99%的空缺</h4>
                 <p>12月3日，在国家宪法日即将到来之际，法律互联网服务机构无讼举办了一年一度的“无讼有声”大会。
                 </p> -->
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
                createTime:'',
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
            listImg() {
                return this.$store.state.homeStore.listImg || []
            },
            noticelist() {
                return this.$store.state.homeStore.noticelist || []
            },
        },
        mounted: function() {
            this.Vscroll();
            this.getContent();
          },
        methods: {
            getContent:function(){
              // let id = "5a1e4dbafde98844bf1ed80a?type=1"
              let that=this;
              let id = that.$route.params.id 
              let type = that.$route.params.type 
              details.getContent(id,{type:type}).then(function(res){
                that.list=res.data.datas.data
                that.https=that.$store.state.picHead
                document.getElementById('content').innerHTML = that.list.content
                that.createTime = publics.stamp(Number(that.list.createTime))
              })
            },
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
<style lang="less" >
    /*rem等基本设置都放在base中，不写多个*/
    @import url('../../assets/css/base.less');
    .content{
    	width: 100%;
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
    	.back{
    		width: 100%;
    		height: 4.48rem;
    		img{
    		    width: 100%;
    		    height: 100%;
    		}
    	}
    	.con{
    		padding:.4rem .4rem 2.6133rem;
    		.h1{
    			width: 100%;
    			p{
    				font-size: 22px;
                    color: #333333;
                    line-height: 30px;
    			}
    		}
    		.author{
    			width: 100%;
    			margin-top: @size15;
    			.author_l{
    				float: left;
    				width: .96rem;
    				height: .96rem;
    				border-radius: .48rem;
    				overflow: hidden;
    				img{
    					width: 100%;
    					height: 100%;
    				}
    			}
    			.author_con{
    				float: left;
    				margin-left: 10px;
    				p{
                       font-size: 13px;
                       color: #333333;
                       line-height: 18px;
    				}
    				span{
    					font-size: 12px;
                        color: #ccc;
                        line-height: 18px;
    				}
    			}
    	
    		}

    		.box{
    			width: 100%;
    			padding-top: .5333rem;
    			img{width: 100%;}
                ul{list-style:disc inside;
                 li{ list-style:disc inside;font-size: 18px;line-height: 32px;}
                }
                ol{list-style:decimal inside; 
                    li{list-style:decimal inside;font-size: 18px;line-height: 32px;}
                }
                em{ font-style: oblique;font-size: 18px;line-height: 32px;}
                u{font-size: 18px;line-height: 32px;}
                strong{font-size: 18px;line-height: 32px;}
                s{font-size: 18px;line-height: 32px;}
                p{font-size: 18px;line-height: 32px;margin-top: 1em;}
                h1{margin-top: 1em;font-size: 24px;}
                h2{margin-top: 1em;font-size: 22px;}
                h3{margin-top: 1em;font-size: 18px;}
                h4{margin-top: 1em;font-size: 16px;}
                h5{margin-top: 1em;font-size: 14px;}
                h6{margin-top: 1em;font-size: 12px;}
                span{font-size: 18px;line-height: 32px;}
                .pindent{text-indent: 2em; }
                blockquote{padding-left: 10px;border-left: 3px solid #dbdbdb;}
    		}
    	}

    }
</style>

