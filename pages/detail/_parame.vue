<template>
  <article class="u-goods-parama">
    <div class="parama_base margin-30">
      <h3 class="title">基本信息</h3>
      <div class="wrap">
        <div class="parama_base-item">
          <span>商品编号</span>
          <p>1000001</p>
        </div>
        <div class="parama_base-item">
          <span>国 家</span>
          <p>{{ redAttr.country }}</p>
        </div>
        <div class="parama_base-item">
          <span>酒 庄</span>
          <p>{{ redAttr.winery }}</p>
        </div>
        <div class="parama_base-item">
          <span>品 牌</span>
          <p>{{ viewdata.brandName }}</p>
        </div>
        <div class="parama_base-item">
          <span>进口类型</span>
          <p>{{ redAttr.importType }}</p>
        </div>
        <div class="parama_base-item">
          <span>净 含 量</span>
          <p>{{ redAttr.netVolume }}</p>
        </div>
        <div class="parama_base-item">
          <span>获奖信息</span>
          <p></p>
        </div>
        <div class="parama_base-item">
          <span>保 质 期</span>
          <p>{{ redAttr.shelfLife }}</p>
        </div>
      </div>
    </div>

    <div class="parama_detail margin-30">
      <h3 class="title">详细信息</h3>
      <div class="wrap">
        <a :href="info.link" class="parama_detail-item" v-for="(info, index) in infos" :key="index">
          <div class="pro ib-middle" :style="{background: 'url(' + info.icon + ') no-repeat center/cover'}"></div>
          <div class="pd_type ib-middle">
            <p>
              <span>{{ info.name }}</span>
              <span>（{{ info.mark }}）</span>
            </p>
            <em>{{ info.text }}</em>
          </div>
          <i class="van-icon van-icon-arrow"></i>
        </a>
      </div>
    </div>

    <div class="parama_detail-attr margin-30">
      <h3 class="title">红酒属性</h3>
      <div class="attr-item">
        <span>涩度：</span>
        <div class="bar">
          <i class="bar-long" :style="{width: redAttr.astringency + '%'}"></i>
        </div>
      </div>
      <div class="attr-item">
        <span>苦度：</span>
        <div class="bar">
          <i class="bar-long" :style="{width: redAttr.bitterness + '%'}"></i>
        </div>
      </div>
      <div class="attr-item">
        <span>酸度：</span>
        <div class="bar">
          <i class="bar-long" :style="{width: redAttr.acidity + '%'}"></i>
        </div>
      </div>
      <div class="attr-item">
        <span>果香：</span>
        <div class="bar">
          <i class="bar-long" :style="{width: redAttr.fruity + '%'}"></i>
        </div>
      </div>
      <div class="attr-item">
        <span>复杂度：</span>
        <div class="bar">
          <i class="bar-long" :style="{width: redAttr.complexity + '%'}"></i>
        </div>
      </div>

      <div class="refer">
        <p>参考酒评</p>
        <span> {{goodsWineCommentResp.longComment }}</span>
      </div>

      <div class="tips-item" v-if="goodsWineCommentResp.wineCriticComment">
        <h3 class="title">酒评家评价</h3>
        <p>{{ goodsWineCommentResp.wineCriticComment }}</p>
      </div>
      <div class="tips-item" v-if="goodsWineCommentResp.note">
        <h3 class="title">酿酒师笔记</h3>
        <p>{{ goodsWineCommentResp.note }}</p>
      </div>
      <div class="tips-item" v-if="goodsWineCommentResp.wineFeature">
        <h3 class="title">酒款特点</h3>
        <p>{{ goodsWineCommentResp.wineFeature }}</p>
      </div>
      <div class="tips-item" v-if="goodsWineCommentResp.wineryFeature">
        <h3 class="title">酒庄特点</h3>
        <p>{{ goodsWineCommentResp.wineryFeature }}</p>
      </div>

    </div>
    
    <div class="u-detail_line"></div>

    <!-- 推荐 -->
    <u-evaluation :hostlist="hotList" :data-val="infos" /> 
  </article>
