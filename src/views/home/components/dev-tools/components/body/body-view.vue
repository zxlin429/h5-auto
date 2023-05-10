<!--
 * @Author       : zxlin
 * @Date         : 2023-04-28 20:25:38
 * @LastEditors  : zxlin
 * @LastEditTime : 2023-05-10 17:23:44
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
        <img v-if="bgImg" :src="bgImg" class="phone-main-bg" />
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
                v-if="element.src"
                :src="element.src"
                :style="{
                  width: element.info.width - 2 + 'px',
                  height: element.info.height - 2 + 'px',
                  opacity: element.info.opacity,
                  transform: `rotate(${element.info.rotate || 0}deg)`,
                }"
              />
              <textarea
                :width="element.info.width - 2"
                :height="element.info.height - 2"
                :style="{
                  width: element.info.width - 2 + 'px',
                  height: element.info.height - 2 + 'px',
                  opacity: element.info.opacity,
                  transform: `rotate(${element.info.rotate || 0}deg)`,
                }"
                type="text"
                v-else-if="element.info.uid === 'text'"
                placeholder="请输入文字"
                v-model="element.info.text"
              ></textarea>
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
const { currentPageObject, changeCurrentElement, handleObserver } =
  useProject(store);
import { getKey, setKey, removeKey } from '@/views/home/hooks/useElement';
const elementList: Ref<any[]> = ref([]);
watchEffect(() => {
  elementList.value = [];
  currentPageObject.value.elementList?.forEach((i: { uid: string }) => {
    if (i.uid === 'text') {
      setTimeout(() => {
        elementList.value.push({
          info: i,
        });
      });
    } else {
      setTimeout(() => {
        getKey(i.uid).then((res) => {
          elementList.value.push({
            src: res,
            info: i,
          });
        });
      });
    }
  });
});

const bgImg = ref('');
watchEffect(() => {
  if (currentPageObject.value.bgUrl) {
    setTimeout(() => {
      getKey(currentPageObject.value.bgUrl).then((res) => {
        bgImg.value = res as string;
      });
    });
  } else {
    bgImg.value = '';
  }
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
        handleObserver();
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
.phone-main-bg {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
textarea {
  border: none;
  outline: none;
  resize: none;
  background: transparent;
}
</style>
