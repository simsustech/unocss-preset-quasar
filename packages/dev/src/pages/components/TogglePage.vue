<template>
  <q-page padding>
    <div class="row q-gutter-md">
      <q-toggle v-model="toggle" />
      <q-toggle v-model="toggle" class="font-16px" />

      <q-toggle v-model="toggle" size="xl" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const toggle = ref(false)
</script>
