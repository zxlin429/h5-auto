<!--
 * @Author       : zxlin
 * @Date         : 2023-04-27 14:39:17
 * @LastEditors  : zxlin
 * @LastEditTime : 2023-05-02 19:05:01
 * @FilePath     : /h5-auto/src/App.vue
 * @Description  : App.vue
-->
<template>
  <router-view></router-view>
</template>
<script setup lang="ts">
import { useStore } from 'vuex';
import useProject from '@/views/home/hooks/useProject';
const store = useStore();
const { Project } = useProject(store);
const pj1 = new Project();
pj1.addPage();
pj1.addPage();
pj1.addPage();
pj1.addPage();
new Project();
new Project().deleteProject();
</script>
<style></style>
