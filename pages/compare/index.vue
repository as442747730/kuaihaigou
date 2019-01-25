<template>
  <div class="u-compare">
    <table class="u-compare-table">
      <thead>
        <tr>
          <th class="thead-first">
            <div></div>
          </th>
          <th v-for='($v, $k) in compareData'>
            <div class="pro" :style="'background: url(' + $v.cover + ') no-repeat center/contain'"></div>
          </th>
        </tr>
      </thead>
      <tbody>
        <!-- <tr v-for='i in 10'>
          <th>{{ '#' + i }}</th>
          <td v-for='k in 10'>
            {{ '$' + k }}
          </td>
        </tr> -->
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
            <p>¥{{ $v.redAttr.type }}</p>
          </td>
        </tr>
        <tr>
          <th class="tbody-theme">
            <h3>国家</h3>
          </th>
          <td v-for='($v, $k) in compareData'>
            <p>¥{{ $v.redAttr.country }}</p>
          </td>
        </tr>
        <tr>
          <th class="tbody-theme">
            <h3>酒庄</h3>
          </th>
          <td v-for='($v, $k) in compareData'>
            <p>¥{{ $v.redAttr.winery }}</p>
          </td>
        </tr>
        <tr>
          <th class="tbody-theme">
            <h3>品牌</h3>
          </th>
          <td v-for='($v, $k) in compareData'>
            <p>¥{{ $v.brandName }}</p>
          </td>
        </tr>
      </tbody>
    </table>
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
    const { code, data } = await goodsApi.compare({ goodsIds: ['1077101977701191680', '1077104312032694272', '1077107192454189056', '1077108438485438464'] })
    if (code === 200) {
      console.log(data)
      return {
        compareData: data
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

  methods: {
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
  overflow: scroll;
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
    text-align: center;
    position: sticky;
    z-index: 1;
    top: 0;
    background: #fff;
    border-left: 1PX solid #eee;
    border-bottom: 1PX solid #eee;
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
      div {
        width: 90px;
        height: 130px;
        background: #fff;
        z-index: 3;
      }
    }
    .tbody-theme {
      font-size: 12px;
      color: #333;
      background: #FCFCFC;
      border-right: 1PX solid #eee;
    }
    .pro {
      width: 100px;
      height: 130px;
    }
  }
}
</style>
