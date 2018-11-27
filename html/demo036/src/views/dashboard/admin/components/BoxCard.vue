<template>
  <el-card class="box-card-component" style="margin-left:8px;">
    <div slot="header" class="box-card-header">
      <img src="https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png">
    </div>
    <div style="position:relative;">
      <pan-thumb :image="avatar" class="panThumb"/>
      <mallki class-name="mallki-text" text=" User Info"/>
      <div style="padding-top:35px;" class="progress-item">
        <span>姓名：</span>
      </div>
      <div class="progress-item" style="margin-left: 30px">
        <span>{{userRealName}}</span>
      </div>
      <div class="progress-item">
        <span>角色列表：</span>
      </div>
      <div v-for="(item,index) in roleName">
        <div class="progress-item" style="margin-left: 30px">
          <span>角色{{index+1}}-{{item}}</span>
        </div>
      </div>
      <div class="progress-item">
      </div>
    </div>
  </el-card>
</template>

<script>
  import {mapGetters} from 'vuex'
  import PanThumb from '@/components/PanThumb'
  import Mallki from '@/components/TextHoverEffect/Mallki'

  export default {
    components: {PanThumb, Mallki},
    data() {
      return {
        roleName: []
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

<style rel="stylesheet/scss" lang="scss">
  .box-card-component {
    .el-card__header {
      padding: 0px !important;
    }
  }
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
  .box-card-component {
    .box-card-header {
      position: relative;
      height: 220px;
      img {
        width: 100%;
        height: 100%;
        transition: all 0.2s linear;
        &:hover {
          transform: scale(1.1, 1.1);
          filter: contrast(130%);
        }
      }
    }
    .mallki-text {
      position: absolute;
      top: 0px;
      right: 0px;
      font-size: 20px;
      font-weight: bold;
    }
    .panThumb {
      z-index: 100;
      height: 70px !important;
      width: 70px !important;
      position: absolute !important;
      top: -45px;
      left: 0px;
      border: 5px solid #ffffff;
      background-color: #fff;
      margin: auto;
      box-shadow: none !important;
      /deep/ .pan-info {
        box-shadow: none !important;
      }
    }
    .progress-item {
      margin-bottom: 10px;
      font-size: 14px;
    }
    @media only screen and (max-width: 1330px) {
      .mallki-text {
        display: none;
      }
    }
  }
</style>
