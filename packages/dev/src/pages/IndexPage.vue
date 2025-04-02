<template>
  <q-page padding class="">
    <div class="row">
      <q-input label="Text field" v-model="text" />
      <q-btn-dropdown label="Dropdown Button">
        <q-list>
          <q-item clickable v-close-popup @click="">
            <q-item-section>
              <q-item-label>Photos</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup @click="">
            <q-item-section>
              <q-item-label>Videos</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup @click="">
            <q-item-section>
              <q-item-label>Articles</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
      <q-toggle v-model="toggle" />
      <q-toggle v-model="toggle" class="font-16px" />

      <q-toggle v-model="toggle" size="xl" />

      <q-card class="col">
        <q-card-section class=""> Hello </q-card-section>
      </q-card>

      <q-checkbox v-model="toggle" />

      <q-chip icon="i-mdi-alarm" label="Chip" removable />

      <q-date v-model="date" />
      <q-date v-model="date" landscape />

      <q-btn label="Open dialog" @click="openDialog" />
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="i-mdi-add" />
    </q-page-sticky>
  </q-page>
</template>

<scirpt lang="ts">
export default {
  name: 'IndexPage'
}
</scirpt>

<script setup lang="ts">
import HelloWorld from 'src/components/HelloWorld.vue'
import { ref } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const text = ref('Hello')

const toggle = ref(false)
const date = ref(new Date().toISOString().slice(0, 10).replaceAll('-', '/'))
const openDialog = () =>
  $q.dialog({
    message: 'Hi',
    persistent: true
  })
</script>
