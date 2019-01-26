<template>
  <div class="selectiondetail">
    <div class="details">
      <h1 class="head">{{ articleDetail.title }}</h1>
      <div class="other">
        <span class="sub pick">甄选</span>
        <span class="sub">作者：{{ articleDetail.auth }}</span>
        <span class="sub view">{{ articleDetail.browseNum }}</span>
      </div>
      <div class="list" v-for="(elGood, index) in artList" :key="index">
        <div class="content content-wrapper" v-html="elGood.content"></div>
        <div class="wines" v-if="elGood.goodsMinimalResp">
          <div class="picklist">
            <div class="infos">
              <div class="infos-l" v-lazy:background-image="elGood.goodsMinimalResp.cover"></div>
              <div class="infos-r">
                <div class="rhead">{{elGood.goodsMinimalResp.goodsName}}</div>
                <p class="tags">
                  <span class="tagsub" v-for="(tagitem, tagIndex) in elGood.goodsMinimalResp.tagList" :key="tagIndex">{{tagitem}}</span>
                </p>
                <div class="lables">
                  <span class="label ic_year">{{elGood.goodsMinimalResp.year}}</span>
                  <span class="label ic_address">{{elGood.goodsMinimalResp._dz}}</span>
                  <span class="label ic_variety">{{elGood.goodsMinimalResp.variety}}</span>
                </div>
                <div class="probars">
                  <div class="word">复杂：{{elGood.goodsMinimalResp.complexity}}分</div>
                  <div class="probar">
                    <div class="probar_cors" ref="ubars" :data-bar="elGood.goodsMinimalResp.complexity"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--
      文章评论
      type -> 文章类型
      articelId -> 文章id
      ifLike -> 是否喜欢
      ifCollect -> 是否收藏
    -->
    <articel-comment type='3' :articelId='id' :ifLike='ifLike' :ifCollect='ifCollect'></articel-comment>
  </div>
</template>
<script>
import { selectApi } from '~/api/selection'
import articelComment from '@/components/articel/Comment'
export default {
  head () {
    return {
      title: '甄选文章',
      meta: [
        { hid: 'title', name: 'title', content: '甄选文章' }
      ]
    }
  },
  async asyncData (req) {
    const selectId = req.params.id
    const articleFn = selectApi.serverArticle(selectId, req)
    const { code: articleCode, data: articleData } = await articleFn
    if (articleCode === 200) {
      const { selectionGoodsRespList } = articleData
      return {
        articleDetail: articleData,
        artList: selectionGoodsRespList,
        id: selectId,
        ifCollect: articleData.ifCollect,
        ifLike: articleData.ifLike
      }
    }
  },
  components: { articelComment },
  data () {
    return {
      articleDetail: {},
      artList: [],
      ifCollect: false,
      ifLike: false
    }
  },
  mounted () {
    this.$nextTick(() => {
      let bars = this.$refs.ubars
      if (Array.isArray(bars)) {
        bars.map(v => {
          v.style.width = v.getAttribute('data-bar') + '%'
        })
      }
    })
  }
}
</script>
<style lang="less">
.selectiondetail {
  // font-size: 14px;
  padding-bottom: 50px;

  .details {
    background: #fff;
    padding: 0 20px 20px;

    .head {
      font-size: 19px;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
      padding-top: 20px;
    }

    .other {
      margin-top: 10px;

      .sub {
        font-size: 12px;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 18px;
      }

      .view {
        margin-left: 16px;
        padding-left: 22px;
        background-repeat: no-repeat;
        background-size: 18px 18px;
        background-position: left center;
        background-image: url('~/assets/img/Icons/ic_liulang_g_18x18@2x.png');
      }

      .sub.pick {
      	padding: 2px 6px;
        background: rgba(3, 161, 205, 1);
        border-radius: 2px;
        margin-right: 10px;
        font-size: 12px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(255, 255, 255, 1);
      }
    }

    .content {
      margin-top: 20px;
      font-size: 12px;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(153, 153, 153, 1);
      line-height: 25px;

      img {
        display: inline-block;
        max-width: 100%;
      }
    }

    .wines {
      margin: 25px 0;

      .picklist {
        // padding: 10px 20px;
        border: 1PX solid #eaeaea;
        border-radius: 8px;
        box-sizing: border-box;
        overflow: hidden;

        .infos {
          display: flex;
          padding: 10px 20px;

          &-l {
            width: 80px;
            height: 160px;
            .bg_cover;
          }

          &-r {
            width: calc(100% - 80px);
            flex-grow: 1;
            padding-left: 15px;
            box-sizing: border-box;

            .rhead {
              font-size: 16px;
              font-family: PingFangSC-Semibold;
              font-weight: 600;
              color: rgba(51, 51, 51, 1);
              line-height: 22px;
            }

            .tags {
              font-size: 12px;
              font-family: PingFang-SC-Regular;
              font-weight: 400;
              color: rgba(153, 153, 153, 1);
              margin-top: 10px;

              .tagsub {
                margin-top: 10px;

                &+.tagsub {
                  margin-left: 5px;
                  padding-left: 5px;
                  position: relative;

                  &:before {}
                }
              }
            }

            .lables {
              padding-top: 5px;
              margin-left: -7px;
              display: flex;
              align-items: center;
              flex-wrap: wrap;

              .label {
                padding-left: 30px;
                padding-right: 6px;
                margin-top: 10px;
                margin-left: 7px;
                line-height: 24px;
                background: rgba(222, 243, 249, 1);
                border-radius: 12px;
                font-size: 12px;
                font-family: PingFangSC-Semibold;
                font-weight: 600;
                color: rgba(3, 161, 205, 1);
                background-repeat: no-repeat;
                background-position: left center;
                background-size: 24px 24px;

                &:empty {
                  margin: 0;
                  padding: 0;
                }
              }

              .ic_year {
                background-image: url('~/assets/img/Icons/ic_time_24x24.png');
              }

              .ic_address {
                background-image: url('~/assets/img/Icons/ic_position_24x24.png');
              }

              .ic_variety {
                background-image: url('~/assets/img/Icons/ic_grape_24x24.png');
              }
            }

            .probars {
              display: flex;
              margin-top: 20px;

              .word {
                font-size: 12px;
                font-family: PingFang-SC-Regular;
                font-weight: 400;
                color: rgba(102, 102, 102, 1);
                line-height: 12px;
                margin-right: 10px;
              }

              .probar {
                width: 117px;
                flex-grow: 1;
                height: 10px;
                background: rgba(215, 242, 230, 1);
                border-radius: 6px;
                position: relative;

                &_cors {
                  position: absolute;
                  width: 30%;
                  height: 10px;
                  background: rgba(0, 230, 127, 1);
                  border-radius: 6px;
                  transition: width .2s;
                }
              }
            }
          }
        }
      }
    }
  }

}
</style>