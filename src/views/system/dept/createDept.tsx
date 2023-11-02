import { Modal, Form, Input, Select, TreeSelect } from 'antd'
import { useState, useImperativeHandle, useEffect } from 'react'
import { useForm } from 'antd/es/form/Form'
import { IAction, IModalProps } from '@/types/modal'
import { Dept, User } from '@/types'
import api from '@/api'
import { message } from '@/utils/AntdGloble'

export default function CreateDept(props: IModalProps) {
  const [action, setAction] = useState<IAction>('create')
  const [visible, setVisible] = useState(false)
  const [depList, setDepList] = useState<Dept.DeptItem[]>([])
  const [allUserList, setAllUserList] = useState<User.UserItem[]>()
  const [form] = useForm()

  const open = (
    type: IAction,
    data?: Dept.EditParams | { parent_id: string }
  ) => {
    getDeptList()
    setAction(type)
    setVisible(true)
    if (data) form.setFieldsValue(data)
  }

  const getDeptList = async () => {
    const data = await api.getDeptList()
    setDepList(data)
  }
  const getAllUserList = async () => {
    const data = await api.getAllUserList()
    setAllUserList(data)
  }
  const handleSubmit = async () => {
    const validate = await form.validateFields()
    if (validate) {
      if (action === 'create') {
        await api.createDept(form.getFieldsValue())
      } else if (action === 'edit') {
        await api.editDept(form.getFieldsValue())
      }
    }
    message.success('操作成功')
    handleCancel()
    props.update()
  }
  const handleCancel = () => {
    setVisible(false)
    form.resetFields()
  }

  useImperativeHandle(props.mRef, () => ({ open }))
  useEffect(() => {
    getAllUserList()
  }, [])

  return (
    <Modal
      title={action === 'create' ? '新增部门' : '编辑部门'}
      width={800}
      open={visible}
      okText='提交'
      onOk={handleSubmit}
      cancelText='取消'
      onCancel={handleCancel}
    >
      <Form form={form} labelAlign='right' labelCol={{ span: 4 }}>
        <Form.Item hidden name='_id'>
          <Input />
        </Form.Item>
        <Form.Item label='上级部门' name='parentId'>
          <TreeSelect
            placeholder='请选择上级部门'
            allowClear
            treeDefaultExpandAll
            treeData={depList}
            fieldNames={{ label: 'deptName', value: '_id' }}
          ></TreeSelect>
        </Form.Item>
        <Form.Item
          label='部门名称'
          name='deptName'
          rules={[{ required: true, message: '请填写部门名称后提交' }]}
        >
          <Input placeholder='请输入新创建的部门名称'></Input>
        </Form.Item>
        <Form.Item
          label='负责人'
          name='userName'
          rules={[{ required: true, message: '请选择负责人后提交' }]}
        >
          <Select>
            {allUserList?.map(user => {
              return (
                <Select.Option key={user.userId} value={user.userName}>
                  {user.userName}
                </Select.Option>
              )
            })}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}
