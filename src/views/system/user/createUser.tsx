import storage from '@/utils/storage'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { Modal, Form, Input, Select, Upload } from 'antd'
import { useForm } from 'antd/es/form/Form'
import type { UploadChangeParam } from 'antd/es/upload'
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface'
import { useState, useImperativeHandle } from 'react'
import { message } from '@/utils/AntdGloble'
import { IAction, IModalProps } from '@/types/modal'
import { User } from '../../../types/index'

const CreateUser = (props: IModalProps) => {
  const [form] = useForm()
  const handleSubmit = async () => {
    const valid = await form.validateFields()
    console.log(valid)
  }
  const handleCancel = () => {}

  const [loading, setLoading] = useState(false)
  const [img, setImg] = useState('')

  const handleChange: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      setLoading(false)
      const { data, code, msg } = info.file.response
      if (code === 0) {
        setImg(data.file)
      } else {
        message.error(msg)
      }
    } else if (info.file.status === 'error') {
      message.error('服务器异常，请稍后重试')
    }
  }

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!')
      return false
    }
    const isLt500K = file.size / 1024 / 1024 < 0.5
    if (!isLt500K) {
      message.error('Image must smaller than 500k!')
    }
    return isJpgOrPng && isLt500K
  }

  const [visible, setVisible] = useState(false)

  useImperativeHandle(props.mRef, () => {
    return {
      open
    }
  })

  const [action, setAction] = useState<IAction>('create')

  const open = (type: IAction, data?: User.UserItem) => {
    setVisible(true)
    setAction(type)
  }

  return (
    <Modal
      title='创建用户'
      width={800}
      open={visible}
      onOk={handleSubmit}
      okText='确认'
      onCancel={handleCancel}
      cancelText='取消'
    >
      <Form form={form} labelCol={{ span: 4 }} labelAlign='right'>
        <Form.Item
          label='用户名称'
          name='userName'
          rules={[{ required: true, message: '请填写用户名后提交' }]}
        >
          <Input placeholder='请输入用户名称' />
        </Form.Item>
        <Form.Item
          label='用户邮箱'
          name='userEmail'
          rules={[{ required: true, message: '请填写邮箱后提交' }]}
        >
          <Input placeholder='请输入邮箱' />
        </Form.Item>
        <Form.Item label='手机号' name='mobile'>
          <Input type='number' placeholder='请输入手机号' />
        </Form.Item>
        <Form.Item
          label='部门'
          name='deptId'
          rules={[{ required: true, message: '请选择部门后提交' }]}
        >
          <Input placeholder='请输入岗位' />
        </Form.Item>
        <Form.Item label='岗位' name='job'>
          <Input placeholder='请输入岗位' />
        </Form.Item>
        <Form.Item label='状态' name='state'>
          <Select>
            <Select.Option value={1}>在职</Select.Option>
            <Select.Option value={2}>离职</Select.Option>
            <Select.Option value={3}>试用期</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label='角色'>
          <Input />
        </Form.Item>
        <Form.Item label='用户头像'>
          <Upload
            listType='picture-circle'
            showUploadList={false}
            action='api/users/upload'
            beforeUpload={beforeUpload}
            onChange={handleChange}
            headers={{
              Authorization: 'Bearer ' + storage.get('token'),
              icode: '8126FAA7CDD41424'
            }}
          >
            {img ? (
              <img src={img} style={{ width: '100%' }} />
            ) : (
              <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div>用户头像上传</div>
              </div>
            )}
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateUser
