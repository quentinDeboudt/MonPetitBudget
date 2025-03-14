<template>
    <v-menu>
        <template v-slot:activator="{ props: menu }">
            <v-tooltip location="top">
                <template v-slot:activator="{ props: tooltip }">
                    <v-avatar :image="profileImageUrl" class="imageProfil" v-bind="mergeProps(menu, tooltip)"></v-avatar>
                </template>
                <span>
                    <div>
                        <h4>{{ currentUser?.displayName }}</h4>
                        <h6>{{ currentUser?.email }}</h6>
                    </div>
                </span>
            </v-tooltip>
        </template>
        <v-list>
            <v-list-item>
                <div class="profilMenu">
                    <v-avatar :image="profileImageUrl" class="imageProfil" v-bind="mergeProps(menu, tooltip)"></v-avatar>
                    <h4>{{ currentUser?.displayName }}</h4>
                    <h6>{{ currentUser?.email }}</h6>
                </div>
                <v-card variant="tonal">
                    <v-list-item-title>
                        <v-btn @click="openParameters" variant="text">
                            <v-icon icon="mdi-cog"></v-icon>
                            Parametres
                        </v-btn>
                    </v-list-item-title>
                    <v-list-item-title>
                        <v-btn @click="logout" variant="text">
                            <v-icon icon="mdi-logout"></v-icon>
                            Déconnexion
                        </v-btn>
                    </v-list-item-title>
                </v-card>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<script lang="ts" setup>
    import { onMounted } from 'vue';
    import useUserStore from '@/stores/userStore';
    import type { User } from 'firebase/auth';
    import { mergeProps } from 'vue'

    const router = useRouter();
    const userStore = useUserStore();
    const emit = defineEmits(['open-parameter']);
    let currentUser: User | null;
    let profileImageUrl = ref<string>();
    let income = ref<number>();

    /**
     * onMounted - waits for the DOM to be completely rendered.
     */
    onMounted(async () => {
        currentUser = userStore.currentUser;
        income.value = userStore.income;

        if(userStore.profileImageUrl){
            profileImageUrl.value = userStore.profileImageUrl;
        }else {
            profileImageUrl.value = "/src/assets/logo_bank/utilisateur.png";
        }
    });

    function openParameters(){
        emit('open-parameter');
    }

    const logout = async () => {
        try {
            await fetch("/index", { method: "POST", credentials: "include" });
            localStorage.removeItem("userToken");
            router.push("/index");
        } catch (error) {
            console.error("Erreur lors de la déconnexion", error);
        }
    };


</script>

<style>
    .imageProfil{
        width: 40px;
        height: 40px;
        border: 1px solid black;
        border-radius: 30px;
        margin-right: 3px;
        margin: 5px;
    }

    .profilMenu{
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: larger;
    }
</style>