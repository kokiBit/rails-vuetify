import Vue from 'vue/dist/vue.esm'
import Router from 'vue-router'
import store from '../store'
import Main from '../layout/main'
import Login from '../pages/login'
import Dashboard from '../pages/dashboard'
import Users from '../pages/admin/users'

function route (path, name, file, authMethod, children) {
  return {
    path,
    name,
    component: file,
    beforeEnter: authMethod,
    children: children,
  }
}

Vue.use(Router)

const ifNotAuthenticated = (to, from, next) => {
  if (!store.state.auth) {
    next()
    return
  }
  next('/dashboard')
}

const ifAuthenticated = (to, from, next) => {
  if (store.state.auth) {
    next()
    return
  }
  next('/login')
}

export default new Router({
  routes: [
    route('/login', 'Login', Login, ifNotAuthenticated),
    route('/', 'Main', Main, ifAuthenticated, [
      route('/dashboard', 'Dashboard', Dashboard, ifAuthenticated),
      route('/admin/users', 'Users', Users, ifAuthenticated),
    ]),
  ]
})
