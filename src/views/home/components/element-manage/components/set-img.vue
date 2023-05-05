<!--
 * @Author       : zxlin
 * @Date         : 2023-05-05 13:57:33
 * @LastEditors  : zxlin
 * @LastEditTime : 2023-05-05 15:02:12
 * @FilePath     : \h5-auto\src\views\home\components\element-manage\components\set-img.vue
 * @Description  : 设置图片
-->
<template>
  <div class="set-img">
    <el-dialog v-model="dialogVisible" title="设置图片" width="400px">
      <el-row>
        <el-col :span="24">
          <div class="img-box">
            <img :src="setImgSrc" width="144" />
          </div>
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
          <el-button type="danger" @click="deleteImg()"> 删除 </el-button>
          <el-button type="primary" @click="handleClose()"> 修改 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';
import { ElMessage } from 'element-plus';
import { useStore } from 'vuex';
import {
  getKey,
  getElementList,
  updateImg,
  removeImg,
} from '@/views/home/hooks/useElement';
const store = useStore();
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  setImgId: {
    type: String,
    default: '',
  },
});
const setImgSrc = ref('');
watchEffect(async () => {
  let src = await getKey(props.setImgId);
  setImgSrc.value = src as string;
});
getElementList().then((res: any) => {
  imgInfo.value.path = res.find(
    (i: { id: string }) => i.id === props.setImgId
  )?.path;
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
async function handleClose() {
  if (!imgInfo.value.path) {
    ElMessage({
      message: '请输入图片路径',
      type: 'error',
    });
    return false;
  }
  await updateImg(store)(props.setImgId, imgInfo.value.path);
  handleChangeDialogVisible(false);
  ElMessage({
    message: '修改成功',
    type: 'success',
  });
}
function handleChangeDialogVisible(value: boolean) {
  emits('update:modelValue', value);
}
async function deleteImg() {
  await removeImg(store)(props.setImgId);
  handleChangeDialogVisible(false);
  ElMessage({
    message: '删除成功',
    type: 'success',
  });
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
.img-box {
  display: inline-block;
  background-position: 0px 0px, 30px 30px;
  background-size: 12px 12px;
  background-image: linear-gradient(
      45deg,
      #eee 25%,
      transparent 25%,
      transparent 75%,
      #eee 75%,
      #eee 100%
    ),
    linear-gradient(45deg, #eee 25%, white 25%, white 75%, #eee 75%, #eee 100%);
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}
.img-box img {
  -webkit-user-drag: none;
  display: block;
}
</style>
