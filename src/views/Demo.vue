<!--
 * @Author       : zxlin
 * @Date         : 2023-04-28 09:41:34
 * @LastEditors  : zxlin
 * @LastEditTime : 2023-04-28 09:41:45
 * @FilePath     : \h5-auto\src\views\Demo.vue
 * @Description  : 
-->
<template>
  <div class="home">
    <div class="phoneBox">
      <div class="a"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { Drag, domInfo } from '@/utils/drag';
onMounted(() => {
  let drag: domInfo = Drag(
    document.querySelector('.a') as HTMLElement,
    document.querySelector('.phoneBox') as HTMLElement
  );
  window.drag = drag;
});
</script>
<style>
.a {
  width: 100px;
  height: 100px;
  background: red;
  position: absolute;
}
.phoneBox {
  position: absolute;
  width: 375px;
  height: 844px;
  background: black;
  left: 60px;
  top: 0;
  bottom: 0;
  margin: auto;
  overflow: hidden;
}
</style>
