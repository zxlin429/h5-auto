<!--
 * @Author       : zxlin
 * @Date         : 2023-04-28 09:49:28
 * @LastEditors  : zxlin
 * @LastEditTime : 2023-04-28 11:34:20
 * @FilePath     : \h5-auto\src\views\home\components\dev-tools\dev-tools.vue
 * @Description  : 
-->
<template>
  <div class="dev-tools-control control no-select">
    <!-- 导航 -->
    <banner-view></banner-view>
    <!-- 手机窗口 -->
    <body-view></body-view>
  </div>
</template>
<script setup lang="ts">
import BannerView from './components/banner/banner-view.vue';
import BodyView from './components/body/body-view.vue';
</script>
<style>
.dev-tools-control {
  border-right: 1px solid rgb(202, 205, 209);
  background: rgb(247, 248, 248);
  display: flex;
  flex-direction: column;
}
</style>
