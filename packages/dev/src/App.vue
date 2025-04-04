<template>
  <router-view v-slot="{ Component }">
    <Suspense>
      <template #default>
        <component :is="Component" />
      </template>
      <template #fallback>
        <div>Loading...</div>
      </template>
    </Suspense>
  </router-view>
</template>

<script lang="ts">
export default {
  name: 'App'
}
</script>

<script setup lang="ts">
import { setDefaultPropsMd3 } from 'unocss-preset-quasar/styles'
import { QBtn, QInput, QBtnDropdown, QBtnToggle } from 'quasar'

setDefaultPropsMd3({
  QBtn,
  QBtnDropdown,
  QInput,
  QBtnToggle
})
</script>
