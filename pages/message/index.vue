<template>
  <div class="message">
    <div class="tab">
      <span class="font_hight" :class="{'cur': type === 2}" @click='handleSelect(2)'>
        酒友消息
        <i v-if='signCount !== 0'><u>{{ signCount }}</u></i>
      </span>
      <span class="font_hight" :class="{'cur': type === 1}" @click='handleSelect(1)'>
        系统消息
        <i v-if='systemCount !== 0'><u>{{ systemCount }}</u></i>
      </span>
    </div>
    <section class="showcontents" :class="{'system' : type === 1}">
      <!-- 酒友消息 -->
      <template v-if='type === 2'>
        <van-swipe-cell :right-width="100" v-for="($v, $k) in msgData" :key="$k">
          <van-cell-group>
            <!-- xxx回复了您的评论(文章) -->
            <div class="showcontent" v-if='$v.serialNumber === 16 && $v.signInformationResp'>
              <a :href="setHref($v)">
                <div class="vessel">
                  <div class="vessel-t">
                    <div class="vessel-t_bk ib-middle" :style="'background: url(' + ($v.signInformationResp.headimgurl || defaulthead) + ') no-repeat center/contain'"></div>
                    <div class="vessel-t_user ib-middle">
                      <h4>{{ $v.signInformationResp.nickname }}</h4>
                      <time>{{ changeTime($v.signInformationResp.createdAt) }}</time>
                    </div>
                  </div>
                  <div class="vessel-b">
                    <div class="form">
                      回复了您在<em class="to-href"> 《{{ $v.articleName }}》 </em>的评论
                    </div>
                    <div class="reply">
                      {{ $v.signInformationResp.replyContent }}
                    </div>
                    <div class="my">
                      <div>
                        <span class="ib-middle head-img" :style="'background: url(' + (userData.headimgurl || defaulthead) + ') no-repeat center/contain'"></span>
                        <span class="ib-middle nick-name limit_one">{{ userData.nickname }}</span>
                      </div>
                      <p class="limit_one">{{ $v.content }}</p>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <!-- xxx回复了您的评论(商品) -->
            <div class="showcontent" v-if='$v.serialNumber === 16 && $v.goodInformationResp'>
              <a :href="'/detail/' + $v.goodInformationResp.goodId">
                <div class="vessel">
                  <div class="vessel-t">
                    <div class="vessel-t_bk ib-middle" :style="'background: url(' + ($v.goodInformationResp.headimgurl || defaulthead) + ') no-repeat center/contain'"></div>
                    <div class="vessel-t_user ib-middle">
                      <h4>{{ $v.goodInformationResp.nickname }}</h4>
                      <time>{{ changeTime($v.goodInformationResp.createdAt) }}</time>
                    </div>
                  </div>
                  <div class="vessel-b">
                    <div class="form">
                      回复了您在<em class="to-href"> 《{{ $v.goodInformationResp.goodName }}》 </em>的评论
                    </div>
                    <div class="reply">
                      {{ $v.goodInformationResp.replyContent }}
                    </div>
                    <div class="my">
                      <div>
                        <span class="ib-middle head-img" :style="'background: url(' + (userData.headimgurl || defaulthead) + ') no-repeat center/contain'"></span>
                        <span class="ib-middle nick-name limit_one">{{ userData.nickname }}</span>
                      </div>
                      <p class="limit_one">{{ $v.content }}</p>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <!-- xxx评论了文章 -->
            <div class="showcontent" v-if='$v.serialNumber === 17'>
              <a :href="setHref($v)">
                <div class="vessel">
                  <div class="vessel-t">
                    <div class="vessel-t_bk ib-middle" :style="'background: url(' + ($v.signInformationResp.headimgurl || defaulthead) + ') no-repeat center/contain'"></div>
                    <div class="vessel-t_user ib-middle">
                      <h4>{{ $v.signInformationResp.nickname }}</h4>
                      <time>{{ changeTime($v.signInformationResp.createdAt) }}</time>
                    </div>
                  </div>
                  <div class="vessel-b">
                    <div class="form">
                      评论了您的文章<em class="to-href"> 《{{ $v.articleName }}》 </em>
                    </div>
                    <div class="reply">
                      {{ $v.content }}
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <!-- 回答了商品的疑问 -->
            <div class="showcontent" v-if='$v.serialNumber === 18'>
              <a :href="'/detail/' + $v.goodInformationResp.goodId">
                <div class="vessel">
                  <div class="vessel-t">
                    <div class="vessel-t_bk ib-middle" :style="'background: url(' + ($v.goodInformationResp.headimgurl || defaulthead) + ') no-repeat center/contain'"></div>
                    <div class="vessel-t_user ib-middle">
                      <h4>{{ $v.goodInformationResp.nickname }}</h4>
                      <time>{{ changeTime($v.goodInformationResp.createdAt) }}</time>
                    </div>
                  </div>
                  <div class="vessel-b">
                    <div class="form">
                      回答了您在<em class="to-href"> 《{{ $v.goodInformationResp.goodName }}》 </em>的提问
                    </div>
                    <div class="reply">
                      {{ $v.goodInformationResp.replyContent }}
                    </div>
                    <div class="my">
                      <div>
                        <span class="ib-middle head-img" :style="'background: url(' + (userData.headimgurl || defaulthead) + ') no-repeat center/contain'"></span>
                        <span class="ib-middle nick-name limit_one">{{ userData.nickname }}</span>
                      </div>
                      <p class="limit_one">{{ $v.goodInformationResp.question }}</p>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <!-- xxx 打赏了你 -->
            <div class="showcontent" v-if='$v.serialNumber === 19'>
              <a :href="'/mine/reward'">
                <div class="vessel">
                  <div class="vessel-t">
                    <div class="vessel-t_bk ib-middle" :style="'background: url(' + ($v.signInformationResp.headimgurl || defaulthead) + ') no-repeat center/contain'"></div>
                    <div class="vessel-t_user ib-middle">
                      <h4>{{ $v.signInformationResp.nickname }}</h4>
                      <time>{{ changeTime($v.signInformationResp.createdAt) }}</time>
                    </div>
                  </div>
                  <div class="vessel-b">
                    <div class="form">
                      打赏了您<em class="to-price"> {{ $v.signInformationResp.amount }} 嗨币</em>
                    </div>
                    <div v-if="$v.articleName" class="my">
                      <div>
                        <span class="ib-middle head-img" :style="'background: url(' + (userData.headimgurl || defaulthead) + ') no-repeat center/contain'"></span>
                        <span class="ib-middle nick-name limit_one">{{ userData.nickname }}</span>
                      </div>
                      <p class="limit_one">发表文章<i class="to-href"> 《{{ $v.articleName }}》 </i></p>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </van-cell-group>
          <div slot="right" class="del_right" @click="rDelbtn($v.id)">
            删除
          </div>
        </van-swipe-cell>
      </template>

      <!-- 系统消息 -->
      <div class="system-info" v-if='type === 1'>
        <ul class="system-info-item">
          <li class="system-info-list" v-for="($v, $k) in msgData" :key="$k">
            <!-- 禁言 -->
            <!-- <div class="delete-icon" @click="rDelbtn($v.id)"></div> -->
            <template v-if="$v.serialNumber === 1">
              <div class="system-info-wrap">
                <h3 class="font_hight">{{ noticeTxt[$v.serialNumber - 1] }}</h3>
                <time>{{ changeTime($v.createdAt) }}</time>
                <p>{{ $v.content }}</p>
              </div>
            </template>
            <!-- 认证通过 -->
            <template v-if="$v.serialNumber === 3 || $v.serialNumber === 5">
              <div class="system-info-wrap">
                <a href="/prove">
                  <h3 class="font_hight">{{ noticeTxt[$v.serialNumber - 1] }}</h3>
                  <time>{{ changeTime($v.createdAt) }}</time>
                  <p>{{ $v.content }}</p>
                </a>
              </div>
            </template>
            <!-- 认证失败 -->
            <template v-if="$v.serialNumber === 2 || $v.serialNumber === 6">
              <div class="system-info-wrap">
                <a href="/prove">
                  <h3 class="font_hight">{{ noticeTxt[$v.serialNumber - 1] }}</h3>
                  <time>{{ changeTime($v.createdAt) }}</time>
                  <p>{{ $v.content }}</p>
                </a>
              </div>
            </template>
            <!-- 自定义(全站推送) -->
            <template v-if="$v.serialNumber === 8">
              <div class="system-info-wrap">
                <h3 class="font_hight">{{ $v.title }}</h3>
                <time>{{ changeTime($v.createdAt) }}</time>
                <p v-html='$v.content'></p>
              </div>
            </template>
            <!-- 优惠劵 -->
            <template v-if="$v.serialNumber === 9">
              <div class="system-info-wrap">
                <a href="/coupon/list">
                  <h3 class="font_hight">{{ noticeTxt[$v.serialNumber - 1] }}</h3>
                  <time>{{ changeTime($v.createdAt) }}</time>
                  <p>{{ $v.content }}</p>
                </a>
              </div>
            </template>
            <!-- 神评 -->
            <template v-if="$v.serialNumber === 10">
              <div class="system-info-wrap">
                <h3 class="font_hight">{{ noticeTxt[$v.serialNumber - 1] }}</h3>
                <time>{{ changeTime($v.createdAt) }}</time>
                <p>
                  亲爱的快海购用户，你的参与的文章《<a :href="setSystemHref($v)">{{ $v.articleName }}</a>》的评论：“{{ $v.content }}”被选为神评论，为您增加{{ $v.systemInfo.experiencePoints }}积分经验，并置顶显示该评论。
                </p>
              </div>
            </template>
            <!-- 知识分享被选为精彩绝伦 -->
            <template v-if="$v.serialNumber === 11">
              <div class="system-info-wrap">
                <h3 class="font_hight">{{ noticeTxt[$v.serialNumber - 1] }}</h3>
                <time>{{ changeTime($v.createdAt) }}</time>
                <p>亲爱的快海购用户，您发表的文章<a :href="setSystemHref($v)">《{{ $v.articleName }}》</a>被选为精彩绝伦，为您增加{{ $v.systemInfo.experiencePoints }}积分经验。</p>
              </div>
            </template>
            <!-- 酒坛诗社 -->
            <template v-if="$v.serialNumber === 12">
              <div class="system-info-wrap">
                <h3 class="font_hight">{{ noticeTxt[$v.serialNumber - 1] }}</h3>
                <time>{{ changeTime($v.createdAt) }}</time>
                <p>亲爱的快海购用户，您发表的签到：“ {{ $v.content }} ”被选为【酒坛诗社】，为您增加{{ $v.experiencePoints }}积分经验，并展示在首页轮播。</p>
              </div>
            </template>
            <!-- 热门评论 -->
            <template v-if="$v.serialNumber === 13">
              <div class="system-info-wrap">
                <h3 class="font_hight">{{ noticeTxt[$v.serialNumber - 1] }}</h3>
                <time>{{ changeTime($v.createdAt) }}</time>
                <p>
                  亲爱的快海购用户，你的发表的商品评论：“<a :href="'/detail/' + $v.no">{{ $v.content }}</a>”被推荐为热门评论，为您增加{{ $v.systemInfo.experiencePoints }}积分经验，并置顶显示该评论
                </p>
              </div>
            </template>
            <!-- 独立对用户推送 -->
            <template v-if="$v.serialNumber === 14">
              <div class="system-info-wrap">
                <h3 class="font_hight">{{ $v.title }}</h3>
                <time>{{ changeTime($v.createdAt) }}</time>
                <p v-html='$v.content'></p>
              </div>
            </template>
          </li>
        </ul>
      </div>

      <div class='more-loading' v-show='pageLoding'>
        <van-loading type="spinner" />
        <p>正在加载更多</p>
      </div>

      <div class="no-more" v-show='pageEmpty'>
        <p>没有更多内容了！</p>
      </div>
    </section>

  </div>
