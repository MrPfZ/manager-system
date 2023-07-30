import { useEffect } from 'react'
import request from '@/utils/request'

export default function Err403() {
  useEffect(() => {
    request.get<string>('/user/login', { id: 12345 }).then(res => {
      const token = res
      localStorage.setItem('token', token)
    })
  }, [])
  return <div>3rr403</div>
}
