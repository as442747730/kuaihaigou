<template>
  <div class="explain">
    <!-- <com-head :titleConfig="configtitle"></com-head> -->
    <div class="explain-list">
      <div class="list-item">
        <div class="item-head">1.优惠券的获取</div>
        <div class="item-info">通过活动赠送、客服补偿等获得(系统自动添加, 无需兑换);</div>
      </div>
      <div class="list-item">
        <div class="item-head">2.优惠券使用</div>
        <ul class="item-info item_ul">
          <li>每张抵用券仅能使用一次，不找零，不退换，不兑换现金</li>
          <li>单笔订单只能使用1张优惠券, 不支持同时使用多张, 用券后差额不找零, 不退回；</li>
          <li>优惠券 (包括新用户券) 不能抵扣运费, 只能抵扣商品金额。特价商品不可使用优惠券, 与其他优惠不同享；</li>
          <li>每张优惠券的使用条件请查看对应优惠券的使用说明；</li>
          <li>请在有效期内使用优惠券, 未使用的优惠券过期后,将自动作废； </li>
          <li>每个用户仅限使用1张新用户专享优惠券, 同一帐号和手机号均视为同一用户； </li>
          <li>用券前订单满88元即可包邮（港澳台地区需满500元包邮）； </li>
          <li>使用抵用券抵扣部分的货款不开具发票</li>
        </ul>
      </div>
      <div class="list-item">
        <div class="item-head">3.优惠券失效</div>
        <ul class="item-info item_ul">
          <li>新用户券使用一张后其他新用户券失效, 取消订单后不返还；</li>
          <li>使用优惠券的订单, 若产生退货, 优惠券均不退回, 退款金额按优惠后的小计金额退款；</li>
          <li>参加满赠券活动获得的赠券,发生退货时,若订单中剩余商品不满足赠券条件,实物赠品需勾选退货并寄回,否则将从退款中扣减对应金额,客服审核通过退货申请后,所获赠券将会自动失效；</li>
          <li>优惠券严禁出售或转让, 如经发现并证实的, 该券将予以失效处理；</li>
          <li>如需了解更多, 请联系在线客服或拨打客服电话400-0000-000。</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
// import comHead from '~/components/com-head'
export default {
  components: {
    // comHead
  },
  data () {
    return {
      configtitle: '优惠券说明'
    }
  }
}
</script>
<style lang="less" scoped>
.explain {
  &-list {
    padding-left: 20px;

    .list-item {
      margin: 20px 0;
      padding-bottom: 20px;
      border-bottom: 1PX solid @cor_border;

      &:last-child {
        border-bottom: none;
      }

      .item-head {
        font-size: 15px;
        font-family: PingFangSC-Semibold;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        padding-bottom: 8px;
      }

      .item-info {
        font-size: 13px;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(153, 153, 153, 1);
        line-height: 23px;
        padding-right: 20px;
      }

      .item_ul {
        list-style-type: disc;
        padding-left: 20px;
      }
    }
  }
}
</style>