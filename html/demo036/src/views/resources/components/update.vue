<template>
  <div class="app-container">
    <el-row>
      <el-col :offset="6" :span="12">
        <el-form ref="resourceUpdateForm" :label-position="labelPosition" label-width="100px" :model="formData">
          <el-form-item label="资源名称" prop="resourceName" :rules="formRules.resourceName">
            <el-input v-model="formData.resourceName"></el-input>
          </el-form-item>
          <el-form-item label="资源代码" prop="resourceCode" :rules="formRules.resourceCode">
            <el-input v-model="formData.resourceCode"></el-input>
          </el-form-item>
          <el-form-item label="父资源">
            <el-col :span="20">
              <el-input v-model="formData.resourceParentName" :disabled="true"></el-input>
            </el-col>
            <el-col :offset="0" :span="4">
              <el-button type="primary" @click="chooseResourceParent = true">选择</el-button>
            </el-col>
          </el-form-item>
          <el-form-item label="web路径">
            <el-input v-model="formData.resourceWebUrl"></el-input>
          </el-form-item>
          <el-form-item label="manage路径">
            <el-input v-model="formData.resourceManagerUrl"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm">立即更新</el-button>
            <el-button @click="goBack">返回</el-button>
          </el-form-item>

        </el-form>
      </el-col>
    </el-row>
    <el-dialog title="选择" :visible.sync="chooseResourceParent" width="30%">
      <el-tree :data="resourcesList" :props="treeDefaultProps" @node-click="checkResource"
               :check-on-click-node="true"></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="chooseResourceParent = false">取 消</el-button>
        <el-button type="primary" @click="changeParentId">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {checkCode, getResource, updateResource} from '@/api/resources';
  import {Message} from 'element-ui';

  export default {
    name: "ResourcesUpdate",
    data() {
      const vm = this;
      const checkResourceCode = (rule, value, callback) => {
        if (vm.formData.oldResourceCode !== undefined && value !== vm.formData.oldResourceCode) {
          new Promise(((resolve, reject) => {
            checkCode({"resourcesCode": value}).then(res => {
              if (res.data === false) {
                reject();
              } else {
                resolve();
              }
            });
          })).then(() => {
            callback();
          }, () => {
            callback(new Error('代码已经存在'))
          });
        } else {
          callback();
        }
      };
      return {
        chooseResourceParent: false,
        labelPosition: 'right',
        formData: {
          id: '',
          permissionName: 'ResourcesUpdate',
          resourceName: '',
          oldResourceCode: '',
          resourceCode: '',
          resourceWebUrl: '',
          resourceManagerUrl: '',
          resourceParentId: 0,
          resourceParentName: ''
        },
        formRules: {
          resourceName: [
            {required: true, message: '资源名称不能为空!'}
          ],
          resourceCode: [
            {required: true, message: '资源代码不能为空!'},
            {validator: checkResourceCode, trigger: 'change'}
          ]
        },
        resourcesList: [],
        treeDefaultProps: {
          label: 'resourceName',
          children: 'children'
        },
        treeCheckedId: 0
      }
    },
    watch: {
      'formData.resourceParentId': function (newValue, oldValue) {
        function findResourcesName(resource, resourceId) {
          if (resource.id === resourceId) {
            return resource.resourceName;
          }
          if (resource.children && resource.children.length > 0) {
            for (let childrenCur of resource.children) {
              let result = findResourcesName(childrenCur, resourceId);
              if (result !== '-1') {
                return result;
              }
            }
            return '-1';
          } else {
            return '-1';
          }
        }

        if (newValue === 0) {
          return '';
        }
        if (oldValue !== newValue) {
          const array = this.resourcesList;
          for (let cur of array) {
            if (cur.id === newValue) {
              this.formData.resourceParentName = cur.resourceName;
              break;
            }
            this.formData.resourceParentName = findResourcesName(cur, newValue);
            if (this.formData.resourceParentName !== '-1') {
              break;
            }
          }
        }
      }
    },
    created() {
      this.resourcesList = this.$route.params.list;
      const id = this.$route.params.id;
      getResource({id: id, permissionName: this.formData.permisssionName}).then((res) => {
        this.formData = Object.assign({}, this.formData, res.data);
        this.formData.oldResourceCode = this.formData.resourceCode;
      }).catch(error => {
        Message({
          type: 'error',
          message: '错误',
          duration: 5000
        });
      });
    },
    methods: {
      goBack: function () {
        this.$router.go(-1);
      },
      checkResource: function (data, node, self) {
        this.treeCheckedId = data.id;
      },
      changeParentId: function () {
        this.formData.resourceParentId = this.treeCheckedId;
        this.chooseResourceParent = false;
      },
      submitForm() {
        this.$refs['resourceUpdateForm'].validate((valid) => {
          console.log(valid);
          if (valid) {
            new Promise(((resolve, reject) => {
              updateResource(this.formData).then((res) => {
                this.$router.replace({name: 'Resources'});
              })
            })).catch(error => {
              Message({
                message: '失败',
                type: 'error',
                duration: 5000
              });
            });
          }

        });
      }
    }
  }
</script>

<style scoped>

</style>
