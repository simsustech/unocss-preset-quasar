<template>
  <div class="q-pa-md q-gutter-sm">
    <q-btn push color="teal" label="Change image" @click="refresh" />

    <q-img
      :src="url"
      spinner-color="white"
      style="height: 140px; max-width: 150px"
    />
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const url = ref('https://picsum.photos/500/300')

    return {
      url,
      refresh() {
        url.value = 'https://picsum.photos/500/300?t=' + Math.random()
      }
    }
  }
}
</script>
