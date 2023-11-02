import ReactDOM from 'react-dom/client'
import Loading from './loading'

let count: number = 0

export const showLoading = () => {
  if (count === 0) {
    const loading = document.createElement('div')
    loading.setAttribute('id', 'loading')
    document.body.append(loading)
    ReactDOM.createRoot(loading).render(<Loading />)
  }
  count++
}

export const hideLoading = () => {
  count--
  if (count === 0) {
    document.body.removeChild(
      document.getElementById('loading') as HTMLDivElement
    )
  }
}
