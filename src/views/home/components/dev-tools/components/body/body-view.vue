<template>
  <div class="body-view styles-variable">
    <div
      class="body-view-control"
      :style="{
        width: `${
          currentTypeObject.size.width * (currentPercentage / 100) ?? 0
        }px`,
        height: `${
          currentTypeObject.size.height * (currentPercentage / 100) ?? 0
        }px`,
      }"
    >
      <div class="phone-main"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useStore } from 'vuex';
import useTypeList from '../hooks/useTypeList'; // 移动端尺寸管理
const store = useStore();
let { currentTypeObject, currentPercentage } = useTypeList(store);
</script>
<style scoped>
.styles-variable {
  --transition: 0.3s;
}
.body-view {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.body-view-control {
  border: 1px solid rgb(220, 220, 221);
  background: rgb(255, 255, 255);
  box-shadow: 0px 0px 17px 7px rgba(200, 200, 200, 0.3);
  overflow: hidden;
  transition: var(--transition);
  display: flex;
}
.body-view-control > .phone-main {
  width: 100%;
  flex: 1;
  overflow: hidden;
  cursor: crosshair;
}
</style>
