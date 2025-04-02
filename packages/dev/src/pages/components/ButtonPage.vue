<template>
  <q-page padding>
    <div class="row q-gutter-md">
      <q-btn label="Button" />

      <q-btn-dropdown label="Dropdown Button">
        <q-list>
          <q-item clickable v-close-popup @click="">
            <q-item-section>
              <q-item-label>Photos</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup @click="">
            <q-item-section>
              <q-item-label>Videos</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup @click="">
            <q-item-section>
              <q-item-label>Articles</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </div>
  </q-page>
</template>

<script setup lang="ts"></script>
