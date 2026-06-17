<template>
  <div class="q-pa-md">
    <div
      class="flex inline shadow-box flex-center"
      v-for="n in 24"
      :key="n"
      :class="classes[n]"
    >
      .shadow-{{ n }}
    </div>
  </div>
</template>

<style lang="sass" scoped>
.shadow-box
  width: 90px
  height: 90px
  margin: 25px
  border-radius: 50%
  font-size: 12px
</style>

<script setup lang="ts">
const classes = {
  1: 'shadow-1',
  2: 'shadow-2',
  3: 'shadow-3',
  4: 'shadow-4',
  5: 'shadow-5',
  6: 'shadow-6',
  7: 'shadow-7',
  8: 'shadow-8',
  9: 'shadow-9',
  10: 'shadow-10',
  11: 'shadow-11',
  12: 'shadow-12',
  13: 'shadow-13',
  14: 'shadow-14',
  15: 'shadow-15',
  16: 'shadow-16',
  17: 'shadow-17',
  18: 'shadow-18',
  19: 'shadow-19',
  20: 'shadow-20',
  21: 'shadow-21',
  22: 'shadow-22',
  23: 'shadow-23',
  24: 'shadow-24'
}
</script>
