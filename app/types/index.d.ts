import type { Avatar } from '#ui/types'

export type UserStatus = 'subscribed' | 'unsubscribed' | 'bounced'

export interface User {
  id: number
  name: string
  email: string
  avatar?: Avatar
  status: UserStatus
  location: string
}

export interface Mail {
  id: number
  unread?: boolean
  from: User
  subject: string
  body: string
  date: string
}

export interface Member {
  name: string
  username: string
  role: 'member' | 'owner'
  avatar: Avatar
}

export interface Notification {
  id: number
  unread?: boolean
  sender: User
  body: string
  date: string
}

export type Period = 'daily' | 'weekly' | 'monthly'

export interface Range {
  start: Date
  end: Date
}

export interface IUserCredential {
  email: string
  passsword: string
}

export interface IUser extends IUserCredential {
  name: string
  username: string
}

export interface IUserData extends Omit<IUser, 'password'> {
  is_actived: boolean
  token: string
  id: string
}

export interface IErrorResponse {
  message: string
  errors: Record<string, string>
}

export interface IUsersData {
  current_page: number
  data: IUserData[]
  from: number
  last_page: number
  per_page: number
  to: number
  total: number
}

// export interface IUserDataWithSTT extends IUserData {
//   stt: number
// }

// export interface IUsersDataWithSTT extends IUsersData {
//   data: IUserDataWithSTT[]
// }
