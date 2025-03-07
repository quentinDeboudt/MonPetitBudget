<template>
  <v-dialog v-model="isOpen" persistent max-width="800px">
    <v-card>
      <v-card-title class="d-flex justify-space-between">
        <span v-if="expense?.id">Modifier la dépense</span>
        <span v-else>Ajouter une dépense</span>
        <v-btn color="red" icon="$close" @click="closeModal(false)"></v-btn>
      </v-card-title>

      <v-card-text>
        <div class="positionInput">
          <v-text-field class="styledInput" v-model="expenseLocal.name" label="Nom de la dépense"></v-text-field>
          <v-text-field class="styledInput" v-model="expenseLocal.amount" label="Price €" type="number"></v-text-field>
        </div>
        <div class="positionInput">
          <v-select
            label="Type de dépense"
            class="styledInput"
            v-model="expenseLocal.category"
            :items="['mensuellement', 'Ponctuellement']"
          ></v-select>
          <v-text-field class="styledInput" v-model="expenseLocal.date" label="Date" type="date"></v-text-field>

          <SelectLogo v-model="expenseLocal.logo" />
        </div>

        <v-card elevation="4" class="card">
          <v-list-item>
            <div class="item">
              <div class="elem">
                <div v-if="expenseLocal.logo">
                    <v-img class="icon" :src="expenseLocal.logo.path" />
                </div>
                <div>
                    <v-list-item-title class="font-weight-bold">{{ expenseLocal.name }}</v-list-item-title>
                    <v-list-item-subtitle>{{ expenseLocal.date }}</v-list-item-subtitle>
                </div>
              </div>
              <div class="elem">
                <v-list-item-action>
                  <span class="font-weight-bold">{{ expenseLocal.amount }}€</span>
                </v-list-item-action>
              </div>

            </div>
          </v-list-item>
        </v-card>
      </v-card-text>
      <v-card-actions class="d-flex justify-end">
        <v-btn v-if="!props.newExpense"  color="red" @click="expenseDelete">Supprimer</v-btn>
        <v-btn color="green" @click="submit">Enregistrer</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
  import { defineProps, defineEmits, ref, watch } from 'vue';
  import SelectLogo from './SelectLogo.vue';
  import { addExpense, deleteExpense } from "@/services/expenseService";
  import type { Expense } from '@/interfaces/Expense';

  const emit = defineEmits(['update:dialog']);
  const props = defineProps<{
    expense: Expense;
    dialog: boolean;
    idUser: string;
    newExpense: boolean;
  }>();
  let isOpen = ref<boolean>(props.dialog);

  let expenseLocal = ref<Expense>({ id: 0, name: '', date: '', logo: { name: 'Neftix', path: '', category: '' }, amount: 0, category: '' });
  
  /**
   * watch - watches the dialogLocal to display the modal.
   */
  watch(
    () => props.dialog,
    (isOpen) => {
      isOpen = isOpen;
    }
  );

  /**
   * watch - watches the expense to update the data to be displayed.
   */
  watch(
    () => props.expense,
    (expense) => {
      expenseLocal.value = expense;
      
    },
    { deep: true, immediate: true }
  );

  /**
   * submit - handles the form submission.
   */
  function submit() {
    if(expenseLocal.value){
      addExpense(props.idUser, expenseLocal.value);
      closeModal(true);
    }
    
  }

  /**
   * submit - handles the form submission.
   */
  function expenseDelete(){
    if(expenseLocal.value){
      deleteExpense(props.idUser, expenseLocal.value);
      closeModal(true);
    }
  };

  /**
   * closeModal - closes the modal.
   */
  const closeModal = (reloadPage: boolean) => {
    isOpen.value = false;
    emit('update:dialog', reloadPage);
  };
</script>

<style scoped lang="css">
  .styledInput {
    width: min-content;
    margin-right: 10px;
    margin-left: 10px;
    min-width: 200px;
  }
  .positionInput {
    display: flex;
  }
  .icon {
    width: 3vw;
    margin: 2px;
  }
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .elem {
    display: flex;
  }
  .card {
    width: 30vw;
    margin-right: auto;
    margin-left: auto;
  }

</style>
