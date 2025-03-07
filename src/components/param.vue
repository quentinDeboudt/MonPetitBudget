<template>
    <v-dialog v-model="dialogLocal" persistent max-width="800px">
      <v-card>
        <v-card-title class="headerModal">
          <v-btn v-if="profileImageUrl" variant="tonal">
            <v-img :src="profileImageUrl" class="imageProfil"></v-img>
            <p>{{ currentUser?.displayName }}</p>
          </v-btn>
        </v-card-title>
  
        <v-card-text>
          <v-text-field class="styledInput" v-model="income" label="income" type="number"></v-text-field>
        </v-card-text>
        
        <v-card-actions>
          <v-btn color="red" @click="closeModal">Fermer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
  
<script setup lang="ts">
  import type { User } from 'firebase/auth';
  import { defineProps, defineEmits, ref, watch } from 'vue';
  import useUserStore from '@/stores/userStore';

  let currentUser = ref<User | null>();
  let profileImageUrl = ref<string | null>();
  let income = ref<number>();
  const emit = defineEmits(['update:dialog']);
  const userStore = useUserStore();
  const props = defineProps<{
    dialog: boolean;
  }>();
  const dialogLocal = ref(props.dialog);
    

  /**
   * onMounted - waits for the DOM to be completely rendered.
   */
  onMounted(async () => {
    currentUser.value = userStore.currentUser;
    profileImageUrl.value = userStore.profileImageUrl;
    income.value = userStore.income;

  });

  /**
   * upDateExpense - upDate Parameter.
   * @param {any} data - data to update.
   */
  function upDateParameter(data: any) {
    console.log("update: ",data)
  }

  /**
   * closeModal - closes the modal.
   */
  const closeModal = () => {
    dialogLocal.value = false;
    emit('update:dialog', false);
  };
</script>
  
<style scoped lang="css">
  .icon {
    width: 10px;
    margin: 2px;
  }
</style>
  