<!--
 * @Author       : zxlin
 * @Date         : 2023-04-28 20:25:38
 * @LastEditors  : zxlin
 * @LastEditTime : 2023-05-05 17:55:50
 * @FilePath     : \h5-auto\src\views\home\components\dev-tools\components\body\body-view.vue
 * @Description  : 
-->
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
      <div class="phone-main">
        <Vue3DraggableResizable
          :initW="110"
          :initH="120"
          v-model:x="x"
          v-model:y="y"
          v-model:w="w"
          v-model:h="h"
          v-model:active="active"
          :draggable="true"
          :resizable="true"
          :lockAspectRatio="true"
          :parent="true"
        >
          <img
            :width="w"
            :height="h"
            src="https://testmobile.51wnl-cq.com/may_god/img/gd_cloud.fd9aeeee.png"
            alt=""
          />
        </Vue3DraggableResizable>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useStore } from 'vuex';
import useTypeList from '@/views/home/hooks/useTypeList';
import { ref } from 'vue';
const store = useStore();
let { currentTypeObject, currentPercentage } = useTypeList(store);

const x = ref(0);
const y = ref(0);
const w = ref(100);
const h = ref(100);
const active = ref(false);
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
  position: relative;
}
</style>
