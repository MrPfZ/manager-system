import { Breadcrumb, Dropdown, Switch } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import styles from './index.module.less'
import { useStore } from '@/store'

const NavHeader = () => {
  const { userInfo, collapsed, updateCollasped } = useStore()
  const items: MenuProps['items'] = [
    {
      key: 'email',
      label: '邮箱：' + userInfo.userEmail
    },
    {
      key: 'logout',
      label: '退出登录'
    }
  ]
  const toggleCollapsed = () => {
    updateCollasped()
  }
  return (
    <div className={styles.navHeader}>
      <div className={styles.headerLeft}>
        <div onClick={toggleCollapsed}>
          {collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
        </div>
        <Breadcrumb items={[{ title: '首页' }]} style={{ marginLeft: 10 }} />
      </div>
      <div className='headerRight'>
        <Switch checkedChildren='暗黑' unCheckedChildren='默认' />
        <Dropdown menu={{ items }} trigger={['click']}>
          <span className={styles.user}>{userInfo.userName}</span>
        </Dropdown>
      </div>
    </div>
  )
}
export default NavHeader
