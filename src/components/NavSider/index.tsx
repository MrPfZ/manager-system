import {
  DesktopOutlined,
  SettingOutlined,
  TeamOutlined,
  MenuOutlined,
  TrademarkCircleOutlined,
  ProfileOutlined
} from '@ant-design/icons'
import { Menu } from 'antd'
import styles from './index.module.less'
import { useNavigate } from 'react-router-dom'
import { useStore } from '@/store'

const NavSider = () => {
  const navigate = useNavigate()
  const collapsed = useStore(state => state.collapsed)
  const items = [
    {
      label: '工作台',
      key: 1,
      icon: <DesktopOutlined />
    },
    {
      label: '系统管理',
      key: 2,
      icon: <SettingOutlined />,
      children: [
        {
          label: '用户管理',
          key: 3,
          icon: <TeamOutlined />
        },
        {
          label: '菜单管理',
          key: 4,
          icon: <MenuOutlined />
        },
        {
          label: '角色管理',
          key: 5,
          icon: <TrademarkCircleOutlined />
        },
        {
          label: '部门管理',
          key: 6,
          icon: <ProfileOutlined />
        }
      ]
    }
  ]
  const logoClick = () => {
    navigate('/welcome')
  }
  return (
    <div>
      <div className={styles.logo}>
        <img src='/imgs/logo.png' className={styles.img} onClick={logoClick} />
        {collapsed ? '' : <span>极速货运</span>}
      </div>
      <Menu
        defaultSelectedKeys={['1']}
        mode='inline'
        items={items}
        theme='dark'
      />
    </div>
  )
}
export default NavSider
