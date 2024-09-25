import type { IUserData, IUserCredential } from '~/types'

export const useLoginUser = (data: IUserCredential): Promise<{ user: IUserData }> => {
  const config = useRuntimeConfig()

  return $fetch<{ user: IUserData }>(`${config.public.baseApiUrl}/users/login`, {
    method: 'POST',
    body: data
  })
}
