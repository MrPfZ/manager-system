import { Descriptions, Card, Button } from 'antd'
import * as echarts from 'echarts'
import styles from './index.module.less'
import { useEffect, useState } from 'react'
import { useStore } from '@/store'
import { OrderType } from '@/types'
import api from '@/api'

export default function Dashboard() {
  const { userInfo } = useStore()
  const [report, setReport] = useState<OrderType.ReportData>()
  useEffect(() => {
    const lineChart = document.getElementById('lineChart')
    const lineChartInstance = echarts.init(lineChart as HTMLElement)
    lineChartInstance.setOption({
      // lineChart
      xAxis: {
        type: 'category',
        data: ['A', 'B', 'C']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [120, 200, 150],
          type: 'line'
        }
      ]
    })
    // pieChart
  }, [])

  // 获取报表数据
  const getReport = async () => {
    const data = await api.getReportData()
    setReport(data)
  }
  useEffect(() => {
    getReport()
  }, [])

  // 获取折线图数据
  const renderLineChart = async () => {
    const data = await api.getLineChart()
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.userInfo}>
        <img
          className={styles.userImg}
          src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
        />
        <Descriptions title='欢迎使用'>
          <Descriptions.Item label='用户ID'>
            {userInfo.userId}
          </Descriptions.Item>
          <Descriptions.Item label='邮箱'>
            {userInfo.userEmail}
          </Descriptions.Item>
          <Descriptions.Item label='状态'>{userInfo.state}</Descriptions.Item>
          <Descriptions.Item label='手机号'>
            {userInfo.mobile}
          </Descriptions.Item>
          <Descriptions.Item label='岗位'>{userInfo.job}</Descriptions.Item>
          <Descriptions.Item label='部门'>
            {userInfo.deptName}
          </Descriptions.Item>
        </Descriptions>
      </div>
      <div className={styles.report}>
        <div className={styles.card}>
          <div className='title'>司机数量</div>
          <div className={styles.data}>{report?.driverCount}</div>
        </div>
        <div className={styles.card}>
          <div className='title'>总流水</div>
          <div className={styles.data}>{report?.totalMoney}</div>
        </div>
        <div className={styles.card}>
          <div className='title'>订单数量</div>
          <div className={styles.data}>{report?.orderCount}</div>
        </div>
        <div className={styles.card}>
          <div className='title'>开通城市</div>
          <div className={styles.data}>{report?.cityNum}</div>
        </div>
      </div>
      <div className={styles.chart}>
        <Card
          title='流水与订单走势图'
          extra={<Button type='primary'>刷新</Button>}
        >
          <div id='lineChart' className={styles.itemChart}></div>
        </Card>
      </div>
      <div className={styles.chart}>
        <Card
          title='司机分布'
          extra={<Button type='primary'>刷新</Button>}
        ></Card>
      </div>
      <div className={styles.chart}>
        <Card
          title='模型诊断'
          extra={<Button type='primary'>刷新</Button>}
        ></Card>
      </div>
    </div>
  )
}
