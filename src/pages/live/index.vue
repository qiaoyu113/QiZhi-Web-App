<template>
  <div class="living">
    <sub-title :curTitle = 'liveTitle'></sub-title>
    <div class="live-list">
        <!--<live-item :collection="liveCollection"></live-item>-->
      <div class="item" v-for="item in liveCollection" @click="goToDetail(item.watchNo)">
        <div class="left">
          <img class="cover" :src="item.cover">
          <span class="mark grey" v-if="item.liveStatus==3 && item.playback==0"><span class="txtScale">已结束</span></span>
          <span class="mark yellow" v-if="item.liveStatus==3 && item.playback==1"><span class="txtScale">回放</span></span>
          <span class="mark yellow" v-if="item.liveStatus==2"><span class="txtScale">直播中</span></span>
          <span class="mark yellow" v-if="item.liveStatus==1"><span class="txtScale">未开始</span></span>
        </div>
        <div class="right">
          <p class="p1">{{ item.title }}</p>
          <p class="p2">{{ item.startTime }}</p>
          <p class="p3" v-if="item.liveStatus==2">{{ item.watchNum }}人在观看</p>
          <p class="p3" v-if="item.liveStatus==1">{{ item.subscribeNum }}人预约</p>
          <p class="p4" v-if="item.watchType==1">免费</p>
          <p class="p4" v-else><span class="small">￥</span>{{ item.fee }}</p>
        </div>
      </div>
    </div>
    <div v-infinite-scroll="upCallback" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
      <div class="inifinte-text clear-fix" v-if="!lastPage">正在加载...</div>
      <div class="inifinte-text clear-fix" v-if="lastPage">--END--</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import subTitle from '../../component/live/subTitle.vue'
  import liveItem from '../../component/live/item.vue'
  import {appService} from '../../service/appService'
  import {liveService} from '../../service/liveService'
  import {common} from '../../assets/js/common/common'

  export default {
    data () {
      return {
        liveTitle: {
           titTxt: '直播'
        },//页面头部分
        liveCollection: [],
        page: {num: 1, size: 10}, // 分页
        busy: false, // 是否正在加载
        lastPage: false // 是否是最后一页
      }
    },
    components: { 'sub-title': subTitle, 'live-item': liveItem},
    computed:{

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
//      return Promise.all([
//        appervice.getParam().then(res=>{
////                    store.state.homeStore.listImg = res.data;
//        }),
//      service.getParam().then(res=>{
////                    store.state.homeStore.noticelist = res.data.datas;
//      }),
//    ])
    },
    computed: {
      //将存在store中的数据取出
    },
    mounted: function() {
      /*
       * 所有需要token的请求都放在这里
       * 可以使用DOM元素
       * 这里的数据可以放在data中
       * */
    },
    methods: {
      getList (pageNum, pageSize, successCallback, errorCallback) {
        let that = this;
        try{
          let newArr = [];
          //直播列表
          liveService.getLiveList({queryType: 1, pageNo: pageNum, pageSize: pageSize}).then(function (res) {
            //console.log('qizhi直播列表数据', res);
            if(res.data.success){
              let data = res.data;
              let totalPage = res.data.datas.totalPage;
              newArr = data.datas.datas;//具体数据
              for(let i=0;i<newArr.length;i++){
                newArr[i].cover = that.$store.state.picHead + newArr[i].cover;
                newArr[i].startTime = common.getFormatOfDate(newArr[i].startTime*1,'yyyy-MM-dd hh:mm');
                newArr[i].fee = common.getFormatOfPrice(newArr[i].fee);
              }
              //联网成功的回调
              successCallback&&successCallback(newArr, totalPage);
            }else{
              if(res.data.code >= 518101 && res.data.code <= 518106){
                that.$router.push({name: 'error'}); //跳转到错误页
              }
            }
          });
        }catch(e){
          //联网失败的回调
          that.$router.push({name: 'error'}); //跳转到错误页
          //errorCallback&&errorCallback();
        }
//          },1000)
      },
      upCallback () {
        let that = this;
        that.busy = true;

        that.getList(that.page.num, that.page.size, function(curPageData, totalPage){
          //如果是第一页需手动制空列表
          if(that.page.num == 1){
            that.liveCollection = [];
          }
          that.liveCollection = that.liveCollection.concat(curPageData)

          // 加载完成后busy为false，如果最后一页则lastpage为true
          if(that.page.num < totalPage){
            that.busy = false
          }else{
            that.lastPage = true
          }
          // 加载完成后给页数+1
          that.page.num = that.page.num+1
        }, function () {});
      },
      goToDetail(watchNo){
        this.$route.params.watchNo = watchNo;
        this.$router.push({name: 'liveDetails'});
      }
    }
  }
</script>
<style lang="less">
  /*rem等基本设置都放在base中，不写多个*/
  @import url('../../assets/css/base.less');
  body{background:#f5f5f5;}
  .live-list{
    padding:0 @size15;background:#fff;
    .item{
      .left{
        .cover{width: @size120;height: @size120;}
      }
    }

    .item{
      padding:@size15 0;border-bottom:@size2 solid #eee;display:flex;justify-content:flex-start;
      .left{
        position:relative;
        .cover{}
        .mark{padding:0 @size2;color: #333;position:absolute;top:0;left:0;
          .txtScale{font-size: @size9; white-space:nowrap;
            -webkit-transform: scale(.8);
            -moz-transform: scale(.8);
            -ms-transform: scale(.8);
            -o-transform: scale(.8);
            transform: scale(.8);}
        }
        .mark.yellow{background:#fc0;}
        .mark.grey{background:#ddd;}
      }
      .right{
        margin-left: @size15; position:relative;
        .p1,.p2,.p3,.p4{width:100%;}
        .p1{font-size: @size16;line-height:@size22;color: #333;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp:2;text-overflow: ellipsis;overflow: hidden;}
        .p2{margin:@size2 0;line-height:@size20;font-size: @size14;color: #666;}
        .p3{line-height:@size20;font-size: @size14;color: #999;}
        .p4{line-height:@size22;font-size: @size16;color: #F4A21B;position:absolute;bottom:0;
          .small{font-size: @size12;}
        }
      }
    }

  }
</style>

