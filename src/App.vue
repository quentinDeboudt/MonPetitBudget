<template style="{isDarkMode ? 'background-color: green' : 'background-color: red}">
  <v-app >
    <router-view />
  </v-app>
</template>

<script lang="ts" setup>
  import useUserStore from '@/stores/userStore';
  import { getDarkMode } from './services/userService';
  import { useTheme } from "vuetify";

  const theme = useTheme();
  const userStore = useUserStore();
  let isDarkMode = ref<Boolean>(false);

  /**
   * watch - watches the User to update theme.
   */
  watch(
    () => userStore.currentUser,
    async (user) => {
      if(user){
        const darkMode = await getDarkMode(user.uid);
        isDarkMode.value = darkMode;
        theme.global.name.value = darkMode ? "dark" : "light";
      }
    },
    { deep: true, immediate: true }
  );
  
</script>