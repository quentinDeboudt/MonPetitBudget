<template>
  <v-card class="cardStyled" elevation="4">
    <v-card-title class="text-h6 font-weight-bold d-flex justify-space-between">
        {{title}} - {{ monthString }}
        
        <v-icon @click="viewExpense">mdi-plus-box</v-icon>
    </v-card-title>
    <v-table>
      <thead>
        <tr>
          <th class="text-left">
            Logo
          </th>
          <th class="text-left">
            Nom
          </th>
          <th class="text-left">
            Date
          </th>
          <th class="text-left">
            prix
          </th>
        </tr>
      </thead>
      <tbody v-if="!isloading">
        <tr
          v-for="(expense, index) in Expenses"
          :key="index"
          class="expenseHover"
          @click="viewExpense(expense)"
        >
          <td> <v-img id="icon" :src='expense.logo.path'/> </td>
          <td>{{ expense.name }}</td>
          <td>{{ expense.date }}</td>
          <td>{{ expense.amount }}€</td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
</template>

  
<script setup lang="ts">
  import { defineProps, watch, defineEmits  } from "vue";
  import { getLogoByName } from "@/data/logos";
  import type { Expense } from "@/interfaces/Expense";
  import type { ExpenseDTO } from "@/interfaces/ExpenseDto";

  let Expenses = ref<Expense[]>([]);
  let isloading = ref<boolean>(true);
  let monthString = ref<string>()
  const props = defineProps(["expenses", "title"]);
  const emit = defineEmits();

  /**
   * watch - watch the expense and transforme data.
   */
  watch(() => props.expenses, (lstExpenses: ExpenseDTO[]) => {
    isloading.value = true;
      if (lstExpenses) {
        isloading.value = false;
        Expenses.value = transformData(lstExpenses);
      }
  }, { immediate: true });


  /**
   * transformData - Transforme data to display.
   * @param {ExpenseDTO[]} lstExpenses - List of expenses.
   * @returns {ExpenseDTO[]} - List of expenses transformed.
   */
  function transformData(lstExpenses: ExpenseDTO[]): Expense[]{

     // Tableau des mois en français
    const months = [
        "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
        "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
    ];

    let lstExpensesTransformed: Expense[] = [];

    lstExpenses.forEach( expense => {

      monthString.value = months[expense.date.month -1]; // Mois (0-11)
      
      let logoName = expense.logo;
      let logo = getLogoByName(logoName.name);

      let ExpenseTransformed = {
        id: expense.id,
        name: expense.name,
        date: `${expense.date.day} ${monthString.value} ${expense.date.year}`,
        logo: {name: logo.name, path: logo.path, category: logo.category},
        amount: expense.amount,
        category: expense.category
      }
      lstExpensesTransformed.push(ExpenseTransformed);
    })

    return lstExpensesTransformed;
  }
  
  /**
   * viewExpense - Emit the selected expense.
   * @param {ExpenseDTO} item - Expense selected.
   */
  function viewExpense(expense: ExpenseDTO) {
    if (expense.name){
      emit('expense-selected', expense);
    }else{
      emit('new-expense');
    }
  }

</script>

<style scoped>
  .cardStyled {
    margin-top: 10px;
    height: 65vh;
    overflow-y: auto;
  }
  .expenseHover:hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.12);
    transition: .1s;
  }
  #icon {
    width: 30px !important;
  }
  .expenseName{
    display: flex;
    align-items: center;
    height: fit-content;
  }
</style>