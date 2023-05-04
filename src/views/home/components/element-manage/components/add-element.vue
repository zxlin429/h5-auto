<!--
 * @Author       : zxlin
 * @Date         : 2023-05-04 15:12:56
 * @LastEditors  : zxlin
 * @LastEditTime : 2023-05-04 15:51:11
 * @FilePath     : \h5-auto\src\views\home\components\element-manage\components\add-element.vue
 * @Description  : 元素添加
-->
<template>
  <div class="add-element">
    <div class="ele img">
      <el-icon :size="20"><PictureFilled /></el-icon>
      <span>图片</span>
    </div>
    <div class="ele text">
      <el-icon :size="20"><EditPen /></el-icon>
      <span>文字</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { PictureFilled, EditPen } from '@element-plus/icons-vue';
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
