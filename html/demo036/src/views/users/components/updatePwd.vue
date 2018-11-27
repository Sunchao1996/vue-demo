<template>
  <div class="app-container">
    <el-row>
      <el-col :offset="5" :span="12">
        <el-form ref="userUpdatePwdForm" :label-position="labelPosition" label-width="100px" :model="formData">
          <el-form-item label="用户名" prop="userName">
            <el-input v-model="formData.userName" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="原密码" prop="userPwd" :rules="formRules.userPwd">
            <el-input v-model="formData.userPwd"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newUserPwd" :rules="formRules.newUserPwd">
            <el-input v-model="formData.newUserPwd"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" prop="sureNewUserPwd" :rules="formRules.sureNewUserPwd">
            <el-input v-model="formData.sureNewUserPwd"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm">立即修改</el-button>
            <el-button @click="goBack">返回</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {updateUserPwd} from '@/api/users';
  import {Message} from 'element-ui';

  export default {
    name: "UsersUpdatePwd",
    data() {
      return {
        formSubmit: true,
        labelPosition: 'right',
        formData: {
          userName: '',
          userPwd: '',
          newUserPwd: '',
          sureNewUserPwd: '',
        },
        formRules: {
          userPwd: [
            {required: true, message: '原密码不能为空!'}
          ],
          newUserPwd: [{required: true, message: '新密码不能为空!'}],
          sureNewUserPwd: [{required: true, message: '新密码不能为空!'}]
        }
      }
    },
    watch: {},
    created() {
      this.formData.userName = this.$store.getters.name;
    },
    methods: {
      goBack: function () {
        this.$store.dispatch('delAllVisitedViews');
        this.$router.go(-1);
      },
      submitForm() {
        this.$refs['userUpdatePwdForm'].validate((valid) => {
        });
      }
    }
  }
</script>

<style scoped>

</style>
