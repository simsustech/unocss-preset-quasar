<template>
  <div class="q-pa-md">
    <q-layout
      view="lHh Lpr lFf"
      container
      style="height: 400px"
      class="shadow-2 rounded-borders"
    >
      <q-header elevated>
        <q-toolbar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          <q-toolbar-title> <strong>Quasar</strong> Framework </q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-page-container>
        <q-page padding>
          <p v-for="n in 15" :key="n">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit nihil
            praesentium molestias a adipisci, dolore vitae odit, quidem
            consequatur optio voluptates asperiores pariatur eos numquam rerum
            delectus commodi perferendis voluptate?
          </p>

          <!-- place QPageScroller at end of page -->
          <q-page-scroller
            expand
            position="top"
            :scroll-offset="150"
            :offset="[0, 0]"
          >
            <div
              class="col cursor-pointer q-pa-sm bg-accent text-white text-center"
            >
              Scroll back up...
            </div>
          </q-page-scroller>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>
