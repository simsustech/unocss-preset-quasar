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
import {
  useQuasar,
  QBtn,
  QInput,
  QChip,
  QBtnDropdown,
  QBtnToggle,
  QBtnGroup,
  QSelect,
  QField
} from 'quasar'

const $q = useQuasar()
// $q.dark.set(true)

setDefaultPropsMd3({
  QBtn,
  QInput,
  QChip,
  QBtnDropdown,
  QBtnToggle,
  QBtnGroup,
  QSelect,
  QField
})
</script>
