import type { IUsersData } from '~/types'

export const useFetchUsers = () => {
  const config = useRuntimeConfig()

  return useFetch<IUsersData>(`${config.public.baseApiUrl}/users`)
}
