<template>
  <div class="app-container">
    <el-row>
      <el-col :offset="5" :span="12">
        <el-form ref="userUpdatePwdForm" :label-position="labelPosition" label-width="100px" :model="formData">
          <el-form-item label="用户名" prop="userName">
            <el-input v-model="formData.userName" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="原密码" prop="userPwd" :rules="formRules.userPwd">
            <el-input type="password" v-model="formData.userPwd"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newUserPwd" :rules="formRules.newUserPwd">
            <pwd-input @save-pwd="savePwd"></pwd-input>
          </el-form-item>
          <el-form-item label="确认新密码" prop="sureNewUserPwd" :rules="formRules.sureNewUserPwd">
            <el-input type="password" v-model="formData.sureNewUserPwd"></el-input>
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
  import {Message, MessageBox} from 'element-ui';
  import PwdInput from '@/components/PwdInput';

  export default {
    name: "UsersUpdatePwd",
    components: {'pwd-input': PwdInput},
    data() {
      const vm = this;
      let checkNewPwdSure = function (rule, value, callback) {
        if (vm.formData.newUserPwd !== '' && vm.formData.newUserPwd === value) {
          callback();
        } else {
          callback(new Error('两次输入密码不一致!'));
        }
      };
      let checkNewPwd = function (rule, value, callback) {
        if (vm.passwordLengthValid) {
          callback();
        } else {
          callback(new Error('新密码应该包含大写字母+小写字母+数字！'));
        }
      };
      return {
        formSubmit: true,
        labelPosition: 'right',
        passwordLengthValid: false,
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
          newUserPwd: [
            {required: true, message: '新密码不能为空!'},
            {min: 6, message: '新密码至少六位', trigger: 'blur'},
            {validator: checkNewPwd, trigger: 'change'}
          ],
          sureNewUserPwd: [
            {required: true, message: '新密码不能为空!'},
            {min: 6, message: '新密码至少六位', trigger: 'blur'},
            {validator: checkNewPwdSure, trigger: 'change'}
          ]
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
          if (valid) {
            MessageBox.confirm('是否确认修改密码?', '提示', {
              callback: (action, instance) => {
                if (action === 'confirm') {
                  updateUserPwd(this.formData).then(() => {
                    this.$store.dispatch('LogOut').then(() => {
                      location.reload()// In order to re-instantiate the vue-router object to avoid bugs
                    })
                  }).catch(() => {
                    Message({
                      message: '密码修改失败',
                      type: 'error',
                      duration: 5000
                    });
                  });
                }
              }
            });
          }
        });
      },
      savePwd: function (pwd, vp, vl) {
        this.formData.newUserPwd = pwd;
        this.passwordLengthValid = vp;
      }
    }
  }
</script>

<style scoped>

</style>
