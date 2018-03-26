<template>

    <div class="specialList">
        <div class="head">
            <p><i class="iconfont icon-fanhui"></i>专题列表</p>
        </div>
        <div class="box">
            <div class="ros">
                <div class="image"><img src="../../assets/image/default.png"/></div>
                <p class="h2">在垄断下微头条做移动社交的机会在哪里？</p>
                <div class="label clearfix">
                    <div class="label_l"><p>文章20</p></div>
                    <div class="label_r"><p><i class="iconfont icon-yanjing"></i>1.8K</p></div>
                </div>

            </div>
             <div class="ros">
                <div class="image"><img src="../../assets/image/default.png"/></div>
                <p class="h2">在垄断下微头条做移动社交的机会在哪里？</p>
                <div class="label clearfix">
                    <div class="label_l"><p>文章20</p></div>
                    <div class="label_r"><p><i class="iconfont icon-yanjing"></i>1.8K</p></div>
                </div>

            </div>
             <div class="ros">
                <div class="image"><img src="../../assets/image/default.png"/></div>
                <p class="h2">在垄断下微头条做移动社交的机会在哪里？</p>
                <div class="label clearfix">
                    <div class="label_l"><p>文章20</p></div>
                    <div class="label_r"><p><i class="iconfont icon-yanjing"></i>1.8K</p></div>
                </div>

            </div>
             <div class="ros">
                <div class="image"><img src="../../assets/image/default.png"/></div>
                <p class="h2">在垄断下微头条做移动社交的机会在哪里？</p>
                <div class="label clearfix">
                    <div class="label_l"><p>文章20</p></div>
                    <div class="label_r"><p><i class="iconfont icon-yanjing"></i>1.8K</p></div>
                </div>
            </div>
             <div class="ros">
                <div class="image"><img src="../../assets/image/default.png"/></div>
                <p class="h2">在垄断下微头条做移动社交的机会在哪里？</p>
                <div class="label clearfix">
                    <div class="label_l"><p>文章20</p></div>
                    <div class="label_r"><p><i class="iconfont icon-yanjing"></i>1.8K</p></div>
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
                /*appService.getParam().then(res=>{
//                    store.state.homeStore.listImg = res.data;
                }),*/
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

        },
        methods: {

        }
    }
</script>
<style lang="less">
    /*rem等基本设置都放在base中，不写多个*/
    @import url('../../assets/css/base.less');
    .specialList{
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
        margin-top: 46px;
        padding:0 @size15;
        .ros{
            padding:@size15 0;
            border-bottom: 2px solid #eee; 
           .image{
            width: 100%;
            height: 4.6rem;
             img{
                 width: 100%;
                 height: 100%;
              }
            } 
            .h2{
                margin-top: @size10;
                p{
                    font-size: 16px;
                    color: #333333;
                }
            }
            .label{
                width: 100%;
                margin-top: 4px;
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
                            color: #999999;
                            margin-right: 4px;
                        }
                    }
                }
            }
        }
        

      }


    }
</style>

