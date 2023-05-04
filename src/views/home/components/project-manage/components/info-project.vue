<!--
 * @Author       : zxlin
 * @Date         : 2023-05-04 11:12:16
 * @LastEditors  : zxlin
 * @LastEditTime : 2023-05-04 14:40:20
 * @FilePath     : \h5-auto\src\views\home\components\project-manage\components\info-project.vue
 * @Description  : info-project
-->
<template>
  <div class="info-project">
    <div class="info-project-context">
      <el-card class="box-card">
        <el-row>
          <el-col :span="8" class="txt">
            <span>项目名称:</span>
          </el-col>
          <el-col :span="16">
            <el-input v-model="project.name" placeholder="新建项目" />
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" class="txt">
            <span>资源地址:</span>
          </el-col>
          <el-col :span="16">
            <el-input v-model="project.assetsBaseUrl" placeholder="/" />
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" class="txt">
            <span>Require:</span>
          </el-col>
          <el-col :span="16">
            <el-switch
              v-model="project.isRequire"
              inline-prompt
              active-text="是"
              inactive-text="否"
            />
          </el-col>
        </el-row>
        <el-row class="btn">
          <el-col :span="12" class="txt">
            <el-button type="primary" @click="confirm">确认</el-button>
          </el-col>
          <el-col :span="12">
            <el-button type="danger" @click="cancel">{{
              type === 'update' ? '删除' : '取消'
            }}</el-button>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
  <delete-project
    v-if="deleteVisible"
    v-model="deleteVisible"
    @delete="deleteProjectFn()"
  ></delete-project>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { useStore } from 'vuex';
import useProject from '@/views/home/hooks/useProject';
import DeleteProject from './delete-project.vue';
const store = useStore();
const { Project, deleteProject, changeProject } = useProject(store);
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: 'update',
  },
  data: {
    type: Object,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    default: () => {},
  },
});
const deleteVisible = ref(false);
const emits = defineEmits(['update:modelValue']);
const type = computed(() => {
  return props.type;
});
const project = ref({
  name: '',
  assetsBaseUrl: '',
  isRequire: false,
});
if (type.value === 'update') {
  // eslint-disable-next-line vue/no-setup-props-destructure
  project.value.name = props.data.name;
  // eslint-disable-next-line vue/no-setup-props-destructure
  project.value.assetsBaseUrl = props.data.assetsBaseUrl;
  // eslint-disable-next-line vue/no-setup-props-destructure
  project.value.isRequire = props.data.isRequire;
}
function handleChangeVisible(value: boolean) {
  emits('update:modelValue', value);
}
function confirm() {
  if (type.value === 'add') {
    add();
  } else if (type.value === 'update') {
    update();
  }
}
function cancel() {
  if (type.value === 'add') {
    handleChangeVisible(false);
  } else if (type.value === 'update') {
    deleteVisible.value = true;
  }
}
function add() {
  new Project(
    project.value.name,
    project.value.assetsBaseUrl,
    project.value.isRequire
  );
  ElMessage({
    message: '创建成功',
    type: 'success',
  });
  handleChangeVisible(false);
}
function update() {
  changeProject(props.data as any, project.value);
  ElMessage({
    message: '修改成功',
    type: 'success',
  });
}
function deleteProjectFn() {
  deleteProject(props.data as any);
  ElMessage({
    message: '删除成功',
    type: 'success',
  });
}
</script>
<style scoped>
.info-project-context {
  margin-top: 10px;
  width: 100%;
  height: 180px;
}
.box-card {
  height: 100%;
}
::v-deep .el-card__body {
  padding: 10px;
}
.txt {
  font-size: 12px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.txt span {
  margin-right: 9px;
}
.el-row + .el-row {
  margin-top: 10px;
}
.btn .el-col:nth-child(1) {
  padding-right: 5px;
}
.btn .el-col:nth-child(2) {
  padding-left: 5px;
}
</style>
