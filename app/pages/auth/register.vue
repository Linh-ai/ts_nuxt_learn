<script setup lang="ts">
import type { FormError } from '#ui/types'
import type { IUser, IErrorResponse } from '~/types'

definePageMeta({
  layout: 'auth'
})

// provide for UForm to render fields
const fields = [
  {
    name: 'email',
    type: 'text',
    label: 'Email',
    placeholder: 'Enter your email'
  },
  {
    name: 'name',
    type: 'text',
    label: 'Name',
    placeholder: 'Enter your full name'
  },
  {
    name: 'username',
    type: 'text',
    label: 'User name',
    placeholder: 'Enter your user name'
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password'
  }
]

interface IFormData {
  email?: string
  name?: string
  username?: string
  password?: string
}

// contain errors mesage to show
const errors: Ref<FormError[]> = ref([])

// function provide UForm to get errors array
const validate = (state: IFormData) => {
  // clear previous message
  errors.value = []

  // validate
  fields.forEach((field) => {
    if (!state[field.name]) {
      errors.value.push({ path: field.name, message: `${field.label} is required` })
    }
  })

  return errors.value
}

// handle disable submit button
const isDisableSubmitButton = ref(false)

// handle when click register
const onSubmit = async (data: IUser) => {
  // disable submit button
  isDisableSubmitButton.value = true
  console.log('Submitting', data)

  try {
    // create user
    const response = await useCreateUser(data)
    console.log(response)

    // save user loged-in info global
    useState('auth-user', () => response)

    // redirect to login page
    const router = useRouter()
    router.push({ path: 'login' })
  } catch (error) {
    // get error message and show
    const errorBody: IErrorResponse = error.response._data
    for (const [field, errMsg] of Object.entries(errorBody.errors)) {
      errors.value.push({ path: field, message: errMsg })
    }

    // enable submit button
    isDisableSubmitButton.value = false

    console.error('Error creating user:', errorBody)
  }
}
</script>

<template>
  <UCard class="max-w-sm w-full m-auto">
    <UAuthForm
      :fields="fields"
      :validate="validate"
      title="Welcome to edu.vn!"
      icon="i-heroicons-academic-cap"
      :ui="{ base: 'text-center', footer: 'text-center', default: { submitButton: { label: 'Register' } } }"
      :loading="isDisableSubmitButton"
      @submit="onSubmit"
    >
      <template #description>
        Already have an account?
        <NuxtLink
          to="login"
          class="text-primary font-medium"
        >Login.
        </NuxtLink>
      </template>

      <!-- <template #password-hint>
        <NuxtLink to="/" class="text-primary font-medium">Forgot password?</NuxtLink>
      </template> -->
      <!-- <template #name-validation>
        <UAlert color="red" icon="i-heroicons-information-circle-20-solid" title="Error signing in" />
      </template> -->
      <template #footer>
        By signing up, you agree to our
        <NuxtLink
          to="/"
          class="text-primary font-medium"
        >Terms of Service.
        </NuxtLink>
      </template>
    </UAuthForm>
  </UCard>
</template>
