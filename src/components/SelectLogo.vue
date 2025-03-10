<template>
  <v-autocomplete
    v-model="selectedLogo"
    :items="logos"
    item-title="name"
    item-value="name"
    item-props="props"
    label="Choisir un logo"
    return-object
    density="compact"
  >
    <!-- Affichage de l'élément sélectionné -->
    <template v-slot:selection="{ item }">
      <div v-if="item.raw" class="d-flex align-center">
          <img class="icon" :src="item.raw.path" :alt="item.raw.name">
        <span class="ml-2">{{ item.raw.name }}</span>
      </div>
    </template>

    <!-- Affichage des options -->
    <template v-slot:item="{ props, item }">
      <v-list-item v-bind="props">
        <template v-slot:prepend>
            <img class="icon" :src="item.raw.path" :alt="item.raw.name">
        </template>
      </v-list-item>
    </template>
  </v-autocomplete>
</template>

<script setup lang="ts">
  import { ref, watch } from "vue";
  import { logos, getLogoByName } from "@/data/logos";
  import type { Logo } from "@/interfaces/Logo";

  const props = defineProps<{
    modelValue: Logo;
  }>();
  const emit = defineEmits(["update:modelValue"]);
  const selectedLogo = ref<Logo>();

  import { onMounted } from "vue";

  onMounted(() => {
    if(props.modelValue){
      selectedLogo.value = getLogoByName(props.modelValue.name);
    }else{
      selectedLogo.value = getLogoByName('à définir');
    }
  });

  /**
   * watch - Update 'selectedLogo' if parent change 'modelValue'.
   */
   watch(() => props.modelValue, (newValue) => {
    selectedLogo.value = getLogoByName(newValue.name);
  });

  /**
   * watch - Update parent if User selected to auter logo.
   */
  watch(selectedLogo, (newLogo) => {
    emit("update:modelValue", newLogo ? newLogo : null);
  });
</script>

<style>
  .icon{
    width: 20px;
  }
</style>