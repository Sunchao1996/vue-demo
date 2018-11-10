<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-button type="primary" @click.native="refresh">刷新</el-button>
        <el-button type="success" @click.native="addResources">新增</el-button>
      </el-col>
    </el-row>
    <div style="margin: 20px;"></div>
    <el-row>
      <el-col :span="24">
        <tree-table :data="tableData.data" :columns="tableData.columens"
                    :border="tableData.borderF">

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">修改
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
        </tree-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {resourcesList, delResource} from '@/api/resources';
  import treeTable from '@/components/TreeTable';
  import {Message, MessageBox} from 'element-ui';

  export default {
    name: "Resources",
    components: {treeTable},
    data() {
      return {
        tableData: {
          borderF: true,
          columens: [
            {value: 'resourceName', text: '名称', width: ''},
            {value: 'resourceCode', text: '代码', width: ''}
          ],
          data: []
        }
      }
    },
    created() {
      this.$store.dispatch('delRegexView', '/sys/resources');
      resourcesList({permissionName: this.$route.meta.permissionName}).then(response => {
        this.tableData.data = response.data;
      });
    }, methods: {
      refresh: function () {
        this.$router.replace({path: '/sys/resources/index', query: {v: (new Date()).getTime()}});
      },
      addResources: function () {
        const route = this.$route;
        this.$router.push({name: 'ResourcesAdd', params: {list: this.tableData.data}});
        this.$store.dispatch('delView', route);
      },
      handleEdit: function (index, record) {
        const route = this.$route;
        this.$router.push({name: 'ResourcesUpdate', params: {list: this.tableData.data, id: record.id}});
        this.$store.dispatch('delView', route);
      },
      handleDelete: function (index, record) {
        MessageBox.confirm('是否删除资源', '删除', {
          callback: (action, instance) => {
            if (action === 'confirm') {
              new Promise(((resolve, reject) => {
                delResource({id: record.id, permissionName: 'ResourcesDel'}).then((res) => {
                  this.$router.replace({path: '/sys/resources/index', query: {v: (new Date()).getTime()}});
                });
              })).catch(error => {
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
</style>
