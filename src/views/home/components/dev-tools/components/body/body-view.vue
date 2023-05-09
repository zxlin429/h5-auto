<!--
 * @Author       : zxlin
 * @Date         : 2023-04-28 20:25:38
 * @LastEditors  : zxlin
 * @LastEditTime : 2023-05-09 17:36:41
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
        <DraggableContainer>
          <div
            class="element-box"
            v-for="element in elementList"
            :key="element.id"
            style="position: absolute"
            :style="{
              zIndex: element.info.zIndex,
            }"
          >
            <Vue3DraggableResizable
              :initW="element.info.width"
              :initH="element.info.height"
              v-model:x="element.info.x"
              v-model:y="element.info.y"
              v-model:w="element.info.width"
              v-model:h="element.info.height"
              v-model:active="element.info.active"
              :draggable="true"
              :resizable="true"
              :lockAspectRatio="true"
              @activated="print('activated', element)"
              @deactivated="print('deactivated', element)"
              @drag-start="print('drag-start')"
              @resize-start="print('resize-start')"
              @dragging="print('dragging')"
              @resizing="print('resizing')"
              @drag-end="print('drag-end')"
              @resize-end="print('resize-end')"
            >
              <img
                :width="element.info.width - 2"
                :height="element.info.height - 2"
                :src="element.src"
                :style="{
                  opacity: element.info.opacity,
                  transform: `rotate(${element.info.rotate || 0}deg)`,
                }"
              />
            </Vue3DraggableResizable>
          </div>
        </DraggableContainer>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import html2Canvas from 'html2canvas';
import { useStore } from 'vuex';
import useTypeList from '@/views/home/hooks/useTypeList';
import useProject from '@/views/home/hooks/useProject';
import { ref, watchEffect, Ref } from 'vue';
const store = useStore();
let { currentTypeObject, currentPercentage } = useTypeList(store);
const { currentPageObject, changeCurrentElement, handleObserver, currentPage } =
  useProject(store);
import { getKey, setKey, removeKey } from '@/views/home/hooks/useElement';
const elementList: Ref<any[]> = ref([]);
watchEffect(() => {
  elementList.value = [];
  currentPageObject.value.elementList?.forEach((i: { uid: string }) => {
    setTimeout(() => {
      getKey(i.uid).then((res) => {
        elementList.value.push({
          src: res,
          info: i,
        });
      });
    });
  });
});
function print(val: string, element: any = {}) {
  if (val === 'activated') {
    activated(element);
  }
  if (val === 'deactivated') {
    deactivated();
  }
  handleObserver();
}
function activated(element: any) {
  setTimeout(() => {
    changeCurrentElement(element.info.id);
  });
}
function deactivated() {
  // changeCurrentElement('');
  setTimeout(() => {
    html2Canvas(document.querySelector('.phone-main') as HTMLElement).then(
      (canvas) => {
        removeKey(currentPageObject.value.thumbnail);
        currentPageObject.value.thumbnail = btoa(
          `${(Math.random() * 100000000).toFixed()}*${new Date().getTime()}`
        );
        let dataURL = canvas.toDataURL('image/png');
        setKey(currentPageObject.value.thumbnail, dataURL);
      }
    );
  });
}
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
