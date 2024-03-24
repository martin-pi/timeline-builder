<template>
  <div class="timeline-item-form">
    <div>
      <label for="title">Title</label>
      <InputText size="small" id="title" v-model="milestone.title" class="full-width"></InputText>
    </div>
    <div>
      <label for="subtitle">Subtitle</label>
      <TextArea autoResize size="small" id="subtitle" v-model="milestone.subtitle" class="full-width"></TextArea>
    </div>
    <div>
      <label for="date">Date</label>
      <Calendar size="small" id="date" v-model="milestone.date" class="full-width"></Calendar>
    </div>
    <div>
      <label for="mediaType">Media Type</label>
      <Dropdown id="mediaType" class="full-width" v-model="milestone.mediaType" placeholder="Select a media type" :options="mediaOptions" optionLabel="name" optionValue="value" optionDisabled="disabled"/>
    </div>
    <div v-if="milestone.mediaType != 'none'">
      <label for="media">Media</label>
      <InputText v-if="milestone.mediaType == 'image'" size="small" id="media" v-model="milestone.media" class="full-width" placeholder="https://yourimagehost.whatever/image.jpg"></InputText>
      <InputText v-else-if="milestone.mediaType == 'iframe'" size="small" id="media" v-model="milestone.media" class="full-width" placeholder="https://www.openstreetmap.org/export/embed.html"></InputText>
      <InputText v-else-if="milestone.mediaType == 'youtube'" size="small" id="media" v-model="milestone.media" class="full-width" placeholder="https://www.youtube.com/embed/FpntUnBertg"></InputText>
      <InputText v-else-if="milestone.mediaType == 'html'" size="small" id="media" v-model="milestone.media" class="full-width" placeholder="<div>Your HTML Content</div>"></InputText>
      <InputText v-else size="small" id="media" v-model="milestone.media" class="full-width" placeholder="This media option may not render."></InputText>
    </div>
    <div>
      <label for="displayType">Display Type</label>
      <Dropdown id="displayType" class="full-width" v-model="milestone.displayType" placeholder="Select a display type" :options="displayOptions" optionLabel="name" optionValue="value" optionDisabled="disabled"/>
    </div>
    <InputGroup>
      <Button class="inputgroup-icon-button" severity="danger" outlined label="Delete This Milestone"></Button> 
    </InputGroup>
  </div>
</template>

<script setup>
  import InputText from 'primevue/inputtext';
  import TextArea from 'primevue/textarea';
  import InputGroup from 'primevue/inputgroup';
  import Calendar from 'primevue/calendar';
  import Button from 'primevue/button';
  import Dropdown from 'primevue/dropdown';

  import { ref, defineProps } from 'vue';

  const props = defineProps(['milestone']);

  const displayOptions = ref([
    { name: 'Normal', value: 'normal' },
    { name: 'Left to Right', value: 'ltr'},
    { name: 'Right to left', value: 'rtl' },
    { name: 'Large Media', value: 'lg-media', disabled: true },
  ]);
  const mediaOptions = ref([
    { name: 'None', value: 'none' },
    { name: 'Image URL', value: 'image'},
    { name: 'iFrame URL', value: 'iframe'},
    { name: 'Youtube Embed', value: 'youtube' },
    { name: 'HTML (Advanced)', value: 'html' },
  ]);
  const displaySelection = ref(undefined);
</script>

<style lang="scss" scoped>
.timeline-item-form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.full-width {
  width: 100%;
}

.inputgroup-icon-button {
  width: 100%;
}
</style>