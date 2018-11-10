<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-button type="primary" @click.native="refresh">刷新</el-button>
        <el-button type="success" @click.native="addRoles">新增</el-button>
      </el-col>
    </el-row>
    <div style="margin: 20px;"></div>
    <el-row>
      <el-col :span="24">
        <template>
          <el-table
            :data="tableData"
            style="width: 100%"
            :row-class-name="tableRowClassName">
            <el-table-column align="center"
                             prop="roleName"
                             label="名称"

            >
            </el-table-column>

            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="updateRole(scope.$index,scope.row)"
                >修改
                </el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                >删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {rolesList, delRole} from '@/api/roles';
  import {Message, MessageBox} from 'element-ui';

  export default {
    name: "Roles",
    data() {
      return {
        tableData: []
      }
    },
    created() {
      rolesList().then((res) => {
        this.$store.dispatch('delRegexView', '/sys/roles');
        this.tableData = res.data;
      })
    },
    methods: {
      refresh: function () {
        this.$router.push({path: '/sys/roles/index', query: {v: new Date().getTime()}})
      },
      addRoles: function () {
        const route = this.$route;
        this.$router.push({name: 'RolesAdd'});
        this.$store.dispatch('delView', route);
      },
      updateRole: function (index, record) {
        const route = this.$route;
        this.$router.push({name: 'RolesUpdate', params: {id: record.id}});
        this.$store.dispatch('delView', route);
      },
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },
      handleDelete: function (index, record) {
        MessageBox.confirm('是否删除角色?', '删除', {
          callback: (action, instance) => {
            if (action === 'confirm') {
              delRole(record.id).then(() => {
                this.$router.replace({path: '/sys/roles/index', query: {v: (new Date()).getTime()}});
              }).catch(() => {
                Message({
                  message: '失败',
                  type: 'error',
                  duration: 5000
                });
              });
            }
          }
        });
      }
    }
  }
</script>

<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
