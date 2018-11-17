<template>
  <div class="app-container">
    <el-row>
      <el-col :offset="5" :span="14">
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
            <el-col :span="3">
              <el-button type="primary" @click="chooseAvatar">选择</el-button>
            </el-col>
            <el-col :offset="1" :span="4">
              <pan-thumb :image="formData.imgDataUrl" :width="60+'px'" :height="60+'px'"/>
            </el-col>
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
            <el-transfer
              style="text-align: left; display: inline-block"
              filterable
              v-model="checkRolesId"
              :titles="['未选中角色', '选中角色']"
              :button-texts="['移除', '添加']"
              :format="{noChecked:'${total}',hasChecked:'${checked}/${total}'}"
              @change="roleChanage"
              :data="userRolesAllId"
            >
            </el-transfer>
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
  import {addRole, checkUserName, saveUser} from '@/api/users';
  import {rolesList} from '@/api/roles';
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
        formSubmit: true,
        avatarComponentShow: false,
        labelPosition: 'right',
        checkRolesId: [],
        userRolesAllId: [],
        formData: {
          userName: '',
          userMobile: '',
          userStatus: 0,
          userRealName: '',
          userAvatar: '',
          roles: '',
          userIntroduction: '',
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
      rolesList({}).then((res) => {
        this.formSubmit = true;
        for (let i of res.data) {
          this.userRolesAllId.push({
            key: i.id,
            label: i.roleName
          })
        }
      }).catch(() => {
        this.formSubmit = false;
        Message({
          message: '获取角色列表失败',
          type: 'error',
          duration: 5000
        });
      });
    },
    methods: {
      cropSuccess: function (imgDataUrl, field) {
        this.formData.userAvatar = imgDataUrl;
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
          if (valid && this.formSubmit) {
            saveUser(this.formData).then((res) => {
              this.$router.replace({name: 'Users'});
            }).catch(() => {
              // Message({
              //   message: '操作失败',
              //   type: 'error',
              //   duration: 5000
              // });
            });
          }
        });
      },
      roleChanage(cur, lr, key) {
        this.formData.roles = this.checkRolesId.join("@");
      }
    }
  }
</script>

<style scoped>

</style>
