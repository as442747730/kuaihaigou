<template>
  <div class="u-compare">
    <div class="u-compare-wrap">
      <table class="u-compare-table">
        <thead>
          <tr>
            <th class="thead-first">
              <div></div>
            </th>
            <th v-for='($v, $k) in compareData'>
              <div class="pro" :style="'background: url(' + $v.cover + ') no-repeat center/contain'">
                <i class="delet" @click='deleteGoods($v.id, $k)'></i>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th class="tbody-theme">
              <h3>商品名称</h3>
            </th>
            <td v-for='($v, $k) in compareData'>
              <p>{{ $v.goodsName }}</p>
            </td>
          </tr>
          <tr>
            <th class="tbody-theme">
              <h3>价格</h3>
            </th>
            <td v-for='($v, $k) in compareData'>
              <p>¥{{ $v.actualPrice }}</p>
            </td>
          </tr>
          <tr>
            <th class="tbody-theme">
              <h3>类型</h3>
            </th>
            <td v-for='($v, $k) in compareData'>
              <p>{{ $v.redAttr.type }}</p>
            </td>
          </tr>
          <tr>
            <th class="tbody-theme">
              <h3>国家</h3>
            </th>
            <td v-for='($v, $k) in compareData'>
              <p>{{ $v.redAttr.country }}</p>
            </td>
          </tr>
          <tr>
            <th class="tbody-theme">
              <h3>酒庄</h3>
            </th>
            <td v-for='($v, $k) in compareData'>
              <p>{{ $v.redAttr.winery }}</p>
            </td>
          </tr>
          <tr>
            <th class="tbody-theme">
              <h3>品牌</h3>
            </th>
            <td v-for='($v, $k) in compareData'>
              <p>{{ $v.brandName }}</p>
            </td>
          </tr>
          <tr>
            <th class="tbody-theme">
              <h3>进口类型</h3>
            </th>
            <td v-for='($v, $k) in compareData'>
              <p>{{ $v.redAttr.importType }}</p>
            </td>
          </tr>
          <tr>
            <th class="tbody-theme">
              <h3>净含量</h3>
            </th>
            <td v-for='($v, $k) in compareData'>
              <p>{{ getsuffix($v.redAttr.netVolume, 'ml') }}</p>
            </td>
          </tr>
          <tr>
            <th class="tbody-theme">
              <h3>产地</h3>
            </th>
            <td v-for='($v, $k) in compareData'>
              <p>{{ getAreaList($v.redAttr.areaList) }}</p>
            </td>
          </tr>
          <tr>
            <th class="tbody-theme">
              <h3>本站级别</h3>
            </th>
            <td v-for='($v, $k) in compareData'>
              <p>{{ $v.redAttr.instatlevel }}</p>
            </td>
          </tr>
          <tr>
            <th class="tbody-theme">
              <h3>年份</h3>
            </th>
            <td v-for='($v, $k) in compareData'>
              <p>{{ getsuffix($v.redAttr.year, '年') }}</p>
            </td>
          </tr>
          <tr>
            <th class="tbody-theme">
              <h3>酒精度数</h3>
            </th>
            <td v-for='($v, $k) in compareData'>
              <p>{{ getsuffix($v.redAttr.alcoholDegree, '%vol') }}</p>
            </td>
          </tr>
          <tr>
            <th class="tbody-theme">
              <h3>橡木桶时间</h3>
            </th>
            <td v-for='($v, $k) in compareData'>
              <p>{{ getsuffix($v.redAttr.oakBarrelTime, '月') }}</p>
            </td>
          </tr>
          <tr>
            <th class="tbody-theme">
              <h3>平均树龄</h3>
            </th>
            <td v-for='($v, $k) in compareData'>
              <p>{{ getsuffix($v.redAttr.averageVineAge, '年') }}</p>
            </td>
          </tr>
          <tr>
            <th class="tbody-theme">
              <h3>年产量</h3>
            </th>
            <td v-for='($v, $k) in compareData'>
              <p>{{ $v.redAttr.annualOutput }}</p>
            </td>
          </tr>
          <tr>
            <th class="tbody-theme">
              <h3>获奖信息</h3>
            </th>
            <td v-for='($v, $k) in compareData'>
              <p>{{ $v.redAttr.awardInfo }}</p>
            </td>
          </tr>
          <tr>
            <th class="tbody-theme">
              <h3>适饮温度</h3>
            </th>
            <td v-for='($v, $k) in compareData'>
              <p>{{ $v.redAttr.serveDegree }}</p>
            </td>
          </tr>
          <tr>
            <th class="tbody-theme">
              <h3>最佳醒酒时间</h3>
            </th>
            <td v-for='($v, $k) in compareData'>
              <p>{{ $v.redAttr.bestSoberTime }}</p>
            </td>
          </tr>
          <tr>
            <th class="tbody-theme">
              <h3>喝酒场景</h3>
            </th>
            <td v-for='($v, $k) in compareData'>
              <p>{{ $v.redAttr.scene }}</p>
            </td>
          </tr>
          <tr>
            <th class="tbody-theme">
              <h3>酒体</h3>
            </th>
            <td v-for='($v, $k) in compareData'>
              <p>{{ $v.redAttr.wineBody }}</p>
            </td>
          </tr>
          <tr>
            <th class="tbody-theme">
              <h3>复杂度</h3>
            </th>
            <td v-for='($v, $k) in compareData'>
              <p>{{ getParnum($v.redAttr.complexity) }}分</p>
            </td>
          </tr>
          <tr>
            <th class="tbody-theme">
              <h3>单宁</h3>
            </th>
            <td v-for='($v, $k) in compareData'>
              <p>{{ getParnum($v.redAttr.tannin) }}分</p>
            </td>
          </tr>
          <tr>
            <th class="tbody-theme">
              <h3>酸度</h3>
            </th>
            <td v-for='($v, $k) in compareData'>
              <p>{{ getParnum($v.redAttr.acidity) }}分</p>
            </td>
          </tr>
          <tr>
            <th class="tbody-theme">
              <h3>苦度</h3>
            </th>
            <td v-for='($v, $k) in compareData'>
              <p>{{ getParnum($v.redAttr.bitterness) }}分</p>
            </td>
          </tr>
          <tr>
            <th class="tbody-theme">
              <h3>涩度</h3>
            </th>
            <td v-for='($v, $k) in compareData'>
              <p>{{ getParnum($v.redAttr.astringency) }}分</p>
            </td>
          </tr>
          <tr>
            <th class="tbody-theme">
              <h3>果香</h3>
            </th>
            <td v-for='($v, $k) in compareData'>
              <p>{{ getParnum($v.redAttr.fruity) }}分</p>
            </td>
          </tr>
          <tr>
            <th class="tbody-theme">
              <h3>参考酒评</h3>
            </th>
            <td v-for='($v, $k) in compareData'>
              <p>{{ $v.longComment }}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { goodsApi } from '@/api/goods'
