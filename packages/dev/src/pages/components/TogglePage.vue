<template>
  <q-page padding>
    <div class="row q-gutter-md">
      <q-toggle v-model="toggle" />
      <q-toggle v-model="toggle" class="font-16px" />
      <q-toggle v-model="toggle" label="On Right" />
      <q-toggle
        v-model="toggle"
        checked-icon="i-mdi-brightness-2"
        unchecked-icon="i-mdi-brightness-7"
        size="xl"
      />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const toggle = ref(false)
</script>
