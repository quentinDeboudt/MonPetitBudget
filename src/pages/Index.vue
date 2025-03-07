<template >
  <div class="allPart">
    <div class="designPart">
      <v-img src="/src/assets/logo_bank/login_page.png" />
    </div>
    <v-img class="logo" src="/src/assets/logo_bank/Logo_mon_petit_budget.png" />
    <div class="loginPart">
      <div v-if="currentUser" class="currentUser">
        <p>Déja connecté en tant que:</p>

        <v-btn @click="() => router.push('/home')">
          <v-img :src="profileImageUrl" class="imageProfil"></v-img>
          {{ currentUser?.displayName }}
        </v-btn>
      </div>

      <v-btn @click="signIn">
        <v-img src="/src/assets/logo_bank/google.png" style="width: 20px;"></v-img>
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
  
  let currentUser = ref<User | undefined>();
  let profileImageUrl = ref<string>();
  const db = getFirestore();
  const userStore = useUserStore();

  /**
   * onMounted - waits for the DOM to be completely rendered.
   */
  onMounted(async () => {
    userStore.initUser();
  });

  /**
   * onAuthStateChanged - if the user is signed in,  assign the value at currentUser.
   * @param user
   * @param auth
   */
  onAuthStateChanged(auth, (user) => {
    if(user){
      currentUser.value = user;
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
    width: 99vw;
    height: 100vh;
  }
  .designPart{
    width: 49vw;
    height: 100vh;
  }
  .loginPart {
    height: 100vh;
    width: 50vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .logo{
    width: 13vw;
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
</style>