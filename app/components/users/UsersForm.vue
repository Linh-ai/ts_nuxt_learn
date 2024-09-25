<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'
import type { IErrorResponse, IUser } from '~/types';

const emit = defineEmits(['close'])

const state = reactive({
  email: undefined,
  name: undefined,
  username: undefined,
  password: undefined
})

// https://ui.nuxt.com/components/form
const errors: Ref<FormError[]> = ref([])
const validate = (state: any): FormError[] => {
  // clear previous message
  errors.value = []

  if (!state.name) errors.value.push({ path: 'name', message: 'Please enter a name.' })
  if (!state.email) errors.value.push({ path: 'email', message: 'Please enter an email.' })
  if (!state.username) errors.value.push({ path: 'username', message: 'Please enter an email.' })
  if (!state.password) errors.value.push({ path: 'password', message: 'Please enter an password.' })

  return errors.value
}

// handle disable submit button
const isDisableSubmitButton = ref(false)

async function onSubmit(event: FormSubmitEvent<IUser>) {
  // Do something with data
  console.log(event.data)

  try {
    // create user
    const response = await useCreateUser(event.data)
    console.log(response)
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
  // emit('close')
}
</script>

<template>
  <UForm
    :validate="validate"
    :validate-on="['submit']"
    :state="state"
    class="space-y-4"
    @submit="onSubmit"
  >
    <!-- email -->
    <UFormGroup
      label="Email"
      name="email"
    >
      <UInput
        v-model="state.email"
        type="email"
        placeholder="john.doe@example.com"
        autofocus
      />
    </UFormGroup>

    <!-- name -->
    <UFormGroup
      label="Name"
      name="name"
    >
      <UInput
        v-model="state.name"
        placeholder="John Doe"
      />
    </UFormGroup>

    <!-- user name -->
    <UFormGroup
      label="User Name"
      name="username"
    >
      <UInput
        v-model="state.username"
        placeholder="John.Doe"
      />
    </UFormGroup>

    <!-- password -->
    <UFormGroup
      label="Password"
      name="password"
    >
      <UInput
        v-model="state.password"
        type="password"
        placeholder="123"
      />
    </UFormGroup>

    <!-- button cancel and save -->
    <div class="flex justify-end gap-3">
      <UButton
        label="Cancel"
        color="gray"
        variant="ghost"
        @click="emit('close')"
      />
      <UButton
        type="submit"
        label="Save"
        color="black"
        :disabled="isDisableSubmitButton"
      />
    </div>
  </UForm>
</template>
