<template>
  <v-app-bar :elevation="2">
    <template v-slot:prepend v-if="isDarkMode">
      <v-img class="logo" src="/src/assets/logo_bank/Logo_mon_petit_budget_light.png" />
    </template>
    <template v-slot:prepend v-if="!isDarkMode">
      <v-img class="logo" src="/src/assets/logo_bank/Logo_mon_petit_budget_dark.png" />
    </template>
  
    <v-app-bar-title>
      <h3>Content de te revoir, {{ currentUser?.displayName }}!</h3>
      <h6>Prêt à mettre de l'ordre dans tes finances ?</h6>
    </v-app-bar-title>

    <template v-slot:append>
      <div>
        <UserMenu
          @open-parameter="openParameters"
        ></UserMenu>
      </div>
    </template>
  </v-app-bar>

  <!-- Modal to change parameters -->
  <parameter
    v-if="modalParameter"
    :dialog="dialogParameter"
    @update:dialog="closeModal($event)" 
    @update:darkMode="isDarkMode = $event" 
  />
</template>
  
<script setup lang="ts">
  import { ref } from 'vue';
  import parameter from './param.vue';
  import UserMenu from './UserMenu.vue';
  import useUserStore from '@/stores/userStore';
  import { type User } from 'firebase/auth';
import { getDarkMode } from '@/services/userService';

  let currentUser: User | null;
  let profileImageUrl: string | null;
  let income = ref<number>();

  const emit = defineEmits(['update:reloadData']);
  const dialogExpenses = ref(false);
  const dialogParameter = ref(false);
  const modalParameter = ref<{income: number; name: string; photoUrl:string}>();
  const userStore = useUserStore();
  const isDarkMode = ref<boolean>();
  
  /**
   * onMounted - waits for the DOM to be completely rendered.
   */
  onMounted(async () => {
    currentUser = userStore.currentUser;
    profileImageUrl = userStore.profileImageUrl;
    income.value = userStore.income;

    if(currentUser?.uid){
    isDarkMode.value = await getDarkMode(currentUser.uid);}
  });

  /**
   * openParameters - Open Modal to change params.
   */
  function openParameters() {
    if(income.value && currentUser?.displayName && profileImageUrl){
      modalParameter.value = { income: 0, name: '', photoUrl: '' };
      modalParameter.value = { income: income.value, name: currentUser?.displayName, photoUrl: profileImageUrl }; 
      dialogParameter.value = true;
    };
  }

  function closeModal(reloading?: boolean) {
    if(reloading) emit('update:reloadData', currentUser?.uid);
    dialogExpenses.value = false;
  }
</script>

<style scoped>
  .logo{
    width: 8vw;
  }
</style>