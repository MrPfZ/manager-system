import request from '@/utils/request'
import { Login, User, ResultData, OrderType, Dept } from '@/types'

export default {
  login(params: Login.params) {
    return request.post('/users/login', params)
  },
  getUserInfo() {
    return request.get<User.UserItem>('/users/getUserInfo')
  },
  getUserList(params: User.Params) {
    return request.get<ResultData<User.UserItem>>('/users/list', params)
  },
  getReportData() {
    return request.get<OrderType.ReportData>('/order/dashboard/getReportData')
  },
  getLineChart() {
    return request.get<OrderType.LineData>('/order/dashboard/getLineData')
  },
  // 部门管理接口
  getDeptList(params?: Dept.Params) {
    return request.get<Dept.DeptItem[]>('/dept/list', params)
  },
  getAllUserList() {
    return request.get<User.UserItem[]>('/users/all/list')
  },
  createDept(params: Dept.CreateParams) {
    return request.post('/dept/create', params)
  },
  editDept(params: Dept.EditParams) {
    return request.post('/dept/edit', params)
  },
  delDept(params: Dept.DelParams) {
    return request.post('/dept/delete', params)
  }
}
