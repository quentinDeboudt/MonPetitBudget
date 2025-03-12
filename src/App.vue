<template>
  <v-app id="app">
    <router-view />
  </v-app>
</template>

<script lang="ts" setup>
  import type { User } from 'firebase/auth';
  import { getDarkMode } from './services/userService';
  import useUserStore from './stores/userStore';
  import { onMounted, watch } from "vue";
  import { useTheme } from "vuetify";

  const theme = useTheme();
  let currentUser = ref<User | null>();
  const userStore = useUserStore();
  const darkMode = ref(false);

  /**
   * onMounted - waits for the DOM to be completely rendered.
   */
  onMounted(async () => {
    currentUser.value = userStore.currentUser;

    if(currentUser.value){
      getDarkMode( currentUser.value.uid).then((mode) => (darkMode.value = mode));
      updateBackgroundColor(darkMode.value);
    }

    // 🔹 Surveiller les changements de thème
    watch(() => darkMode, (isDarkMode) => {
      updateBackgroundColor(isDarkMode.value);
    });

  });

  const updateBackgroundColor = (isDarkMode: boolean) => {
    if (!isDarkMode) {
      const balise = document.getElementById("app");
      
      if (balise){
        //'#f5f5f5s'
        balise.style.backgroundColor = 'red';
      }
    }
  };
</script>

<style>
  #app {
    min-height: 100vh;
  }
</style>