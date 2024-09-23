import type { IUser, IUserData } from '~/types'

export const useCreateUser = (data: IUser): Promise<IUserData> => {
  const config = useRuntimeConfig()

  return $fetch<IUserData>(`${config.public.baseApiUrl}/users`, {
    method: 'POST',
    body: data
  })
}
