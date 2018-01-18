<template>
  <div class="living">
    <sub-title :curTitle = 'liveTitle'></sub-title>
    <div class="live-list">
        <live-item :collection="liveCollection"></live-item>
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

  export default {
    data () {
      return {
        liveTitle: {
           titTxt: '直播'
        },//页面头部分
        liveCollection: [
            {
                id: 1,
                cover: 'http://p0.qhimgs4.com/t01ce150b767122f35d.webp',
                state: '直播中',
                title: '呵呵呵呵呃呃呃',
                time: '2017-12-31',
                peoNum: 245,
                price: '123.00'
            },
            {
              id: 2,
              cover: 'http://p2.qhimgs4.com/t017b315ac0a5053f2e.webp',
              state: '未开始',
              title: '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
              time: '2017-12-31',
              peoNum: 234,
              price: '233.00'
            },
            {
                id: 3,
                cover: 'http://p1.qhimgs4.com/t017bc8ed08985d3123.webp',
                state: '已结束',
                title: '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈士大夫士大夫撒的个第三个十多个的束缚圣迭戈闪电收到货闪电发货',
                time: '2017-12-31',
                peoNum: 24534,
                price: '免费'
            }
        ],
        page: {num: 1, size: 2}, // 分页
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
      /*
       * 所有需要token的请求都放在这里
       * 可以使用DOM元素
       * 这里的数据可以放在data中
       * */
      //this.getList();
    },
    methods: {
      getList (pageNum, pageSize) {
        let that = this, shopId = 694275;
        try{
          let newArr = [];
          //直播列表
          liveService.getLiveList(shopId, {queryType: 1, pageNo: pageNum, pageSize: pageSize}).then(function (res) {
            console.log('qizhi直播列表数据', res);
            if(res.data.success){
              let data = res.data;
              let imgBaseUrl = that.$store.state.picHead;
              newArr = data.datas.datas;//具体数据
              for(let i=0;i<newArr.length; i++){
                newArr[i].pubCover = imgBaseUrl + newArr[i].pubCover;
              }
              that.totalSize = data.datas.totalCount;
              //联网成功的回调
              //successCallback&&successCallback(newArr, res.data.datas.totalPage);
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
            that.listGroups = [];
          }
          that.listGroups = that.listGroups.concat(curPageData)

          // 加载完成后busy为false，如果最后一页则lastpage为true
          if(that.page.num < totalPage){
            that.busy = false
          }else{
            that.lastPage = true
          }
          // 加载完成后给页数+1
          that.page.num = that.page.num+1
        }, function () {});
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
  }
</style>

