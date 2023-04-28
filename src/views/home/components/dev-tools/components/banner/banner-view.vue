<!--
 * @Author       : zxlin
 * @Date         : 2023-04-28 10:02:16
 * @LastEditors  : zxlin
 * @LastEditTime : 2023-04-28 15:46:20
 * @FilePath     : \h5-auto\src\views\home\components\dev-tools\components\banner\banner-view.vue
 * @Description  : 
-->
<template>
  <div class="banner-view styles-variable">
    <div class="main">
      <el-row>
        <el-col :span="12">
          <el-col :span="4" class="size"> 尺寸: </el-col>
          <el-col :span="20">
            <el-select v-model="currentType" placeholder="Select" size="small">
              <template #prefix>
                <el-icon @click.stop="addVisible = true">
                  <CirclePlus />
                </el-icon>
              </template>
              <el-option
                v-for="item in typeList"
                :key="item.id"
                :label="item.title"
                :value="item.id"
              >
                <div class="type-option">
                  <el-icon
                    @click.stop="
                      deleteVisible = true;
                      typeId = item.id;
                    "
                  >
                    <CircleClose />
                  </el-icon>
                  <span>{{ item.title }}</span>
                </div>
              </el-option>
            </el-select>
          </el-col>
        </el-col>
        <el-col :span="6">
          <el-tag class="ml-2" type="info">{{
            currentTypeObject.size.width ?? 0
          }}</el-tag>
          <el-icon :size="16" color="rgb(96, 98, 102)"><Close /></el-icon>
          <el-tag class="ml-2" type="info">{{
            currentTypeObject.size.height ?? 0
          }}</el-tag>
        </el-col>
        <el-col :span="4">
          <el-select
            v-model="currentPercentage"
            placeholder="Select"
            size="small"
          >
            <el-option
              v-for="item in percentageList"
              :key="item.percentage"
              :label="`${item.percentage}%`"
              :value="item.percentage"
            />
          </el-select>
        </el-col>
        <el-col :span="2">
          <el-icon class="re-set" @click="resetVisible = true"
            ><Refresh
          /></el-icon>
        </el-col>
      </el-row>
    </div>
    <div class="tail">
      <div class="tail-control">
        <div
          class="tail-main"
          :style="{
            width: `${
              currentTypeObject.size.width * (currentPercentage / 100) ?? 0
            }px`,
          }"
          v-if="currentType"
        >
          {{ currentTypeObject.title }} -
          {{ currentTypeObject.size.width ?? 0 }}px
        </div>
      </div>
    </div>
  </div>
  <add-type v-model="addVisible" v-if="addVisible"></add-type>
  <delete-type
    v-model="deleteVisible"
    v-if="deleteVisible"
    :typeId="typeId"
  ></delete-type>
  <reset-type v-model="resetVisible" v-if="resetVisible"></reset-type>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import {
  Close,
  CirclePlus,
  CircleClose,
  Refresh,
} from '@element-plus/icons-vue';
import AddType from './components/add-type.vue';
import DeleteType from './components/delete-type.vue';
import ResetType from './components/reset-type.vue';
import { useStore } from 'vuex';
import useTypeList from '../hooks/useTypeList'; // 移动端尺寸管理
const store = useStore();
let {
  typeList,
  currentType,
  currentTypeObject,
  percentageList,
  currentPercentage,
} = useTypeList(store);

const addVisible = ref(false);
const deleteVisible = ref(false);
const typeId = ref('');
const resetVisible = ref(false);
</script>
<style scoped>
.styles-variable {
  --main-height: 40px;
  --tail-height: 24px;
  --tail-margin-top: 3px;
  --transition: 0.3s;
}
.banner-view {
  width: 100%;
  height: calc(
    var(--main-height) + var(--tail-height) + var(--tail-margin-top)
  );
}
.main {
  height: var(--main-height);
  border-bottom: 1px solid rgb(202, 205, 209);
  padding: 0 10px;
}
.tail {
  height: var(--tail-height);
  margin-top: var(--tail-margin-top);
}
.tail-control {
  font-size: 16px;
  height: 100%;
  margin: 0 var(--tail-margin-top);
  background: rgb(222, 225, 230);
  transition: var(--transition);
  display: flex;
  justify-content: center;
}
.tail-control:hover {
  background: rgb(218, 220, 224);
}
.tail-main {
  height: 100%;
  text-align: center;
  border-left: 3px solid rgb(248, 249, 249);
  border-right: 3px solid rgb(248, 249, 249);
  box-sizing: content-box;
  transition: var(--transition);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
  line-height: var(--tail-height);
}
.main .el-row {
  height: 100%;
}
.main .el-row > .el-col {
  display: flex;
  align-items: center;
}
.main .el-row > .el-col + .el-col {
  padding: 0 0 0 8px;
}
.main .size {
  color: rgb(96, 98, 102);
  font-size: 12px;
}
.main .el-select--small {
  width: 100%;
}
.type-option {
  display: flex;
  align-items: center;
}
.type-option .el-icon {
  margin-right: 7px;
  color: rgb(96, 98, 102);
  transition: 0.3s;
}
.type-option .el-icon:hover {
  color: rgb(245, 108, 108);
}
.re-set {
  cursor: pointer;
  transition: var(--transition);
}
.re-set:hover {
  color: rgb(64, 158, 255);
  transform: rotate(180deg);
}
</style>
