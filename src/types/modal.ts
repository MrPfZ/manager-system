import { MutableRefObject } from 'react'

export type IAction = 'create' | 'delete' | 'edit'

export interface IModalProps {
  mRef: MutableRefObject<
    | {
        open: (type: IAction) => void
      }
    | undefined
  >
  update: () => void
}
