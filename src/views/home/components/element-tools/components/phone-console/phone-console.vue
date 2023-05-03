<!--
 * @Author       : zxlin
 * @Date         : 2023-04-28 22:15:26
 * @LastEditors  : zxlin
 * @LastEditTime : 2023-05-02 18:17:14
 * @FilePath     : /h5-auto/src/views/home/components/element-tools/components/phone-console/phone-console.vue
 * @Description  : 页面控制台
-->
<template>
  <div class="phone-console">
    <div class="canvas">画布</div>
    <div v-if="currentPage">
      <el-row>
        <el-col :span="24">
          <label class="title console-box">
            <input type="text" v-model="currentPageObject.name" />
            <span>标题</span>
          </label>
        </el-col>
      </el-row>
      <el-row class="size">
        <el-col :span="12">
          <label class="width console-box">
            <input
              type="text"
              :value="currentTypeObject.size.width ?? 0"
              disabled
            />
            <span>Width</span>
          </label>
        </el-col>
        <el-col :span="12">
          <label class="height console-box">
            <input
              type="text"
              :value="currentTypeObject.size.height ?? 0"
              disabled
            />
            <span>Height</span>
          </label>
        </el-col>
      </el-row>
      <el-row class="page-info">
        <el-col :span="12">
          <label class="bg console-box">
            <div class="box"></div>
            <span>背景</span>
          </label>
        </el-col>
        <el-col :span="12">
          <label
            class="add console-box"
            @click="currentProjectObject.addPageAfter(currentPage)"
          >
            <input type="text" value="+" disabled />
            <span>添加页面</span>
          </label>
        </el-col>
      </el-row>
    </div>
    <div v-else>
      <el-empty description="暂无选中页面" :image-size="50" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useStore } from 'vuex';
import useTypeList from '@/views/home/hooks/useTypeList';
import useProject from '@/views/home/hooks/useProject';
const store = useStore();
let { currentTypeObject } = useTypeList(store);
const { currentPage, currentPageObject, currentProjectObject } =
  useProject(store);
</script>
<style scoped>
.phone-console {
  padding: 10px 0;
}
.canvas {
  color: #f9fafb;
  font-weight: normal;
  font-size: 14px;
  margin-bottom: 5px;
}
.title > input {
  text-align: left;
  text-indent: 8px;
}
.el-row + .el-row {
  margin-top: 8px;
}
.size > .el-col-12:nth-child(1),
.page-info > .el-col-12:nth-child(1) {
  padding-right: 4px;
}
.size > .el-col-12:nth-child(2),
.page-info > .el-col-12:nth-child(2) {
  padding-left: 4px;
}
.size label,
.size input {
  cursor: default;
}
.page-info label,
.page-info input {
  cursor: pointer;
}
.bg > .box {
  width: 52px;
  height: 30px;
  background: linear-gradient(to right, #159957, #155799);
  margin: 32px auto 0;
}
</style>
