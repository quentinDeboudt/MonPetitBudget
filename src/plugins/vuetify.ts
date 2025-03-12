import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { VCalendar } from 'vuetify/labs/VCalendar';
import { createVuetify } from 'vuetify'
import { getDarkMode } from '@/services/userService';

let darkMode = false; // Valeur par défaut
const userId = "HkiloN5Z56hIEo3jMepT8KRxyKz2";

getDarkMode(userId).then((mode) => {
  darkMode = mode;
});

export default createVuetify({
  components: {
    VCalendar,
  },
  theme: {
    defaultTheme: darkMode ? "dark" : "light",
    themes: {
        dark: { dark: true },
        light: { dark: false },
    },
  },
  // locale: {
  //   locale: 'fr',
  //   fallback: 'fr',
  // }
})
