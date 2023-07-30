import { Descriptions } from 'antd'
import styles from './index.module.less'

export default function Dashboard() {
  return (
    <div className={styles.dashboard}>
      <div className={styles.userInfo}>
        <img
          className={styles.userImg}
          src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
        />
        <Descriptions title='欢迎使用'>
          <Descriptions.Item label='用户ID'>wendy mu</Descriptions.Item>
          <Descriptions.Item label='邮箱'>552025897@qq.com</Descriptions.Item>
          <Descriptions.Item label='状态'>在职</Descriptions.Item>
          <Descriptions.Item label='手机号'>19812341234</Descriptions.Item>
          <Descriptions.Item label='岗位'>前端工程师</Descriptions.Item>
          <Descriptions.Item label='部门'>大前端</Descriptions.Item>
        </Descriptions>
      </div>
      <div className={styles.report}>
        <div className={styles.card}>
          <div className='title'>司机数量</div>
          <div className={styles.data}>1200个</div>
        </div>
        <div className={styles.card}>
          <div className='title'>总流水</div>
          <div className={styles.data}>3000000元</div>
        </div>
        <div className={styles.card}>
          <div className='title'>总订单</div>
          <div className={styles.data}>130000单</div>
        </div>
        <div className={styles.card}>
          <div className='title'>开通城市</div>
          <div className={styles.data}>801座</div>
        </div>
      </div>
    </div>
  )
}
