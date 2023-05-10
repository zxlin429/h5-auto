<!--
 * @Author       : zxlin
 * @Date         : 2023-05-04 15:12:56
 * @LastEditors  : zxlin
 * @LastEditTime : 2023-05-10 17:01:14
 * @FilePath     : \h5-auto\src\views\home\components\element-manage\components\add-element.vue
 * @Description  : 元素添加
-->
<template>
  <div class="add-element">
    <div class="ele img" @click="addElementVisible = true">
      <el-icon :size="20"><PictureFilled /></el-icon>
      <span>图片</span>
    </div>
    <div class="ele text" @click="addText">
      <el-icon :size="20"><EditPen /></el-icon>
      <span>文字</span>
    </div>
  </div>
  <add-img v-if="addElementVisible" v-model="addElementVisible"></add-img>
</template>
<script setup lang="ts">
import { PictureFilled, EditPen } from '@element-plus/icons-vue';
import AddImg from './add-img.vue';
import { ref } from 'vue';
import useProject from '@/views/home/hooks/useProject';
import { useStore } from 'vuex';
const store = useStore();
const { addText } = useProject(store);
const addElementVisible = ref(false);
</script>
<style scoped>
.add-element {
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.ele + .ele {
  margin-left: 8px;
}
.ele {
  width: 80px;
  height: 80px;
  border: 1px solid #e6ebed;
  color: #333;
  cursor: pointer;
  transition: 0.4s;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.ele > span {
  font-size: 12px;
  margin-top: 8px;
}
.ele:hover {
  background: rgba(18, 97, 255, 0.05);
  border-color: #1261ff;
}
</style>
