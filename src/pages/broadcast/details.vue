<template>
    <div class="details">
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
               <img :src="https + listse.cover" v-if="listse.cover!=null"/>    
         </div>
         <div class="option clearfix">
         	<div :class="{'selected':indexs==1}" @click="show(1)">详情</div>
         	<div :class="{'selected':indexs==2}" @click="show(2)">目录</div>
            <div :class="{'selected':indexs==3}" @click="show(3)">目录</div>
         </div>
         <div class="box_1" :class="{'display':indexs==1}">
               <p class="h3">{{listse.title}}</p>
               <p class="lable">{{startTime}} 开始 | {{listse.applyNum}}人报名</p>
               <div id="broadcasts">
                   
               </div>
         	
         </div>
         <div class="box_2" :class="{'display':indexs==2}">
         
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
            	indexs:1,
            	listse:'',
            	https:'',
                startTime:'',
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
              // let id = "572635"
              let that=this;
              let id = that.$route.params.id 
              details.getBroadcast(id).then(function(res){              
                that.listse=res.data.datas
                that.https=that.$store.state.picHead
                document.getElementById('broadcasts').innerHTML = that.listse.description
      
                that.startTime = publics.stamp2(Number(that.listse.startTime))
              })
            },

        }
    }
</script>
<style lang="less">
    /*rem等基本设置都放在base中，不写多个*/
    @import url('../../assets/css/base.less');
    .details{
    
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
        		width: 33.3%;
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
            .h3{
                font-weight: 700;
                line-height: 24px;
                font-size: 18px;
                margin-top: @size15;
                color: #333;
            }
            .lable{
                margin:@size10 0;
                color: #999;
                font-size: 14px;
                line-height: 20px;

            }
        	
        }
        .box_2{
              display: none;
        }
        .display{
        	display: block;
        }
   
   
    }

</style>

