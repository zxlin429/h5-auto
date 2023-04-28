<!--
 * @Author       : zxlin
 * @Date         : 2023-04-28 13:43:48
 * @LastEditors  : zxlin
 * @LastEditTime : 2023-04-28 14:54:26
 * @FilePath     : \h5-auto\src\views\home\components\dev-tools\components\banner\components\add-type.vue
 * @Description  : 
-->
<template>
  <div class="add-type">
    <el-dialog v-model="dialogVisible" title="添加移动设备" width="400px">
      <el-row>
        <el-col :span="4"><div>名称:</div></el-col>
        <el-col :span="20">
          <el-input
            v-model="phoneInfo.title"
            placeholder="请输入移动设备名称"
          />
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4"><div>宽/高:</div></el-col>
        <el-col :span="20">
          <el-row>
            <el-col :span="12">
              <el-input-number
                v-model="phoneInfo.size.width"
                :min="200"
                :step="10"
              />
            </el-col>
            <el-col :span="12">
              <el-input-number
                v-model="phoneInfo.size.height"
                :min="200"
                :step="10"
              />
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4"><div>DPR:</div></el-col>
        <el-col :span="20">
          <el-input-number
            v-model="phoneInfo.dpr"
            :min="1"
            :precision="2"
            :step="0.1"
          />
        </el-col>
      </el-row>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleChangeDialogVisible(false)">
            关闭
          </el-button>
          <el-button type="primary" @click="handleClose()"> 保存 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { useStore } from 'vuex';
import useTypeList from '../../hooks/useTypeList'; // 移动端尺寸管理
const store = useStore();
let { addTypeList, typeList } = useTypeList(store);
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
  if (!phoneInfo.value.title) {
    ElMessage({
      message: '请输入移动设备名称',
      type: 'error',
    });
    return false;
  }
  phoneInfo.value.id = `${typeList.value.length + 1}`;
  addTypeList(phoneInfo.value);
  handleChangeDialogVisible(false);
  ElMessage({
    message: '添加成功',
    type: 'success',
  });
}
function handleChangeDialogVisible(value: boolean) {
  emits('update:modelValue', value);
}

// 表单
const phoneInfo = ref({
  id: '',
  title: undefined,
  size: {
    width: 200,
    height: 200,
  },
  dpr: 1,
});
</script>
<style scoped>
.el-row + .el-row {
  margin-top: 10px;
}
</style>
