import { db } from '../plugins/firebase';
import { doc, getDoc, updateDoc} from 'firebase/firestore';


/**
 * updateDarkMode - update Value mode.
 * @param idUser: String
 * @param darkMode: boolean
 */
export async function updateDarkMode(idUser: string, darkMode: boolean) {
    try {
        const userRef = doc(db, "users", idUser);
        await updateDoc(userRef, { darkMode });
        console.log("Mode mis à jour:", darkMode);
    } catch (error) {
        console.error("Erreur lors de la mise à jour du mode:", error);
    }
}

/**
 * getDarkMode
 * @param idUser: String
 * @returns: boolean
 */
export async function getDarkMode(idUser: string): Promise<boolean> {
    try {
        const userRef = doc(db, "users", idUser);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists() && userSnap.data().darkMode !== undefined) {
            return userSnap.data().darkMode;
        }
    } catch (error) {
        console.error("Erreur lors de la récupération du mode:", error);
    }
    return false; // Par défaut, on met en mode clair si aucune donnée n'existe
}