<template>
  <div class="q-pa-md flex flex-center">
    <q-circular-progress
      reverse
      :value="value"
      size="50px"
      color="light-blue"
      class="q-ma-md"
    />

    <q-circular-progress
      reverse
      :value="value"
      size="90px"
      :thickness="0.2"
      color="light-blue"
      center-color="grey-9"
      track-color="transparent"
      class="q-ma-md"
    />

    <q-circular-progress
      reverse
      :value="value"
      size="45px"
      :thickness="1"
      color="grey-9"
      track-color="light-blue"
      class="q-ma-md"
    />

    <q-circular-progress
      reverse
      :value="value"
      size="50px"
      :thickness="0.22"
      color="light-blue"
      track-color="grey-3"
      class="q-ma-md"
    />

    <q-circular-progress
      reverse
      :value="value"
      size="75px"
      :thickness="0.6"
      font-size="50px"
      color="light-blue"
      center-color="grey-9"
      class="q-ma-md"
    />

    <q-circular-progress
      reverse
      :value="value"
      size="40px"
      :thickness="0.4"
      color="light-blue"
      track-color="grey-3"
      center-color="grey-9"
      class="q-ma-md"
    />
  </div>
</template>

<script>
export default {
  setup() {
    return {
      value: 71
    }
  }
}
</script>
