<!--
 * @Author       : zxlin
 * @Date         : 2023-04-27 14:39:17
 * @LastEditors  : zxlin
 * @LastEditTime : 2023-05-03 19:13:49
 * @FilePath     : /h5-auto/src/views/home/Home-view.vue
 * @Description  : 
-->
<template>
  <div class="home-view page">
    <!-- 设备操作区 -->
    <div class="dev-tools">
      <dev-tools></dev-tools>
    </div>
    <!-- 元素操作区 -->
    <div class="element-tools">
      <element-tools></element-tools>
    </div>
    <!-- 相关管理操作区 -->
    <div class="manage-tools">
      <el-tabs v-model="activeTabsName" class="demo-tabs">
        <el-tab-pane label="项目管理" name="project">
          <!-- 项目管理 -->
          <project-manage></project-manage>
        </el-tab-pane>
        <el-tab-pane label="页面管理" name="page">
          <!-- 页面管理 -->
          <page-tools></page-tools>
        </el-tab-pane>
        <el-tab-pane label="图层管理" name="element">
          <!-- 页面管理 -->
          <page-manage></page-manage>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DevTools from './components/dev-tools/dev-tools.vue';
import ElementTools from './components/element-tools/element-tools.vue';
import PageTools from './components/page-tools/page-tools.vue';
import ProjectManage from './components/project-manage/project-manage.vue';
import PageManage from './components/page-manage/page-manage.vue';

const activeTabsName = ref('page');
</script>
<style scoped>
.home-view {
  display: flex;
}
.home-view > * {
  height: 100%;
}
.dev-tools {
  min-width: 480px;
  flex: 1;
}
.element-tools {
  width: 180px;
  flex-shrink: 0;
}
.manage-tools {
  width: 260px;
  flex-shrink: 0;
  border-right: 1px solid rgb(202, 205, 209);
}
::v-deep .el-tabs {
  height: 100%;
  display: flex;
  flex-direction: column;
}
::v-deep .el-tabs__header {
  margin-bottom: 0;
}
::v-deep .el-tab-pane {
  width: 100%;
  height: 100%;
}
::v-deep .el-tabs__item {
  padding: 0 30px;
}
::v-deep #tab-project,
::v-deep #tab-element {
  padding: 0;
}
::v-deep .el-tabs__content {
  flex: 1;
}
::v-deep .el-tabs__nav-scroll {
  display: flex;
  justify-content: center;
}
</style>