export default {
  name: '',
  layout: 'default',

  components: {
  },

  head () {
    return {
      title: '商品对比',
      meta: [
        { hid: 'title', name: 'title', content: '商品对比' }
      ]
    }
  },

  async asyncData (req) {
    const { code: code1, data: data1 } = await goodsApi.showGoodsForContrast(req)
    let compareArr = []
    if (code1 === 200 && data1.length > 1) {
      compareArr = data1.map($v => $v.id)
    } else {
      req.redirect('/winecenter')
    }
    const { code: code2, data: data2 } = await goodsApi.compare({ goodsIds: compareArr })
    if (code2 === 200) {
      return {
        compareData: data2
      }
    } else {
      req.redirect('/error')
    }
  },

  data () {
    return {
      compareData: []
    }
  },

  created () {
    console.log(this.compareData)
  },

  mounted () {
    this.overscroll(document.querySelector('.u-compare-wrap'))
    document.body.addEventListener('touchmove', function (evt) {
      if (!evt._isScroller) {
        evt.preventDefault()
      }
    })
  },

  methods: {
    async deleteGoods (id, index) {
      if (this.compareData.length <= 2) return this.$toast('对比的商品不能少于两个')
      const { code } = await goodsApi.removeFromContrast({ goodsIds: [id] })
      if (code === 200) {
        this.compareData.splice(index, 1)
        this.$toast('删除对比商品成功')
      }
    },
    getsuffix (num, suf) {
      return !num ? 0 : (num + suf)
    },
    getAreaList (arr) {
      if (!arr) return '-'
      let arealist = []
      arr.map(v => {
        arealist.push(v.areaName)
      })
      return arealist.join('>')
    },
    getParnum (num) {
      return !num ? 0 : num
    },
    overscroll (el) {
      el.addEventListener('touchstart', function () {
        var top = el.scrollTop
        var totalScroll = el.scrollHeight
        var currentScroll = top + el.offsetHeight
        if (top === 0) {
          el.scrollTop = 1
        } else if (currentScroll === totalScroll) {
          el.scrollTop = top - 1
        }
      })
      el.addEventListener('touchmove', function (evt) {
        if (el.offsetHeight < el.scrollHeight) {
          evt._isScroller = true
        }
      })
    }
  }
}
</script>

<style lang="less">
.u-compare {
  font-size: 12px;
  font-weight: normal;
  color: #666;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  &-wrap {
    width: 100%;
    height: 100vh;
    overflow: scroll;
  }
  table {
    // position: relative;
    table-layout: auto;
    width: 100%;
    z-index: 0;
    // white-space: nowrap;
  }
  th {
    box-sizing: border-box;
    width: 100px;
    box-sizing: border-box;
    text-align: center;
    position: sticky;
    z-index: 1;
    top: 0;
    background: #fff;
    border-left: 1PX solid #eee;
    border-bottom: 1PX solid #eee;
  }
  thead {
    th {
      height: 130px;
      padding: 10px;
    }
  }
  tbody {
    tr {
      th:first-child {
        overflow: hidden;
        text-overflow: ellipsis;
        left: 0;
        z-index: 2;
      }
    }
    td {
      border-right: 1PX solid #eee;
      border-bottom: 1PX solid #eee;
      p {
        text-align: center;
        line-height: 18px;
        padding: 5px 10px;
        min-height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
  &-table {
    .thead-first {
      z-index: 3;
      left: 0;
      border-left: 0;
      &:after {
        content: '';
        position: absolute;
        right: 0;
        top: 0;
        width: 1PX;
        height: 100%;
        background: #eee;
      }
      div {
        width: 90px;
        height: 130px;
        background: #fff;
        z-index: 3;
      }
      & + th {
        border-left: 0;
      }
    }
    .tbody-theme {
      font-size: 12px;
      color: #333;
      background: #FCFCFC;
      border-left: 0;
      &:after {
        content: '';
        position: absolute;
        right: 0;
        top: 0;
        width: 1PX;
        height: 100%;
        background: #eee;
      }
    }
    .pro {
      width: 100px;
      height: 130px;
      position: relative;
      i {
        position: absolute;
        right: 0px;
        top: 0px;
        width: 14px;
        height: 14px;
        background: url('~/assets/img/Icons/ic_off_g_14x14@2x.png') no-repeat center/contain;
      }
    }
  }
}
</style>
