<template>
  <q-page padding>
    <div class="row q-gutter-md">
      <q-btn label="Open dialog" @click="openDialog" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar'

const $q = useQuasar()

const openDialog = () =>
  $q.dialog({
    message: 'Hi',
    persistent: true
  })
</script>
