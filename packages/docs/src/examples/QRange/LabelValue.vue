<template>
  <div class="q-pa-md q-pb-lg">
    <q-badge color="secondary" class="q-mb-sm">
      Model: {{ model.min }} to {{ model.max }} (-20 to 20, step 4)
    </q-badge>

    <q-range
      v-model="model"
      :min="-20"
      :max="20"
      :step="4"
      :left-label-value="model.min + 'px'"
      :right-label-value="model.max + 'px'"
      label-always
      switch-label-side
      color="purple"
    />
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    return {
      model: ref({
        min: -12,
        max: 8
      })
    }
  }
}
</script>
