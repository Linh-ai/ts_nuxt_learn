import type { IUserData } from '~/types'
import { AUTH_USER, AUTH_TOKEN } from '~/constants/common'

export default defineNuxtRouteMiddleware(async (to, from) => {
  // according to https://nuxt.com/docs/guide/directory-structure/middleware#when-middleware-runs
  // the middleware will be executed both server and client side. Need to skip the server part enterily and mantain only the client side verifications:
  if (import.meta.server) return

  let user = useState<IUserData>(AUTH_USER)
  const authToken = localStorage.getItem(AUTH_TOKEN)

  console.log('user and authtoken', user, authToken)

  if ((!user?.value) && authToken) {
    console.log('chạy vào đây', user?.value, authToken)
    console.log('chạy vào đây 2', !user?.value && authToken)

    try {
      const response = await useGetUser(authToken)
      user = useState(AUTH_USER, () => response)
      console.log(1111, user)
    } catch (error) {
      console.log('error get user with token', authToken, error)
    }
  }

  console.log(12313123, user)
  console.log(12313123, user.value)
  console.log(12313123, to, from)

  const isGoingToAuthPages = /\/auth\/.+/.test(to.path)
  const isLogedIn = user?.value?.id

  // { external: true } to fix problem: Layout doesnt change when using navigateTo in Route Middleware
  // https://github.com/nuxt/nuxt/issues/21002
  // With external: true -> Internal URLs navigate with a full-page reload.
  switch (true) {
    case isLogedIn && isGoingToAuthPages:
      return navigateTo('/')
    case isLogedIn && !isGoingToAuthPages:
      return
    case !isLogedIn && isGoingToAuthPages:
      return
    case !isLogedIn && !isGoingToAuthPages:
      return navigateTo('/auth/login')
  }

  // if (to.params.id === '1') {
  //   return abortNavigation()
  // }
})
