<template>
  <q-page padding>
    <div class="row q-gutter-md">
      <q-time v-model="timeWithSeconds" with-seconds />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const timeWithSeconds = ref('09:24:10')
</script>
