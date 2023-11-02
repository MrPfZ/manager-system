import { Button, Table, Form, Input, Select, Space, Checkbox } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { PageParams, User } from '@/types'
import { useState, useEffect, useRef } from 'react'
import api from '@/api'
import CreateUser from './createUser'
import { IAction, IModalProps } from '@/types/modal'

export default function UserList() {
  // 表格数据
  const [data, setData] = useState<User.UserItem[]>([])
  // 返回数据个数
  const [total, setTotal] = useState(0)
  // 分页数据
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10
  })
  // 获取search-form表单数据
  const [form] = Form.useForm()
  // antd Table组件 列定义
  const columns: ColumnsType<User.UserItem> = [
    {
      title: '用户id',
      dataIndex: 'userId',
      key: 'userId'
    },
    {
      title: '用户名',
      dataIndex: 'userName',
      key: 'userName'
    },
    {
      title: '用户邮箱',
      dataIndex: 'userEmail',
      key: 'userEmail'
    },
    {
      title: '用户角色',
      dataIndex: 'role',
      key: 'role',
      render(role: number) {
        return {
          0: '超级管理员',
          1: '管理员',
          2: '体验管理员',
          3: '普通用户'
        }[role]
      }
    },
    {
      title: '用户状态',
      dataIndex: 'state',
      key: 'state',
      render(state: number) {
        return {
          1: '在职',
          2: '离职',
          3: '试用期'
        }[state]
      }
    },
    {
      title: '注册时间',
      dataIndex: 'createTime',
      key: 'createTimes'
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render() {
        return (
          <Space>
            <Button type='text'>修改</Button>
            <Button type='text' danger>
              删除
            </Button>
          </Space>
        )
      }
    }
  ]

  // 请求获取用户列表数据
  const getUserList = async (params: PageParams) => {
    const value = form.getFieldsValue()
    const result = await api.getUserList({
      ...value,
      pageNum: params.pageNum,
      pageSize: params.pageSize
    })
    const mockdata = Array.from({ length: 20 })
      .fill({})
      .map((item: any) => {
        item = { ...result.list[0] }
        item.userId = Math.random()
        return item
      })
    setData(mockdata)
    setTotal(mockdata.length)
    setPagination({
      current: result.page.pageNum,
      pageSize: result.page.pageSize
    })
  }
  // 搜索
  const handleSearch = () => {
    getUserList({
      pageNum: pagination.current,
      pageSize: pagination.pageSize
    })
  }
  // 重置
  const handleReset = () => {
    form.resetFields()
  }

  useEffect(() => {
    getUserList({
      pageNum: pagination.current,
      pageSize: pagination.pageSize
    })
  }, [pagination.current, pagination.pageSize])

  const userRef = useRef<
    { open: (type: IAction, data?: User.UserItem) => void } | undefined
  >()

  const handleCreate = () => {
    userRef.current?.open('create')
  }

  return (
    <div className='user-list'>
      <Form className='search-form' form={form} layout='inline'>
        <Form.Item label='用户ID' name='userId'>
          <Input placeholder='请输入用户id' />
        </Form.Item>
        <Form.Item label='用户名' name='userName'>
          <Input placeholder='请输入用户名' />
        </Form.Item>
        <Form.Item label='状态' name='status' style={{ width: 200 }}>
          <Select>
            <Select.Option value={0}>全选</Select.Option>
            <Select.Option value={1}>在职</Select.Option>
            <Select.Option value={2}>离职</Select.Option>
            <Select.Option value={3}>试用期</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type='primary' onClick={handleSearch}>
              搜索
            </Button>
            <Button type='default' onClick={handleReset}>
              重置
            </Button>
          </Space>
        </Form.Item>
      </Form>
      <div className='base-table'>
        <div className='header-wrapper'>
          <div className='title'>用户列表</div>
          <div className='action'>
            <Button type='primary' onClick={handleCreate}>
              新增
            </Button>
            <Button type='primary' danger>
              删除
            </Button>
          </div>
        </div>
        <Table
          rowKey='userId'
          bordered
          rowSelection={<Checkbox></Checkbox>}
          dataSource={data}
          columns={columns}
          pagination={{
            total: total,
            current: pagination.current,
            pageSize: pagination.pageSize,
            showQuickJumper: true,
            showSizeChanger: true,
            showTotal: () => {
              return `总数：${total}`
            },
            position: ['bottomRight'],
            onChange: (page, pageSize) => {
              setPagination({
                current: page,
                pageSize
              })
            }
          }}
        />
      </div>
      <CreateUser
        mRef={userRef}
        update={() => {
          getUserList({
            pageNum: 1,
            pageSize: pagination.pageSize
          })
        }}
      ></CreateUser>
    </div>
  )
}
