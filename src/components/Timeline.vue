<template>
  <div class="timeline-grid">
    <div class="timeline">
      <Card class="timeline-card">
        <template #content>
          <div v-if="timeline.milestones.length < 2" class="message-container">
            <InlineMessage >A timeline needs at least two milestones</InlineMessage>
          </div>
          <div v-else>
            <timeline-chart></timeline-chart>  
          </div>
        </template>
      </Card>
    </div>
    <div class="current-milestone p-card">
      <div v-if="!timeline.milestones[timeline.selectedMilestoneIndex]" class="message-container">
        <h1>{{ timeline.title }}</h1>
        <p style="max-width: 500px;">{{ timeline.subtitle }}</p>
        <InlineMessage severity="info">No milestone selected</InlineMessage>
      </div>
      <div v-else class="milestone-container">
        <div class="control control-back" @click="lastMilestone">
          <fa-icon icon="fas fa-chevron-left"></fa-icon>
        </div>
        <div class="milestone-center">
          <div :class="milestoneClasses(timeline.milestones[timeline.selectedMilestoneIndex])">
            <div class="media">
              <img class="image" src="https://placehold.co/600x400">
            </div>
            <div class="content">
              <div class="date">{{ formatDate(timeline.milestones[timeline.selectedMilestoneIndex].date) }}</div>
              <div class="title">{{ timeline.milestones[timeline.selectedMilestoneIndex].title }}</div>
              <div class="subtitle">{{ timeline.milestones[timeline.selectedMilestoneIndex].subtitle }}</div>
            </div>
          </div>
        </div>
        <div class="control control-forward" @click="nextMilestone">
          <fa-icon icon="fas fa-chevron-right"></fa-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

import { useTimelineStore } from '@/stores/timeline'
const timeline = useTimelineStore();

import Card from 'primevue/card';
import InlineMessage from 'primevue/inlinemessage';

import TimelineChart from '@/components/TimelineChart.vue';

import dayjs from 'dayjs';

function formatDate(date) {
  return dayjs(date).format(timeline.dateFormat);
}

function nextMilestone() {
  timeline.nextMilestone();
}

function lastMilestone() {
  timeline.lastMilestone();
}

function milestoneClasses(milestone) {
  var classes = ['milestone'];
  if (milestone.displayType == 'ltr') classes.push('ltr');
  else if (milestone.displayType == 'rtl') classes.push('rtl');
  else classes.push('normal');
  return classes;
}
</script>

<style lang="scss" scoped>

.milestone {
  .title {
    font-size: 2rem;
    font-weight: bold;
  }

  .date {
    font-weight: bold;
  }

  .subtitle {
    max-width: 600px;
  }

  .image {
    border-radius: 0.5rem;
  }
}

.normal {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.ltr {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
}

.rtl {
  display: flex;
  flex-direction: row-reverse;
  gap: 1rem;
  align-items: center;
}

.timeline-grid {
  display: flex;
  flex-direction: column-reverse;
  margin: 0.5rem;
  height: calc(100% - 1rem);
  gap: 0.5rem;

  .timeline {
    flex: 0;
  }

  .current-milestone {
    flex: 1;
  }
}

.message-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.milestone-container {
  display: grid;
  grid-template-columns: 3rem 1fr 3rem;
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  height: 100%;
    .control-back { 
      grid-area: 1 / 1 / 2 / 2; 
    }
    .milestone-center { 
      grid-area: 1 / 2 / 2 / 3;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .control-forward { 
      grid-area: 1 / 3 / 2 / 4; 
    }

    .control {
      font-size: 2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: padding 0.1s ease-in;
      transition: font-size 0.1s ease-in;

      &:hover {
        font-size: 2.5rem;
      }
    }
  
}
</style>