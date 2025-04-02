<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round aria-label="Menu" @click="toggleLeftDrawer">
          <q-icon :name="matMenu" />
        </q-btn>

        <q-toolbar-title> Quasar App </q-toolbar-title>
        <q-space />
        <q-btn
          flat
          :icon="$q.dark.isActive ? 'i-mdi-brightness-7' : 'i-mdi-brightness-2'"
          @click="$q.dark.toggle()"
        />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>
        <q-item to="/">
          <q-item-section>
            <q-item-label>Home</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          v-for="component in components"
          :to="`/components/${component}`"
        >
          <q-item-section>
            <q-item-label>
              {{ component }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { matMenu } from '@quasar/extras/material-icons'

const componentRoutes = import.meta.glob('../pages/components/*.vue')

const components = Object.keys(componentRoutes).map((name) => {
  const path = name.split('/').at(-1)!.split('.').at(0)?.toLowerCase()

  return path
})

const $q = useQuasar()
const leftDrawerOpen = ref(false)

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
