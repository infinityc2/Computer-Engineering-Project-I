import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Admin/Login'
import Howto from '@/components/Howto'
import Admin from '@/components/Admin/Admin'
import Comments from '@/components/Customer/Comments'
import Order from '@/components/Customer/Order'
import Bill from '@/components/Customer/Bill'
import ViewComments from '@/components/Admin/ViewComments'
import Receive from '@/components/Admin/Receive'
import ManageEmp from '@/components/Admin/ManageEmp'
import ManageList from '@/components/Admin/ManageList'
import ManageTable from '@/components/Admin/ManageTable'
import Purchased from '@/components/Admin/Purchased'
import EmpLogin from '@/components/Employee/EmpLogin'
import EmpManage from '@/components/Employee/EmpManage'
import ClearTable from '@/components/Employee/ClearTable'
import Stock from '@/components/Employee/Stock'
import EmpBill from '@/components/Employee/EmpBill'
import Service from '@/components/Employee/Service'
import firebase from 'firebase'

Vue.use(Router)

// router for using change page with SPA
const router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/home'
    },
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/howto',
      name: 'Howto',
      component: Howto
    },
    {
      path: '/order',
      name: 'Order',
      component: Order
    },
    {
      path: '/bill',
      name: 'Bill',
      component: Bill
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/emp',
      name: 'ManageEmp',
      component: ManageEmp,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/service',
      name: 'Service',
      component: Service,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/receive',
      name: 'Receive',
      component: Receive,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/comments',
      name: 'Comments',
      component: Comments
    },
    {
      path: '/view',
      name: 'ViewComments',
      component: ViewComments,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/purchased',
      name: 'Purchased',
      component: Purchased,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/manage',
      name: 'ManageList',
      component: ManageList,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/managetable',
      name: 'ManageTable',
      component: ManageTable,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/emplogin',
      name: 'EmpLogin',
      component: EmpLogin
    },
    {
      path: '/empmanage',
      name: 'EmpManage',
      component: EmpManage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/cleartable',
      name: 'ClearTable',
      component: ClearTable,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/stock',
      name: 'Stock',
      component: Stock,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/empbill',
      name: 'EmpBill',
      component: EmpBill,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !currentUser) next('login')
  // else if (!requiresAuth && currentUser) next('home')
  else next()
})

export default router
