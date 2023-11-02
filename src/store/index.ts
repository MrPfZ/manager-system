import { create } from 'zustand'
import { User } from '@/types'

export const useStore = create<{
  token: string
  userInfo: {
    userEmail: string
    userName: string
    userId: number
    state: number
    mobile: number
    job: string
    deptName: string
  }
  updateUserInfo: (userInfo: User.UserItem) => void
  collapsed: boolean
  updateCollasped: () => void
}>(set => ({
  token: '',
  userInfo: {
    userEmail: '',
    userName: '',
    userId: 0,
    deptName: '',
    mobile: 0,
    job: '',
    state: 0
  },
  updateUserInfo: userInfo => set({ userInfo }),
  collapsed: false,
  updateCollasped: () => set(state => ({ collapsed: !state.collapsed }))
}))
