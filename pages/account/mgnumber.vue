<template>
  <div class="manage">
    <com-head :titleConfig="configtitle"></com-head>
    <div class="mange-in">
    	<section class="manage_sec">
	      <list-one list_left="手机号" list_right="138****8000"></list-one>
	      <list-one list_left="修改密码"></list-one>
    	</section>
      <div class="manage_title">账号绑定</div>
      <section class="manage_sec">
        <list-two l_one="微信" l_two="Winter"></list-two>
        <list-two l_one="QQ" l_two="500000000"></list-two>
      	<list-two l_one="微博" l_two="未绑定"></list-two>
      </section>
    </div>
  </div>
</template>
<script>
import comHead from '~/components/com-head'
import ListOne from '~/components/list/ListOne'
import ListTwo from '~/components/list/ListTwo'
export default {
  components: {
    comHead,
    ListOne,
    ListTwo
  },
  data () {
    return {
      configtitle: '账号管理',
      vanshow: true
    }
  },
  methods: {
  }
}
</script>
<style lang="less" scope>
.manage {
  &_title {
    width: 100%;
    height: 40px;
    line-height: 40px;
    background: #F6F6F6;
    font-size: 13px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: rgba(153, 153, 153, 1);
    padding: 0 20px;
  }
}
</style>