<template>
    <div id="good" >
        <!--底部栏-->
        <div class="good">
            <!--写评论-->
            <div class="text">
                <i class=" iconfont icon-xiepinglun"></i>
                <p class="comment" v-show="loginstutes == 0" @click="writeing()">写评论...</p>
                <router-link :to="{name:'login'}">
                    <p class="comment" v-show="loginstutes == 400">登陆后发表评论...</p>
                </router-link>
            </div>
            <div class="talk-btn" @click="enterTalk()">
                <i class="iconfont icon-pinglun"></i>
                <p class="talknum">123</p>
            </div>
            <!--点赞-->
            <div class="good-btn" @click="goodshow()">
                <i class="iconfont good-btn-i" :class="isgood ? 'icon-zan1 font2' : 'icon-zan1'"></i>
                <!-- <p :class="{'goodbtnmun font1':goodbtnmun}">{{agree}}</p> -->
            </div>
            <!--未登录收藏-->
            <div class="collection" v-show="loginstutes == 400">
                <router-link :to="{name:'login'}">
                    <i class="iconfont icon-shoucang collect-btn-i"></i>
                </router-link>
            </div>

            <!--登录收藏-->
            <div class="collection" @click="collectshow()" v-show="loginstutes == 0">
                <i class="iconfont" :class="iscollect ? 'icon-xing font2' : 'icon-shoucang'"></i>
            </div>
            <!--点赞效果-->
            <div class="good-show" v-if="goodisshow">
                <i class="iconfont icon-dazan font2"></i>
            </div>
            <!--收藏效果-->
            <div class="collect-show" v-if="collectisshow">
                <i class="iconfont icon-shoucang1 font2"></i>
            </div>
        </div>
        <!--评论-->
        <div class="textbox" v-if="commentbox == false">
            <div class="text-top">
                <div class="text-cancel" @click="writeing()">取消</div>
                <div class="text-issue1" v-if="issue">发布</div>
                <div class="text-issue font1" v-if="!issue"  @click="issuefun(id,name)">发布</div>
            </div>
            <div class="text-center">
                <textarea v-model="data" placeholder=""></textarea>
            </div>
        </div>
        <!--遮罩层-->
        <div class="shutter" v-if="commentbox == false" @click="writeing()"></div>
    </div>
</template>

