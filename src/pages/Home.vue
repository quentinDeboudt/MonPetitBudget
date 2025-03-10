<template class="home">
     <!-- Modal to create an expense -->
    <ModalExpenses
        v-if="openModal && selectedExpense && currentUser?.uid"
        :expense="selectedExpense"
        :newExpense="newExpense"
        :dialog="dialogExpenses"
        :idUser="currentUser?.uid"
        @update:dialog="closeModal($event)" 
    />

    <AppBar @update:reloadData="fetchExpenses($event)" ></AppBar>

    <v-row >
        <v-col cols="12" sm="3">
            <v-container fluid>
                <Calendar
                    class="flex-grow-0 flex-shrink-0" style="min-width: 350px;" 
                    v-if="monthlyExpenses"
                    :monthlyExpenses="monthlyExpenses"
                    @expense-selected="handleExpenseSelected($event)"
                    @current-date="fetchExpenses($event)"
                ></Calendar>
            </v-container>
        </v-col>

        <v-col cols="12" sm="9">
            <div>
                <v-container>
                    <FinanceSummary :totalPriceOfExpenses="totalPriceOfExpenses" :savingsBudget="savingsBudget"></FinanceSummary>
                </v-container>
            </div>
            <div>
                <v-container>
                    <ExpensesList
                        class="expensesList"
                        :title="titleExpenses[1]"
                        :expenses="ExpensesOfMonth"
                        @expense-selected="handleExpenseSelected($event)"
                        @new-expense="handleExpenseSelected()"
                    ></ExpensesList>
                </v-container>
            </div>
            
        </v-col>
    </v-row>
    <v-row no-gutters>
        <v-col  md="3">
            <budgetOverview
                :expenses="AllExpenses"
                title="coucou"
            ></budgetOverview>
        </v-col>
        
        <v-col md="9">
            <BudgetOptimizer
                :expenses="AllExpenses"
                title="coucou"
            ></BudgetOptimizer>
        </v-col>ss
    </v-row>
</template>

<script setup lang="ts">
    import AppBar from '@/components/AppBar.vue';
    import FinanceSummary from '@/components/FinanceSummary.vue';
    import Calendar from '@/components/Calendar.vue';
    import ExpensesList from '@/components/ExpensesListe.vue';
    import BudgetOverview from '@/components/BudgetOverview.vue';
    import BudgetOptimizer from '@/components/BudgetOptimizer.vue';
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
    let AllExpenses = ref<ExpenseDTO[]>([]);
    let totalPriceOfExpenses = ref<number>(0);
    let savingsBudget = ref<number>(0);
    let newExpense = ref<boolean>(false);
    let currentUser: User | null;
    let openModal = ref(false);
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
        }else {
            router.push('/index');
        }
    });

    async function fetchExpenses(currentMonth: {year: number, month: number}) {
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

            monthlyExpenses.value = await getUserExpenses({
                idUser: currentUser.uid,
                date: {year:0, month:0},
                field:'category',
                WhereFilterOp:'==', 
                value: 'mensuellement'}
            );

            AllExpenses.value = [...monthlyExpenses.value, ...ExpensesOfMonth.value];

            totalPriceOfExpenses.value = await getTotalPriceOfExpenses(currentUser.uid, currentMonth)

            savingsBudget.value = 50;
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
                openModal.value = true;
            }, 5)
        }else{
            setTimeout(() => {
                selectedExpense.value = { id: 0, name: '', date: '', logo: { name: 'Neftix', path: '', category: '' }, amount: 0, category: '' };
                dialogExpenses.value = true;
                newExpense.value = true;
                openModal.value = true;
            }, 5)
        }
    }

    /**
     * closeModal - close Modal to créate new Expenses or view selected expense.
     */
    function closeModal(reopenModal: boolean) {
        if(reopenModal && userStore.currentUser?.uid){
            fetchExpenses({year: 2025, month: 3});
        }
        dialogExpenses.value = false;
        openModal.value = false;
    }
</script>

<style scoped>

</style>
