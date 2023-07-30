import React from 'react'
import { Layout } from 'antd'
import NavHeader from '@/components/NavHeader'
import NavSider from '@/components/NavSider'
import NavFooter from '@/components/NavFooter'
import { Outlet } from 'react-router-dom'
import styles from './index.module.less'
import { useStore } from '@/store'
import { useEffect } from 'react'
import api from '@/api'

const { Sider } = Layout

const App: React.FC = () => {
  const { updateUserInfo, collapsed } = useStore()

  const getUserInfo = async () => {
    const data = await api.getUserInfo()
    updateUserInfo(data)
  }
  useEffect(() => {
    getUserInfo()
  }, [])

  return (
    <Layout>
      <Sider collapsed={collapsed}>
        <NavSider />
      </Sider>
      <Layout>
        <NavHeader />
        <div className={styles.content}>
          <div className={styles.wrapper}>
            <div>
              <Outlet></Outlet>
            </div>
            <NavFooter />
          </div>
        </div>
      </Layout>
    </Layout>
  )
}

export default App
