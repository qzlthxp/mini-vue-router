import { ref } from 'vue'
import RouterLink from './router-link'
import RouterView from './router-view'

export function createRouter(options) {
  const route = {}
  /**
   * router 实例
   *
   * use使用这个插件所以有一个 install 方法
   */
  const router = {
    options,
    current: ref(window.location.hash.slice(1)),
    install(app) {
      // 1. 注册两个全局组件  router-link \ router-view
      app.component('RouterLink', RouterLink)
      app.component('RouterView', RouterView)
      // 2. 注册两个全局属性 $router \ $route
      app.config.globalProperties.$router = router
      app.config.globalProperties.$route = route
    }
  }

  // 监听路由变化
  window.addEventListener('hashchange', () => {
    /**
     * 变化保存到 current 并触发 router-view 更新
     * 所以 1. current 为响应式
     * 2. routerview 可能需要监听这个值
     */
    const hash = window.location.hash.slice(1)
    router.current.value = hash
  })

  return router
}
