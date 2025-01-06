import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import {
  faAnglesRight,
  faCaretDown,
  faCopy,
  faDownload,
  faFloppyDisk,
  faPlus,
  faTrash,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'
import { faFolderOpen } from '@fortawesome/free-regular-svg-icons'

/* add icons to the library */
library.add(
  faXmark,
  faAnglesRight,
  faPlus,
  faCopy,
  faTrash,
  faDownload,
  faCaretDown,
  faFloppyDisk,
  faFolderOpen,
)

app.use(createPinia())
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
