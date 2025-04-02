<template>
  <q-page padding class="">
    <div class="row q-gutter-md"></div>
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
