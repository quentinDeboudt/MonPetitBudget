<template>
    <v-card elevation="4" class="d-flex">
        <div class="incomeProportion">
            <p>100% -></p>
            <p>90% -></p>
            <p>80% -></p>
            <p>70% -></p>
            <p>60% -></p>
            <p>50% -></p>
            <p>40% -></p>
            <p>30% -></p>
            <p>20% -></p>
            <p>10% -></p>
            <p>0% -></p>
        </div>
        <v-list-item v-for="(category) in getAllCategories">
            <v-tooltip>
                <template v-slot:activator="{ props }">
                    <div class="incomeBar" v-bind="props">
                        <div class="averageExpensesPosition">
                            <div
                                class="averageExpenses" 
                                :style="{
                                    backgroundColor: category.color,
                                    height:((category.max - category.min))+'%',
                                }"
                            ></div>
                            <div
                                class="averageExpenses"
                                :style="{
                                    height:(category.min)+'%',
                                }"
                            ></div>
                        </div>
                        

                        <div class="spendingSlider"
                            :style="{
                            height:(category.proportion)+'%',
                            }"
                        ></div>
                    </div>
                </template>
                
                <div>
                    <div>
                        <v-img  class="icon" :src="category.logo.path"></v-img>
                    </div>
                    <div>
                        <v-list-item-title class="font-weight-bold">{{ category.name }}</v-list-item-title>
                        <v-list-item-subtitle>{{ category.numberExpenses }} dépenses - {{ category.proportion }}%</v-list-item-subtitle>

                        <div v-if="category.average" >
                            <v-chip :prepend-icon="category.average.status" color="green">
                            {{category.average.difference}}%
                            </v-chip>
                            -{{ category.amounts }}€
                            <p> En moyenne, la categorie {{ category.name }} ce situe entre {{ category.min }}% et {{ category.max }}% du revenue.</p>
                        </div>
                        
                    </div>
                </div>
            </v-tooltip>
            <div class="titleExpenes">
                <v-img  class="icon" :src="category.logo.path"></v-img>
            </div>
        </v-list-item>
    </v-card>
</template>
    
<script setup lang="ts">
    import { defineProps, watch } from "vue";
    import { category } from "@/data/Categories";
    import { getLogoByName } from "@/data/logos";
    import type { BudgetCategories  } from "@/interfaces/BudgetCategories";
    import useUserStore from '@/stores/userStore';
    import type { ExpenseDTO } from "@/interfaces/ExpenseDto";

    let income = ref<number>(0);
    let getAllCategories = ref<BudgetCategories[]>();
    const userStore = useUserStore();
    const props = defineProps(["expenses", "title"]);
    const colors = ['#00feff', '#00b9ff', '#004eff', '#8400ff', '#de00ff', '#ff00bd', '#ff003d', '#00ffde', '#00ff77', '#8aff00', '#fff800', '#ffb300', '#ff7300'];

    /**
     * onMounted - waits for the DOM to be completely rendered.
     */
    onMounted(async () => {
        income.value = userStore.income
    });

    /**
     * watch -
     */
    watch(
        () => props.expenses,
        (Expenses) => {

            createtableCategory(Expenses)
        },
        { deep: true }
    );

    /**
     * createtableCategory -
     */
    function createtableCategory(Expenses: ExpenseDTO[]) {

        const TableCategories = category;
        let Newcategory:BudgetCategories;
        let totalCategories = [];
        let isGoodCategory = false;
        let totalExpenses = 0;
        let numberExpenses = 0
        let colorbar = '';
        let average: { status: string, difference: number } | undefined;
        getAllCategories.value = [];
        
        TableCategories.forEach(category =>{
            for (let index = 0; index < Expenses.length; index++) {
                if(Expenses[index].logo.category == category.label){
                    if(category.averageSpending.min !== 0){
                        isGoodCategory = true;
                        totalExpenses += Expenses[index].amount;
                        numberExpenses += 1;
                        colorbar = colors[index];
                    }
                }
            }
            if(isGoodCategory){

                const pourcentage = Math.round((totalExpenses * 100)/ income.value);
                average = compareSubscription(pourcentage, category.averageSpending);

                Newcategory = {
                    name: category.name,
                    numberExpenses: numberExpenses,
                    proportion: pourcentage,
                    amounts: totalExpenses,
                    color: colorbar,
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
            difference: average.min - abonnementPourcentage
            };
        }
        
        // Si supérieur à la borne maximum
        if (abonnementPourcentage > average.max) {
            return {
            status: 'mdi-arrow-down',
            difference: abonnementPourcentage - average.max
            };
        }
        
        // Dans la plage recommandée
        return {
            status: 'mdi-arrow-collapse-vertical',
            difference: abonnementPourcentage - average.max
        };
        }

</script>
  
<style scoped>
    .incomeProportion {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 42vh;
        font-size: smaller;
    }
    .incomeBar{
        width: 5vw;
        height: 40vh;
        border-radius: 5px;
        background-color: rgb(211, 211, 211);
        display: flex;
        align-items: flex-end;
    }
    .averageExpensesPosition {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        height: 40vh;
    }
    .averageExpenses {
        width: 5vw;
        border-radius: 5px ;
    }
    .spendingSlider {
        position: absolute;
        border-top: 2px black solid ;
        width: 5vw;
    }
    .titleExpenes {
        display: flex;
        justify-content: center;
        margin: 10px;
    }
</style>