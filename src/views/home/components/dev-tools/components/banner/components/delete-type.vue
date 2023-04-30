<!--
 * @Author       : zxlin
 * @Date         : 2023-04-28 14:46:35
 * @LastEditors  : zxlin
 * @LastEditTime : 2023-04-28 23:49:21
 * @FilePath     : /h5-auto/src/views/home/components/dev-tools/components/banner/components/delete-type.vue
 * @Description  : 
-->
<template>
  <div class="add-type">
    <el-dialog v-model="dialogVisible" title="删除" width="400px">
      是否删除此移动设备?
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
import { useStore } from 'vuex';
import useTypeList from '@/views/home/hooks/useTypeList';
const store = useStore();
let { deleteTypeList, typeList } = useTypeList(store);
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  typeId: String,
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
const typeId = computed(() => {
  return props.typeId ?? '';
});
function handleClose() {
  if (typeList.value.length > 1) {
    deleteTypeList(typeId.value);
    ElMessage({
      message: '删除成功',
      type: 'success',
    });
  } else {
    ElMessage({
      message: '移动设备小于等于1个,不能删除',
      type: 'error',
    });
  }
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
