import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'

function Err404() {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/welcome')
  }
  return (
    <Result
      status={404}
      title='404 not found'
      subTitle='访问页面不存在'
      extra={
        <Button type='primary' onClick={handleClick}>
          返回
        </Button>
      }
    ></Result>
  )
}

export default Err404
