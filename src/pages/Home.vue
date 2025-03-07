<template class="home">
    <AppBar @update:reloadData="fetchExpenses($event)" ></AppBar>
    <div class="expense_list">
        <div class="calendar">
            <Calendar 
                v-if="monthlyExpenses"
                :monthlyExpenses="monthlyExpenses"
                @expense-selected="handleExpenseSelected($event)"
                @current-date="fetchExpenses($event)"
            ></Calendar>
        </div>

        <div class="expenses">
            <div>
                <FinanceSummary :totalPriceOfExpenses="totalPriceOfExpenses" :savingsBudget="savingsBudget"></FinanceSummary>
            </div>
            <div>
                <ExpensesList
                    class="expensesList"
                    :title="titleExpenses[1]"
                    :expenses="ExpensesOfMonth"
                    @expense-selected="handleExpenseSelected($event)"
                    @new-expense="handleExpenseSelected()"
                ></ExpensesList>
            </div>
            
        </div>
    </div>

    <!-- Modal to create an expense -->
    <ModalExpenses
        v-if="currentUser?.uid && selectedExpense"
        :expense="selectedExpense"
        :newExpense="newExpense"
        :dialog="dialogExpenses"
        :idUser="currentUser?.uid"
        @update:dialog="closeModal($event)" 
    />
</template>

<script setup lang="ts">
    import AppBar from '@/components/AppBar.vue';
    import FinanceSummary from '@/components/FinanceSummary.vue';
    import Calendar from '@/components/Calendar.vue';
    import ExpensesList from '@/components/ExpensesListe.vue';
    import ModalExpenses from '@/components/ModalExpenses.vue';
    import { ref, onMounted } from 'vue';
    import type { ExpenseDTO } from '@/interfaces/ExpenseDto';
    import router from '@/router';
    import useUserStore from '@/stores/userStore';
    import type { User } from 'firebase/auth';
    import { getTotalPriceOfExpenses, getUserExpenses } from '@/services/expenseService';
import type { Expense } from '@/interfaces/Expense';

    let monthlyExpenses = ref<ExpenseDTO[]>();
    let ExpensesOfMonth = ref<ExpenseDTO[]>();
    let totalPriceOfExpenses = ref<number>(0);
    let savingsBudget = ref<number>(0);
    let newExpense = ref<boolean>(false);
    let currentUser: User | null;
    let loading = ref(true);
    const dialogExpenses = ref(false);
    const userStore = useUserStore();
    const selectedExpense = ref<Expense | null>();
    const titleExpenses = ['Dépenses hebdomadaires', 'Dépenses ponctuelles', 'Répartition des dépenses'];
    const today = {
        year: parseInt(new Date().toISOString().split('T')[0].split('-')[0]),
        month: parseInt(new Date().toISOString().split('T')[0].split('-')[1])
    };

    /**
     * onMounted - waits for the DOM to be completely rendered.
     */
    onMounted(async () => {
        currentUser = userStore.currentUser
        if(currentUser){
            fetchExpenses({year: today.year, month: today.month});
            monthlyExpenses.value = await getUserExpenses({
                idUser: currentUser.uid,
                date: {year:0, month:0},
                field:'category',
                WhereFilterOp:'==', 
                value: 'mensuellement'}
            );
        }else {
            router.push('/index');
        }
    });

    async function fetchExpenses(currentMonth: {year: number, month: number}) {

        loading.value = true;
        if(currentUser && currentMonth){
            ExpensesOfMonth.value = [];
            monthlyExpenses.value = [];
            totalPriceOfExpenses.value = 0;
            savingsBudget.value = 0;

            ExpensesOfMonth.value = await getUserExpenses({
                idUser: currentUser.uid,
                date: currentMonth,
                field:'category',
                WhereFilterOp:'==', 
                value: 'Ponctuellement'}
            );


            totalPriceOfExpenses.value = await getTotalPriceOfExpenses(currentUser.uid, currentMonth)

            savingsBudget.value = 50;

            loading.value = false;
        }
        

       
    };

    /**
     * openModal - Open Modal to créate new Expenses or view selected expense.
     */
    function handleExpenseSelected(expense?: Expense) {
        selectedExpense.value = null;
        if(expense){
            setTimeout(() => {
                selectedExpense.value = expense;
                dialogExpenses.value = true;
                newExpense.value = false;
            }, 5)
        }else{
            setTimeout(() => {
                selectedExpense.value = { id: 0, name: '', date: '', logo: { name: 'Neftix', path: '', category: '' }, amount: 0, category: '' };
                dialogExpenses.value = true;
                newExpense.value = true;
            }, 5)
        }
    }

    /**
     * closeModal - close Modal to créate new Expenses or view selected expense.
     */
    function closeModal(reloading: boolean) {
        if(reloading && userStore.currentUser?.uid){
            fetchExpenses({year: 2025, month: 3});
        }
        // dialogExpenses.value = false;
    }
</script>

<style scoped>
    .expense_list{
        display: flex;
        flex-direction:row ;
        margin: 10px;
    }/* 
    .calendar{
        padding: 10px;
        width: fit-content;
    }*/
    .expenses{
        margin-left: 10px;
    } 
</style>