<script>
    import {mjhService} from '../../service/mjhService'
    export default {
        props:['good'],
        data () {
            return {
                goodisshow:false,
                loginStatus: 0,
                collectisshow:false,
                goodbtnmun:false,
                commentbox:true,
                loginstutes:'',
                data:'',
                isgood:false,
                iscollect:false,
                collect:this.$store.state.collect,
                issue:true,
                id:'',
                agree:'',//点赞数
                btnType:1,//1.点赞。2.取消
                btn2Type:1,//1.收藏。2.取消
                shopid:'',
                goodNo:'',
                comment:{}
            }
        },
        mounted: function() {
            let that = this;
            that.id = window.localStorage.getItem('pathId');
//            console.log(that.good,66666);
//            that.$watch('good', function(newVal, oldVal){
//            });
            if(localStorage.token && localStorage.token !="undefined"){
                that.zan(that.good.id);
                that.collects(that.good.id);
                that.loginstutes = 0;
            }else{
                that.loginstutes = 400;
            }

        },
        methods: {
            enterTalk:function(){
                this.$router.push({name:'comment'})
            },
            zan:function(goodNo){
                let that = this;
//                that.goodNo = goodNo;
                mjhService.hasLike({type:0,typeId:that.good.id}).then(function(res){
                    if(res.data.success) {
//                        that.loginstutes = 0;//判断是否登陆
//                        console.log(res.data.datas);
                        that.isgood = res.data.datas;
                        that.goodbtnmun = res.data.datas;
                    }else{
//                        that.loginstutes = 400;
                    }
                });
                mjhService.hasLikeNum(that.good.id).then(function(res){
                    that.agree = res.data.thumbsNum;
                })
            },
            collects:function(goodNo){
                let that = this;
                mjhService.hasLike({type:1,typeId:that.good.id}).then(function(res){
//                    console.log('123123123',res.data.datas);
                    that.iscollect = res.data.datas;
                });
            },
            goodshow:function(){
                let that = this;
//                console.log('zanqian',that.isgood);
                let type = that.isgood ? '0' : '1'
                mjhService.BtnLikeNum(that.good.id,{articleId:that.good.id,type:type}).then(function(res){
                    that.isgood = !that.isgood;
                    that.goodisshow = that.isgood;
                    if(that.isgood){
                        that.agree ++;
                        that.goodbtnmun = true;
                    }else{
                        that.agree --;
                    }
//                    console.log('zanhou',that.isgood);
                })
            },
            collectshow:function(){
                let that = this;
//                console.log('cangqian',that.iscollect);
                let type = that.iscollect ? '0' : '1'
                mjhService.BtnCollectNum(that.good.id,{articleId:that.good.id,type:type}).then(function(res){
                    that.iscollect = !that.iscollect;
                    that.collectisshow = that.iscollect;
//                    console.log('canghou',that.iscollect);
                })
            },
            //激活/关闭编辑区域
            writeing:function(index){
                this.commentbox = !this.commentbox;
                this.goodisshow = null;
                this.collectisshow = null;
                this.data = '';
                this.index = index
            },
            //发送评论
            issuefun:function(id,name){
                let that = this;
                that.commentbox = !that.commentbox;
                that.$store.commit('increment',that.data);
                if(that.$store.state.type === 0){//一级回复
                    that.comment = {
                        parentId:that.$store.state.replyId,
                        type:String(that.good.type),//这里需要上一页传文章类型；
                        typeId:that.$route.params.id,
                        userName:that.$store.state.userInfo.username,
                        userId:that.$store.state.userInfo.userId,
                        originalUserId:that.$store.state.userId,//
                        originalUserName:that.$store.state.replyName,//
                        content:that.data,
                    }
                    mjhService.postComments(that.comment).then(function(res){
                        if(res.datas = 'success'){
                            that.$parent.$parent.upCallback(1)
                        }else{
//                            that.$router.push({name:'login'});
                        }
                    })
                }else if(that.$store.state.type === 1){//二级回复
                    that.comment = {
                        parentId:that.$store.state.replyId,
                        type:String(that.good.type),//这里需要上一页传文章类型；
                        typeId:that.$route.params.id,
                        originalUserId:that.$store.state.userId,//
                        userId:that.$store.state.userInfo.userId,
                        userName:that.$store.state.userInfo.username,
                        originalUserName:that.$store.state.replyName,//
                        content:that.data,
                    }
                    mjhService.postComments(that.comment).then(function(res){
                        if(res.datas = 'success'){
                            that.$parent.$parent.upCallback(1)
                        }else{
//                            that.$router.push({name:'login'});
                        }
                    })
                }else{
                    that.comment = {
                        type:that.good.type,//这里需要上一页传文章类型；
                        typeId:that.$route.params.id,
                        userId:that.$store.state.userInfo.userId,
                        content:that.data,
                        userName:that.$store.state.userInfo.username
                    }
                    mjhService.postComments(that.comment).then(function(res){
                        if(res.datas = 'success'){
                            that.$parent.$parent.upCallback(1)
                        }else{
//                            that.$router.push({name:'login'});
                        }
                    })
                }
                this.data = '';
                this.$store.state.type = '';
                this.$store.state.replyId = '';
                this.$store.state.replyName = '';
            }
        },
        watch:{
            'data':function (val) {
                if(val === ''){
                    this.issue = true
                }else{
                    this.issue = false
                }
            }
        },
    }
</script>

