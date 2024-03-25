<script setup>
import Masthead from './components/Masthead.vue'
import Sidebar from './components/Sidebar.vue'
import Timeline from './components/Timeline.vue'
import ScrollPanel from 'primevue/scrollpanel';

import { ref } from 'vue';

var showSidebar = ref(false);

import { useTimelineStore } from '@/stores/timeline'
const timeline = useTimelineStore();

timeline.loadFromParam();
</script>

<template>
  <div class="wrapper">
    <header>
      <Masthead></Masthead>
    </header>

    <main>
      <Timeline></Timeline>
    </main>

    <aside v-if="timeline.editing">
      <ScrollPanel>
        <Sidebar></Sidebar>
      </ScrollPanel>
    </aside>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  height: 100vh;
}

.wrapper > main { 
  grid-area: 2 / 2 / 3 / 3;
  background: #e9e9ed;
}
.wrapper > aside { 
  grid-area: 2 / 1 / 3 / 2; 
  background: #e9e9ed;
  overflow-y: scroll;
  scrollbar-width: thin;
}
.wrapper > header { 
  grid-area: 1 / 1 / 2 / 3; 
  background: #404040;
  box-shadow: 3px 3px 1px #000000;
}
</style>
