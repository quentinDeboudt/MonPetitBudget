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
        
        <v-list class="autocomplete" v-if="filteredSuggestions.length > 0">
            <v-list-item 
                class="autocompleteList"
                v-for="(item, index) in filteredSuggestions"
                :key="index"
                @click="selectSuggestion(item)"
            >
                <v-list-item-content v-html="highlightMatchingLetters(item)" />
                <v-divider></v-divider>
            </v-list-item>
        </v-list>
    </v-container>
</template>

<script lang="ts">
import { ref, watch } from 'vue';

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

    const expenseNames = [
    'Carrefour',
    'Carte Bleue',
    'Caisse',
    'Essence',
    'Alimentation',
    'Vêtements',
    'Abonnement',
    'Loisirs',
    'coiffeur',
    'loyer',
    'Rennes',
  ];

    const filterSuggestions = () => {

      if (searchText.value.trim() === '') {
        filteredSuggestions.value = [];
      } else {
        filteredSuggestions.value = expenseNames.filter(item =>
          item.toLowerCase().includes(searchText.value.toLowerCase())
        );
      }
      
    };

    const highlightMatchingLetters = (word: string): string => {
      if (!searchText.value) return word;

      const search = searchText.value.toLowerCase();
      const regex = new RegExp(`(${search})`, 'gi');
      return word.replace(regex, '<span style="background-color: yellow;">$1</span>');
    };

    const selectSuggestion = (item: string) => {
      searchText.value = item;
      filteredSuggestions.value = [];
      emit('update:modelValue', searchText.value); // Émettre l'événement pour mettre à jour v-model
    };

    // Met à jour searchText lorsque modelValue change (v-model lié)
    watch(() => props.modelValue, (newVal) => {
      searchText.value = newVal;
    });

    // Émettre l'événement lors d'une modification de texte
    watch(searchText, (newValue) => {
      emit('update:modelValue', newValue); // Met à jour le v-model avec la nouvelle valeur
    });

    return {
      searchText,
      filteredSuggestions,
      filterSuggestions,
      highlightMatchingLetters,
      selectSuggestion,
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
        background: white;
        border: 1px solid #ccc;
        min-width: 7vw;
        border-radius: 4px;
        box-shadow: 0px 4px 60px 6px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        overflow-y: auto;
    }
</style>
