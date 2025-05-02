<template>
  <q-page padding>
    <div class="row">
      <q-input label="Text field" v-model="text">
        <template #after> after </template>
      </q-input>
      <q-input label="Text field" v-model="text">
        <template #after> after </template>
      </q-input>
      <q-input label="Text field" v-model="text">
        <template #after> after </template>
      </q-input>
      <q-input hint="Bottom slots" label="Text field" v-model="text">
        <template #after> after </template>
      </q-input>
      <q-input hint="Bottom slots" label="Text field" v-model="text">
        <template #after> after </template>
      </q-input>
      <q-input dense hint="Bottom slots" label="Text field" v-model="text">
        <template #after> after </template>
      </q-input>
      <q-input dense hint="Bottom slots" label="Text field" v-model="text">
        <template #after> after </template>
      </q-input>
      <q-input dense hint="Bottom slots" label="Text field" v-model="text">
        <template #after> after </template>
      </q-input>
      <q-input dense hint="Bottom slots" label="Text field" v-model="text">
        <template #after> after </template>
      </q-input>
      <q-input dense hint="Bottom slots" label="Text field" v-model="text">
        <template #after> after </template>
      </q-input>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const text = ref('Input text')
</script>
