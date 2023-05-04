<!--
 * @Author       : zxlin
 * @Date         : 2023-05-02 20:09:38
 * @LastEditors  : zxlin
 * @LastEditTime : 2023-05-04 13:52:06
 * @FilePath     : \h5-auto\src\views\home\components\project-manage\project-manage.vue
 * @Description  : 项目管理
-->
<template>
  <div class="project-manage">
    <add-project></add-project>
    <project-list></project-list>
  </div>
</template>
<script setup lang="ts">
import AddProject from './components/add-project.vue';
import ProjectList from './components/project-list.vue';
</script>
<style scoped>
.project-manage {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