</template>
<script>
import { messageApi } from '@/api/message'
import { userApi } from '~/api/users'
import tools from '~/utils/tools'

export default {
  head () {
    return {
      title: '消息中心',
      meta: [
        { hid: 'title', name: 'title', content: '消息中心' }
      ]
    }
  },

  async asyncData (req) {
    const { code: userCode, data: userData } = await userApi.serverPostInfo(req)
    const { code: code2, data: data2 } = await userApi.serveGetNotifyNum(req)
    const { code: code1, data: data1 } = await messageApi.serverSystemInfo({ page: 1, count: 8, infoType: 2 }, req)
    if (code1 === 200 && userCode === 200) {
      let pageEmpty = false
      let signCount = 0
      let systemCount = 0
      if (code2 === 200) {
        signCount = data2.signCount
        systemCount = data2.systemCount
      }
      pageEmpty = data1.total <= 8
      return {
        userData: userData,
        msgData: data1.array || {},
        pageEmpty: pageEmpty,
        signCount: signCount,
        systemCount: systemCount
      }
    } else if (code1 === 506) {
      req.redirect('/account/login')
    }
  },

  data () {
    return {
      userData: {},
      type: 2,
      signCount: 0,
      systemCount: 0,

      msgData: [],

      defaulthead: this.defaulthead, // 默认头像

      pageEmpty: false,
      page: 1, // 当前页
      pageLoding: false, // 加载ing

      noticeTxt: ['禁言通知', '认证消息', '认证消息', '', '认证消息', '认证消息', '', '', '优惠卷信息', '神评榜 消息', '精彩绝伦榜 消息', '酒坛诗社 消息', '热门评论'] // 别问我为什么有几个空出来的，因为后台状态码就是这样的 =。 =
    }
  },

  mounted () {
    console.log(this.msgData)
    const content = document.querySelector('.showcontents')
    content.addEventListener('scroll', this.handleScroll(() => {
      this.eleHeight = content.clientHeight
      this.scrollHeight = content.scrollHeight
      let scrollTop = content.scrollTop
      // 距离底部大约200像素
      if (scrollTop + this.eleHeight >= this.scrollHeight - 200 && !this.pageLoding && !this.pageEmpty) {
        this.page += 1
        this.getData(this.page)
      }
    }))
  },

  methods: {
    async getData (page, needClear = false) {
      if (needClear) {
        var toast1 = this.$toast.loading({ message: '数据获取中', duration: 0, mask: true })
      }
      this.pageLoding = true
      const { code, data } = await messageApi.systemInfo({ page: page, count: 8, infoType: this.type })
      if (code === 200) {
        if (needClear) {
          this.msgData = data.array
          toast1.clear()
        } else {
          this.msgData.push(...data.array)
        }
        this.pageEmpty = this.page * 8 >= data.total
      } else {
        this.pageEmpty = false
      }
      this.pageLoding = false
    },
    // 切换类型
    handleSelect (type) {
      if (type === this.type) return false
      this.signCount = 0
      this.systemCount = 0
      this.type = type
      this.page = 1
      this.pageEmpty = false
      this.getData(this.page, true)
    },
    setHref (obj) {
      let href = ''
      switch (obj.signInformationResp.articleType) {
        case '1':
          href = '/knowledge/detail/' + obj.signInformationResp.articleId + '?type=' + obj.signInformationResp.type
          break
        case '2':
          href = '/news/detail?id=' + obj.signInformationResp.articleId
          break
        case '3':
          href = '/pickDetail?id=' + obj.signInformationResp.articleId
          break
        case '4':
          href = '/noun/detail/' + obj.signInformationResp.articleId + '?num=' + (+obj.signInformationResp.articleType - 4)
          break
        case '5':
          href = '/noun/detail/' + obj.signInformationResp.articleId + '?num=' + (+obj.signInformationResp.articleType - 4)
          break
        case '6':
          href = '/noun/detail/' + obj.signInformationResp.articleId + '?num=' + (+obj.signInformationResp.articleType - 4)
          break
      }
      return href
    },
    setSystemHref (obj) {
      let href = ''
      switch (obj.systemInfo.articleTypeEnum) {
        case 'SHARING_KNOWLEDGE':
          // 知识分享
          href = '/knowledge/detail/' + obj.no + '?type=' + obj.systemInfo.type
          break
        case 'NEWS':
          // 行业热点
          href = '/hotspot/detail/' + obj.no
          break
        case 'SELECTION':
          // 甄选
          href = '/selection/detail/' + obj.no
          break
        case 'BAIKE_VARIETY':
          // 百科品种
          href = '/noun/detail/' + obj.no + '?num=0'
          break
        case 'BAIKE_AREA':
          // 百科产区
          href = '/noun/detail/' + obj.no + '?num=1'
          break
        case 'BAIKE_WINERY':
          // 百科酒庄
          href = '/noun/detail/' + obj.no + '?num=2'
          break
      }
      return href
    },
    rDelbtn (id) {
      this.$dialog.confirm({
        message: '确定取消删除该消息吗？'
      }).then(async () => {
        const { code } = await messageApi.deleteSystemInfo(id)
        if (code === 200) {
          this.$toast.success('删除成功')
          this.page = 1
          this.pageEmpty = false
          this.getData(this.page, true)
        }
      })
    },
    handleScroll (fn) {
      let Switch = true
      return function () {
        if (!Switch) return
        Switch = false
        setTimeout(() => {
          fn.apply(this, arguments)
          Switch = true
        }, 150)
      }
    },
    changeTime (time) {
      time = new Date(time).getTime()
      return tools.timeago(time)
    }
  }
}
</script>
<style lang="less">
.message {
  line-height: 1;
  font-size: 12px;

  .topmdls {
    padding-left: 40px;
    padding-right: 40px;
    padding: 20px 40px 30px;
    .flex_between;

    .topmdl {
      &-top {
        width: 40px;
        height: 40px;
        .bg_cover;
        margin: 0 auto;
      }

      &-bottom {
        font-size: 14px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(51, 51, 51, 1);
        padding-top: 14px;
      }

      .top_bk1 {
        background-image: url('~assets/img/Icons/ic_xitongxiaoxi_40x40@2x.png');
      }

      .top_bk2 {
        background-image: url('~assets/img/Icons/ic_dashangtongzhi_40x40@2x.png');
      }

      .top_bk3 {
        background-image: url('~assets/img/Icons/ic_wodequan_40x40@2x.png');
      }
    }
  }

  .tab {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0;
    border-bottom: 1px solid #f1f1f1;
    padding: 13px 0;
    span {
      display: inline-block;
      font-size: 13px;
      padding: 0 66px;
      position: relative;
      color: #666;
      &:first-child {
        border-right: 1px solid #999;
      }
      &.cur {
        color: #333;
        &:after {
          content: '';
          position: absolute;
          left: 50%;
          bottom: -9px;
          width: 13px;
          height: 3PX;
          margin-left: -10px;
          background: #333;
          border-radius: 2px;
        }
      }
      i {
        position: absolute;
        min-width: 16PX;
        height: 16PX;
        background: #ff3333;
        border-radius: 16PX;
        font-size: 12PX;
        color: #fff;
        font-weight: lighter;
        right: 24%;
        top: -2px;
        transform: translateX(50%);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 5px;
        box-sizing: border-box;
        u {
          display: inline-block;
          transform: scale(.8);
        }
      }
    }
  }

  .showcontents {
    font-size: 0;
    height: ~'calc(100vh - 86px)';
    overflow: scroll;
    background: #f5f5f5;
    .del_right {
      background: #FB6248;
      width: 100PX;
      height: 100%;
      line-height: 44px;
      font-size: 17px;
      font-family: PingFangSC-Semibold;
      color: rgba(255, 255, 255, 1);
      .flex_allCenter;
    }

    .showcontent {
      padding-top: 20px;
      padding-bottom: 20px;
      border-bottom: 1px solid #f1f1f1;
      .padlr20;

      .vessel {
        width: 100%;
        .flex_between;
        flex-direction: column;

        &-l {
          width: 40px;

          &_bk {
            width: 40px;
            height: 40px;
            border-radius: 20px;
          }
        }

        &-r {
          width: calc(100% - 55px);

          &_top {
            padding-right: 40px;
            font-size: 14px;
            font-weight: bold;
            h4 {
              max-width: 80px;
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
            }
            span {
              font-size: 12px;
              color: #999;
              font-weight: normal;
            }

            &>time {
              float: right;
              margin-top: 2px;
              margin-right: -40px;
              font-size: 11px;
              font-family: PingFangSC-Light;
              font-weight: 300;
              color: @cor_999;
            }
          }
          &_bottom {
            padding-top: 10px;
            font-size:13px;
            line-height: 18px;
            &>span {
              font-size:13px;
              font-family:PingFangSC-Semibold;
              font-weight:600;
              color: @cor_333;
            }
            .red_import {
              color: #FB6248;
            }
          }
        }

        &-t {
          width: 100%;
          &_bk {
            width: 35px;
            height: 35px;
            border-radius: 50%;
            margin-right: 6px;
          }
          &_user {
            h4 {
              font-size: 13px;
              color: #333;
              margin-bottom: 8px;
            }
            time {
              font-size: 11px;
              color: #999;
            }
          }          
        }

        &-b {
          width: 100%;
          .form {
            font-size: 13px;
            color: #333;
            margin: 10px 0;
            line-height: 18px;
          }
          .reply {
            font-size: 13px;
            color: #666;
            line-height: 23px;
          }
          .my {
            margin-top: 10px;
            background: #fcfcfc;
            padding: 15px 15px 12px;
            border: 1px solid #F1F1F1;
            .head-img {
              width: 20px;
              height: 20px;
              border-radius: 50%;
              margin-right: 8px;
            }
            .nick-name {
              font-size: 12px;
              color: #333;
              max-width: 50%;
            }
            p {
              margin-top: 10px;
              color: #666;
              font-size: 12px;
              max-width: 50%;
            }
          }
        }

        .to-href {
          color: @c-primary;
        }
        .to-price {
          font-weight: bold;
          color: #FB6248;
          font-size: 13px;
        }
      }
    }
  }
}

.system-info {
  overflow: hidden;
  &-list {
    border-bottom: 1PX solid #F1F1F1;
    time {
      display: block;
      font-size: 11px;
      color: #999;
      margin-bottom: 10px;
    }
    h3 {
      margin-bottom: 7px;
      font-size: 14px;
      line-height: 1;
    }
    p {
      font-size: 13px;
      color: #666;
      line-height: 23px;
      a {
        color: #4285F4;
      }
    }
  }
  &-wrap {
    background: #fff;
    padding: 20px;
  }
}

[class*=van-hairline]::after {
  display: none;
}

.system-info-list{
  position:relative;
}
.delete-icon{
  position:absolute;
  top:42px;
  right:12px;
  width:14px;
  height:14px;
  background: url('~assets/img/ic_detele_g_14x14.png') no-repeat center/contain;
}
</style>