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
                <BudgetOverview 
                    class="cardBudget" 
                    :title="titleExpenses" 
                    :expenses="props.allExpenses"
                ></BudgetOverview>
            </template>
        </v-date-picker>
    </v-card>
</template>

<script setup>
    import { defineProps, watch, defineEmits  } from "vue";
    import { onMounted, nextTick } from 'vue';
    import { getLogoByName } from '@/data/logos';

    const date = ref(new Date());
    const props = defineProps(["expensesAbonnement", "allExpenses"]);
    const emit = defineEmits();
    const titleExpenses = "Répartition des dépenses";
    const today = new Date().toISOString().split('T')[0];
    let lastYear = null; // Stocke la dernière année reçue
    let lastMonth = null; // Stocke la dernière année reçue
       
    /*
     * onMounted - waits for the DOM to be completely rendered.
     */
    onMounted(() => {
        nextTick(() => {
            watch(() => props.expensesAbonnement, (expenses) => {
                if (expenses.length > 0) {
                    addIconExpensesInCalendar(expenses);
                }
            }, { immediate: true });
        });
    });

    function goToToday(){
        date.value = new Date();
        emit('current-month', date)
    }

    /*
     * change - change the month of the calendar.
     * @param month - month to be changed.
     */
    function changeDate(date) {
        let day = "01";
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

    /*
     * addIconExpensesInCalendar - add the icon of the expense in the calendar. 
     * @param expenses - list of expenses.
     * @param month - month to be changed.
     */
    function addIconExpensesInCalendar(expenses, month) {
        for (let index = 0; index < expenses.length; index++) {

            let selectedDate = getDateExpenses((expenses[index].date), month);
            const logo = getLogoByName(expenses[index].logo.name);

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

    /*
     * getDateExpenses - Transforms the date so that the month is replaced by the month displayed in the calenda.
     * @param selectedDate - date of the expense.
     * @param currentMonth - month to be changed.
     * @returns {string} - date of the expense.
     */
    function getDateExpenses( selectedDate, currentMonth){

        let month;
        let day = parseFloat(selectedDate['day']);
        if(day < 10){
            day = `0${selectedDate['day']}`;
        }
        const year = selectedDate['year'];

        if(currentMonth != null){
            if(currentMonth <= 8 && currentMonth != 0){
                month = `0${currentMonth+1}`
            }
            if(currentMonth >= 9 && currentMonth <= 11){
                month = `${currentMonth+1}`
            }
            if(currentMonth == 0){
                month = "01";
            }
        }else{
            if(parseFloat(selectedDate['month']) < 10){
                month = `0${selectedDate['month']}`;
            }else{
                month = selectedDate['month'];
            }
        }
        return `${year}-${month}-${day}`;
    }
</script>

<style scoped>
    .styledCard{
        margin: 0px;
        width: fit-content;
    }
</style>
