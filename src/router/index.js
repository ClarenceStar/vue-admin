import Profile from '../pages/Profile'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Main from '../pages/Main'
import Forget from '../pages/Forget'
import Welcome from '../pages/nav1/Welcome'
import Blog from '../pages/nav2/Blog'
import Nofind from '../pages/nav2/Nofind'
import page1 from '../pages/nav3/Blog'
import page2 from '../pages/nav3/Nofind'
import page3 from '../pages/nav4/Blog'
import page4 from '../pages/nav4/Nofind'
import Step1 from '../pages/stepForm/Step1'
import Step2 from '../pages/stepForm/Step2'
import Step3 from '../pages/stepForm/Step3'

let routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    hidden: true
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    hidden: true
  },
  {
    path: '/forget',
    name: 'Forget',
    component: Forget,
    redirect: '/forget/step1',
    hidden: true,
    children: [
      { path: '/forget/step1', component: Step1, name: '确认用户名' },
      { path: '/forget/step2', component: Step2, name: '/forget/step2' },
      { path: '/forget/step3', component: Step3, name: '/forget/step3' }
    ]
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    hidden: true
  },
  {
    path: '/main',
    component: Main,
    name: '',
    id: '1',
    iconCls: 'el-icon-location',
    leaf: true, //只有一个节点
    children: [{ path: '/main/welcome', component: Welcome, name: '欢迎页' }]
  },
  {
    path: '/main',
    component: Main,
    name: '导航一',
    id: '2',
    iconCls: 'el-icon-menu',
    multi: true,
    children: [
      {
        path: '/main/blog',
        iconCls: 'el-icon-star-on',
        component: Blog,
        name: '个人博客',
        children: [
          {
            path: '/main/blog/404',
            iconCls: 'el-icon-star-on',
            component: Nofind,
            name: '404'
          }
        ]
      },
      {
        path: '/main/404',
        iconCls: 'el-icon-star-on',
        component: Nofind,
        name: '未找到'
      }
    ]
  },
  {
    path: '/main',
    component: Main,
    name: '导航二',
    id: '3',
    iconCls: 'el-icon-document',
    children: [
      {
        path: '/main/page1',
        iconCls: 'el-icon-star-on',
        component: page1,
        name: 'page1'
      },
      {
        path: '/main/page2',
        iconCls: 'el-icon-star-on',
        component: page2,
        name: 'page2'
      }
    ]
  },
  {
    path: '/main',
    component: Main,
    name: '导航三',
    id: '4',
    iconCls: 'el-icon-setting',
    children: [
      {
        path: '/main/page3',
        iconCls: 'el-icon-star-on',
        component: page3,
        name: 'page3'
      },
      {
        path: '/main/page4',
        iconCls: 'el-icon-star-on',
        component: page4,
        name: 'page4'
      }
    ]
  }
]
export default routes
