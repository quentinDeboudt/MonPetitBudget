<template>
    <v-container>
        <v-text-field
            class="styledInputInterne"
            v-model="searchText"
            label="Nom de la dépense"
            @input="filterSuggestions"
            clearable
            dense
            solo
        ></v-text-field>

        <v-list style="{isDarkMode ? 'background-color: black' : 'background-color: white}" class="autocomplete" v-if="filteredSuggestions.length > 0">
            <v-list-item 
                class="autocompleteList"
                v-for="(item, index) in filteredSuggestions"
                :key="index"
                @click="selectSuggestion(item)"
            >
                <p v-html="highlightMatchingLetters(item)" />
                <v-divider></v-divider>
            </v-list-item>
        </v-list>
        
    </v-container>
</template>

<script lang="ts">
    import { ref, watch } from 'vue';
    import {expenseNames} from '@/data/autocompleteWorld';
    import useUserStore from '@/stores/userStore';
    import { getDarkMode } from '@/services/userService';

    let isDarkMode = ref<Boolean>(false);
    const userStore = useUserStore();

    /**
     * watch - watches the User to update background color.
     */
    watch(
        () => userStore.currentUser,
        async (user) => {
            if(user){
                isDarkMode.value = await getDarkMode(user.uid);
            }
        },
        { deep: true, immediate: true }
    );

    export default {
        props: {
            modelValue: {
            type: String,
            default: '',
            },
        },

        setup(props, { emit }) {
            const searchText = ref(props.modelValue); // Liaison avec v-model
            const filteredSuggestions = ref<string[]>([]);

            /**
             * filterSuggestions - Search all world into list.
             */
            const filterSuggestions = () => {
                if (searchText.value.trim() === '') {
                    filteredSuggestions.value = [];
                } else {
                    filteredSuggestions.value = expenseNames.filter(item =>
                        removeAccents(item).toLowerCase().includes(removeAccents(searchText.value).toLowerCase())
                    );
                }
            };

            const removeAccents = (str: string) => {
                return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            };

            /**
             * highlightMatchingLetters - highlight letters if word matching.
             * @param word 
             */
            const highlightMatchingLetters = (word: string): string => {
                if (!searchText.value) return word;
                const search = searchText.value.toLowerCase();
                const regex = new RegExp(`(${search})`, 'gi');
                if(isDarkMode){
                    return word.replace(regex, '<span style="background-color: blue;">$1</span>');
                }else{
                    return word.replace(regex, '<span style="background-color: yellow;">$1</span>');
                }
            };

            /**
             * selectSuggestion - When a item is selected, emit this suggestion.
             * @param item 
             */
            const selectSuggestion = (item: string) => {
                searchText.value = item;
                filteredSuggestions.value = [];
                emit('update:modelValue', searchText.value);
            };

            /**
             * watch - Get input Search when user writes.
             */
            watch(() => props.modelValue, (newVal) => {
                searchText.value = newVal;
            });

            /**
             * watch - emit input Search when user writes.
             */
            watch(searchText, (newValue) => {
                emit('update:modelValue', newValue);
            });

            return {
                searchText,
                filteredSuggestions,
                filterSuggestions,
                highlightMatchingLetters,
                selectSuggestion,
                isDarkMode,
            };
        },
    };
</script>

<style scoped>
    .styledInputInterne {
        height: 7.5vh;
    }
    .autocomplete{
        position: absolute;
        width: fit-content;
        max-height: 30vh;
        border: 1px solid #ccc;
        min-width: 7vw;
        border-radius: 4px;
        box-shadow: 0px 4px 60px 6px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        overflow-y: auto;
    }
</style>
