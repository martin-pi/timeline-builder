

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App);


// Import PrimeVue.
import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/aura-light-green/theme.css'
app.use(PrimeVue);

// Import Fontawesome.
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import * as icons from '@fortawesome/free-solid-svg-icons'
let iconsArr = Object.values(icons);
iconsArr = iconsArr.filter((i) => {
  return (typeof i === 'object' && !Array.isArray(i) && typeof i.iconName === 'string');
});
library.add(...iconsArr);
app.component('fa-icon', FontAwesomeIcon);

app.use(createPinia());

// Mount custom CSS after any other CSS.
import './assets/main.css'

app.mount('#app');
