<template>
  <!-- 新闻资讯 -->
  <div class="hostlist">
    <div class="list">
      <div class="content">
        <div class="content-head">
          <p>{{item.title}}</p>
        </div>
        <div class="content-time">{{item.createdAt}}</div>
        <div class="content-other">
          <span>作者：{{item.author || '佚名'}}</span>
          <span v-if="item.sourceAddress">来源：{{item.sourceAddress}}</span>
          <span v-if="item.classificationId >= 0">分类：{{circlenavList[item.classificationId]}}</span>
        </div>
        <div class="content-labels">
          <span
              class="label"
              v-for="(lab, labIndex) in item.labels"
              :key="labIndex">{{lab.labelName}}</span>
        </div>
        <div class="imgs">
          <div class="imgone" v-lazy:background-image="item.imgPath"></div>
        </div>
        <div class="article">
          <p>{{item.summary}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      item: {},
      circlenavList: ['这些圈子都在看', '行业热点', '培训讲座', '企业招商']
    }
  },
  created () {
    this.item = {
      title: '拉菲传说：拉菲传奇和拉菲珍藏葡萄酒三者之间的区别',
      createdAt: '2018-08-23 14:24:87',
      author: '拉菲尼斯',
      sourceAddress: '百合网',
      classificationId: 1,
      labels: [{ id: '1070594588504231936', labelName: '粤港澳大湾区 广东富闰' }],
      imgPath: 'http://public.kuaihaigou.com/FoAfPKHWicibzZMo-I8R2kbFBYY0',
      summary: '举办葡萄酒品尝会的技巧'
    }
  }
}
</script>
<style lang="less" scoped>
.hostlist {
  .list {
    border-radius: 8px;
    border: 1PX solid #eaeaea;
    margin: 30px 20px;
    box-sizing: border-box;

    .users {
      padding: 0 20px;
      height: 80px;
      display: flex;
      align-items: center;
      border-bottom: 1PX solid @cor_border;

      .avater {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 17px;
        .bg_cover;
      }

      .infos {
        .person {
          display: flex;
          align-items: center;
          height: 30px;

          &>p {
            font-size: 16px;
            font-family: PingFangSC-Semibold;
            font-weight: 600;
            color: rgba(51, 51, 51, 1);
          }
        }

        .time {
          font-size: 12px;
          font-family: PingFang-SC-Regular;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          height: 14px;
          line-height: 14px;
          padding-left: 18px;
          background-image: url('~assets/img/Icons/ic_time_g_14x14@2x.png');
          background-position: left center;
          background-repeat: no-repeat;
          background-size: 14px 14px;
        }
      }
    }

    .content {
      padding: 20px 20px 0;

      &-head {
        display: flex;
        align-items: center;
        height: 44px;

        &>p {
          font-size: 16px;
          font-family: PingFangSC-Semibold;
          font-weight: 600;
          color: rgba(51, 51, 51, 1);
          line-height: 22px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }

      &-time {
        margin-top: 10px;
        line-height: 14px;
        height: 14px;
        font-size: 12px;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        padding-left: 18px;
        background-image: url('~assets/img/Icons/ic_time_g_14x14@2x.png');
        background-position: left center;
        background-repeat: no-repeat;
        background-size: 14px 14px;
      }

      &-other {
        display: flex;
        align-items: center;
        margin-top: 10px;

        &>span {
          font-size: 12px;
          font-family: PingFang-SC-Regular;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);

          &+span {
            margin-left: 20px;
          }
        }
      }

      &-labels {
        display: flex;

        .label {
          font-size: 12px;
          font-family: PingFang-SC-Regular;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          line-height: 12px;
          border-radius: 20px;
          border: 1PX solid rgba(204, 204, 204, 1);
          padding: 5px 10px;
          margin-top: 10px;
        }
      }

      .article {
        margin-top: 15px;
        margin-bottom: 20px;

        &>p {
          font-size: 14px;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          color: rgba(153, 153, 153, 1);
          line-height: 24px;
          overflow: hidden;
          -o-text-overflow: ellipsis;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 5;
          -webkit-box-orient: vertical;
        }
      }

      .imgs {
        margin-top: 10px;
        height: 150px;

        .imgone {
          width: 100%;
          height: 150px;
          border-radius: 5px;
          .bg_cover;
        }
      }

      .video-box {
        position: relative;
        margin-top: 10px;
        margin-bottom: 15px;

        .video-player {
          width: 100%;
          // height: 130px;
          height: auto;
          border-radius: 5px;
        }
      }
    }
  }
}
</style>