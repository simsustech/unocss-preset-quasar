<template>
  <div class="q-pa-md">
    <q-file
      v-model="files"
      label="Pick files"
      outlined
      use-chips
      multiple
      style="max-width: 300px"
    />
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    return {
      files: ref(null)
    }
  }
}
</script>
