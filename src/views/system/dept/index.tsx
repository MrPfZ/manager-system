import { Form, Input, Button, Space, Table, Modal } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { useForm } from 'antd/es/form/Form'
import { useState, useEffect, useRef } from 'react'
import { Dept } from '@/types/index'
import { IAction } from '@/types/modal'
import { message } from '@/utils/AntdGloble'
import api from '@/api'
import CreateDept from './createDept'

const DeptList = () => {
  const columns: ColumnsType<Dept.DeptItem> = [
    { title: '部门名称', dataIndex: 'deptName', key: 'deptName', width: 200 },
    { title: '负责人', dataIndex: 'userName', key: 'userName', width: 150 },
    { title: '更新时间', dataIndex: 'updateTime', key: 'updateTime' },
    { title: '创建时间', dataIndex: 'createTime', key: 'createTime' },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render(_, record) {
        return (
          <Space>
            <Button type='text' onClick={() => handleSubCreate(record._id)}>
              新增
            </Button>
            <Button type='text' onClick={() => handleEdit(record)}>
              编辑
            </Button>
            <Button type='text' onClick={() => handleDelete(record._id)}>
              删除
            </Button>
          </Space>
        )
      }
    }
  ]
  const [form] = useForm()
  const [data, setData] = useState<Dept.DeptItem[]>()
  const deptRef = useRef<{
    open: (type: IAction, data?: Dept.EditParams | { parentId: string }) => void
  }>()

  const getDeptList = async () => {
    const data = await api.getDeptList(form.getFieldsValue())
    setData(data)
  }
  const handleReset = () => {
    form.resetFields()
    getDeptList()
  }
  const handleCreate = () => {
    deptRef.current?.open('create')
  }
  const handleEdit = (record: Dept.DeptItem) => {
    deptRef.current?.open('edit', record)
  }
  const handleSubCreate = (id: string) => {
    deptRef.current?.open('create', { parentId: id })
  }
  const handleDelete = (_id: string) => {
    Modal.confirm({
      title: '确认',
      content: '是否从系统中移除该部门',
      onOk() {
        deleteDept({ _id })
      }
    })
  }
  const deleteDept = async (id: Dept.DelParams) => {
    await api.delDept(id)
    message.success('删除成功')
    getDeptList()
  }

  useEffect(() => {
    getDeptList()
  }, [])

  return (
    <div>
      <Form className='search-form' layout='inline' form={form}>
        <Form.Item label='部门' name='deptName'>
          <Input placeholder='请输入部门名称' />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type='primary' onClick={getDeptList}>
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
          <div className='title'>部门列表</div>
          <div className='action'>
            <Button type='primary' onClick={handleCreate}>
              新增
            </Button>
          </div>
        </div>
        <Table
          bordered
          rowKey='_id'
          columns={columns}
          dataSource={data}
          pagination={false}
        />
      </div>
      <CreateDept mRef={deptRef} update={getDeptList} />
    </div>
  )
}

export default DeptList
