<script setup lang="ts">
import type { FormError } from '#ui/types'

definePageMeta({
  layout: 'auth'
})

const fields = [
  {
    name: 'email',
    type: 'text',
    label: 'Email',
    placeholder: 'Enter your email',
    required: true
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    required: true
  }
  // {
  //   name: 'remember',
  //   label: 'Remember me',
  //   type: 'checkbox'
  // }
]

const validate = (state: any) => {
  const errors: FormError[] = []
  if (!state.email) errors.push({ path: 'email', message: 'Email is required' })
  if (!state.password) errors.push({ path: 'password', message: 'Password is required' })
  return errors
}

function onSubmit(data: any) {
  console.log('Submitted', data)
}

const user = useState('auth-user')
console.log(user.value)
</script>

<template>
  <UCard class="max-w-sm w-full m-auto">
    <UAuthForm
      :fields="fields"
      :validate="validate"
      title="Welcome back!"
      align="top"
      icon="i-heroicons-lock-closed"
      :ui="{ base: 'text-center', footer: 'text-center' }"
      @submit="onSubmit"
    >
      <template #description>
        Don't have an account? <NuxtLink to="register" class="text-primary font-medium">Sign up</NuxtLink>.
      </template>

      <template #password-hint>
        <NuxtLink to="/" class="text-primary font-medium">Forgot password?</NuxtLink>
      </template>
      <template #validation>
        <UAlert color="red" icon="i-heroicons-information-circle-20-solid" title="Error signing in" />
      </template>
      <template #footer>
        By signing in, you agree to our <NuxtLink to="/" class="text-primary font-medium">Terms of Service</NuxtLink>.
      </template>
    </UAuthForm>
  </UCard>
</template>
