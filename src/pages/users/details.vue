<template>
  <div class="live">
    <el-dialog :visible.sync="value" width="70%" :show-close="false">

      <div slot="footer" class="dialog-footer">
        <el-button @click="close">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
	props: {
		value: Boolean
	},
	data() {
		return {

		}
	},
	methods: {
		close() {
			this.$emit('input', false)
		}
	}
}
</script>