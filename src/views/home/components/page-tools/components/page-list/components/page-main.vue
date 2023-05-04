<!--
 * @Author       : zxlin
 * @Date         : 2023-05-01 14:07:41
 * @LastEditors  : zxlin
 * @LastEditTime : 2023-05-04 10:24:50
 * @FilePath     : \h5-auto\src\views\home\components\page-tools\components\page-list\components\page-main.vue
 * @Description  : page-main
-->
<template>
  <div class="page-main" :class="{ active: currentPage === pageInfo.id }">
    <el-row>
      <el-col :span="8">
        <div class="serial-number">
          <div>{{ pageInfo.index + 1 || 1 }}</div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="phone-main-min">
          <div
            class="add-page"
            @click.stop="addPageAfter(currentProjectObject, pageInfo.id)"
          >
            <el-icon><Plus /></el-icon>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="function">
          <div class="delete-page" @click.stop="deleteVisible = true">
            <el-icon><Delete /></el-icon>
          </div>
        </div>
      </el-col>
    </el-row>
    <delete-page
      v-model="deleteVisible"
      v-if="deleteVisible"
      @delete="deletePage(currentProjectObject, pageInfo.id)"
    ></delete-page>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import { Delete, Plus } from '@element-plus/icons-vue';
import DeletePage from './delete-page.vue';
import { useStore } from 'vuex';
import useProject from '@/views/home/hooks/useProject';
const store = useStore();
const { currentPage, currentProjectObject, deletePage, addPageAfter } =
  useProject(store);
const deleteVisible = ref(false);
const props = defineProps({
  pageInfo: {
    type: Object,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    default: () => {},
  },
});
const pageInfo = computed(() => {
  return props.pageInfo;
});
</script>

<style scoped>
.page-main {
  width: 100%;
  height: 100%;
}
.el-row {
  height: 100%;
}
.el-col {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.serial-number > div {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  background-color: #ccc;
  line-height: 24px;
  font-size: 14px;
  text-align: center;
  color: #fff;
}
.phone-main-min {
  width: 100%;
  height: 138px;
  border: 1px solid #eef2f8;
  background: #fff;
  position: relative;
}
.phone-main-min .add-page {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 24px;
  height: 24px;
  transform: translateY(50%);
  font-size: 16px;
  background-color: #fff;
  border-radius: 50%;
  color: #000;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.16);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  display: none;
}
.phone-main-min .add-page:hover {
  color: #0b89f0;
}
.function {
  display: none;
}
.function .el-icon {
  width: 23px;
  height: 23px;
  border-radius: 50%;
  background: #fff;
  cursor: pointer;
}
.page-main:hover,
.active {
  background-color: #f5f8fb;
}
.page-main:hover .serial-number > div,
.active .serial-number > div {
  background-color: #0b89f0;
}
.page-main:hover .phone-main-min,
.active .phone-main-min {
  border: 1px solid #0b89f0;
}
.page-main:hover .phone-main-min .add-page,
.active .phone-main-min .add-page {
  display: flex;
}
.page-main:hover .function,
.active .function {
  display: block;
}
</style>
