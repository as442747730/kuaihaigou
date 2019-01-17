<template>
  <div class="comDetail">
    <div class="specific">
      <div class="specific-bk" v-lazy:background-image="require('~/assets/img/img_shequhuodong_335x180@2x.png')"></div>
      <div class="specific-head">
        <span class="head">第38期 | 红酒之夜</span>
        <span class="subhead">吉佳乐世家酒庄——拉菲的品质，平民的价格。帕克满分酒次数远高于世界顶级酒庄吉吉</span>
      </div>
    </div>
    <div class="introduction">
      <h3 class="acthead">活动简介</h3>
      <p>本展览将在全球范围内首次运用崭新高科技形式来展现世界艺术史里的华彩篇章，落址于首次对外揭开神秘面纱的海心沙展馆。这必将成为华南地区迄今为止最令人惊叹、空前绝后的文艺盛事。本展览将在全球范围内首次运用崭新高科技形式来展现世界艺术史里的华彩篇章，落址于首次对外揭开神秘面纱的海心沙展馆。这必将成为华南地区迄今为止最令人惊叹、空前绝后的文艺盛事。本展览将在全球范围内首次运用崭新高科技形式来展现世界艺术史里的华彩篇章，落址于首次对外揭开神秘面纱的海心沙展馆。</p>
    </div>
    <!-- 活动流程 -->
    <div class="process">
      <h3 class="acthead">
          活动流程<span class="acthead_sub">ACTIVITY PROCESS</span>
        </h3>
      <div class="remarks">
        <time>2018-12.03 14:00-18:00</time>
        <p>备注：由于场地有限，按照报名顺序，先报名先预定</p>
      </div>
      <div class="process-list">
        <div class="list-item">
          <div class="list_head">
            <span class="heads">
                <div class="heads-child">
                  <div class="child_index">1</div>
                  <div class="child_content">
                    活动入活动入场活动活动活动入活动入场活动活动活动入活动入场活动活动
                  </div>
                </div>
              </span>
          </div>
          <div class="item_time">2018-12.03 14:00-18:00</div>
          <div class="item_speack">规则</div>
          <div class="item_speackword">盲品游戏规则盲品游戏规则盲品游戏规则盲品游戏规则盲品游戏规则盲品游戏规则盲品游戏规则盲品游戏规则盲品游戏规则盲品游戏规则</div>
          <div class="item_sub">活动奖品</div>
          <ul class="item_sublist">
            <li>
              <div class="sublist_icon"></div>
              <p class="sublist_content">活动详情内容活动详情内容活动活动详情内容活动详情内容活动活动情内容活动活动详情内容活动详情内容活动活动</p>
            </li>
            <li>
              <div class="sublist_icon"></div>
              <p class="sublist_content">活动详情内容活动详情内容活动活动详情内容活动详情内容活动活动情内容活动活动详情内容活动详情内容活动活动</p>
            </li>
            <li>
              <div class="sublist_icon"></div>
              <p class="sublist_content">活动详情内容活动详情内容活动活动详情内容活动详情内容活动活动情内容活动活动详情内容活动详情内容活动活动</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 盲品投票 前 -->
    <div class="blinds">
      <h3 class="acthead">
        盲品投票
        <span class="acthead_sub">BLIND VOTE</span>
        <span class="acthead_right">敬请期待</span>
      </h3>
      <!-- marauto 只有一个 -->
      <div :class="['blinds-list', {marauto: 1 !== 1}]" v-swiper:mySwiper1="swiperBlind">
        <div class="swiper-wrapper">
          <div class="swiper-slide list-item">
            <div class="item-logo">01</div>
            <img class="item_img" :src="require('~/assets/img/img2.png')" />
          </div>
          <div class="swiper-slide list-item">
            <div class="item-logo">02</div>
            <img class="item_img" :src="require('~/assets/img/img2.png')" />
          </div>
          <div class="swiper-slide list-item">
            <div class="item-logo">03</div>
            <img class="item_img" :src="require('~/assets/img/img2.png')" />
          </div>
        </div>
      </div>
    </div>
    <!-- 盲品投票 后 -->
    <div class="votes">
      <h3 class="acthead">
        盲品投票
        <span class="acthead_sub">BLIND VOTE</span>
      </h3>
      <div :class="['votes-list', {marauto: 1 !== 1}]" v-swiper:mySwiper2="swiperVote">
        <div class="swiper-wrapper">
          <div class="swiper-slide list-item">
            <div class="item-info">
              <div class="info-bk" v-lazy:background-image="require('~/assets/img/img.png')"></div>
              <div class="info-detail">
                <h4>
                  <p>拉菲珍宝红葡萄酒干红拉菲</p>
                </h4>
                <div class="prices">
                  <span class="rmb">¥799</span>
                  <span class="dollar">$100.00</span>
                </div>
                <div class="overlike">
                  <i class="overicon"></i>
                  最喜欢（30）
                </div>
              </div>
            </div>
            <ul class="item-assess">
              <li class="assess-list">
                <div class="list-l">
                  <div class="l_price">¥899</div>
                  <p>估价最高</p>
                </div>
                <div class="list-r">
                  <div class="r_name">小小猴子小小猴子小小猴子小小猴子小小猴子</div>
                  <p></p>
                </div>
              </li>
               <li class="assess-list">
                <div class="list-l">
                  <div class="l_price true_price">¥799</div>
                  <p>估价最准</p>
                </div>
                <div class="list-r">
                  <div class="r_name">小小猴子</div>
                  <p></p>
                </div>
              </li>
               <li class="assess-list">
                <div class="list-l">
                  <div class="l_price">¥699</div>
                  <p>估价最低</p>
                </div>
                <div class="list-r">
                  <div class="r_name">小小猴子</div>
                  <p></p>
                </div>
              </li>
            </ul>
          </div>
          <div class="swiper-slide list-item">
            <div class="item-info">
              <div class="info-bk" v-lazy:background-image="require('~/assets/img/img.png')"></div>
              <div class="info-detail">
                <h4>
                  <p>拉菲珍宝红葡萄酒干红拉菲</p>
                </h4>
                <div class="prices">
                  <span class="rmb">¥799</span>
                  <span class="dollar">$100.00</span>
                </div>
                <div class="overlike">
                  <i class="overicon"></i>
                  最喜欢（30）
                </div>
              </div>
            </div>
            <ul class="item-assess">
              <li class="assess-list">
                <div class="list-l">
                  <div class="l_price">¥899</div>
                  <p>估价最高</p>
                </div>
                <div class="list-r">
                  <div class="r_name">小小猴子小小猴子小小猴子小小猴子小小猴子</div>
                  <p></p>
                </div>
              </li>
               <li class="assess-list">
                <div class="list-l">
                  <div class="l_price true_price">¥799</div>
                  <p>估价最准</p>
                </div>
                <div class="list-r">
                  <div class="r_name">小小猴子</div>
                  <p></p>
                </div>
              </li>
               <li class="assess-list">
                <div class="list-l">
                  <div class="l_price">¥699</div>
                  <p>估价最低</p>
                </div>
                <div class="list-r">
                  <div class="r_name">小小猴子</div>
                  <p></p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- 参与大咖 -->
    <div class="bigshot">
      <h3 class="acthead">
        参与大咖<span class="acthead_sub">PARTICIPATE IN BIG COFFEE</span>
      </h3>
      <div class="bigshot-list">
        <div class="list-item">
          <div class="item_l"></div>
          <div class="item_r">
            <div class="r_cards">
              王刚<span class="cards-sub">中国红酒协会副会长</span>
            </div>
            <div class="r_instroduce">
              <p>他的简介和荣誉他的简介和荣誉他的简介和荣誉他的简介和荣誉他的简介和荣誉他的简介和荣誉他的简介和荣誉他的简介和荣誉他的简介和荣誉他的简介和荣誉</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="winemoney">
      <h3 class="acthead">
      活动酒款<span class="acthead_sub">ACTIVE WINE</span>
    </h3>
      <div class="wine-item wine-one">
        <div class="item-head">快海购在售</div>
        <div :class="['item-list', {marauto: 1 !== 1}]" v-swiper:mySwiper3="swiperBuy">
          <div class="swiper-wrapper">
            <div class="swiper-slide list_one">
              <div class="onemdl">
                <div class="onemdl-l" v-lazy:background-image="require('~/assets/img/img2.png')"></div>
                <div class="onemdl-r">
                  <h4>拉菲珍宝红葡萄酒</h4>
                  <div class="tags">
                    <span class="tagsub">750ml</span>
                    <span class="tagsub">日常餐酒</span>
                    <span class="tagsub">紧致单宁</span>
                  </div>
                  <div class="mdlbar">
                    <div class="mdlbar_l">复杂： 30分</div>
                    <div class="mdlbar_r">
                      <div class="mdlbar_r-top w30"></div>
                    </div>
                  </div>
                  <div class="mdlbar">
                    <div class="mdlbar_l">果香：30分</div>
                    <div class="mdlbar_r">
                      <div class="mdlbar_r-top w30"></div>
                    </div>
                  </div>
                  <div class="mdlbar">
                    <div class="mdlbar_l">酸度：65分</div>
                    <div class="mdlbar_r">
                      <div class="mdlbar_r-top w30"></div>
                    </div>
                  </div>
                  <div class="mdlbar">
                    <div class="mdlbar_l">复杂：30分</div>
                    <div class="mdlbar_r">
                      <div class="mdlbar_r-top w30"></div>
                    </div>
                  </div>
                  <div class="prices">
                    <span class="actual">¥299</span>
                    <span class="market">市场价：¥ 499</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="swiper-slide list_one">
              <div class="onemdl">
                <div class="onemdl-l" v-lazy:background-image="require('~/assets/img/img2.png')"></div>
                <div class="onemdl-r">
                  <h4>拉菲珍宝红葡萄酒</h4>
                  <div class="tags">
                    <span class="tagsub">750ml</span>
                    <span class="tagsub">日常餐酒</span>
                    <span class="tagsub">紧致单宁</span>
                  </div>
                  <div class="mdlbar">
                    <div class="mdlbar_l">复杂： 30分</div>
                    <div class="mdlbar_r">
                      <div class="mdlbar_r-top w30"></div>
                    </div>
                  </div>
                  <div class="mdlbar">
                    <div class="mdlbar_l">果香：30分</div>
                    <div class="mdlbar_r">
                      <div class="mdlbar_r-top w30"></div>
                    </div>
                  </div>
                  <div class="mdlbar">
                    <div class="mdlbar_l">酸度：65分</div>
                    <div class="mdlbar_r">
                      <div class="mdlbar_r-top w30"></div>
                    </div>
                  </div>
                  <div class="mdlbar">
                    <div class="mdlbar_l">复杂：30分</div>
                    <div class="mdlbar_r">
                      <div class="mdlbar_r-top w30"></div>
                    </div>
                  </div>
                  <div class="prices">
                    <span class="actual">¥299</span>
                    <span class="market">市场价：¥ 499</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="wine-item wine-two">
        <div class="item-head">其他酒款</div>
        <div :class="['item-list', {marauto: 1 !== 1}]" v-swiper:mySwiper4="swiperOther">
          <div class="swiper-wrapper">
            <div class="swiper-slide list_one">
              <div class="onemdl">
                <div class="onemdl-l" v-lazy:background-image="require('~/assets/img/img2.png')"></div>
                <div class="onemdl-r">
                  <h4>拉菲珍宝红葡萄酒</h4>
                  <div class="tags">
                    <span class="tagsub">750ml</span>
                    <span class="tagsub">日常餐酒</span>
                    <span class="tagsub">紧致单宁</span>
                  </div>
                  <div class="itemr-info">
                    <span class="info_item icon_time">2016年</span>
                    <span class="info_item icon_address">法国／波尔多</span>
                    <span class="info_item icon_variety">黑皮诺</span>
                  </div>
                  <div class="prices">
                    <span class="actual">¥299</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="swiper-slide list_one">
              <div class="onemdl">
                <div class="onemdl-l" v-lazy:background-image="require('~/assets/img/img2.png')"></div>
                <div class="onemdl-r">
                  <h4>拉菲珍宝红葡萄酒</h4>
                  <div class="tags">
                    <span class="tagsub">750ml</span>
                    <span class="tagsub">日常餐酒</span>
                    <span class="tagsub">紧致单宁</span>
                  </div>
                  <div class="itemr-info">
                    <span class="info_item icon_time">2016年</span>
                    <span class="info_item icon_address">法国／波尔多</span>
                    <span class="info_item icon_variety">黑皮诺</span>
                  </div>
                  <div class="prices">
                    <span class="actual">¥299</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      <!-- 报名详情 -->
    <div class="information">
      <h3 class="acthead">
        报名详情<span class="acthead_sub">DEADLINE</span>
      </h3>
      <div class="subhead">报名截止</div>
      <div class="subitem">2018-12.03 14:00-18:0</div>
      <div class="subhead">时间地点</div>
      <div class="subitem">时间：2018-12.03 14:00-18:00</div>
      <div class="subitem">电话：（020）89810811</div>
      <div class="subitem">地址：广东省广州市天河区兴民路222号天盈广场东塔10楼1005室</div>
    </div>
    <!-- 报名须知 -->
    <div class="notice">
      <h3 class="acthead">
       报名须知<span class="acthead_sub">REGISTRATION NOTICE</span>
      </h3>
      <ul class="notice-items">
        <li class="notice_item"> 1、本展览将在全球范围内首次运用崭新高科技形式来展现世界艺术史里的华彩篇章，落址于首次对外揭开神秘面纱的海心沙展馆。</li>
        <li class="notice_item"> 2、这必将成为华南地区迄今为止最令人惊叹、空前绝后的文艺盛事。</li>
        <li class="notice_item"> 3、本展览将在全球范围内首次运用崭新高科技形式来展现世界艺术史里的华彩篇章，落址于首次对外揭开神秘面纱的海心沙展馆。</li>
        <li class="notice_item"> 4、这必将成为华南地区迄今为止最令人惊叹、空前绝后的文艺盛事。</li>
        <li class="notice_item"> 5、本展览将在全球范围内首次运用崭新高科技形式来展现世界艺术史里的华彩篇章，落址于首次对外揭开神秘面纱的海心沙展馆。 </li>
        <li class="notice_item"> 6、这必将成为华南地区迄今为止最令人惊叹、空前绝后的文艺盛。 </li>
      </ul>
    </div>
    <!-- 其它信息 -->
    <div class="others">
      <h3 class="acthead">
        其它信息<span class="acthead_sub">OTHER INFORMATION</span>
      </h3>
      <div class="others-html"></div>
    </div>
    <!-- 合作伙伴 -->
    <div class="cooperation">
      <h3 class="acthead">
        合作伙伴<span class="acthead_sub">PARTNER</span>
      </h3>
      <div class="coop-one">
        <div class="coop-head">主办方</div>
        <div class="coop-items">
          <div class="coop_item" v-for="n in 3">
            <img :src="require('~/assets/img/001.jpg')" alt="">
          </div>
        </div>
      </div>
      <div class="coop-one">
        <div class="coop-head">协办方/赞助商</div>
        <div class="coop-items">
          <div class="coop_item" v-for="n in 6">
            <img :src="require('~/assets/img/001.jpg')" alt="">
          </div>
        </div>
      </div>
    </div>
    <div class="period">
      <h3 class="acthead">
        往期活动<span class="acthead_sub">OTHER INFORMATION</span>
      </h3>
      <div class="period-list">
        <div class="actlist">
          <div class="actlist-bk">
            <span class="theme">官方<br>活动</span>
            <span class="status sign">报名中</span>
            <span class="status carry">进行中</span>
            <span class="status ends">已结束</span>
          </div>
          <div class="actlist-head">
            <span class="head">第38期 | 红酒之夜</span>
            <span class="subhead">2018快海购红酒沙龙</span>
          </div>
          <div class="actlist-same">活动时间：2018年7月8日-2018年7月9日</div>
          <div class="actlist-same">活动地点：广州市天河区珠江新城四季酒店68层2号展厅</div>
        </div>
        <div class="actlist">
          <div class="actlist-bk">
            <span class="theme">官方<br>活动</span>
            <span class="status sign">报名中</span>
            <span class="status carry">进行中</span>
            <span class="status ends">已结束</span>
          </div>
          <div class="actlist-head">
            <span class="head">第38期 | 红酒之夜</span>
            <span class="subhead">2018快海购红酒沙龙</span>
          </div>
          <div class="actlist-same">活动时间：2018年7月8日-2018年7月9日</div>
          <div class="actlist-same">活动地点：广州市天河区珠江新城四季酒店68层2号展厅</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        swiperBlind: {
          speed: 800,
          slidesPerView: 'auto'
        },
        swiperVote: {
          speed: 800,
          slidesPerView: 'auto'
        },
        swiperBuy: {
          speed: 800,
          slidesPerView: 'auto'
        },
        swiperOther: {
          speed: 800,
          slidesPerView: 'auto'
        }
      }
    }
  }
