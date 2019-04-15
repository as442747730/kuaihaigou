<template>
  <div class="u-fans-follow" id='u-fans-follow'>
    <div class="follow-items">
      <div class="follow-item" v-for="($v, $k) in lists" :key="$k">
        <a :href="'/user?uid=' + $v.id">
          <div class="item-l" :style="{background: `url(${$v.headimgurl || require('~/assets/img/defaultImg.png')}) no-repeat center/cover`}"></div>
        </a>
        <div class="item-c">
          <div class="item-c_name">
            <p class="name-world">
              <a :href="'/user?uid=' + $v.id">{{ $v.nickname }}</a>
            </p>
            <p>
              <user-lab :level='String($v.userGradeNumber)' type='1' :profess='String($v.category)'></user-lab>
            </p>
          </div>
          <div class="item-c_sign">
            <p>{{$v.signature }} </p>
          </div>
          <div class="item-c_count">
            <span>创作 {{ $v.worksNumber }}</span>
            <span class="mar_l">粉丝 {{ $v.fanNumber }}</span>
          </div>
        </div>
        <div class="item-r" v-if='$v.id !== myId'>
          <!-- <div class="item-gz item-xhgz" v-if="$v.checkAttention">相互关注</div> -->
          <div class="item-gz item-ygz" v-if="$v.checkAttention" @click="followFriend($v)">
            <div class="gz_level ygz_level"></div>
            <p>已关注</p>
          </div>
          <div class="item-gz item-wgz" v-else @click="followFriend($v)">
            <div class="gz_level wgz_level"></div>
            <p>关注</p>
          </div>
          
        </div>
        <div class="item-r" v-else></div>
      </div>
    </div>

    <div class='more-loading' v-show='pageLoding'>
      <van-loading type="spinner" />
      <p>正在加载更多</p>
    </div>

    <div class="no-more" v-show='pageEmpty'>
      <p>没有更多内容了！</p>
    </div>
  </div>
</template>
<script>
import { personApi } from '@/api/users'
import userLab from '@/components/Usericon'

export default {
  components: {
    userLab
  },

  props: {
    lists: Array,
    type: Number,
    uid: String,
    myId: String,
    islogin: Boolean
  },

  data () {
    return {
      page: 2,
      pageLoding: false,
      pageEmpty: false
    }
  },

  mounted () {
    let ele = document.getElementById('u-fans-follow')
    ele.addEventListener('scroll', this.handleScroll(() => {
      this.eleHeight = ele.clientHeight
      this.scrollHeight = ele.scrollHeight
      let scrollTop = ele.scrollTop
      // 距离底部大约200像素
      if (scrollTop + this.eleHeight >= this.scrollHeight - 100 && !this.pageLoding && !this.pageEmpty) {
        this.page += 1
        this.getData(this.page)
      }
    }))
  },

  methods: {
    async getData () {
      this.pageLoding = true
      const { code, data } = await personApi.followFans({ page: this.page, count: 5, number: this.type, id: this.uid })
      if (code === 200) {
        this.lists = data.array
        this.pageEmpty = this.page * 5 >= data.total
      } else {
        this.pageEmpty = true
      }
      this.pageLoding = false
    },
    async followFriend (val) {
      if (!this.islogin) return this.$toast('请先登录！')
      const { code, data } = await personApi.followFriends(val.id)
      if (code === 200) {
        this.$toast(data)
        val.checkAttention = !val.checkAttention
      }
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
    }
  }

}
</script>
<style lang='less' scoped>
.u-fans-follow {
  width: 100vw;
  height: 100vh;
  background: #fff;
}

.follow-items {
  padding-left: 20px;
}
.follow-item {
  padding-left: 20px;
  display: flex;
  padding-right: 20px;
  padding: 25px 20px 25px 0;
  justify-content: space-between;
  border-top: 1PX solid @cor_border;

  &:first-child {
    border-top: none;
  }

  .item-l {
    width: 60px;
    height: 60px;
    background: #ccc;
    border-radius: 50%;
  }

  .item-r {
    width: 80px;

    .item-gz {
      width: 80px;
      height: 35px;
      background: #03A0CB;
      border-radius: 5px;
      font-size: 13px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      .flex_allCenter;

      .gz_level {
        width: 12px;
        height: 12px;
        margin-right: 4px;
        .bg_cover;
      }

      .wgz_level {
        background-image: url('~assets/img/Icons/ic_plus_w_12x12@2x.png')
      }

      .ygz_level {
        background-image: url('~assets/img/Icons/ic_tick_w_12x12@2x.png')
      }
    }
    .item-wgz {
      // background: #cccccc;
    }
    .item-ygz {
      background: #ccc;
    }
    .item-xhgz {
      background: #ccc;
    }
  }

  .item-c {
    width: calc(100% - 140px);
    padding: 0 25px 0 15px;
    box-sizing: border-box;

    &_name {
      display: flex;
      font-size: 15px;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
      line-height: 15px;
      align-items: center;
      margin-bottom: 8px;
      .name-world {
        max-width: 60%;
        margin-right: 5px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .ic-name {
        display: inline-flex;
        width: 21px;
        height: 21px;
        overflow: hidden;
        .bg_cover;
      }

      .ic-member {
        margin-left: 8px;
        background-image: url('~assets/img/Icons/ic_membership_level2_22x22@2x.png');
      }

      .ic-cms {
        margin-left: 6px;
        background-image: url('~assets/img/Icons/ic_cms_cs_22x22@2x.png');
      }
    }

    &_sign {
      font-size: 12px;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(187, 187, 187, 1);
      line-height: 12px;
      margin-bottom: 10px;
      .u-ellipsis;
    }

    &_count {
      font-size: 12px;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      line-height: 12px;

      .mar_l {
        margin-left: 15px;
      }
    }
  }
}
</style>