<template>
  <div class="question">
    <div class="type">
      <div class="type-item">
        <div class="type_l">内容不完整</div>
        <div class="type_r"></div>
      </div>
      <div class="type-item">
        <div class="type_l">基本信息栏错误</div>
        <div class="type_r"></div>
      </div>
      <div class="type-item">
        <div class="type_l">图文不符</div>
        <div class="type_r"></div>
      </div>
      <div class="type-item">
        <div class="type_l">错别字</div>
        <div class="type_r"></div>
      </div>
      <div class="type-item">
        <div class="type_l">其他</div>
        <div class="type_r"></div>
      </div>
    </div>
    <div class="descript"></div>
    <div class="pics"></div>
  </div>
</template>
<style lang="less" scoped>
.question {
  background: #F5F5F5;
  
  .type {
    background: #FFFFFF;

    &-item {
      padding: 18px 30px 17px 20px;
      border-bottom: 1PX solid #F1F1F1;
      background: #fff;
    }
    &_l {
      font-size: 15px;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
    }
  }
}
</style>