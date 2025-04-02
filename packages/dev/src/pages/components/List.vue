<template>
  <q-page padding>
    <div class="row">
      <q-list bordered separator>
        <q-item>
          <q-item-section>
            <q-item-label>This is an item.</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label>This is an item.</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable>
          <q-item-section side top>
            <q-checkbox v-model="check" />
          </q-item-section>
          <q-item-section>
            <q-item-label>This is an item.</q-item-label>
            <q-item-label caption>Caption</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const check = ref(false)
</script>
