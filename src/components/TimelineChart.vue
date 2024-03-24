<template>
  <div id="tlc">
    <svg v-if="!processing" :width="size.width" :height="size.height">
      <rect fill="#404040" rx="4" height="10" :width="size.width - (margin*4)" :x="margin*2" :y="margin"></rect>
      <rect fill="#404040" rx="4" height="10" :width="size.width - (margin*4)" :x="margin*2" :y="margin"></rect>
      <g v-for="milestone, index in timelineStore.milestones" :key="milestone.date">
        <circle r="12" :cx="timescale(milestone.date)" :cy="margin + 5" fill="#ffffff" stroke="#404040" stroke-width="6" cursor="pointer" @click="milestoneClick" :id="`m${index}`"></circle>
        <text text-anchor="middle" :transform="`translate(${timescale(milestone.date)}, ${margin + 30})`" alignment-baseline="middle">
          {{ formatDate(milestone.date) }}
        </text>
      </g>
    </svg>
  </div>
</template>

<script>
import * as d3 from 'd3'
import dayjs from 'dayjs'
import { useTimelineStore } from '@/stores/timeline'
import { mapStores } from 'pinia'
export default {
  name: 'TimelineChart',

  props: {
    milestones: {
      type: Object
    }
  },

  data() {
    return {
      size: {
        width: 1000,
        height: 70
      },
      margin: 30,
      processing: false
    }
  },

  computed: {
    ...mapStores(useTimelineStore),
  },

  methods: {
    update() {
      this.processing = true;
      this.getSize();

      
      this.$nextTick(() => {
        this.processing = false;
      })
    },

    formatDate(date) {
      return dayjs(date).format(this.timelineStore.dateFormat);
    },

    timescale(date) {
      // Update the timescale to reflect the potentially new width/dates
      const ts = d3.scaleTime(
        [this.timelineStore.milestones[0].date ?? new Date('2000'), this.timelineStore.milestones[this.timelineStore.milestones.length - 1].date ?? new Date('2020')],
        [ this.margin*2, this.size.width - this.margin*2 ]
      );

      return ts(date);
    },

    getSize () {
      var width = this.$el.clientWidth;
      var height = this.margin*2 + 10;
      this.size = { width, height };
      return this.size;
    },

    svgMouseMove() {

    },

    svgMouseOut() {

    },

    milestoneMouseOver() {

    },

    milestoneMouseOut() {

    },

    milestoneClick(e) {
      var id = Number(e.target.id.match(/m(\d*)/)[1]) ?? undefined;
      if (id == this.timelineStore.selectedMilestoneIndex) this.timelineStore.selectedMilestoneIndex = undefined;
      else this.timelineStore.selectedMilestoneIndex = id;
    }
  },

  mounted() {
    this.update();
    window.addEventListener("resize", this.update);
  },

  unmounted() {
    window.removeEventListener("resize", this.update);
  }
}
</script>

<style lang="scss" scoped>
  .tlc {
    position: relative;

    svg {
      position: absolute;
    }
  }
</style>