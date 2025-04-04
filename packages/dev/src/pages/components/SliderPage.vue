<template>
  <q-page padding>
    <div class="row q-gutter-md">
      <q-slider v-model="model" :min="0" :max="50" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const model = ref(6)
</script>
