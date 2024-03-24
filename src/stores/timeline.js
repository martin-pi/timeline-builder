import { defineStore } from 'pinia'
import * as gzip from 'gzip-js'


export const useTimelineStore = defineStore('timeline', {
  state: () => ({
    editing: true,
    title: '',
    subtitle: '',
    milestones: [],
    milestoneTemplate: {
      title: '',
      subtitle: '',
      date: new Date(),
      mediaType: 'none',
      media: '',
      displayType: 'normal'
    },
    dateFormat: 'MMM D, YYYY',
    selectedMilestoneIndex: undefined,
    nextId: 0,
    gzipped: undefined
  }),
  getters: {
    milestoneCount: (state) => state.milestones.length,
  },
  actions: {
    addMilestone() {
      var newMilestone = { ...this.milestoneTemplate };
      newMilestone.id = this.nextId;
      this.nextId += 1;
      newMilestone.date = new Date();
      this.milestones.push(newMilestone);
    },
  
    removeMilestone(i) {
      this.milestones.splice(i, 1);
    },

    sortMilestones() {
      // Sort by date, ascending.
      this.milestones.sort((a, b) => {
        return a.date.getTime() - b.date.getTime();
      });
    },

    nextMilestone() {
      if (typeof this.selectedMilestoneIndex === 'undefined') this.selectedMilestoneIndex = 0;
      else if (this.selectedMilestoneIndex == this.milestones.length - 1) this.selectedMilestoneIndex = undefined;
      else this.selectedMilestoneIndex += 1;
    },

    lastMilestone() {
      if (typeof this.selectedMilestoneIndex === 'undefined') this.selectedMilestoneIndex == this.milestones.length - 1;
      else if (this.selectedMilestoneIndex == 0) this.selectedMilestoneIndex = undefined;
      else this.selectedMilestoneIndex -= 1;
    },

    gzip() {
      const byteArray = gzip.zip(JSON.stringify(this.milestones), { level: 3, name: this.title, timestamp: parseInt(new Date().getTime() / 1000, 10)});
      var hex = '';
      for (let i = 0; i < byteArray.length; i++) {
        hex += byteArray[i].toString(16);
      }
      //this.gzipped = String.fromCharCode(...bytes);
      this.gzipped = hex;
      console.log((255).toString(16));
    }
  },
})
