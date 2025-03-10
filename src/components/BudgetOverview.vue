<template>
    <v-card elevation="4" class="GlobaleCard">
        <v-list-item v-for="(category) in getAllCategories">
            <v-card elevation="2" class="CardStyled">
                <div class="item">
                    <div class="elem"> 
                        <div>
                            <v-img  class="icon" :src="category.logo.path"></v-img>
                        </div>
                        <div>
                            <v-list-item-title class="font-weight-bold">{{ category.name }}</v-list-item-title>
                            <v-list-item-subtitle>{{ category.numberExpenses }} dépenses - {{ category.proportion }}%</v-list-item-subtitle>
                        </div>
                    </div>
                    
                    <div class="elem">
                    <v-list-item-action>
                        <span class="font-weight-bold">-{{ category.amounts }}€</span>
                    </v-list-item-action>
                    </div>
                </div>
                <div class="containerCase">
                    <div class="case" :style="{backgroundColor: category.color, width:category.proportion+'%' }" ></div>
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
        let colorbar = '';
        getAllCategories.value = [];
        
        TableCategories.forEach(category =>{
            for (let index = 0; index < Expenses.length; index++) {
                if(Expenses[index].logo.category == category.label){

                    isGoodCategory = true;
                    totalExpenses += Expenses[index].amount;
                    numberExpenses += 1;
                    colorbar = colors[index];
                }
            }
            if(isGoodCategory){

                const pourcentage = Math.round((totalExpenses * 100)/ income.value);

                Newcategory = {
                    name: category.name,
                    numberExpenses: numberExpenses,
                    proportion: pourcentage,
                    amounts: totalExpenses,
                    color: colorbar,
                    logo: getLogoByName(category.logo)
                }
                totalCategories.push(Newcategory);

                //reset data:
                isGoodCategory = false;
                totalExpenses = 0;
                numberExpenses = 0;

            }
            getAllCategories.value = totalCategories;
        });
    }

</script>
  
<style scoped>
    .GlobaleCard{
        max-width: 50vw;
        margin: 9px;
    }
    .CardStyled {
        margin: 2px !important;
        padding: 4px;
    }
    .icon {
        margin-right: 6px;
        width: 40px;
        height: 40px;
    }
    .item {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .elem {
        display: flex;
    }
    .containerCase {
        background-color: rgb(177, 177, 177);
        border-radius: 20px;
    }
    .case {
        margin-top: 5px;
        height: 4px;
        border-radius: 20px;
    }
 
</style>