</template>
<script>
import uEvaluation from './_evaluation'
export default {
  name: 'u-parame',

  components: {
    uEvaluation
  },

  props: {
    viewdata: Object,
    hotlist: Array
  },
  data () {
    return {
      hotList: this.hotlist,
      redAttr: this.viewdata.redAttr,
      goodsWineCommentResp: this.viewdata.goodsWineCommentResp
    }
  },
  computed: {
    infos: function () {
      let { typeIcon, typeRemark, typeUrl, type } = this.redAttr
      let typeobj = this.setObj('类型', typeIcon, typeRemark, type, typeUrl)

      let { internationallevelIcon, internationalLevelRemark, internationallevel, instatlevelUrl } = this.redAttr
      let inteobj = this.setObj('国际级别', internationallevelIcon, internationalLevelRemark, internationallevel, instatlevelUrl)

      let { areaIcon, areaRemark, areaList } = this.redAttr
      let areaArray = areaList.map(v => {
        return v.areaName
      })
      let areaStr = areaArray.join(',')
      let areaobj = this.setObj('产区', areaIcon, areaRemark, areaStr)

      let { yearIcon, yearRemark, year } = this.redAttr
      let yearobj = this.setObj('年份', yearIcon, yearRemark, year)

      let { varietyIcon, varietyRemark, varietyUrl, variety } = this.redAttr
      let varietyobj = this.setObj('品种', varietyIcon, varietyRemark, variety, varietyUrl)

      let { alcoholDegreeIcon, alcoholDegreeRemark, alcoholDegree } = this.redAttr
      let alcohobj = this.setObj('酒精度', alcoholDegreeIcon, alcoholDegreeRemark, alcoholDegree)

      let { oakBarrelTimeIcon, oakBarrelTimeRemark, oakBarrelTime } = this.redAttr
      let oakobj = this.setObj('橡木桶时间', oakBarrelTimeIcon, oakBarrelTimeRemark, oakBarrelTime)

      let { serveDegreeIcon, serveDegreeRemark, serveDegree } = this.redAttr
      let degobj = this.setObj('适饮温度', serveDegreeIcon, serveDegreeRemark, serveDegree)

      let { averageVineAgeIcon, averageVineAgeRemark, averageVineAge } = this.redAttr
      let aveobj = this.setObj('平均树龄', averageVineAgeIcon, averageVineAgeRemark, averageVineAge)

      let { annualOutputIcon, annualOutputRemark, annualOutput } = this.redAttr
      let annuobj = this.setObj('年产量', annualOutputIcon, annualOutputRemark, annualOutput)

      let createArray = [typeobj, inteobj, areaobj, yearobj, varietyobj, alcohobj, oakobj, degobj, aveobj, annuobj]
      // console.log('createArray', createArray)
      return createArray
    }
  },
  methods: {
    setObj (name, icon, mark, text, link = 'javascript:;') {
      let obj = {
        name: name,
        icon: icon,
        mark: mark,
        text: text,
        link: link
      }
      return obj
    }
  }
}
</script>
<style lang="less" scoped>
  .u-goods-parama {
    .title {
      margin: 25px 0 15px;
      font-size: 15px;
      color: #333;
      font-family: 'PingFangSC-Semibold';
      font-weight: bold;
    }
  }
  .parama {
    &_intro {
      .title {
        margin-top: 20px;
      }
      p {
        font-size: 13px;
        color: #666;
        line-height: 23px;
      }
    }
    &_base {
      .wrap {
        background: rgba(249,249,249,1);
        border-radius: 6px;
        border: 1PX solid #E4E4E4;
        padding: 20px;
      }
      &-item {
        margin-bottom: 15px;
        color: #666;
        font-size: 13px;
        &:last-child {
          margin-bottom: 0;
        }
        span {
          margin-right: 30px;
          min-width: 52px;
          display: inline-block;
          text-align: justify;
          text-align-last: justify;
          vertical-align: middle;
        }
        p {
          color: #999;
          display: inline-block;
          vertical-align: middle;
        }
      }
    }
    &_detail {
      .wrap {
        padding: 20px 14px 0 20px;
        background: rgba(249,249,249,1);
        border-radius: 6px;
        border: 1PX solid #e4e4e4;
      }
      &-item {
        margin-bottom: 25px;
        position: relative;
        display: block;
        width: 100%;
        .pro {
          width: 35px;
          height: 35px;
          background: #82b5fa;
          border-radius: 50%;
          overflow: hidden;
          margin-right: 15px;
        }
        .pd_type {
          p {
            font-size: 12px;
            span {
              color: #333;
            }
            span:last-child {
              color: #999;
            }
          }
          em {
            font-weight: bold;
            display: block;
            margin-top: 7px;
            font-style: normal;
            font-size: 13px;
            color: #333;
          }
        }
        i {
          position: absolute;
          font-weight: bold;
          font-size: 10px;
          right: 0;
          top: 10px;
        }
      }
      &-attr {
        font-size: 0;
        overflow: hidden;
        .attr-item {
          margin-bottom: 24px;
          &:last-child {
            margin-bottom: 0;
          }
          &:nth-child(2) {
            margin-top: 20px;
          }
          span {
            display: inline-block;
            vertical-align: middle;
            width: 48px;
            height: 12px;
            color: #333;
            font-size: 12px;
            margin-right: 5px;
          }
          .bar {
            display: inline-block;
            vertical-align: middle;
            width: 262px;
            height: 11px;
            border-radius: 11px;
            background: #d9f4fa;
            position: relative;
            i {
              content: '';
              position: absolute;
              left: 0;
              height: 100%;
              top: 0;
              background: #59C3E1;
              border-radius: 11px;
            }
          }
        }
        .refer {
          padding: 10px 15px;
          background: rgba(249,249,249,1);
          border-radius: 6px;
          border: 1PX solid #e4e4e4;
          p {
            font-size: 12px;
            color: #333;
            margin-bottom: 6px;
          }
          span {
            font-size: 12px;
            font-family: 'PingFang-SC';
            line-height: 22px;
            text-align: justify;
          }
        }
        .tips-item {
          &:last-child {
            margin-bottom: 25px;
          }
          .title {
            margin-bottom: 10px;
          }
          p {
            color: #666;
            font-size: 12px;
            line-height: 22px;
          }
        }
      }
    }
  }
</style>
