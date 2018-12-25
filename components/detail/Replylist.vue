<template>
  <div class="u-reply">
    <section class="u-detail_header">
      <van-nav-bar title="评论详情" left-arrow @click-left='onClickLeft'>
        <van-icon name="fenxiang" slot="right" @click='report' />
      </van-nav-bar>
    </section>
    <div class="u_comment">
      <ul>
        <li class="u_comment-list" v-for="($v, $k) in replystr">
          <div class="header-img ib-middle" v-if='$v.personalInfoResp' :style="'background: url(' + $v.personalInfoResp.headimgurl + ') no-repeat center/cover'"></div>
          <div class="header-img ib-middle" v-else :style="'background: url(' + defaulthead + ') no-repeat center/cover'"></div>
          <div class="user-infor ib-middle">
            <span class="ib-middle" v-if='$v.personalInfoResp'>{{ $v.personalInfoResp.nickname || '' }}</span>
            <span class="ib-middle" v-else>匿名用户</span>
            <br>
            <u-usericon v-if='$v.personalInfoResp' :level='String($v.personalInfoResp.userGradeNumber)' type='1' :profess='String($v.personalInfoResp.category)' />
          </div>
          <!-- <div v-if='$v.evaluationLevel >= 4' class="like_type type1">
            <i></i>
            <span>超爱</span>
          </div> -->
          <div class="user-">
            <p class="desc">{{ $v.content || '此用户没有填写评论!' }}</p>

            <div class="other">
              <div class="time">{{ changeTime($v.createdAt) }}</div>
              <div class="fr">
                <span @click='reply($v.id)'>回复({{ $v.replyNum }})</span>
                <span @click='zan($v, $v.id, $v.ifLiked)'>
                  <i class="ib-middle"></i>
                  <u class="ib-middle">{{ $v.likeNum }}</u>
                </span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="u-reply-form" id="replay">
      <van-field @focus="da" class="ib-middle" v-model="replay" type="textarea" :placeholder="placeholder" rows="1" autosize maxlength="40" />
      <button class="ib-middle" @click="sayFn">回复</button>
    </div>
    <!-- 举报 -->
    <van-actionsheet class="report" v-model="showReport" :actions="actions" @select="onSelect" />
  </div>
</template>
<script>
import tools from '~/utils/tools'
import uUsericon from '~/components/Usericon'
export default {
  components: {
    uUsericon
  },
  props: {
    replystr: {
      Type: Array,
      default: []
    }
  },
  data () {
    return {
      defaulthead: this.defaulthead,

      listshow: false,
      showReport: false,
      replay: '',
      placeholder: 'please tell me why.',
      actions: [{
        name: '举报'
      }, {
        name: '取消'
      }]
    }
  },
  watch: {
    replystr (val) {
      console.log('val', val)
    }
  },
  methods: {
    onClickLeft () {
      document.body.classList = ''
      window.location.hash = ''
      console.log('this is onClickLeft')
      this.listshow = false
    },
    sayFn () {
      // this.getStr = '1'
      // console.log(this.getStr, 'getStr')
    },
    da () {},
    report () {
      this.showReport = true
    },
    onSelect (item) {
      if (item.name === '举报') {
        this.showReport = false
        this.$dialog.confirm({
          title: '确定举报此人吗'
        }).then(() => {
          this.$Toast('举报成功')
        }).catch(() => {})
      } else {
        this.showReport = false
      }
    },
    changeTime (time) {
      time = new Date(time).getTime()
      return tools.timeago(time)
    }
  }
}
</script>
<style lang="less" scoped>
.u-reply {
  position: fixed;
  z-index: 10000;
  top: 0;
  left: 0;
  border-box: box-sizing;
  transform: translateX(100%);
  transition: ease .5s transform;
  background: #fff;

  &.show {
    transform: none;
  }

  &-wrap {
    padding: 20px;

    .reply-common {
      border-bottom: 1PX solid #f1f1f1;

      .header-img {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 10px;
      }

      .user-infor {
        span {
          font-size: 15px;
          color: #333;
          font-family: 'PingFangSC-Semibold';
          font-weight: bold;
          margin-bottom: 5px;
        }

        &>div {
          i {
            width: 22px;
            height: 22px;
            border-radius: 50%;
            overflow: hidden;
            background-size: contain;
            background-position: center;
            background-repeat: no-repeat;
            display: inline-block;
            margin-right: 5px;
          }
        }
      }

      .like_type {
        float: right;
        background: red;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        overflow: hidden;
      }

      .desc {
        color: #333;
        font-family: 'PingFang-SC-Medium';
        line-height: 25px;
        text-align: justify;
        margin: 13px 0 20px;
        font-size: 15px;
      }
    }

    // 层主
    .layer-master {
      margin: 20px 0 0;
      box-sizing: border-box;
      height: calc(100vh - 295px);
      // height: 372px;
      overflow-x: hidden;
      overflow-y: scroll;
      border-bottom: 0;

      &-item {
        padding-bottom: 20px;

        &:last-child {
          padding-bottom: 0;
        }
      }

      .header-img {
        width: 40px;
        height: 40px;
      }

      .user-infor {
        span {
          font-size: 14px;
          font-weight: normal;
        }
      }

      .desc {
        padding-left: 58px;
        font-size: 14px;
        line-height: 19px;
      }

      .other {
        padding-left: 58px;
        padding-bottom: 22px;

        .time {
          font-size: 12px;
          color: #999;
          display: inline-block;
        }

        .fr {
          margin-top: -4px;

          &>span {
            display: inline-block;
            vertical-align: middle;
            font-family: 'PingFangSC-Medium';
            font-size: 12px;
            font-weight: bold;

            &:last-child {
              margin-left: 19px;
              color: #999;
              position: relative;
              top: -1PX;

              i {
                margin-right: 4px;
                display: inline-block;
                width: 16px;
                height: 16px;
                background: url("~/assets/img/Icons/ic_like_b_16x16@2x.png") no-repeat center/contain;
              }

              u {
                margin-top: 3px;
              }
            }
          }
        }
      }
    }
  }
}
</style>