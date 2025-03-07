<template>
  <v-app-bar :elevation="2">
    <template v-slot:prepend>
      <v-img class="logo" src="/src/assets/logo_bank/Logo_mon_petit_budget.png" />
    </template>
  
    <v-app-bar-title>
      <h3>Content de te revoir, {{ currentUser?.displayName }}!</h3>
      <h6>Prêt à mettre de l'ordre dans tes finances ?</h6>
    </v-app-bar-title>

    <template v-slot:append>
      <v-btn @click="openParameters" icon="$parameter" variant="tonal">
        <v-icon>mdi-cog</v-icon>
      </v-btn>

      <div v-if="profileImageUrl" class="profileGroupe">
        <v-img :src="profileImageUrl" class="imageProfil"></v-img>
        <div>
          <h4>{{ currentUser?.displayName }}</h4>
          <h6>{{ currentUser?.email }}</h6>
        </div>
      </div>
    </template>
  </v-app-bar>

  <!-- Modal to change parameters -->
  <parameter
    v-if="modalParameter"
    :dialog="dialogParameter"
    @update:dialog="closeModal($event)" 
  />
</template>
  
<script setup lang="ts">
  import { ref } from 'vue';
  import parameter from './param.vue';
  import useUserStore from '@/stores/userStore';
  import { type User } from 'firebase/auth';

  let currentUser: User | null;
  let profileImageUrl: string | null;
  let income = ref<number>();

  const emit = defineEmits(['update:reloadData']);
  const dialogExpenses = ref(false);
  const dialogParameter = ref(false);
  const modalParameter = ref<{income: number; name: string; photoUrl:string}>();
  const userStore = useUserStore();
  
  /**
   * onMounted - waits for the DOM to be completely rendered.
   */
  onMounted(async () => {
    currentUser = userStore.currentUser;
    profileImageUrl = userStore.profileImageUrl;
    income.value = userStore.income;
  });

  /**
   * openParameters - Open Modal to change params.
   */
  function openParameters() {
    if(income.value && currentUser?.displayName && profileImageUrl){
      modalParameter.value = { income: income.value, name: currentUser?.displayName, photoUrl: profileImageUrl }; 
      dialogParameter.value = true;
    };
  }

  function closeModal(reloading: boolean) {
    if(reloading) emit('update:reloadData', currentUser?.uid);
    dialogExpenses.value = false;
  }
</script>

<style>
  .logo{
    width: 8vw;
  }
  .profileGroupe {
    display: flex;
    align-items: center;
    border: 1px black solid;
    border-radius: 30px;
    margin: 10px;
  }
  .imageProfil{
    width: 40px;
    height: 40px;
    border: 1px solid black;
    border-radius: 30px;
    margin-right: 3px;
    margin: 5px;
  }
  .profileGroupe div{
    margin-right: 10px;
  }

</style>