<template>
    <v-card elevation="4" :loading="!getAllCategories">
        <h2>{{ title }}</h2>
        <div class="GlobaleCard">
            <v-list-item v-for="(category) in getAllCategories" v-if="getAllCategories">
                <v-card style="display: flex;">
                    <v-progress-circular
                        class="progressBar"
                        :color="category.color"
                        :model-value="(category.average.difference)"
                        :size="70"
                        :width="12"
                    ><v-avatar :image="category.logo.path"></v-avatar></v-progress-circular>

                    <v-card elevation="2" class="detailedCategories">
                        <v-list-item-title class="font-weight-bold">{{ category.name }}- {{ category.proportion }}%</v-list-item-title>

                        <v-list-item-subtitle>
                            <p>Entre <span>{{ category.min }}%</span> - <span>{{ category.max }}%</span> du revenu.</p>
                        </v-list-item-subtitle>
                            
                        <v-list-item-action>
                            <p>-{{ category.amounts }}€</p>
                        </v-list-item-action>
                    </v-card>
                </v-card>
            </v-list-item>
        </div>
    </v-card>
</template>
    
<script setup lang="ts">
    import { defineProps, watch, defineEmits } from "vue";
    import type { BudgetCategories  } from "@/interfaces/BudgetCategories";
    import useUserStore from '@/stores/userStore';
    import type { ExpenseDTO } from "@/interfaces/ExpenseDto";
    import { category } from "@/data/Categories";
    import { getLogoByName } from "@/data/logos";

    let income = ref<number>(0);
    let getAllCategories = ref<BudgetCategories[]>();
    const emit = defineEmits();
    const userStore = useUserStore();
    const props = defineProps(["expenses", "title"]);

    /**
     * onMounted - waits for the DOM to be completely rendered.
     */
    onMounted(async () => {
        income.value = userStore.income
    });

    /**
     * watch - expenses.
     */
    watch(
        () => props.expenses,
        (Expenses) => {
            createtableCategory(Expenses, income.value);
        },
        { deep: true }
    );

    /**
     * createtableCategory - create a Category list with Expenses.
     * @param {ExpenseDTO[]} Expenses - Array of expense objects containing amount and logo details.
     * @param {number} income - The monthly income.
     *
     * @returns {BudgetCategories[] | undefined} Returns an array of BudgetCategories if found, otherwise undefined.
     */
    function createtableCategory(ExpensesList: ExpenseDTO[], income: number){

        getAllCategories.value = [];
        const colors = ['#00feff', '#00b9ff', '#004eff', '#8400ff', '#de00ff', '#ff00bd', '#ff003d', '#00ffde', '#00ff77', '#8aff00', '#fff800', '#ffb300', '#ff7300'];
        const TableCategories = category;
        let Expenses = ExpensesList;
        let Newcategory:BudgetCategories;
        let totalCategories = [];
        let isGoodCategory = false;
        let totalExpenses = 0;
        let numberExpenses = 0
        let colorbar = 0;
        let average: { status: string, difference: number } | undefined;

        TableCategories.forEach(category =>{
            for (let index = 0; index < Expenses.length; index++) {
                if(Expenses[index].logo.category == category.label){
                    if(category.averageSpending.min !== 0){
                        isGoodCategory = true;
                        totalExpenses += Expenses[index].amount;
                        numberExpenses += 1;
                        colorbar +=1;
                    }
                }
            }
            if(isGoodCategory){
                let pourcentage = Math.round((totalExpenses * 100)/ income);
                average = compareSubscription(pourcentage, category.averageSpending);

                if(pourcentage <= 0){
                    pourcentage = 1;
                }

                Newcategory = {
                    name: category.name,
                    numberExpenses: numberExpenses,
                    proportion: pourcentage,
                    amounts: totalExpenses,
                    color: colors[colorbar],
                    logo: getLogoByName(category.logo),
                    average: average,
                    min: category.averageSpending.min,
                    max: category.averageSpending.max
                }
                totalCategories.push(Newcategory);

                //reset data:
                isGoodCategory = false;
                totalExpenses = 0;
                numberExpenses = 0;
                average = { status: '', difference: 0 };
            }

            getAllCategories.value = totalCategories;

            if (getAllCategories.value.length > 0){
                emit('Category-List', getAllCategories.value);
            }
        });
    }


    function compareSubscription(abonnementPourcentage: number, average:{min: number; max: number}) {
        // Vérification de la validité des entrées
        if (typeof abonnementPourcentage !== 'number' || abonnementPourcentage < 0) {
            throw new Error("Le pourcentage d'abonnement doit être un nombre positif.");
        }
        if (typeof average.min !== 'number' || typeof average.max !== 'number') {
            throw new Error("Les bornes de la moyenne doivent être des nombres.");
        }

        // Si inférieur à la borne minimum
        if (abonnementPourcentage < average.min) {
            return {
                status: 'mdi-arrow-up',
                difference: (100 * abonnementPourcentage ) / average.max      
            };
        }

        // Si supérieur à la borne maximum
        if (abonnementPourcentage > average.max) {
            return {
            status: 'mdi-arrow-down',
            difference: (100 * abonnementPourcentage ) / average.max
            };
        }

        // Dans la plage recommandée
        return {
            status: 'mdi-arrow-collapse-vertical',
            difference: (100 * abonnementPourcentage ) / average.max
        };
    }

</script>
  
<style scoped>
    .GlobaleCard{
        max-width: 50vw;
        overflow-y: auto; 
        height: 50vh;
        min-height: 50vh;
    }
    .progressBar {
        margin: 2px;
    }
    .detailedCategories {
        margin: 4px;
        width: 28vw;
    }
    .detailedCategories span{
        font-weight: 800;
    }
</style>