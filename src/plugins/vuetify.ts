/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { VCalendar } from 'vuetify/labs/VCalendar';


// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  components: {
    VCalendar,
  },

  theme: {
    defaultTheme: 'light',
  },
  locale: {
    locale: 'fr',  // Définit la langue principale en français
    fallback: 'fr'  // Assure que tout reste en français si besoin
  }
})
