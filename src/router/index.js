import Vue from 'vue'
import Router from 'vue-router'
import Sell from '@/components/Main/Sell'
import MainIndex from '@/components/Main/MainIndex'
import Stock from '@/components/Main/Stock'
import Customer from '@/components/Main/Customer'
import Employee from '@/components/Main/Employee'
import SellWeek from '@/components/Sell/SellWeek'
import SellMonth from '@/components/Sell/SellMonth'
import UserInfo from '@/components/Main/UserInfo'
import Login from '@/components/Login'
import Main from '@/components/Main'
import BrandStock from '@/components/Stock/BrandStock'

Vue.use(Router)

export default new Router({
  routes: [  
    {
      path: '/main',
      name: 'Main',
      component: Main,
      children: [
        {
          path: 'sell', component: Sell,
           children: [
            { path: 'week', component: SellWeek },
            { path: 'month',component: SellMonth }
          ]
        },
        { path: 'index',component: MainIndex },
        { path: 'stock', component: Stock,
          children:[
            {path:'brand',component:BrandStock}
          ] 
        },
        { path: 'customer', component: Customer },
        { path: 'employee', component: Employee },
        { path: 'userinfo', component: UserInfo }
      ]
    },
    {
      path: '/',
      name: 'Login',
      component: Login
    }, {
      path: '/logout',
      name: 'Logout',
      component: Login
    }
  ]
})
