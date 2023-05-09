<!--
 * @Author       : zxlin
 * @Date         : 2023-04-28 22:15:26
 * @LastEditors  : zxlin
 * @LastEditTime : 2023-05-09 16:41:33
 * @FilePath     : \h5-auto\src\views\home\components\element-tools\components\element-console\element-console.vue
 * @Description  : 页面控制台
-->
<template>
  <div class="border-top"></div>
  <div class="element-console">
    <div class="canvas">元素</div>
    <el-row class="size">
      <el-col :span="12">
        <label class="Width console-box cursor-default">
          <input
            type="text"
            class="cursor-default"
            v-model="currentElementObject.width"
            disabled
          />
          <span>Width</span>
        </label>
      </el-col>
      <el-col :span="12">
        <label class="Height console-box cursor-default">
          <input
            type="text"
            class="cursor-default"
            v-model="currentElementObject.height"
            disabled
          />
          <span>Height</span>
        </label>
      </el-col>
    </el-row>
    <el-row class="size">
      <el-col :span="12">
        <label class="x-left console-box">
          <input type="text" v-model="currentElementObject.x" />
          <span>X</span>
        </label>
      </el-col>
      <el-col :span="12">
        <label class="y-top console-box">
          <input type="text" v-model="currentElementObject.y" />
          <span>Y</span>
        </label>
      </el-col>
    </el-row>
    <el-row class="size">
      <el-col :span="12">
        <label class="z-index console-box">
          <input type="text" v-model="currentElementObject.zIndex" />
          <span>z-index</span>
        </label>
      </el-col>
      <el-col :span="12">
        <label class="option console-box">
          <input type="text" v-model="currentElementObject.opacity" />
          <span>Opacity</span>
        </label>
      </el-col>
    </el-row>
    <el-row class="size">
      <el-col :span="12">
        <label class="role console-box">
          <input type="text" v-model="currentElementObject.role" />
          <el-progress
            type="circle"
            :percentage="((currentElementObject.role % 360) / 360) * 100"
            :width="48"
            :stroke-width="2"
            color="#159957"
          />
          <span>Role</span>
        </label>
      </el-col>
      <el-col :span="12">
        <label class="role console-box">
          <el-popconfirm
            title="是否删除元素?"
            @confirm="handleDeleteElement"
            confirm-button-text="确认"
            cancel-button-text="取消"
          >
            <template #reference>
              <el-icon class="delete-element" :size="23"><Delete /></el-icon>
            </template>
          </el-popconfirm>
          <span>删除元素</span>
        </label>
      </el-col>
    </el-row>
    <el-row class="align">
      <el-col :span="24">
        <label class="z-index console-box">
          <span>对齐方式</span>
          <div class="box">
            <el-row>
              <el-col :span="8" @click="xLeft">
                <div class="align-context align-context-x x-left">
                  <div class="line"></div>
                  <div class="min"></div>
                  <div class="max"></div>
                </div>
              </el-col>
              <el-col :span="8" @click="xCenter">
                <div class="align-context align-context-x x-center">
                  <div class="line"></div>
                  <div class="min"></div>
                  <div class="max"></div>
                </div>
              </el-col>
              <el-col :span="8" @click="xRight">
                <div class="align-context align-context-x x-right">
                  <div class="line"></div>
                  <div class="min"></div>
                  <div class="max"></div>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8" @click="yLeft">
                <div class="align-context align-context-y y-left">
                  <div class="line"></div>
                  <div class="min"></div>
                  <div class="max"></div>
                </div>
              </el-col>
              <el-col :span="8" @click="yCenter">
                <div class="align-context align-context-y y-center">
                  <div class="line"></div>
                  <div class="min"></div>
                  <div class="max"></div>
                </div>
              </el-col>
              <el-col :span="8" @click="yRight">
                <div class="align-context align-context-y y-right">
                  <div class="line"></div>
                  <div class="min"></div>
                  <div class="max"></div>
                </div>
              </el-col>
            </el-row>
          </div>
        </label>
      </el-col>
    </el-row>
    <el-row class="animation">
      <el-col :span="24">
        <label class="z-index console-box">
          <el-row>
            <el-col :span="12">
              <div>设置动画</div>
            </el-col>
            <el-col :span="12">
              <div>预览动画</div>
            </el-col>
          </el-row>
          <span>动画</span>
        </label>
      </el-col>
    </el-row>
  </div>
</template>
<script setup lang="ts">
import { Delete } from '@element-plus/icons-vue';
import useProject from '@/views/home/hooks/useProject';
import useTypeList from '@/views/home/hooks/useTypeList';
import { useStore } from 'vuex';
const store = useStore();
const { currentElementObject, changeCurrentElement, deleteElement } =
  useProject(store);
