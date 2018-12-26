<template>
  <div class="follow" ref="scrollElem">
    <com-head :titleConfig="getTitle"></com-head>
    <div class="follow-items">
      <div class="follow-item" v-for="(list, index) in lists" :key="index">
        <div class="item-l" :style="{background: `url(${list.headimgurl}) no-repeat center/cover`}"></div>
        <div class="item-c">
          <div class="item-c_name">
            <p class="name-world">{{ list.nickname }}</p>
            <p>
              <i class="ic-name ic-member"></i>
              <i class="ic-name ic-cms"></i>
            </p>
          </div>
          <div class="item-c_sign">
            <p>{{list.nickname }} </p>
          </div>
          <div class="item-c_count">
            <span>创作 {{ list.worksNumber }}</span>
            <span class="mar_l">粉丝 {{ list.fanNumber }}</span>
          </div>
        </div>
        <div class="item-r">
          <div class="item-gz item-xhgz" v-if="list.checkAttention && getNum === 2">相互关注</div>
          <div class="item-gz item-ygz" v-else-if="list.checkAttention">
            <div class="gz_level ygz_level"></div>
            <p>已关注</p>
          </div>
          <div class="item-gz item-wgz" v-else>
            <div class="gz_level wgz_level"></div>
            <p>关注</p>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import comHead from '~/components/com-head'
import { userApi } from '~/api/users'
export default {
  head () {
    return {
      title: '我的',
      meta: [
        { hid: 'title', name: 'title', content: '我的' }
      ]
    }
  },
  components: {
    comHead
  },
  data () {
    return {
      configtitle: '我的',
      lists: [],
      getNum: null,
      loadMore: true,
      loadOk: true,
      allPage: 1,
      nowPage: 1
    }
  },

  computed: {
    getTitle: function () {
      let contitle
      if (this.getNum === '1') {
        contitle = '我的关注'
      } else {
        contitle = '我的粉丝'
      }
      return contitle
    }
  },
  created () {
    this.getList()
  },
  async mounted () {
    window.addEventListener('scroll', () => {
      let winH = document.documentElement.clientHeight || document.body.clientHeight
      let elemBound = this.$refs.scrollElem.getBoundingClientRect()
      let _top = Math.abs(elemBound.top)
      let _height = elemBound.height
      let bottomH = _height - (_top + winH)
      if (bottomH <= 100) {
        if (this.loadOk && this.loadMore) {
          if (this.totalPageNo > this.nowPage) {
            this.loadOk = false
            this.curPoes.page += 1
            this.getArts()
          }
        }
      }
    })
  },
  methods: {
    async getList () {
      let quenum = this.$route.query.num
      this.getNum = quenum
      let nums = parseInt(quenum)
      let params = {
        page: 1,
        count: 10,
        number: nums // number 1 好友， 2 粉丝
      }
      const { code, data } = await userApi.friendlist(params)
      if (code === 200) {
        let { array, totalPageNo, page } = data
        this.lists = array
        this.allPage = totalPageNo
        this.nowPage = page
      }
      this.loadOk = true
    },
    headBack () {
      window.location.href = '/mine'
    }
  }
}
</script>
<style lang="less" scoped>
.follow {
  font-size: 12px;

  &-items {
    padding-left: 20px;

    .follow-item {
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
          background: #ccc;
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
            background-image: url('~/assets/img/Icons/ic_plus_w_12x12@2x.png')
          }

          .ygz_level {
            background-image: url('~/assets/img/Icons/ic_tick_w_12x12@2x.png')
          }
        }
        .item-wgz {
          background: #cccccc;
        }
        .item-ygz {
          background: #03A1CD;
        }
        .item-xhgz {
          background: #cccccc;
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
            width: 60%;
            overflow: hidden;
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
            background-image: url('~/assets/img/Icons/ic_membership_level2_22x22@2x.png');
          }

          .ic-cms {
            margin-left: 6px;
            background-image: url('~/assets/img/Icons/ic_cms_cs_22x22@2x.png');
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
  }
}
</style>

