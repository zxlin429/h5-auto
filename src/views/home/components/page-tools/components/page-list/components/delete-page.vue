<!--
 * @Author       : zxlin
 * @Date         : 2023-05-02 17:41:07
 * @LastEditors  : zxlin
 * @LastEditTime : 2023-05-02 18:16:39
 * @FilePath     : /h5-auto/src/views/home/components/page-tools/components/page-list/components/delete-page.vue
 * @Description  : 
-->
<template>
  <div class="add-type" @click.stop>
    <el-dialog v-model="dialogVisible" title="删除" width="400px">
      是否删除此页面?
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleChangeDialogVisible(false)">
            关闭
          </el-button>
          <el-button type="primary" @click="handleClose()"> 删除 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { ElMessage } from 'element-plus';
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  typeId: String,
});
const emits = defineEmits(['update:modelValue', 'delete']);
const dialogVisible = computed({
  get: () => {
    return props.modelValue;
  },
  set: (value) => {
    handleChangeDialogVisible(value);
  },
});

function handleClose() {
  emits('delete');
  handleChangeDialogVisible(false);
  ElMessage({
    message: '删除成功',
    type: 'success',
  });
}
function handleChangeDialogVisible(value: boolean) {
  emits('update:modelValue', value);
}
</script>
<style scoped>
.el-row + .el-row {
  margin-top: 10px;
}
</style>
