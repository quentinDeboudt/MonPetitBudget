<template >
  <div class="allPart">
    <div class="designPart">
      <v-img  src="/public/logo_bank/login_page.png" />
    </div>
    <div class="logo">
      <div v-if="isDarkMode">
        <v-img class="logo" src="/public/logo_bank/Logo_mon_petit_budget_light.png" />
      </div>
      <div v-if="!isDarkMode">
        <v-img class="logo" src="/public/logo_bank/Logo_mon_petit_budget_dark.png" />
      </div>
    </div>
    <div class="loginPart">
      <div v-if="currentUser" class="currentUser">
        <p>Déja connecté en tant que:</p>

        <v-btn @click="() => router.push('/home')">
          <v-img :src="profileImageUrl" class="imageProfil"></v-img>
          {{ currentUser?.displayName }}
        </v-btn>
      </div>

      <v-btn @click="signIn">
        <v-img src="/public/logo_bank/google.png" style="width: 20px;"></v-img>
        Connection avec Google
      </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
  import useUserStore from '@/stores/userStore';
  import { firebaseAuth } from '@/plugins/firebase';
  import router from '@/router';
  import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
  import { onAuthStateChanged, type User } from 'firebase/auth';
  import { auth } from '@/plugins/firebase';
  import { getFirestore, doc, getDoc } from "firebase/firestore";
  import { getDarkMode } from '@/services/userService';
  
  let currentUser = ref<User | undefined>();
  let profileImageUrl = ref<string>();
  const db = getFirestore();
  const userStore = useUserStore();
  const isDarkMode = ref<boolean>();
  
  /**
   * onMounted - waits for the DOM to be completely rendered.
   */
  onMounted(async () => {
    userStore.initUser();
    if(currentUser.value){
      isDarkMode.value = await getDarkMode(currentUser.value.uid);
    }
  });

  /**
   * onAuthStateChanged - if the user is signed in,  assign the value at currentUser.
   * @param user
   * @param auth
   */
  onAuthStateChanged(auth, async (user) => {
    if(user){
      currentUser.value = user;
      isDarkMode.value = await getDarkMode(currentUser.value.uid);
      profileImageUrl = computed<string>(() => {
        return currentUser.value?.photoURL ?? '/images/default-avatar.png'
      })
    }
  });

  /**
   * isExistingAccount - Checks whether the account is an existing one or a new account.
   */
  async function isExistingAccount() {
    if(currentUser.value){
      const userRef = doc(db, 'users', currentUser.value.uid);
      getDoc(userRef).then((docSnap) => {
        if (docSnap.exists()) {
          router.replace('home');
        }else {
          router.replace('register');
        }
      });
    }
  }

  /**
   * signIn - Opens the pop-up to sign in to Google.
   */
  async function signIn() {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(firebaseAuth, provider);
    await isExistingAccount();
  }
</script>

<style scoped>
  .allPart{
    display: flex;
    flex-direction: row;
    width: 100vw;
    height: 100vh;
  }
  .designPart{
    width: 900px;
    background-color: #F5F1E1;
  }
  .loginPart {
    margin-left: auto;
    margin-right: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .logo{
    width: 10vw;
    height: 10vh;
    position: absolute;
  }
  .imageProfil{
    width: 30px;
    height: 30px;
    border: 1px solid black;
    border-radius: 30px;
  }
  .currentUser {
    margin: 30px;
  }

  /* Cacher l'image sur les petits écrans */
  @media (max-width: 1200px) {
    .designPart {
      display: none;
    }
    allPart{
      margin: 10%;
    }
    .logo{
      width: 200px;
    }
    .loginPart {
      width: 100%;
      height: 100%;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .imageProfil{
      width: 30px;
      height: 30px;
      border: 1px solid black;
      border-radius: 30px;
    }
  }
</style>