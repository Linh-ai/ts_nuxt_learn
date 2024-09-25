<script setup lang="ts">
const route = useRoute()
const appConfig = useAppConfig()
const { isHelpSlideoverOpen } = useDashboard()

const links = [
  {
    id: 'home',
    label: 'Home',
    icon: 'i-heroicons-home',
    to: '/',
    tooltip: {
      text: 'Home',
      shortcuts: ['G', 'H']
    }
  },
  // {
  //   id: 'users',
  //   label: 'Users',
  //   icon: 'i-heroicons-user-group',
  //   to: '/users',
  //   tooltip: {
  //     text: 'Users',
  //     shortcuts: ['G', 'U']
  //   }
  // },
  {
    id: 'users',
    label: 'Users',
    icon: 'i-heroicons-user-group',
    to: '/users',
    tooltip: {
      text: 'Users',
      shortcuts: ['G', 'U']
    }
  }
]

// const footerLinks = [{
//   label: 'Invite people',
//   icon: 'i-heroicons-plus',
//   to: '/settings/members'
// }, {
//   label: 'Help & Support',
//   icon: 'i-heroicons-question-mark-circle',
//   click: () => isHelpSlideoverOpen.value = true
// }]

const groups = [{
  key: 'links',
  label: 'Go to',
  commands: links.map(link => ({ ...link, shortcuts: link.tooltip?.shortcuts }))
}, {
  key: 'code',
  label: 'Code',
  commands: [{
    id: 'source',
    label: 'View page source',
    icon: 'i-simple-icons-github',
    click: () => {
      window.open(`https://github.com/nuxt-ui-pro/dashboard/blob/main/pages${route.path === '/' ? '/index' : route.path}.vue`, '_blank')
    }
  }]
}]

// const defaultColors = ref(['green', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet'].map(color => ({ label: color, chip: color, click: () => appConfig.ui.primary = color })))
// const colors = computed(() => defaultColors.value.map(color => ({ ...color, active: appConfig.ui.primary === color.label })))
</script>

<template>
  <UDashboardLayout>
    <!-- left side bar -->
    <UDashboardPanel
      :width="250"
      :resizable="{ min: 200, max: 300 }"
      collapsible
    >
      <!-- top bar of dashboard panel -->
      <UDashboardNavbar
        class="!border-transparent"
        :ui="{ left: 'flex-1' }"
      >
        <template #left>
          <UButton
            color="gray"
            variant="ghost"
            class="w-full text-xl font-bold"
            label="EDU.VN"
            :ui="{ padding: 'sm' }"
          >
            <template #leading>
              <UAvatar
                src="https://play-lh.googleusercontent.com/e_sf86ej_WrMYFY9csKPPJdv-_02VvNrpYI1-8fEwdW-yooOZKOlB_fsRNZF6Q69ONE"
                size="lg"
              />
            </template>
          </UButton>
          <!-- <TeamsDropdown /> -->
        </template>
      </UDashboardNavbar>

      <!-- A scrollable container to display links inside a DashboardPanel. -->
      <UDashboardSidebar>
        <!-- <template #header>
          <UDashboardSearchButton />
        </template> -->

        <UDivider />

        <!-- A list of collapsible and draggable links to display in a DashboardSidebar -->
        <UDashboardSidebarLinks :links="links" />

        <UDivider />

        <!-- <UDashboardSidebarLinks
          :links="[{ label: 'Colors', draggable: true, children: colors }]"
          @update:links="colors => defaultColors = colors"
        /> -->

        <div class="flex-1" />

        <!-- <UDashboardSidebarLinks :links="footerLinks" /> -->

        <UDivider class="sticky bottom-0" />

        <template #footer>
          <!-- ~/components/UserDropdown.vue -->
          <UserDropdown />
        </template>
      </UDashboardSidebar>
    </UDashboardPanel>

    <!-- right content -->
    <slot />

    <!-- ~/components/HelpSlideover.vue -->
    <HelpSlideover />
    <!-- ~/components/NotificationsSlideover.vue -->
    <NotificationsSlideover />

    <ClientOnly>
      <LazyUDashboardSearch :groups="groups" />
    </ClientOnly>
  </UDashboardLayout>
</template>
