<script setup lang="ts">
import type { User } from '~/types'

const defaultColumns = [
  {
    key: 'stt',
    label: '#'
  },
  {
    key: 'username',
    label: 'User name'
  },
  {
    key: 'name',
    label: 'Name',
    sortable: true
  },
  {
    key: 'email',
    label: 'Email',
    sortable: true
  },
  {
    key: 'status',
    label: 'Status'
  }
]

const q = ref('')
const selected = ref<User[]>([])
const selectedColumns = ref(defaultColumns)
const selectedStatuses = ref([])
const selectedLocations = ref([])
const sort = ref({ column: 'id', direction: 'asc' as const })
const input = ref<{ input: HTMLInputElement }>()
const isNewUserModalOpen = ref(false)

const columns = computed(() => defaultColumns.filter(column => selectedColumns.value.includes(column)))

// const query = computed(() => ({ q: q.value, statuses: selectedStatuses.value, locations: selectedLocations.value, sort: sort.value.column, order: sort.value.direction }))

const { data: response, status } = await useFetchUsers()

const users = computed(() => {
  return status.value === 'success'
    ? response.value.data.map((user, index) => ({
      ...user,
      stt: index + 1
    }))
    : []
})
// const defaultLocations = users.value.reduce((acc, user) => {
//   if (!acc.includes(user.location)) {
//     acc.push(user.location)
//   }
//   return acc
// }, [] as string[])

console.log(2121, response)
// const defaultStatuses = computed(() => {
//   return status.value == 'success'
//     ? users.value.reduce((acc, user) => {
//       if (!acc.includes(user.status)) {
//         acc.push(user.status)
//       }
//       return acc
//     }, [] as string[])
//     : []
// })

function onSelect(row: User) {
  const index = selected.value.findIndex(item => item.id === row.id)
  if (index === -1) {
    selected.value.push(row)
  } else {
    selected.value.splice(index, 1)
  }
}

defineShortcuts({
  '/': () => {
    input.value?.input?.focus()
  }
})
</script>

<template>
  <!-- right content -->
  <UDashboardPage>
    <UDashboardPanel grow>
      <!-- header -->
      <UDashboardNavbar
        title="Users"
        :badge="response.data.length"
      >
        <!-- filter + add user -->
        <template #right>
          <!-- <UInput
            ref="input"
            v-model="q"
            icon="i-heroicons-funnel"
            autocomplete="off"
            placeholder="Filter users..."
            class="hidden lg:block"
            @keydown.esc="$event.target.blur()"
          >
            <template #trailing>
              <UKbd value="/" />
            </template>
          </UInput> -->

          <UButton
            label="New user"
            trailing-icon="i-heroicons-plus"
            color="gray"
            @click="isNewUserModalOpen = true"
          />
        </template>
      </UDashboardNavbar>

      <!-- tollbar to select display, status,... -->
      <UDashboardToolbar>
        <template #left>
          <!-- filter by status -->
          <!-- <USelectMenu
            v-model="selectedStatuses"
            icon="i-heroicons-check-circle"
            placeholder="Status"
            multiple
            :options="defaultStatuses"
            :ui-menu="{ option: { base: 'capitalize' } }"
          /> -->
          <!-- filter by location -->
          <!-- <USelectMenu
            v-model="selectedLocations"
            icon="i-heroicons-map-pin"
            placeholder="Location"
            :options="defaultLocations"
            multiple
          /> -->
        </template>

        <!-- setting display column -->
        <template #right>
          <USelectMenu
            v-model="selectedColumns"
            icon="i-heroicons-adjustments-horizontal-solid"
            :options="defaultColumns"
            multiple
            class="hidden lg:block"
          >
            <template #label>
              Display
            </template>
          </USelectMenu>
        </template>
      </UDashboardToolbar>

      <!-- modal add new user -->
      <UDashboardModal
        v-model="isNewUserModalOpen"
        title="New user"
        description="Add a new user to edu.vn"
        :ui="{ width: 'sm:max-w-md' }"
      >
        <!-- ~/components/users/UsersForm.vue -->
        <UsersForm @close="isNewUserModalOpen = false" />
      </UDashboardModal>

      <!-- Table -->
      <UTable
        v-model="selected"
        v-model:sort="sort"
        :rows="users"
        :columns="columns"
        :loading="status=='pending'"
        sort-mode="manual"
        class="w-full"
        :ui="{ divide: 'divide-gray-200 dark:divide-gray-800' }"
        @select="onSelect"
      >
        <template #username-data="{ row }">
          <div class="flex items-center gap-3">
            <UAvatar
              v-bind="row.avatar"
              :alt="row.name"
              size="xs"
            />

            <span class="text-gray-900 dark:text-white font-medium">{{ row.name }}</span>
          </div>
        </template>

        <template #status-data="{ row }">
          <UBadge
            :label="row.is_actived ? 'active' : 'inactive'"
            :color="row.is_actived ? 'green' : 'red'"
            variant="subtle"
            class="capitalize"
          />
        </template>
      </UTable>
    </UDashboardPanel>
  </UDashboardPage>
</template>
