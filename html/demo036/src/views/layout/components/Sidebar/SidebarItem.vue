<template>
  <div v-if="!item.hidden&&item.children" class="menu-wrapper">

    <template
      v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
      <app-link :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
          <item v-if="onlyOneChild.meta" :icon="onlyOneChild.meta.icon||item.meta.icon"
                :title="generateTitle(onlyOneChild.meta.title)"/>
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu v-else ref="submenu" :index="resolvePath(item.path)">
      <template slot="title">
        <item v-if="item.meta" :icon="item.meta.icon" :title="generateTitle(item.meta.title)"/>
      </template>

      <template v-for="child in item.children" v-if="!child.hidden">
        <sidebar-item
          v-if="child.children&&child.children.length>0"
          :is-nest="true"
          :item="child"
          :key="child.path"
          :base-path="resolvePath(child.path)"
          class="nest-menu"/>
        <!--resolvePath将路径解析为绝对路径-->
        <app-link v-else :to="resolvePath(child.path)" :key="child.name">
          <el-menu-item :index="resolvePath(child.path)">
            <item v-if="child.meta" :icon="child.meta.icon" :title="generateTitle(child.meta.title)"/>
          </el-menu-item>
        </app-link>
      </template>
    </el-submenu>

  </div>
</template>

<script>
  import path from 'path'
  import {generateTitle} from '@/utils/i18n'
  import {isExternal} from '@/utils'
  import Item from './Item'
  import AppLink from './Link'
  import FixiOSBug from './FixiOSBug'

  export default {
    name: 'SidebarItem',
    components: {Item, AppLink},
    mixins: [FixiOSBug],
    props: {
      // route object
      item: {
        type: Object,
        required: true
      },
      isNest: {
        type: Boolean,
        default: false
      },
      basePath: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        onlyOneChild: null
      }
    },
    methods: {
      hasOneShowingChild(children, parent) {
        //判断有没有子节点，有几个子节点，子节点是否隐藏，没有子节点的话把父节点作为仅有的节点
        const showingChildren = children.filter(item => {
          if (item.hidden) {
            return false
          } else {
            this.onlyOneChild = item;
            return true
          }
        });

        if (showingChildren.length === 1) {
          return true
        }

        if (showingChildren.length === 0) {
          this.onlyOneChild = {...parent, path: '', noShowingChildren: true};
          return true
        }
        return false
      },
      resolvePath(routePath) {
        if (this.isExternalLink(routePath)) {
          return routePath
        }
        return path.resolve(this.basePath, routePath)
      },
      isExternalLink(routePath) {
        return isExternal(routePath)
      },
      generateTitle
    }
  }
</script>
