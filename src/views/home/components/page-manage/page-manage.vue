<!--
 * @Author       : zxlin
 * @Date         : 2023-05-02 20:11:19
 * @LastEditors  : zxlin
 * @LastEditTime : 2023-05-10 14:57:20
 * @FilePath     : \h5-auto\src\views\home\components\page-manage\page-manage.vue
 * @Description  : 图层管理
-->
<template>
  <div class="page-manage">
    <div class="page-manage-box">
      <el-row v-for="element in elementList" :key="element.id">
        <el-col :span="24">
          <el-card shadow="hover" :body-style="{ padding: '0px' }">
            <div class="img-box">
              <img :src="element.src" class="image" style="width: 100%" />
            </div>
            <div class="des-box">
              <span>路径: {{ element.info.path }}</span>
              <div class="bottom">
                <el-button
                  type="primary"
                  class="button"
                  @click="element.info.active = true"
                  >选中</el-button
                >
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useStore } from 'vuex';
import useProject from '@/views/home/hooks/useProject';
import { ref, watchEffect, Ref } from 'vue';
const store = useStore();
const { currentPageObject } = useProject(store);
import { getKey } from '@/views/home/hooks/useElement';
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
</script>
<style scoped>
.page-manage {
  height: 100%;
  overflow-y: auto;
  background: #fafafa;
}
*::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}
.page-manage-box {
  padding: 10px;
}
.el-row + .el-row {
  margin-top: 10px;
}
.img-box {
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
.bottom {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
}
.des-box {
  padding: 10px;
}
.des-box span {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
}
</style>
