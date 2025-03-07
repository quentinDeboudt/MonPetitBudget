<template>
    <v-row>
        <v-col>
            <v-card elevation="4">
                <v-card-title class="text-h6 font-weight-bold">Revenus</v-card-title>
                <v-card-text v-if="income">
                    {{income}} €
                </v-card-text>
                <v-card-text v-if="!income">
                    <v-progress-circular indeterminate color="primary"></v-progress-circular>
                </v-card-text>
                <v-card-actions>
                    <v-chip prepend-icon="mdi-arrow-up" color="green">
                        2%
                    </v-chip>
                    <p>par rapport au mois dernier !</p>
                </v-card-actions>
            </v-card>
        </v-col>
        
        <v-col>
            <v-card elevation="4">
                <v-card-title class="text-h6 font-weight-bold">Dépenses</v-card-title>
                <v-card-text v-if="income">
                    {{ props.totalPriceOfExpenses }} €
                </v-card-text>
                <v-card-text v-if="!income">
                    <v-progress-circular indeterminate color="primary"></v-progress-circular>
                </v-card-text>
                <v-card-actions>
                    <v-chip prepend-icon="mdi-arrow-down" color="green">
                        25%
                    </v-chip>
                    <p>par rapport au mois dernier !</p>
                </v-card-actions>
            </v-card>
        </v-col>

        <v-col>
            <v-card elevation="4">
                <v-card-title class="text-h6 font-weight-bold">Epargne</v-card-title>
                <v-card-text v-if="income">
                    {{props.savingsBudget}} €
                </v-card-text>
                <v-card-text v-if="!income">
                    <v-progress-circular indeterminate color="primary"></v-progress-circular>
                </v-card-text>
                <v-card-actions>
                    <v-chip prepend-icon="mdi-arrow-collapse-vertical" color="red">
                        0%
                    </v-chip>
                    <p>par rapport au mois dernier !</p>
                </v-card-actions>
            </v-card>
        </v-col>
        
        <v-col>
            <v-card elevation="4">
                <v-card-title class="text-h6 font-weight-bold">Total Epargné</v-card-title>
                <v-card-text v-if="income">
                    12'560 €
                </v-card-text>
                <v-card-text v-if="!income">
                    <v-progress-circular indeterminate color="primary"></v-progress-circular>
                </v-card-text>
                <v-card-actions>
                    <v-chip prepend-icon="mdi-arrow-up" color="green">
                        5%
                    </v-chip>
                    <p>par rapport au mois dernier !</p>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>

<script setup lang="ts">
    import useUserStore from '@/stores/userStore';
    import type { User } from 'firebase/auth';

    let currentUser = ref<User | null>();
    let income = ref<number>();
    const userStore = useUserStore();
    const props = defineProps(["totalPriceOfExpenses", "savingsBudget"]);

    /**
     * onMounted - waits for the DOM to be completely rendered.
     */
    onMounted(async () => {
        currentUser.value = userStore.currentUser;
        income.value = userStore.income;
    });
</script>