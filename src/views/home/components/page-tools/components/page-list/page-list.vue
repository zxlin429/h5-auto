<!--
 * @Author       : zxlin
 * @Date         : 2023-05-01 02:26:51
 * @LastEditors  : zxlin
 * @LastEditTime : 2023-05-04 10:34:40
 * @FilePath     : \h5-auto\src\views\home\components\page-tools\components\page-list\page-list.vue
 * @Description  : page-list
-->
<template>
  <div class="page-list">
    <div
      class="list-box"
      v-for="(page, index) in pageList"
      :key="page.id"
      @click="currentPage = page.id"
    >
      <page-main :pageInfo="{ ...page, index }"></page-main>
    </div>
    <div class="empty" v-if="pageList.length === 0">
      <el-empty description="暂无页面" :image-size="100" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted } from 'vue';
import PageMain from './components/page-main.vue';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Sortable from 'sortablejs';
import { useStore } from 'vuex';
import useProject from '@/views/home/hooks/useProject';
const store = useStore();
const { currentProjectObject, currentPage, handleObserver } = useProject(store);
const pageList = computed(() => {
  return currentProjectObject.value.pageList || [];
});

onMounted(() => {
  if (document.querySelector('.page-list')) {
    new Sortable(document.querySelector('.page-list') as HTMLElement, {
      animation: 150,
      onEnd: (event) => {
        if (event.item === document.querySelector('.empty')) return;
        // console.log(event);
        const [reorderedItem] = pageList.value.splice(
          event.oldIndex as number,
          1
        );
        pageList.value.splice(event.newIndex as number, 0, reorderedItem);
        handleObserver();
      },
    });
  }
});
</script>
<style scoped>
.page-list {
  flex: 1;
  max-height: calc(100vh - 100px);
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
}
.list-box {
  height: 187px;
}
.list-box + .list-box {
  border-top: 1px solid #eef2f8;
}
.list-box:nth-last-child(1) {
  border-bottom: 1px solid #eef2f8;
}
.empty {
  position: absolute;
  width: 160px;
  height: 294px;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}
</style>
