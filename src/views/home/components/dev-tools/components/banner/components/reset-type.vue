<!--
 * @Author       : zxlin
 * @Date         : 2023-04-28 15:34:36
 * @LastEditors  : zxlin
 * @LastEditTime : 2023-04-28 15:38:48
 * @FilePath     : \h5-auto\src\views\home\components\dev-tools\components\banner\components\reset-type.vue
 * @Description  : 
-->
<template>
  <div class="add-type">
    <el-dialog v-model="dialogVisible" title="重置移动设备列表" width="400px">
      是否重置移动设备列表?
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
import { ElMessage } from 'element-plus';
import { useStore } from 'vuex';
import useTypeList from '../../hooks/useTypeList'; // 移动端尺寸管理
const store = useStore();
let { resetTypeList } = useTypeList(store);
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});
const emits = defineEmits(['update:modelValue']);
const dialogVisible = computed({
  get: () => {
    return props.modelValue;
  },
  set: (value) => {
    handleChangeDialogVisible(value);
  },
});

function handleClose() {
  resetTypeList();
  ElMessage({
    message: '重置成功',
    type: 'success',
  });
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
