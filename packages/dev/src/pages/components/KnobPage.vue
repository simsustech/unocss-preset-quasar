<template>
  <q-page padding>
    <div class="row">
      <q-knob v-model="value" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref(50)
</script>
