<template>
  <div class="person-vant">
    <van-popup v-model="showHead" position="bottom" @click-overlay="cancleFn">
      <div class="vant-items pics">
        <div class="vant-item camera">
          <Upload @on-success="onSuccess">
            <div>拍照</div>
          </Upload>
        </div>
        <div class="vant-item photos">从相册中选取</div>
      </div>
      <div class="vant-items" @click="cancleFn">
        <div class="vant-item">取消</div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import Upload from '~/components/Upload'
import { userApi } from '~/api/users'
export default {
  components: {
    Upload
  },
  data () {
    return {
      showHead: false
    }
  },
  mounted () {
    this.$bus.on('headStatus', v => {
      this.showHead = v
    })
  },
  methods: {
    cancleFn () {
      this.showHead = false
    },
    async onSuccess (val) {
      console.log('val', val)
      const { code, data } = await userApi.updateHeadImg(val)
      if (code === 200) {
        this.cancleFn()
        this.$bus.emit('editinfoChange', true)
      } else {
        this.$toast(data)
      }
    }
  },
  beforeDestroy () {
    this.$bus.off('headStatus')
  }
}
</script>
<style lang="less">
.person-vant {
  .van-popup {
    background: transparent;
  }

  .vant-items {
    margin: 10px;
    background: #fff;
    border-radius: 10px;

    .vant-item {
      width: 100%;
      height: 58px;
      font-size: 19px;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(0, 122, 255, 1);
      .flex_allCenter;
      .u-upload {
        font-size: 19px;
      }
    }

    .camera {
      border-bottom: 1PX solid @cor_border;
    }
  }
}

</style>