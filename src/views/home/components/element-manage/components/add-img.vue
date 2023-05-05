<!--
 * @Author       : zxlin
 * @Date         : 2023-05-05 10:32:59
 * @LastEditors  : zxlin
 * @LastEditTime : 2023-05-05 16:28:17
 * @FilePath     : \h5-auto\src\views\home\components\element-manage\components\add-img.vue
 * @Description  : 添加图片
-->
<template>
  <div class="add-img">
    <el-dialog v-model="dialogVisible" title="添加图片" width="400px">
      <el-row>
        <el-col :span="24">
          <label class="file">
            <el-icon :size="30"><Plus /></el-icon>
            <input
              type="file"
              ref="file"
              placeholder="请选择图片"
              @change="changePath"
              accept="image/png, image/jpeg"
            />
          </label>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4"><div>路径:</div></el-col>
        <el-col :span="20">
          <el-input v-model="imgInfo.path" placeholder="请输入图片路径" />
        </el-col>
      </el-row>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleChangeDialogVisible(false)">
            关闭
          </el-button>
          <el-button type="primary" @click="handleClose()"> 添加 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { saveImg } from '@/views/home/hooks/useElement';
import { Plus } from '@element-plus/icons-vue';
import { useStore } from 'vuex';
const store = useStore();
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
const imgInfo = ref({
  path: '',
});
const file: any = ref(null);
async function handleClose() {
  if (!imgInfo.value.path) {
    ElMessage({
      message: '请输入图片路径',
      type: 'error',
    });
    return false;
  }
  const res = await saveImg(store)(file.value.files, imgInfo.value.path);
  if (res) {
    handleChangeDialogVisible(false);
    ElMessage({
      message: '添加成功',
      type: 'success',
    });
  } else {
    ElMessage({
      message: '添加失败',
      type: 'error',
    });
  }
}
function handleChangeDialogVisible(value: boolean) {
  emits('update:modelValue', value);
}
function changePath(e: any) {
  if (!imgInfo.value.path) {
    imgInfo.value.path = e.target?.files[0].name;
  }
}
</script>
<style scoped>
.el-row + .el-row {
  margin-top: 30px;
}
.el-col-4 {
  display: flex;
  align-items: center;
}
.file {
  width: 100px;
  height: 100px;
  display: flex;
  border: 2px solid #0b89f0;

  border-radius: 6px;
  justify-content: center;
  align-items: center;
  color: #0b89f0;
  margin: auto;
  cursor: pointer;
  transition: 0.4s;
}
.file:hover {
  background: #0b89f0;
  color: #fff;
}
.file input {
  display: none;
}
</style>
