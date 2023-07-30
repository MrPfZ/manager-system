import { create } from 'zustand'
import { User } from '@/types/api'

export const useStore = create<{
  token: string
  userInfo: {
    userEmail: string
    userName: string
  }
  updateUserInfo: (userInfo: User.UserItem) => void
  collapsed: boolean
  updateCollasped: () => void
}>(set => ({
  token: '',
  userInfo: {
    userEmail: '',
    userName: ''
  },
  updateUserInfo: userInfo => set({ userInfo }),
  collapsed: false,
  updateCollasped: () => set(state => ({ collapsed: !state.collapsed }))
}))
