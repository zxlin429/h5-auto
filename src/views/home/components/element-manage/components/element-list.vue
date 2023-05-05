<!--
 * @Author       : zxlin
 * @Date         : 2023-05-04 15:54:30
 * @LastEditors  : zxlin
 * @LastEditTime : 2023-05-05 15:30:39
 * @FilePath     : \h5-auto\src\views\home\components\element-manage\components\element-list.vue
 * @Description  : 元素列表
-->
<template>
  <div class="element-list">
    <div class="title-banner">已上传组件</div>
    <div class="waterfall-box">
      <waterfall
        v-if="imgsArr.length > 0"
        :list="imgsArr"
        :width="129"
        :breakpoints="{
          0: {
            rowPerView: 2,
          },
        }"
      >
        <template #item="{ url, item }">
          <div class="card">
            <LazyImg :url="url" />
            <el-row class="element-btn">
              <el-col :span="12">
                <div
                  @click="
                    setImgVisible = true;
                    setImgId = item.id;
                  "
                >
                  <el-tooltip
                    class="box-item"
                    effect="dark"
                    content="设置"
                    placement="top"
                  >
                    <el-icon><Setting /></el-icon>
                  </el-tooltip>
                </div>
              </el-col>
              <el-col :span="12">
                <div
                  @click="
                    previewImgVisible = true;
                    previewImgId = item.id;
                  "
                >
                  <el-tooltip
                    class="box-item"
                    effect="dark"
                    content="预览"
                    placement="top"
                  >
                    <el-icon><View /></el-icon>
                  </el-tooltip>
                </div>
              </el-col>
            </el-row>
          </div>
        </template>
      </waterfall>
      <div class="empty" v-else>
        <el-empty description="暂无组件" :image-size="100" />
      </div>
    </div>
  </div>
  <set-img
    v-model="setImgVisible"
    :setImgId="setImgId"
    v-if="setImgVisible"
  ></set-img>
  <preview-img
    v-if="previewImgVisible"
    v-model="previewImgVisible"
    :previewImgId="previewImgId"
  ></preview-img>
</template>
<script setup lang="ts">
import { computed, ref, Ref, watchEffect } from 'vue';
import SetImg from './set-img.vue';
import PreviewImg from './preview-img.vue';
import { LazyImg, Waterfall } from 'vue-waterfall-plugin-next';
import { Setting, View } from '@element-plus/icons-vue';
import 'vue-waterfall-plugin-next/dist/style.css';
import { getKey } from '@/views/home/hooks/useElement';
import { useStore } from 'vuex';
const store = useStore();
const imgList = computed(() => {
  return store.state.imgList.imgList;
});
const imgsArr: Ref<any[]> = ref([]);
watchEffect(() => {
  imgsArr.value = [];
  imgList.value.forEach((i: { id: string }) => {
    setTimeout(() => {
      getKey(i.id).then((res) => {
        imgsArr.value.push({
          src: res,
          id: i.id,
        });
      });
    });
  });
});
const setImgVisible = ref(false);
const setImgId = ref('');
const previewImgVisible = ref(false);
const previewImgId = ref('');
</script>
<style scoped>
.element-list {
  height: calc(100% - 112px);
  display: flex;
  flex-direction: column;
}
.title-banner {
  height: 32px;
  background-color: #f7f8f9;
  font-size: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.waterfall-box {
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
}
.element-btn {
  height: 20px;
  width: 45px;
  position: absolute;
  right: 3px;
  bottom: 3px;
  display: none;
}
.element-btn .el-col {
  position: relative;
}
.element-btn .el-col > div {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 20px;
  height: 20px;
  line-height: 20px;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 4px;
  font-size: 12px;
  color: rgb(255, 255, 255);
  text-align: center;
  cursor: pointer;
  transition: 0.4s;
}
.element-btn .el-col > div:hover {
  color: #f9fafb;
}
.waterfall-item:hover .element-btn {
  display: flex;
}
::v-deep .waterfall-item:hover {
  cursor: pointer;
  border: 1px solid;
}
*::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}
.empty {
  position: absolute;
  inset: 0;
  margin: auto;
  height: 227px;
}
::v-deep .waterfall-card {
  background-position: 0px 0px, 30px 30px;
  background-size: 12px 12px;
  background-image: linear-gradient(
      45deg,
      #eee 25%,
      transparent 25%,
      transparent 75%,
      #eee 75%,
      #eee 100%
    ),
    linear-gradient(45deg, #eee 25%, white 25%, white 75%, #eee 75%, #eee 100%);
}
</style>
