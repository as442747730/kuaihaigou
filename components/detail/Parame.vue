<template>
  <article class="u-goods-parama">
    <div class="parama_base margin-30">
      <h3 class="title">基本信息</h3>
      <div class="wrap">
        <div class="parama_base-item">
          <span>商品编号</span>
          <p>{{ goodsIndentify }}</p>
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
          <span>保 质 期</span>
          <p>{{ redAttr.shelfLife }}</p>
        </div>
      </div>
    </div>

    <div class="parama_detail margin-30">
      <h3 class="title">详细信息</h3>
      <div class="wrap">
        <div class="parama_detail-item" v-for="(info, index) in infos" :key="index">
          <!-- 产区 -->
          <template v-if="info.name === '产区'">
            <div class="pro ib-middle" :style="{background: 'url(' + info.icon + ') no-repeat center/cover'}"></div>
            <div class="pd_type ib-middle">
              <p>
                <span>{{ info.name }}</span>
                <span>（{{ info.mark }}）</span>
              </p>
              <a :href="'/noun/detail/' + $v.areaid + '?num=1'" v-for='($v, $k) in info.text'>
                {{ $k === info.text.length - 1 ? $v.areaName : $v.areaName + '>' }}
              </a>
            </div>
            <!-- <i class="van-icon van-icon-arrow"></i> -->
          </template>
          <!-- 品种 -->
          <template v-else-if="info.name === '品种'">
            <a :href="info.link">
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
          </template>
          <!-- 常规 -->
          <template v-else>
            <a :href="info.link">
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
          </template>
        </div>
      </div>
    </div>

    <div class="parama_detail-attr margin-30">
      <h3 class="title">红酒属性</h3>
      <van-collapse class='attr-item-wrap' v-model="activeName" accordion @change='collaChange'>
        <van-collapse-item name="1" v-if='redAttr.astringency'>
          <div class="attr-item" slot='title'>
            <span>涩度：{{ redAttr.astringency }}%</span>
            <div class="bar">
              <i class="bar-long" :style="{width: redAttr.astringency + '%'}"></i>
            </div>
          </div>
          <span class='right-txt' slot='right-icon'>{{ rightTxt[1] }}</span>
          {{ redAttr.astringencyRemark }}
        </van-collapse-item>
        <van-collapse-item name="2" v-if='redAttr.bitterness'>
          <div class="attr-item" slot='title'>
            <span>苦度：{{ redAttr.bitterness }}%</span>
            <div class="bar">
              <i class="bar-long" :style="{width: redAttr.bitterness + '%'}"></i>
            </div>
          </div>
          <span class='right-txt' slot='right-icon'>{{ rightTxt[2] }}</span>
          {{ redAttr.bitternessRemark }}
        </van-collapse-item>
        <van-collapse-item name="3" v-if='redAttr.acidity'>
          <div class="attr-item" slot='title'>
            <span>酸度：{{ redAttr.acidity }}%</span>
            <div class="bar">
              <i class="bar-long" :style="{width: redAttr.acidity + '%'}"></i>
            </div>
          </div>
          <span class='right-txt' slot='right-icon'>{{ rightTxt[3] }}</span>
          {{ redAttr.acidityRemark }}
        </van-collapse-item>
        <van-collapse-item name="4" v-if='redAttr.fruity'>
          <div class="attr-item" slot='title'>
            <span>果香：{{ redAttr.fruity }}%</span>
            <div class="bar">
              <i class="bar-long" :style="{width: redAttr.fruity + '%'}"></i>
            </div>
          </div>
          <span class='right-txt' slot='right-icon'>{{ rightTxt[4] }}</span>
          {{ redAttr.fruityRemark }}
        </van-collapse-item>
        <van-collapse-item name="5" v-if='redAttr.tannin'>
          <div class="attr-item" slot='title'>
            <span>单宁：{{ redAttr.tannin }}%</span>
            <div class="bar">
              <i class="bar-long" :style="{width: redAttr.tannin + '%'}"></i>
            </div>
          </div>
          <span class='right-txt' slot='right-icon'>{{ rightTxt[5] }}</span>
          {{ redAttr.tanninRemark }}
        </van-collapse-item>
        <van-collapse-item name="6" v-if='redAttr.complexity'>
          <div class="attr-item" slot='title'>
            <span>复杂度：{{ redAttr.complexity }}%</span>
            <div class="bar">
              <i class="bar-long" :style="{width: redAttr.complexity + '%'}"></i>
            </div>
          </div>
          <span class='right-txt' slot='right-icon'>{{ rightTxt[6] }}</span>
          {{ redAttr.complexityRemark }}
        </van-collapse-item>
      </van-collapse>

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
    <u-evaluation :hostlist="hotList" /> 
  </article>
