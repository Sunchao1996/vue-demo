<template>
  <div class="app-container">
    <el-row>
      <el-col :offset="6" :span="12">
        <el-form ref="userAddForm" :label-position="labelPosition" label-width="100px" :model="formData">
          <el-form-item label="用户名" prop="userName" :rules="formRules.userName">
            <el-input v-model="formData.userName"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名" prop="userRealName" :rules="formRules.userRealName">
            <el-input v-model="formData.userRealName"></el-input>
          </el-form-item>
          <el-form-item label="是否启用">
            <el-col :span="20">
              <el-radio v-model="formData.userStatus" :label="0">启用</el-radio>
              <el-radio v-model="formData.userStatus" :label="1">禁用</el-radio>
            </el-col>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="formData.userMobile"></el-input>
          </el-form-item>
          <el-form-item label="头像">
            <pan-thumb :image="formData.imgDataUrl"/>
            <el-button type="primary" @click="chooseAvatar">选择</el-button>
            <my-upload field="img"
                       @crop-success="cropSuccess"
                       v-model="avatarComponentShow"
                       :width="200"
                       :height="200"
                       img-format="png"></my-upload>
          </el-form-item>
          <el-form-item label="简介">
            <el-input v-model="formData.userIntroduction"></el-input>
          </el-form-item>
          <el-form-item label="用户角色">
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
  import {addRole, checkUserName} from '@/api/users';
  import {Message} from 'element-ui';
  import myUpload from 'vue-image-crop-upload';
  import PanThumb from '@/components/PanThumb'
  export default {
    name: "UsersAdd",
    components: {
      'my-upload': myUpload,
      PanThumb
    },
    data() {
      const validUserName = (rule, value, callback) => {
        checkUserName(value).then(res => {
          if (res.data === false) {
            callback(new Error('用户名已经存在'));
          } else {
            callback();
          }
        }).catch(e => {
          callback(new Error('校验失败~'))
        });
      };
      return {
        avatarComponentShow: false,
        labelPosition: 'right',
        formData: {
          userName: '',
          userMobile: '',
          userStatus: 0,
          userRealName: '',
          userAvatar: '',
          roles: '',
          userIntroduction: '',
          checkRolesIds: [],
          imgDataUrl: ''
        },
        formRules: {
          userName: [
            {required: true, message: '用户名不能为空!'},
            {validator: validUserName, trigger: 'blur'}
          ],
          userRealName: [
            {required: true, message: '姓名不能为空!'}
          ]
        }
      }
    },
    watch: {},
    created() {
    },
    methods: {
      cropSuccess:function(imgDataUrl, field){
        this.formData.imgDataUrl = imgDataUrl;
      },
      chooseAvatar: function () {
        this.avatarComponentShow = true;
      },
      goBack: function () {
        this.$router.go(-1);
      },
      submitForm() {
        this.$refs['userAddForm'].validate((valid) => {
          if (valid) {
          }
        });
      }
    }
  }
</script>

<style scoped>

</style>
