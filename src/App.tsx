import router from './router'
import { RouterProvider } from 'react-router'
import { ConfigProvider, App as AntdApp } from 'antd'
import './App.less'
import AntdGloble from './utils/AntdGloble'

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#ed6c00'
        }
      }}
    >
      <AntdApp>
        <AntdGloble />
        <RouterProvider router={router} />
      </AntdApp>
    </ConfigProvider>
  )
}

export default App
