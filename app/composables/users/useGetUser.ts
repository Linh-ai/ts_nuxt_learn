import type { IUserData } from '~/types'

export const useGetUser = (token: string): Promise<IUserData> => {
  const config = useRuntimeConfig()

  return $fetch<IUserData>(`${config.public.baseApiUrl}/user`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}
