<!--
 * @Author       : zxlin
 * @Date         : 2023-05-01 02:25:54
 * @LastEditors  : zxlin
 * @LastEditTime : 2023-05-04 14:50:33
 * @FilePath     : \h5-auto\src\views\home\components\page-tools\components\add-page\add-page.vue
 * @Description  : add-page
-->
<template>
  <div class="add-page">
    <el-button
      type="primary"
      :icon="Plus"
      @click="addPage(currentProjectObject)"
    >
      添加页面
    </el-button>
  </div>
</template>
<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue';
import { useStore } from 'vuex';
import useProject from '@/views/home/hooks/useProject';
const store = useStore();
const { currentProjectObject, addPage } = useProject(store);
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
</style>
