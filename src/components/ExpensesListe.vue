<template>
  <v-card class="cardStyled" elevation="4">
    <v-card-title class="text-h6 font-weight-bold d-flex justify-space-between">
        {{title}}
        
        <v-icon @click="viewExpense">mdi-plus-box</v-icon>
    </v-card-title>
    <v-table density="compact" fixed-header hover>
      <thead>
        <tr>
          <th class="text-left">
            Logo
          </th>
          <th class="text-left">
            Nom
          </th>
          <th class="text-left">
            Categorie
          </th>
          <th class="text-left">
            Date
          </th>
          <th class="text-left">
            prix
          </th>
        </tr>
      </thead>
      <tbody v-if="!isloading && Expenses">
        <tr
          v-for="(expense, index) in Expenses"
          :key="index"
          class="expenseHover"
          @click="viewExpense(expense)"
        >
          <td> <v-img id="icon" :src='expense.logo.path'/> </td>
          <td>{{ expense.name }}</td>
          <td>{{ expense.logo.category }}</td>
          <td>{{ expense.date }}</td>
          <td>{{ expense.amount }}€</td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
</template>

  
<script setup lang="ts">
  import { defineProps, watch, defineEmits  } from "vue";
  import type { Expense } from "@/interfaces/Expense";
  import type { ExpenseDTO } from "@/interfaces/ExpenseDto";
  import { ExpenseMapper } from "@/interfaces/ExpenseMapper";

  let expenseList: Expense[] = [];
  let Expenses = ref<Expense[]>([]);
  let isloading = ref<boolean>(true);
  const props = defineProps(["expenses", "title"]);
  const emit = defineEmits();

  /**
   * watch - watch the expense and transforme data.
   */
  watch(() => props.expenses, (lstExpenses: ExpenseDTO[]) => {
    isloading.value = true;
      if (lstExpenses) {
        expenseList = [];
        isloading.value = true;
        
        lstExpenses.forEach(expenseDTO => {
          expenseList.push(ExpenseMapper.ExpenseDtoToExpense(expenseDTO))
        })

        Expenses.value = expenseList;
        isloading.value = false;
      }
  }, { immediate: true });
  
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
    height: 65vh;
    overflow-y: auto;
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