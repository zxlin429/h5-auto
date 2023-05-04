<!--
 * @Author       : zxlin
 * @Date         : 2023-05-04 15:12:56
 * @LastEditors  : zxlin
 * @LastEditTime : 2023-05-04 15:58:19
 * @FilePath     : \h5-auto\src\views\home\components\element-manage\element-manage.vue
 * @Description  : 元素管理区
-->
<template>
  <div class="element-manage-control control no-select">
    <add-element></add-element>
    <element-list></element-list>
  </div>
</template>
<script setup lang="ts">
import AddElement from './components/add-element.vue';
import ElementList from './components/element-list.vue';
</script>
<style scoped>
.element-manage-control {
  box-shadow: 1px 0px 14px 2px rgba(0, 0, 0, 0.16);
  position: relative;
  display: flex;
  flex-direction: column;
}
</style>
