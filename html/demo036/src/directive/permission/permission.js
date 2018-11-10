import store from '@/store'

export default {
  inserted(el, binding, vnode) {
    const {value} = binding;
    const resources = store.getters && store.getters.resources;

    if (value ) {

      const hasPermission = resources.indexOf(value) > -1;

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`need resourceCode! Like v-permission="ReourcesAdd"`)
    }
  }
}
