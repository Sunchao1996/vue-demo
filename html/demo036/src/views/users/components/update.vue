<template>
  <div class="app-container">
    <el-row>
      <el-col :offset="5" :span="14">
        <el-form ref="userUpdateForm" :label-position="labelPosition" label-width="100px" :model="formData">
          <el-form-item label="用户名" prop="userName" :rules="formRules.userName">
            <el-input v-model="formData.userName" :disabled="true"></el-input>
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
            <el-button type="primary" @click="submitForm">立即更新</el-button>
            <el-button @click="goBack">返回</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {checkUserName, getUserById, updateUser} from '@/api/users';
  import {rolesList} from '@/api/roles';
  import {Message} from 'element-ui';
  import myUpload from 'vue-image-crop-upload';
  import PanThumb from '@/components/PanThumb'

  export default {
    name: "UsersUpdate",
    components: {
      'my-upload': myUpload,
      PanThumb
    },
    data() {
      const vm = this;
      const validUserName = (rule, value, callback) => {
        if (vm.oldUserName !== undefined && value !== vm.oldUserName) {
          checkUserName(value).then(res => {
            if (res.data === false) {
              callback(new Error('用户名已经存在'));
            } else {
              callback();
            }
          }).catch(e => {
            callback(new Error('校验失败~'))
          });
        } else {
          callback();
        }
      };
      return {
        oldUserName: '',
        formSubmit: true,
        avatarComponentShow: false,
        labelPosition: 'right',
        checkRolesId: [],
        userRolesAllId: [],
        formData: {
          id: '',
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
      //获取角色列表
      rolesList({}).then((res) => {
        this.formSubmit = true;
        for (let i of res.data) {
          this.userRolesAllId.push({
            key: '' + i.id,
            label: i.roleName
          })
        }
        //获取用户
        const userId = this.$route.params.id;
        getUserById(userId).then((res) => {
          this.formSubmit = true;
          this.formData = Object.assign({}, this.formData, res.data);
          this.formData.imgDataUrl = this.formData.userAvatar;
          this.oldUserName = this.formData.userName;
          //获取拥有的角色id
          this.checkRolesId = this.formData.roles.split('@');
        }).catch(() => {
          this.formSubmit = false;
        });
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
        this.$refs['userUpdateForm'].validate((valid) => {
          if (valid && this.formSubmit) {
            updateUser(this.formData).then(() => {
              this.$router.replace({name: 'Users'});
            }).catch(() => {
              console.log('修改用户失败');
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
