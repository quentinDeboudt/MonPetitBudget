import { defineStore } from 'pinia';
import { onAuthStateChanged, getAuth, type User } from 'firebase/auth';
import { doc, getDoc } from "firebase/firestore";
import { db } from '@/plugins/firebase';

interface UserState {
    currentUser: User | null;
    profileImageUrl: User['photoURL'];
    income: number;
}

const useUserStore = defineStore('user', {
    state: (): UserState => ({
        currentUser: null, 
        profileImageUrl: '',
        income: 0
    }),
    actions: {
        async initUser() {
        onAuthStateChanged(getAuth(), (user) => {
            if (user) {
                this.currentUser = user;
                if(this.currentUser){
                    this.profileImageUrl = this.currentUser.photoURL;
                }

                const userId = user.uid;
                const userRef = doc(db, 'users', userId);

                getDoc(userRef)
                    .then((docSnap) => {
                    if (docSnap.exists()) {
                        this.income = docSnap.data().income;
                    } else {
                        console.log('Utilisateur non trouvé');
                    }
                    }).catch((error) => {
                    console.error('Erreur lors de la récupération des données :', error);
                    });
                } else {
                console.log('Aucun utilisateur connecté');
                this.currentUser = null;
                this.profileImageUrl = '';
                this.income = 0;
            }
        });
        },
    },
});

export default useUserStore;
