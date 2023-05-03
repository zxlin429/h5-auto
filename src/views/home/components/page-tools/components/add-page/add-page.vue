<!--
 * @Author       : zxlin
 * @Date         : 2023-05-01 02:25:54
 * @LastEditors  : zxlin
 * @LastEditTime : 2023-05-02 16:54:50
 * @FilePath     : /h5-auto/src/views/home/components/page-tools/components/add-page/add-page.vue
 * @Description  : add-page
-->
<template>
  <div class="add-page">
    <div class="add" @click="currentProjectObject.addPage()">
      <el-icon><Plus /></el-icon>
      <span>添加页面</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue';
import { useStore } from 'vuex';
import useProject from '@/views/home/hooks/useProject';
const store = useStore();
const { currentProjectObject } = useProject(store);
</script>
<style scoped>
.add-page {
  height: 60px;
  border-top: 1px solid rgb(202, 205, 209);
  background: rgb(247, 248, 248);
  display: flex;
  justify-content: center;
  align-items: center;
}
.add {
  width: 106px;
  height: 36px;
  background: #0b89f0;
  border-radius: 3px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  cursor: pointer;
  transition: 0.4s;
}
.add:hover {
  background-color: #2c72ff;
}
.add > span {
  margin-left: 4px;
}
</style>
