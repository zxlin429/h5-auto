<!--
 * @Author       : zxlin
 * @Date         : 2023-04-28 15:34:36
 * @LastEditors  : zxlin
 * @LastEditTime : 2023-05-04 14:34:21
 * @FilePath     : \h5-auto\src\views\home\components\project-manage\components\delete-project.vue
 * @Description  : delete-project
-->
<template>
  <div class="add-type">
    <el-dialog v-model="dialogVisible" title="删除" width="400px">
      是否删除此项目?
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleChangeDialogVisible(false)">
            关闭
          </el-button>
          <el-button type="primary" @click="handleClose()"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
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
