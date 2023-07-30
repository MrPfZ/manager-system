import styles from './index.module.less'

export default function Welcome() {
  return (
    <div className={styles.welcome}>
      <div className={styles.content}>
        <div className={styles.subtitle}>欢迎使用</div>
        <div className={styles.title}>极速货运后台管理系统</div>
        <div className={styles.desc}>基于 React18 + Antd5 + Zustand 开发</div>
      </div>
      <div className={styles.img}></div>
    </div>
  )
}
