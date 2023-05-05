<!--
 * @Author       : zxlin
 * @Date         : 2023-05-05 15:17:40
 * @LastEditors  : zxlin
 * @LastEditTime : 2023-05-05 16:21:47
 * @FilePath     : \h5-auto\src\views\home\components\element-manage\components\preview-img.vue
 * @Description  : 预览图片
-->
<template>
  <div class="preview-img" @click="handleChangeDialogVisible(false)">
    <el-image :src="previewImgSrc" />
  </div>
</template>
<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { getKey } from '@/views/home/hooks/useElement';
const props = defineProps({
  previewImgId: {
    type: String,
    default: '',
  },
});
const previewImgSrc = ref('');
watchEffect(async () => {
  let src = await getKey(props.previewImgId);
  previewImgSrc.value = src as string;
});

const emits = defineEmits(['update:modelValue']);
function handleChangeDialogVisible(value: boolean) {
  emits('update:modelValue', value);
}
</script>
<style scoped>
.preview-img {
  position: fixed;
  inset: 0;
  overflow: hidden;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
::v-deep .el-image img {
  -webkit-user-drag: none;
  max-width: 95vw;
  max-height: 95vh;
}
</style>
