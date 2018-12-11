<template>
  <div class="jarsclub">
    <div class="jars" v-for="(item, index) in 5" :key="index">
      <div class="jars-l">
        <p class="jars-l_d">23</p>
        <div class="jars-l_ym">2018/08</div>
      </div>
      <div class="jars-r">
        <div class="tip">酒坛诗社</div>
        <p>品味杯中风情，曼妙醇香，未饮而醉，风情何止万种？品味杯中风情，曼妙醇香，</p>
      </div>
    </div>
  </div>
</template>
<style lang="less" soped>
.jars {
  display: flex;
  padding: 25px 0;
  border-bottom: 1px solid @cor_border;

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
    }

    &>p {
      font-size: 14px;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(102, 102, 102, 1);
      line-height: 24px;
    }
  }
}
</style>