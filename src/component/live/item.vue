<template>
    <div>
        <div class="item" v-for="item in arrays" @click="goToDetail(item.id)">
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
                <p class="p3" v-if="item.liveStatus==2">{{ item.watchNum }}</p><!--观看直播人数-->
                <p class="p3" v-if="item.liveStatus==1">{{ item.subscribeNum }}</p><!--预约人数-->
                <p class="p4">{{ item.fee }}</p>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
  import {common} from '../../assets/js/common/common'
  export default {
    props: ['collection'],
    data () {
      return {
          arrays: []
      }
    },
    components: {},
    mounted () {
        let that = this;
        let temp = that.collection;
        for(let i=0;i<temp.length;i++){
            temp[i].cover = that.$store.state.picHead + temp[i].cover;
            temp[i].startTime = common.getFormatOfDate(temp[i].startTime*1,'yyyy-MM-dd hh:mm');
            temp[i].fee = common.getFormatOfPrice(temp[i].fee);
            that.arrays.push(temp[i]);
        }
        //this.arrays = this.collection;
    },
    methods: {
        goToDetail (no) {
        this.$route.params.watchNo = no;
        this.$router.push({name: 'liveDetails'});
        }
    }
  }
</script>
<style lang="less">
    @size2: .0533rem;
    @size9: .24rem;
    @size14: .3733rem;
    @size15: .4rem;
    @size16: .4rem;
    @size20: .5333rem;
    @size22: .5867rem;
    @size35: .9333rem;

  .item{
    padding:@size15 0;border-bottom:@size2 solid #eee;display:flex;justify-content:flex-start;
    .left{
      position:relative;
      .cover{}
      .mark{padding:0 @size2;color: #333;position:absolute;top:0;left:0;
        .txtScale{font-size: @size9; white-space:nowrap;}
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
      .p4{line-height:@size22;font-size: @size16;color: #F4A21B;position:absolute;bottom:0;}
    }
  }
</style>