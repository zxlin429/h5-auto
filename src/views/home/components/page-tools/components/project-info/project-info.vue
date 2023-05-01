<!--
 * @Author       : zxlin
 * @Date         : 2023-05-01 02:45:54
 * @LastEditors  : zxlin
 * @LastEditTime : 2023-05-01 13:59:22
 * @FilePath     : /h5-auto/src/views/home/components/page-tools/components/project-info/project-info.vue
 * @Description  : project-info
-->
<template>
  <div class="project-info">
    <span>
      <el-select v-model="currentProject" placeholder="Select" size="small">
        <el-option
          v-for="item in projectList"
          :key="item.id"
          :label="item.value"
          :value="item.id"
        />
      </el-select>
    </span>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const currentProject = ref('1');
const projectList = ref([{ id: '1', value: '项目一' }]);
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
