<template>
  <div class="q-pa-md">
    <q-badge color="secondary">
      Model: {{ standard.min }} to {{ standard.max }} (0 to 50)
    </q-badge>

    <q-range v-model="standard" :min="0" :max="50" />
    <q-range v-model="standard" :min="0" :max="50" color="green" />
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    return {
      standard: ref({
        min: 10,
        max: 35
      })
    }
  }
}
</script>
