<script setup lang="ts">
// import { useLoginUser } from '~/composables/users/useLoginUser'
import { AUTH_USER, AUTH_TOKEN } from '~/constants/common'
import type { FormError } from '#ui/types'
import type { IUserCredential, IErrorResponse, IUserData } from '~/types'

definePageMeta({
  layout: 'auth'
})

const fields = [
  {
    name: 'username',
    type: 'text',
    label: 'User Name',
    placeholder: 'Enter your user name'
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password'
  }
]

// function provide UForm to get errors array
const validate = (state: any) => {
  const errors: FormError[] = []
  if (!state.username) errors.push({ path: 'username', message: 'User name is required' })
  if (!state.password) errors.push({ path: 'password', message: 'Password is required' })
  return errors
}

// handle disable submit button
const isDisableSubmitButton = ref(false)

// handle error login
const errMsg = ref('')

// handle when click login
const onSubmit = async (data: IUserCredential) => {
  // disable submit button
  isDisableSubmitButton.value = true
  // clear error message
  errMsg.value = ''
  console.log('Submit login', data)

  try {
    // login user
    const response = await useLoginUser(data)
    console.log(265, response)

    // save user loged-in info global
    const user = useState<IUserData>(AUTH_USER, () => response?.user)
    window.localStorage.setItem(AUTH_TOKEN, user?.value?.token)

    // redirect to index page
    const router = useRouter()
    router.push({ path: '/' })
  } catch (error) {
    console.log(error)
    // get error message and show
    const errorBody: IErrorResponse = error.response._data
    errMsg.value = errorBody?.errors?.message ?? 'Something went wrong!'

    // enable submit button
    isDisableSubmitButton.value = false

    console.error('Error login user:', errorBody)
  }
}

// const user = useState('auth-user')
// console.log(user.value)
</script>

<template>
  <UCard class="max-w-sm w-full m-auto">
    <UAuthForm
      :fields="fields"
      :validate="validate"
      title="Welcome back!"
      icon="i-heroicons-lock-closed"
      :ui="{ base: 'text-center', footer: 'text-center', default: { submitButton: { label: 'Login' } } }"
      @submit="onSubmit"
    >
      <template #description>
        Don't have an account?
        <NuxtLink
          to="register"
          class="text-primary font-medium"
        >Sign up.
        </NuxtLink>
      </template>

      <template #password-hint>
        <NuxtLink
          to="/"
          class="text-primary font-medium"
        >Forgot password?
        </NuxtLink>
      </template>

      <template v-if="errMsg" #validation>
        <UAlert
          color="red"
          icon="i-heroicons-information-circle-20-solid"
          :title="errMsg"
        />
      </template>
      <template #footer>
        By signing in, you agree to our
        <NuxtLink
          to="/"
          class="text-primary font-medium"
        >Terms of Service.
        </NuxtLink>
      </template>
    </UAuthForm>
  </UCard>
</template>
