<template>
  <div class="selection">
    <temp-test></temp-test>
  </div>
</template>
<script>
import tempTest from '~/components/templates/temp2'
export default {
  components: {
    tempTest
  }
}
</script>
<style lang="less" scoped>
	.selection {
		margin-top: 10px;
		padding: 0 20px;
		font-size: 14px;
	}
</style>