</template>
<script>
import uEvaluation from './Evaluation'
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
      activeName: '0',
      hotList: this.hotlist,
      redAttr: this.viewdata.redAttr,
      goodsIndentify: this.viewdata.goodsIndentify,
      goodsWineCommentResp: this.viewdata.goodsWineCommentResp,

      rightTxt: ['查看', '查看', '查看', '查看', '查看', '查看', '查看']
    }
  },
  computed: {
    infos: function () {
      console.log('this.redAttr', this.redAttr)
      let { typeIcon, typeRemark, typeUrl, type } = this.redAttr
      let typeobj = this.setObj('类型', typeIcon, typeRemark, type, typeUrl)

      let { internationallevelIcon, internationalLevelRemark, internationallevel, instatlevelUrl } = this.redAttr
      let inteobj = this.setObj('国际级别', internationallevelIcon, internationalLevelRemark, internationallevel, instatlevelUrl)

      let { areaIcon, areaRemark, areaList } = this.redAttr
      console.log('areaList', areaList)
      areaList = !areaList ? [] : areaList
      // let areaArray = areaList.map(v => {
      //   return v.areaName
      // })
      // let areaStr = areaArray.join(',')
      let areaobj = this.setObj('产区', areaIcon, areaRemark, areaList)

      let { yearIcon, yearRemark, year } = this.redAttr
      let yearobj = this.setObj('年份', yearIcon, yearRemark, year)

      let { varietyIcon, varietyRemark, variety, varietyid } = this.redAttr
      let varietyobj = this.setObj('品种', varietyIcon, varietyRemark, variety, '/noun/detail/' + varietyid + '?num=0')

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
      console.log('createArray', createArray)
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
    },
    collaChange (val) {
      this.rightTxt = ['查看', '查看', '查看', '查看', '查看', '查看', '查看']
      if (val !== this.oldVal && val !== '') {
        this.oldVal = val
        this.rightTxt[val] = '收起'
      }
      if (val === '') {
        this.rightTxt[this.oldVal] = '查看'
      }
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
        // width: 100%;
        padding-left: 50px;
        padding-right: 12px;
        .pro {
          width: 35px;
          height: 35px;
          background: #82b5fa;
          border-radius: 50%;
          overflow: hidden;
          float: left;
          margin-left: -50px;
          // margin-right: 15px;
        }
        .pd_type {
          font-size: 0;
          a {
            display: inline-block;
            font-size: 13px;
            font-weight: bolder;
            margin-top: 7px;
          }
         
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
            width: 74px;
            height: 12px;
            color: #333;
            font-size: 12px;
            margin-right: 5px;
          }
          .bar {
            display: inline-block;
            vertical-align: middle;
            width: 197px;
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
        .right-txt {
          font-size: 12px;
          color: #59C3E1
        }
        .refer {
          margin-top: 10px;
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
<style lang="less">
  .van-hairline--top-bottom:after {
    display: none
  }
  .van-collapse-item {
    border: 0;
    &:after {
      display: none;
    }
  }
  .van-cell {
    padding: 10px 0;
    line-height: 1;
    &:after {
      display: none;
    }
  }
  .van-collapse-item__content {
    font-size: 10px;
    color: #666;
    line-height: 20px;
    padding: 10px;
    background: #f5f5f5;
    border-radius: 6px;
  }
</style>