<style lang="less">
.good{
    width:100%;
    height:1.33rem;
    position:fixed;
    bottom:0;
    background: rgba(255,255,255,0.90);
    box-shadow: 0 0 10px 0 #EEEEEE, 0 -1px 0 0 #EEEEEE;
    box-sizing: border-box;
    z-index: 999;
    .font2{
        color:#FFCC00;
    }
    .text{
        width:5rem;
        height:0.4rem;
        position: absolute;
        left:0.8rem;
        top:0;
        bottom:0;
        color:#333;
        margin:auto;
        display: block;
        i{
            font-size:15px;
            float:left;
            color:#333;
        }
    }
}
.comment{
    width:4rem;
    height:0.4rem;
    margin-left:0.24rem;
    line-height:0.4rem;
    float:left;
    font-size: 16px;
    color: #333333;
    letter-spacing: 0;
    text-align: left;
}
.talk-btn{
    display: inline-block;
    width: 30px;
    height: 30px;
    position: absolute;
    top: 10px;
    right: 115px;
    .icon-pinglun{
        font-size: 24px;
        color:#333;
    }
    .talknum{
        text-align: center;
        background: #FF3831;
        border-radius: 25px;
        color: #fff;
        height: 13px;
        line-height: 12px;
        font-size: 8px;
        padding: 0px 2px;
        position: absolute;
        top: 0px;
        left: 57%;
    }
}
.good-btn{
    width:1rem;
    height:0.64rem;
    line-height:0.64rem;
    position:absolute;
    right:1.5rem;
    top:0;
    bottom:0;
    margin:auto;
    i{
        font-size:24px;
        color:#333333;
        float:left;
    }
    .icon-zan{
        color:#6699FF;
    }
    .goodbtnmun{
        color:#6699ff;
    }
    p{
        line-height:0.64rem;
        font-size: 13px;
        color: #999999;
        letter-spacing: 0;
        float:left;
        margin-left:0.1rem;
    }
}
.collection{
    width:0.64rem;
    height:0.64rem;
    line-height:0.64rem;
    position:absolute;
    right:0.53rem;
    top:0;
    bottom:0;
    margin:auto;
    i{
        color:#333;
        font-size:24px;
    }
    .icon-xing{
        color:#6699ff;
    }
}
.good-show{
     width:1.6rem;
     height:1.6rem;
     position:fixed;
     top:0;
     bottom:0;
     left:0;
     right:0;
     margin:auto;
     z-index:1000;
     opacity:0;
     animation: show_state 0.5s ease 0s;
    i{
        font-size:1.6rem;
        color:#6699FF;
    }
 }
.collect-show{
    width:1.6rem;
    height:1.6rem;
    position:fixed;
    top:0;
    bottom:0;
    left:0;
    right:0;
    margin:auto;
    z-index:1000;
    opacity:0;
    animation: show_state 0.5s ease 0s;
    i{
        font-size:1.6rem;
        color:#6699FF;
    }
}
@keyframes show_state{
    0%{
        -webkit-transform: scale(.1);
        -moz-transform: scale(.1);
        -o-transform: scale(.1);
        -ms-transform: scale(.1);
        transform: scale(.1);
        opacity: 0;
    }
    25%{
        -webkit-transform: scale(1);
        -moz-transform: scale(1);
        -o-transform: scale(1);
        -ms-transform: scale(1);
        transform: scale(1);
        opacity: 1;
    }
    100%{
        -webkit-transform: scale(5);
        -moz-transform: scale(5);
        -o-transform: scale(5);
        -ms-transform: scale(5);
        transform: scale(5);
        opacity: 0;
    }
}

.textbox{
    width:100%;
    height:3.86rem;
    position: fixed;
    bottom:0;
    z-index:1110;
    border-top:1px solid #EEEEEE;
    border-top-left-radius:15px;
    border-top-right-radius:15px;
}
.text-top{
    width:100%;
    height:1.22rem;
    background: #FFFFFF;
    box-shadow: inset 0 -1px 0 0 #EEEEEE;
    border-top-left-radius:15px;
    border-top-right-radius:15px;
    padding:0.32rem 0.53rem;
    box-sizing: border-box;
    .text-cancel{
        float:left;
        font-size: 16px;
        color: #999999;
        letter-spacing: 0;
    }
}
.text-top .text-issue{
    float:right;
    font-size: 16px;
    color: #6699FF;
    letter-spacing: 0;
}
.text-top .text-issue1{
    float:right;
    font-size: 16px;
    color: #ddd;
    letter-spacing: 0;
}
.text-center{
    width:100%;
    height:2.64rem;
    background: #fff;
    padding:0.1rem 0.53rem;
    box-sizing: border-box;
    textarea{
        width:100%;
        height:100%;
        outline:none;
        border:none;
        font-size: 16px;
        color: #333333;
        letter-spacing: 0;
    }
}

.shutter{
    width:100%;
    height:100%;
    position:fixed;
    top:0;
    bottom:0;
    left:0;
    right:0;
    background: rgba(0,0,0,0.50);
    opacity: 0.65;
    z-index:1100;
}
</style>