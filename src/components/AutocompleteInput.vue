<template>
    <v-container>
      <!-- Champ de saisie avec autocomplétion -->
      <v-text-field
        v-model="searchText"
        label="Nom de la dépense"
        @input="filterSuggestions"
        clearable
        dense
        solo
      />
      
      <!-- Liste des suggestions d'auto-complétion -->
      <v-list v-if="filteredSuggestions.length > 0">
        <v-list-item
          v-for="(item, index) in filteredSuggestions"
          :key="index"
          @click="selectSuggestion(item)"
        >
          <v-list-item-content v-html="highlightMatchingLetters(item)" />
        </v-list-item>
      </v-list>
    </v-container>
  </template>
  
  <script lang="ts">
  import { ref } from 'vue';
  
  export default {
    setup() {
      // Liste des mots de dépenses pour l'autocomplétion (tu peux récupérer cette liste depuis Firebase ou une API)
      const expenseNames = ref([
        'Carrefour',
        'Carte Bleue',
        'Caisse',
        'Essence',
        'Alimentation',
        'Vêtements',
        'Abonnement',
        'Loisirs',
      ]);
  
      // Valeur saisie par l'utilisateur
      const searchText = ref('');
  
      // Suggestions filtrées
      const filteredSuggestions = ref<string[]>([]);
  
      // Fonction de filtrage des suggestions
      const filterSuggestions = () => {
        if (searchText.value.trim() === '') {
          filteredSuggestions.value = [];
        } else {
          filteredSuggestions.value = expenseNames.value.filter(item =>
            item.toLowerCase().includes(searchText.value.toLowerCase())
          );
        }
      };
  
      // Fonction pour surligner les lettres correspondantes
      const highlightMatchingLetters = (word: string): string => {
        if (!searchText.value) return word;
  
        const search = searchText.value.toLowerCase();
        const regex = new RegExp(`(${search})`, 'gi');
        return word.replace(regex, '<span style="background-color: yellow;">$1</span>');
      };
  
      // Fonction pour sélectionner une suggestion
      const selectSuggestion = (item: string) => {
        searchText.value = item;
        filteredSuggestions.value = [];
      };
  
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
  /* Style pour la liste des suggestions */
  .v-list-item {
    cursor: pointer;
  }
  
  .v-list-item:hover {
    background-color: #f1f1f1;
  }
  </style>
  