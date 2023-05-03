<!--
 * @Author       : zxlin
 * @Date         : 2023-05-01 02:45:54
 * @LastEditors  : zxlin
 * @LastEditTime : 2023-05-02 16:48:15
 * @FilePath     : /h5-auto/src/views/home/components/page-tools/components/project-info/project-info.vue
 * @Description  : project-info
-->
<template>
  <div class="project-info">
    <span>
      <el-select v-model="currentProject" placeholder="请选择项目" size="small">
        <el-option
          v-for="item in projectList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
    </span>
  </div>
</template>
<script setup lang="ts">
import { useStore } from 'vuex';
import useProject from '@/views/home/hooks/useProject';
const store = useStore();
const { currentProject, projectList } = useProject(store);
</script>
<style scoped>
.project-info {
  height: 40px;
  border-bottom: 1px solid rgb(202, 205, 209);
  display: flex;
  justify-content: center;
  align-items: center;
}
.project-info > span {
  font-size: 14px;
  color: #333;
}
::v-deep .el-input__wrapper,
::v-deep .el-select:hover:not(.el-select--disabled) .el-input__wrapper,
::v-deep .el-select .el-input.is-focus .el-input__wrapper,
::v-deep .el-select .el-input.is-focus .el-input__wrapper,
::v-deep .el-select .el-input__wrapper.is-focus {
  box-shadow: none !important;
}
::v-deep .el-input__inner {
  text-align: center;
}
</style>
