<template>
  <div class="q-pa-md row justify-center">
    <q-card
      v-touch-repeat.mouse="handleRepeat"
      class="custom-area cursor-pointer bg-primary text-white shadow-2 relative-position row flex-center"
    >
      <div v-if="info" class="custom-info">
        <pre>{{ info }}</pre>
      </div>
      <div v-else class="text-center">Click/touch and hold.</div>
    </q-card>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const info = ref(null)

    return {
      info,
      handleRepeat({ evt, ...newInfo }) {
        info.value = newInfo

        // native Javascript event
        // console.log(evt)
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.custom-area
  width: 96%
  height: 250px
  border-radius: 3px
  padding: 8px

.custom-info pre
  width: 190px
  font-size: 12px
</style>
