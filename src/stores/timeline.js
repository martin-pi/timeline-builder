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
    sharingResults: undefined
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

    loadFromParam() {
      // Without vue router, we have to read parameters manually.
      let urlParams = new URLSearchParams(window.location.search);
      if (urlParams.has('s')) {
        // There is a nightmare-parameter-encoded timeline, let's try to parse it.
        var param = urlParams.get('s');
        var bytes = [];
        for (var i = 0; i < param.length; i += 2) {
          var hex = `0x${param.substring(i, i+2)}`;
          var byte = Number(hex);
          bytes = bytes.concat([byte]);
        }
        try {
          var unzipped = gzip.unzip(bytes);
          let decoder = new TextDecoder('utf-8');
          let stringified = decoder.decode(new Uint8Array(unzipped));
          
          // TODO We should probably store more than just the milestones.
          this.milestones = JSON.parse(stringified);
          this.nextId = this.milestones.length;
        } catch(err) {
          console.error(err);
        }
      }
    },

    shareAsParam() {
      // TODO Define exactly what a stored timeline looks like. Not just an array of milestones.
      var storedTimeline = this.milestones;
      // Encode the entire timeline into a json object, gzip it, url-encode it, and make the world's ugliest link.
      const byteArray = gzip.zip(JSON.stringify(storedTimeline), { level: 3, name: this.title, timestamp: parseInt(new Date().getTime() / 1000, 10)});
      var fullHex = '';
      for (let i = 0; i < byteArray.length; i++) {
        var hex = byteArray[i].toString(16).padStart(2, '0');
        fullHex += hex;
      }
      this.sharingResults = `timelines.neatapp.dev?s=${fullHex}`;
    },

    shareAsHTML() {
      // TODO Build a template for an HTML page with only the requirements to display a timeline.
      // Encode the timeline somehow into the html and trigger the page to load it immediately.
    },

    shareAsCached() {
      // This would require a cache somewhere. 
      // The idea here is that it would keep server costs low by overriding old timelines.
      // Because the cache has a limit, it would theoretically never build up storage costs.
    },

    shareAsSaved() {
      // This would require some kind of authentication for this, which is out of scope.
      // Using that auth, store the timeline to some API and receive an ID.
      // That ID could be loaded from query params to retrieve the timeline and display it.
    }
  },
})
