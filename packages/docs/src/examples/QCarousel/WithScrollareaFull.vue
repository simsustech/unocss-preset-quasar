<template>
  <div class="q-pa-md">
    <q-carousel
      v-model="slide"
      swipeable
      animated
      arrows
      navigation
      navigation-icon="radio_button_unchecked"
      control-type="regular"
      control-color="orange"
      control-text-color="grey-8"
      height="300px"
      class="bg-purple text-white rounded-borders"
    >
      <q-carousel-slide name="style" class="q-pa-none">
        <q-scroll-area class="fit">
          <div class="column no-wrap flex-center q-carousel--padding">
            <q-icon name="style" size="56px" />
            <div class="q-mt-md">
              {{ lorem }}
            </div>
            <div class="q-mt-md">
              {{ lorem }}
            </div>
            <div class="q-mt-md">
              {{ lorem }}
            </div>
            <div class="q-mt-md">
              {{ lorem }}
            </div>
            <div class="q-mt-md">
              {{ lorem }}
            </div>
          </div>
        </q-scroll-area>
      </q-carousel-slide>

      <q-carousel-slide name="tv" class="q-pa-none">
        <q-scroll-area class="fit">
          <div class="column no-wrap flex-center q-carousel--padding">
            <q-icon name="live_tv" size="56px" />
            <div class="q-mt-md">
              {{ lorem }}
            </div>
            <div class="q-mt-md">
              {{ lorem }}
            </div>
            <div class="q-mt-md">
              {{ lorem }}
            </div>
            <div class="q-mt-md">
              {{ lorem }}
            </div>
            <div class="q-mt-md">
              {{ lorem }}
            </div>
          </div>
        </q-scroll-area>
      </q-carousel-slide>

      <q-carousel-slide name="layers" class="q-pa-none">
        <q-scroll-area class="fit">
          <div class="column no-wrap flex-center q-carousel--padding">
            <q-icon name="layers" size="56px" />
            <div class="q-mt-md">
              {{ lorem }}
            </div>
            <div class="q-mt-md">
              {{ lorem }}
            </div>
            <div class="q-mt-md">
              {{ lorem }}
            </div>
            <div class="q-mt-md">
              {{ lorem }}
            </div>
            <div class="q-mt-md">
              {{ lorem }}
            </div>
          </div>
        </q-scroll-area>
      </q-carousel-slide>

      <q-carousel-slide name="map" class="q-pa-none">
        <q-scroll-area class="fit">
          <div class="column no-wrap flex-center q-carousel--padding">
            <q-icon name="terrain" size="56px" />
            <div class="q-mt-md">
              {{ lorem }}
            </div>
            <div class="q-mt-md">
              {{ lorem }}
            </div>
            <div class="q-mt-md">
              {{ lorem }}
            </div>
            <div class="q-mt-md">
              {{ lorem }}
            </div>
            <div class="q-mt-md">
              {{ lorem }}
            </div>
          </div>
        </q-scroll-area>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    return {
      slide: ref('style'),
      lorem:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo.'
    }
  }
}
</script>
