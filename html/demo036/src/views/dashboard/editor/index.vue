<template>
  <div class="dashboard-editor-container">
    <div class=" clearfix">
      <pan-thumb :image="avatar" style="float: left"> 拥有角色:
        <span v-for="item in roleName" :key="item" class="pan-info-roles">{{ item }}</span>
      </pan-thumb>
      <div class="info-container">
        <span class="display_name">{{ userRealName }}</span>
        <span style="font-size:20px ;display:inline-block;">

        </span>
      </div>
    </div>
    <div style="padding-top: 10px;">
      <router-link style="padding-top:12px;padding-left:45px;height: 40px;width:150px" class="pan-btn green-btn"
                   :to="{path:'sys/users/updatePwd'}">修改密码
      </router-link>
    </div>
    <div>
      <img :src="emptyGif" class="emptyGif">
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import PanThumb from '@/components/PanThumb'

  export default {
    name: 'DashboardEditor',
    components: {PanThumb},
    data() {
      return {
        roleName: [],
        emptyGif: 'https://wpimg.wallstcn.com/0e03b7da-db9e-4819-ba10-9016ddfdaed3'
      }
    },
    computed: {
      ...mapGetters([
        'name',
        'avatar',
        'roles',
        'userRealName'
      ])
    },
    created: function () {
      let roleNameTemp = this.$store.getters.roleName;
      roleNameTemp = roleNameTemp.substring(0, roleNameTemp.length - 1);
      this.roleName = roleNameTemp.split('@');
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .emptyGif {
    display: block;
    width: 45%;
    margin: 0 auto;
  }

  .dashboard-editor-container {
    background-color: #e3e3e3;
    min-height: 100vh;
    padding: 50px 60px 0px;
    .pan-info-roles {
      font-size: 12px;
      font-weight: 700;
      color: #333;
      display: block;
    }
    .info-container {
      position: relative;
      margin-left: 190px;
      height: 150px;
      line-height: 200px;
      .display_name {
        font-size: 48px;
        line-height: 48px;
        color: #212121;
        position: absolute;
        top: 25px;
      }
    }
  }
</style>
