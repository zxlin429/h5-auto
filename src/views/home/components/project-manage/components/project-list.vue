<!--
 * @Author       : zxlin
 * @Date         : 2023-05-04 13:52:12
 * @LastEditors  : zxlin
 * @LastEditTime : 2023-05-04 14:46:09
 * @FilePath     : \h5-auto\src\views\home\components\project-manage\components\project-list.vue
 * @Description  : 项目列表
-->
<template>
  <div class="project-list">
    <el-collapse v-model="activeNames">
      <el-collapse-item
        v-for="project in projectList"
        :key="project.id"
        :title="project.name"
        :name="project.id"
      >
        <div class="card">
          <info-project :data="project"></info-project>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import InfoProject from './info-project.vue';
import { useStore } from 'vuex';
import useProject from '@/views/home/hooks/useProject';
const store = useStore();
const { projectList } = useProject(store);
const activeNames = ref(['1']);
</script>
<style scoped>
.project-list {
  flex: 1;
  overflow-y: auto;
}
.card {
  padding: 0 10px;
}
::v-deep .el-collapse-item__header {
  padding: 0 10px;
}
</style>
