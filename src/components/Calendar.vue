<template>
    <v-card elevation="4" class="styledCard">
        <v-date-picker
            v-model="date"
            @update:month="changeDate($event)"
            @update:year="changeDate($event)"
            locale="fr"
        >
            <template #title>
                <v-btn @click="goToToday">
                    <v-icon>mdi-calendar-today</v-icon>
                    Aujourd'hui
                </v-btn>
            </template>
            <template #header></template>
            <template #actions>
                <v-table class="expenses" density="compact" fixed-header hover>
                    <thead>
                        <tr>
                            <th class="text-left">Logo</th>
                            <th class="text-left">Name</th>
                            <th class="text-left">prix</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="(expense, index) in Expenses"
                            :key="index"
                            @click="viewExpense(expense)"
                        >
                            <td><v-avatar :image="expense.logo.path"></v-avatar></td>
                            <td>{{ expense.name }}</td>
                            <td>{{ expense.amount }}</td>
                        </tr>
                    </tbody>
                </v-table>
            </template>
        </v-date-picker>
    </v-card>
</template>

<script setup>
    import { defineProps, watch, defineEmits  } from "vue";
    import { onMounted, nextTick } from 'vue';
    import { getLogoByName } from '@/data/logos';
    import { ExpenseMapper } from "@/interfaces/ExpenseMapper";

    const date = ref(new Date());
    const props = defineProps(["monthlyExpenses"]);
    const emit = defineEmits();
    const Expenses = ref();
    let displayMonth = parseInt(new Date().toISOString().split('T')[0].split('-')[1]);
    let today = new Date().toISOString().split('T')[0];
    let lastYear = null; // Stocke la dernière année reçue
    let lastMonth = null; // Stocke la dernière année reçue
       
    /*
     * onMounted - waits for the DOM to be completely rendered.
     */
    onMounted(() => {
        nextTick(() => {
            watch(() => props.monthlyExpenses, (expenses) => {
                if (expenses.length > 0) {
                    addIconExpensesInCalendar(expenses);
                    Expenses.value = expenses;
                }
            }, { immediate: true });
        });
    });

    /**
     * goToToday - Force the calendar to return to today:
     */
    function goToToday(){
        date.value = new Date();
        emit('current-month', date)
    }

    /*
     * addIconExpensesInCalendar - add the icon of the expense in the calendar. 
     * @param expenses - list of expenses.
     * @param month - month to be changed.
     */
    function addIconExpensesInCalendar(expenses) {
        for (let index = 0; index < expenses.length; index++) {

            //add a "0" if the day or month is less than 10:
            let transfomrmedMonth = displayMonth;
            let transfomrmedday;

            for (const [key, value] of Object.entries(expenses[index].date)) {
                if (key === 'month') {
                    transfomrmedMonth = value < 10 ? `0${transfomrmedMonth}` : transfomrmedMonth;
                } else if (key === 'day') {
                    transfomrmedday = value < 10 ? `0${value}` : value;
                }
            }
            let selectedDate = `${expenses[index].date['year']}-${transfomrmedMonth}-${transfomrmedday}`;

            const logo = getLogoByName(expenses[index].logo.name);

            //add the icon of the expense in the calendar:
            document
            .querySelectorAll(`.v-date-picker-month .v-date-picker-month__day[data-v-date="${selectedDate}"] .v-btn--icon`)
            .forEach(function(element) {
                element.style.backgroundImage = `url(${logo.path})`;
                element.style.backgroundSize = 'contain';
                element.style.backgroundPosition = 'center';
                element.style.backgroundRepeat = 'no-repeat';
            });
        }
    }

    /**
     * viewExpense - Emit the selected expense.
     * @param {Expense} item - Expense selected.
     */
    function viewExpense(expenseDTO) {
        const expense = ExpenseMapper.ExpenseDtoToExpense(expenseDTO);
        emit('expense-selected', expense);
    }

    /*
     * changeDate - Change the month of the calendar.
     * @param month - month to be changed.
     */
     function changeDate(date) {
        displayMonth = date +1;
        let [currentYear, currentMonth] = today.split("-").map(Number);

        let year = currentYear;
        let month = currentMonth;

        if (date > 12) {
            // Premier appel : on reçoit une année
            lastYear = date;
        }

        if (date < 12) {
            lastMonth = month ;
            //return; // On attend le prochain appel avec le mois
        }

        if (lastYear !== null) {
            // Deuxième appel : on reçoit un mois après avoir reçu une année
            year = lastYear;
            lastYear = year;
        }
        if (lastMonth !== null) {
            month = lastMonth;
            lastMonth = month;
        }

        month = date+1; // Affectation du mois
        if (month <= 12){
            emit('current-date', {year: year, month: month});
        }
    }
</script>

<style scoped>
    .expenses {
        margin: auto;
        overflow-y: auto; 
        height: 35vh;
        width: 100%;
    }
</style>
