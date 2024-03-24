<template>
  <div class="sidebar">
    <Card>
      <template #title>Config</template>
      <template #content>
        <div class="sidebar-form">
          <div>
            <label for="timelineTitle">Title</label>
            <InputText size="small" id="timelineTitle" v-model="timeline.title" class="full-width"></InputText>
          </div>
          <div>
            <label for="timelineTitle">Subtitle</label>
            <TextArea size="small" autoResize  id="timelineTitle" v-model="timeline.subtitle" class="full-width"></TextArea>
          </div>
        </div>
        <div>
            <label for="dateFormat">Date Format</label>
            <InputText size="small" id="dateFormat" v-model="timeline.dateFormat" class="full-width"></InputText>
          </div>
      </template>
    </Card>
    
    <Card>
      <template #title>Milestones</template>
      <template #content>
        <Accordion :multiple="false" v-model:active-index="timeline.selectedMilestoneIndex">
          <AccordionTab v-for="milestone in timeline.milestones" :key="milestone.id" :header="`Milestone ${milestone.id}`">
            <TimelineItem :milestone="milestone"></TimelineItem>
          </AccordionTab>
        </Accordion>
        <InputGroup>
          <Button label="Add Milestone" class="full-width" @click="timeline.addMilestone"></Button>
          <Button class="inputgroup-icon-button" @click="timeline.sortMilestones"><fa-icon icon="fas fa-arrow-down-short-wide"></fa-icon></Button>
        </InputGroup>
        
      </template>
    </Card>
    
    <Card>
      <template #title>Sharing</template>
      <template #content>
        <InputGroup>
          <Dropdown v-model="sharingSelection" placeholder="Select a method" :options="sharingOptions" optionLabel="name" optionValue="value" optionDisabled="disabled"/>
          <Button label="Do It"></Button>
        </InputGroup>
        <p>Your Sharing results will appear here.</p>
        <Button label="Gzip" @click="timeline.gzip"></Button>
      </template>
    </Card>

    <Card>
      <template #content>
        <p>Built by Rick Martin. <a href="">Source Available</a>.</p>
      </template>
    </Card>

  </div>
</template>

<script setup>
  import Accordion from 'primevue/accordion';
  import AccordionTab from 'primevue/accordiontab';
  import TextArea from 'primevue/textarea';
  import InputGroup from 'primevue/inputgroup';
  import Dropdown from 'primevue/dropdown';
  import Button from 'primevue/button';
  import Card from 'primevue/card';
  import InputText from 'primevue/inputtext';
  import TimelineItem from '@/components/forms/TimelineItem.vue';

  import { ref } from 'vue';

  import { useTimelineStore } from '@/stores/timeline'
  const timeline = useTimelineStore();

  const sharingOptions = ref([
    { name: 'Share as Link (Small Timelines)', value: 'param', disabled: false  },
    { name: 'Temporarily Cache to Server', value: 'cache', disabled: true  },
    { name: 'Permanently Save to Server', value: 'permanent', disabled: true },
    { name: 'Download and Self-Host', value: 'html', disabled: false  },
  ]);
  const sharingSelection = ref(undefined);
</script>

<style lang="scss" scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 0.5rem;
}

.full-width {
  width: 100%;
}

.sidebar-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 400px;
}
</style>