const { currentTypeObject } = useTypeList(store);
function handleDeleteElement() {
  deleteElement(currentElementObject);
  changeCurrentElement('');
}
function xLeft() {
  currentElementObject.value.x = 0;
}
function xCenter() {
  currentElementObject.value.x = Math.floor(
    (currentTypeObject.value.size.width - currentElementObject.value.width) / 2
  );
}
function xRight() {
  currentElementObject.value.x = Math.floor(
    currentTypeObject.value.size.width - currentElementObject.value.width
  );
}
function yLeft() {
  currentElementObject.value.y = 0;
}
function yCenter() {
  currentElementObject.value.y = Math.floor(
    (currentTypeObject.value.size.height - currentElementObject.value.height) /
      2
  );
}
function yRight() {
  currentElementObject.value.y = Math.floor(
    currentTypeObject.value.size.height - currentElementObject.value.height
  );
}
</script>
<style scoped>
.element-console {
  padding: 10px 0;
}
.canvas {
  color: #f9fafb;
  font-weight: normal;
  font-size: 14px;
  margin-bottom: 5px;
}
.title > input {
  text-align: left;
  text-indent: 8px;
}
.el-row + .el-row {
  margin-top: 8px;
}
.cursor-default {
  cursor: default;
}
.size > .el-col-12:nth-child(1) {
  padding-right: 4px;
}
.size > .el-col-12:nth-child(2) {
  padding-left: 4px;
}
.border-top {
  width: 100%;
  height: 2px;
  background: #2b313f;
}
.console-box > input {
  color: #159957;
}
.console-box > input:focus {
  background: #159957;
  box-shadow: 0 0 5px 2px #159957;
}
.el-progress {
  position: absolute;
  inset: 0;
  margin: auto;
  width: 48px;
  height: 48px;
  transform: translateY(7px);
}
::v-deep .el-progress .el-progress__text {
  display: none;
}
.align .console-box {
  height: 130px;
}
.align .box {
  position: absolute;
  width: 140px;
  height: 100px;
  bottom: 5px;
  left: 0;
  right: 0;
  margin: auto;
}
.align .box .el-row {
  height: 50px;
  margin-top: 0;
}
.align .box .el-row .el-col {
  border-radius: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.4s;
  cursor: pointer;
}
.align .box .el-row .el-col:hover {
  background-color: #111827;
}
.align .align-context {
  width: 27px;
  height: 27px;
  position: relative;
}
.align .align-context-x .line {
  position: absolute;
  height: 100%;
  width: 1px;
  background: #f9fafb;
}
.align .align-context-x .min {
  position: absolute;
  top: 5px;
  height: 5px;
  width: 14px;
  background: #f9fafb;
}
.align .align-context-x .max {
  position: absolute;
  top: 15px;
  height: 5px;
  width: 20px;
  background: #f9fafb;
}
.align .x-center .line,
.align .x-center .min,
.align .x-center .max {
  left: 0;
  right: 0;
  margin: auto;
}
.align .x-right .line,
.align .x-right .min,
.align .x-right .max {
  right: 0;
}
.align .align-context-y .line {
  position: absolute;
  height: 1px;
  width: 100%;
  background: #f9fafb;
}
.align .align-context-y .min {
  position: absolute;
  left: 5px;
  height: 14px;
  width: 5px;
  background: #f9fafb;
}
.align .align-context-y .max {
  position: absolute;
  left: 15px;
  height: 20px;
  width: 5px;
  background: #f9fafb;
}
.align .y-center .line,
.align .y-center .min,
.align .y-center .max {
  top: 0;
  bottom: 0;
  margin: auto;
}
.align .y-right .line,
.align .y-right .min,
.align .y-right .max {
  bottom: 0;
}
.animation .el-row {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 50px;
}
.animation .el-col {
  position: relative;
}
.animation .el-col > div {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 60px;
  height: 30px;
  line-height: 30px;
  font-size: 12px;
  border-radius: 4px;
  background: #159957;
  color: #d6d8db;
  text-align: center;
  cursor: pointer;
  transition: 0.4s;
}
.animation .el-col:nth-child(1) > div {
  background: #0b89f0;
}
.animation .el-col > div:hover {
  color: #f9fafb;
}
.delete-element {
  position: absolute;
  inset: 0;
  margin: auto;
  transform: translateY(7px);
  color: #f56c6c;
  cursor: pointer;
}
</style>
