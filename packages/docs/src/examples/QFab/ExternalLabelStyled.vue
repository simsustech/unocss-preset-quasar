<template>
  <div class="q-pa-md" style="padding-top: 48px; padding-bottom: 220px">
    <div>
      <q-fab
        v-model="fab1"
        label="Actions"
        label-position="top"
        label-class="bg-grey-3 text-purple"
        external-label
        color="purple"
        icon="keyboard_arrow_right"
        direction="right"
      >
        <q-fab-action
          label-class="bg-grey-3 text-grey-8"
          external-label
          label-position="top"
          color="primary"
          @click="onClick"
          icon="mail"
          label="Email"
        />
        <q-fab-action
          label-class="bg-grey-3 text-grey-8"
          external-label
          label-position="top"
          color="secondary"
          @click="onClick"
          icon="alarm"
          label="Alarm"
        />
        <q-fab-action
          label-class="bg-grey-3 text-grey-8"
          external-label
          label-position="top"
          color="orange"
          @click="onClick"
          icon="airplay"
          label="Airplay"
        />
        <q-fab-action
          label-class="bg-grey-3 text-grey-8"
          external-label
          label-position="top"
          color="accent"
          @click="onClick"
          icon="room"
          label="Map"
        />
      </q-fab>
    </div>

    <div class="q-mt-md">
      <q-fab
        v-model="fab2"
        label="Actions"
        external-label
        label-class="bg-grey-3 text-purple"
        vertical-actions-align="left"
        color="purple"
        icon="keyboard_arrow_down"
        direction="down"
      >
        <q-fab-action
          label-class="bg-grey-3 text-grey-8"
          external-label
          color="primary"
          @click="onClick"
          icon="mail"
          label="Email"
        />
        <q-fab-action
          label-class="bg-grey-3 text-grey-8"
          external-label
          color="secondary"
          @click="onClick"
          icon="alarm"
          label="Alarm"
        />
        <q-fab-action
          label-class="bg-grey-3 text-grey-8"
          external-label
          color="orange"
          @click="onClick"
          icon="airplay"
          label="Airplay"
        />
        <q-fab-action
          label-class="bg-grey-3 text-grey-8"
          external-label
          color="accent"
          @click="onClick"
          icon="room"
          label="Map"
        />
      </q-fab>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    return {
      fab1: ref(true),
      fab2: ref(true),

      onClick() {
        // console.log('Clicked on a fab action')
      }
    }
  }
}
</script>
