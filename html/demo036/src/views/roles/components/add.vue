<template>
  <div class="app-container">
    <el-row>
      <el-col :offset="6" :span="12">
        <el-form ref="roleAddForm" :label-position="labelPosition" label-width="100px" :model="formData">
          <el-form-item label="角色名称" prop="roleName" :rules="formRules.roleName">
            <el-input v-model="formData.roleName"></el-input>
          </el-form-item>
          <el-form-item label="角色代码" prop="roleCode" :rules="formRules.roleCode">
            <el-input v-model="formData.roleCode"></el-input>
          </el-form-item>
          <el-form-item label="是否启用">
            <el-col :span="20">
              <el-radio v-model="formData.roleStatus" :label="0">启用</el-radio>
              <el-radio v-model="formData.roleStatus" :label="1">禁用</el-radio>
            </el-col>
          </el-form-item>
          <el-form-item label="角色资源">
            <el-tree
              :data="resourcesList"
              show-checkbox :check-strictly="true"
              node-key="id"
              :props="treeDefaultProps"
              @check="checkResource">
            </el-tree>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm">立即创建</el-button>
            <el-button @click="goBack">返回</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {addRole, checkRoleCode} from '@/api/roles';
  import {resourcesList} from '@/api/resources';
  import {Message} from 'element-ui';

  export default {
    name: "RolesAdd",
    data() {
      const validRoleCode = (rule, value, callback) => {
        console.log("value" + value);
        checkRoleCode(value).then(res => {
          if (res.data === false) {
            callback(new Error('代码已经存在'));
          } else {
            callback();
          }
        }).catch(e => {
          callback(new Error('校验失败~'))
        });
      };
      return {
        chooseResourceParent: false,
        labelPosition: 'right',
        formData: {
          roleName: '',
          roleCode: '',
          roleStatus: 0,
          resourcesIds: '',
          checkResourcesIds: []
        },
        formRules: {
          roleName: [
            {required: true, message: '角色名称不能为空!'}
          ],
          roleCode: [
            {required: true, message: '角色代码不能为空!'},
            {validator: validRoleCode, trigger: 'blur'}
          ]
        },
        resourcesList: [],
        treeDefaultProps: {
          label: 'resourceName',
          children: 'children'
        }
      }
    },
    watch: {},
    created() {
      resourcesList().then((res) => {
        this.resourcesList = res.data;
      });
    },
    methods: {
      goBack: function () {
        this.$router.go(-1);
      },
      submitForm() {
        this.$refs['roleAddForm'].validate((valid) => {
          if (valid) {
            this.formData.resourcesIds = this.formData.checkResourcesIds.join('@');
            addRole(this.formData).then(() => {
              this.$router.replace({name: 'Roles'});
            }).catch(error => {
              console.log('添加角色失败');
            });
          }
        });
      },
      checkResource(data, c) {
        this.formData.checkResourcesIds = c.checkedKeys;
        console.log(this.formData.checkResourcesIds);
      }
    }
  }
</script>

<style scoped>

</style>
