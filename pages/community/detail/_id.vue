<template>
  <div class="munitydeatil" :class="{defscroll: showsignup}">
    <div class="comDetail">
      <div class="specific">
        <div class="specific-bk" v-lazy:background-image="detailInfo.background"></div>
        <div class="specific-head">
          <span class="head">第{{detailInfo.period}}期 | {{detailInfo.theme}}</span>
          <span class="subhead">{{detailInfo.title}}</span>
        </div>
      </div>
      <div class="introduction">
        <h3 class="acthead">
          活动简介<span class="acthead_sub">EVENT PROFILE</span>
        </h3>
        <p>{{detailInfo.introduce}}</p>
      </div>
      <!-- 活动流程 -->
      <div class="process">
        <h3 class="acthead">
          活动流程<span class="acthead_sub">ACTIVITY PROCESS</span>
        </h3>
        <div class="remarks">
          <time>{{detailInfo._staEndtime}}</time>
          <p>备注：{{detailInfo.activityRemark}}</p>
        </div>
        <div class="process-list" v-if="processList.length > 0">
          <div class="list-item" v-for="(process, index) in processList" :key="index">
            <div class="list_head">
              <span class="heads">
                  <div class="heads-child">
                    <div class="child_index">{{index + 1}}</div>
                    <div class="child_content">
                      {{process.processName}}
                    </div>
                  </div>
                </span>
            </div>
            <div class="item_time">{{process._strTime}}</div>
            <div class="item_speack">{{process.title}}</div>
            <div class="item_speackword">{{process.content}}</div>
            <div class="item_sub">{{process.subTitle}}</div>
            <ul class="item_sublist" v-if="process.subProcessRespList && process.subProcessRespList.length > 0">
              <li v-for="(subpro, subIndex) in process.subProcessRespList" :key="subIndex" v-if="subpro.content">
                <div class="sublist_icon" v-lazy:background-image="subpro.img"></div>
                <p class="sublist_content">{{subpro.content}}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 盲品投票 前 -->
      <div class="blinds" v-if="blindList.length > 0 && votestatus !== 3">
        <h3 class="acthead">
          盲品投票
          <span class="acthead_sub">BLIND VOTE</span>
          <span class="acthead_right">敬请期待</span>
        </h3>
        <!-- marauto 只有一个 -->
        <div :class="['blinds-list', {marauto: blindList.length === 1}]" v-swiper:mySwiper1="swiperBlind">
          <div class="swiper-wrapper">
            <div class="swiper-slide list-item" v-for="(blind, index) in blindList" :key="index">
              <div class="item-logo" v-if="index < 9">0{{index + 1}}</div>
              <div class="item-logo" v-else>{{index + 1}}</div>
              <img class="item_img" v-lazy="require('~/assets/img/Icons/img_jiu_02 copy@2x.png')" />
            </div>
          </div>
        </div>
      </div>
      <!-- 盲品投票 后 -->
      <div class="votes" v-if="voteList.length > 0 && votestatus === 3">
        <h3 class="acthead">
          盲品投票
          <span class="acthead_sub">BLIND VOTE</span>
        </h3>
        <div :class="['votes-list', {marauto: voteList.length === 1}]" v-swiper:mySwiper2="swiperVote">
          <div class="swiper-wrapper">
            <div class="swiper-slide list-item" v-for="(votes, index) in voteList" :key="index">
              <div class="item-info">
                <div class="info-bk" v-lazy:background-image="votes.showImg"></div>
                <div class="info-detail">
                  <h4>
                    <p>{{votes.name}}</p>
                  </h4>
                  <div class="prices">
                    <span class="rmb">¥{{votes.priceRmb}}</span>
                    <span class="dollar">${{votes.priceForeign}}</span>
                  </div>
                  <div class="overlike">
                    <i class="overicon"></i>
                    最喜欢（{{votes.likeNum}}）
                  </div>
                </div>
              </div>
              <ul class="item-assess">
                <li class="assess-list">
                  <div class="list-l" v-lazy:background-image="votes.maxHeadimgurl">
                    <div class="l_price">¥{{votes.maxPrice}}</div>
                    <p>估价最高</p>
                  </div>
                  <div class="list-r">
                    <div class="r_name">{{votes.maxUsername}}</div>
                    <p></p>
                  </div>
                </li>
                 <li class="assess-list">
                  <div class="list-l" v-lazy:background-image="votes.accurateHeadimgurl">
                    <div class="l_price true_price">¥{{votes.accuratePrice}}</div>
                    <p>估价最准</p>
                  </div>
                  <div class="list-r">
                    <div class="r_name">{{votes.accurateUsername}}</div>
                    <p></p>
                  </div>
                </li>
                 <li class="assess-list">
                  <div class="list-l" v-lazy:background-image="votes.minHeadimgurl">
                    <div class="l_price">¥{{votes.minPrice}}</div>
                    <p>估价最低</p>
                  </div>
                  <div class="list-r">
                    <div class="r_name">{{votes.minUsername}}</div>
                    <p></p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <!-- 参与大咖 -->
      <div class="bigshot" v-if="bigshotList.length > 0">
        <h3 class="acthead">
          参与大咖<span class="acthead_sub">PARTICIPATE IN BIG COFFEE</span>
        </h3>
        <div class="bigshot-list">
          <div class="list-item" v-for="(bigshot, index) in bigshotList" :key="index">
            <div class="item_l" v-lazy:background-image="bigshot.img"></div>
            <div class="item_r">
              <div class="r_cards">
                {{bigshot.name}}<span class="cards-sub"></span>
              </div>
              <div class="r_instroduce">
                <p>{{bigshot.introduce}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="winemoney" v-if="buygoodsList.length > 0 ||othergoodsList.length > 0">
        <h3 class="acthead">
        活动酒款<span class="acthead_sub">ACTIVE WINE</span>
        </h3>
        <div class="wine-item wine-one" v-if="buygoodsList.length > 0">
          <div class="item-head">快海购在售</div>
          <div :class="['item-list', {marauto: buygoodsList.length === 1}]" v-swiper:mySwiper3="swiperBuy">
            <div class="swiper-wrapper">
              <div class="swiper-slide list_one" v-for="(buygoods, index) in buygoodsList" :key="index">
                <div class="onemdl">
                  <div class="onemdl-l" v-lazy:background-image="buygoods.cover"></div>
                  <div class="onemdl-r">
                    <h4>{{buygoods.variety}}</h4>
                    <div class="tags">
                      <span class="tagsub" v-for="(tags, tagIndex) in buygoods.tagList">{{tags}}</span>
                    </div>
                    <div class="mdlbar" v-if="buygoods.acidity">
                      <div class="mdlbar_l">酸度： {{buygoods.acidity}}分</div>
                      <div class="mdlbar_r">
                        <div class="mdlbar_r-top w30"></div>
                      </div>
                    </div>
                    <div class="mdlbar" v-if="buygoods.bitterness">
                      <div class="mdlbar_l">苦度：{{buygoods.bitterness}}分</div>
                      <div class="mdlbar_r">
                        <div class="mdlbar_r-top w30"></div>
                      </div>
                    </div>
                    <div class="mdlbar" v-if="buygoods.astringency">
                      <div class="mdlbar_l">涩度：{{buygoods.astringency}}分</div>
                      <div class="mdlbar_r">
                        <div class="mdlbar_r-top w30"></div>
                      </div>
                    </div>
                    <div class="mdlbar" v-if="buygoods.fruity">
                      <div class="mdlbar_l">果香：{{buygoods.fruity}}分</div>
                      <div class="mdlbar_r">
                        <div class="mdlbar_r-top w30"></div>
                      </div>
                    </div>
                    <div class="mdlbar" v-if="buygoods.tannin">
                      <div class="mdlbar_l">单宁：{{buygoods.tannin}}分</div>
                      <div class="mdlbar_r">
                        <div class="mdlbar_r-top w30"></div>
                      </div>
                    </div>
                    <div class="mdlbar" v-if="buygoods.complexity">
                      <div class="mdlbar_l">复杂度：{{buygoods.complexity}}分</div>
                      <div class="mdlbar_r">
                        <div class="mdlbar_r-top w30"></div>
                      </div>
                    </div>
                    <div class="prices">
                      <span class="actual">¥{{buygoods.actualPrice}}</span>
                      <!-- <span class="market">市场价：¥ 499</span> -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="wine-item wine-two" v-if="othergoodsList.length > 0">
          <div class="item-head">其他酒款</div>
          <div :class="['item-list', {marauto: othergoodsList.length === 1}]" v-swiper:mySwiper4="swiperOther">
            <div class="swiper-wrapper">
              <div class="swiper-slide list_one" v-for="(othergoods, index) in othergoodsList" :key="index">
                <div class="onemdl">
                  <div class="onemdl-l" v-lazy:background-image="othergoods.img"></div>
                  <div class="onemdl-r">
                    <h4>{{othergoods.name}}</h4>
                    <div class="tags">
                      <span class="tagsub">750ml</span>
                      <span class="tagsub">日常餐酒</span>
                      <span class="tagsub">紧致单宁</span>
                    </div>
                    <div class="itemr-info">
                      <span class="info_item icon_time">{{othergoods.year}}</span>
                      <span class="info_item icon_address" v-if="othergoods.area">{{othergoods.country}}/{{othergoods.area}}</span>
                      <span class="info_item icon_address" v-else>{{othergoods.country}}</span>
                      <span class="info_item icon_variety">{{othergoods.variety}}</span>
                    </div>
                    <div class="prices">
                      <span class="actual">¥{{othergoods.salePrice}}</span>
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
        <div class="subitem">{{applicationDetail.deadline}}</div>
        <div class="subhead">时间地点</div>
        <div class="subitem">时间：{{applicationDetail._staEndtime}}</div>
        <!-- <div class="subitem">电话：（020）89810811</div> -->
        <div class="subitem">地址：{{applicationDetail.detAddress}}</div>
      </div>
      <!-- 报名须知 -->
      <div class="notice" v-if="detailInfo.notice">
        <h3 class="acthead">
         报名须知<span class="acthead_sub">REGISTRATION NOTICE</span>
        </h3>
        <ul class="notice-items">
          <li class="notice_item">
            {{detailInfo.notice}}
          </li>
        </ul>
      </div>
      <!-- 其它信息 -->
      <div class="others" v-if="detailInfo.otherInfo">
        <h3 class="acthead">
          其它信息<span class="acthead_sub">OTHER INFORMATION</span>
        </h3>
        <div class="others-html" v-html="detailInfo.otherInfo"></div>
      </div>
      <!-- 合作伙伴 -->
      <div class="cooperation" v-if="detailInfo.organizer || detailInfo.coorganizer">
        <h3 class="acthead">
          合作伙伴<span class="acthead_sub">PARTNER</span>
        </h3>
        <div class="coop-one" v-if="detailInfo.organizer && detailInfo.organizer.length > 0">
          <div class="coop-head">主办方</div>
          <div class="coop-items">
            <div class="coop_item" v-for="(organ, index) in detailInfo.organizer" :key="index">
              <img v-lazy="organ" alt="">
            </div>
          </div>
        </div>
        <div class="coop-one" v-if="detailInfo.coorganizer">
          <div class="coop-head">协办方/赞助商</div>
          <div class="coop-items">
            <div class="coop_item" v-for="(coor, index) in detailInfo.coorganizer" :key="index">
              <img v-lazy="coor" alt="">
            </div>
          </div>
        </div>
      </div>
      <div class="period" v-if="pastActList.length > 0">
        <h3 class="acthead">
          往期活动<span class="acthead_sub">OTHER INFORMATION</span>
        </h3>
        <div class="period-list">
          <div class="actlist" v-for="(past, index) in pastActList" :key="index">
            <div class="actlist-bk">
              <!-- 活动类型 -->
              <span class="theme" v-if="past.themeType === 1">官方<br>活动</span>
              <span class="theme" v-if="past.themeType === 2">合作<br>活动</span>
              <span class="theme" v-if="past.themeType === 3">酒展</span>
              <!-- 活动状态 -->
              <span class="status sign" v-if="past.status === 1">报名中</span>
              <span class="status carry" v-if="past.status === 2 || past.status === 3">进行中</span>
              <span class="status ends" v-if="past.status === 4">已结束</span>
            </div>
            <div class="actlist-head">
              <span class="head">第{{past.period}}期 | {{past.theme}}</span>
              <span class="subhead">{{past.title}}</span>
            </div>
            <div class="actlist-same">活动时间：{{past._strTime}}</div>
            <div class="actlist-same">活动地点：{{past._dz}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="btns-group">
      <div class="btnitem btncor1" v-if="activeStatus === '0'" @click="toSignup">立即报名</div>
      <div class="btnitem btncor2" v-if="activeStatus === '1'">已报名</div>
      <div class="btnitem btncor3" v-if="activeStatus === '2'">报名结束</div>
      <div class="btnitem btncor3" v-if="activeStatus === '3'">未开始</div>
      <div class="btnitem btncor2" v-if="activeStatus === '4'">进行中</div>
      <div class="btnitem btncor4" v-if="activeStatus === '5'" @click="tovote">参与投票</div>
      <div class="btnitem btncor5" v-if="activeStatus === '6'">已投票</div>
      <div class="btnitem btncor6" v-if="activeStatus === '7'">投票结束</div>
      <div class="btnitem btncor7" v-if="activeStatus === '8'">活动结束</div>
      <div class="btnitem btncor7" v-if="activeStatus === '9'">活动已下线</div>
    </div>
    <!-- 报名弹窗 satart -->
    <transition name="slide-bottom">
      <div class="signup" v-show="showsignup">
        <div class="signup-head">
          活动报名
          <div class="singup_close" @click="hidefn"></div>
        </div>
        <div class="signup-item">
          <div class="item_l">姓名</div>
          <div class="item_r">
            <input type="text"  v-model="signName" placeholder="请输入姓名" />
          </div>
        </div>
        <div class="signup-item">
          <div class="item_l">联系号码</div>
          <div class="item_r">
            <input type="text" v-model="signPhone" placeholder="请输入联系号码" />
          </div>
        </div>
        <div class="signup-btn" @click="signupfn">确定</div>
      </div>
    </transition>
    <transition name="fade">
      <div class="modal" v-show="showsignup" @click="hidefn"></div>
    </transition>
    <!-- 报名弹窗 end -->
  </div>
</template>
<script>
  import { munityApi } from '~/api/community'
  import tools from '~/utils/tools'
  export default {
    asyncData (req) {
      const munityId = req.params.id
      const detFn = munityApi.serverDetail(munityId, req)
      const voteFn = munityApi.serverVote(munityId, req)
      return Promise.all([detFn, voteFn]).then(([detRes, voteRes]) => {
        if (detRes.code === 200 && voteRes.code === 200) {
          const detData = detRes.data
          // 流程, 盲品， 大咖
          let { processReqList, blindTastingRespList, activityPersonRespList } = detData
          processReqList = processReqList.map(item => {
            const { startProcess, endProcess } = item
            item._strTime = tools.concatDate(startProcess, endProcess)
            return item
          })
          // 酒款
          const { goodsMinimalRespList, activityOtherGoodsRespList } = detData
          // 报名截止时间, 报名须知
          let { deadline, startTime, endTime } = detData
          let _staEndtime
          if (deadline) {
            let objtime = new Date(deadline)
            deadline = tools.formatDate(objtime, { ifMinutes: true })
          }
          if (startTime && endTime) {
            _staEndtime = tools.concatDate(startTime, endTime)
          }
          let { province, city, district, address } = detData
          let __province = tools.getStrIndex(province)
          let __city = tools.getStrIndex(city)
          let __district = tools.getStrIndex(district)
          let detAddress = __province + __city + __district + address
          let _appdetail = { _staEndtime, deadline, detAddress }
          //  往期
          let { activityPastRespList } = detData
          let _pastList = []
          if (Array.isArray(activityPastRespList)) {
            _pastList = activityPastRespList.map(v => {
              // 处理地址
              const { province, city, district, address } = v
              const _province = tools.getStrIndex(province)
              const _city = tools.getStrIndex(city)
              const _district = tools.getStrIndex(district)
              const _dz = _province + _city + _district + address
              const { createdAt, endTime } = v
              // 处理时间
              const _strTime = tools.concatDate(createdAt, endTime)
              v._dz = _dz
              v._strTime = _strTime
              return v
            })
          }
          // 投票
          const voteData = voteRes.data
          const { blindStatisticsRespList } = voteData
          let _votelist = []
          _votelist = blindStatisticsRespList.map((v, index) => {
            let { showImg, name, priceRmb, priceForeign } = blindTastingRespList[index]
            v.showImg = showImg
            v.name = name
            v.priceRmb = priceRmb
            v.priceForeign = priceForeign
            return v
          })
          /*
           * queryNum '1' index页面； '2' mymunity
           * ----------------------------
           * ifSignUp 当前用户是否已报名
           * status 活动状态（1:报名中 2:报名结束 3:进行中 4:已结束 5:已下线）
           * voteStatus 活动投票状态（1:未开始 2:已开始 3:已结束）
           * ifVote 当前用户是否已投票
           * -------- 判断 ------------
           * 立即报名
           * status = 1 && ifSignUp = false
           * 已报名
           * (status = 1 || status = 2) && ifSignUp = true && queryNum === '1'
           * 报名结束
           * status = 2 && ifSignUp = false
           * 未开始
           * (status = 1 || status = 2) && queryNum === '2'
           * 进行中
           * status = 3 && voteStatus = 1
           * 参与投票
           * status = 3 && voteStatus = 2 && ifVote = false
           * 已投票
           * status = 3 && voteStatus = 2 && ifVote = true
           * 投票结束
           * status = 3 && voteStatus = 3 && ifVote = false
           * 活动结束
           * status = 4
           * 活动已下线
           * status = 5 && (从我的社区进入)
          */
          let _actstatus = '0'
          const queryNum = req.query.page
          const { ifSignUp, status, voteStatus, ifVote } = detData
          if (status === 1 && ifSignUp === false) {
            _actstatus = '0'
          } else if ((status === 1 || status === 2) && ifSignUp === true && queryNum === '1') {
            _actstatus = '1'
          } else if (status === 2 && ifSignUp === false) {
            _actstatus = '2'
          } else if ((status === 1 || status === 2) && queryNum === '2') {
            _actstatus = '3'
          } else if (status === 3 && voteStatus === 1) {
            _actstatus = '4'
          } else if (status === 3 && voteStatus === 2 && ifVote === false) {
            _actstatus = '5'
          } else if (status === 3 && voteStatus === 2 && ifVote === true) {
            _actstatus = '6'
          } else if (status === 3 && voteStatus === 3 && ifVote === false) {
            _actstatus = '7'
          } else if (status === 4) {
            _actstatus = '8'
          } else if (status === 5 && queryNum === '2') {
            _actstatus = '9'
          }
          // console.log('status', status)
          // console.log('voteStatus', voteStatus)
          // console.log('ifVote', ifVote)
          return {
            communityId: munityId,
            detailInfo: detData,
            processList: processReqList,
            blindList: blindTastingRespList,
            voteList: _votelist,
            bigshotList: activityPersonRespList,
            buygoodsList: goodsMinimalRespList,
            othergoodsList: activityOtherGoodsRespList,
            pastActList: _pastList,
            applicationDetail: _appdetail,
            votestatus: voteStatus,
            activeStatus: _actstatus
          }
        }
      })
    },
    data () {
      return {
        communityId: '', // 活动id
        detailInfo: {}, // 全部信息
        processList: [], // 活动流程
        blindList: [], // 盲品
        voteList: [], // 盲品投票后
        bigshotList: [], // 大咖
        buygoodsList: [], // 在售酒款
        othergoodsList: [], // 其它酒款
        pastActList: [], // 往期活动
        regDeadtime: '', // 报名截止时间
        applicationDetail: {}, // 报名详情
        votestatus: null,
        activeStatus: '0', // 活动状态
        showsignup: false, // 报名弹窗
        signName: '',
        signPhone: '',
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
    },
    mounted () {
    },
    methods: {
      toSignup () {
        // 去报名
        this.showsignup = true
      },
      hidefn () {
        this.showsignup = false
        this.signName = ''
        this.signPhone = ''
      },
      async signupfn () {
        if (this.signName === '') {
          this.$toast('请输入姓名')
          return
        }
        let _phone = this.signPhone
        let myRe = /^1[34578]{1}\d{9}$/
        let isphone = myRe.test(_phone)
        // console.log('isphone', isphone)
        if (!isphone) {
          this.$toast('请输入正确联系号码')
          this.signPhone = ''
          return
        }
        let params = {
          activityId: this.communityId,
          contact: this.signName,
          phone: this.signPhone
        }
        const { code, data } = await munityApi.clientSignup(params)
        if (code === 200) {
          console.log(data)
          this.activeStatus = '1'
          this.$toast.success('报名成功')
          this.hidefn()
        } else if (code === 506) {
          window.location.href = '/account/login'
        }
      },
      tovote () {
        // 去投票
        window.location.href = '/community/vote?communityId=' + this.communityId
      }
    }
  }
</script>
<style lang="less" scoped>
.munitydeatil {
  height: 100vh;
  &.defscroll {
    max-height: 100vh;
    overflow: hidden;
  }

  .signup {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 110;
    width: 335px;
    background: #fff;    
    border-radius: 4px;
    padding: 0 20px 20px;
    box-sizing: border-box;
    &-head {
      position: relative;
      font-size:19px;
      font-family:PingFangSC-Semibold;
      font-weight:600;
      color:rgba(51,51,51,1);
      text-align: center;
      padding-top: 30px;
      padding-bottom: 5px;
      .singup_close {
        position: absolute;
        top: 26px;
        right: 0;
        width: 29px;
        height: 29px;
        background-image: url('~/assets/img/Icons/ic_off_b_18x18@2x.png');
        background-size: 18px 18px;
        background-position: center center;
        background-repeat: no-repeat;
      }
    }
    &-item {
      display: flex;
      align-items: center;
      height: 65px;
      border-bottom: 1PX solid #EFEFEF;
      .item_l {
        width: 80px;
        min-width: 80px;
        max-width: 80px;
        flex-grow: 0;
        font-size:16px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(51,51,51,1);
      }
      .item_r {
        flex-grow: 1;
        overflow: hidden;
        font-size:16px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(199,199,199,1);
      }
    }
    &-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      height:42px;
      background:rgba(3,161,205,1);
      border-radius:4px;
      font-size:15px;
      font-family:PingFangSC-Medium;
      font-weight:500;
      color:rgba(255,255,255,1);
      margin-top: 40px
    }
  }

  .modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 30;
    background: rgba(0,0,0,0.6);
    width: 100%;
    height: 100vh;
    z-index: 100;
  }

}
.comDetail {
  font-size: 14px;
  height: 100vh;
  background: #F5F5F5;
  padding-bottom: 50px;
  overflow: auto;
  box-sizing: border-box;


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
          // max-width: 100%;
          // max-height: 100%;
          width: 76px;
          height: 172px;
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
          z-index: 20;

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
          margin-left: -90px;
          .bg_cover;
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
                width: 210px;
                margin: 15px 0;
                &_l {
                  width: 80px;
                  font-size: 12px;
                  font-family: PingFang-SC-Regular;
                  font-weight: 400;
                  color: @cor_666;
                }
                &_r {
                  position: relative;
                  width: 120px;
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
      padding-top: 15px;
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
.btns-group {
  width: 100%;
  height: 50px;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 30;
  .btnitem {
    display: flex;
    height: 50px;
    align-items: center;
    justify-content: center;
    font-size:18px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(255,255,255,1);
  }
  .btncor1 {
    background: #59C3E1;
  }
  .btncor2 {
    background: #03A1CD;
  }
  .btncor3 {
    background: #CCCCCC;
  }
  .btncor4 {
    background: #F99C00;
  }
  .btncor5 {
    background: #F99C00;
  }
  .btncor6 {
    background: #F99C00;
  }
  .btncor7 {
    background: #CCCCCC;
  }
}
</style>