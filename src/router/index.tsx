import { Navigate, createBrowserRouter } from 'react-router-dom'
import Login from '@/views/login/Login'
import Welcome from '@/views/home-page/Welcome'
import Err404 from '@/views/Err404.tsx'
import Err403 from '@/views/Err403.tsx'
import Layout from '@/layout'
import Dashboard from '@/views/dashboard'
import UserList from '@/views/system/user/index'
import DeptList from '@/views/system/dept'

const route = [
  {
    path: '/',
    element: <Navigate to={'/welcome'} />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    element: <Layout />,
    children: [
      {
        path: '/welcome',
        element: <Welcome />
      },
      {
        path: '/dashboard',
        element: <Dashboard />
      },
      {
        path: '/userList',
        element: <UserList />
      },
      {
        path: '/deptList',
        element: <DeptList />
      }
    ]
  },
  {
    path: '/404',
    element: <Err404 />
  },
  {
    path: '/403',
    element: <Err403 />
  },
  {
    path: '*',
    element: <Navigate to='/404' />
  }
]

export default createBrowserRouter(route)
