<template>
  <div class="masthead">
    <!--<fa-icon icon="fas fa-flask"></fa-icon>-->
    <img src="@/assets/neatapp-logo.png" style="height:1.5em;">
    <div class="title">Timeline Builder (Preview)</div>
    <div class="spacer"></div>
    <div class="switch">
      <fa-icon icon="fas fa-eye"></fa-icon>
      <InputSwitch v-model="timeline.editing"></InputSwitch>
      <fa-icon icon="fas fa-pencil"></fa-icon>
    </div>
  </div>
</template>

<script setup>
  import InputSwitch from 'primevue/inputswitch';
  import { useTimelineStore } from '@/stores/timeline'
  const timeline = useTimelineStore();
</script>

<style lang="scss" scoped>

.masthead {
  color: #ffffff;
  display: flex;
  flex-direction: row;
  margin: 1rem;
  gap: 1rem;

  .spacer {
    flex: 1;
  }

  .title {
    font-weight: bold;
    font-size: 1.25rem;
  }

  .switch {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
}

</style>