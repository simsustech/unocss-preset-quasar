<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md column" style="max-width: 300px">
      <q-toggle v-model="dense" label="Dense QField" />

      <q-field outlined :dense="dense">
        <template v-slot:control>
          <div class="self-center full-width no-outline" tabindex="0">
            {{ text }}
          </div>
        </template>
      </q-field>

      <q-field outlined label="Label" stack-label :dense="dense">
        <template v-slot:control>
          <div class="self-center full-width no-outline" tabindex="0">
            {{ text }}
          </div>
        </template>
      </q-field>

      <q-field
        outlined
        square
        hint="With perfect square borders"
        :dense="dense"
      >
        <template v-slot:control>
          <div class="self-center full-width no-outline" tabindex="0">
            {{ text }}
          </div>
        </template>
      </q-field>

      <q-field outlined :dense="dense">
        <template v-slot:prepend>
          <q-icon name="event" />
        </template>

        <template v-slot:control>
          <div class="self-center full-width no-outline" tabindex="0">
            {{ text }}
          </div>
        </template>
      </q-field>

      <q-field outlined :dense="dense">
        <template v-slot:control>
          <div class="self-center full-width no-outline" tabindex="0">
            {{ text }}
          </div>
        </template>

        <template v-slot:append>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo.svg" />
          </q-avatar>
        </template>
      </q-field>

      <q-field
        outlined
        :model-value="text"
        bottom-slots
        label="Label"
        stack-label
        counter
        :dense="dense"
      >
        <template v-slot:prepend>
          <q-icon name="place" />
        </template>

        <template v-slot:control>
          <div class="self-center full-width no-outline" tabindex="0">
            {{ text }}
          </div>
        </template>

        <template v-slot:append>
          <q-icon name="close" class="cursor-pointer" />
        </template>

        <template v-slot:hint> Field hint </template>
      </q-field>

      <q-field
        outlined
        :model-value="text"
        bottom-slots
        label="Label"
        stack-label
        counter
        maxlength="12"
        :dense="dense"
      >
        <template v-slot:before>
          <q-icon name="flight_takeoff" />
        </template>

        <template v-slot:control>
          <div class="self-center full-width no-outline" tabindex="0">
            {{ text }}
          </div>
        </template>

        <template v-slot:append>
          <q-icon v-if="text !== ''" name="close" class="cursor-pointer" />
          <q-icon name="search" />
        </template>

        <template v-slot:hint> Field hint </template>
      </q-field>

      <q-field
        outlined
        :model-value="text"
        bottom-slots
        label="Label"
        stack-label
        counter
        maxlength="12"
        :dense="dense"
      >
        <template v-slot:before>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/avatar5.jpg" />
          </q-avatar>
        </template>

        <template v-slot:control>
          <div class="self-center full-width no-outline" tabindex="0">
            {{ text }}
          </div>
        </template>

        <template v-slot:append>
          <q-icon v-if="text !== ''" name="close" class="cursor-pointer" />
          <q-icon name="schedule" />
        </template>

        <template v-slot:hint> Field hint </template>

        <template v-slot:after>
          <q-btn round dense flat icon="send" />
        </template>
      </q-field>

      <q-field
        outlined
        :model-value="text"
        bottom-slots
        label="Label"
        stack-label
        counter
        maxlength="12"
        :dense="dense"
      >
        <template v-slot:before>
          <q-icon name="event" />
        </template>

        <template v-slot:control>
          <div class="self-center full-width no-outline" tabindex="0">
            {{ text }}
          </div>
        </template>

        <template v-slot:hint> Field hint </template>

        <template v-slot:append>
          <q-btn round dense flat icon="add" />
        </template>
      </q-field>

      <q-field outlined hint="Disable" :dense="dense" disable>
        <template v-slot:control>
          <div class="self-center full-width no-outline">{{ text }}</div>
        </template>
      </q-field>

      <q-field outlined hint="Readonly" :dense="dense" readonly>
        <template v-slot:control>
          <div class="self-center full-width no-outline">{{ text }}</div>
        </template>
      </q-field>

      <q-field
        outlined
        hint="Disable and readonly"
        :dense="dense"
        disable
        readonly
      >
        <template v-slot:control>
          <div class="self-center full-width no-outline">{{ text }}</div>
        </template>
      </q-field>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    return {
      text: ref('Field content'),
      dense: ref(false)
    }
  }
}
</script>
