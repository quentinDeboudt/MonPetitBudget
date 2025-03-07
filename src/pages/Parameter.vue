<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-text-field
                    v-model="form.income"
                    label="Revenus"
                    type="number"
                    required
                />
            </v-col>
    
            <v-col cols="12">
                <v-btn @click="saveData" color="primary">Enregistrer</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts" setup>
    import { ref } from 'vue';
    //import { useUserStore } from '../stores/userStore';
    import { auth } from '@/plugins/firebase';
    import { doc, updateDoc , getDoc } from 'firebase/firestore';
    import { db } from '@/plugins/firebase';
    import { getDownloadURL, uploadBytes, ref as storageRef } from 'firebase/storage';
    import { storage } from '@/plugins/firebase';
    import { onMounted } from 'vue';
    import { useRouter } from 'vue-router';
    
    const router = useRouter();

    let form = ref<UserData>({
        income: 0,
    });


    onMounted(async () => {
        const user = auth.currentUser;
        if (user) {
            const docRef = doc(db, 'users', user.uid);
            const docSnap = await getDoc(docRef);
            console.log('Donnée:', docRef);

            if (docSnap.exists()) {
                const userData = docSnap.data();
                console.log('Données utilisateur récupérées :', userData);

                form = ref<UserData>({
                    income: userData.income,
                });
            } else {
                console.log("Aucune donnée trouvée pour cet utilisateur.");
            }
        }else{
            router.push('/login');
        }
    });

    // Définition de l'interface des données
    interface UserData {
        income: number;
    }
    
    const saveData = async () => {
        try {
        const user = auth.currentUser;
        if (user) {
            // Mise à jour de Firestore
            await updateDoc(doc(db, 'users', user.uid), {
                income: form.value.income,
            });
            // Optionnel : Mise à jour du profil dans Firebase Auth
            // await user.updateProfile({
            // displayName: `${form.value.prenom} ${form.value.nom}`,
            // photoURL: form.value.imageDeProfil,
            // });
            console.log('Données enregistrées avec succès:', form.value.income);
            router.replace('home');
        }
        } catch (error) {
        console.error('Erreur lors de l\'enregistrement des données :', error);
        }
    };
</script>

<style scoped>
    /* Personnalisation si nécessaire */
</style>
  