<template>
  <q-page padding>
    <div class="row q-gutter-md">
      <q-checkbox v-model="check" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const check = ref(false)
</script>
