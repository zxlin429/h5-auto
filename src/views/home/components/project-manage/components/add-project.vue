<!--
 * @Author       : zxlin
 * @Date         : 2023-05-04 11:02:00
 * @LastEditors  : zxlin
 * @LastEditTime : 2023-05-04 13:45:29
 * @FilePath     : \h5-auto\src\views\home\components\project-manage\components\add-project.vue
 * @Description  : 创建项目
-->
<template>
  <div class="add-project">
    <div class="add-project-btn">
      <el-button type="primary" :icon="Plus" @click="isAdd = true">
        创建项目
      </el-button>
    </div>
    <div class="add-project-context">
      <info-project v-if="isAdd" v-model="isAdd" type="add"></info-project>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue';
import { ref } from 'vue';
import InfoProject from './info-project.vue';
const isAdd = ref(false);
</script>
<style scoped>
.add-project {
  padding: 10px;
  border-bottom: 1px solid rgb(202, 205, 209);
}
.add-project-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
::v-deep .el-button {
  width: 100%;
}
</style>
