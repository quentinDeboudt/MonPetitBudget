<template>
    <v-dialog v-model="dialogLocal" persistent class="modal">
      <v-card class="card">
        <v-tabs v-model="dialogLocal">  <!-- TODO: le probleme vient d'ici ! -->
          <v-tab value="Income">
            <v-icon icon="mdi-slot-machine"></v-icon>
            <p>Revenus</p>
          </v-tab>
          <v-tab value="Diplay">
            <v-icon icon="mdi-palette-advanced"></v-icon>
            <p>paramètre d'affichage</p></v-tab>
          <v-tab value="other">
            <v-icon icon="mdi-arrange-send-backward"></v-icon>
            <p>autre paramètre</p>
          </v-tab>
        </v-tabs>

        <v-card-text>
          <v-tabs-window v-model="dialogLocal">
            <v-tabs-window-item value="Income">
              <v-card-text>
                <v-switch label="Revenus Fix"></v-switch>
                <v-text-field class="styledInput" v-model="income" label="Revenus" type="number"></v-text-field>
              </v-card-text>
            </v-tabs-window-item>

            
            <v-tabs-window-item value="Diplay">
              <div style="display: flex; align-items: center;">
                <p class="light-mode">Light Mode</p>
                <v-switch
                  style="display: flex;"
                  v-model="darkMode"
                  @change="toggleDarkMode"
                ></v-switch>
                <p class="dark-mode">Dark Mode </p>
              </div>
            </v-tabs-window-item>

            <v-tabs-window-item value="other">
              autre paramètre
            </v-tabs-window-item>
          </v-tabs-window>

          <v-btn color="blue" @click="closeModal">Enregistrer</v-btn>
          <v-btn color="red" @click="closeModal">Fermer</v-btn>

        </v-card-text>
      </v-card>
    </v-dialog>
</template>
  
<script setup lang="ts">
  import type { User } from 'firebase/auth';
  import { defineProps, defineEmits, ref, watch } from 'vue';
  import useUserStore from '@/stores/userStore';
  import { useTheme } from "vuetify";
  import { getDarkMode, updateDarkMode } from "@/services/userService"

  let currentUser = ref<User | null>();
  let profileImageUrl = ref<string | null>();
  let income = ref<number>();
  const emit = defineEmits(['update:dialog', 'update:darkMode']);
  const userStore = useUserStore();
  const props = defineProps<{
    dialog: boolean;
    data: {income: number; name: string; photoUrl:string}
  }>();
  const dialogLocal = ref(props.dialog);

  const theme = useTheme();
  const darkMode = ref(false);

  watch(() => props.data, (data) => {
    profileImageUrl.value = data.photoUrl;
    income.value = data.income;
  });

  /**
   * onMounted - waits for the DOM to be completely rendered.
   */
  onMounted(async () => {
    currentUser.value = userStore.currentUser;
    if(currentUser.value){
      getDarkMode(currentUser.value.uid).then((mode) => (darkMode.value = mode));
    }
  });

  /**
   * upDateExpense - upDate Parameter.
   * @param {any} data - data to update.
   */
  function upDateParameter(data: any) {
    console.log("update: ",data)
  }

  /**
   * toggleDarkMode
   */
  async function toggleDarkMode(){
    if(currentUser.value){
      await updateDarkMode(currentUser.value.uid, darkMode.value);
      theme.global.name.value = darkMode.value ? "dark" : "light";
      emit('update:darkMode', darkMode.value);
    }
  };


  /**
   * closeModal - closes the modal.
   */
  const closeModal = () => {
    dialogLocal.value = false;
    emit('update:dialog', false);
  };

</script>
  
<style scoped lang="css">
  .modal{
    max-width: 800px;
  }
  .card {
    /* background-color: #f5f5f5; */
  }

  .dark-mode{
    background-color: black;
    border: 1px solid white;
    color: white;
    padding: 6px;
    margin: 5px;
    border-radius: 5px;
  }

  .light-mode{
    background-color: white;
    border: 1px solid black;
    color: black;
    padding: 6px;
    margin: 5px;
    border-radius: 5px;
  }
</style>
  