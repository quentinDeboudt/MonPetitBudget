<template>
    <v-card elevation="4" >
        <h4>{{ title }}</h4>
        <v-list-item v-for="(category) in getAllCategories">
            <v-card >
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
            </v-card>
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
        let colorbar = 0;
        let average: { status: string, difference: number } | undefined;
        getAllCategories.value = [];
        
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

                const pourcentage = Math.round((totalExpenses * 100)/ income.value);
                average = compareSubscription(pourcentage, category.averageSpending);

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
    .test {
        border: 1px green solid;
        width: 5vw;
        height: 40vh;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    }
    .averageExpenses {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        border: 1px red solid;
    }
    .spendingSlider {
        position: relative;
        border-top: 5px black solid ;
        width: 5vw;
    }
</style>