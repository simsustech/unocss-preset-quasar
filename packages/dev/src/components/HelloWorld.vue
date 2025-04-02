<template>
  <q-card class="bg-white">
    <q-card-section>
      <div class="row no-wrap items-center">
        <q-avatar square style="height: 300px; width: 300px">
          <img alt="Logo" :src="logo" />
        </q-avatar>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
export default {
  name: 'HelloWorldComponent'
}
</script>

<script lang="ts" setup>
import logo from 'src/assets/quasar-logo-vertical.svg'
</script>
