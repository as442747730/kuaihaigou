<template>
  <div class="person">
    <com-head :titleConfig="configtitle"></com-head>
    <div class="person-main">
      <div class="person-head" @click="elheadFn">
        <img class="headimg" src="~/assets/img/Icons/ic_dashangtongzhi_40x40@2x.png" />
        <i class="ic_arrow"></i>
      </div>
      <div class="person-listone">
        <div class="lists">
          <list-one @click.native="editName('昵称', '哆来咪NIco')" list_left="昵称" list_right="哆来咪NIco"></list-one>
          <list-one @click.native="editSex(1)" list_left="性别" list_right="女"></list-one>
          <list-one list_left="生日" list_right="1994年09月12日">
            <div class="list-switch" slot="sl_l">
              <van-switch-cell active-color="#1ede47" size="24px" v-model="birshow" />
            </div>
          </list-one>
          <list-one @click.native="editSex(2)" list_left="居住地" list_right="广东省广州市天河区">
            <div class="list-switch" slot="sl_l">
              <van-switch-cell size="24px" v-model="addrshow" />
            </div>
          </list-one>
          <list-one @click.native="editFn('微信号')" list_left="微信号" list_right="未填写">
            <div class="list-switch" slot="sl_l">
              <van-switch-cell size="24px" v-model="wxshow" />
            </div>
          </list-one>
          <list-one @click.native="editFn('QQ')" list_left="QQ" list_right="未填写">
            <div class="list-switch" slot="sl_l">
              <van-switch-cell size="24px" v-model="wxshow" />
            </div>
          </list-one>
          <list-one @click.native="editFn('个性签名', '这不是一个一般的用户签名')" list_left="个性签名" list_right="这不是一个一般的用户签名"></list-one>
        </div>
        <div class="otherinfo">
          <h3>其他信息</h3>
          <p>让别的酒友更了解您</p>
        </div>
      </div>
      <div class="person-listtwo">
        <list-two title="什么时候开始喝葡萄酒" content="2014年"></list-two>
        <list-two title="最喜欢什么产区的葡萄酒" content="阿尔萨斯（Alsace）"></list-two>
        <list-two title="最喜欢什么品种的葡萄酒" content="——"></list-two>
        <list-two title="每个月喝多少瓶葡萄酒" content="1瓶"></list-two>
      </div>
    </div>
    <selectHead></selectHead>
    <editinfo></editinfo>
    <el-sex></el-sex>
  </div>
</template>
<script>
import comHead from '~/components/com-head'
import listOne from './_listOne'
import listTwo from './_listTwo'
import selectHead from './_selectHead'
import editinfo from './_editinfo'
import elSex from './_elSex'
export default {
  components: {
    comHead,
    listOne,
    listTwo,
    selectHead,
    editinfo,
    elSex
  },
  data () {
    return {
      configtitle: '个人信息',
      birshow: true,
      addrshow: false,
      wxshow: true
    }
  },
  methods: {
    elheadFn () {
      // 选择头像
      this.$bus.emit('headStatus', true)
    },
    editName (tit, value) {
      let tip = '昵称由3-10位汉字/字母/符号组成，首位不能是符号'
      this.editFn(tit, value, tip)
    },
    editFn (tit, value, tip) {
      /**
      * ltit => 昵称
      * value => 当前值
      */
      let _title = '编辑' + tit
      let _plholder = '请输入' + tit
      let configs = {
        isshow: true,
        title: _title,
        model: value,
        plholder: _plholder,
        tips: tip
      }
      this.$bus.emit('getConfigs', configs)
      window.location.hash = '#editinfo'
    },
    editSex (num) {
      let objs = {
        type: num,
        isshow: true
      }
      this.$bus.emit('elSexFn', objs)
    }
  }
}
</script>
<style lang="less" scoped>
.person {
  &-main {
    background: #F6F6F6;
  }

  &-head {
    height: 94px;
    background: #fff;
    padding: 0 20px;
    .flex_between;

    .headimg {
      width: 50px;
      width: 50px;
    }

    .ic_arrow {
      width: 8px;
      height: 12px;
      transform: rotate(180deg);
      background-image: url('~/assets/img/Icons/ic_return_b_30x30@2x.png');
      .bg_cover;
    }
  }

  &-listone {
    margin-top: 10px;

    .list-switch {
      margin-left: 30px;
    }
  }

  .otherinfo {
    padding: 18px 20px;

    h3 {
      font-size: 15px;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
      margin-bottom: 8px;
    }

    p {
      font-size: 12px;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(153, 153, 153, 1);
      line-height: 12px;
    }
  }
}
</style>