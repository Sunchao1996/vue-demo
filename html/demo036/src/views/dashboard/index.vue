<template>
  <!--不同角色显示不同页面-->
  <div class="dashboard-container">
    <component :is="currentRole"/>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import adminDashboard from './admin'
  import editorDashboard from './editor'

  export default {
    name: 'Dashboard',
    components: {adminDashboard, editorDashboard},
    data() {
      return {
        currentRole: 'editorDashboard'
      }
    },
    computed: {
      ...mapGetters([
        'roles'
      ])
    }
  }
</script>
