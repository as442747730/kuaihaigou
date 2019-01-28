<template>
  <div class="vote">
    <div class="vote-main">
      <p class="tips">请为你感兴趣的盲品估个价，并从所有盲品中选择一款你“最喜欢”的酒</p>
      <div class="lists">
        <div class="list" v-for="(item, index) in blindList" :key="index">
          <div class="list-l">
            <div class="item-logo">
              <span>0{{index + 1}}</span>
            </div>
            <!-- <img class="item_img" v-lazy="require('~/assets/img/bitmap.png')" /> -->
            <img class="item_img" v-lazy="item.showImg" />
          </div>
            <div class="list-r">
              <div class="r-head">
                <h3>我的估价<span>（非必填）</span></h3>
                <div :class="['lab', {lab2: index === elIndex}]" @click="elblind(index)">
                  <span class="lab_icon"></span>
                </div>
              </div>
              <div class="inpbox">
                <span class="rmb">¥</span>
                <input :class="['inps', {inpafter: item.evaluate !== ''}]" type="number" placeholder="请输入您的估价" v-model="item.evaluate" @blur="blurFn(index)" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="vote-btns">
        <div class="btnitem" v-if="!ifVote" @click="voteFn">我要投票</div>
        <div class="btnitem" v-else @click="nextFn">下一步</div>
      </div>
    </div>
</template>
<script>
import { munityApi } from '~/api/community'
export default {
  async asyncData (req) {
    const munityId = req.query.communityId
    const { code, data } = await munityApi.serverDetail(munityId, req)
    if (code === 200) {
      let _blinds = data.blindTastingRespList
      _blinds = _blinds.map(v => {
        v.evaluate = ''
        return v
      })
      return { communityId: munityId, blindList: _blinds }
    }
  },
  data () {
    return {
      communityId: '',
      elIndex: null,
      blindList: [],
      ifVote: false
    }
  },
  methods: {
    elblind (index) {
      this.elIndex = index
    },
    blurFn (index) {
      let _evalute = this.blindList[index].evaluate
      let getprice = Number(_evalute).toFixed(2)
      let price = { evaluate: getprice }
      Object.assign(this.blindList[index], price)
    },
    async voteFn () {
      if (!this.elIndex && this.elIndex !== 0) {
        this.$toast('请选择你最喜欢的盲品')
        return
      }
      let objBlind = this.blindList.map((v, index) => {
        let { evaluate, id } = v
        if (evaluate === '') {
          evaluate = null
        }
        let ifLike = false
        if (index === this.elIndex) {
          ifLike = true
        }
        return {
          blindId: id,
          ifLike: ifLike,
          price: evaluate
        }
      })
      let params = {
        activityId: this.communityId,
        blindTastingVoteReqList: objBlind
      }
      const { code, data } = await munityApi.clicentVote(params)
      if (code === 200) {
        console.log(data)
        this.ifVote = true
        this.$toast.success('投票成功')
      } else {
        this.$toast.fail('投票失败')
      }
    },
    nextFn () {
      window.location.href = '/community/detail/' + this.communityId + '?page=1'
    }
  }
}
</script>
<style lang="less" scoped>
.vote {
  height: 100vh;
  background: #F5F5F5;

  .vote-main {
    height: calc(100vh - 50px);
    overflow: auto;

    .tips {
      font-size: 13px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: 20px;
      padding: 10px 20px;
    }
    .lists {
      padding: 0 20px;

      .list {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 120px;
        background: #fff;
        border-radius: 6px;
        padding: 0 10px;
        margin-top: 10px;
        margin-bottom: 20px;

        &-l {
          position: relative;
          width: 90px;
          min-width: 90px;
          max-width: 90px;
          height: 90px;
          flex-grow: 0;
          border: 1PX solid #E6E6E6;
          box-sizing: border-box;
          border-radius: 4px;
          text-align: center;

          .item-logo {
            position: absolute;
            left: 5px;
            top: 0;
            padding-top: 2px;
            width: 20px;
            text-align: center;
            background: #03A1CD;
            font-size: 13px;
            font-family: Impact;
            color: rgba(255, 255, 255, 1);
            line-height: 16px;
            z-index: 20;

            &>span {
              z-index: 30;
            }

            &:before {
              position: absolute;
              left: 0;
              bottom: -8px;
              content: '';
              width: 0;
              height: 0;
              border-style: solid;
              border-width: 0 0 10px 20px;
              border-color: transparent transparent transparent #03A1CD;
            }

            &:after {
              position: absolute;
              right: 0;
              bottom: -8px;
              content: '';
              width: 0;
              height: 0;
              border-style: solid;
              border-width: 0 20px 10px 0;
              border-color: transparent #03A1CD transparent transparent;
            }
          }

          .item_img {
            display: inline-block;
            width: 83px;
            height: 85px;
            border: none;
          }
        }

        &-r {
          flex-grow: 1;
          height: 90px;
          margin-left: 10px;
          position: relative;
          .r-head {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .lab {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 30px;
              height: 30px;
              
              .lab_icon {
                width: 20px;
                height: 20px;
                border: 2PX solid #ccc;
                box-sizing: border-box;
                border-radius: 50%;
              }

              &.lab2 {
                .lab_icon {
                  border: none;
                  background-image: url('~/assets/img/Icons/ic_check_bule_20x20@2x.png');
                  background-repeat: no-repeat;
                  background-position: center center;
                  background-size: 20px 20px;
                }
              }
            }

            &>h3 {
              font-size: 14px;
              font-family: PingFangSC-Semibold;
              font-weight: 600;
              color: rgba(51, 51, 51, 1);
              line-height: 20px;

              &>span {
                font-size: 12px;
                font-family: PingFangSC-Regular;
                color: #666666;
              }
            }
          }

          .inpbox {
            display: flex;
            width: 173px;
            // height: 32px;
            margin-top: 10px;
            background: rgba(245, 245, 245, 1);
            border-radius: 16px;
            padding: 0 10px;
            box-sizing: border-box;
            align-items: center;

            .rmb {
              font-size: 13px;
              font-family: PingFangSC-Semibold;
              font-weight: 600;
              color: rgba(51, 51, 51, 1);
              line-height: 13px;
            }

            .inps {
              width: 120px;
              margin-left: 5px;
              font-size: 13px;
              font-family: PingFang-SC-Medium;
              font-weight: 500;
              color: rgba(199, 199, 199, 1);
              background: rgba(245, 245, 245, 1);
              height: 13px;
              padding: 9px 0;

              &.inpafter {
                font-size: 15px;
                font-family: PingFangSC-Semibold;
                font-weight: 600;
                color: rgba(249, 156, 0, 1);
              }
            }
          }
        }
      }
    }

  }

  &-btns {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 50px;

    .btnitem {
      width: 100%;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #03A1CD;
      font-size: 18px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
    }
  }
}
</style>