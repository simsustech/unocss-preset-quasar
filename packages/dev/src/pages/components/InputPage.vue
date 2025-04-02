<template>
  <q-page padding>
    <div class="row q-gutter-md">
      <q-input label="Text field" v-model="text" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const text = ref('Input text')
</script>
