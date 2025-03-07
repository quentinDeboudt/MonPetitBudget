<template>
    <v-container>
        <v-card elevation="4" class="welcome">
            <div class="profil">
                <v-img :src="profileImageUrl" class="imageProfil"></v-img>
                <div>{{ currentUser?.displayName }}</div>
            </div>

            <div id="welcomeTexte" style="margin: 5px;"></div>
        </v-card>
        
        <div v-if="textIsFullDisplay">
            <v-text-field v-model="income" type="number" clearable label="Revenu"></v-text-field>
            <div v-if="error" style="color: red">{{ error }}</div>

            <v-btn @click="handleSubmit()">
                Enregistrer
            </v-btn>
        </div>
    </v-container>
</template>
  
<script setup lang="ts">
    import Typed from 'typed.js';
    import router from '@/router';
    import { getFirestore, doc, setDoc } from "firebase/firestore";
    import { onAuthStateChanged, type User } from 'firebase/auth';
    import { auth } from '@/plugins/firebase';
    
    const db = getFirestore();
    let currentUser = ref<User | undefined>();
    let profileImageUrl = ref<string>();
    let income = ref<number>(0);
    let error = null;
    let textIsFullDisplay = ref<boolean>(false);

    /**
     * onMounted - waits for the DOM to be completely rendered.
     */
    onMounted(async () => {
        onAuthStateChanged(auth, (user) => {
            if(user){
                currentUser.value = user;
                profileImageUrl = computed<string>(() => {
                    return currentUser.value?.photoURL ?? '/images/default-avatar.png'
                })
                texteAnimation();
            }
        });
    });

    /**
     * texteAnimation - generate Welcome text animation.
     */
    function texteAnimation(){
        const element: HTMLDivElement = document.getElementById("welcomeTexte") as HTMLDivElement;
        const Name = currentUser.value?.displayName;
        const texte: string = `Salut ${Name} ! </br> Nous sommes ravis de te voir !</br>MonPetitBudget est là pour t'aider à mettre de l'ordre dans tes finances, et peut-être même à économiser quelques euros pour une bière... ou deux... ou trois...!`
        new Typed(element, {
            strings: [texte],
            typeSpeed: 5,
            backSpeed: 50,
            backDelay: 1500,
            onComplete: () => {
                textIsFullDisplay.value = true;
            }
        });
    }
    
    /**
     * handleSubmit - Create new document into DataBase.
     */
    async function handleSubmit() {
        try {
            if (currentUser.value) {
                const userRef = doc(db, 'users', currentUser.value.uid);

                await setDoc(userRef, {
                    name: currentUser.value.displayName,
                    profileImageUrl: profileImageUrl.value,
                    income: income.value,
                })
             
                router.push('/home');
            } else {
                router.push('/index');
            }
        } catch (err) {
            console.error(err);
            router.push('/index');
        }
    }
</script>
  
<style scoped>
    .profil{
        display: flex;
        margin: 5px;
        padding: 5px;
        width: fit-content;
        border: 1px black solid;
        border-radius: 10px;
        background-color: rgb(236, 236, 236);
    }
    .welcome {
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        font-size: larger;
        margin-bottom: 20px;
    }
    .imageProfil{
        margin-right: 3px;
        width: 30px;
        height: 30px;
        border: 1px solid black;
        border-radius: 30px;
    }
</style>