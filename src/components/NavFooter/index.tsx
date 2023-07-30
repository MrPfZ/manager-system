import styles from './index.module.less'

const NavFooter = () => {
  return (
    <div className={styles.navFooter}>
      <a
        href='https://coding.imooc.com/class/644.html'
        target='_blank'
        rel='noreferrer'
      >
        React18+TS开发通用后台课程
      </a>
      <span className='gutter'>|</span>
      <a
        href='https://ant-design.antgroup.com/index-cn'
        target='_blank'
        rel='noreferrer'
      >
        Ant-Design
      </a>
      <span className='gutter'>|</span>
      <a href='http://driver.marsview.cc/' target='_blank' rel='noreferrer'>
        课程作品展示
      </a>
      <div>Copyright ©2023 React18通用后台课程 All Rights Reserved.</div>
    </div>
  )
}
export default NavFooter