</script>
<style lang="less" scoped>
.comDetail {
  font-size: 14px;
  min-height: 100vh;
  background: #F5F5F5;

  .specific {
    padding: 20px 20px 30px;
    background: #fff;

    &-bk {
      height: 180px;
      border-radius: 10px;
      .bg_cover;
    }

    &-head {
      margin-top: 13px;
      margin-bottom: 10px;
      font-size: 16px;
      color: rgba(51, 51, 51, 1);
      line-height: 25px;
      font-family: PingFangSC-Semibold;

      .head {
        margin-right: 5px;
        font-weight: 600;
      }

      .subhead {
        color: #666666;
        font-size: 14px;
        margin-left: 10px;
      }
    }
  }

  // 流程中的标题
  .acthead {
    font-size: 16px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);

    &_sub {
      font-size: 12px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      line-height: 12px;
      color: #DDDDDD;
      margin-left: 10px;
    }

    &_right {
      float: right;
      font-size: 14px;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: rgba(187, 187, 187, 1);
    }
  }

  .introduction {
    margin: 10px 0;
    background: #fff;
    padding: 25px 23px 37px 28px;

    &>p {
      padding-top: 10px;
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      line-height: 28px;
    }
  }

  .process {
    margin: 10px 0;
    padding: 25px 0 30px;
    background: #fff;

    .acthead {
      padding-left: 20px;
      padding-right: 20px;
    }

    .remarks {
      padding: 10px 20px 0;
      border-bottom: 1PX solid #F1F1F1;

      time {
        font-size: 14px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(3, 161, 205, 1);
        line-height: 14px;
      }

      p {
        margin: 5px 0 20px;
        font-size: 12px;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 12px;
      }
    }

    &-list {
      padding: 0 20px;

      .list-item {
        margin: 20px 0 30px;

        .list_head {
          text-align: center;

          .heads {
            display: inline-block;
            max-width: 100%;

            &-child {
              display: flex;
              justify-content: space-between;
              align-items: center;
              height: 30px;
              background: rgba(3, 161, 205, 1);
              border-radius: 15px;

              .child_index {
                flex-grow: 0;
                font-size: 17px;
                font-family: Impact;
                color: rgba(255, 255, 255, 1);
                line-height: 17px;
                width: 30px;
                max-width: 30px;
                min-width: 30px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                border: 2PX solid #fff;
                box-sizing: border-box;
                border-radius: 15px;
                margin-left: -2px;
              }

              .child_content {
                padding: 0 10px;
                flex-grow: 1;
                font-size: 14px;
                font-family: PingFangSC-Semibold;
                font-weight: 600;
                color: rgba(255, 255, 255, 1);
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
          }
        }
      }

      .item_time {
        margin: 10px 0;
        font-size: 14px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(51, 51, 51, 1);
        text-align: center;
      }

      .item_speack {
        font-size: 16px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(51, 51, 51, 1);
        line-height: 16px;
        margin: 20px 0 10px;
        text-align: center;
      }

      .item_speackword {
        margin: 10px 0 20px;
        font-size: 14px;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 24px;
        text-align: center;
      }

      .item_sub {
        font-size: 16px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(51, 51, 51, 1);
        line-height: 16px;
        text-align: center;
        margin: 20px 0 14px;
      }

      .item_sublist {
        &>li {
          margin: 12px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .sublist_icon {
            flex-grow: 0;
            width: 30px;
            max-width: 30px;
            min-width: 30px;
            height: 30px;
            border: 1PX solid #EAEAEA;
            border-radius: 50%;
            .bg_cover;
          }

          .sublist_content {
            flex-grow: 1;
            font-size: 12px;
            font-family: PingFang-SC-Regular;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
            line-height: 18px;
            margin-left: 15px;
          }
        }
      }
    }
  }

  .blinds {
    padding-left: 20px;
    margin-top: 25px;

    .acthead {
      padding-right: 20px;
    }

    &-list {
      padding: 20px 0 25px;
      &.marauto {
        padding-right: 20px;
        .list-item {
          margin: 0 auto;
        }
      }
      .list-item {
        width: 200px;
        height: 240px;
        line-height: 240px;
        text-align: center;
        background: #fff;
        border-radius: 6px;
        overflow: hidden;
        position: relative;
        margin-right: 20px;

        .item_img {
          display: inline-block;
          max-width: 100%;
          max-height: 100%;
          height: auto;
        }

        .item-logo {
          position: absolute;
          width: 40px;
          left: 20px;
          top: 0;
          padding-top: 4px;
          width: 32px;
          text-align: center;
          background: #03A1CD;
          font-size: 24px;
          font-family: Impact;
          color: rgba(255, 255, 255, 1);
          line-height: 24px;

          &:before {
            position: absolute;
            left: 0;
            bottom: -12px;
            content: '';
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 0 0 12px 32px;
            border-color: transparent transparent transparent #03A1CD;
          }

          &:after {
            position: absolute;
            right: 0;
            bottom: -12px;
            content: '';
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 0 32px 12px 0;
            border-color: transparent #03A1CD transparent transparent;
          }
        }
      }
    }
  }

  .votes {
    padding-left: 20px;
    margin-top: 25px;

    .acthead {
      padding-right: 20px;
    }

    &-list {
      padding: 20px 0 25px;
      &.marauto {
        padding-right: 20px;
        .list-item {
          margin: 0 auto;
        }
      }

      .list-item {
        width: 280px;
        width:280px;
        background: #fff;
        border-radius:8px;
        margin-right: 20px;

        .item-info {
          padding: 10px 20px 20px 10px;
          display: flex;
          align-items: center;
          .info-bk {
            flex-grow: 0;
            width: 80px;
            max-width: 80px;
            min-width: 80px; 
            height: 115px;
            margin-right: 10px;
            .bg_cover;
          }
          .info-detail {
            flex-grow: 1;
            h4 {
              display: flex;
              align-items: center;
              height: 40px;
              & > p {
                font-size:16px;
                font-family:PingFangSC-Medium;
                font-weight:500;
                color:rgba(51,51,51,1);
                line-height:20px;
              }
            }
            .prices {
              margin: 15px 0 12px;
              .rmb {
                font-size:18px;
                font-family:Impact;
                color:rgba(249,156,0,1);
                line-height:18px;
              }
              .dollar {
                font-size:12px;
                font-family:PingFangSC-Regular;
                font-weight:400;
                color:rgba(51,51,51,1);
                margin-left: 6px;
              }

            }
            .overlike {
              width: 126px;
              height: 24px;
              line-height: 22px;
              text-align: center;
              border-radius:12px;
              border:1px solid rgba(238,238,238,1);
              font-size:12px;
              font-family:PingFangSC-Regular;
              font-weight:400;
              color:rgba(153,153,153,1);
              padding-left: 25px;
              box-sizing: border-box;
              .overicon {
                float: left;
                margin-left: -25px;
                margin-top: -1px;
                width: 24px;
                height: 24px;
                background-size: 24px 24px;
                background-repeat: no-repeat;
                background-position: center center;
                background-image: url('~/assets/img/Icons/ic_like_r_24x24@2x.png');
              }
            }
          }
        }
        .item-assess {
          border-top: 1PX solid #D8D8D8;
          padding-left: 20px;
          padding-bottom: 30px;
          .assess-list {
            display: flex;
            margin-top: 43px;
            .list-l {
              padding-left: 42px;
              background-size: 30px 30px;
              background-position: left center;
              background-repeat: no-repeat;
              background-image: url('~/assets/img/Icons/ic_price_t_30x30@2x.png');
              .l_price {
                font-size:18px;
                font-family:Impact;
                color:rgba(85,85,85,1);
                line-height:18px;
                &.true_price {
                  color:rgba(249,156,0,1);
                }
              }
              & > p {
                margin-top: 7px;
                font-size:13px;
                font-family:PingFangSC-Regular;
                font-weight:400;
                color:rgba(136,136,136,1);
                line-height:13px;
              }
            }
            .list-r {
              margin-left: 16px;
              padding-left: 42px;
              background-size: 36px 36px;
              background-position: left center;
              background-image: url('~/assets/img/pic_touxiang_01@2x.png');
              background-repeat: no-repeat;
              .r_name {
                max-width: 100px;
                font-size:12px;
                font-family:PingFangSC-Semibold;
                font-weight:600;
                color:rgba(102,102,102,1);
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
              &>p {
                margin-top: 7px;
                height: 15px;
              }
            }
          }
        }
      }

    }

  }

  .bigshot {
    background: #fff;
    padding: 25px 20px 10px;

    &-list {
      .list-item {
        margin: 25px 0;
        height: 80px;
        border-radius: 8px;
        margin-left: 40px;
        padding-left: 50px;
        border: 1PX solid rgba(241, 241, 241, 1);

        .item_l {
          width: 80px;
          height: 80px;
          float: left;
          border-radius: 40px;
          background: pink;
          margin-left: -90px;
        }

        .item_r {
          padding: 14px 10px 14px 0;

          .r_cards {
            font-size: 14px;
            font-family: PingFangSC-Semibold;
            font-weight: 600;
            color: rgba(51, 51, 51, 1);

            .cards-sub {
              font-size: 12px;
              font-family: PingFang-SC-Regular;
              font-weight: 400;
              color: rgba(102, 102, 102, 1);
              margin-left: 10px;
            }
          }

          .r_instroduce {
            margin-top: 10px;
            height: 32px;

            &>p {
              font-size: 12px;
              font-family: PingFang-SC-Medium;
              font-weight: 500;
              color: rgba(153, 153, 153, 1);
              line-height: 16px;
              overflow: hidden;
              -o-text-overflow: ellipsis;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
          }

        }
      }
    }
  }

  .winemoney {
    background: #fff;
    padding: 25px 0 10px;
    margin-top: 10px;
    .acthead {
      padding: 0 20px;
    }

    .wine-item {
      padding: 20px 0;
      .item-head {
        padding-left: 20px;
        font-size: 14px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(3, 161, 205, 1);
        line-height: 14px;
        margin-bottom: 15px;
      }
      .item-list {
        padding-left: 20px;
        &.marauto {
          padding-left: 0;
          .list_one {
            margin: 0 auto;
          }
        }
        .list_one {
          width: 320px;
          border-radius: 8px;
          border: 1PX solid #EAEAEA;
          padding: 20px 10px 10px;
          box-sizing: border-box;
          margin-right: 20px;
          .onemdl {
            display: flex;
            align-items: center;
            &-l {
              width: 80px;
              // height: 180px;
              min-width: 80px;
              max-width: 80px;
              margin-right: 10px;
              flex-grow: 0;
              .bg_cover;
            }
            &-r {
              flex-flow: 1;
              width: 100%;
              h4 {
                font-size:16px;
                font-family:PingFangSC-Semibold;
                font-weight:600;
                color:rgba(51,51,51,1);
              }
              .tags {
                font-size: 12px;
                font-family: PingFang-SC-Regular;
                font-weight: 400;
                color: rgba(153, 153, 153, 1);
                margin-top: 10px;

                .tagsub {
                  margin-top: 10px;

                  &+.tagsub {
                    margin-left: 5px;
                    padding-left: 5px;
                    position: relative;
                    &:before {
                      content: '';
                      width: 1PX;
                      height: 12px;
                      background: pink;
                      position: absolute;
                      top: 50%;
                      left: -1PX;
                      margin-top: -6px;
                      background: rgba(153,153,153,1);
                    }
                  }
                }
              }
              .itemr-info {
                .info_item {
                  display: inline-block;
                  height:24px;
                  line-height: 24px;
                  background:#DEF3F9;
                  border-radius:12px;
                  padding-left: 25px;
                  padding-right: 5px;
                  vertical-align: middle;
                  margin-top: 10px;
                  position: relative;
                  font-size:12px;
                  font-family:PingFangSC-Semibold;
                  font-weight:600;
                  color: #03A1CD;
                  margin-left: 7px;
                  &:before {
                    content: '';
                    width: 24px;
                    height: 24px;
                    position: absolute;
                    top: 50%;
                    left: 0;
                    margin-top: -12px;
                    .bg_cover;
                  }

                }
                .icon_time {
                  &:before {
                    background-image: url('~/assets/img/Icons/ic_time_24x24.png');
                  }
                }
                .icon_address {
                  &:before {
                    background-image: url('~/assets/img/Icons/ic_position_24x24.png');
                  }
                }
                .icon_variety {
                  &:before {
                    background-image: url('~/assets/img/Icons/ic_grape_24x24.png');
                  }
                }
              }
              .mdlbar {
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 200px;
                margin: 15px 0;
                &_l {
                  width: 73px;
                  font-size: 12px;
                  font-family: PingFang-SC-Regular;
                  font-weight: 400;
                  color: @cor_666;
                }
                &_r {
                  position: relative;
                  width: 117px;
                  height: 10px;
                  background: #EFF9FC;
                  border-radius: 5px;
                  overflow: hidden;
                  &-top {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 0;
                    height: 10px;
                    background: #59C2E1;
                    border-radius: 5px;
                    transition: .3s;
                    &.w30 {
                      width: 30px;
                    }
                  }
                }
              }
              .prices {
                margin-top: 12px;
                .actual {
                  font-size:18px;
                  font-family:Impact;
                  color:rgba(249,156,0,1);
                  line-height:18px;
                }
                .market {
                  font-size:12px;
                  font-family:PingFang-SC-Medium;
                  font-weight:500;
                  color:rgba(153,153,153,1);
                  margin-left: 10px;
                  text-decoration: line-through
                }
              }
            }
          }
        }
      }
    }
    .wine-one {
      border-bottom: 1PX solid #F1F1F1;
      .onemdl-l {
        height: 180px;
      }
    }
    .wine-two {
      .onemdl-l {
        height: 160px;
      }
    }

  }

  .information {
    margin-top: 10px;
    background: #fff;
    padding: 25px 20px 30px;

    .subhead {
      font-size: 14px;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: rgba(3, 161, 205, 1);
      margin-top: 20px;
    }

    .subitem {
      margin: 10px 0;
      font-size: 14px;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(153, 153, 153, 1);
      line-height: 20px;
    }
  }

  .notice {
    margin-top: 10px;
    background: #fff;
    padding: 25px 20px 30px;

    &-items {
      margin-top: 20px;
      padding: 15px;
      background: rgba(252, 252, 252, 1);
      border-radius: 8px;
      border: 1PX solid rgba(231, 226, 226, 1);
    }

    &_item {
      font-size: 12px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: 22px;
    }
  }

  .others {
    margin-top: 10px;
    background: #fff;
    padding: 25px 20px 30px;
    &-html {
      font-size: 14px;
    }
  }

  .cooperation {
    margin-top: 10px;
    background: #fff;
    padding: 25px 20px 30px;

    .coop-head {
      font-size: 14px;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: rgba(144, 144, 144, 1);
      line-height: 20px;
      margin: 20px auto 10px;
      text-align: center;

    }

    .coop-items {
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex-wrap: wrap;

      .coop_item {
        height: 50px;
        margin: 12px;

        &>img {
          display: inline-block;
          height: 50px;
          width: auto;
        }
      }
    }
  }

  .period {
    margin-top: 10px;
    background: #fff;
    padding: 25px 20px 30px;
    &-list {
      .actlist {
        margin-top: 20px;

        &-bk {
          height: 180px;
          border-radius: 10px;
          background-image: url('~/assets/img/img_shequhuodong_335x180@2x.png');
          .bg_cover;
          .theme {
            float: left;
            margin-left: 10px;
            font-size:13px;
            font-family:PingFangSC-Semibold;
            font-weight:600;
            color:rgba(255,255,255,1);
            line-height:16px;
            padding: 3px 5px;
            background: rgba(0,0,0,.4);
            position: relative;
            &:before {
              position: absolute;
              left: 0;
              bottom: -6px;
              content: '';
              width: 0;
              height: 0;
              border-style: solid;
              border-width: 0 0 6px 20px;
              border-color: transparent transparent transparent rgba(0,0,0,.4);
            }
            &:after {
              position: absolute;
              right: 0;
              bottom: -6px;
              content: '';
              width: 0;
              height: 0;
              border-style: solid;
              border-width: 0 20px 6px 0;
              border-color: transparent rgba(0,0,0,.4) transparent transparent;
            }
          }
          .status {
            float: right;
            margin-top: 10px;
            margin-right: 10px;
            font-size:14px;
            font-family:PingFangSC-Semibold;
            font-weight:600;
            color:rgba(255,255,255,1);
            line-height:14px;
            padding: 7px 10px;
            border-radius: 4px;
          }
          .sign{
            background: #FF3333;
          }
          .carry {
            background: #F99C00;
          }
          .ends {
            background: #999999;
          }
        }

        &-head {
          margin-top: 13px;
          margin-bottom: 10px;
          font-size: 16px;
          color: rgba(51, 51, 51, 1);
          line-height: 16px;
          font-family: PingFangSC-Semibold;

          .head {
            margin-right: 5px;
            font-weight: 600;
          }
        }

        &-same {
          margin-top: 5px;
          font-size: 12px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
        }
      }
    }
  }

}
</style>