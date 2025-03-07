<template>
    <v-container class="pa-0 ma-0">
        <v-list>
            <v-list-item v-for="(item) in listCategories">
                <v-card elevation="2" class="CardStyled">
                    <div class="item">
                        <div class="elem"> 
                            <div>
                                <v-img  class="icon" :src="item.logo.path"></v-img>
                            </div>
                            <div>
                                <v-list-item-title class="font-weight-bold">{{ item.title }}</v-list-item-title>
                                <v-list-item-subtitle>{{ item.numberExpenses }} dépenses - {{ item.proportion }}%</v-list-item-subtitle>
                            </div>
                        </div>
                        
                        <div class="elem">
                        <v-list-item-action>
                            <span class="font-weight-bold">-{{ item.amounts }}€</span>
                        </v-list-item-action>
                        </div>
                    </div>
                    <div class="containerCase">
                        <div class="case" :style="{backgroundColor: item.color, width:item.proportion+'%' }" ></div>
                    </div>
                </v-card>
            </v-list-item>
        </v-list>
    </v-container>
</template>
    
<script setup lang="ts">
    import { defineProps, watch } from "vue";
    import { category } from "@/data/Categories";
    import { getLogoByName } from "@/data/logos";
    import type { BudgetCategories  } from "@/interfaces/BudgetCategories";
    import type { User } from "firebase/auth";
    import useUserStore from '@/stores/userStore';
    import type { ExpenseDTO } from "@/interfaces/ExpenseDto";

    let currentUser: User | null;
    let profileImageUrl: string | null;
    let income = ref<number>(0);

    const userStore = useUserStore();
    const props = defineProps(["expenses", "title"]);
    const listCategories: BudgetCategories[] = []; 
    const colors = ['#00feff', '#00b9ff', '#004eff', '#8400ff', '#de00ff', '#ff00bd', '#ff003d', '#00ffde', '#00ff77', '#8aff00', '#fff800', '#ffb300', '#ff7300'];

    /**
     * onMounted - waits for the DOM to be completely rendered.
     */
    onMounted(async () => {

        //get values ​​of the store:
        currentUser = userStore.currentUser
        profileImageUrl = userStore.profileImageUrl
        income.value = userStore.income
    });
    
    /**
     * watch - watches the expenses list and updates the data to be displayed.
     */
    watch(() => props.expenses, (lstExpenses) => {
        if (lstExpenses.length > 0) {
            transformData(lstExpenses);
        }
    }, { immediate: true });

    /**
     * transformData - transforms the data to be displayed.
     * @param lstExpenses - list of expenses.
     */
    function transformData(lstExpenses: ExpenseDTO[]){
        let IndexColor = 0;
        category.forEach((category: { name: string; logo: string; label:string}) => {
            
            let numberExpenses = 0;
            let proportion = 0;
            let amounts = 0;
            let haveExpense = false;
            
            lstExpenses.forEach(Expense => {

                let logoCategory = getLogoByName(Expense.logo.name).category;
                //console.log(Expense.logo.category);

                if(category.name == logoCategory){
                    haveExpense = true;
                    numberExpenses += 1;
                    amounts += Expense.amount;
                    proportion = arrondirDeuxChiffres(100*(numberExpenses/lstExpenses.length));
                }
            })
            if(haveExpense){
                let newListExpenses = {
                    title: category.name,
                    numberExpenses: numberExpenses,
                    proportion: proportion,
                    amounts: amounts,
                    color: colors[IndexColor],
                    logo: getLogoByName(category.logo)
                }
                listCategories.push(newListExpenses);
            }
            IndexColor += 1;
        })
    }

    /**
     * arrondirDeuxChiffres - rounds a number to two decimal places.
     * @param valeur - number to be rounded.
     * @returns - the number rounded to two decimal places.
     */
    function arrondirDeuxChiffres(valeur: number): number {
        return Math.round((valeur + Number.EPSILON) * 100) / 100;
    };
</script>
  
<style scoped>
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