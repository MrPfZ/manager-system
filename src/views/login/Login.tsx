import style from './index.module.less'
import { Button, Form, Input, App } from 'antd'
import api from '@/api'
import { Login } from '@/types/api'
import storage from '@/utils/storage'

export default function LoginFC() {
  const { message } = App.useApp()
  const onFinish = async (values: Login.params) => {
    const data = await api.login(values)
    storage.set('token', data)
    message.success('登录成功')
    const params = new URLSearchParams(location.search)
    location.href = params.get('callback') || '/welcome'
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div className={style.login}>
      <div className={style.loginWrapper}>
        <div className={style.title}>登录</div>
        <Form
          name='basic'
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
        >
          <Form.Item
            label='Username'
            name='userName'
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Password'
            name='userPwd'
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type='primary' htmlType='submit' block>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
