<template>
  <div class="person-vant">
    <van-popup v-model="showHead" position="bottom" @click-overlay="cancleFn">
      <div>
        <div class="vant-items pics">
         <!--  <div class="vant-item camera">
            <Upload @on-success="onSuccess">
              <div>拍照</div>
            </Upload>
          </div> -->
          <div class="vant-item photos">
            <Upload @on-success="onSuccess">
              <div>从相册中选取</div>
            </Upload>
          </div>
        </div>
        <div class="vant-items" @click="cancleFn">
          <div class="vant-item">取消</div>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import Upload from '~/components/Upload'
export default {
  components: {
    Upload
  },
  data () {
    return {
      showHead: false,
      isCrop: false,
      imgsrc: ''
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
    onSuccess (val) {
      this.imgsrc = val
      window.location.href = `/mine/imgcrop?imgsrc=${val}`
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

  .cropbody {
    width: 100%;
    height: 100vh;
    background: #000;
    text-align: center;
    .cropimg {
      display: inline-block;
      width: 100%;
      height: auto;
    }
  }
}

.imgcrip {
  width: 100%;
  height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  background-color: black;
  text-align: center;
  font-size: 14px;
}
button {
  appearance: none;
  -webkit-appearance: none;
  border: 0;
  background: none;
}

</style>