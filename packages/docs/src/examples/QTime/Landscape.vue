<template>
  <div class="q-pa-md">
    <div class="q-gutter-md">
      <q-time v-model="time" landscape />

      <q-time v-model="timeWithSeconds" with-seconds landscape />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    return {
      time: ref('10:56'),
      timeWithSeconds: ref('09:24:10')
    }
  }
}
</script>
