<template>
  <q-page padding>
    <div class="row q-gutter-md">
      <q-date v-model="date" />
      <q-date v-model="date" landscape />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const date = ref(new Date().toISOString().slice(0, 10).replaceAll('-', '/'))
</script>
