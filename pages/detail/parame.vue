<template>
  <article class="u-goods-parama">
    <div class="parama_intro margin-30">
      <h3 class="title">商品推荐</h3>
      <p>
        精美包装的李红酒酒具礼盒，是赠礼佳品，无论是亲朋好友，还是领导客户，都能适用。精美包装的李红酒酒具礼盒，是赠礼佳品，无论是亲朋好友，还是领导客户，都能适用。精美包装的李红酒酒具礼盒，是赠礼佳品，无论是亲朋好友，还是领导客户，都能适用。精美包装的李红酒酒具礼盒，是赠礼佳品，无论是亲朋好友，还是领导客户，都能适用。
      </p>
    </div>

    <div class="parama_base margin-30">
      <h3 class="title">基本信息</h3>
      <div class="wrap">
        <div class="parama_base-item">
          <span>商品编号</span>
          <p>1000001</p>
        </div>
        <div class="parama_base-item">
          <span>国 家</span>
          <p>法国</p>
        </div>
        <div class="parama_base-item">
          <span>酒 庄</span>
          <p>Lopez Mercier</p>
        </div>
        <div class="parama_base-item">
          <span>品 牌</span>
          <p>拉菲传奇</p>
        </div>
        <div class="parama_base-item">
          <span>进口类型</span>
          <p>原瓶进口</p>
        </div>
        <div class="parama_base-item">
          <span>净 含 量</span>
          <p>750ml</p>
        </div>
        <div class="parama_base-item">
          <span>获奖信息</span>
          <p>IWSC国际葡萄酒银奖</p>
        </div>
        <div class="parama_base-item">
          <span>保 质 期</span>
          <p>10年</p>
        </div>
      </div>
    </div>

    <div class="parama_detail margin-30">
      <h3 class="title">详细信息</h3>
      <div class="wrap">
        <div class="parama_detail-item" v-for='$v in 10'>
          <div class="pro ib-middle"></div>
          <div class="pd_type ib-middle">
            <p>
              <span>类型</span>
              <span>（含糖量在4g/L以下）</span>
            </p>
            <em>干红葡萄酒</em>
          </div>
          <i class="van-icon van-icon-arrow"></i>
        </div>
      </div>
    </div>

    <div class="parama_detail-attr margin-30">
      <h3 class="title">详细信息</h3>
      <div class="attr-item">
        <span>涩度：</span>
        <div class="bar">
          <i class="bar-long" style="width: 50%"></i>
        </div>
      </div>
      <div class="attr-item">
        <span>苦度：</span>
        <div class="bar">
          <i class="bar-long" style="width: 50%"></i>
        </div>
      </div>
      <div class="attr-item">
        <span>酸度：</span>
        <div class="bar">
          <i class="bar-long" style="width: 50%"></i>
        </div>
      </div>
      <div class="attr-item">
        <span>果香：</span>
        <div class="bar">
          <i class="bar-long" style="width: 50%"></i>
        </div>
      </div>
      <div class="attr-item">
        <span>复杂度：</span>
        <div class="bar">
          <i class="bar-long" style="width: 50%"></i>
        </div>
      </div>

      <div class="refer">
        <p>参考酒评</p>
        <span>开瓶初饮，酒体厚重，复杂度高，随着与空气接触的时间增加，单宁的氧化，苦涩越来越轻，椰奶味越来越浓。</span>
      </div>

      <div class="tips-item">
        <h3 class="title">酒评家评价</h3>
        <p>初次开瓶，酒体厚重，复杂度高，随着与空气接触的时间增加，单宁的氧化，苦涩越来越轻，椰奶味越来越浓。初次开瓶，酒体厚重，复杂度高，随着与空气接触的时间增加，单宁的氧化，苦涩越来越轻，椰奶味越来越浓。</p>
      </div>
      <div class="tips-item">
        <h3 class="title">酿酒师笔记</h3>
        <p>初次开瓶，酒体厚重，复杂度高，随着与空气接触的时间增加，单宁的氧化，苦涩越来越轻，椰奶味越来越浓。初次开瓶，酒体厚重，复杂度高，随着与空气接触的时间增加，单宁的氧化，苦涩越来越轻，椰奶味越来越浓。</p>
      </div>
      <div class="tips-item">
        <h3 class="title">酒款特点</h3>
        <p>初次开瓶，酒体厚重，复杂度高，随着与空气接触的时间增加，单宁的氧化，苦涩越来越轻，椰奶味越来越浓。初次开瓶，酒体厚重，复杂度高，随着与空气接触的时间增加，单宁的氧化，苦涩越来越轻，椰奶味越来越浓。</p>
      </div>
      <div class="tips-item">
        <h3 class="title">酒庄特点</h3>
        <p>初次开瓶，酒体厚重，复杂度高，随着与空气接触的时间增加，单宁的氧化，苦涩越来越轻，椰奶味越来越浓。初次开瓶，酒体厚重，复杂度高，随着与空气接触的时间增加，单宁的氧化，苦涩越来越轻，椰奶味越来越浓。</p>
      </div>

    </div>
    
    <div class="u-detail_line"></div>

    <!-- 推荐 -->
    <u-evaluation /> 
  </article>
</template>
<script>
import uEvaluation from '~/pages/detail/evaluation'
export default {
  name: 'u-parame',

  components: {
    uEvaluation
  },

  data () {
    return {
    }
  },

  mounted () {
  },

  methods: {
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
        border: 1px solid #E4E4E4;
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
        border: 1px solid #e4e4e4;
      }
      &-item {
        margin-bottom: 25px;
        position: relative;
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
          border: 1px solid #e4e4e4;
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
