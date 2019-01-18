<template>
  <div class="jarsclub">
    <div class="jars" v-for="(item, index) in poetryList" :key="index">
      <div class="jars-l">
        <p class="jars-l_d">{{ item.dd }}</p>
        <div class="jars-l_ym">{{ item.yymm }}</div>
      </div>
      <div class="jars-r">
        <div class="tip" v-if='item.checkSign'>酒坛诗社</div>
        <p>{{ item.content }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import { userApi } from '~/api/users'
export default {
  props: {
    poetryList: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      curInfo: {
        page: 1,
        count: 10
      },
      poetrys: []
    }
  },
  mounted () {
  },
  methods: {
    async getpoetry () {
      let params = { ...this.curInfo }
      const { code, data } = await userApi.windPoetry(params)
      if (code === 200) {
        let { array } = data
        this.poetrys = array.map(v => {
          let { content, createdAt } = v
          let date = new Date(createdAt)
          let yy = date.getFullYear()
          let mm = date.getMonth() + 1
          let dd = date.getDate()
          let yymm = yy + '/' + mm
          return { content, yymm, dd }
        })
        // console.log(this.poetrys, 'poetrys')
      }
    }
  }
}
</script>
<style lang="less" soped>
.jars {
  display: flex;
  padding: 25px 0;
  border-bottom: 1px solid @cor_border;
  &:first-child {
    padding-top: 0;
  }

  .jars-l {
    display: flex;
    flex-direction: column;
    width: 65px;
    height: 73px;
    border-radius: 8px;
    align-items: center;
    justify-content: center;
    background: -webkit-linear-gradient(135deg, #4FEDEF, #00A1F0);
    background: -o-linear-gradient(135deg, #4FEDEF, #00A1F0);
    background: -moz-linear-gradient(135deg, #4FEDEF, #00A1F0);
    background: linear-gradient(135deg, #4FEDEF, #00A1F0);

    &_d {
      font-size: 30px;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: rgba(255, 255, 255, 1);
      line-height: 30px;
      text-align: center;
    }

    &_ym {
      font-size: 12px;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 12px;
      text-align: center;
    }
  }

  .jars-r {
    flex: 1;
    padding-left: 15px;
    height: 73px;
    .tip {
      width: 60px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      background: #59C3E1;
      font-size: 12px;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: rgba(255, 255, 255, 1);
      border-radius: 2PX;
    }

    &>p {
      width: 100%;
      font-size: 14px;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(102, 102, 102, 1);
      line-height: 24px;
      word-break: break-all;
      overflow : hidden;
      text-overflow: ellipsis;
      display:-webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
}
</style>