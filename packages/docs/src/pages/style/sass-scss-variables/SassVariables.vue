<template>
  <q-card flat bordered>
    <DocCode lang="sass" :code="rawVariables" />
  </q-card>
</template>

<script setup>
import DocCode from '@/components/DocCode.vue'
import rawVariables from 'quasar/src/css/variables.sass?raw'
</script>
