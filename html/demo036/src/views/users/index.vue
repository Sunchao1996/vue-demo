<template>
  <div class="app-container">
    <div style="margin: 20px;"></div>
    <el-row>
      <el-col :span="5">用户名:
        <el-input
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          v-model="searchData.userName"
          name="userName"
          :style="{width:160+'px'}">
        </el-input>
      </el-col>
      <el-col :span="5">真实姓名:
        <el-input
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          v-model="searchData.userRealName"
          name="userName"
          :style="{width:160+'px'}">
        </el-input>
      </el-col>
      <el-col :span="5">状态:
        <el-select v-model="searchData.userStatus" placeholder="请选择" :style="{width:160+'px'}">
          <el-option
            :key="0"
            label="正常"
            :value="0">
          </el-option>
          <el-option
            :key="1"
            label="锁定"
            :value="1">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="9">
        <el-button type="primary" @click.native="handleCurrentChange(0)">查询</el-button>
        <el-button type="success" @click.native="addUser">新增</el-button>
      </el-col>
    </el-row>
    <div style="margin: 20px;"></div>
    <el-row>
      <el-col :span="24">
        <template>
          <el-table :border="true"
                    :data="tableData"
                    style="width: 100%"
                    :row-class-name="tableRowClassName">
            <el-table-column align="center"
                             prop="userName"
                             label="用户名"
            >
            </el-table-column>
            <el-table-column align="center"
                             prop="userRealName"
                             label="真实姓名"
            >
            </el-table-column>
            <el-table-column align="center"
                             prop="userAvatar"
                             label="头像"
            >
              <template slot-scope="scope">
                <div class="avatar-wrapper">
                  <img :src="scope.row.userAvatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center"
                             prop="userMobile"
                             label="手机号"
            >
            </el-table-column>
            <el-table-column align="center"
                             prop="userStatus"
                             label="状态"
            >
              <template slot-scope="scope">
                <el-switch v-if="scope.row.userName!=='admin' && scope.row.userName !==$store.getters.name"
                           style="display: block"
                           active-color="#13ce66"
                           v-model="scope.row.userStatusB"
                           @change="changeStatus(scope.row.id)"
                           inactive-color="#ff4949"
                           active-text="正常"
                           inactive-text="锁定">
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column align="center" label="密码" v-if="$store.getters.roles.indexOf('admin') > -1">
              <template slot-scope="scope">
                <el-button
                  type="danger"
                  size="mini"
                  @click.native="resetPwd(scope.row.id)"
                >重置密码
                </el-button>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click.native="updateUser(scope.row.id)"
                >修改
                </el-button>
                <el-button v-if="scope.row.userName!=='admin'"
                           size="mini"
                           type="danger"
                           @click.native="delUser(scope.row.id)"
                >删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-col>
    </el-row>
    <el-row>
      <el-pagination
        :background="true"
        @current-change="handleCurrentChange"
        :current-page.sync="searchData.pageIndex"
        :page-size="searchData.pageSize"
        layout="total, prev, pager, next"
        :total="searchData.total">
      </el-pagination>
    </el-row>
  </div>
</template>

<script>
  import {usersList, usersStatusUpdate, usersResetPwd, deleteUser} from '@/api/users';
  import {Message, MessageBox} from 'element-ui';

  export default {
    name: "Users",
    data() {
      return {
        tableData: [],
        searchData: {
          userName: '',
          userRealName: '',
          userStatus: '',
          pageIndex: 1,
          pageSize: 0,
          total: 0
        }
      }
    },
    created() {
      usersList({}).then((res) => {
        this.$store.dispatch('delRegexView', '/sys/users');
        this.tableData = res.data.data;
        this.searchData.total = res.data.total;
        this.searchData.pageIndex = res.data.pageIndex;
        this.searchData.pageSize = res.data.pageSize;
      })
    },
    methods: {
      searchTable: function () {
      },
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },
      handleCurrentChange(curPageIndex) {
        const data = this.searchData;
        usersList(data).then((res) => {
          this.tableData = res.data.data;
          this.searchData.total = res.data.total;
          this.searchData.pageIndex = res.data.pageIndex;
          this.searchData.pageSize = res.data.pageSize;
        })
      },
      addUser: function () {
        const route = this.$route;
        this.$router.push({name: 'UsersAdd'});
        this.$store.dispatch('delView', route);
      },
      updateUser: function (recordId) {
        const route = this.$route;
        this.$router.push({name: 'UsersUpdate', params: {id: recordId}});
        this.$store.dispatch('delView', route);
      },
      delUser: function (recordId) {
        MessageBox.confirm('是否删除用户?', '删除', {
          callback: (action, instance) => {
            if (action === 'confirm') {
              deleteUser(recordId).then(() => {
                this.$router.replace({path: '/sys/users/index', query: {v: (new Date()).getTime()}});
              }).catch(() => {
                Message({
                  message: '操作失败',
                  type: 'error',
                  duration: 5000
                });
              });
            }
          }
        });
      },
      changeStatus(recordId) {
        usersStatusUpdate({'usid': recordId}).then(() => {
          Message({
            message: '操作成功~',
            type: 'success',
            duration: 5000
          });
        }).catch((err) => {
          Message({
            message: '操作失败~',
            type: 'error',
            duration: 5000
          });
        });
      },
      resetPwd(recordId) {
        usersResetPwd({'usid': recordId}).then(() => {
          Message({
            message: '操作成功~',
            type: 'success',
            duration: 5000
          });
        }).catch((err) => {
          Message({
            message: '操作失败~',
            type: 'error',
            duration: 5000
          });
        });
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }

  .avatar-wrapper {
    border-radius: 0px !important;
    height: 26px;
    margin-right: 30px;
    cursor: pointer;
    position: relative;
    .user-avatar {
      width: 25px;
      height: 25px;
      border-radius: 10px;
    }
  }
</style>
