<template>
  <div class="apply">
    <div class="apply-head">
      <div class="ic_back" @click="goback"></div>
      <div class="title">合作活动申请</div>
      <div class="ic_empty"></div>
    </div>
    <div class="apply-main">
      <div class="actname">
        <div class="actname-title">活动名称</div>
        <input class="actname-input" type="text" placeholder="输入活动名称" />
      </div>
      <div class="acttype">
        <div class="acttype-title">活动类型</div>
        <div class="acttype-items">
          <div class="acttype_item active">个人酒会策划</div>
          <div class="acttype_item">企业酒会策划</div>
        </div>
      </div>
      <div class="actselect">
        <div class="actselect-top">
          <div class="top_title">活动时间</div>
          <div class="top_radio">
            <div class="radio-item radio-one">待定</div>
            <div class="radio-item active">指定时间</div>
          </div>
        </div>
        <div class="actselect-item actselect-start">
          <p>选择开始时间</p>
        </div>
        <div class="actselect-item">
          <p>选择结束时间</p>
        </div>
      </div>
      <div class="actselect">
        <div class="actselect-top">
          <div class="top_title">活动地点</div>
          <div class="top_radio">
            <div class="radio-item radio-one">待定</div>
            <div class="radio-item active">指定时间</div>
          </div>
        </div>
        <div class="actselect-item actselect-start">
          <p>省/市/区</p>
        </div>
        <div class="actselect-item">
          <p>详细地址</p>
        </div>
      </div>
      <div class="actinstro">
        <div class="actinstro-title">活动简介</div>
        <textarea class="actinstro-textarea" :maxlength="500" rows="6" placeholder="请填写活动简介"></textarea>
        <div class="actinstro-tip">0/500</div>
      </div>
      <div class="actperson">
        <div class="actperson-item">
          <div class="actperson_title">联系人</div>
          <input class="actperson_inp" type="text" placeholder="输入联系人称呼" />
        </div>
        <div class="actperson-item">
          <div class="actperson_title">联系电话</div>
          <input class="actperson_inp" type="text" placeholder="输入联系人电话" />
        </div>
      </div>
    </div>
    <div class="apply-submit">确认提交</div>
  </div>
</template>
<script>
  export default {
    methods: {
      goback () {
        window.location.href = '/community'
      }
    }
  }
</script>
<style lang="less" scoped>
.apply {
  height: 100vh;
  font-size: 14px;

  &-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 44px;
    border-bottom: 1PX solid #F1F1F1;
    padding-left: 10px;
    padding-right: 10px;

    .ic_back {
      width: 30px;
      height: 30px;
      background-image: url('~/assets/img/Icons/ic_return_b_30x30@2x.png');
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 8px 14px;
    }

    .ic_empty {
      width: 30px;
      height: 30px;
    }

    .title {
      font-size: 17px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
    }
  }

  &-main {
    height: calc(100vh - 45px);
    padding-bottom: 50px;
    background: #F5F5F5;
    overflow: auto;

    .actname {
      background: #fff;
      padding: 0 20px;

      &-title {
        font-size: 15px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        padding: 20px 0;
      }

      &-input {
        width: 100%;
        font-size: 15px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(204, 204, 204, 1);
        line-height: 15px;
        padding-bottom: 20px;
      }
    }

    .acttype {
      padding: 0 20px;
      background: #fff;

      &-title {
        font-size: 15px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        padding: 20px 0 15px;
      }

      &-items {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 30px;
      }

      &_item {
        width: 160px;
        text-align: center;
        font-size: 13px;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(153, 153, 153, 1);
        line-height: 13px;
        padding: 14px 0 13px;
        border: 1PX solid #F1F1F1;
        border-radius: 3px;

        &.active {
          background: #03A1CD;
          border: 1PX solid #03A1CD;
          font-size: 13px;
          font-family: PingFangSC-Semibold;
          font-weight: 600;
          color: rgba(255, 255, 255, 1);
        }
      }
    }

    .actselect {
      margin: 10px 0;
      padding-left: 20px;
      background: #fff;

      &-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 25px 20px 0 0;

        .top_title {
          font-size: 15px;
          font-family: PingFangSC-Medium;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
        }

        .top_radio {
          display: flex;
          align-items: center;

          .radio-one {
            margin-right: 30px;
          }

          .radio-item {
            font-size: 15px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
            padding-left: 30px;
            position: relative;

            &:before {
              content: '';
              width: 20px;
              height: 20px;
              border: 2PX solid #CCCCCC;
              box-sizing: border-box;
              border-radius: 50%;
              position: absolute;
              top: 50%;
              left: 0;
              transform: translateY(-50%);
            }

            &.active {
              &:befor {
                border: none;
                background-image: url('~/assets/img/Icons/ic_check_bule_20x20@2x.png');
                background-size: 20px;
                background-repeat: no-repeat;
                background-position: center center;
              }
            }
          }
        }
      }

      &-item {
        padding-top: 25px;
        padding-right: 20px;
        padding-bottom: 20px;

        &>p {
          position: relative;
          font-size: 15px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(204, 204, 204, 1);
          line-height: 15px;

          &:after {
            content: '';
            position: absolute;
            top: 50%;
            right: 0;
            transform: translateY(-50%);
            width: 7px;
            height: 10px;
            background-image: url('~/assets/img/Icons/ic_more_right_gray_12x12@2x.png');
            background-repeat: no-repeat;
            background-position: center right;
            background-size: 7px 10px;
          }
        }
      }

      &-start {
        border-bottom: 1PX solid #F1F1F1;
      }
    }

    .actinstro {
      margin: 10px 0;
      padding: 25px 20px;
      background: #fff;

      &-title {
        font-size: 15px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 15px;
        padding-bottom: 13px;
      }

      &-textarea {
        width: 100%;
        font-size: 15px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(199, 199, 199, 1);
        line-height: 20px;
      }

      &-tip {
        text-align: right;
        font-size: 15px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(199, 199, 199, 1);
        line-height: 15px;
        padding-top: 15px;
      }

    }

    .actperson {
      margin: 10px 0;
      padding-left: 20px;
      padding-bottom: 20px;
      background: #fff;

      &-item {
        border-bottom: 1PX solid #F1F1F1;
      }

      &_title {
        font-size: 15px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 15px;
        padding-top: 25px;
      }

      &_inp {
        padding-top: 20px;
        padding-bottom: 19px;
        font-size: 15px;
        line-height: 15px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(204, 204, 204, 1);
      }
    }
  }

  &-submit {
    width: 100%;
    height: 50px;
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: rgba(255, 255, 255, 1);
    background: #03A1CD;
    z-index: 20;
  }
}
</style>