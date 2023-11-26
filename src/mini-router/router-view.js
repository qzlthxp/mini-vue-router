import {
  defineAsyncComponent,
  defineComponent,
  getCurrentInstance,
  h,
  unref
} from 'vue'

export default defineComponent({
  setup() {
    return () => {
      /**
       * 1.获取想要的组件进行渲染
       * 如果我们想渲染子路由对应组件，都会在父组件写上 <router-view></router-view>
       * 有时还可以给这些 router-view 命名（命名视图），然后根据routes里配置进行区分渲染
       * 也就是说只要某个父组件中存在 router-view组件，只要监听到路由变化 就会找到对应子组件进行渲染
       *
       * 1.1 获取 router.config.routes
       * 1.2 根据当前路由current 匹配routes 获取component
       */

      // 获取组件实例
      const {
        proxy: { $router }
      } = getCurrentInstance()
      const {
        options: { routes },
        current
      } = $router

      let component

      const route = routes.find((route) => route.path === unref(current))

      if (route) {
        // typeof 同步组件 function
        // typeof 异步组件 object
        component =
          typeof route.component === 'function'
            ? defineAsyncComponent(route.component)
            : route.component
        return h('div', { Component: component }, h(component, null))
      } else {
        console.warn('no match componet')
        const notFound = routes.find((route) => route.path === '*')
        if (notFound) {
          component =
            typeof notFound.component === 'function'
              ? defineAsyncComponent(notFound.component)
              : notFound.component
          return h('div', { Component: component }, h(component, null))
        }
        return h('div', { Component: '' }, h('div', null))
      }
    }
  }
})
