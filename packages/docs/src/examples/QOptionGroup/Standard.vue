<template>
  <div class="q-pa-lg">
    <q-option-group v-model="group" :options="options" color="primary" />
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    return {
      group: ref('op1'),

      options: [
        {
          label: 'Option 1',
          value: 'op1'
        },
        {
          label: 'Option 2',
          value: 'op2'
        },
        {
          label: 'Option 3',
          value: 'op3'
        }
      ]
    }
  }
}
</script>
