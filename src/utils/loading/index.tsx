import ReactDOM from 'react-dom/client'
import Loading from './loading'

export const showLoading = () => {
  // 动态创建loading的元素节点
  const loading = document.createElement('div')
  loading.setAttribute('id', 'loading')
  document.body.append(loading)
  // 渲染loading组件
  ReactDOM.createRoot(loading).render(<Loading />)
}

export const hideLoading = () => {
  document.body.removeChild(
    document.getElementById('loading') as HTMLDivElement
  )
}
